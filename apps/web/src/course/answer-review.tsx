import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { Check, X } from "reicon-react";

/** Submitted answers are reading material, rather than disabled form controls. */
export function AnswerReview({ options, selected, correct, label = "Answer review" }: {
  options: readonly string[];
  selected: number;
  correct: number;
  label?: string;
}) {
  return (
    <VStack as="ul" gap={2} className="answer-review" aria-label={label}>
      {options.map((option, index) => {
        const isCorrect = index === correct;
        const isSelected = index === selected;
        return (
          <HStack as="li" key={option} gap={2} align="start" padding={3} className="answer-review-option" data-result={isCorrect ? "correct" : isSelected ? "incorrect" : undefined}>
            {isCorrect ? <Check size={16} aria-hidden="true" /> : isSelected ? <X size={16} aria-hidden="true" /> : <HStack as="span" gap={0} aria-hidden="true" className="answer-review-mark" />}
            <VStack gap={0.5}>
              <Text as="p">{option}</Text>
              {(isCorrect || isSelected) && <Text as="p" type="supporting" weight="semibold" className="answer-review-status">
                {isCorrect ? isSelected ? "Your answer · Correct" : "Correct answer" : "Your answer · Incorrect"}
              </Text>}
            </VStack>
          </HStack>
        );
      })}
    </VStack>
  );
}
