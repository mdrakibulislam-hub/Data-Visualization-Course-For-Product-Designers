import { dataVisualizationId, type AvailableCourse } from "./catalog";
import { emptyProgress, parseCourseProgress, type Progress } from "./progress-data";

export const legacyProgressKey = "data-viz-field-guide.progress.v1";
export const progressChangedEvent = "graphnotes:course-progress";
export const courseProgressKey = (id: string) => `graphnotes.course-progress.v2.${id}`;
export type ProgressStorage = Pick<Storage, "getItem" | "setItem">;
export type ProgressSnapshot = { progress: Progress; canSave: boolean; isWriteBlocked?: boolean };

function envelope(raw: string, courseId: string) {
  const value = JSON.parse(raw);
  if (value?.version !== 2 || value.courseId !== courseId || !value.progress || typeof value.progress !== "object" || Array.isArray(value.progress)) {
    throw new Error("This course’s saved progress uses an unsupported format.");
  }
  return value.progress;
}

/** Only writes the new course key. The original progress record is retained. */
export function loadCourseProgress(storage: ProgressStorage, course: AvailableCourse): ProgressSnapshot {
  let progress = emptyProgress();
  let raw: string | null;
  try { raw = storage.getItem(courseProgressKey(course.id)); }
  catch { return { progress, canSave: false }; }
  if (raw !== null) {
    try { return { progress: parseCourseProgress(envelope(raw, course.id), course), canSave: true }; }
    catch { return { progress, canSave: false, isWriteBlocked: true }; }
  }
  try {
    const legacy = course.id === dataVisualizationId ? storage.getItem(legacyProgressKey) : null;
    if (legacy !== null) {
      const saved = JSON.parse(legacy);
      if (!saved || typeof saved !== "object" || Array.isArray(saved)) return { progress, canSave: true };
      progress = parseCourseProgress(saved, course);
      storage.setItem(courseProgressKey(course.id), JSON.stringify({ version: 2, courseId: course.id, progress }));
    }
    return { progress, canSave: true };
  } catch { return { progress, canSave: false }; }
}

export function saveCourseProgress(storage: ProgressStorage, course: AvailableCourse, progress: Progress): ProgressSnapshot {
  // Do not overwrite an unknown/future version simply because a lesson opened.
  try {
    const raw = storage.getItem(courseProgressKey(course.id));
    if (raw !== null) envelope(raw, course.id);
  } catch { return { progress, canSave: false, isWriteBlocked: true }; }
  try {
    storage.setItem(courseProgressKey(course.id), JSON.stringify({ version: 2, courseId: course.id, progress }));
    return { progress, canSave: true };
  } catch { return { progress, canSave: false }; }
}
