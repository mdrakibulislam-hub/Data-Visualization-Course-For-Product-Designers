import { useAppShellMobile } from "@astryxdesign/core/AppShell";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { ProgressBar } from "@astryxdesign/core/ProgressBar";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "reicon-react";

import { AppearanceTabs } from "@/components/mode-toggle";
import { Columns } from "@/course/charts";
import { lessons, modules, totalMinutes } from "@/course/curriculum";
import { weekdayOrders } from "@/course/lab-data";
import { getResumeLesson, useProgress } from "@/course/progress";

export const Route = createFileRoute("/")({
  component: CourseOverview,
});

function CourseOverview() {
  const { progress, canSave } = useProgress();
  const { isMobile } = useAppShellMobile();
  const resume = getResumeLesson(progress);
  const completed = progress.completed.length;

  return (
    <VStack className="course-wrap course-overview course-motion-enter" gap={0}>
      <HStack as="section" className="course-hero" gap={0} aria-labelledby="course-title">
        <VStack className="course-hero-copy" gap={0}>
          <Heading level={1} id="course-title" className="course-display course-hero-title">
            Data visualization<br className="course-hero-break" /> <em>for product designers.</em>
          </Heading>
          <p className="course-deck">Learn to read, choose, and design charts. Start with everyday examples, then apply the same ideas to data-heavy products.</p>
          <HStack align="center" wrap="wrap" gap={3} className="course-hero-actions">
            {resume ? (
              <Button href={`/lesson/${resume.id}`} label={progress.lastLesson ? "Continue learning" : "Start learning"} variant="primary" size="lg" className="course-action" endContent={<ArrowRight size={17} aria-hidden="true" />} />
            ) : (
              <Button href="/review" label="Review flashcards" variant="primary" size="lg" className="course-action" endContent={<ArrowRight size={17} aria-hidden="true" />} />
            )}
            <Button href="/lab" label="Chart lab" variant="secondary" size="lg" className="course-action" />
            <p className="course-meta">{lessons.length} lessons <span aria-hidden="true">·</span> {Math.floor(totalMinutes / 60)} hr {totalMinutes % 60} min</p>
          </HStack>
        </VStack>
        <Card className="course-hero-figure" padding={4}>
          <VStack as="figure" gap={0}>
            <HStack className="course-figure-head" justify="between" align="center" gap={1}>
              <Text weight="semibold">Orders by weekday</Text>
              <Text type="supporting" color="secondary">Sample data</Text>
            </HStack>
            <Columns values={weekdayOrders} unit="Orders" max={60} emphasis={4} />
            <figcaption>Friday was busiest, with 58 orders.</figcaption>
          </VStack>
        </Card>
      </HStack>

      {isMobile && (
        <Card variant="muted" padding={3}>
          <VStack gap={1}>
            <ProgressBar label="Course progress" value={completed} max={lessons.length} hasValueLabel formatValueLabel={(value, max) => `${value} of ${max}`} />
            <Text as="p" type="supporting" color="secondary">{canSave ? "Saved in this browser" : "Progress is available in this tab only"}</Text>
          </VStack>
        </Card>
      )}

      <VStack as="section" id="curriculum" className="course-curriculum" gap={0} aria-label="Course outline">
        <HStack className="course-curriculum-tools" gap={2} align="center"><AppearanceTabs /></HStack>
        {modules.map((module) => (
          <HStack as="section" className="course-module" key={module.title} align="start" gap={0}>
            <VStack className="course-module-title" gap={1}>
              <Heading level={2}>{module.title}</Heading>
              <p>{module.description}</p>
            </VStack>
            <ol className="course-lesson-list">
              {module.lessons.map((lesson) => {
                const number = lessons.findIndex(({ id }) => id === lesson.id) + 1;
                const isComplete = progress.completed.includes(lesson.id);
                return (
                  <li key={lesson.id}>
                    <Link to="/lesson/$lessonId" params={{ lessonId: lesson.id }} className="course-lesson-row">
                      <span className="course-lesson-index" aria-hidden="true">{String(number).padStart(2, "0")}</span>
                      <VStack gap={0.5}>
                        <strong>{lesson.title}</strong>
                        <p>{lesson.description}</p>
                      </VStack>
                      <span className="course-row-time">{lesson.minutes} min</span>
                      {isComplete ? (
                        <Check className="course-row-completed" size={17} aria-label="Completed" role="img" />
                      ) : <ArrowRight className="course-row-arrow" size={17} aria-hidden="true" />}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
}
