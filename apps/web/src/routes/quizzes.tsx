import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { ClickableCard } from "@astryxdesign/core/ClickableCard";
import { Dialog, DialogHeader } from "@astryxdesign/core/Dialog";
import { Divider } from "@astryxdesign/core/Divider";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Link } from "@astryxdesign/core/Link";
import { ProgressBar } from "@astryxdesign/core/ProgressBar";
import { RadioList, RadioListItem } from "@astryxdesign/core/RadioList";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type Ref } from "react";
import { ArrowLeft, ArrowRight, BookOpen, ClipboardText, Database, Grid, Layers, Library, Repeat } from "reicon-react";

import { useCurrentCourse } from "@/course/course-context";
import { courseLessonHref, dataVisualizationId } from "@/course/catalog";
import { AnswerReview } from "@/course/answer-review";
import { useProgress } from "@/course/progress";
import { type QuizSession } from "@/course/quiz-data";

export const Route = createFileRoute("/quizzes")({
  head: () => ({ meta: [{ title: "Quizzes · Graphnotes" }] }),
  component: QuizzesPage,
});

const topics = [
  { Icon: Library, description: "Mix questions from every topic." },
  { Icon: BookOpen, description: "Choose charts and set honest scales." },
  { Icon: Database, description: "Read rates, distributions, and uncertainty." },
  { Icon: Grid, description: "Design context, filters, and accessible charts." },
  { Icon: Layers, description: "Summarize large datasets and compare groups." },
  { Icon: ClipboardText, description: "Solve problems from onboarding and dashboards." },
];

function QuizRound({ session, headingRef, onAdvance }: { session: QuizSession; headingRef: Ref<HTMLHeadingElement>; onAdvance: () => void }) {
  const course = useCurrentCourse();
  const { questionById } = course.content.quiz;
  const { saveQuiz } = useProgress();
  const [selection, setSelection] = useState("");
  const feedbackRef = useRef<HTMLElement>(null);
  const entry = questionById.get(session.ids[session.cursor])!;
  const answer = session.answers[session.cursor];
  const answered = answer !== undefined;
  const correct = answer === entry.answer;
  const label = `Question ${session.cursor + 1} of ${session.ids.length}`;

  function checkAnswer() {
    if (answered || selection === "") return;
    saveQuiz({ ...session, answers: [...session.answers, Number(selection)] });
    requestAnimationFrame(() => feedbackRef.current?.focus());
  }

  return (
    <VStack gap={4}>
      <ProgressBar label={label} value={session.answers.length} max={session.ids.length} />
      <Card padding={0} className="quiz-question-sheet course-motion-enter">
        <VStack gap={4} padding={4}>
          <Heading level={2} ref={headingRef} tabIndex={-1} className="course-display quiz-question-title">{entry.prompt}</Heading>
          {answered ? (
            <AnswerReview options={entry.options} selected={answer} correct={entry.answer} label={entry.prompt} />
          ) : (
            <RadioList label={entry.prompt} isLabelHidden value={selection} onChange={setSelection} controlClassName="quiz-choices">
              {entry.options.map((option, index) => (
                <RadioListItem key={option} label={option} value={String(index)} align="first-line" />
              ))}
            </RadioList>
          )}
          {answered && (
            <VStack as="section" gap={1.5} padding={3} ref={feedbackRef} tabIndex={-1} aria-labelledby="quiz-feedback-title" aria-describedby="quiz-feedback-reason" className="quiz-feedback course-motion-enter">
              <Text as="p" id="quiz-feedback-title" weight="semibold">{correct ? "Correct" : "Here’s why"}</Text>
              <Text as="p" id="quiz-feedback-reason">{entry.explanation}</Text>
              {entry.lessonId && <Link href={courseLessonHref(course, entry.lessonId)} type="supporting" weight="semibold" hasUnderline>Review the lesson</Link>}
            </VStack>
          )}
        </VStack>
        <Divider />
        <HStack justify="end" paddingInline={4} paddingBlock={3} gap={0}>
          {answered ? (
            <Button label={session.cursor + 1 === session.ids.length ? "See results" : "Next question"} variant="primary" className="course-action" endContent={<ArrowRight size={16} aria-hidden="true" />} onClick={onAdvance} />
          ) : (
            <Button label="Check answer" variant="primary" className="course-action" isDisabled={selection === ""} onClick={checkAnswer} />
          )}
        </HStack>
      </Card>
    </VStack>
  );
}

