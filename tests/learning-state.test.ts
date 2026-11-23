import { describe, expect, test } from "bun:test";
import { challenges, challengeViews } from "../apps/web/src/course/challenges";
import { lessons } from "../apps/web/src/course/curriculum";
import {
  addDays, awardMilestones, completeChallenge, dayKey, dueLessonIds, emptyLearning, isPracticeDay,
  parseLearning, rateReview, recordActivity, scheduleLesson, validDay, weeklyDays, weekStart,
} from "../apps/web/src/course/learning-state";
import { readProgressBackup } from "../apps/web/src/course/progress";

const first = lessons[0].id;
const today = "2026-11-23";

describe("local learning calendar", () => {
  test("uses local calendar dates and a Monday week across month and year boundaries", () => {
    expect(dayKey(new Date(2026, 10, 23, 23, 59))).toBe(today);
    expect(weekStart("2027-01-03")).toBe("2026-12-28");
    expect(weekStart("2027-01-04")).toBe("2027-01-04");
    expect(addDays("2026-03-07", 2)).toBe("2026-03-09");
    expect(addDays("2026-12-31", 2)).toBe("2027-01-02");
  });
  test("rejects impossible and malformed dates", () => {
    for (const day of ["2026-02-30", "2026-13-01", "2026-1-1", "tomorrow", null]) expect(validDay(day)).toBe(false);
    expect(validDay("2028-02-29")).toBe(true);
  });
});

describe("a personal weekly goal", () => {
  test("counts meaningful days once, even with repeated or mixed activities", () => {
    let state = recordActivity(emptyLearning(), today, "cards", first);
    state = recordActivity(state, today, "cards", first);
    expect(isPracticeDay(state.activity[today])).toBe(false);
    state = recordActivity(state, today, "cards", lessons[1].id);
    state = recordActivity(state, today, "cards", lessons[2].id);
    expect(weeklyDays(state, today)).toBe(1);
    state = recordActivity(state, today, "lessons", first);
    state = recordActivity(state, today, "quiz");
    expect(weeklyDays(state, today)).toBe(1);
  });
  test("counts quizzes and challenges, excludes last week and future activities", () => {
    let state = recordActivity(emptyLearning(), "2026-11-22", "quiz");
    state = recordActivity(state, today, "challenges", first);
    state = recordActivity(state, "2026-11-24", "quiz");
    expect(weeklyDays(state, today)).toBe(1);
    expect(weeklyDays(state, "2026-11-24")).toBe(2);
    expect(weeklyDays(state, "2026-11-30")).toBe(0);
  });
  test("changing or disabling a goal retains learning and activity", () => {
    const state = recordActivity(emptyLearning(), today, "lessons", first);
    expect(weeklyDays({ ...state, weeklyGoal: 5 }, today)).toBe(1);
    expect(weeklyDays({ ...state, weeklyGoal: 0 }, today)).toBe(1);
  });
  test("project work counts once and older activity records still load", () => {
    let state = recordActivity(emptyLearning(), today, "projects", "delivery");
    state = recordActivity(state, today, "projects", "delivery");
    expect(weeklyDays(state, today)).toBe(1);
    expect(state.activity[today].projects).toEqual(["delivery"]);
    const legacy = parseLearning({ activity: { [today]: { lessons: [first], cards: [], challenges: [], quiz: false } } });
    expect(weeklyDays(legacy, today)).toBe(1);
    expect(legacy.activity[today].projects).toEqual([]);
  });
});

describe("scheduled recall", () => {
  test("first completion schedules two days later, without pushing an existing schedule", () => {
    const state = scheduleLesson(emptyLearning(), first, today);
    expect(dueLessonIds(state, [first], [], today)).toEqual([]);
    expect(dueLessonIds(state, [first], [], "2026-11-25")).toEqual([first]);
    expect(scheduleLesson(state, first, "2026-11-24").reviews[first].dueOn).toBe("2026-11-25");
  });
  test("a successful later recall earns one milestone and extends the interval", () => {
    let state = scheduleLesson(emptyLearning(), first, today);
    state = rateReview(state, first, true, "2026-11-25");
    expect(state.milestones["first-revisit"]).toBe("2026-11-25");
    expect(state.reviews[first].dueOn).toBe("2026-11-27");
    state = rateReview(state, first, true, "2026-11-27");
    expect(state.reviews[first].dueOn).toBe("2026-12-04");
    expect(state.milestones["first-revisit"]).toBe("2026-11-25");
  });
  test("repeated same-day success cannot inflate the interval or practice count", () => {
    let state = rateReview(emptyLearning(), first, true, today);
    for (let i = 0; i < 10; i++) state = rateReview(state, first, true, today);
    expect(state.reviews[first].successes).toBe(1);
    expect(state.reviews[first].dueOn).toBe("2026-11-25");
    expect(state.activity[today].cards).toEqual([first]);
    expect(state.milestones["first-revisit"]).toBeUndefined();
  });
  test("an uncertain recall returns tomorrow and can be practiced again without delaying it", () => {
    let state = rateReview(emptyLearning(), first, true, today);
    state = rateReview(state, first, false, today);
    expect(state.reviews[first]).toEqual({ dueOn: "2026-11-24", reviewedOn: today, successes: 0 });
    state = rateReview(state, first, true, today);
    expect(state.reviews[first].dueOn).toBe("2026-11-24");
  });
  test("practicing ahead does not keep pushing the scheduled review away", () => {
    let state = scheduleLesson(emptyLearning(), first, today);
    state = rateReview(state, first, true, today);
    state = rateReview(state, first, true, "2026-11-24");
    expect(state.reviews[first].dueOn).toBe("2026-11-25");
    expect(state.reviews[first].successes).toBe(0);
    expect(state.milestones["first-revisit"]).toBeUndefined();
    state = rateReview(state, first, true, "2026-11-25");
    expect(state.milestones["first-revisit"]).toBe("2026-11-25");
    expect(state.reviews[first].dueOn).toBe("2026-11-27");
  });
  test("legacy learned cards are available, unseen cards are not called due", () => {
    expect(dueLessonIds(emptyLearning(), [first], [lessons[1].id], today)).toEqual([first, lessons[1].id]);
    expect(dueLessonIds(emptyLearning(), [], [], today)).toEqual([]);
  });
});

