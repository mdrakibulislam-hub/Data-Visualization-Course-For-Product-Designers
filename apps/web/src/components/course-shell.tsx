import { AppShell, useAppShellMobile } from "@astryxdesign/core/AppShell";
import { Card } from "@astryxdesign/core/Card";
import { HStack } from "@astryxdesign/core/HStack";
import { LinkProvider } from "@astryxdesign/core/Link";
import { MobileNav } from "@astryxdesign/core/MobileNav";
import { ProgressBar } from "@astryxdesign/core/ProgressBar";
import { SideNav, SideNavHeading, SideNavItem, SideNavSection } from "@astryxdesign/core/SideNav";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, ChartNoAxesColumnIncreasing, Check, CircleHelp, ClipboardList, Database, Files, Layers, LayoutDashboard, LibraryBig, LineChart } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { lessons, modules } from "@/course/curriculum";
import { useProgress } from "@/course/progress";

import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

const moduleIcons = [BookOpen, Database, LayoutDashboard, Layers];

function CourseLink({ href, onClick, ...props }: ComponentPropsWithRef<"a">) {
  const { isMobileNavOpen, closeMobileNav } = useAppShellMobile();
  if (href?.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link {...props} to={href} onClick={(event) => {
        onClick?.(event);
        if (isMobileNavOpen && !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
          closeMobileNav();
        }
      }} />
    );
  }
  return <a {...props} href={href} onClick={onClick} />;
}

export function CourseShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname.replace(/\/$/, "") || "/" });
  const currentLesson = lessons.find(({ id }) => path === `/lesson/${id}`);
  const activeModule = currentLesson?.moduleTitle ?? modules[0].title;
  const { progress, canSave } = useProgress();

  const sections = (
    <>
      <SideNavSection title="Course">
        <SideNavItem label="Overview" href="/" icon={LibraryBig} isSelected={path === "/"} />
        <SideNavItem label="Sources" href="/sources" icon={Files} isSelected={path === "/sources"} />
      </SideNavSection>
      <SideNavSection title="Lessons">
        {modules.map((module, index) => (
          <SideNavItem
            key={`${module.title}:${module.title === activeModule}`}
            label={module.title}
            icon={moduleIcons[index]}
            collapsible={{ defaultIsCollapsed: module.title !== activeModule }}
          >
            {module.lessons.map(({ id, title }) => (
              <SideNavItem
                key={id}
                label={title}
                href={`/lesson/${id}`}
                size="sm"
                isSelected={currentLesson?.id === id}
                endContent={progress.completed.includes(id) ? <Check size={14} aria-label="Completed" role="img" /> : undefined}
              />
            ))}
          </SideNavItem>
        ))}
      </SideNavSection>
      <SideNavSection title="Practice">
        <SideNavItem label="Chart lab" href="/lab" icon={LineChart} isSelected={path === "/lab"} />
        <SideNavItem label="Flashcards" href="/review" icon={Layers} isSelected={path === "/review"} />
        <SideNavItem label="Quizzes" href="/quizzes" icon={CircleHelp} isSelected={path === "/quizzes"} />
        <SideNavItem label="Capstone project" href="/capstone" icon={ClipboardList} isSelected={path === "/capstone"} />
      </SideNavSection>
    </>
  );

  return (
    <LinkProvider component={CourseLink}>
      <AppShell
        className="course-shell"
        variant="section"
        height="auto"
        mobileNav={{
          breakpoint: "lg",
          content: (
            <MobileNav side="start" header="Data Viz Field Guide" label="Course navigation">
              <VStack gap={2} padding={2}>{sections}</VStack>
            </MobileNav>
          ),
        }}
        sideNav={
          <SideNav
            aria-label="Course navigation"
            collapsible
            header={<SideNavHeading heading="Data Viz Field Guide" headingHref="/" icon={
              <HStack as="span" align="center" justify="center" gap={0} className="course-brand-mark">
                <ChartNoAxesColumnIncreasing size={17} aria-hidden="true" />
              </HStack>
            } />}
            footer={
              <VStack gap={0} paddingInline={2} paddingBlock={2} className="course-side-progress">
                <Card variant="muted" padding={2}>
                  <VStack gap={1}>
                    <ProgressBar label="Course progress" value={progress.completed.length} max={lessons.length} hasValueLabel formatValueLabel={(value, max) => `${value} of ${max}`} />
                    <Text as="p" type="supporting" color="secondary">{canSave ? "Saved in this browser" : "Progress is available in this tab only"}</Text>
                  </VStack>
                </Card>
              </VStack>
            }
            footerIcons={<><ModeToggle />{path === "/dashboard" && <UserMenu />}</>}
          >
            {sections}
          </SideNav>
        }
      >
        <VStack className="course-frame" gap={0}>{children}</VStack>
      </AppShell>
    </LinkProvider>
  );
}
