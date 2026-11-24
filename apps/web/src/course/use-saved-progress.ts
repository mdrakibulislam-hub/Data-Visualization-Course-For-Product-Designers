import { useEffect, useState } from "react";
import type { AvailableCourse } from "./catalog";
import { emptyProgress } from "./progress-data";
import { courseProgressKey, legacyProgressKey, loadCourseProgress, progressChangedEvent, type ProgressSnapshot } from "./progress-storage";

const memory = new Map<string, ProgressSnapshot>();
export function readSavedProgress(course: AvailableCourse) {
  const retained = memory.get(course.id);
  // Retain in-tab learning when storage is blocked, full, or unreadable.
  if (retained && !retained.canSave) return retained;
  try { return loadCourseProgress(window.localStorage, course); }
  catch { return { progress: retained?.progress ?? emptyProgress(), canSave: false }; }
}
export function publishProgress(courseId: string, snapshot: ProgressSnapshot) {
  memory.set(courseId, snapshot);
  window.dispatchEvent(new CustomEvent(progressChangedEvent, { detail: courseId }));
}
export function useSavedProgress(course: AvailableCourse) {
  const [snapshot, setSnapshot] = useState(() => readSavedProgress(course));
  useEffect(() => {
    const refresh = () => setSnapshot(readSavedProgress(course));
    const onStorage = (event: StorageEvent) => {
      if (event.key === courseProgressKey(course.id) || event.key === null || (event.key === legacyProgressKey && course.id === "data-visualization")) {
        memory.delete(course.id);
        refresh();
      }
    };
    const onChange = (event: Event) => { if ((event as CustomEvent<string>).detail === course.id) refresh(); };
    window.addEventListener("storage", onStorage);
    window.addEventListener(progressChangedEvent, onChange);
    refresh();
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(progressChangedEvent, onChange);
    };
  }, [course]);
  return snapshot;
}