export function QuizzesPage() {
  const course = useCurrentCourse();
  const { questionById, questionsForScope, quizScopes, quizScore } = course.content.quiz;
  const { progress, saveQuiz } = useProgress();
  const session = progress.quiz;
  const [showTopics, setShowTopics] = useState(!session);
  const [pendingScope, setPendingScope] = useState<string | null>(null);
  const catalogHeading = useRef<HTMLHeadingElement>(null);
  const sessionHeading = useRef<HTMLHeadingElement>(null);
  const isBrowsing = showTopics || !session;
  const completed = Boolean(session && session.cursor === session.ids.length);
  const topicTitle = quizScopes.find(({ value }) => value === session?.scope)?.label;

  function focusSession() {
    requestAnimationFrame(() => sessionHeading.current?.focus());
  }

  function start(scope: string, retryIds?: string[]) {
    const ids = retryIds ?? questionsForScope(scope).map(({ id }) => id);
    saveQuiz({ scope, ids, cursor: 0, answers: [], retry: retryIds !== undefined });
    setShowTopics(false);
    setPendingScope(null);
    focusSession();
  }

  function openTopic(scope: string) {
    if (session?.scope === scope) {
      setShowTopics(false);
      focusSession();
      return;
    }
    if (session && !completed && session.answers.length) {
      setPendingScope(scope);
      return;
    }
    start(scope);
  }

  if (isBrowsing) {
    const nextTitle = quizScopes.find(({ value }) => value === pendingScope)?.label;

    return (
      <VStack className="course-wrap course-simple-page quiz-library-page" gap={5}>
        <VStack as="header" gap={1.5}>
          <Heading level={1} ref={catalogHeading} tabIndex={-1} className="course-display course-page-title">Quizzes</Heading>
          <Text as="p" color="secondary">Choose a topic to practice your reasoning.</Text>
        </VStack>

        <VStack as="ul" className="quiz-library-grid" gap={0} aria-label="Quiz topics">
          {quizScopes.map(({ value, label }, index) => {
            const { Icon, description } = course.id === dataVisualizationId ? (topics[index] ?? { Icon: BookOpen, description: "Practice this topic." }) : { Icon: index === 0 ? Library : BookOpen, description: course.content.modules.find(({ title }) => title === value)?.description ?? "Mix questions from every topic." };
            const count = questionsForScope(value).length;
            const best = progress.quizBests[value];
            const current = session?.scope === value;
            const action = current ? completed ? "View results" : "Resume quiz" : "Start quiz";

            return (
              <VStack as="li" key={value} gap={0} data-scroll-reveal>
                <ClickableCard label={`${action}: ${label}`} padding={5} className="quiz-library-card" data-current={current || undefined} onClick={() => openTopic(value)}>
                  <VStack gap={3} className="quiz-library-card-content">
                    <HStack align="center" gap={2}>
                      <Icon size={23} className="quiz-library-icon" aria-hidden="true" />
                      <Heading level={2} className="quiz-library-title">{label}</Heading>
                    </HStack>
                    <VStack gap={1}>
                      <Text as="p" color="secondary">{description}</Text>
                    </VStack>
                    <HStack wrap="wrap" align="center" justify="between" gap={2} className="quiz-library-meta">
                      <Text type="supporting" color="secondary">{count} questions{best !== undefined ? ` · Best ${best}/${count}` : ""}</Text>
                      <HStack gap={1} align="center">
                        <Text type="supporting" color={current ? "accent" : "secondary"} weight="medium">{current ? action : "Start quiz"}</Text>
                        <ArrowRight size={15} aria-hidden="true" className="quiz-library-arrow" />
                      </HStack>
                    </HStack>
                  </VStack>
                </ClickableCard>
              </VStack>
            );
          })}
        </VStack>
        {pendingScope && (
          <Dialog isOpen onOpenChange={(open) => { if (!open) setPendingScope(null); }}>
            <VStack gap={3}>
              <DialogHeader title={`Start ${nextTitle}?`} hasDivider={false} />
              <Text as="p">You have an unfinished quiz in {topicTitle}. Starting this quiz will replace that round.</Text>
              <HStack justify="end" wrap="wrap" gap={2} className="course-action-pair">
                <Button label="Keep current quiz" variant="secondary" onClick={() => setPendingScope(null)} />
                <Button label="Start new quiz" variant="primary" onClick={() => start(pendingScope)} />
              </HStack>
            </VStack>
          </Dialog>
        )}
      </VStack>
    );
  }

  const missed = completed ? session.ids.filter((id, index) => questionById.get(id)?.answer !== session.answers[index]) : [];
  const best = progress.quizBests[session.scope];

  return (
    <VStack className="course-wrap course-simple-page quiz-session-page" gap={4}>
      <VStack as="header" gap={2} align="start">
        <Button label="Quiz topics" size="sm" variant="ghost" icon={<ArrowLeft size={15} aria-hidden="true" />} onClick={() => {
          setShowTopics(true);
          requestAnimationFrame(() => catalogHeading.current?.focus());
        }} />
        <Heading level={1} className="course-display course-page-title">{topicTitle}</Heading>
        {session.retry && <Text as="p" color="secondary">Reviewing the questions you missed.</Text>}
      </VStack>
      {completed ? (
        <Card padding={4} className="quiz-question-sheet course-motion-enter">
          <VStack gap={4}>
            <VStack gap={1}>
              <Heading level={2} ref={sessionHeading} tabIndex={-1} className="course-display quiz-question-title">{quizScore(session)} of {session.ids.length} correct</Heading>
              {best !== undefined && <Text as="p" color="secondary">Best full round: {best} of {questionsForScope(session.scope).length} correct</Text>}
            </VStack>
            {missed.length > 0 && (
              <VStack as="section" gap={2} aria-labelledby="quiz-missed-title">
                <Heading level={3} id="quiz-missed-title">Questions to revisit</Heading>
                <VStack as="ul" gap={0} className="quiz-results-list">
                  {missed.map((id) => {
                    const question = questionById.get(id)!;
                    return (
                      <VStack as="li" key={id} gap={1} paddingBlock={3}>
                        <Text as="p" weight="semibold">{question.prompt}</Text>
                        <Text as="p"><strong>Correct answer:</strong> {question.options[question.answer]}</Text>
                        <Text as="p" color="secondary">{question.explanation}</Text>
                        {question.lessonId && <Link href={courseLessonHref(course, question.lessonId)} type="supporting" weight="semibold" hasUnderline>Review the lesson</Link>}
                      </VStack>
                    );
                  })}
                </VStack>
              </VStack>
            )}
            <HStack justify="end" gap={2} wrap="wrap" className="quiz-result-actions course-action-pair">
              {missed.length > 0 && <Button label="Retry missed questions" variant="primary" className="course-action" icon={<Repeat size={16} aria-hidden="true" />} onClick={() => start(session.scope, missed)} />}
              <Button label="Start a new round" variant={missed.length ? "secondary" : "primary"} className="course-action" onClick={() => start(session.scope)} />
            </HStack>
          </VStack>
        </Card>
      ) : (
        <QuizRound key={session.ids[session.cursor]} session={session} headingRef={sessionHeading} onAdvance={() => {
          saveQuiz({ ...session, cursor: session.cursor + 1 });
          focusSession();
        }} />
      )}
    </VStack>
  );
}
