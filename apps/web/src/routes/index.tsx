import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Dialog, DialogHeader } from "@astryxdesign/core/Dialog";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { IconButton } from "@astryxdesign/core/IconButton";
import { Link as AstryxLink } from "@astryxdesign/core/Link";
import { Popover } from "@astryxdesign/core/Popover";
import { ProgressBar } from "@astryxdesign/core/ProgressBar";
import { Selector } from "@astryxdesign/core/Selector";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Envelope, Moon, Plus, Sun } from "reicon-react";
import { useState } from "react";

import { AppearanceTabs } from "@/components/mode-toggle";
import { HciCountdown } from "@/components/course-countdown";
import { useAppearance } from "@/components/theme-provider";
import { lessons, totalMinutes } from "@/course/curriculum";
import { OverviewChart } from "@/course/overview-chart";
import { getResumeLesson, useProgress } from "@/course/progress";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Graphnotes · Courses for product designers" }] }),
  component: CourseLibrary,
});

const courseTopics = [
  "UX Research",
  "Interaction Design",
  "Human–Computer Interaction (HCI)",
  "Design Systems",
  "Accessibility & Inclusive Design",
  "Information Architecture",
  "Usability Testing",
  "UX Writing",
  "Visual & UI Design",
  "Product Strategy",
];

function CourseLibrary() {
  const [isRequestOpen, setRequestOpen] = useState(false);
  const [topic, setTopic] = useState<string | null>(null);
  const { progress } = useProgress();
  const hasStarted = progress.lastLesson !== null || progress.completed.length > 0;
  const resume = getResumeLesson(progress);
  const { appearance } = useAppearance();
  const AppearanceIcon = appearance === "dark" ? Moon : appearance === "sepia" ? BookOpen : Sun;
  const mailto = topic ? `mailto:rakibulislamborkan@gmail.com?subject=${encodeURIComponent(`Graphnotes course request: ${topic}`)}&body=${encodeURIComponent(`Hi Rakib,\n\nI’d like to learn ${topic} on Graphnotes.\n\nThanks!`)}` : undefined;

  return (
    <>
      <a className="library-skip-link" href="#courses">Skip to courses</a>
      <HStack as="header" className="library-topbar" justify="end" gap={2}>
        <Popover label="Appearance" placement="below" alignment="end" content={<AppearanceTabs />} isModal={false} padding={1.5}>
          <IconButton label="Appearance" tooltip="Appearance" variant="ghost" icon={<AppearanceIcon size={18} aria-hidden="true" />} />
        </Popover>
      </HStack>
      <VStack as="main" className="library-main" gap={8}>
        <VStack as="header" gap={4} align="center" className="library-intro">
          <Heading level={1}>
            <img src={`${import.meta.env.BASE_URL}graphnotes-logo.svg`} width={300} height={60} alt="Graphnotes" className="library-wordmark" />
          </Heading>
        </VStack>
        <VStack as="section" id="courses" aria-label="Courses" gap={4}>
          <HStack justify="end" align="center" gap={3}>
            <Button label="Request a course" variant="ghost" icon={<Plus size={18} aria-hidden="true" />} onClick={() => setRequestOpen(true)} />
          </HStack>
          <Grid columns={{ minWidth: 320, max: 2 }} gap={6}>
            <Card padding={0} className="library-course-tile">
              <VStack as="article" gap={0} aria-labelledby="data-viz-course-title">
                <OverviewChart isPreview />
                <VStack gap={1.5} padding={5} className="library-course-info">
                  <Heading level={2} id="data-viz-course-title"><Link to="/course" className="library-course-link">Data visualization</Link></Heading>
                  <HStack justify="between" align="center" gap={2} className="library-course-meta">
                    <Text as="p" color="secondary" type="supporting">{lessons.length} lessons · {Math.floor(totalMinutes / 60)} hr {totalMinutes % 60} min</Text>
                    {hasStarted && <Link {...(resume ? { to: "/lesson/$lessonId" as const, params: { lessonId: resume.id } } : { to: "/review" as const })} className="library-course-open">{resume ? "Continue" : "Review"}<ArrowRight size={16} aria-hidden="true" /></Link>}
                  </HStack>
                  {hasStarted && <ProgressBar label="Data visualization course progress" value={progress.completed.length} max={lessons.length} isLabelHidden />}
                </VStack>
              </VStack>
            </Card>
            <Card padding={0} className="library-course-tile">
              <VStack as="article" gap={0} aria-labelledby="hci-course-title">
                <VStack className="library-coming-preview" gap={3} align="center" justify="center">
                  <HciCountdown />
                </VStack>
                <VStack gap={1.5} padding={5} className="library-course-info">
                  <Heading level={2} id="hci-course-title">Human–computer interaction</Heading>
                  <HStack align="center" gap={0} className="library-course-meta">
                    <Text as="p" color="secondary" type="supporting">For product designers</Text>
                  </HStack>
                </VStack>
              </VStack>
            </Card>
          </Grid>
        </VStack>
        <HStack as="footer" gap={1.5} justify="center" wrap="wrap" className="library-credit">
          <Text type="supporting" color="secondary">Created by</Text>
          <AstryxLink href="https://rakib.framer.wiki" type="supporting" color="secondary" hasUnderline>Md Rakibul Islam</AstryxLink>
        </HStack>
      </VStack>
      <Dialog isOpen={isRequestOpen} onOpenChange={setRequestOpen} width="28rem" purpose="form" padding={5}>
        <VStack gap={5}>
          <DialogHeader title="Which course should come next?" subtitle="Choose a topic you’d like to learn." onOpenChange={setRequestOpen} hasDivider={false} />
          <Selector label="Course topic" options={courseTopics} value={topic ?? undefined} onChange={setTopic} placeholder="Choose a topic" width="100%" isRequired />
          <Text as="p" color="secondary" type="supporting">Continue to your email app to send your request to Rakib.</Text>
          <HStack gap={2} className="course-action-pair" justify="end">
            <Button label="Cancel" variant="secondary" onClick={() => setRequestOpen(false)} />
            <Button label="Continue to email" variant="primary" icon={<Envelope size={16} aria-hidden="true" />} href={mailto} isDisabled={!topic} />
          </HStack>
        </VStack>
      </Dialog>
    </>
  );
}
