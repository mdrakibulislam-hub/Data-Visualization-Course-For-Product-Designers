import { createFileRoute, notFound } from "@tanstack/react-router";
import { Flashcards } from "./review";
import { QuizzesPage } from "./quizzes";
import { PreferencesPage } from "./preferences";
import { SourcesPage } from "./sources";

const pages = { review: Flashcards, quizzes: QuizzesPage, preferences: PreferencesPage, sources: SourcesPage };
const titles = { review: "Flashcards", quizzes: "Quizzes", preferences: "Preferences", sources: "Credits" };
export const Route = createFileRoute("/courses/$courseId/$page")({
  loader: ({ params }) => { if (!Object.hasOwn(pages, params.page)) throw notFound(); },
  head: ({ params }) => ({ meta: [{ title: `${titles[params.page as keyof typeof titles] ?? "Course"} · Graphnotes` }] }),
  component: CoursePage,
});
function CoursePage() {
  const { page } = Route.useParams();
  const Component = pages[page as keyof typeof pages];
  return <Component key={page} />;
}
