import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { ReactNode, Ref } from "react";

export function PracticeHeader({ title, description, children, hasDivider = true, titleRef }: {
  title: string;
  description: string;
  children?: ReactNode;
  hasDivider?: boolean;
  titleRef?: Ref<HTMLHeadingElement>;
}) {
  return (
    <HStack as="header" gap={4} justify="between" align="center" wrap="wrap" className="practice-page-header" data-divider={hasDivider || undefined}>
      <VStack gap={1.5}>
        <Heading level={1} ref={titleRef} tabIndex={titleRef ? -1 : undefined} className="course-display course-page-title">{title}</Heading>
        <Text as="p" color="secondary">{description}</Text>
      </VStack>
      {children}
    </HStack>
  );
}
