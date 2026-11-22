import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { ProgressBar } from "@astryxdesign/core/ProgressBar";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cards, Check, Repeat } from "reicon-react";
import { useRef, useState } from "react";

import { lessons } from "@/course/curriculum";
import { useProgress } from "@/course/progress";

export const Route = createFileRoute("/review")({
  head: () => ({ meta: [{ title: "Flashcards · Data Viz Field Guide" }] }),
  component: Flashcards,
});

function Flashcards() {
  const { progress, canSave, rateCard } = useProgress();
  const [reviewAll, setReviewAll] = useState(false);
  const [revealedCard, setRevealedCard] = useState<string | null>(null);
  const answer = useRef<HTMLParagraphElement>(null);
  const reveal = useRef<HTMLButtonElement>(null);
  const unseen = lessons.filter(({ id }) => !progress.knownCards.includes(id));
  const deck = reviewAll ? lessons : unseen;
  const card = deck.find(({ id }) => id === progress.reviewCard) ?? deck[0];
  const isRevealed = card != null && revealedCard === card.id;

  function changeDeck(all: boolean) {
    setRevealedCard(null);
    setReviewAll(all);
  }

  function rate(known: boolean) {
    if (!card) return;
    const position = deck.indexOf(card);
    const next = deck[position + 1] ?? (position > 0 || !known || reviewAll ? deck[0] : undefined);
    rateCard(card.id, known, next?.id ?? null);
    setRevealedCard(null);
    requestAnimationFrame(() => reveal.current?.focus());
  }

  return (
    <VStack className="course-wrap course-simple-page practice-page flash-page" gap={4}>
      <VStack as="header" gap={2} className="course-motion-enter practice-header">
        <Heading level={1} className="course-display course-page-title">Flashcards</Heading>
        <p className="course-deck">Think of your answer before you turn the card.</p>
      </VStack>
      <HStack justify="between" align="center" wrap="wrap" gap={2}>
        <SegmentedControl label="Review deck" value={reviewAll ? "all" : "remaining"} onChange={(value) => changeDeck(value === "all")}>
          <SegmentedControlItem label="To review" value="remaining" />
          <SegmentedControlItem label="All cards" value="all" />
        </SegmentedControl>
        {!canSave && <Text as="p" type="supporting" role="status" color="secondary">Progress is available in this tab only.</Text>}
      </HStack>

      <HStack className="flash-studio" align="start" gap={0}>
        {card ? (
          <Card key={card.id} padding={0} className="flash-surface course-motion-enter">
            <VStack as="section" aria-labelledby="flashcard-question" gap={0}>
              <VStack className="flash-card-face" gap={3}>
                <HStack justify="between" align="center" gap={2}>
                  <Text type="supporting" weight="semibold" color="accent">{card.moduleTitle}</Text>
                  <Cards size={20} className="flash-card-icon" aria-hidden="true" />
                </HStack>
                <Heading level={2} className="course-display flash-question" id="flashcard-question">{card.flashcard.front}</Heading>
              </VStack>
              {isRevealed && (
                <VStack className="flash-reveal course-motion-enter" gap={1.5}>
                  <Text type="supporting" weight="semibold">Answer</Text>
                  <p ref={answer} tabIndex={-1}>{card.flashcard.back}</p>
                </VStack>
              )}
              <HStack className="flash-card-actions" justify="between" align="center" wrap="wrap" gap={2}>
                {isRevealed ? (
                  <>
                    <Button label="Review again" variant="secondary" size="lg" icon={<Repeat size={16} aria-hidden="true" />} className="course-action" onClick={() => rate(false)} />
                    <Button label="I knew it" variant="primary" size="lg" icon={<Check size={16} aria-hidden="true" />} className="course-action" onClick={() => rate(true)} />
                  </>
                ) : (
                  <Button ref={reveal} label="Show answer" variant="primary" size="lg" className="course-action" endContent={<ArrowRight size={16} aria-hidden="true" />} onClick={() => {
                    setRevealedCard(card.id);
                    requestAnimationFrame(() => answer.current?.focus());
                  }} />
                )}
              </HStack>
            </VStack>
          </Card>
        ) : (
          <Card padding={5} className="course-motion-enter">
            <VStack as="section" gap={3}>
              <Heading level={2}>You know all {lessons.length} cards</Heading>
              <Text as="p" color="secondary">Come back later and see what you can recall.</Text>
              <HStack gap={1}><Button label="Review all cards" variant="secondary" onClick={() => changeDeck(true)} /></HStack>
            </VStack>
          </Card>
        )}
        <VStack as="aside" gap={3} className="flash-deck-status">
          <Card variant="muted" padding={3}>
            <VStack gap={2}>
              <ProgressBar label="Cards known" value={progress.knownCards.length} max={lessons.length} hasValueLabel formatValueLabel={(value, max) => `${value} of ${max}`} />
              <Text as="p" type="supporting" color="secondary">{unseen.length} left to review</Text>
            </VStack>
          </Card>
          {card && (
            <Link to="/lesson/$lessonId" params={{ lessonId: card.id }} className="course-back flash-lesson-link">
              <Text type="supporting" color="secondary">Related lesson</Text>
              <HStack gap={1} align="center"><Text weight="semibold">{card.title}</Text><ArrowRight size={15} aria-hidden="true" /></HStack>
            </Link>
          )}
        </VStack>
      </HStack>
    </VStack>
  );
}
