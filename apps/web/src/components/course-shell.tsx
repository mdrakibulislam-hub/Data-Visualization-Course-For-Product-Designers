import { AppShell, useAppShellMobile } from "@astryxdesign/core/AppShell";
import { HStack } from "@astryxdesign/core/HStack";
import { IconButton } from "@astryxdesign/core/IconButton";
import { LinkProvider } from "@astryxdesign/core/Link";
import { MobileNav } from "@astryxdesign/core/MobileNav";
import { SideNav, SideNavCollapseButton, SideNavItem, SideNavSection } from "@astryxdesign/core/SideNav";
import { Tooltip } from "@astryxdesign/core/Tooltip";
import { VStack } from "@astryxdesign/core/VStack";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowsLeft, ArrowsRight, BookOpen, Check, HelpCircle, Checklist, Database, DocumentCopy, Layers, Grid, Library, ChartLine, Settings, Target } from "reicon-react";
import { useEffect, useRef, useState, type ComponentPropsWithRef, type CSSProperties, type ReactNode } from "react";

import { useCurrentCourse } from "@/course/course-context";
import { courseOverviewHref, courseLessonHref, coursePageHref, dataVisualizationId } from "@/course/catalog";
import { useProgress } from "@/course/progress";
import { useCourseMotion } from "@/course/use-course-motion";

import { ModeToggle } from "./mode-toggle";
import { CourseProgressCard } from "./course-progress-card";

const moduleIcons = [BookOpen, Database, Grid, Layers];

function BrandLink({ isCompact = false }: { isCompact?: boolean }) {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <Link to="/" aria-label="Graphnotes course library" className="course-brand-link" data-compact={isCompact || undefined}>
      {isCompact
        ? <img className="course-brand-icon" src={`${baseUrl}graphnotes-icon.svg`} width={48} height={48} alt="" />
        : <img className="course-brand-wordmark" src={`${baseUrl}graphnotes-logo.svg`} width={248} height={49} alt="" />}
    </Link>
  );
}

function SidebarHeader({ isCollapsed }: { isCollapsed: boolean }) {
  const { isMobile } = useAppShellMobile();
  const isCompact = isCollapsed && !isMobile;
  return (
    <HStack
      align="center"
      justify={isCompact ? "center" : "start"}
      gap={0}
      paddingBlockStart={isMobile ? 0 : 2}
    >
      <BrandLink isCompact={isCompact} />
    </HStack>
  );
}

function SidebarEdgeControl({ isCollapsed, onCollapsedChange }: { isCollapsed: boolean; onCollapsedChange: (collapsed: boolean) => void }) {
  const { isMobile } = useAppShellMobile();
  if (isMobile) return null;

  return (
    <HStack gap={0} align="center" justify="center" className="course-sidebar-edge-control">
      <SideNavCollapseButton collapsible={{ isCollapsed, onCollapsedChange }} size="sm">
        {isCollapsed ? <ArrowsRight size={16} aria-hidden="true" /> : <ArrowsLeft size={16} aria-hidden="true" />}
      </SideNavCollapseButton>
    </HStack>
  );
}

