import { describe, expect, test } from "bun:test";
import { dataVisualizationCourse, defineCourseContent, type AvailableCourse } from "../apps/web/src/course/catalog";
import { createProgressBackup, emptyProgress, parseCourseProgress, readProgressBackup } from "../apps/web/src/course/progress-data";
import { courseProgressKey, legacyProgressKey, loadCourseProgress, saveCourseProgress, type ProgressStorage } from "../apps/web/src/course/progress-storage";
import { rateReview } from "../apps/web/src/course/learning-state";

class MemoryStorage implements ProgressStorage {
  values = new Map<string, string>();
  failWrites = false;
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { if (this.failWrites) throw new Error("Storage full"); this.values.set(key, value); }
}
const first = dataVisualizationCourse.content.lessons[0];
const secondCourse: AvailableCourse = {
  id: "test-hci", title: "HCI", description: "A separate course", topic: "Foundations", cover: "perception", status: "available",
  // Reusing a lesson ID deliberately verifies that identity is scoped to a course.
  content: defineCourseContent([{ title: "Perception", description: "How people see", lessons: [first] }]),
};
function legacyProgress() {
  return {
    ...emptyProgress(), lastLesson: first.id, completed: [first.id], answers: { [`${first.id}:0`]: 1 },
    knownCards: [first.id], reviewCard: first.id, capstone: "Keep this project note", onboardingDraft: "Keep this other draft",
    projectChecks: { delivery: ["brief" as const], onboarding: ["data" as const] },
    learning: { ...rateReview(emptyProgress().learning, first.id, true, "2026-11-23"), weeklyGoal: 3, milestones: { "first-decision": "2026-11-23" } },
    quiz: { scope: "all", ids: [`${first.id}:0`], answers: [1], cursor: 1, retry: false }, quizBests: { all: 1 },
  };
}

describe("course-scoped storage migration", () => {
  test("preserves the full learning record and leaves the original key untouched", () => {
    const storage = new MemoryStorage();
    const raw = JSON.stringify(legacyProgress());
    storage.setItem(legacyProgressKey, raw);
    const loaded = loadCourseProgress(storage, dataVisualizationCourse);
    expect(loaded.canSave).toBe(true);
    expect(loaded.progress).toEqual(legacyProgress());
    expect(storage.getItem(legacyProgressKey)).toBe(raw);
    const saved = JSON.parse(storage.getItem(courseProgressKey(dataVisualizationCourse.id))!);
    expect(saved.version).toBe(2);
    expect(saved.courseId).toBe(dataVisualizationCourse.id);
    expect(saved.progress).toEqual(legacyProgress());
  });
  test("a migrated record takes precedence over its older fallback", () => {
    const storage = new MemoryStorage();
    storage.setItem(legacyProgressKey, JSON.stringify(legacyProgress()));
    loadCourseProgress(storage, dataVisualizationCourse);
    const updated = { ...legacyProgress(), capstone: "A newer draft" };
    saveCourseProgress(storage, dataVisualizationCourse, updated);
    expect(loadCourseProgress(storage, dataVisualizationCourse).progress.capstone).toBe("A newer draft");
  });
  test("courses with identical lesson IDs cannot overwrite each other", () => {
    const storage = new MemoryStorage();
    saveCourseProgress(storage, dataVisualizationCourse, legacyProgress());
    const original = storage.getItem(courseProgressKey(dataVisualizationCourse.id));
    saveCourseProgress(storage, secondCourse, { ...emptyProgress(), lastLesson: first.id, capstone: "HCI notes", completed: [] });
    expect(storage.getItem(courseProgressKey(dataVisualizationCourse.id))).toBe(original);
    expect(loadCourseProgress(storage, secondCourse).progress.completed).toEqual([]);
    expect(loadCourseProgress(storage, secondCourse).progress.capstone).toBe("HCI notes");
    expect(loadCourseProgress(storage, dataVisualizationCourse).progress.completed).toEqual([first.id]);
  });
  test("new courses never inherit the old data visualization record", () => {
    const storage = new MemoryStorage();
    storage.setItem(legacyProgressKey, JSON.stringify(legacyProgress()));
    expect(loadCourseProgress(storage, secondCourse).progress).toEqual(emptyProgress());
    expect(storage.getItem(courseProgressKey(secondCourse.id))).toBeNull();
  });
  test("a failed migration keeps the learner’s data available in memory", () => {
    const storage = new MemoryStorage();
    const raw = JSON.stringify(legacyProgress());
    storage.setItem(legacyProgressKey, raw);
    storage.failWrites = true;
    const loaded = loadCourseProgress(storage, dataVisualizationCourse);
    expect(loaded.canSave).toBe(false);
    expect(loaded.progress).toEqual(legacyProgress());
    expect(storage.getItem(legacyProgressKey)).toBe(raw);
  });
  test("corrupt or future records are preserved instead of replaced by an empty write", () => {
    for (const raw of ["not json", JSON.stringify({ version: 3, courseId: dataVisualizationCourse.id, progress: legacyProgress() })]) {
      const storage = new MemoryStorage();
      storage.setItem(courseProgressKey(dataVisualizationCourse.id), raw);
      expect(loadCourseProgress(storage, dataVisualizationCourse).isWriteBlocked).toBe(true);
      expect(saveCourseProgress(storage, dataVisualizationCourse, emptyProgress()).canSave).toBe(false);
      expect(storage.getItem(courseProgressKey(dataVisualizationCourse.id))).toBe(raw);
    }
  });
});

describe("course-aware backups and content validation", () => {
  test("version 2 retains all data and identifies its course", () => {
    const backup = createProgressBackup(legacyProgress());
    expect(backup.courseId).toBe(dataVisualizationCourse.id);
    expect(readProgressBackup(JSON.stringify(backup))).toEqual(legacyProgress());
    expect(() => readProgressBackup(JSON.stringify(backup), secondCourse)).toThrow();
  });
  test("legacy backups remain importable only into data visualization", () => {
    const raw = JSON.stringify({ format: "graphnotes-progress", version: 1, progress: legacyProgress() });
    expect(readProgressBackup(raw)).toEqual(legacyProgress());
    expect(() => readProgressBackup(raw, secondCourse)).toThrow();
  });
  test("a course validates its own curriculum and quiz bank", () => {
    const parsed = parseCourseProgress({ ...legacyProgress(), completed: [first.id, "not-in-this-course"] }, secondCourse);
    expect(parsed.completed).toEqual([first.id]);
    expect(parsed.quiz?.ids).toEqual([`${first.id}:0`]);
    expect(parsed.learning.reviews[first.id]).toBeDefined();
    expect(parsed.answers[`${first.id}:0`]).toBe(1);
  });
});
