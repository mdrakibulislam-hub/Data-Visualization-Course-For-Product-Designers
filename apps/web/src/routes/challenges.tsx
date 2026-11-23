import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { RadioList, RadioListItem } from "@astryxdesign/core/RadioList";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "reicon-react";
import { useRef, useState } from "react";

import { AnswerReview } from "@/course/answer-review";
import { challenges, challengeFor, challengeViews } from "@/course/challenges";
import { Chart, DataGrid, valuesTable } from "@/course/charts";
import { lessons } from "@/course/curriculum";
import { formatDay, milestoneDefinitions } from "@/course/learning-state";
import { useProgress } from "@/course/progress";

export const Route = createFileRoute("/challenges")({
  head: () => ({ meta: [{ title: "Design challenges · Graphnotes" }] }),
  validateSearch: (search: Record<string, unknown>): { lesson?: string } => ({ lesson: typeof search.lesson === "string" && challengeFor(search.lesson) ? search.lesson : undefined }),
  component: ChallengesPage,
});

function ChallengeExercise({ id }: { id: string }) {
  const { progress, answerChallenge, restartChallenge } = useProgress();
  const challenge = challengeFor(id)!;
  const lesson = lessons.find((item) => item.id === id)!;
  const attempt = progress.learning.attempts[id] ?? { fix: null, reason: null };
  const fixCorrect = attempt.fix === challenge.fix.answer;
  const finished = fixCorrect && attempt.reason === challenge.reason.answer;
  const step = fixCorrect ? "reason" : "fix";
  const question = challenge[step];
  const answered = attempt[step];
  const [selection, setSelection] = useState("");
  const [milestonesBefore, setMilestonesBefore] = useState<string[] | null>(null);
  const destination = useRef<HTMLElement>(null);
  const views = challengeViews(challenge);
  const view = fixCorrect ? views.after : views.before;
  const table = view.detail ?? (view.chart.kind === "table" ? null : valuesTable(view.chart));
  const record = progress.learning.challenges[id];
  const next = challenges.find((item) => item.lessonId !== id && !progress.learning.challenges[item.lessonId]);
  const earned = milestonesBefore && milestoneDefinitions.filter(({ id: milestone }) => progress.learning.milestones[milestone] && !milestonesBefore.includes(milestone));

  function check() {
    if (selection === "" || answered !== null) return;
    if (step === "reason" && Number(selection) === question.answer) setMilestonesBefore(Object.keys(progress.learning.milestones));
    answerChallenge(id, step, Number(selection));
    setSelection("");
    requestAnimationFrame(() => destination.current?.focus());
  }
  function retry() {
    answerChallenge(id, step, null);
    setSelection("");
    requestAnimationFrame(() => destination.current?.querySelector<HTMLInputElement>("input")?.focus());
  }

  return (
    <VStack gap={5}>
      <VStack gap={2}>
        <HStack gap={3} justify="between" align="start" wrap="wrap">
          <Heading level={2}>{challenge.title}</Heading>
          {record && <HStack gap={1} align="center"><Check size={14} aria-hidden="true" /><Text type="supporting" color="secondary">{record.revisitedOn ? "Revisited" : "Practiced"} · {formatDay(record.lastPracticedOn)}</Text></HStack>}
        </HStack>
        <Text as="p">{challenge.context}</Text>
        <Link to="/lesson/$lessonId" params={{ lessonId: id }} className="practice-link">Related lesson: {lesson.title}</Link>
      </VStack>
      <HStack className="challenge-workspace" gap={0} align="start">
        <Card padding={4}>
          <VStack as="figure" gap={3} aria-label={view.title}>
            <Text type="supporting" color="secondary">{fixCorrect ? "After your decision" : "Before your decision"}</Text>
            <Heading level={3}>{view.title}</Heading>
            <VStack key={String(fixCorrect)} gap={0} className="course-motion-enter"><Chart data={view.chart} title={view.title} /></VStack>
            {table && <details className="course-value-details">
              <summary>View values</summary>
              <VStack className="course-data-scroll" gap={0} tabIndex={0} role="region" aria-label={`${view.title} values`}><DataGrid data={table} title={view.title} /></VStack>
            </details>}
          </VStack>
        </Card>
        <VStack as="section" gap={3} ref={destination} tabIndex={-1} aria-label={finished ? "Challenge complete" : step === "fix" ? "Choose a change" : "Explain your decision"}>
          {finished ? (
            <VStack gap={3} className="course-motion-enter">
              <HStack align="center" gap={2}><Check size={20} aria-hidden="true" /><Heading level={2}>A decision you can explain</Heading></HStack>
              <Text as="p">{challenge.reason.explanation}</Text>
              <Text as="p" type="supporting" color="secondary">You’ve practiced this idea. Try the same check on a chart at work.</Text>
              {earned && earned.length > 0 && <VStack gap={1} className="learning-milestone-note" role="status">{earned.map(({ id, title }) => <Text as="p" key={id} weight="semibold">Milestone earned · {title}</Text>)}</VStack>}
              <HStack gap={2} wrap="wrap" className="learning-actions course-action-pair">
                {next && <Button href={`/challenges?lesson=${next.lessonId}`} label="Try another challenge" variant="primary" endContent={<ArrowRight size={16} aria-hidden="true" />} />}
                <Button label="Practice this again" variant="secondary" onClick={() => { restartChallenge(id); setSelection(""); setMilestonesBefore(null); requestAnimationFrame(() => destination.current?.focus()); }} />
              </HStack>
            </VStack>
          ) : (
            <>
              <Text type="supporting" color="secondary">{step === "fix" ? "1 of 2 · Make a decision" : "2 of 2 · Explain it"}</Text>
              {fixCorrect && <Text as="p" className="learning-decision-note">{challenge.fix.explanation}</Text>}
              <Heading level={3} className="course-question-title">{question.prompt}</Heading>
              {answered === null ? (
                <RadioList label={question.prompt} isLabelHidden value={selection} onChange={setSelection} controlClassName="quiz-choices">
                  {question.options.map((option, index) => <RadioListItem key={option} label={option} value={String(index)} align="first-line" />)}
                </RadioList>
              ) : (
                <>
                  <AnswerReview options={question.options} selected={answered} correct={question.answer} label={question.prompt} />
                  <Text as="p">{question.explanation}</Text>
                </>
              )}
              <HStack gap={2}>{answered === null
                ? <Button label={step === "fix" ? "Try this change" : "Check my reasoning"} variant="primary" isDisabled={selection === ""} onClick={check} />
                : <Button label="Try again" variant="secondary" onClick={retry} />}</HStack>
            </>
          )}
        </VStack>
      </HStack>
    </VStack>
  );
}

