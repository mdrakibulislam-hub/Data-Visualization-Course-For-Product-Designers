import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { CheckboxInput } from "@astryxdesign/core/CheckboxInput";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { ProgressBar } from "@astryxdesign/core/ProgressBar";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";
import { Tab, TabList } from "@astryxdesign/core/TabList";
import { Text } from "@astryxdesign/core/Text";
import { TextArea } from "@astryxdesign/core/TextArea";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Download } from "reicon-react";
import { useRef } from "react";

import { DataGrid } from "@/course/charts";
import { PracticeHeader } from "@/components/practice-header";
import { projects } from "@/course/practice-data";
import { projectSteps, type ProjectId } from "@/course/project-steps";
import { useProgress } from "@/course/progress";

export const Route = createFileRoute("/capstone")({
  validateSearch: (search: Record<string, unknown>): { project?: ProjectId; view?: "workspace" } => ({
    project: search.project === "onboarding" ? "onboarding" : undefined,
    view: search.view === "workspace" ? "workspace" : undefined,
  }),
  head: () => ({ meta: [{ title: "Capstone project · Graphnotes" }] }),
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
  const workspaceHeading = useRef<HTMLHeadingElement>(null);
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const view = search.view ?? "brief";
  const id = search.project ?? "delivery";
  const project = projects[id];
  const { progress, canSave, saveCapstone, saveOnboardingDraft, checkProjectStep } = useProgress();
  const checked = progress.projectChecks[id];
  const draft = id === "delivery" ? progress.capstone : progress.onboardingDraft;
  const setDraft = id === "delivery" ? saveCapstone : saveOnboardingDraft;

  function setView(value: string) {
    return navigate({ search: { ...search, view: value === "workspace" ? "workspace" : undefined }, resetScroll: false });
  }

  function exportNotes() {
    const checklist = projectSteps.map((step) => `- [${checked.includes(step.id) ? "x" : " "}] ${step.label}`).join("\n");
    downloadFile(`# ${project.title}\n\n${draft}\n\n## Checklist\n\n${checklist}\n`, `${id}-capstone-notes.md`, "text/markdown;charset=utf-8");
  }

  return (
    <VStack className="course-wrap course-simple-page capstone-page" gap={5}>
      <PracticeHeader title="Capstone project" description="Bring your chart decisions together in a design brief." hasDivider={false}>
      <SegmentedControl className="practice-case-picker" label="Project case" value={id} onChange={(value) => void navigate({ search: { ...search, project: value === "onboarding" ? "onboarding" : undefined }, resetScroll: false })}>
        <SegmentedControlItem value="delivery" label="Delivery" />
        <SegmentedControlItem value="onboarding" label="Onboarding" />
      </SegmentedControl>
      </PracticeHeader>
      <TabList role="tablist" aria-label="Project workspace" value={view} onChange={(value) => { void setView(value); }} hasDivider>
        <Tab label="Brief & data" value="brief" panelId="project-brief" />
        <Tab label="Your workspace" value="workspace" panelId="project-workspace" />
      </TabList>
      <VStack key={id} gap={5}>
        {view === "brief" ? (
          <VStack id="project-brief" role="tabpanel" className="course-motion-enter" aria-label="Brief and data" gap={5}>
            <HStack as="section" gap={6} align="start" className="capstone-brief-layout">
              <VStack gap={3} className="capstone-brief">
                <Heading level={2} className="capstone-brief-title">{project.title}</Heading>
                <Text as="p" color="secondary">{project.brief}</Text>
              </VStack>
              <VStack as="aside" gap={3} className="capstone-deliverable">
                <Text as="p" weight="semibold">Your deliverable</Text>
                <Text as="p" color="secondary">A dashboard sketch, a detail view, and the reasoning behind your decisions.</Text>
                <Text as="p" type="supporting" color="secondary">Sketch in your design tool. Keep your decisions and handoff notes in the workspace.</Text>
              </VStack>
            </HStack>
            <HStack gap={3} align="center" wrap="wrap" className="capstone-brief-actions course-action-pair">
              <Button label={draft || checked.length ? "Continue designing" : "Open workspace"} variant="primary" endContent={<ArrowRight size={16} aria-hidden="true" />} onClick={() => {
                void setView("workspace").then(() => requestAnimationFrame(() => workspaceHeading.current?.focus()));
              }} />
              <Button label="Explore in Chart Lab" href={`/lab?experiment=${project.lab}`} variant="secondary" />
            </HStack>
            <VStack as="section" data-scroll-reveal gap={0} aria-labelledby="project-data-title" className="capstone-data">
              <HStack justify="between" align="center" wrap="wrap" gap={2} paddingInline={5} paddingBlock={4} className="capstone-data-header">
                <Heading level={2} id="project-data-title">Practice data</Heading>
                <Button label="Download CSV" variant="ghost" size="sm" icon={<Download size={16} aria-hidden="true" />} onClick={() => downloadFile(project.csv, project.filename, "text/csv;charset=utf-8")} />
              </HStack>
              <VStack className="practice-data-scroll" paddingInline={5} gap={0} tabIndex={0} role="region" aria-label={`${project.label} data table`}>
                <DataGrid data={{ kind: "table", columns: project.columns, rows: project.rows }} title={project.label} />
              </VStack>
              <VStack gap={0} padding={5} className="capstone-data-note"><Text as="p" color="secondary" type="supporting">{project.dataNote}</Text></VStack>
            </VStack>
          </VStack>
        ) : (
          <VStack id="project-workspace" role="tabpanel" className="course-motion-enter" aria-label="Your workspace" gap={4}>
            <HStack justify="between" align="center" wrap="wrap" gap={3}>
              <Heading level={2} ref={workspaceHeading} tabIndex={-1}>{project.title}</Heading>
              <VStack gap={0} className="capstone-progress">
                <ProgressBar label="Project checklist" value={checked.length} max={projectSteps.length} hasValueLabel formatValueLabel={(value, max) => `${value} of ${max}`} />
              </VStack>
            </HStack>
            <HStack className="capstone-workspace" align="start" gap={0}>
              <Card padding={0} className="capstone-notes">
                <VStack as="section" gap={0} aria-label="Design notes">
                  <VStack padding={5} gap={4}>
                    <TextArea label="Your design rationale" description="Explain what the reader needs, what you’ll show, and why." value={draft} onChange={setDraft} rows={13} maxLength={2500} htmlMaxLength={2500} placeholder="Who is this for? What will they see first? What can they do next?" />
                  </VStack>
                  <HStack gap={3} paddingInline={5} paddingBlock={4} wrap="wrap" align="center" justify="between" className="capstone-notes-footer">
                    <Text type="supporting" color="secondary" role={canSave ? undefined : "status"}>{canSave ? "Saved in this browser" : "Available in this tab only"}</Text>
                    <Button label="Export notes" variant="secondary" icon={<Download size={16} aria-hidden="true" />} onClick={exportNotes} />
                  </HStack>
                </VStack>
              </Card>
              <VStack as="section" data-scroll-reveal aria-labelledby="project-checklist-title" gap={3}>
                <Heading level={3} id="project-checklist-title">Before you finish</Heading>
                <VStack gap={0}>
                {projectSteps.map(({ id: step, label, description }) => (
                  <VStack key={step} className="capstone-step" data-complete={checked.includes(step) || undefined} gap={0}>
                    <CheckboxInput label={label} description={description} value={checked.includes(step)} onChange={(value) => checkProjectStep(id, step, value)} />
                  </VStack>
                ))}
                </VStack>
              </VStack>
            </HStack>
          </VStack>
        )}
      </VStack>
    </VStack>
  );
}
