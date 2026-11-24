import type { Course } from "./catalog";

export function browseCourses(catalog: readonly Course[], query = "", topic = "all") {
  const needle = query.trim().toLocaleLowerCase();
  return catalog.filter((course) => (topic === "all" || course.topic === topic) &&
    (!needle || `${course.title} ${course.description} ${course.topic}`.toLocaleLowerCase().includes(needle)))
    .sort((a, b) => Number(b.status === "available") - Number(a.status === "available"));
}
export function catalogTopics(catalog: readonly Course[]) {
  const counts = new Map<string, number>();
  for (const course of catalog) counts.set(course.topic, (counts.get(course.topic) ?? 0) + 1);
  return [...counts].filter(([, count]) => count >= 2).map(([topic]) => ({ value: topic, label: topic }));
}
export function nearestReleaseId(catalog: readonly Course[]) {
  return catalog.filter((course) => course.status === "scheduled").sort((a, b) => Date.parse(a.releaseAt) - Date.parse(b.releaseAt))[0]?.id;
}
