import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Divider } from "@astryxdesign/core/Divider";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Link } from "@astryxdesign/core/Link";
import { ProgressBar } from "@astryxdesign/core/ProgressBar";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Check, Repeat } from "reicon-react";
import { useRef, useState } from "react";

import { lessons } from "@/course/curriculum";
import { useProgress } from "@/course/progress";

export const Route = createFileRoute("/review")({
  head: () => ({ meta: [{ title: "Flashcards · Graphnotes" }] }),
  component: Flashcards,
});

function Flashcards() {
  const { progress, canSave, rateCard } = useProgress();
  const [reviewAll, setReviewAll] = useState(false);
  const [revealedCard, setRevealedCard] = useState<string | null>(null);
  const answerHeading = useRef<HTMLHeadingElement>(null);
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const remaining = lessons.filter(({ id }) => !progress.knownCards.includes(id));
  const deck = reviewAll ? lessons : remaining;
  const card = deck.find(({ id }) => id === progress.reviewCard) ?? deck[0];
  const isRevealed = card != null && revealedCard === card.id;

  function changeDeck(all: boolean) {
    setRevealedCard(null);
    setReviewAll(all);
  }

  function rate(known: boolean) {
    if (!card) return;
    const position = deck.indexOf(card);
    const next = deck[(position + 1) % deck.length];
    rateCard(card.id, known, known && !reviewAll && next.id === card.id ? null : next.id);
    setRevealedCard(null);
    requestAnimationFrame(() => questionHeading.current?.focus());
  }

  return (
    <VStack className="course-wrap course-simple-page review-page" gap={5}>
      <VStack as="header" gap={1.5} className="course-motion-enter">
        <Heading level={1} className="course-display course-page-title">Flashcards</Heading>
        <Text as="p" color="secondary">Try to recall the answer before you reveal it.</Text>
      </VStack>

      <VStack gap={3}>
        <HStack justify="between" align="center" wrap="wrap" gap={3}>
          <SegmentedControl label="Review deck" value={reviewAll ? "all" : "remaining"} onChange={(value) => changeDeck(value === "all")}>
            <SegmentedControlItem label="To review" value="remaining" />
            <SegmentedControlItem label="All cards" value="all" />
          </SegmentedControl>
          <VStack gap={0} className="review-progress">
            <ProgressBar label="Cards known" value={progress.knownCards.length} max={lessons.length} hasValueLabel formatValueLabel={(value, max) => `${value} of ${max}`} />
          </VStack>
        </HStack>
        {!canSave && <Text as="p" type="supporting" role="status" color="secondary">Progress is available in this tab only.</Text>}

        {card ? (
          <Card padding={0} className="review-sheet">
            <VStack as="section" aria-labelledby="flashcard-question" gap={0}>
              <VStack paddingInline={4} paddingBlock={3} gap={0}>
                <Text type="supporting" color="secondary" weight="semibold">{card.moduleTitle}</Text>
              </VStack>
              <Divider />
              <VStack key={card.id} className="review-prompt course-motion-enter" padding={5} gap={3} align="center" justify="center">
                <Heading level={2} ref={questionHeading} tabIndex={-1} className="course-display review-question" id="flashcard-question" textWrap="balance" justify="center">{card.flashcard.front}</Heading>
                {isRevealed && (
                  <VStack className="review-answer course-motion-enter" gap={1.5} align="start" aria-labelledby="flashcard-answer">
                    <Heading level={3} ref={answerHeading} tabIndex={-1} id="flashcard-answer" aria-describedby="flashcard-answer-text" className="review-answer-label">Answer</Heading>
                    <Text as="p" id="flashcard-answer-text">{card.flashcard.back}</Text>
                  </VStack>
                )}
              </VStack>
              <Divider />
              <HStack paddingInline={4} paddingBlock={3} justify="center" align="center" gap={2} wrap="wrap">
                {isRevealed ? (
                  <>
                    <Button label="Review again" variant="secondary" size="lg" icon={<Repeat size={16} aria-hidden="true" />} className="course-action" onClick={() => rate(false)} />
                    <Button label="I knew it" variant="primary" size="lg" icon={<Check size={16} aria-hidden="true" />} className="course-action" onClick={() => rate(true)} />
                  </>
                ) : (
                  <Button label="Show answer" variant="primary" size="lg" className="course-action" endContent={<ArrowRight size={16} aria-hidden="true" />} onClick={() => {
                    setRevealedCard(card.id);
                    requestAnimationFrame(() => answerHeading.current?.focus());
                  }} />
                )}
              </HStack>
            </VStack>
          </Card>
        ) : (
          <Card padding={5} className="review-sheet">
            <VStack as="section" gap={3} align="start" className="course-motion-enter">
              <Heading level={2} ref={questionHeading} tabIndex={-1}>You know all {lessons.length} cards</Heading>
              <Text as="p" color="secondary">Revisit the full deck whenever you want more practice.</Text>
              <Button label="Review all cards" variant="secondary" onClick={() => {
                changeDeck(true);
                requestAnimationFrame(() => questionHeading.current?.focus());
              }} />
            </VStack>
          </Card>
        )}

        {card && (
          <HStack align="center" gap={1.5} className="review-related">
            <BookOpen size={16} aria-hidden="true" />
            <Text color="secondary" type="supporting">Related lesson</Text>
            <Link href={`/lesson/${card.id}`} type="supporting" weight="semibold" hasUnderline>{card.title}</Link>
          </HStack>
        )}
      </VStack>
    </VStack>
  );
}
