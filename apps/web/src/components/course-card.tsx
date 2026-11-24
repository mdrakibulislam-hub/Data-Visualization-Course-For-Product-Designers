import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { Link } from "@tanstack/react-router";
import { Check } from "reicon-react";

import type { Course, AvailableCourse } from "@/course/catalog";
import { getResumeLesson } from "@/course/progress";
import { useSavedProgress } from "@/course/use-saved-progress";
import { CourseCountdown } from "./course-countdown";
import { CourseArtwork } from "./course-artwork";
import { LibraryIcon, libraryAsset } from "./library-assets";

function CourseCover({ course }: { course: Course }) {
  return course.cover === "data" ? <img src={libraryAsset("data-visualization.svg")} width={498} height={279.125} alt="" aria-hidden="true" className="library-course-image" /> : <CourseArtwork kind={course.cover} />;
}

export function CourseCard({ course, hasCountdown = false }: { course: Course; hasCountdown?: boolean }) {
  if (course.status === "available") return <AvailableCourseCard course={course} />;
  const releaseDate = course.status === "scheduled" ? new Date(course.releaseAt).toLocaleDateString(undefined, { timeZone: "Asia/Dhaka", month: "short", day: "numeric" }) : null;
  return (
    <Card padding={0} className="library-course-tile" data-status={course.status}>
      <VStack as="article" gap={0} aria-labelledby={`course-${course.id}`}>
        <VStack className="library-course-cover" align="center" justify="center" gap={0}>
          {hasCountdown && course.status === "scheduled" ? <CourseCountdown releaseAt={course.releaseAt} /> : <CourseCover course={course} />}
        </VStack>
        <HStack padding={5} gap={2} justify="between" align="center" wrap="wrap" className="library-course-info">
          <Heading level={2} id={`course-${course.id}`} className="library-course-title">{course.title}</Heading>
          <Text as="p" color="secondary" type="supporting">{hasCountdown ? course.topic : releaseDate ? `Releases ${releaseDate}` : "Coming soon"}</Text>
        </HStack>
      </VStack>
    </Card>
  );
}

function AvailableCourseCard({ course }: { course: AvailableCourse }) {
  const { progress } = useSavedProgress(course);
  const { lessons } = course.content;
  const hasStarted = progress.lastLesson !== null || progress.completed.length > 0;
  const resume = getResumeLesson(progress, lessons);
  return (
    <Card padding={0} className="library-course-tile" data-status="available">
      <VStack as="article" gap={0} aria-labelledby={`course-${course.id}`}>
        <VStack className="library-course-cover" gap={0}><CourseCover course={course} /></VStack>
        <HStack gap={2} padding={5} justify="between" align="center" wrap="wrap" className="library-course-info">
          <Heading level={2} id={`course-${course.id}`} className="library-course-title"><Link to="/courses/$courseId" params={{ courseId: course.id }} className="library-course-link">{course.title}</Link></Heading>
          {hasStarted && <Link {...(resume ? { to: "/courses/$courseId/lessons/$lessonId" as const, params: { courseId: course.id, lessonId: resume.id } } : { to: "/courses/$courseId/$page" as const, params: { courseId: course.id, page: "review" } })} className="library-course-open" aria-label={`${resume ? "Continue" : "Review"} ${course.title}`}>{!resume && <Check size={14} aria-hidden="true" />}{resume ? "Continue" : "Review"}<LibraryIcon name="arrow-right" /></Link>}
        </HStack>
      </VStack>
    </Card>
  );
}
