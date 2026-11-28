import { lessons } from "./curriculum";

export type Day = string;
export type ReviewSchedule = { dueOn: Day; reviewedOn: Day | null; successes: number };
export type Activity = { lessons: string[]; cards: string[]; challenges: string[]; projects: string[]; quiz: boolean };
export type ChallengeAttempt = { fix: number | null; reason: number | null };
export type ChallengeRecord = { practicedOn: Day; lastPracticedOn: Day; revisitedOn: Day | null };
export const milestoneDefinitions = [
  { id: "first-decision", title: "Your first chart decision", description: "Complete a design challenge and explain your choice." },
  { id: "foundations", title: "Foundations in practice", description: "Practice the first three lessons through their design challenges." },
  { id: "first-revisit", title: "An idea revisited", description: "Recall an idea successfully on a later review day." },
  { id: "project-draft", title: "A brief ready for review", description: "Write your project notes and complete its five-step checklist." },
] as const;
export type MilestoneId = typeof milestoneDefinitions[number]["id"];
export type LearningState = {
  weeklyGoal: number;
  activity: Record<Day, Activity>;
  reviews: Record<string, ReviewSchedule>;
  attempts: Record<string, ChallengeAttempt>;
  challenges: Record<string, ChallengeRecord>;
  milestones: Partial<Record<MilestoneId, Day>>;
};

