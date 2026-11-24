import { Button } from "@astryxdesign/core/Button";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { IconButton } from "@astryxdesign/core/IconButton";
import { Popover } from "@astryxdesign/core/Popover";
import { Selector } from "@astryxdesign/core/Selector";
import { Text } from "@astryxdesign/core/Text";
import { TextInput } from "@astryxdesign/core/TextInput";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Moon, Search } from "reicon-react";
import { useState } from "react";

import { AppearanceTabs } from "@/components/mode-toggle";
import { CourseCard } from "@/components/course-card";
import { CourseRequestDialog } from "@/components/course-request-dialog";
import { LibraryCreator } from "@/components/library-creator";
import { LibraryIcon, libraryAsset } from "@/components/library-assets";
import { useAppearance } from "@/components/theme-provider";
import { courses, requestableTopics, type Course } from "@/course/catalog";
import { browseCourses, catalogTopics, nearestReleaseId } from "@/course/catalog-browsing";
import { useLibraryEntrance } from "@/course/use-library-entrance";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Graphnotes · Courses for product designers" }] }),
  component: CourseLibrary,
});

export function CourseLibrary({ catalog = courses }: { catalog?: readonly Course[] }) {
  const [isRequestOpen, setRequestOpen] = useState(false);
  const mainRef = useLibraryEntrance();
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const { appearance } = useAppearance();
  const AppearanceIcon = appearance === "dark" ? Moon : BookOpen;
  const hasSearch = catalog.length >= 6;
  const topics = catalogTopics(catalog);
  const visible = browseCourses(catalog, query, topic);
  const nextRelease = nearestReleaseId(catalog);

  return (
    <>
      <a className="library-skip-link" href="#courses">Skip to courses</a>
      <HStack as="header" className="library-topbar" gap={0}>
        <HStack className="library-header-inner" justify="between" align="center" gap={3}>
          <Heading level={1} className="library-brand-heading">
            <Link to="/" aria-label="Graphnotes course library" className="library-brand-link"><img src={libraryAsset("graphnotes.svg")} width={168} height={33.1875} alt="Graphnotes" className="library-wordmark" /></Link>
          </Heading>
          <HStack gap={2} align="center">
            <Button label="Request a course" variant="ghost" icon={<LibraryIcon name="plus" isInk />} onClick={() => setRequestOpen(true)} className="library-request-full" />
            <IconButton label="Request a course" tooltip="Request a course" variant="ghost" icon={<LibraryIcon name="plus" isInk />} onClick={() => setRequestOpen(true)} className="library-request-compact" />
            <Popover label="Appearance" placement="below" alignment="end" content={<AppearanceTabs />} isModal={false} padding={1.5}>
              <IconButton label="Appearance" tooltip="Appearance" variant="ghost" icon={appearance === "light" ? <LibraryIcon name="appearance" isInk /> : <AppearanceIcon size={18} aria-hidden="true" />} />
            </Popover>
          </HStack>
        </HStack>
      </HStack>
      <VStack as="main" className="library-main" gap={6} ref={mainRef}>
        {hasSearch && <HStack gap={3} wrap="wrap" align="end" className="library-filters">
          <TextInput label="Search courses" isLabelHidden type="search" value={query} onChange={setQuery} placeholder="Search courses" startIcon={<Search size={18} aria-hidden="true" />} hasClear width="100%" containerClassName="library-search" />
          {topics.length > 1 && <Selector label="Topic" isLabelHidden options={[{ value: "all", label: "All topics" }, ...topics]} value={topic} onChange={(value) => setTopic(value ?? "all")} width="13rem" />}
        </HStack>}
        <VStack as="section" id="courses" aria-label="Courses" gap={4}>
          {(query || topic !== "all") && <Text as="p" type="supporting" color="secondary" role="status">{visible.length} {visible.length === 1 ? "course" : "courses"}</Text>}
          {visible.length ? <Grid columns={{ minWidth: 280, max: catalog.length > 2 ? 3 : 2 }} gap={6}>
            {visible.map((course) => <CourseCard key={course.id} course={course} hasCountdown={course.id === nextRelease} />)}
          </Grid> : <VStack align="center" gap={3} paddingBlock={10}>
            <Heading level={2}>No matching courses</Heading>
            <Text as="p" color="secondary">Try another topic or a shorter search.</Text>
            <Button label="Clear filters" variant="secondary" onClick={() => { setQuery(""); setTopic("all"); }} />
          </VStack>}
        </VStack>
        <LibraryCreator />
      </VStack>
      <CourseRequestDialog isOpen={isRequestOpen} onOpenChange={setRequestOpen} topics={requestableTopics(catalog)} />
    </>
  );
}
