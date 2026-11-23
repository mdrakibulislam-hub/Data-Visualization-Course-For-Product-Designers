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

import { lessons, modules, totalMinutes } from "@/course/curriculum";
import { LearningSummary } from "@/course/learning-summary";
import { OverviewChart } from "@/course/overview-chart";
import { getResumeLesson, useProgress } from "@/course/progress";

export const Route = createFileRoute("/course")({
  head: () => ({ meta: [{ title: "Data visualization · Graphnotes" }] }),
  component: CourseOverview,
});

function CourseOverview() {
  const { progress, canSave } = useProgress();
  const { isMobile } = useAppShellMobile();
  const resume = getResumeLesson(progress);
  const completed = progress.completed.length;

  return (
    <VStack className="course-wrap course-overview" gap={0}>
      <HStack as="section" className="course-hero" gap={0} aria-labelledby="course-title">
        <VStack className="course-hero-copy" gap={0}>
          <Heading level={1} id="course-title" className="course-display course-hero-title">
            Data visualization<br className="course-hero-break" /> <em>for product designers.</em>
          </Heading>
          <p className="course-deck">Learn to choose and design charts for data-heavy products, starting with everyday examples.</p>
          <HStack align="center" wrap="wrap" gap={2} className="course-hero-actions course-action-pair">
            {resume ? (
              <Button href={`/lesson/${resume.id}`} label={progress.lastLesson ? "Continue learning" : "Start learning"} aria-describedby="course-pace" variant="primary" size="lg" className="course-action" endContent={<ArrowRight size={17} aria-hidden="true" />} />
            ) : (
              <Button href="/review" label="Review flashcards" variant="primary" size="lg" className="course-action" endContent={<ArrowRight size={17} aria-hidden="true" />} />
            )}
            <Button href="/lab" label="Chart lab" variant="secondary" size="lg" className="course-action" />
          </HStack>
          <p className="course-meta course-hero-pace" id="course-pace">
            {progress.lastLesson && resume
              ? <>Lesson {lessons.indexOf(resume) + 1} <Text as="span" aria-hidden="true">·</Text> {resume.title}</>
              : <>{lessons.length} lessons <Text as="span" aria-hidden="true">·</Text> {Math.floor(totalMinutes / 60)} hr {totalMinutes % 60} min</>}
          </p>
        </VStack>
        <OverviewChart />
      </HStack>

      {isMobile && (
        <Card variant="muted" padding={3}>
          <VStack gap={1}>
            <ProgressBar label="Course progress" value={completed} max={lessons.length} hasValueLabel formatValueLabel={(value, max) => `${value} of ${max}`} />
            <Text as="p" type="supporting" color="secondary">{canSave ? "Saved in this browser" : "Progress is available in this tab only"}</Text>
          </VStack>
        </Card>
      )}

      <LearningSummary />

      <VStack as="section" id="curriculum" className="course-curriculum" gap={0} aria-label="Course outline">
        {modules.map((module) => (
          <HStack as="section" className="course-module" key={module.title} align="start" gap={0} data-scroll-reveal>
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
                      <Text as="span" className="course-lesson-index" aria-hidden="true">{String(number).padStart(2, "0")}</Text>
                      <VStack gap={0.5}>
                        <HStack gap={2} justify="between" align="start" className="course-lesson-titleline">
                          <strong>{lesson.title}</strong>
                          <Text as="span" className="course-row-time">{lesson.minutes} min</Text>
                        </HStack>
                        <p>{lesson.description}</p>
                      </VStack>
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
