import { Button } from "@astryxdesign/core/Button";
import { Dialog, DialogHeader } from "@astryxdesign/core/Dialog";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { ProgressBar } from "@astryxdesign/core/ProgressBar";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Download, Upload } from "reicon-react";
import { useRef, useState } from "react";

import { useCurrentCourse } from "@/course/course-context";
import { dataVisualizationId } from "@/course/catalog";
import { AppearanceTabs } from "@/components/mode-toggle";
import { formatDay, weeklyDays } from "@/course/learning-state";
import { createProgressBackup, readProgressBackup, useProgress, type Progress } from "@/course/progress";

export const Route = createFileRoute("/preferences")({
  head: () => ({ meta: [{ title: "Preferences · Graphnotes" }] }),
  component: PreferencesPage,
});

export function PreferencesPage() {
  const course = useCurrentCourse();
  const milestoneDefinitions = course.content.milestones;
  const { progress, today, canSave, setWeeklyGoal, importProgress } = useProgress();
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState<Progress | null>(null);
  const upload = useRef<HTMLInputElement>(null);
  const days = weeklyDays(progress.learning, today);
  const goal = progress.learning.weeklyGoal;
  const earned = milestoneDefinitions.filter(({ id }) => progress.learning.milestones[id]);
  const next = milestoneDefinitions.find(({ id }) => !progress.learning.milestones[id]);

  function exportBackup() {
    const content = JSON.stringify(createProgressBackup(progress, course), null, 2);
    const url = URL.createObjectURL(new Blob([content], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `graphnotes-${course.id}-progress-${today}.json`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <VStack className="course-wrap course-simple-page preferences-page" gap={5}>
      <VStack as="header" gap={1.5}>
        <Heading level={1} className="course-display course-page-title">Preferences</Heading>
        <Text as="p" color="secondary">Set a pace that works for you. Everything stays in this browser.</Text>
      </VStack>
      {!canSave && <Text as="p" role="status">This browser isn’t saving changes. You can keep learning in this tab and export a backup.</Text>}
      <VStack as="section" className="learning-setting" gap={3} aria-labelledby="weekly-goal-title">
        <Heading level={2} id="weekly-goal-title">Your weekly goal</Heading>
        <Text as="p" color="secondary">Choose how many days you’d like to practice each week. Any days count, Monday through Sunday.</Text>
        <VStack gap={2} className="learning-goal-field">
          <Text weight="medium" id="goal-label">Practice days each week</Text>
          <SegmentedControl label="Practice days each week" layout="fill" value={String(goal)} onChange={(value) => {
            const goal = Number(value);
            setWeeklyGoal(goal);

          }}>
            <SegmentedControlItem label="Off" value="0" />
            {[2, 3, 4, 5].map((value) => <SegmentedControlItem key={value} label={String(value)} value={String(value)} />)}
          </SegmentedControl>
        </VStack>
        <Text as="p" type="supporting" color="secondary">{course.content.interaction ? "Finish a lesson or quiz, review three different cards, or work on your capstone." : course.content.hasProjects ? "Finish a lesson, challenge or quiz, review three different cards, or work on your project." : "Finish a lesson or quiz, or review three different cards."} Each day counts once. Missed days don’t erase your progress.</Text>
        {goal > 0 && <VStack gap={1} className="learning-goal-progress">
          <ProgressBar label="Practice days this week" value={Math.min(days, goal)} max={goal} hasValueLabel formatValueLabel={() => days >= goal ? "Goal reached" : `${days} of ${goal}`} />
          <Text as="p" type="supporting" color="secondary">{days} {days === 1 ? "practice day" : "practice days"} this week.</Text>
        </VStack>}
      </VStack>
      <VStack as="section" className="learning-setting" gap={3} aria-labelledby="appearance-title">
        <Heading level={2} id="appearance-title">Appearance</Heading>
        <AppearanceTabs />
      </VStack>
      <VStack as="section" id="milestones" className="learning-setting" gap={3} aria-labelledby="milestones-title">
        <Heading level={2} id="milestones-title">Meaningful milestones</Heading>
        <Text as="p" color="secondary">A record of decisions you’ve practiced and work you’ve completed.</Text>
        {earned.length > 0 && <VStack as="ul" gap={0} className="learning-list">
          {earned.map(({ id, title, description }) => <HStack as="li" key={id} gap={3} align="start" className="learning-milestone-row">
            <Check size={18} aria-hidden="true" />
            <VStack gap={1}><Text weight="semibold">{title}</Text><Text as="p" type="supporting" color="secondary">{description}</Text></VStack>
            <Text type="supporting" color="secondary">{formatDay(progress.learning.milestones[id]!)}</Text>
          </HStack>)}
        </VStack>}
        {next && <VStack gap={1}>
          <Text as="p" weight="medium">{earned.length ? "Next milestone" : "Your first milestone"} · {next.title}</Text>
          <Text as="p" type="supporting" color="secondary">{next.description}</Text>
          {!earned.length && (course.id === dataVisualizationId && next.id === "first-decision" ? <Link to="/challenges" className="practice-link">Try a design challenge</Link> : <Link to="/courses/$courseId/$page" params={{ courseId: course.id, page: "review" }} className="practice-link">Review flashcards</Link>)}
        </VStack>}
      </VStack>
      <VStack as="section" className="learning-setting" gap={3} aria-labelledby="backup-title">
        <Heading level={2} id="backup-title">Keep a copy of your progress</Heading>
        <Text as="p" color="secondary">Export a backup to keep your learning record or move it to another browser. Clearing this site’s browser data clears its saved progress.</Text>
        <HStack gap={2} wrap="wrap" className="learning-actions course-action-pair">
          <Button label="Export progress" icon={<Download size={16} aria-hidden="true" />} variant="secondary" onClick={exportBackup} />
          <Button label="Import a backup" icon={<Upload size={16} aria-hidden="true" />} variant="secondary" onClick={() => upload.current?.click()} />
        </HStack>
        <input ref={upload} type="file" accept=".json,application/json" hidden aria-label="Choose a Graphnotes backup" onChange={async (event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          setError("");
          if (!file) return;
          if (file.size > 1_000_000) { setError("This file is too large for a progress backup. Choose a Graphnotes JSON backup under 1 MB."); return; }
          try { setPending(readProgressBackup(await file.text(), course)); }
          catch { setError("This backup could not be read. Choose a Graphnotes progress JSON file exported from Preferences."); }
        }} />
        {error && <Text as="p" role="alert">{error}</Text>}
        {notice && <Text as="p" role="status" type="supporting">{notice}</Text>}
      </VStack>
      {pending && <Dialog isOpen onOpenChange={(open) => { if (!open) setPending(null); }}>
        <VStack gap={4}>
          <DialogHeader title="Replace this browser’s progress?" hasDivider={false} />
          <Text as="p">This backup contains {pending.completed.length} completed lessons{course.content.interaction ? " and its saved predictions and capstone work" : ` and ${Object.keys(pending.learning.challenges).length} practiced challenges`}. Importing replaces the progress and project notes currently saved here.</Text>
          <Text as="p" type="supporting" color="secondary">Export your current progress first if you’d like to keep both copies. Appearance stays as it is.</Text>
          <HStack gap={2} wrap="wrap" justify="end" className="learning-actions course-action-pair">
            <Button label="Keep current progress" variant="secondary" onClick={() => setPending(null)} />
            <Button label="Import this backup" variant="primary" onClick={() => { importProgress(pending); setPending(null); setNotice("Progress imported. You can continue where the backup left off."); }} />
          </HStack>
        </VStack>
      </Dialog>}
    </VStack>
  );
}
