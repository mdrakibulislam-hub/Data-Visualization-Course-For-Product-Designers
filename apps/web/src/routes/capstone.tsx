import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { CheckboxInput } from "@astryxdesign/core/CheckboxInput";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { ProgressBar } from "@astryxdesign/core/ProgressBar";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";
import { Text } from "@astryxdesign/core/Text";
import { TextArea } from "@astryxdesign/core/TextArea";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "reicon-react";

import { DataGrid } from "@/course/charts";
import { projects } from "@/course/practice-data";
import { projectSteps, type ProjectId } from "@/course/project-steps";
import { useProgress } from "@/course/progress";

export const Route = createFileRoute("/capstone")({
  validateSearch: (search: Record<string, unknown>): { project?: ProjectId } => ({
    project: search.project === "onboarding" ? "onboarding" : undefined,
  }),
  head: () => ({ meta: [{ title: "Capstone project · Data Viz Field Guide" }] }),
  component: CapstonePage,
});

function downloadFile(content: string, filename: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function CapstonePage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const id = search.project ?? "delivery";
  const project = projects[id];
  const { progress, canSave, saveCapstone, saveOnboardingDraft, checkProjectStep } = useProgress();
  const checked = progress.projectChecks[id];
  const draft = id === "delivery" ? progress.capstone : progress.onboardingDraft;
  const setDraft = id === "delivery" ? saveCapstone : saveOnboardingDraft;

  function exportNotes() {
    const checklist = projectSteps.map((step) => `- [${checked.includes(step.id) ? "x" : " "}] ${step.label}`).join("\n");
    downloadFile(`# ${project.title}\n\n${draft}\n\n## Checklist\n\n${checklist}\n`, `${id}-capstone-notes.md`, "text/markdown;charset=utf-8");
  }

  return (
    <VStack className="course-wrap course-simple-page practice-page" gap={5}>
      <VStack as="header" gap={2} className="course-motion-enter practice-header">
        <Heading level={1} className="course-display course-page-title">Capstone project</Heading>
        <p className="course-deck">Design a dashboard for a real decision. Choose a case, use its data, and test your design with someone.</p>
      </VStack>
      <SegmentedControl className="practice-case-picker" label="Project case" value={id} onChange={(value) => void navigate({ search: { project: value === "onboarding" ? "onboarding" : undefined }, resetScroll: false })}>
        <SegmentedControlItem value="delivery" label={projects.delivery.label} />
        <SegmentedControlItem value="onboarding" label={projects.onboarding.label} />
      </SegmentedControl>
      <VStack key={id} gap={5} className="course-motion-enter">
        <VStack as="section" gap={2}>
          <Heading level={2}>{project.title}</Heading>
          <Text as="p">{project.brief}</Text>
        </VStack>
        <Card padding={4}>
          <VStack as="section" gap={3}>
            <Heading level={2}>Practice data</Heading>
            <Text as="p" color="secondary">{project.dataNote}</Text>
            <VStack className="practice-data-scroll" gap={0} tabIndex={0} role="region" aria-label={`${project.label} data table`}>
              <DataGrid data={{ kind: "table", columns: project.columns, rows: project.rows }} title={project.label} />
            </VStack>
            <HStack gap={2} wrap="wrap" align="center">
              <Button label="Download CSV" variant="secondary" icon={<Download size={16} />} onClick={() => downloadFile(project.csv, project.filename, "text/csv;charset=utf-8")} />
              <Link className="practice-link" to="/lab" search={{ experiment: project.lab }}>Explore this data in the lab</Link>
            </HStack>
          </VStack>
        </Card>
        <Card padding={4}>
          <VStack as="section" gap={4}>
            <Heading level={2}>Project checklist</Heading>
            <ProgressBar label="Project steps complete" value={checked.length} max={projectSteps.length} hasValueLabel formatValueLabel={(value, max) => `${value} of ${max}`} />
            <VStack gap={3}>
              {projectSteps.map(({ id: step, label, description }) => (
                <CheckboxInput key={step} label={label} description={description} value={checked.includes(step)} onChange={(value) => checkProjectStep(id, step, value)} />
              ))}
            </VStack>
            <TextArea label="Your design rationale" value={draft} onChange={setDraft} rows={6} maxLength={2500} htmlMaxLength={2500} placeholder="What will the lead see first, and why?" />
            <HStack gap={2} wrap="wrap" align="center">
              <Button label="Export notes" variant="secondary" icon={<Download size={16} />} onClick={exportNotes} />
              <Text type="supporting" color="secondary">{canSave ? "Saved in this browser" : "Available in this tab only"}</Text>
            </HStack>
          </VStack>
        </Card>
      </VStack>
    </VStack>
  );
}
