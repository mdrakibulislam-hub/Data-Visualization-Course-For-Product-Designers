/// <reference types="bun" />
import { expect, test } from "bun:test";
import { renderToString } from "react-dom/server";
import { createMemoryHistory, createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "../src/components/theme-provider";
import { CurrentCourseProvider } from "../src/course/course-context";
import { hciCourse } from "../src/course/catalog";
import { ProgressProvider } from "../src/course/progress";
import { LessonReader } from "../src/course/lesson-reader";
import { InteractionExperiment } from "../src/course/hci/experiments";
import { HciGlossaryPage, HciProjectPage, InteractionPracticePage, exportHciProject } from "../src/course/hci/pages";
import { emptyHciProject } from "../src/course/hci/state";
import { QuizzesPage } from "../src/routes/quizzes";

test("every HCI experiment renders an accessible teaching boundary and reset control", () => {
  for (const lab of hciCourse.content.interaction!.labs) {
    const html = renderToString(<ThemeProvider><InteractionExperiment lab={lab} /></ThemeProvider>);
    expect(html).toContain(lab.title);
    expect(html).toContain("Fictional teaching example");
    expect(html).toContain("Reset this experiment");
  }
});

async function renderPage(component: () => React.ReactNode) {
  const root = createRootRoute({ component: () => <ThemeProvider><CurrentCourseProvider course={hciCourse}><ProgressProvider><Outlet /></ProgressProvider></CurrentCourseProvider></ThemeProvider> });
  const page = createRoute({ getParentRoute: () => root, path: "/", component });
  const router = createRouter({ routeTree: root.addChildren([page]), history: createMemoryHistory({ initialEntries: ["/"] }) });
  await router.load();
  return renderToString(<RouterProvider router={router} />);
}

test("HCI lesson reading uses interaction activities and resolves sources instead of chart controls", async () => {
  for (const id of ["hci-human-goals", "hci-memory", "hci-error-recovery", "hci-capstone-defend"]) {
    const lesson = hciCourse.content.lessons.find((lesson) => lesson.id === id)!;
    const html = await renderPage(() => <LessonReader lesson={lesson} />);
    expect(html).toContain(lesson.title);
    expect(html).toContain("Your prediction or reasoning");
    expect(html).toContain("Open your capstone workspace");
    expect(html).toContain("Words in this lesson");
    expect(html).not.toContain("Try the chart");
    expect(html).not.toContain("Find the region that needs attention");
  }
});

test("the practice catalog, project workspace, and glossary render with HCI context", async () => {
  expect(await renderPage(InteractionPracticePage)).toContain("Correct a suggested time");
  const project = await renderPage(HciProjectPage);
  expect(project).toContain("Supplied fictional research and test records");
  expect(project).toContain("Self-review rubric");
  expect(project).toContain("Decision memo");
  expect(await renderPage(HciGlossaryPage)).toContain("Working memory");
  const quizzes = await renderPage(QuizzesPage);
  expect(quizzes).toContain("interaction decisions");
  expect(quizzes).not.toContain("chart decisions");
});

test("a project export preserves the evidence label, independent entries, and self-review meaning", () => {
  const project = emptyHciProject(); project.entries.brief = "My appointment brief"; project.checks = ["brief"]; project.ratings.evidence = 2;
  const exported = exportHciProject("Appointment", project, hciCourse.content.interaction!.moduleOutputs);
  expect(exported).toContain("supplied fictional observations, not user validation");
  expect(exported).toContain("My appointment brief");
  expect(exported).toContain("Self-check: marked");
  expect(exported).toContain("Evaluation quality: 2/3");
  expect(exported).toContain("Self-review is not independent grading");
});
