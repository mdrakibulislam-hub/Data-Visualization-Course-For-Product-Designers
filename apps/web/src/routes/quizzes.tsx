import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { ProgressBar } from "@astryxdesign/core/ProgressBar";
import { RadioList, RadioListItem } from "@astryxdesign/core/RadioList";
import { SelectableCard } from "@astryxdesign/core/SelectableCard";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, ClipboardText, Database, Grid, Layers, Library } from "reicon-react";

import { useProgress } from "@/course/progress";
import { questionById, questionsForScope, quizScopes, quizScore, type QuizSession } from "@/course/quiz-data";

export const Route = createFileRoute("/quizzes")({
  head: () => ({ meta: [{ title: "Quizzes · Data Viz Field Guide" }] }),
  component: QuizzesPage,
});

function QuizRound({ session }: { session: QuizSession }) {
  const { saveQuiz } = useProgress();
  const [selection, setSelection] = useState("");
  const feedbackRef = useRef<HTMLDivElement>(null);
  const entry = questionById.get(session.ids[session.cursor])!;
  const answer = session.answers[session.cursor];
  const answered = answer !== undefined;
  const label = `Question ${session.cursor + 1} of ${session.ids.length}`;

  function checkAnswer() {
    saveQuiz({ ...session, answers: [...session.answers, Number(selection)] });
    requestAnimationFrame(() => feedbackRef.current?.focus());
  }

  return (
    <VStack gap={4} className="course-motion-enter">
      <ProgressBar label={label} value={session.answers.length} max={session.ids.length} />
      <RadioList label={entry.prompt} value={answered ? String(answer) : selection} onChange={setSelection} isDisabled={answered}>
        {entry.options.map((option, index) => <RadioListItem value={String(index)} label={option} key={option} align="first-line" />)}
      </RadioList>
      {answered ? (
        <>
          <Card variant="muted" padding={3} className="course-motion-enter">
            <VStack gap={1} ref={feedbackRef} tabIndex={-1} role="status">
              <Text as="p" weight="semibold">{answer === entry.answer ? "Correct" : "Correct answer"}</Text>
              {answer !== entry.answer && <Text as="p">{entry.options[entry.answer]}</Text>}
              <Text as="p">{entry.explanation}</Text>
              {entry.lessonId && <Link className="practice-link" to="/lesson/$lessonId" params={{ lessonId: entry.lessonId }}>Review the lesson</Link>}
            </VStack>
          </Card>
          <HStack gap={2}><Button label={session.cursor + 1 === session.ids.length ? "See results" : "Next question"} variant="primary" className="course-action" onClick={() => saveQuiz({ ...session, cursor: session.cursor + 1 })} /></HStack>
        </>
      ) : (
        <HStack gap={2}><Button label="Check answer" variant="primary" className="course-action" isDisabled={selection === ""} onClick={checkAnswer} /></HStack>
      )}
    </VStack>
  );
}

const topicIcons = [Library, BookOpen, Database, Grid, Layers, ClipboardText];

const topicDescriptions = [
  "Practice design decisions from across the course.",
  "Choose a chart, an encoding, and an honest scale.",
  "Work with rates, distributions, and uncertainty.",
  "Make context, filters, and charts easier to use.",
  "Work with larger datasets and multiple groups.",
  "Interpret realistic onboarding and dashboard examples.",
];

