import { describe, expect, test } from "bun:test";
import { courses, dataVisualizationCourse, requestableTopics, type Course } from "../apps/web/src/course/catalog";
import { browseCourses, catalogTopics, nearestReleaseId } from "../apps/web/src/course/catalog-browsing";

function fixtures(count: number): Course[] {
  return Array.from({ length: count }, (_, index) => ({ ...dataVisualizationCourse, id: `fixture-${index}`, title: `Course ${index}`, topic: index % 2 ? "Research" : "Foundations" }));
}

describe("a growing course catalog", () => {
  test("the real registry has unique IDs and valid available curricula", () => {
    expect(new Set(courses.map(({ id }) => id)).size).toBe(courses.length);
    for (const course of courses) {
      if (course.status === "available") {
        expect(course.content.lessons.length).toBeGreaterThan(0);
        expect(new Set(course.content.lessons.map(({ id }) => id)).size).toBe(course.content.lessons.length);
      }
      if (course.status === "scheduled") expect(Number.isFinite(Date.parse(course.releaseAt))).toBe(true);
    }
  });
  test("2-, 6-, and 12-course libraries use the same ordering and filtering", () => {
    for (const size of [2, 6, 12]) {
      const catalog = fixtures(size);
      expect(browseCourses(catalog)).toHaveLength(size);
      expect(browseCourses(catalog, "course 1").length).toBeGreaterThan(0);
      expect(browseCourses(catalog, "", "Research")).toHaveLength(size / 2);
      expect(browseCourses(catalog, "no match")).toEqual([]);
      expect(catalog).toEqual(fixtures(size));
    }
  });
  test("available courses lead; only the next scheduled course gets a countdown", () => {
    const catalog: Course[] = [
      { ...courses[1], id: "later", status: "scheduled", releaseAt: "2027-01-01T00:00:00+06:00" },
      courses[1], dataVisualizationCourse,
    ];
    expect(browseCourses(catalog)[0].id).toBe(dataVisualizationCourse.id);
    expect(nearestReleaseId(catalog)).toBe(courses[1].id);
  });
  test("single-item topics are withheld and already available topics are not requests", () => {
    expect(catalogTopics(courses)).toEqual([]);
    expect(catalogTopics(fixtures(6))).toHaveLength(2);
    expect(requestableTopics([{ ...dataVisualizationCourse, title: "UX Research" }])).not.toContain("UX Research");
    expect(requestableTopics([{ ...dataVisualizationCourse, id: "human-computer-interaction", title: "Human–computer interaction" }])).not.toContain("Human–Computer Interaction (HCI)");
  });
});
