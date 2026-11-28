import { Button } from "@astryxdesign/core/Button";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { TextArea } from "@astryxdesign/core/TextArea";
import { VStack } from "@astryxdesign/core/VStack";
import { useState } from "react";
import { useProgress } from "../progress";
import { InteractionExperiment } from "./experiments";
import type { InteractionContent, LessonGuide } from "./types";

export function LessonActivity({ lessonId, guide, content }: { lessonId: string; guide: LessonGuide; content: InteractionContent }) {
  const { progress, canSave, saveHciNote } = useProgress();
  const [revealed, setRevealed] = useState(false);
  const lab = content.labs.find(({ id }) => id === guide.lab);
  return <VStack as="section" id="lesson-lab" gap={4} aria-labelledby="activity-title">
    <VStack gap={1}><Heading level={2} id="activity-title">Practise the idea</Heading><Text as="p">{guide.prediction}</Text></VStack>
    <TextArea label="Your prediction or reasoning" description={canSave ? "Optional. Saved with this course’s progress in this browser." : "Optional. Available in this tab; export progress to keep a copy."} value={progress.hci.notes[lessonId] ?? ""} onChange={(note) => saveHciNote(lessonId, note)} rows={3} maxLength={1200} htmlMaxLength={1200} />
    {lab && <InteractionExperiment key={lab.id} lab={lab} />}
    <Button label={revealed ? "Hide worked explanation" : "Compare with a worked explanation"} aria-expanded={revealed} onClick={() => setRevealed(!revealed)} variant="secondary" />
    {revealed && <Text as="p" role="status">{guide.worked}</Text>}
    <details><summary>Words in this lesson</summary><VStack gap={3} paddingBlock={3}>{guide.terms.map((term) => {
      const entry = content.glossary.find((entry) => entry.term === term);
      return entry && <VStack key={term} gap={1}><Text weight="semibold">{term}</Text><Text as="p">{entry.meaning}</Text><Text as="p" color="secondary">{entry.example}</Text></VStack>;
    })}</VStack></details>
    <details><summary>Go deeper · optional</summary><Text as="p">{guide.deeper}</Text></details>
  </VStack>;
}
