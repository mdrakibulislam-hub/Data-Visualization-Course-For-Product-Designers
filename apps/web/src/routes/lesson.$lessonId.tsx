import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { lessons } from "@/course/curriculum";
import { LessonReader } from "@/course/lesson-reader";

export const Route = createFileRoute("/lesson/$lessonId")({
  loader: ({ params }) => {
    const lesson = lessons.find(({ id }) => id === params.lessonId);
    if (!lesson) throw notFound();
    return lesson;
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Lesson"} · Data Viz Field Guide` }] }),
  component: LessonRoute,
  notFoundComponent: () => (
    <section className="course-wrap course-simple-page">
      <h1>Lesson unavailable</h1>
      <Link to="/">Browse the course</Link>
    </section>
  ),
});

function LessonRoute() {
  const lesson = Route.useLoaderData();
  return <LessonReader key={lesson.id} lesson={lesson} />;
}
