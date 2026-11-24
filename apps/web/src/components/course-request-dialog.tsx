import { Button } from "@astryxdesign/core/Button";
import { Dialog, DialogHeader } from "@astryxdesign/core/Dialog";
import { HStack } from "@astryxdesign/core/HStack";
import { Selector } from "@astryxdesign/core/Selector";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { ArrowRight } from "reicon-react";
import { useState } from "react";

export function CourseRequestDialog({ isOpen, onOpenChange, topics }: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  topics: string[];
}) {
  const [topic, setTopic] = useState<string | null>(null);
  const mailto = topic ? `mailto:rakibulislamborkan@gmail.com?subject=${encodeURIComponent(`Graphnotes course request: ${topic}`)}&body=${encodeURIComponent(`Hi Rakib,\n\nI’d like to learn ${topic} on Graphnotes.\n\nThanks!`)}` : undefined;

  return (
    <Dialog isOpen={isOpen} onOpenChange={onOpenChange} width="30rem" purpose="form" padding={0}>
      <VStack gap={6} padding={6} className="course-request-content">
        <DialogHeader title="Request a course" subtitle="What would you like to learn next?" onOpenChange={onOpenChange} hasDivider={false} />
        <Selector label="Topic" options={topics} value={topic ?? undefined} onChange={setTopic} placeholder="Choose a topic" width="100%" />
        <VStack gap={4} className="course-request-footer">
          <Text as="p" type="supporting" color="secondary">Opens an email draft to Rakib. You can add a note before sending.</Text>
          <HStack gap={2} className="course-action-pair">
            <Button label="Cancel" variant="secondary" onClick={() => onOpenChange(false)} />
            <Button label="Open email draft" variant="primary" href={mailto} isDisabled={!topic} endContent={<ArrowRight size={16} aria-hidden="true" />} />
          </HStack>
        </VStack>
      </VStack>
    </Dialog>
  );
}
