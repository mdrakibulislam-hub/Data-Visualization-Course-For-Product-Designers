import { Toaster } from "@Data-Visualization-Course-For-Product-Designers/ui/components/sonner";
import type { QueryClient } from "@tanstack/react-query";
import { HeadContent, Link, Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import { CourseShell } from "@/components/course-shell";
import { ThemeProvider, useAppearance } from "@/components/theme-provider";
import { ProgressProvider } from "@/course/progress";
import type { trpc } from "@/utils/trpc";

export interface RouterAppContext {
  trpc: typeof trpc;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  notFoundComponent: () => (
    <section className="course-wrap course-simple-page">
      <h1>Page unavailable</h1>
      <Link to="/">Browse the course</Link>
    </section>
  ),
  head: () => ({
    meta: [
      { title: "Data Viz Field Guide · Data visualization for product designers" },
      { name: "description", content: "A self-paced data visualization course for product designers, with interactive charts, quizzes, and flashcards." },
    ],
  }),
});

function CourseToaster() {
  const { appearance } = useAppearance();
  return <Toaster richColors theme={appearance === "dark" ? "dark" : "light"} />;
}

function RootComponent() {
  return (
    <>
      <HeadContent />
      <ThemeProvider>
        <ProgressProvider>
          <CourseShell>
            <Outlet />
          </CourseShell>
        </ProgressProvider>
        <CourseToaster />
      </ThemeProvider>
    </>
  );
}
