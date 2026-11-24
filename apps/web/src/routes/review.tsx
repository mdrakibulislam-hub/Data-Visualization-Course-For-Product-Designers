import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Link } from "@astryxdesign/core/Link";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Check, Layers, Repeat } from "reicon-react";
import { useEffect, useRef, useState, type Ref } from "react";

import type { CourseLesson } from "@/course/curriculum";
import { dueLessonIds, formatDay } from "@/course/learning-state";
import { useProgress } from "@/course/progress";
import { useCurrentCourse } from "@/course/course-context";
import { courseLessonHref } from "@/course/catalog";

export const Route = createFileRoute("/review")({
  head: () => ({ meta: [{ title: "Flashcards · Graphnotes" }] }),
  component: Flashcards,
});

type LeavingCard = { lesson: CourseLesson; revealed: boolean; position: string; direction: "left" | "right" };

function StudyCard({ lesson, revealed, position, leaving, isLocked = false, questionRef, answerRef, onExit, onReveal, onHide, onRate }: {
  lesson: CourseLesson;
  revealed: boolean;
  position: string;
  leaving?: LeavingCard["direction"];
  isLocked?: boolean;
  questionRef?: Ref<HTMLHeadingElement>;
  answerRef?: Ref<HTMLHeadingElement>;
  onExit?: () => void;
  onReveal?: () => void;
  onHide?: () => void;
  onRate?: (known: boolean) => void;
}) {
  return (
    <Card padding={0} elevation="none" className={`review-sheet ${leaving ? "review-leaving" : "review-current"}`} data-direction={leaving} data-revealed={revealed} aria-hidden={leaving ? true : undefined} inert={leaving ? true : undefined} onAnimationEnd={(event) => {
      if (leaving && event.target === event.currentTarget) onExit?.();
    }}>
      <VStack as="section" aria-labelledby={leaving ? undefined : revealed ? "flashcard-answer" : "flashcard-question"} gap={0}>
        <HStack paddingInline={6} paddingBlock={4} justify="between" align="center" gap={3} className="review-card-meta">
          <HStack gap={2} align="center"><Layers size={16} aria-hidden="true" /><Text type="supporting" color="secondary">{lesson.moduleTitle}</Text></HStack>
          <Text type="supporting" color="secondary" className="review-position">{position}</Text>
        </HStack>
        <VStack className="review-prompt" padding={6} gap={4} align="center" justify="center" onClick={!revealed && !isLocked ? onReveal : undefined}>
          <VStack key={revealed ? "answer" : "question"} gap={4} align="center" className="review-face">
            <Text as="p" type="supporting" color="secondary" className="review-face-label">{revealed ? "Answer" : "Question"}</Text>
            {revealed ? <>
              <Heading level={2} ref={answerRef} tabIndex={leaving ? undefined : -1} id={leaving ? undefined : "flashcard-answer"} className="review-answer-text" justify="center">{lesson.flashcard.back}</Heading>
              <Button label="View question" variant="ghost" size="sm" icon={<Repeat size={15} aria-hidden="true" />} isDisabled={isLocked} onClick={onHide} />
            </> : <Heading level={2} ref={questionRef} tabIndex={leaving ? undefined : -1} className="course-display review-question" id={leaving ? undefined : "flashcard-question"} textWrap="balance" justify="center">{lesson.flashcard.front}</Heading>}
          </VStack>
        </VStack>
        <VStack paddingInline={6} paddingBlock={4} gap={2} align="center" className="review-card-footer">
          <HStack justify="center" align="center" gap={2} className="review-actions course-action-pair">
            {revealed ? <>
              <Button label="Review tomorrow" variant="secondary" icon={<Repeat size={16} aria-hidden="true" />} isDisabled={isLocked} onClick={() => onRate?.(false)} />
              <Button label="I knew it" variant="primary" icon={<Check size={16} aria-hidden="true" />} isDisabled={isLocked} onClick={() => onRate?.(true)} />
            </> : <Button label="Show answer" variant="primary" isDisabled={isLocked} endContent={<ArrowRight size={16} aria-hidden="true" />} onClick={onReveal} />}
          </HStack>
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
  const position = reviewAll ? `${card ? deck.indexOf(card) + 1 : 0} / ${deck.length}` : `${deck.length} left to review`;

  function finishExit() { advanceLock.current = false; setLeaving(null); }

  useEffect(() => {
    if (!leaving) return;
    const timeout = window.setTimeout(finishExit, 600);
    return () => window.clearTimeout(timeout);
  }, [leaving]);

  function changeDeck(all: boolean) { setRevealedCard(null); setReviewAll(all); setLastRated(null); }
  function reveal() {
    if (!card || advanceLock.current) return;
    setRevealedCard(card.id);
    requestAnimationFrame(() => answerHeading.current?.focus());
  }
  function hideAnswer() {
    setRevealedCard(null);
    requestAnimationFrame(() => questionHeading.current?.focus());
  }
  function rate(known: boolean) {
    if (!card || !isRevealed || advanceLock.current) return;
    const next = deck[(deck.indexOf(card) + 1) % deck.length];
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      advanceLock.current = true;
      setLeaving({ lesson: card, revealed: true, position, direction: known ? "right" : "left" });
    }
    const schedule = progress.learning.reviews[card.id];
    setLastRated(card.id);
    setNewRevisit(Boolean(known && !progress.learning.milestones["first-revisit"] && schedule && schedule.dueOn <= today && schedule.reviewedOn !== today));
    rateCard(card.id, known, known && !reviewAll && next.id === card.id ? null : next.id);
    setTurn((value) => value + 1);
    setRevealedCard(null);
    requestAnimationFrame(() => questionHeading.current?.focus());
  }

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.repeat || event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.defaultPrevented || leaving || document.querySelector("dialog[open]")) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest('button, a, input, textarea, select, [role="radio"], [role="tab"], [contenteditable="true"]')) return;
      if (event.code === "Space" && card) { event.preventDefault(); isRevealed ? hideAnswer() : reveal(); }
      else if (isRevealed && (event.key === "ArrowLeft" || event.key === "ArrowRight")) { event.preventDefault(); rate(event.key === "ArrowRight"); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <VStack className="course-wrap course-simple-page review-page" gap={5}>
      <HStack as="header" justify="between" align="center" wrap="wrap" gap={4} className="review-header">
        <VStack gap={1.5}>
          <Heading level={1} className="course-display course-page-title">Flashcards</Heading>
          <Text as="p" color="secondary">Think of your answer, then turn the card.</Text>
        </VStack>
        <SegmentedControl label="Review deck" value={reviewAll ? "all" : "remaining"} onChange={(value) => changeDeck(value === "all")} isDisabled={Boolean(leaving)}>
          <SegmentedControlItem label={`Due now (${remaining.length})`} value="remaining" />
          <SegmentedControlItem label="All cards" value="all" />
        </SegmentedControl>
      </HStack>
      <VStack gap={4} className="review-workspace">
        {!canSave && <Text as="p" type="supporting" role="status" color="secondary">Progress is available in this tab only.</Text>}
        <VStack className="review-stage" gap={4} align="center">
          <VStack className="review-deck-window" gap={0} width="100%">
            <VStack className="review-deck" gap={0} data-empty={!card || undefined}>
              {card ? <StudyCard key={`${card.id}:${turn}`} lesson={card} revealed={isRevealed} position={position} isLocked={Boolean(leaving)} questionRef={questionHeading} answerRef={answerHeading} onReveal={reveal} onHide={hideAnswer} onRate={rate} /> : (
                <Card padding={6} className="review-sheet review-current">
                  <VStack as="section" className="review-prompt" gap={3} align="center" justify="center">
                    <Check size={28} aria-hidden="true" className="review-empty-icon" />
                    <Heading level={2} ref={questionHeading} tabIndex={-1}>{nextDue ? "You’re up to date" : "No reviews due yet"}</Heading>
                    <Text as="p" color="secondary">{nextDue ? `Your next review is ${formatDay(nextDue)}. You can practice ahead with the full deck.` : "Finish a lesson to schedule a review two days later, or explore the full deck now."}</Text>
                    <Button label="Practice all cards" variant="secondary" onClick={() => changeDeck(true)} />
                  </VStack>
                </Card>
              )}
              {leaving && <StudyCard lesson={leaving.lesson} revealed={leaving.revealed} position={leaving.position} leaving={leaving.direction} onExit={finishExit} />}
            </VStack>
          </VStack>
          {card && <>
            <HStack align="center" justify="between" gap={3} wrap="wrap" className="review-under-card">
              <HStack align="center" gap={1.5} className="review-related"><BookOpen size={15} aria-hidden="true" /><Link href={courseLessonHref(course, card.id)} type="supporting" color="secondary" hasUnderline>{card.title}</Link></HStack>
              <HStack gap={3} align="center" className="review-keyboard-hints" aria-hidden="true">
                {isRevealed ? <><Text type="supporting" color="secondary"><kbd>←</kbd> Tomorrow</Text><Text type="supporting" color="secondary"><kbd>→</kbd> Recalled</Text></> : <Text type="supporting" color="secondary"><kbd>Space</kbd> Reveal</Text>}
              </HStack>
            </HStack>
            <Text as="p" type="supporting" color="secondary" className="review-recall-note">{progress.knownCards.length} of {lessons.length} ideas recalled at your last check.{progress.learning.weeklyGoal > 0 ? " Review three different cards for a practice day." : ""}</Text>
          </>}
          <VStack gap={0} className="review-save-status" role="status">
            {lastRated && progress.learning.reviews[lastRated] && <Text as="p" type="supporting" color="secondary">{newRevisit ? "Milestone earned · An idea revisited. " : "Review saved. "}Next review for this idea: {formatDay(progress.learning.reviews[lastRated].dueOn)}.</Text>}
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
}
