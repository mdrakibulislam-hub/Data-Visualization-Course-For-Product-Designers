import { createFileRoute } from "@tanstack/react-router";
import { CourseOverview } from "./course";
export const Route = createFileRoute("/courses/$courseId/")({ component: CourseOverview });
