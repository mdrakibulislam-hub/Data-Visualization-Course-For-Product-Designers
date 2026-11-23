import { Button } from "@astryxdesign/core/Button";
import { HStack } from "@astryxdesign/core/HStack";
import { TextInput } from "@astryxdesign/core/TextInput";
import { VStack } from "@astryxdesign/core/VStack";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";

import { authClient } from "@/lib/auth-client";

import Loader from "./loader";

export default function SignUpForm({ onSwitchToSignIn }: { onSwitchToSignIn: () => void }) {
  const navigate = useNavigate({
    from: "/",
  });
  const { isPending } = authClient.useSession();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: value.name,
        },
        {
          onSuccess: () => {
            navigate({
              to: "/dashboard",
            });
            toast.success("Sign up successful");
          },
          onError: (error) => {
            toast.error(error.error.message || error.error.statusText);
          },
        },
      );
    },
    validators: {
      onSubmit: z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
      }),
    },
  });

  if (isPending) {
    return <Loader />;
  }

  return (
    <VStack
      as="form"
      gap={3}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <form.Field name="name">
        {(field) => {
          const message = field.state.meta.errors[0]?.message;
          return (
            <TextInput
              label="Name"
              type="text"
              htmlName={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={field.handleChange}
              autoComplete="name"
              status={message ? { type: "error", message } : undefined}
            />
          );
        }}
      </form.Field>
      <form.Field name="email">
        {(field) => {
          const message = field.state.meta.errors[0]?.message;
          return (
            <TextInput
              label="Email"
              type="email"
              htmlName={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={field.handleChange}
              autoComplete="email"
              status={message ? { type: "error", message } : undefined}
            />
          );
        }}
      </form.Field>
      <form.Field name="password">
        {(field) => {
          const message = field.state.meta.errors[0]?.message;
          return (
            <TextInput
              label="Password"
              type="password"
              htmlName={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={field.handleChange}
              autoComplete="new-password"
              status={message ? { type: "error", message } : undefined}
            />
          );
        }}
      </form.Field>
      <HStack gap={2} wrap="wrap">
        <form.Subscribe
          selector={(state) => ({ canSubmit: state.canSubmit, isSubmitting: state.isSubmitting })}
        >
          {({ canSubmit, isSubmitting }) => (
            <Button type="submit" label="Create account" variant="primary" isDisabled={!canSubmit} isLoading={isSubmitting} />
          )}
        </form.Subscribe>
        <Button label="Sign in instead" variant="ghost" onClick={onSwitchToSignIn} />
      </HStack>
    </VStack>
  );
}
