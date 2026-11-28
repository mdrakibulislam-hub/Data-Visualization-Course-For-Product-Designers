export const hciProjectIds = ["appointment", "permissions"] as const;
export type HciProjectId = typeof hciProjectIds[number];
export const hciStepIds = ["brief", "cognition", "research", "flow", "alternatives", "prototype", "inclusion", "evaluation", "systems", "memo"] as const;
export type HciStepId = typeof hciStepIds[number];
export const hciRubricIds = ["framing", "reasoning", "alternatives", "inclusion", "evidence", "revision"] as const;
export type HciRubricId = typeof hciRubricIds[number];
export type HciProject = { path: "case" | "field"; entries: Partial<Record<HciStepId, string>>; checks: HciStepId[]; ratings: Partial<Record<HciRubricId, number>> };
export type HciProgress = { notes: Record<string, string>; projects: Record<HciProjectId, HciProject> };
export const emptyHciProject = (): HciProject => ({ path: "case", entries: {}, checks: [], ratings: {} });
export const emptyHciProgress = (): HciProgress => ({ notes: {}, projects: { appointment: emptyHciProject(), permissions: emptyHciProject() } });
const object = (value: unknown): Record<string, unknown> => value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
export function parseHciProgress(value: unknown, lessonIds: ReadonlySet<string>): HciProgress {
  const raw = object(value);
  const next = emptyHciProgress();
  for (const [id, note] of Object.entries(object(raw.notes))) if (lessonIds.has(id) && typeof note === "string") next.notes[id] = note.slice(0, 1200);
  const projects = object(raw.projects);
  for (const id of hciProjectIds) {
    const saved = object(projects[id]);
    const project = next.projects[id];
    project.path = saved.path === "field" ? "field" : "case";
    const entries = object(saved.entries);
    for (const step of hciStepIds) if (typeof entries[step] === "string") project.entries[step] = entries[step].slice(0, 4000);
    project.checks = hciStepIds.filter((step) => Array.isArray(saved.checks) && saved.checks.includes(step));
    const ratings = object(saved.ratings);
    for (const key of hciRubricIds) {
      const rating = ratings[key];
      if (typeof rating === "number" && Number.isInteger(rating) && rating >= 0 && rating <= 3) project.ratings[key] = rating;
    }
  }
  return next;
}
