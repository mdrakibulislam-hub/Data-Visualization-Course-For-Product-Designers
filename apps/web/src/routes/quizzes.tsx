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
import { ArrowLeft, ArrowRight, BookOpen, Check, ClipboardText, Database, Grid, Layers, Library, Repeat } from "reicon-react";

import { PracticeHeader } from "@/components/practice-header";
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
  const { canSave, saveQuiz } = useProgress();
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
    <VStack gap={0}>
      <Card padding={0} className="quiz-question-sheet course-motion-enter">
        <VStack gap={3} padding={5} className="quiz-sheet-meta">
          <HStack justify="between" align="center" gap={3}>
            <Text type="supporting" weight="medium">{label}</Text>
            <Text type="supporting" color="secondary">{answered ? "Answer review" : "Choose one answer"}</Text>
          </HStack>
          <ProgressBar label="Questions answered" isLabelHidden value={session.answers.length} max={session.ids.length} />
        </VStack>
        <VStack gap={5} padding={6} className="quiz-sheet-body">
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
            <VStack as="section" gap={2} ref={feedbackRef} tabIndex={-1} aria-labelledby="quiz-feedback-title" aria-describedby="quiz-feedback-reason" className="quiz-feedback course-motion-enter">
              <HStack gap={2} align="center">{correct && <Check size={17} aria-hidden="true" />}<Text as="p" id="quiz-feedback-title" weight="semibold">{correct ? "Correct" : "Here’s why"}</Text></HStack>
              <Text as="p" id="quiz-feedback-reason">{entry.explanation}</Text>
              {entry.lessonId && <Link href={courseLessonHref(course, entry.lessonId)} type="supporting" weight="semibold" hasUnderline>Review the lesson</Link>}
            </VStack>
          )}
        </VStack>
        <Divider />
        <HStack justify="between" align="center" paddingInline={6} paddingBlock={4} gap={3} wrap="wrap" className="quiz-sheet-footer">
          <Text type="supporting" color="secondary">{answered ? canSave ? "Answer saved" : "Answer kept in this tab" : "Take your time"}</Text>
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
  const { progress, canSave, saveQuiz } = useProgress();
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
        <PracticeHeader title="Quizzes" titleRef={catalogHeading} description={course.content.interaction ? "Choose a topic. Practice the reasoning behind your interaction decisions." : "Choose a topic. Practice the reasoning behind your chart decisions."} />
        {!canSave && <Text as="p" type="supporting" color="secondary" role="status">Your answers are available in this tab only.</Text>}

        <VStack as="ul" className="quiz-library-grid" gap={0} aria-label="Quiz topics">
          {quizScopes.map(({ value, label }, index) => {
            const { Icon, description } = course.id === dataVisualizationId ? (topics[index] ?? { Icon: BookOpen, description: "Practice this topic." }) : { Icon: index === 0 ? Library : BookOpen, description: course.content.modules.find(({ title }) => title === value)?.description ?? "Mix questions from every topic." };
            const count = questionsForScope(value).length;
            const best = progress.quizBests[value];
            const current = session?.scope === value;
            const action = current ? completed ? "View results" : "Resume quiz" : "Start quiz";

            return (
              <VStack as="li" key={value} gap={0} data-scroll-reveal>
                <ClickableCard label={`${action}: ${label}`} padding={0} className="quiz-library-card" data-current={current || undefined} onClick={() => openTopic(value)}>
                  <VStack gap={4} padding={5} className="quiz-library-card-content">
                    <HStack align="center" justify="between" gap={3}>
                      <Icon size={22} className="quiz-library-icon" aria-hidden="true" />
                      <Text type="supporting" color="secondary">{count} questions</Text>
                    </HStack>
                    <VStack gap={2}>
                      <Heading level={2} className="quiz-library-title">{label}</Heading>
                      <Text as="p" color="secondary">{description}</Text>
                    </VStack>
                  </VStack>
                    <HStack wrap="wrap" align="center" justify="between" gap={2} paddingInline={5} paddingBlock={3} className="quiz-library-meta">
                      <Text type="supporting" color="secondary">{current && !completed ? `${session.answers.length} of ${session.ids.length} answered` : best !== undefined ? `Best ${best} of ${count}` : ""}</Text>
                      <HStack gap={1} align="center">
                        <Text type="supporting" color={current ? "accent" : "secondary"} weight="medium">{current ? action : "Start quiz"}</Text>
                        <ArrowRight size={15} aria-hidden="true" className="quiz-library-arrow" />
                      </HStack>
                    </HStack>
                </ClickableCard>
              </VStack>
            );
          })}
        </VStack>
        {pendingScope && (
          <Dialog isOpen padding={0} width="30rem" onOpenChange={(open) => { if (!open) setPendingScope(null); }}>
            <VStack gap={5} padding={6}>
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
      <VStack gap={3} align="start">
        <Button label="Quiz topics" size="sm" variant="ghost" icon={<ArrowLeft size={15} aria-hidden="true" />} onClick={() => {
          setShowTopics(true);
          requestAnimationFrame(() => catalogHeading.current?.focus());
        }} />
      </VStack>
      <PracticeHeader title={topicTitle ?? "Quiz"} description={session.retry ? "Another look at the questions you missed." : "Choose an answer, then see the reasoning behind it."} hasDivider={false} />
      {!canSave && <Text as="p" type="supporting" color="secondary" role="status">Your answers are available in this tab only.</Text>}
      {completed ? (
        <Card padding={6} className="quiz-question-sheet quiz-results-sheet course-motion-enter">
          <VStack gap={5}>
            <VStack gap={2} className="quiz-results-heading">
              <Text type="supporting" color="secondary">Round complete</Text>
              <Heading level={2} ref={sessionHeading} tabIndex={-1} className="course-display quiz-score">{quizScore(session)} <Text as="span" color="secondary">of {session.ids.length} correct</Text></Heading>
              {best !== undefined && (session.retry || best !== quizScore(session)) && <Text as="p" color="secondary">Best full round: {best} of {questionsForScope(session.scope).length} correct</Text>}
            </VStack>
            <HStack gap={2} wrap="wrap" className="quiz-result-actions course-action-pair">
              {missed.length > 0 && <Button label="Retry missed questions" variant="primary" icon={<Repeat size={16} aria-hidden="true" />} onClick={() => start(session.scope, missed)} />}
              <Button label="Start a new round" variant={missed.length ? "secondary" : "primary"} onClick={() => start(session.scope)} />
            </HStack>
            {missed.length > 0 && (
              <VStack as="section" gap={2} aria-labelledby="quiz-missed-title">
                <Heading level={3} id="quiz-missed-title">Questions to revisit</Heading>
                <VStack as="ul" gap={0} className="quiz-results-list">
                  {missed.map((id) => {
                    const question = questionById.get(id)!;
                    return (
                      <VStack as="li" key={id} gap={0}>
                        <details className="quiz-result-detail">
                          <summary><Text as="span" weight="medium">{question.prompt}</Text></summary>
                          <VStack gap={2} className="quiz-result-explanation">
                            <Text as="p"><strong>Correct answer:</strong> {question.options[question.answer]}</Text>
                            <Text as="p" color="secondary">{question.explanation}</Text>
                            {question.lessonId && <Link href={courseLessonHref(course, question.lessonId)} type="supporting" weight="semibold" hasUnderline>Review the lesson</Link>}
                          </VStack>
                        </details>
                      </VStack>
                    );
                  })}
                </VStack>
              </VStack>
            )}
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
