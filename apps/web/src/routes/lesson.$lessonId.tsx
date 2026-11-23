import { Heading } from "@astryxdesign/core/Heading";
import { VStack } from "@astryxdesign/core/VStack";
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
    <VStack as="section" className="course-wrap course-simple-page" gap={3}>
      <Heading level={1} className="course-display course-page-title">Lesson unavailable</Heading>
      <Link to="/" className="practice-link">Browse the course</Link>
    </VStack>
  ),
});

function LessonRoute() {
  const lesson = Route.useLoaderData();
  return <LessonReader key={lesson.id} lesson={lesson} />;
}
