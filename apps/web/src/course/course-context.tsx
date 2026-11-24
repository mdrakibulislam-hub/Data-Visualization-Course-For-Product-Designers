import { createContext, useContext, type ReactNode } from "react";
import { dataVisualizationCourse, type AvailableCourse } from "./catalog";

const CourseContext = createContext<AvailableCourse>(dataVisualizationCourse);
export function CurrentCourseProvider({ course, children }: { course: AvailableCourse; children: ReactNode }) {
  return <CourseContext.Provider value={course}>{children}</CourseContext.Provider>;
}
export function useCurrentCourse() { return useContext(CourseContext); }
