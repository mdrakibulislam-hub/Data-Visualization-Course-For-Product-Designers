import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { Link } from "@astryxdesign/core/Link";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <VStack className="course-wrap course-simple-page course-account" gap={4}>
      <VStack as="header" gap={2}>
        <Heading level={1} className="course-display course-page-title">{showSignIn ? "Sign in" : "Create an account"}</Heading>
        <Link href="/" weight="semibold">Continue to the course without an account</Link>
      </VStack>
      <Card padding={4}>
        {showSignIn ? (
          <SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
        ) : (
          <SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
        )}
      </Card>
    </VStack>
  );
}
