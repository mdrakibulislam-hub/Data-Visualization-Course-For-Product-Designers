import { createFileRoute, notFound } from "@tanstack/react-router";
import { findCourse } from "@/course/catalog";
import { LessonReader } from "@/course/lesson-reader";

export const Route = createFileRoute("/courses/$courseId/lessons/$lessonId")({
  loader: ({ params }) => {
    const course = findCourse(params.courseId);
    const lesson = course?.status === "available" && course.content.lessons.find(({ id }) => id === params.lessonId);
    if (!lesson) throw notFound();
    return lesson;
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Lesson"} · Graphnotes` }] }),
  component: LessonPage,
});
function LessonPage() {
  const lesson = Route.useLoaderData();
  return <LessonReader key={lesson.id} lesson={lesson} />;
}
