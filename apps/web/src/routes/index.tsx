import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { StatusDot, type StatusDotVariant } from "@astryxdesign/core/StatusDot";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { trpc } from "@/utils/trpc";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const healthCheck = useQuery(trpc.healthCheck.queryOptions());
  const status: { label: string; variant: StatusDotVariant } = healthCheck.isLoading
    ? { label: "Checking…", variant: "neutral" }
    : healthCheck.data
      ? { label: "Connected", variant: "success" }
      : { label: "Disconnected", variant: "error" };

  return (
    <VStack as="main" gap={6} className="mx-auto w-full max-w-3xl px-4 py-8">
      <Heading level={1}>Data Visualization Course for Product Designers</Heading>
      <Card>
        <VStack gap={2}>
          <Heading level={2}>API Status</Heading>
          <HStack role="status" gap={2} align="center">
            <StatusDot aria-hidden="true" label={status.label} variant={status.variant} />
            <Text color="secondary">{status.label}</Text>
          </HStack>
        </VStack>
      </Card>
    </VStack>
  );
}
