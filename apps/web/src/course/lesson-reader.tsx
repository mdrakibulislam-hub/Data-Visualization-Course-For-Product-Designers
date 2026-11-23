import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Link as AstryxLink } from "@astryxdesign/core/Link";
import { RadioList, RadioListItem } from "@astryxdesign/core/RadioList";
import { Text } from "@astryxdesign/core/Text";
import { TextArea } from "@astryxdesign/core/TextArea";
import { VStack } from "@astryxdesign/core/VStack";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "reicon-react";
import { useEffect, useId, useRef, useState } from "react";

import { AnswerReview } from "./answer-review";
import { challengeFor } from "./challenges";
import { ChartLab } from "./charts";
import { lessons, type CourseLesson, type Question } from "./curriculum";
import { labs } from "./lab-data";
import { useProgress } from "./progress";
import { sourceTitle } from "./sources";

function QuizQuestion({ lessonId, question, index }: { lessonId: string; question: Question; index: number }) {
  const { progress, submitAnswer } = useProgress();
  const [selected, setSelected] = useState<number | null>(null);
  const questionId = useId();
  const questionRef = useRef<HTMLElement>(null);
  const feedbackRef = useRef<HTMLElement>(null);
  const shouldFocusFeedback = useRef(false);
  const answer = progress.answers[`${lessonId}:${index}`];
  const answered = answer !== undefined;
  const correct = answer === question.answer;

  useEffect(() => {
    if (answered && shouldFocusFeedback.current) {
      feedbackRef.current?.focus();
      shouldFocusFeedback.current = false;
    }
  }, [answered]);

  function retry() {
    setSelected(null);
    submitAnswer(lessonId, index, null);
    requestAnimationFrame(() => questionRef.current?.querySelector<HTMLInputElement>("input")?.focus());
  }

  return (
    <VStack as="section" gap={3} className="course-question" ref={questionRef} aria-labelledby={questionId}>
      <Heading level={3} id={questionId} className="course-question-title">{question.prompt}</Heading>
      {answered ? (
        <AnswerReview options={question.options} selected={answer} correct={question.answer} label={question.prompt} />
      ) : (
        <RadioList
          label={question.prompt}
          isLabelHidden
          value={String(selected ?? "")}
          onChange={(value) => setSelected(Number(value))}
          htmlName={`${lessonId}-question-${index}`}
        >
          {question.options.map((option, optionIndex) => (
            <RadioListItem key={option} label={option} value={String(optionIndex)} align="first-line" />
          ))}
        </RadioList>
      )}
      {answered ? (
        <>
          <Card variant="muted" padding={3} className="course-motion-enter">
            <VStack as="section" gap={0} ref={feedbackRef} tabIndex={-1} aria-label="Answer feedback">
              <Text as="p" type="body">
                <strong>{correct ? "Correct." : "Here’s why."}</strong> {question.explanation}
              </Text>
            </VStack>
          </Card>
          {!correct && <HStack gap={1}><Button label="Try again" variant="secondary" onClick={retry} className="course-action" /></HStack>}
        </>
      ) : (
        <HStack gap={1}>
          <Button
            label="Check answer"
            variant="secondary"
            isDisabled={selected === null}
            className="course-action"
            onClick={() => {
              if (selected !== null) {
                shouldFocusFeedback.current = true;
                submitAnswer(lessonId, index, selected);
              }
            }}
          />
        </HStack>
      )}
    </VStack>
  );
}

function CapstoneNote() {
  const { progress, saveCapstone } = useProgress();
  return (
    <VStack gap={2}>
      <TextArea
        id="capstone-note"
        label="Your design rationale"
        rows={6}
        maxLength={2500}
        htmlMaxLength={2500}
        value={progress.capstone}
        onChange={saveCapstone}
        placeholder="What will the delivery lead see first, and why?"
      />
      <Text as="p" type="supporting" color="secondary">Before sharing your sketch, check the metric definition, filter behavior, access to underlying orders, and what happens when the data is incomplete.</Text>
    </VStack>
  );
}

