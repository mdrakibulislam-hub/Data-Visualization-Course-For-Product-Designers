import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Link } from "@astryxdesign/core/Link";
import { ProgressBar } from "@astryxdesign/core/ProgressBar";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Check, Repeat } from "reicon-react";
import { useEffect, useRef, useState, type Ref } from "react";

import { type CourseLesson } from "@/course/curriculum";
import { dueLessonIds, formatDay } from "@/course/learning-state";
import { useProgress } from "@/course/progress";
import { useCurrentCourse } from "@/course/course-context";
import { courseLessonHref } from "@/course/catalog";

export const Route = createFileRoute("/review")({
  head: () => ({ meta: [{ title: "Flashcards · Graphnotes" }] }),
  component: Flashcards,
});

type LeavingCard = { lesson: CourseLesson; revealed: boolean; direction: "left" | "right" };

function StudyCard({ lesson, revealed, leaving, questionRef, answerRef, onExit }: {
  lesson: CourseLesson;
  revealed: boolean;
  leaving?: LeavingCard["direction"];
  questionRef?: Ref<HTMLHeadingElement>;
  answerRef?: Ref<HTMLHeadingElement>;
  onExit?: () => void;
}) {
  const { content: { lessons } } = useCurrentCourse();
  return (
    <Card padding={0} className={`review-sheet ${leaving ? "review-leaving" : "review-current"}`} data-direction={leaving} aria-hidden={leaving ? true : undefined} inert={leaving ? true : undefined} onAnimationEnd={(event) => {
      if (leaving && event.target === event.currentTarget) onExit?.();
    }}>
      <VStack as="section" aria-labelledby={leaving ? undefined : "flashcard-question"} gap={0}>
        <HStack paddingInline={5} paddingBlock={4} justify="between" align="center" gap={2}>
          <Text type="supporting" color="secondary">{lesson.moduleTitle}</Text>
          <Text type="supporting" color="secondary">{lessons.indexOf(lesson) + 1} / {lessons.length}</Text>
        </HStack>
        <VStack className="review-prompt" padding={5} gap={4} align="center" justify="center">
          <Heading level={2} ref={questionRef} tabIndex={leaving ? undefined : -1} className="course-display review-question" id={leaving ? undefined : "flashcard-question"} textWrap="balance" justify="center">{lesson.flashcard.front}</Heading>
          {revealed && (
            <VStack className="review-answer" gap={2} align="center">
              <Heading level={3} ref={answerRef} tabIndex={leaving ? undefined : -1} id={leaving ? undefined : "flashcard-answer"} aria-describedby={leaving ? undefined : "flashcard-answer-text"} className="review-answer-label">Answer</Heading>
              <Text as="p" id={leaving ? undefined : "flashcard-answer-text"}>{lesson.flashcard.back}</Text>
            </VStack>
          )}
        </VStack>
      </VStack>
    </Card>
  );
}

