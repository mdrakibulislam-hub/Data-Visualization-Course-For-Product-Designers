import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { RadioList, RadioListItem } from "@astryxdesign/core/RadioList";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen, Check, Grid } from "reicon-react";
import { useEffect, useRef, useState, type Ref } from "react";

import { AnswerReview } from "@/course/answer-review";
import { PracticeHeader } from "@/components/practice-header";
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

function ChallengeExercise({ id, titleRef }: { id: string; titleRef: Ref<HTMLHeadingElement> }) {
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
  const [showOriginal, setShowOriginal] = useState(false);
  const [milestonesBefore, setMilestonesBefore] = useState<string[] | null>(null);
  const destination = useRef<HTMLElement>(null);
  const views = challengeViews(challenge);
  const view = fixCorrect && !showOriginal ? views.after : views.before;
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
          <Heading level={2} ref={titleRef} tabIndex={-1}>{challenge.title}</Heading>
          {record && <HStack gap={1} align="center"><Check size={14} aria-hidden="true" /><Text type="supporting" color="secondary">{record.revisitedOn ? "Revisited" : "Practiced"} · {formatDay(record.lastPracticedOn)}</Text></HStack>}
        </HStack>
        <Text as="p" color="secondary" className="challenge-context">{challenge.context}</Text>
      </VStack>
      <Card padding={0} className="challenge-sheet">
      <HStack className="challenge-workspace" gap={0} align="stretch">
          <VStack as="figure" gap={4} padding={5} aria-label={view.title} className="challenge-visual">
            {fixCorrect ? <SegmentedControl label="Compare your change" value={showOriginal ? "before" : "after"} onChange={(value) => setShowOriginal(value === "before")}>
              <SegmentedControlItem label="Original" value="before" />
              <SegmentedControlItem label="Your change" value="after" />
            </SegmentedControl> : <Text type="supporting" color="secondary">The original chart</Text>}
            <Heading level={3} className="challenge-chart-title">{view.title}</Heading>
            <VStack key={`${fixCorrect}:${showOriginal}`} gap={0} className="course-motion-enter challenge-chart"><Chart data={view.chart} title={view.title} /></VStack>
            {table && <details className="course-value-details">
              <summary>View values</summary>
              <VStack className="course-data-scroll" gap={0} tabIndex={0} role="region" aria-label={`${view.title} values`}><DataGrid data={table} title={view.title} /></VStack>
            </details>}
          </VStack>
        <VStack as="section" gap={4} padding={5} className="challenge-decision" ref={destination} tabIndex={-1} aria-label={finished ? "Challenge complete" : step === "fix" ? "Choose a change" : "Explain your decision"}>
          <HStack as="ol" gap={4} className="challenge-steps" aria-label="Challenge steps">
            {['Make a decision', 'Explain it'].map((label, index) => {
              const complete = index === 0 ? fixCorrect : finished;
              const current = !finished && (index === 0 ? !fixCorrect : fixCorrect);
              return <HStack as="li" key={label} gap={2} align="center" aria-current={current ? "step" : undefined} data-complete={complete || undefined}>
                <HStack gap={0} justify="center" align="center" className="challenge-step-number" aria-hidden="true">{complete ? <Check size={13} /> : <Text type="supporting">{index + 1}</Text>}</HStack>
                <Text type="supporting" color={current ? "primary" : "secondary"} weight={current ? "semibold" : undefined}>{label}</Text>
              </HStack>;
            })}
          </HStack>
          {finished ? (
            <VStack gap={3} className="course-motion-enter">
              <HStack align="center" gap={2}><Check size={20} aria-hidden="true" /><Heading level={2}>A decision you can explain</Heading></HStack>
              <Text as="p">{challenge.reason.explanation}</Text>
              <Text as="p" type="supporting" color="secondary">You’ve practiced this idea. Try the same check on a chart at work.</Text>
              {earned && earned.length > 0 && <VStack gap={1} className="learning-milestone-note" role="status">{earned.map(({ id, title }) => <Text as="p" key={id} weight="semibold">Milestone earned · {title}</Text>)}</VStack>}
              <HStack gap={2} wrap="wrap" className="learning-actions course-action-pair">
                {next && <Button href={`/challenges?lesson=${next.lessonId}`} label="Try another challenge" variant="primary" endContent={<ArrowRight size={16} aria-hidden="true" />} />}
                <Button label="Practice this again" variant="secondary" onClick={() => { restartChallenge(id); setSelection(""); setShowOriginal(false); setMilestonesBefore(null); requestAnimationFrame(() => destination.current?.focus()); }} />
              </HStack>
            </VStack>
          ) : (
            <>
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
              <HStack gap={2} className="challenge-submit">{answered === null
                ? <Button label={step === "fix" ? "Try this change" : "Check my reasoning"} variant="primary" isDisabled={selection === ""} onClick={check} />
                : <Button label="Try again" variant="secondary" onClick={retry} />}</HStack>
            </>
          )}
        </VStack>
      </HStack>
      </Card>
      <HStack gap={2} align="center" className="challenge-related"><BookOpen size={15} aria-hidden="true" /><Link to="/lesson/$lessonId" params={{ lessonId: id }} className="learning-quiet-link">{lesson.title}</Link></HStack>
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
  const exerciseHeading = useRef<HTMLHeadingElement>(null);
  const catalogHeading = useRef<HTMLHeadingElement>(null);
  const previousId = useRef(id);
  useEffect(() => {
    if (previousId.current === id) return;
    previousId.current = id;
    const frame = requestAnimationFrame(() => exerciseHeading.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [id]);

  function toggleBrowser() {
    setBrowsing(!browsing);
    requestAnimationFrame(() => (browsing ? exerciseHeading : catalogHeading).current?.focus());
  }
  return (
    <VStack className="course-wrap course-simple-page challenges-page" gap={5}>
      <PracticeHeader title="Design challenges" description="Make a chart decision, then explain it. About 3 minutes each.">
        <Button label={browsing ? "Back to challenge" : "Browse challenges"} variant="ghost" icon={browsing ? <ArrowLeft size={16} aria-hidden="true" /> : <Grid size={16} aria-hidden="true" />} onClick={toggleBrowser} />
      </PracticeHeader>
      {!canSave && <Text as="p" role="status">Progress is available in this tab only.</Text>}
      {browsing ? <VStack gap={3}>
        <Heading level={2} ref={catalogHeading} tabIndex={-1}>Choose a challenge</Heading>
        <Text as="p" type="supporting" color="secondary">{challenges.filter(({ lessonId }) => progress.learning.challenges[lessonId]).length} of {challenges.length} challenges practiced</Text>
        <VStack as="ul" gap={0} className="learning-list" aria-label="Choose a design challenge">
        {challenges.map(({ lessonId, title }, index) => <VStack as="li" gap={0} key={lessonId}>
          <Link to="/challenges" search={{ lesson: lessonId }} onClick={() => { setBrowsing(false); requestAnimationFrame(() => exerciseHeading.current?.focus()); }} className="learning-choice-row">
            <Text type="supporting" color="secondary" className="challenge-index">{String(index + 1).padStart(2, "0")}</Text>
            <VStack gap={1}><Text weight="semibold">{title}</Text><Text type="supporting" color="secondary">{lessons.find(({ id }) => id === lessonId)?.title}</Text></VStack>
            <Text type="supporting" color="secondary">{progress.learning.challenges[lessonId] ? "Practiced" : "3 min"}</Text>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </VStack>)}
      </VStack></VStack> : <ChallengeExercise key={id} id={id} titleRef={exerciseHeading} />}
      <Link to="/course" className="course-back"><ArrowLeft size={16} aria-hidden="true" /> Course overview</Link>
    </VStack>
  );
}
