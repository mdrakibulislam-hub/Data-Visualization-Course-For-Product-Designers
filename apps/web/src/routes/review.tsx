import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

  function rate(known: boolean) {
    if (!card) return;
    const index = deck.indexOf(card);
    const rest = [...deck.slice(index + 1), ...deck.slice(0, index)];
    const next = rest[0]?.id ?? (reviewAll || !known ? card.id : null);
    rateCard(card.id, known, next);
    setRevealedCard(null);
    requestAnimationFrame(() => reveal.current?.focus());
  }

  return (
    <VStack className="course-wrap course-simple-page" gap={5}>
      <Link to="/" className="course-back"><ArrowLeft size={16} aria-hidden="true" /> Course overview</Link>
      <VStack as="header" gap={2}>
        <Heading level={1} className="course-display course-page-title">Flashcards</Heading>
        <p className="course-deck">Say your answer before you reveal it. Cards you know move out of your regular review.</p>
      </VStack>

      <VStack className="course-flash-wrap" gap={3}>
        <HStack justify="between" align="center" wrap="wrap" gap={2}>
          <p className="course-meta"><strong>{progress.knownCards.length}</strong> of {lessons.length} cards known</p>
          {reviewAll && <Button label="Show cards to review" variant="ghost" onClick={() => { setRevealedCard(null); setReviewAll(false); }} />}
        </HStack>
        {!canSave && <p role="status">Your browser isn’t saving progress. You can continue in this tab.</p>}

        {card ? (
          <Card key={card.id} minHeight={240} padding={5} className="course-motion-enter">
            <VStack as="section" aria-labelledby="flashcard-question" className="course-flashcard" gap={4}>
              <p className="course-meta">{card.moduleTitle}</p>
              <Heading level={2} id="flashcard-question">{card.flashcard.front}</Heading>
              {isRevealed ? (
                <>
                  <p className="course-flash-answer course-motion-enter" ref={answer} tabIndex={-1}>{card.flashcard.back}</p>
                  <HStack gap={2} wrap="wrap">
                    <Button label="Review again" variant="secondary" size="lg" className="course-action" onClick={() => rate(false)} />
                    <Button label="I knew it" variant="primary" size="lg" className="course-action" onClick={() => rate(true)} />
                  </HStack>
                </>
              ) : (
                <HStack gap={2}>
                  <Button ref={reveal} label="Show answer" variant="primary" size="lg" className="course-action" onClick={() => {
                    setRevealedCard(card.id);
                    requestAnimationFrame(() => answer.current?.focus());
                  }} />
                </HStack>
              )}
            </VStack>
          </Card>
        ) : (
          <Card padding={5} className="course-motion-enter">
            <VStack as="section" className="course-flashcard" gap={3}>
              <Heading level={2}>You know all {lessons.length} cards</Heading>
              <p>Come back later and see what you can recall.</p>
              <HStack gap={2}><Button label="Review all cards" variant="secondary" size="lg" onClick={() => setReviewAll(true)} /></HStack>
            </VStack>
          </Card>
        )}
        {card && <Link to="/lesson/$lessonId" params={{ lessonId: card.id }} className="course-back course-card-lesson">
          Revisit {card.title.toLowerCase()} <ArrowRight size={15} aria-hidden="true" />
        </Link>}
      </VStack>
    </VStack>
  );
}
