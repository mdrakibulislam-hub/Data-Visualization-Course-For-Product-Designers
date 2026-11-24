import { Card } from "@astryxdesign/core/Card";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Check } from "reicon-react";

import { useCurrentCourse } from "@/course/course-context";
import { courseLessonHref, coursePageHref } from "@/course/catalog";
import { getResumeLesson, useProgress } from "@/course/progress";

export function CourseProgressCard({ completed, canSave, isTooltip = false }: { completed: number; canSave: boolean; isTooltip?: boolean }) {
  const course = useCurrentCourse();
  const { lessons } = course.content;
  const { progress } = useProgress();
  const resume = getResumeLesson(progress, lessons);
  const started = progress.lastLesson !== null || completed > 0;
  const percentage = completed / Math.max(1, lessons.length) * 100;

  return (
    <Card padding={4} className={`course-progress-card${isTooltip ? " course-progress-tooltip" : ""}`}>
      <VStack gap={3}>
        <HStack gap={3} justify="between" align="center" role="progressbar" aria-label="Course progress" aria-valuemin={0} aria-valuemax={lessons.length} aria-valuenow={completed} aria-valuetext={`${completed} of ${lessons.length} lessons complete`}>
          <VStack gap={1}>
            <Text as="p" type="supporting" color="secondary">Course progress</Text>
            <Text as="p" className="course-progress-count"><strong>{completed}</strong> of {lessons.length} lessons</Text>
          </VStack>
          <HStack gap={0} className="course-progress-ring" align="center" justify="center" aria-hidden="true">
            <svg viewBox="0 0 44 44" width={44} height={44}>
              <circle cx={22} cy={22} r={18} className="course-progress-ring-track" />
              <circle cx={22} cy={22} r={18} pathLength={100} strokeDasharray={`${percentage} 100`} opacity={completed ? 1 : 0} className="course-progress-ring-fill" />
            </svg>
            {resume ? <BookOpen size={16} /> : <Check size={16} />}
          </HStack>
        </HStack>
        {(!isTooltip || !canSave) && <VStack gap={1} className="course-progress-card-footer">
          {!isTooltip && <Link to={resume ? courseLessonHref(course, resume.id) : coursePageHref(course, "review")} className="course-progress-action">
            <Text as="span" type="supporting" weight="medium">{resume ? started ? "Continue learning" : "Start learning" : "Review flashcards"}</Text>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>}
          {!canSave && <Text as="p" type="supporting" color="secondary" role="status">Progress is available in this tab only.</Text>}
        </VStack>}
      </VStack>
    </Card>
  );
}