export function emptyLearning(): LearningState {
  return { weeklyGoal: 0, activity: {}, reviews: {}, attempts: {}, challenges: {}, milestones: {} };
}
export function dayKey(date = new Date()): Day {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function validDay(value: unknown): value is Day {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00`);
  return Number.isFinite(date.getTime()) && dayKey(date) === value;
}
export function addDays(day: Day, count: number): Day {
  const date = new Date(`${day}T12:00:00`);
  date.setDate(date.getDate() + count);
  return dayKey(date);
}
export function weekStart(day: Day): Day {
  const date = new Date(`${day}T12:00:00`);
  return addDays(day, -((date.getDay() + 6) % 7));
}
export function formatDay(day: Day) {
  return new Date(`${day}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
const object = (value: unknown): Record<string, unknown> => value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
const option = (value: unknown) => value === 0 || value === 1 || value === 2 ? value : null;

/** Additive migration: old lesson, quiz and project progress stays untouched. */
export function parseLearning(value: unknown, courseLessons: readonly { id: string }[] = lessons, projectIds: readonly string[] = ["delivery", "onboarding"]): LearningState {
  const ids = new Set(courseLessons.map(({ id }) => id));
  const list = (value: unknown): string[] => Array.isArray(value) ? [...new Set(value.filter((id): id is string => typeof id === "string" && ids.has(id)))] : [];
  const saved = object(value);
  const next = emptyLearning();
  next.weeklyGoal = [0, 2, 3, 4, 5].includes(Number(saved.weeklyGoal)) ? Number(saved.weeklyGoal) : 0;
  for (const [day, raw] of Object.entries(object(saved.activity)).filter(([day]) => validDay(day)).sort().slice(-400)) {
    const activity = object(raw);
    next.activity[day] = { lessons: list(activity.lessons), cards: list(activity.cards), challenges: list(activity.challenges), projects: projectIds.filter((id) => Array.isArray(activity.projects) && activity.projects.includes(id)), quiz: activity.quiz === true };
  }
  for (const [id, raw] of Object.entries(object(saved.reviews))) {
    const review = object(raw);
    if (ids.has(id) && validDay(review.dueOn) && (review.reviewedOn === null || validDay(review.reviewedOn))) {
      next.reviews[id] = { dueOn: review.dueOn, reviewedOn: review.reviewedOn, successes: typeof review.successes === "number" && Number.isInteger(review.successes) ? Math.min(4, Math.max(0, review.successes)) : 0 };
    }
  }
  for (const [id, raw] of Object.entries(object(saved.attempts))) {
    const attempt = object(raw);
    if (ids.has(id)) next.attempts[id] = { fix: option(attempt.fix), reason: option(attempt.reason) };
  }
  for (const [id, raw] of Object.entries(object(saved.challenges))) {
    const record = object(raw);
    if (ids.has(id) && validDay(record.practicedOn) && validDay(record.lastPracticedOn)) {
      next.challenges[id] = { practicedOn: record.practicedOn, lastPracticedOn: record.lastPracticedOn, revisitedOn: validDay(record.revisitedOn) ? record.revisitedOn : null };
    }
  }
  const milestones = object(saved.milestones);
  for (const { id } of milestoneDefinitions) if (validDay(milestones[id])) next.milestones[id] = milestones[id];
  return next;
}

export function isPracticeDay(activity?: Activity) {
  return Boolean(activity && (activity.lessons.length || activity.challenges.length || activity.projects?.length || activity.quiz || activity.cards.length >= 3));
}
export function weeklyDays(state: LearningState, today: Day) {
  const start = weekStart(today);
  return Object.entries(state.activity).filter(([day, activity]) => day >= start && day <= today && isPracticeDay(activity)).length;
}
export function recordActivity(state: LearningState, today: Day, kind: "lessons" | "cards" | "challenges" | "projects" | "quiz", id = ""): LearningState {
  const previous = state.activity[today] ?? { lessons: [], cards: [], challenges: [], projects: [], quiz: false };
  if (kind === "quiz" ? previous.quiz : (previous[kind] ?? []).includes(id)) return state;
  const activity = kind === "quiz" ? { ...previous, quiz: true } : { ...previous, [kind]: [...new Set([...(previous[kind] ?? []), id])] };
  const entries = Object.entries({ ...state.activity, [today]: activity }).sort(([a], [b]) => a.localeCompare(b)).slice(-400);
  return { ...state, activity: Object.fromEntries(entries) };
}
export function scheduleLesson(state: LearningState, id: string, today: Day): LearningState {
  return state.reviews[id] ? state : { ...state, reviews: { ...state.reviews, [id]: { dueOn: addDays(today, 2), reviewedOn: null, successes: 0 } } };
}
export function rateReview(state: LearningState, id: string, known: boolean, today: Day): LearningState {
  const previous = state.reviews[id];
  const sameDay = previous?.reviewedOn === today;
  const keepSchedule = known && previous && (sameDay || previous.dueOn > today);
  const successes = known ? keepSchedule ? previous.successes : Math.min(4, (previous?.successes ?? 0) + 1) : 0;
  const dueOn = keepSchedule ? previous.dueOn : addDays(today, known ? [2, 7, 21, 60][Math.max(0, successes - 1)] : 1);
  let next = recordActivity({ ...state, reviews: { ...state.reviews, [id]: { dueOn, reviewedOn: today, successes } } }, today, "cards", id);
  if (known && previous && (!previous.reviewedOn || previous.reviewedOn < today) && previous.dueOn <= today) {
    next = { ...next, milestones: { ...next.milestones, "first-revisit": next.milestones["first-revisit"] ?? today } };
  }
  return next;
}
export function dueLessonIds(state: LearningState, completed: readonly string[], known: readonly string[], today: Day, courseLessons: readonly { id: string }[] = lessons) {
  const learned = new Set([...completed, ...known, ...Object.keys(state.reviews)]);
  return courseLessons.filter(({ id }) => learned.has(id) && (!state.reviews[id] || state.reviews[id].dueOn <= today))
    .sort((a, b) => (state.reviews[a.id]?.dueOn ?? "").localeCompare(state.reviews[b.id]?.dueOn ?? "")).map(({ id }) => id);
}
export function completeChallenge(state: LearningState, id: string, today: Day): LearningState {
  const previous = state.challenges[id];
  return recordActivity({ ...state, challenges: { ...state.challenges, [id]: {
    practicedOn: previous?.practicedOn ?? today,
    lastPracticedOn: today,
    revisitedOn: previous?.revisitedOn ?? (previous && previous.practicedOn < today ? today : null),
  } } }, today, "challenges", id);
}
export function awardMilestones(state: LearningState, projectReady: boolean, today: Day, courseLessons: readonly { id: string }[] = lessons): LearningState {
  const milestones = { ...state.milestones };
  if (Object.keys(state.challenges).length) milestones["first-decision"] ??= today;
  if (courseLessons.length >= 3 && courseLessons.slice(0, 3).every(({ id }) => state.challenges[id])) milestones.foundations ??= today;
  if (projectReady) milestones["project-draft"] ??= today;
  return { ...state, milestones };
}
