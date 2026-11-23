import { Button } from "@astryxdesign/core/Button";
import { CheckboxInput } from "@astryxdesign/core/CheckboxInput";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { ProgressBar } from "@astryxdesign/core/ProgressBar";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";
import { Tab, TabList } from "@astryxdesign/core/TabList";
import { Text } from "@astryxdesign/core/Text";
import { TextArea } from "@astryxdesign/core/TextArea";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "reicon-react";
import { useRef } from "react";

import { DataGrid } from "@/course/charts";
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
      <VStack as="header" gap={1.5}>
        <Heading level={1} className="course-display course-page-title">Capstone project</Heading>
        <Text as="p" color="secondary">Use a real design brief to put your chart decisions into practice.</Text>
      </VStack>
      <SegmentedControl className="practice-case-picker" label="Project case" value={id} onChange={(value) => void navigate({ search: { project: value === "onboarding" ? "onboarding" : undefined }, resetScroll: false })}>
        <SegmentedControlItem value="delivery" label={projects.delivery.label} />
        <SegmentedControlItem value="onboarding" label={projects.onboarding.label} />
      </SegmentedControl>
      <TabList role="tablist" aria-label="Project workspace" value={view} onChange={(value) => { void setView(value); }} hasDivider>
        <Tab label="Brief & data" value="brief" panelId="project-brief" />
        <Tab label="Your workspace" value="workspace" panelId="project-workspace" />
      </TabList>
      <VStack key={id} gap={5}>
        {view === "brief" ? (
          <VStack id="project-brief" role="tabpanel" className="course-motion-enter" aria-label="Brief and data" gap={5}>
            <VStack as="section" data-scroll-reveal gap={2} className="capstone-brief">
              <Heading level={2}>{project.title}</Heading>
              <Text as="p">{project.brief}</Text>
            </VStack>
            <VStack as="section" data-scroll-reveal gap={3} aria-labelledby="project-data-title">
              <HStack justify="between" align="center" wrap="wrap" gap={2}>
                <Heading level={2} id="project-data-title">Practice data</Heading>
                <Button label="Download CSV" variant="ghost" size="sm" icon={<Download size={16} aria-hidden="true" />} onClick={() => downloadFile(project.csv, project.filename, "text/csv;charset=utf-8")} />
              </HStack>
              <VStack className="practice-data-scroll" gap={0} tabIndex={0} role="region" aria-label={`${project.label} data table`}>
                <DataGrid data={{ kind: "table", columns: project.columns, rows: project.rows }} title={project.label} />
              </VStack>
              <Text as="p" color="secondary" type="supporting">{project.dataNote}</Text>
              <Link className="practice-link" to="/lab" search={{ experiment: project.lab }}>Explore this data in the lab</Link>
            </VStack>
            <HStack gap={2}>
              <Button label="Open your workspace" variant="primary" onClick={() => {
                void setView("workspace").then(() => requestAnimationFrame(() => workspaceHeading.current?.focus()));
              }} />
            </HStack>
          </VStack>
        ) : (
          <VStack id="project-workspace" role="tabpanel" className="course-motion-enter" aria-label="Your workspace" gap={4}>
            <HStack justify="between" align="center" wrap="wrap" gap={3}>
              <Heading level={2} ref={workspaceHeading} tabIndex={-1}>Your design</Heading>
              <VStack gap={0} className="capstone-progress">
                <ProgressBar label="Project steps complete" value={checked.length} max={projectSteps.length} hasValueLabel formatValueLabel={(value, max) => `${value} of ${max}`} />
              </VStack>
            </HStack>
            <HStack className="capstone-workspace" align="start" gap={0}>
              <VStack as="section" data-scroll-reveal aria-label="Project checklist" gap={0}>
                {projectSteps.map(({ id: step, label, description }) => (
                  <VStack key={step} className="capstone-step" gap={0}>
                    <CheckboxInput label={label} description={description} value={checked.includes(step)} onChange={(value) => checkProjectStep(id, step, value)} />
                  </VStack>
                ))}
              </VStack>
              <VStack as="section" data-scroll-reveal gap={3} aria-label="Design notes" className="capstone-notes">
                <TextArea label="Your design rationale" value={draft} onChange={setDraft} rows={10} maxLength={2500} htmlMaxLength={2500} placeholder="Who is this for? What will they see first? What can they do next?" />
                <HStack gap={2} wrap="wrap" align="center" justify="between">
                  <Text type="supporting" color="secondary">{canSave ? "Saved in this browser" : "Available in this tab only"}</Text>
                  <Button label="Export notes" variant="secondary" icon={<Download size={16} aria-hidden="true" />} onClick={exportNotes} />
                </HStack>
              </VStack>
            </HStack>
          </VStack>
        )}
      </VStack>
    </VStack>
  );
}
