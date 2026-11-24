import { Heading } from "@astryxdesign/core/Heading";
import { VStack } from "@astryxdesign/core/VStack";
import { Toaster } from "@Data-Visualization-Course-For-Product-Designers/ui/components/sonner";
import type { QueryClient } from "@tanstack/react-query";
import { HeadContent, Link, Outlet, createRootRouteWithContext, useRouterState } from "@tanstack/react-router";

import { CourseShell } from "@/components/course-shell";
import { ThemeProvider, useAppearance } from "@/components/theme-provider";
import { ProgressProvider } from "@/course/progress";
import { courseForPath } from "@/course/catalog";
import { CurrentCourseProvider } from "@/course/course-context";
import type { trpc } from "@/utils/trpc";

export interface RouterAppContext {
  trpc: typeof trpc;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  notFoundComponent: () => (
    <VStack as="section" className="course-wrap course-simple-page" gap={3}>
      <Heading level={1} className="course-display course-page-title">Page unavailable</Heading>
      <Link to="/" className="practice-link">Browse courses</Link>
    </VStack>
  ),
  head: () => ({
    meta: [
      { title: "Graphnotes · Courses for product designers" },
      { name: "description", content: "Practical courses for product designers. Learn data visualization with interactive charts, quizzes, and flashcards. More design courses are on the way." },
    ],
  }),
});

function CourseToaster() {
  const { appearance } = useAppearance();
  return <Toaster richColors theme={appearance === "dark" ? "dark" : "light"} />;
}

function RootComponent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isLibrary = pathname === "/";
  const course = courseForPath(pathname);
  return (
    <>
      <HeadContent />
      <ThemeProvider>
        <CurrentCourseProvider course={course}>
          <ProgressProvider key={course.id}>
            {isLibrary ? <VStack className="course-shell library-shell" gap={0}><Outlet /></VStack> : <CourseShell><Outlet /></CourseShell>}
          </ProgressProvider>
        </CurrentCourseProvider>
        <CourseToaster />
      </ThemeProvider>
    </>
  );
}