export function LessonReader({ lesson }: { lesson: CourseLesson }) {
  const navigate = useNavigate();
  const { progress, canSave, openLesson, completeLesson } = useProgress();
  const index = lessons.findIndex(({ id }) => id === lesson.id);
  const next = lessons[index + 1];
  const previous = lessons[index - 1];
  const completed = progress.completed.includes(lesson.id);
  const lab = labs[lesson.id];

  useEffect(() => openLesson(lesson.id), [lesson.id, openLesson]);

  function continueCourse() {
    if (!completed) completeLesson(lesson.id);
    if (next) void navigate({ to: "/lesson/$lessonId", params: { lessonId: next.id } });
    else void navigate({ to: "/course" });
  }

  return (
    <VStack className="course-wrap course-lesson" gap={5}>
      <Link to="/course" className="course-back"><ArrowLeft size={16} aria-hidden="true" /> Course overview</Link>
      <VStack as="article" className="course-reader" gap={8}>
        <VStack as="header" gap={2} className="course-reader-heading">
          <p className="course-meta">
            {lesson.moduleTitle} <span aria-hidden="true">·</span> Lesson {index + 1} of {lessons.length} <span aria-hidden="true">·</span> {lesson.minutes} min
            {completed && <><span aria-hidden="true"> · </span>Completed</>}
          </p>
          <Heading className="course-display course-lesson-title" level={1}>{lesson.title}</Heading>
          <p className="course-deck">{lesson.description}</p>
          <HStack as="nav" gap={3} wrap="wrap" aria-label="On this page">
            <AstryxLink href="#lesson-lab">Try the chart</AstryxLink>
            <AstryxLink href="#lesson-quiz">Quiz</AstryxLink>
            <AstryxLink href="#lesson-practice">Apply it</AstryxLink>
          </HStack>
        </VStack>

        <VStack as="section" id="lesson-notes" gap={4} aria-label="Lesson">
          {lesson.sections.map(({ title, body }) => (
            <VStack key={title} gap={1} data-scroll-reveal>
              <Heading level={2}>{title}</Heading>
              <Text as="p" type="body">{body}</Text>
            </VStack>
          ))}
        </VStack>

        {lab && <VStack id="lesson-lab" gap={0} data-scroll-reveal><ChartLab lab={lab} /></VStack>}

        <VStack as="aside" className="course-takeaway" gap={1} aria-label="Key idea" data-scroll-reveal>
          <Heading level={2}>Keep this in mind</Heading>
          <Text as="p" type="body">{lesson.takeaway}</Text>
        </VStack>

        <VStack as="section" id="lesson-quiz" gap={4} aria-labelledby="quiz-heading" data-scroll-reveal>
          <Heading level={2} id="quiz-heading">Check your understanding</Heading>
          {lesson.questions.map((question, questionIndex) => (
            <QuizQuestion key={question.prompt} lessonId={lesson.id} question={question} index={questionIndex} />
          ))}
        </VStack>

        <VStack as="section" id="lesson-practice" gap={2} aria-labelledby="practice-heading" data-scroll-reveal>
          <Heading level={2} id="practice-heading">Try it at work</Heading>
          <Text as="p" type="body">{lesson.practice}</Text>
          {challengeFor(lesson.id) && <Button href={`/challenges?lesson=${lesson.id}`} label={progress.learning.challenges[lesson.id] ? "Revisit the design challenge" : "Try a design challenge"} variant="secondary" />}
          {lesson.id === "capstone" && <>
            <CapstoneNote />
            <Link className="practice-link" to="/capstone">Open the project checklist</Link>
          </>}
        </VStack>

        <details className="course-lesson-sources">
          <summary>Further reading</summary>
          <ul>
            {lesson.reading.map(({ source, locator }) => (
              <li key={source}><Link to="/sources" hash={source}>{sourceTitle(source)}</Link> · {locator}</li>
            ))}
          </ul>
        </details>

        <VStack as="footer" className="course-lesson-footer" gap={2}>
          {!canSave && <p role="status">Your browser isn’t saving progress. You can continue in this tab.</p>}
          <HStack gap={2} wrap="wrap" align="center" justify="between">
            {previous && <Link className="course-back" to="/lesson/$lessonId" params={{ lessonId: previous.id }}><ArrowLeft size={16} aria-hidden="true" /> Previous lesson</Link>}
            <Button
              label={completed ? (next ? "Next lesson" : "Course overview") : (next ? "Complete & continue" : "Finish lesson")}
              variant="primary"
              size="lg"
              className="course-action course-next"
              endContent={completed ? undefined : <ArrowRight size={16} aria-hidden="true" />}
              onClick={continueCourse}
            />
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
}
