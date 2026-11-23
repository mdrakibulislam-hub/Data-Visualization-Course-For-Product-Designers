import { Button } from "@astryxdesign/core/Button";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";

import { useProgress } from "@/course/progress";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Your progress · Graphnotes" }] }),
  component: ProgressInfo,
});

function ProgressInfo() {
  const { canSave } = useProgress();
  return (
    <VStack className="course-wrap course-simple-page course-account" gap={4}>
      <VStack as="header" gap={2}>
        <Heading level={1} className="course-display course-page-title">No account needed</Heading>
        <Text as="p">{canSave
          ? "Your lessons, quiz answers, and project notes are saved in this browser."
          : "You can keep learning in this tab, but this browser isn’t saving your progress."}</Text>
      </VStack>
      <Text as="p" color="secondary">{canSave
        ? "Return on the same device and browser to pick up where you left off. Clearing this site’s browser data also clears your progress."
        : "Allow storage for this site to keep your progress between visits."}</Text>
      <Button href="/course" label="Back to the course" variant="primary" />
    </VStack>
  );
}