describe("meaningful, persistent milestones", () => {
  test("challenge repetition does not multiply accomplishments", () => {
    let state = awardMilestones(completeChallenge(emptyLearning(), first, today), false, today);
    state = awardMilestones(completeChallenge(state, first, today), false, today);
    expect(Object.keys(state.challenges)).toHaveLength(1);
    expect(state.challenges[first].revisitedOn).toBeNull();
    expect(state.milestones["first-decision"]).toBe(today);
    state = completeChallenge(state, first, "2026-11-25");
    expect(state.challenges[first].revisitedOn).toBe("2026-11-25");
  });
  test("foundations needs all three actual challenges, and earned milestones remain", () => {
    let state = emptyLearning();
    for (const lesson of lessons.slice(0, 2)) state = completeChallenge(state, lesson.id, today);
    expect(awardMilestones(state, false, today).milestones.foundations).toBeUndefined();
    state = completeChallenge(state, lessons[2].id, today);
    state = awardMilestones(state, true, today);
    expect(state.milestones.foundations).toBe(today);
    expect(awardMilestones(state, false, "2026-11-24").milestones["project-draft"]).toBe(today);
  });
});

describe("migration and backup", () => {
  test("preserves legacy answers, drafts and checks while adding empty learning state", () => {
    const legacy = { completed: [first], answers: { [`${first}:0`]: 1 }, knownCards: [first], capstone: "A draft worth keeping", projectChecks: { delivery: ["brief"], onboarding: [] } };
    const restored = readProgressBackup(JSON.stringify({ format: "graphnotes-progress", version: 1, progress: legacy }));
    expect(restored.completed).toEqual([first]);
    expect(restored.answers[`${first}:0`]).toBe(1);
    expect(restored.capstone).toBe(legacy.capstone);
    expect(restored.projectChecks.delivery).toEqual(["brief"]);
    expect(restored.learning).toEqual(emptyLearning());
  });
  test("retains new schedules, partial challenges and goals across a JSON round trip", () => {
    let state = rateReview(emptyLearning(), first, true, today);
    state = { ...state, weeklyGoal: 3, attempts: { [first]: { fix: 0, reason: null } } };
    expect(parseLearning(JSON.parse(JSON.stringify(state)))).toEqual(state);
  });
  test("sanitizes malformed metadata and rejects unrelated backup files", () => {
    const state = parseLearning({ weeklyGoal: 99, reviews: { unknown: { dueOn: today }, [first]: { dueOn: "2026-02-31", reviewedOn: null } }, milestones: { "first-decision": "yesterday" } });
    expect(state.weeklyGoal).toBe(0);
    expect(state.reviews).toEqual({});
    expect(state.milestones).toEqual({});
    for (const text of ["{}", "bad json", JSON.stringify({ format: "graphnotes-progress", version: 2, progress: {} }), JSON.stringify({ format: "graphnotes-progress", version: 1, progress: { completed: [], answers: [] } })]) expect(() => readProgressBackup(text)).toThrow();
  });
  test("every lesson has a valid, distinct practice decision and explanation", () => {
    expect(new Set(challenges.map(({ lessonId }) => lessonId)).size).toBe(lessons.length);
    for (const challenge of challenges) {
      expect(lessons.some(({ id }) => id === challenge.lessonId)).toBe(true);
      const views = challengeViews(challenge);
      expect(views.before.chart).toBeDefined();
      expect(views.after.chart).toBeDefined();
      expect(challenge.fix.options[challenge.fix.answer]).toBeTruthy();
      expect(challenge.reason.options[challenge.reason.answer]).toBeTruthy();
    }
  });
});