function SidebarProgress({ completed, canSave, isCollapsed }: { completed: number; canSave: boolean; isCollapsed: boolean }) {
  const { content: { lessons } } = useCurrentCourse();
  const details = <CourseProgressCard completed={completed} canSave={canSave} isTooltip={isCollapsed} />;

  if (isCollapsed) {
    return (
      <HStack justify="center" paddingBlock={1} gap={0}>
        <Tooltip content={details} placement="end" focusTrigger="always" touchTrigger="tap" hasHoverIndication={false}>
          <IconButton
            variant="ghost"
            label={`Course progress, ${completed} of ${lessons.length} lessons complete`}
            icon={<HStack as="span" gap={0} aria-hidden="true" className="course-progress-donut" style={{ "--course-progress": `${completed / lessons.length * 100}%` } as CSSProperties} />}
          />
        </Tooltip>
      </HStack>
    );
  }

  return <VStack gap={0} paddingInline={2} paddingBlock={2} className="course-side-progress">{details}</VStack>;
}

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
  const course = useCurrentCourse();
  const { lessons, modules } = course.content;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarCollapse = { isCollapsed, onCollapsedChange: setIsCollapsed, hasButton: false };
  const path = useRouterState({ select: (state) => state.location.pathname.replace(/\/$/, "") || "/" });
  const settledPath = useRouterState({ select: (state) => state.resolvedLocation?.pathname ?? state.location.pathname });
  const contentRef = useCourseMotion(settledPath.replace(/\/$/, "") || "/");
  const previousPath = useRef(settledPath);
  useEffect(() => {
    if (previousPath.current === settledPath) return;
    previousPath.current = settledPath;
    let destination = location.hash.slice(1);
    try { destination = decodeURIComponent(destination); } catch { /* Keep malformed fragments usable. */ }
    const target = (destination && document.getElementById(destination)) || contentRef.current?.querySelector<HTMLElement>("h1");
    if (!target) return;
    let frame = 0;
    let cancelled = false;
    const focus = () => {
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          if (!target.isConnected) return;
          target.tabIndex = -1;
          target.focus({ preventScroll: true });
        });
      });
    };
    const drawer = document.querySelector<HTMLElement>(".astryx-mobile-nav-drawer");
    // Let the drawer finish its own focus return before handing off to the new page.
    const dialog = drawer?.closest("dialog");
    const afterClose = () => {
      const animations = drawer?.getAnimations({ subtree: true }).filter((animation) =>
        animation.effect?.getComputedTiming().iterations !== Infinity) ?? [];
      void Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
        if (!cancelled) focus();
      });
    };
    if (dialog?.open) dialog.addEventListener("close", afterClose, { once: true });
    else afterClose();
    return () => {
      cancelled = true;
      dialog?.removeEventListener("close", afterClose);
      cancelAnimationFrame(frame);
    };
  }, [settledPath, contentRef]);
  const currentLesson = lessons.find(({ id }) => path === `/lesson/${id}` || path === courseLessonHref(course, id));
  const activeModule = currentLesson?.moduleTitle;
  const { progress, canSave } = useProgress();

  const sections = (
    <>
      <SideNavSection title="Course">
        <SideNavItem label="Overview" href={courseOverviewHref(course)} icon={Library} isSelected={path === "/course" || path === courseOverviewHref(course)} />
      </SideNavSection>
      <SideNavSection title="Lessons">
        {modules.map((module, index) => (
          <SideNavItem
            key={`${module.title}:${module.title === activeModule}`}
            label={module.title}
            icon={moduleIcons[index % moduleIcons.length]}
            collapsible={{ defaultIsCollapsed: module.title !== activeModule }}
          >
            <VStack gap={0} className="course-lesson-tree">
              {module.lessons.map(({ id, title }) => (
                <SideNavItem
                  key={id}
                  className="course-lesson-branch"
                  label={title}
                  href={courseLessonHref(course, id)}
                  size="sm"
                  isSelected={currentLesson?.id === id}
                  endContent={progress.completed.includes(id) ? <Check size={14} aria-label="Completed" role="img" /> : undefined}
                />
              ))}
            </VStack>
          </SideNavItem>
        ))}
      </SideNavSection>
      <SideNavSection title="Practice">
        {course.id === dataVisualizationId && <SideNavItem label="Chart lab" href="/lab" icon={ChartLine} isSelected={path === "/lab"} />}
        {course.id === dataVisualizationId && <SideNavItem label="Design challenges" href="/challenges" icon={Target} isSelected={path === "/challenges"} />}
        <SideNavItem label="Flashcards" href={coursePageHref(course, "review")} icon={Layers} isSelected={path === "/review" || path === coursePageHref(course, "review")} />
        <SideNavItem label="Quizzes" href={coursePageHref(course, "quizzes")} icon={HelpCircle} isSelected={path === "/quizzes" || path === coursePageHref(course, "quizzes")} />
        {course.id === dataVisualizationId && <SideNavItem label="Capstone project" href="/capstone" icon={Checklist} isSelected={path === "/capstone"} />}
      </SideNavSection>
      <SideNavSection title="Other">
        <SideNavItem label="Preferences" href={coursePageHref(course, "preferences")} icon={Settings} isSelected={path === "/preferences" || path === coursePageHref(course, "preferences")} />
        <SideNavItem label="Credits" href={coursePageHref(course, "sources")} icon={DocumentCopy} isSelected={path === "/sources" || path === coursePageHref(course, "sources")} />
        <SideNavItem label="More courses" href="/" icon={Grid} />
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
            <MobileNav side="start" header={<BrandLink />} label="Course navigation">
              <VStack gap={0} padding={2}>{sections}</VStack>
            </MobileNav>
          ),
        }}
        sideNav={
          <>
          <SideNav
            aria-label="Course navigation"
            collapsible={sidebarCollapse}
            header={<SidebarHeader isCollapsed={isCollapsed} />}
            footer={<SidebarProgress completed={progress.completed.length} canSave={canSave} isCollapsed={isCollapsed} />}
            footerIcons={<HStack gap={0} width="100%"><ModeToggle isCollapsed={isCollapsed} /></HStack>}
          >
            {sections}
          </SideNav>
          <SidebarEdgeControl isCollapsed={isCollapsed} onCollapsedChange={setIsCollapsed} />
          </>
        }
      >
        <VStack className="course-frame" gap={0} ref={contentRef}>{children}</VStack>
      </AppShell>
    </LinkProvider>
  );
}
