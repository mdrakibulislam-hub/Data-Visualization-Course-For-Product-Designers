import { describe, expect, test } from "bun:test";
import { dataVisualizationCourse, hciCourse, requestableTopics } from "../apps/web/src/course/catalog";
import { createProgressBackup, emptyProgress, parseCourseProgress, readProgressBackup } from "../apps/web/src/course/progress-data";
import { courseProgressKey, loadCourseProgress, saveCourseProgress } from "../apps/web/src/course/progress-storage";
import { emptyHciProgress, parseHciProgress } from "../apps/web/src/course/hci/state";
import { dayKey, recordActivity, weeklyDays } from "../apps/web/src/course/learning-state";

describe("HCI teaching content", () => {
  const { modules, lessons, quiz, interaction, articles, books } = hciCourse.content;
  test("the published course has the complete sequence and independent lesson questions", () => {
    expect(hciCourse.status).toBe("available");
    expect(modules).toHaveLength(10);
    expect(lessons).toHaveLength(40);
    expect(quiz.practiceQuestions).toHaveLength(80);
    expect(new Set(quiz.practiceQuestions.map(({ id }) => id)).size).toBe(80);
    expect(new Set(lessons.map(({ id }) => id)).size).toBe(40);
    for (const lesson of lessons) {
      expect(lesson.sections.length).toBeGreaterThanOrEqual(3);
      expect(lesson.questions).toHaveLength(2);
      for (const question of lesson.questions) {
        expect(question.options).toHaveLength(3);
        expect(new Set(question.options).size).toBe(3);
        expect(question.options[question.answer]).toBeTruthy();
        expect(question.explanation.length).toBeGreaterThan(40);
      }
      expect(lesson.flashcard.front).toBeTruthy();
      expect(lesson.flashcard.back).toBeTruthy();
      expect(interaction?.guides[lesson.id]).toBeDefined();
    }
    expect(requestableTopics()).not.toContain("Human–Computer Interaction (HCI)");
  });
  test("all reading, glossary, and experiment references resolve", () => {
    const sourceIds = new Set([...articles, ...books].map(({ id }) => id));
    const terms = new Set(interaction!.glossary.map(({ term }) => term));
    const ids = new Set(lessons.map(({ id }) => id));
    expect(sourceIds.size).toBe(articles.length + books.length);
    expect(terms.size).toBe(interaction!.glossary.length);
    expect(interaction!.labs).toHaveLength(16);
    expect(interaction!.moduleOutputs).toHaveLength(modules.length);
    for (const lesson of lessons) {
      for (const reading of lesson.reading) expect(sourceIds.has(reading.source)).toBe(true);
      for (const term of interaction!.guides[lesson.id].terms) expect(terms.has(term)).toBe(true);
      const lab = interaction!.guides[lesson.id].lab;
      if (lab) expect(interaction!.labs.find((entry) => entry.id === lab)?.lessonId).toBe(lesson.id);
    }
    for (const lab of interaction!.labs) expect(ids.has(lab.lessonId)).toBe(true);
  });
});

describe("HCI learning state and course isolation", () => {
  const lessonId = hciCourse.content.lessons[0].id;
  test("predictions, both projects, evidence paths, rubric, and practice survive a course-matched backup", () => {
    const progress = emptyProgress();
    progress.hci.notes[lessonId] = "A prediction rather than a finding.";
    progress.hci.projects.appointment = { path: "case", entries: { brief: "A fictional appointment brief", evaluation: "Supplied case evidence; the prototype is not validated." }, checks: ["brief"], ratings: { evidence: 2 } };
    progress.hci.projects.permissions = { path: "field", entries: { brief: "An independent permissions brief" }, checks: [], ratings: { framing: 1 } };
    progress.learning = recordActivity(progress.learning, dayKey(), "projects", "appointment");
    const restored = readProgressBackup(JSON.stringify(createProgressBackup(progress, hciCourse)), hciCourse);
    expect(restored.hci).toEqual(progress.hci);
    expect(weeklyDays(restored.learning, dayKey())).toBe(1);
    expect(() => readProgressBackup(JSON.stringify(createProgressBackup(progress, hciCourse)), dataVisualizationCourse)).toThrow();
    expect(parseCourseProgress(progress, dataVisualizationCourse).hci).toEqual(emptyHciProgress());
  });
  test("malformed project and reflection records cannot introduce unrelated fields or invalid ratings", () => {
    const next = parseHciProgress({ notes: { [lessonId]: "a".repeat(2000), foreign: "ignore" }, projects: { appointment: { path: "unknown", entries: { brief: "b".repeat(5000), foreign: "ignore" }, checks: ["brief", "brief", "foreign"], ratings: { evidence: 9, framing: 2, revision: 1.5 } } } }, new Set([lessonId]));
    expect(next.notes[lessonId]).toHaveLength(1200);
    expect(next.notes.foreign).toBeUndefined();
    expect(next.projects.appointment.path).toBe("case");
    expect(next.projects.appointment.entries.brief).toHaveLength(4000);
    expect(next.projects.appointment.checks).toEqual(["brief"]);
    expect(next.projects.appointment.ratings).toEqual({ framing: 2 });
    expect(next.projects.permissions).toEqual(emptyHciProgress().projects.permissions);
  });
  test("the two actual courses save separately and retain existing chart project data", () => {
    const records = new Map<string, string>();
    const storage = { getItem: (key: string) => records.get(key) ?? null, setItem: (key: string, value: string) => { records.set(key, value); } };
    const charts = emptyProgress(); charts.capstone = "Keep my existing chart draft"; charts.projectChecks.delivery = ["brief"];
    const hci = emptyProgress(); hci.hci.projects.permissions.entries.memo = "Keep my HCI decision memo";
    saveCourseProgress(storage, dataVisualizationCourse, charts);
    const chartRecord = records.get(courseProgressKey(dataVisualizationCourse.id));
    saveCourseProgress(storage, hciCourse, hci);
    expect(records.get(courseProgressKey(dataVisualizationCourse.id))).toBe(chartRecord);
    expect(loadCourseProgress(storage, dataVisualizationCourse).progress.capstone).toBe(charts.capstone);
    expect(loadCourseProgress(storage, hciCourse).progress.hci.projects.permissions.entries.memo).toBe("Keep my HCI decision memo");
  });
});
