import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";
import { findCourse } from "@/course/catalog";

export const Route = createFileRoute("/courses/$courseId")({
  loader: ({ params }) => {
    const course = findCourse(params.courseId);
    if (!course || course.status !== "available") throw notFound();
    return course;
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Course"} · Graphnotes` }] }),
  component: Outlet,
});
