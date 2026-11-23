import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: () => <Outlet />,
  // Old dashboard bookmarks reach the account-free course without an auth request.
  beforeLoad: () => { throw redirect({ to: "/" }); },
});