function QuizzesPage() {
  const { progress, saveQuiz } = useProgress();
  const [scope, setScope] = useState(progress.quiz?.scope ?? "all");
  const [showTopics, setShowTopics] = useState(!progress.quiz);
  const questions = questionsForScope(scope);
  const session = progress.quiz?.scope === scope ? progress.quiz : null;
  const completed = session && session.cursor === session.ids.length;
  const missed = completed ? session.ids.filter((id, index) => questionById.get(id)?.answer !== session.answers[index]) : [];

  function start(ids = questions.map(({ id }) => id), retry = false) {
    saveQuiz({ scope, ids, cursor: 0, answers: [], retry });
    setShowTopics(false);
  }

  const title = quizScopes.find(({ value }) => value === scope)?.label;
  return (
    <VStack className={`course-wrap course-simple-page practice-page ${showTopics ? "quiz-catalog-page" : ""}`} gap={5}>
      <VStack as="header" gap={2} className="course-motion-enter practice-header">
        <Heading level={1} className="course-display course-page-title">Quizzes</Heading>
        <p className="course-deck">Choose a topic and test your chart decisions with scenario questions.</p>
      </VStack>
      {showTopics || !session ? (
        <>
          <VStack gap={0} className="quiz-topic-grid" role="group" aria-label="Quiz topics">
            {quizScopes.map(({ value, label }, index) => {
              const count = questionsForScope(value).length;
              const Icon = topicIcons[index];
              const best = progress.quizBests[value];
              const round = progress.quiz?.scope === value ? progress.quiz : null;
              const inProgress = round && round.cursor < round.ids.length;
              return (
                <SelectableCard key={value} label={label} padding={3} className="quiz-topic-card" isSelected={scope === value} onChange={(selected) => { if (selected) setScope(value); }}>
                  <VStack gap={2} className="quiz-topic-layout">
                    <HStack as="span" className="quiz-topic-icon" align="center" justify="center" gap={0}>
                      <Icon size={21} aria-hidden="true" />
                    </HStack>
                    <VStack gap={1}>
                      <Text weight="semibold">{label}</Text>
                      <Text as="p" type="supporting" color="secondary">{topicDescriptions[index]}</Text>
                    </VStack>
                    <HStack gap={2} wrap="wrap" className="quiz-topic-meta">
                      <Text type="supporting" color="secondary">{count} questions</Text>
                      {inProgress ? <Text type="supporting" color="accent">In progress</Text> : best !== undefined ? <Text type="supporting" color="secondary">Best {best}/{count}</Text> : null}
                    </HStack>
                  </VStack>
                </SelectableCard>
              );
            })}
          </VStack>
          <HStack justify="between" align="center" wrap="wrap" gap={3} className="quiz-topic-actions">
            <VStack gap={0.5}>
              <Text weight="semibold">{title}</Text>
              <Text type="supporting" color="secondary">{questions.length} questions</Text>
            </VStack>
            <Button label={session ? completed ? "View results" : "Resume quiz" : "Start quiz"} variant="primary" className="course-action" endContent={<ArrowRight size={16} aria-hidden="true" />} onClick={() => {
              if (session) setShowTopics(false);
              else start();
            }} />
          </HStack>
        </>
      ) : (
        <VStack gap={2}>
          <Button label="Quiz topics" variant="ghost" className="quiz-back" icon={<ArrowLeft size={16} aria-hidden="true" />} onClick={() => setShowTopics(true)} />
          <Card padding={4}>
            {completed ? (
              <VStack gap={3} className="course-motion-enter">
                <Heading level={2}>{quizScore(session)} of {session.ids.length} correct</Heading>
                {progress.quizBests[scope] !== undefined && <Text as="p" color="secondary">Best full round · {progress.quizBests[scope]} of {questions.length}</Text>}
                {missed.length > 0 && (
                  <VStack as="ul" gap={2} className="quiz-missed">
                    {missed.map((id) => {
                      const question = questionById.get(id)!;
                      return <li key={id}><Text as="p" weight="semibold">{question.prompt}</Text><Text as="p" color="secondary">{question.explanation}</Text></li>;
                    })}
                  </VStack>
                )}
                <HStack gap={2} wrap="wrap">
                  {missed.length > 0 && <Button label="Retry missed questions" variant="primary" className="course-action" onClick={() => start(missed, true)} />}
                  <Button label="Start a new round" variant={missed.length ? "secondary" : "primary"} className="course-action" onClick={() => start()} />
                </HStack>
              </VStack>
            ) : <QuizRound key={`${scope}:${session.cursor}`} session={session} />}
          </Card>
        </VStack>
      )}
    </VStack>
  );
}