export function Flashcards() {
  const course = useCurrentCourse();
  const { lessons } = course.content;
  const { progress, today, canSave, rateCard } = useProgress();
  const [lastRated, setLastRated] = useState<string | null>(null);
  const [newRevisit, setNewRevisit] = useState(false);
  const [reviewAll, setReviewAll] = useState(false);
  const [revealedCard, setRevealedCard] = useState<string | null>(null);
  const [leaving, setLeaving] = useState<LeavingCard | null>(null);
  const [turn, setTurn] = useState(0);
  const advanceLock = useRef(false);
  const answerHeading = useRef<HTMLHeadingElement>(null);
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const due = dueLessonIds(progress.learning, progress.completed, progress.knownCards, today, lessons);
  const remaining = lessons.filter(({ id }) => due.includes(id)).sort((a, b) => due.indexOf(a.id) - due.indexOf(b.id));
  const nextDue = Object.values(progress.learning.reviews).map(({ dueOn }) => dueOn).filter((day) => day > today).sort()[0];
  const deck = reviewAll ? lessons : remaining;
  const card = deck.find(({ id }) => id === progress.reviewCard) ?? deck[0];
  const isRevealed = card != null && revealedCard === card.id;

  function finishExit() {
    advanceLock.current = false;
    setLeaving(null);
  }

  useEffect(() => {
    if (!leaving) return;
    // Clear the decorative outgoing sheet even if motion settings change mid-animation.
    const timeout = window.setTimeout(() => {
      advanceLock.current = false;
      setLeaving(null);
    }, 600);
    return () => window.clearTimeout(timeout);
  }, [leaving]);

  function changeDeck(all: boolean) {
    setRevealedCard(null);
    setReviewAll(all);
  }

  function rate(known: boolean) {
    if (!card || !isRevealed || advanceLock.current) return;
    const next = deck[(deck.indexOf(card) + 1) % deck.length];
    const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (animate) {
      advanceLock.current = true;
      setLeaving({ lesson: card, revealed: true, direction: known ? "right" : "left" });
    }
    const schedule = progress.learning.reviews[card.id];
    setLastRated(card.id);
    setNewRevisit(Boolean(known && !progress.learning.milestones["first-revisit"] && schedule && schedule.dueOn <= today && schedule.reviewedOn !== today));
    // Save the decision immediately so navigation during the exit preserves progress.
    rateCard(card.id, known, known && !reviewAll && next.id === card.id ? null : next.id);
    setTurn((value) => value + 1);
    setRevealedCard(null);
    requestAnimationFrame(() => questionHeading.current?.focus());
  }

  return (
    <VStack className="course-wrap course-simple-page review-page" gap={5}>
      <HStack as="header" justify="between" align="start" wrap="wrap" gap={4}>
        <VStack gap={1.5}>
          <Heading level={1} className="course-display course-page-title">Flashcards</Heading>
          <Text as="p" color="secondary">Recall an idea, then turn the card to check it.</Text>
        </VStack>
        <SegmentedControl label="Review deck" value={reviewAll ? "all" : "remaining"} onChange={(value) => changeDeck(value === "all")} isDisabled={Boolean(leaving)}>
          <SegmentedControlItem label={`Due now (${remaining.length})`} value="remaining" />
          <SegmentedControlItem label="All cards" value="all" />
        </SegmentedControl>
      </HStack>
      <VStack gap={4} className="review-workspace">
        <VStack gap={0} width="100%">
          <ProgressBar label="Cards recalled" value={progress.knownCards.length} max={lessons.length} hasValueLabel formatValueLabel={(value, max) => `${value} of ${max}`} />
        </VStack>
        {progress.learning.weeklyGoal > 0 && <Text as="p" type="supporting" color="secondary">Three different cards count as a practice day.</Text>}
        {!canSave && <Text as="p" type="supporting" role="status" color="secondary">Progress is available in this tab only.</Text>}

        <VStack className="review-stage" gap={4} align="center">
          <VStack className="review-deck-window" gap={0} width="100%">
            <VStack className="review-deck" gap={0} data-empty={!card || undefined}>
              {card ? (
                <StudyCard key={`${card.id}:${turn}`} lesson={card} revealed={isRevealed} questionRef={questionHeading} answerRef={answerHeading} />
              ) : (
                <Card padding={5} className="review-sheet review-current">
                  <VStack as="section" className="review-prompt" gap={3} align="center" justify="center">
                    <Heading level={2} ref={questionHeading} tabIndex={-1}>{nextDue ? "You’re up to date" : "No reviews due yet"}</Heading>
                    <Text as="p" color="secondary">{nextDue ? `Your next review is ${formatDay(nextDue)}. You can practice ahead with the full deck.` : "Finish a lesson to schedule a review two days later, or explore the full deck now."}</Text>
                    <Button label="Practice all cards" variant="secondary" onClick={() => changeDeck(true)} />
                  </VStack>
                </Card>
              )}
              {leaving && <StudyCard lesson={leaving.lesson} revealed={leaving.revealed} leaving={leaving.direction} onExit={finishExit} />}
            </VStack>
          </VStack>

          {lastRated && progress.learning.reviews[lastRated] && <Text as="p" type="supporting" color="secondary" role="status">
            {newRevisit ? "Milestone earned · An idea revisited. " : "Review saved. "}Next review for this idea: {formatDay(progress.learning.reviews[lastRated].dueOn)}.
          </Text>}

          {card && (
            <VStack gap={4} align="center">
              <HStack justify="center" align="center" gap={2} wrap="wrap" className="review-actions course-action-pair">
                {isRevealed ? (
                  <>
                    <Button label="Review tomorrow" variant="secondary" size="lg" icon={<Repeat size={16} aria-hidden="true" />} className="course-action" isDisabled={Boolean(leaving)} onClick={() => rate(false)} />
                    <Button label="I knew it" variant="primary" size="lg" icon={<Check size={16} aria-hidden="true" />} className="course-action" isDisabled={Boolean(leaving)} onClick={() => rate(true)} />
                  </>
                ) : (
                  <Button label="Show answer" variant="primary" size="lg" className="course-action" isDisabled={Boolean(leaving)} endContent={<ArrowRight size={16} aria-hidden="true" />} onClick={() => {
                    setRevealedCard(card.id);
                    requestAnimationFrame(() => answerHeading.current?.focus());
                  }} />
                )}
              </HStack>
              <HStack align="center" justify="center" gap={1.5} wrap="wrap" className="review-related">
                <BookOpen size={15} aria-hidden="true" />
                <Link href={courseLessonHref(course, card.id)} type="supporting" color="secondary" hasUnderline>{card.title}</Link>
              </HStack>
            </VStack>
          )}
        </VStack>
      </VStack>
    </VStack>
  );
}
