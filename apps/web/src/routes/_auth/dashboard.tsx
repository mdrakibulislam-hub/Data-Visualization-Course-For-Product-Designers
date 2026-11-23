import { createFileRoute } from "@tanstack/react-router";

// The parent redirects legacy account routes to the local learning experience.
export const Route = createFileRoute("/_auth/dashboard")({ component: () => null });
