import { createFileRoute, notFound } from "@tanstack/react-router";
import { Flashcards } from "./review";
import { QuizzesPage } from "./quizzes";
import { PreferencesPage } from "./preferences";
import { SourcesPage } from "./sources";
import { HciGlossaryPage, HciProjectPage, InteractionPracticePage } from "@/course/hci/pages";
import { findCourse } from "@/course/catalog";
import type { HciProjectId } from "@/course/hci/state";

const pages = { review: Flashcards, quizzes: QuizzesPage, preferences: PreferencesPage, sources: SourcesPage, practice: InteractionPracticePage, project: HciProjectPage, glossary: HciGlossaryPage };
const titles = { review: "Flashcards", quizzes: "Quizzes", preferences: "Preferences", sources: "Credits", practice: "Interaction lab", project: "HCI capstone", glossary: "HCI in plain words" };
export const Route = createFileRoute("/courses/$courseId/$page")({
  validateSearch: (search: Record<string, unknown>): { project?: HciProjectId; experiment?: string } => ({
    project: search.project === "permissions" ? "permissions" : search.project === "appointment" ? "appointment" : undefined,
    experiment: typeof search.experiment === "string" && search.experiment.length < 50 ? search.experiment : undefined,
  }),
  loader: ({ params }) => {
    if (!Object.hasOwn(pages, params.page)) throw notFound();
    if (["practice", "project", "glossary"].includes(params.page)) {
      const course = findCourse(params.courseId);
      if (!course || course.status !== "available" || !course.content.interaction) throw notFound();
    }
  },
  head: ({ params }) => ({ meta: [{ title: `${titles[params.page as keyof typeof titles] ?? "Course"} · Graphnotes` }] }),
  component: CoursePage,
});
function CoursePage() {
  const { page } = Route.useParams();
  const Component = pages[page as keyof typeof pages];
  return <Component key={page} />;
}
