import { modules as dataVisualizationModules, lessons as dataVisualizationLessons } from "./curriculum";
import type { CourseLesson } from "./curriculum";
import { challenges as dataVisualizationChallenges } from "./challenges";
import { labs as dataVisualizationLabs } from "./lab-data";
import { hciReleaseAt } from "./course-releases";
import { createQuizBank, dataVisualizationQuiz } from "./quiz-data";
import { articleSources, bookSources } from "./sources";
import { milestoneDefinitions, type MilestoneId } from "./learning-state";

export const dataVisualizationId = "data-visualization";
export type CourseCover = "data" | "perception" | "interaction" | "research";
export type CourseModule = typeof dataVisualizationModules[number];
export type CourseContent = {
  modules: readonly CourseModule[];
  lessons: readonly CourseLesson[];
  quiz: ReturnType<typeof createQuizBank>;
  labs: typeof dataVisualizationLabs;
  challenges: typeof dataVisualizationChallenges;
  articles: typeof articleSources;
  books: typeof bookSources;
  hasProjects: boolean;
  milestones: readonly { id: MilestoneId; title: string; description: string }[];
};

type CourseDetails = {
  id: string;
  title: string;
  description: string;
  topic: string;
  cover: CourseCover;
};
export type AvailableCourse = CourseDetails & { status: "available"; content: CourseContent };
export type UpcomingCourse = CourseDetails & ({ status: "scheduled"; releaseAt: string } | { status: "planned" });
export type Course = AvailableCourse | UpcomingCourse;

/** Shared lesson, flashcard and quiz content; subject-specific practice is optional. */
export function defineCourseContent(modules: readonly CourseModule[], extras: Partial<Omit<CourseContent, "modules" | "lessons">> = {}): CourseContent {
  const lessons = modules.flatMap((module) => module.lessons.map((lesson) => ({ ...lesson, moduleTitle: module.title })));
  return { modules, lessons, quiz: createQuizBank(lessons, modules), labs: {}, challenges: [], articles: [], books: [], hasProjects: false, milestones: milestoneDefinitions.filter(({ id }) => id === "first-revisit"), ...extras };
}

export const dataVisualizationCourse: AvailableCourse = {
  id: dataVisualizationId,
  title: "Data visualization",
  description: "Choose and design charts that help people make decisions.",
  topic: "Data & decisions",
  cover: "data",
  status: "available",
  content: {
    modules: dataVisualizationModules,
    lessons: dataVisualizationLessons,
    quiz: dataVisualizationQuiz,
    labs: dataVisualizationLabs,
    challenges: dataVisualizationChallenges,
    articles: articleSources,
    books: bookSources,
    hasProjects: true,
    milestones: milestoneDefinitions,
  },
};

/** Add course content and one entry here; every catalog card uses the same template. */
export const courses: readonly Course[] = [
  dataVisualizationCourse,
  {
    id: "human-computer-interaction",
    title: "Human–computer interaction",
    description: "Understand how people perceive, learn, and use interfaces.",
    topic: "Design foundations",
    cover: "perception",
    status: "scheduled",
    releaseAt: hciReleaseAt,
  },
];

export function findCourse(id: string) { return courses.find((course) => course.id === id); }
export function courseMinutes(course: AvailableCourse) { return course.content.lessons.reduce((sum, lesson) => sum + lesson.minutes, 0); }
export function courseDuration(course: AvailableCourse) {
  const minutes = courseMinutes(course);
  return minutes >= 60 ? `${Math.floor(minutes / 60)} hr${minutes % 60 ? ` ${minutes % 60} min` : ""}` : `${minutes} min`;
}
export function courseOverviewHref(course: Course) { return `/courses/${course.id}`; }
export function coursePageHref(course: Course, page: string) { return `/courses/${course.id}/${page}`; }
export function courseLessonHref(course: Course, lessonId: string) { return `/courses/${course.id}/lessons/${lessonId}`; }
export function courseForPath(path: string) {
  const id = path.match(/^\/courses\/([^/]+)/)?.[1];
  const course = id && findCourse(id);
  return course && course.status === "available" ? course : dataVisualizationCourse;
}

export const courseTopics = [
  { courseId: "ux-research", label: "UX Research" },
  { courseId: "interaction-design", label: "Interaction Design" },
  { courseId: "human-computer-interaction", label: "Human–Computer Interaction (HCI)" },
  { courseId: "design-systems", label: "Design Systems" },
  { courseId: "accessibility", label: "Accessibility & Inclusive Design" },
  { courseId: "information-architecture", label: "Information Architecture" },
  { courseId: "usability-testing", label: "Usability Testing" },
  { courseId: "ux-writing", label: "UX Writing" },
  { courseId: "visual-ui-design", label: "Visual & UI Design" },
  { courseId: "product-strategy", label: "Product Strategy" },
];
export function requestableTopics(catalog: readonly Course[] = courses) {
  const available = catalog.filter((course) => course.status === "available");
  const publishedIds = new Set(available.map((course) => course.id));
  const publishedTitles = new Set(available.map((course) => course.title.toLocaleLowerCase()));
  return courseTopics.filter(({ courseId, label }) => !publishedIds.has(courseId) && !publishedTitles.has(label.toLocaleLowerCase())).map(({ label }) => label);
}
