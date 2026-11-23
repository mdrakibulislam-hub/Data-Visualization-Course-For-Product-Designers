import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import UserMenu from "@/components/user-menu";
import { trpc } from "@/utils/trpc";

export const Route = createFileRoute("/_auth/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { session } = Route.useRouteContext();

  const privateData = useQuery(trpc.privateData.queryOptions());

  return (
    <VStack as="section" className="course-wrap course-simple-page" gap={3}>
      <HStack justify="between" align="center" wrap="wrap" gap={2}>
        <Heading level={1} className="course-display course-page-title">Dashboard</Heading>
        <UserMenu />
      </HStack>
      <Text as="p">Welcome {session.data?.user.name}</Text>
      {privateData.data?.message && <Text as="p" color="secondary">{privateData.data.message}</Text>}
      <Link href="/" weight="semibold">Open the course</Link>
    </VStack>
  );
}
