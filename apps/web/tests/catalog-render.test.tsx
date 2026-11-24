/// <reference types="bun" />

import { expect, test } from "bun:test";
import { renderToString } from "react-dom/server";
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "../src/components/theme-provider";
import { CourseLibrary } from "../src/routes/index";
import { dataVisualizationCourse } from "../src/course/catalog";

test("the shared library renders 2, 6 and 12 cards and reveals browsing tools only when useful", async () => {
  for (const count of [2, 6, 12]) {
    const catalog = Array.from({ length: count }, (_, index) => ({ ...dataVisualizationCourse, id: `fixture-${index}`, title: `Fixture course ${index}`, topic: index % 2 ? "Research" : "Foundations" }));
    const root = createRootRoute({ component: () => <ThemeProvider><CourseLibrary catalog={catalog} /></ThemeProvider> });
    const router = createRouter({ routeTree: root, history: createMemoryHistory({ initialEntries: ["/"] }) });
    await router.load();
    const html = renderToString(<RouterProvider router={router} />);
    expect((html.match(/data-status="available"/g) ?? []).length).toBe(count);
    expect(html.includes('placeholder="Search courses"')).toBe(count >= 6);
    expect(html.includes('All topics')).toBe(count >= 6);
  }
});