function ChallengesPage() {
  const { lesson } = Route.useSearch();
  const { progress, canSave } = useProgress();
  const [browsing, setBrowsing] = useState(false);
  const suggested = challenges.find(({ lessonId }) => progress.completed.includes(lessonId) && !progress.learning.challenges[lessonId])
    ?? challenges.find(({ lessonId }) => !progress.learning.challenges[lessonId]) ?? challenges[0];
  const [initialId] = useState(suggested.lessonId);
  const id = lesson ?? initialId;
  return (
    <VStack className="course-wrap course-simple-page challenges-page" gap={5}>
      <HStack as="header" justify="between" align="start" wrap="wrap" gap={3}>
        <VStack gap={1.5}>
          <Heading level={1} className="course-display course-page-title">Design challenges</Heading>
          <Text as="p" color="secondary">Make a small chart decision, then explain why it helps. About 3 minutes each.</Text>
        </VStack>
        <Button label={browsing ? "Back to challenge" : "Choose a challenge"} variant="secondary" onClick={() => setBrowsing((value) => !value)} />
      </HStack>
      {!canSave && <Text as="p" role="status">Progress is available in this tab only.</Text>}
      {browsing ? <VStack as="ul" gap={0} className="learning-list" aria-label="Choose a design challenge">
        {challenges.map(({ lessonId, title }) => <li key={lessonId}>
          <Link to="/challenges" search={{ lesson: lessonId }} onClick={() => setBrowsing(false)} className="learning-choice-row">
            <VStack gap={1}><Text weight="semibold">{title}</Text><Text type="supporting" color="secondary">{lessons.find(({ id }) => id === lessonId)?.title}</Text></VStack>
            <Text type="supporting" color="secondary">{progress.learning.challenges[lessonId] ? "Practiced" : "3 min"}</Text>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </li>)}
      </VStack> : <ChallengeExercise key={id} id={id} />}
      <Link to="/course" className="course-back"><ArrowLeft size={16} aria-hidden="true" /> Course overview</Link>
    </VStack>
  );
}
