import { Button } from "@astryxdesign/core/Button";
import { CheckboxInput } from "@astryxdesign/core/CheckboxInput";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { ProgressBar } from "@astryxdesign/core/ProgressBar";
import { RadioList, RadioListItem } from "@astryxdesign/core/RadioList";
import { Table } from "@astryxdesign/core/Table";
import { Text } from "@astryxdesign/core/Text";
import { TextArea } from "@astryxdesign/core/TextArea";
import { TextInput } from "@astryxdesign/core/TextInput";
import { VStack } from "@astryxdesign/core/VStack";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { useCurrentCourse } from "../course-context";
import { useProgress } from "../progress";
import { hciCases, hciRubric } from "./data";
import { InteractionExperiment } from "./experiments";
import { hciStepIds, type HciProjectId, type HciProject } from "./state";

export function InteractionPracticePage() {
  const course = useCurrentCourse();
  const content = course.content.interaction!;
  const search = useSearch({ strict: false });
  const navigate = useNavigate();
  const selected = content.labs.find(({ id }) => id === search.experiment);
  const lesson = selected && course.content.lessons.find(({ id }) => id === selected.lessonId);
  return <VStack className="course-wrap course-simple-page" gap={5}>
    <VStack as="header" gap={2}><Heading level={1} className="course-display course-page-title">Interaction lab</Heading><Text as="p" color="secondary">Try a design decision, inspect the result, and connect it to the lesson. Experiments are fictional and untimed.</Text></VStack>
    {selected ? <>
      <HStack gap={2} wrap="wrap"><Button label="All experiments" onClick={() => void navigate({ to: "/courses/$courseId/$page", params: { courseId: course.id, page: "practice" }, search: {} })} /><Button label="Read related lesson" aria-label={`Read related lesson: ${lesson?.title ?? selected.title}`} href={`/courses/${course.id}/lessons/${selected.lessonId}`} /></HStack>
      <InteractionExperiment key={selected.id} lab={selected} />
    </> : <VStack as="ul" gap={0}>{content.labs.map((lab) => <HStack as="li" key={lab.id} className="learning-setting" gap={3} align="start" justify="between" wrap="wrap">
      <VStack gap={1}><Heading level={2}>{lab.title}</Heading><Text as="p" color="secondary">{lab.prompt}</Text></VStack>
      <Button label="Open experiment" aria-label={`Open experiment: ${lab.title}`} href={`/courses/${course.id}/practice?experiment=${lab.id}`} />
    </HStack>)}</VStack>}
  </VStack>;
}

export function HciGlossaryPage() {
  const { content: { interaction } } = useCurrentCourse();
  const [query, setQuery] = useState("");
  const entries = [...interaction!.glossary].sort((a, b) => a.term.localeCompare(b.term)).filter((entry) => `${entry.term} ${entry.meaning} ${entry.example}`.toLowerCase().includes(query.toLowerCase().trim()));
  return <VStack className="course-wrap course-simple-page" gap={5}>
    <VStack as="header" gap={2}><Heading level={1} className="course-display course-page-title">HCI in plain words</Heading><Text as="p" color="secondary">A short meaning and a concrete example. Use the words to explain a design decision.</Text></VStack>
    <TextInput label="Search terms and examples" type="search" value={query} onChange={setQuery} hasClear />
    <Text as="p" role="status" type="supporting">{entries.length} {entries.length === 1 ? "term" : "terms"}</Text>
    <VStack gap={0}>{entries.map((entry) => <VStack as="section" className="learning-setting" gap={2} key={entry.term}><Heading level={2}>{entry.term}</Heading><Text as="p">{entry.meaning}</Text><Text as="p" color="secondary">{entry.example}</Text></VStack>)}</VStack>
    {!entries.length && <VStack gap={2}><Text as="p">No matching term. Try another word or clear the search.</Text><Button label="Clear search" onClick={() => setQuery("")} /></VStack>}
  </VStack>;
}

export function exportHciProject(title: string, project: HciProject, outputs: readonly { title: string }[]) {
  const sections = hciStepIds.map((id, index) => `## ${index + 1}. ${outputs[index].title}\n\n${project.entries[id] || "No notes yet."}\n\nSelf-check: ${project.checks.includes(id) ? "marked" : "not marked"}.`).join("\n\n");
  const ratings = hciRubric.map(({ id, title }) => `- ${title}: ${project.ratings[id] === undefined ? "not rated" : `${project.ratings[id]}/3`}`).join("\n");
  return `# ${title}\n\nEvidence path: ${project.path === "case" ? "Guided case: supplied fictional observations, not user validation of this prototype." : "Field practice: document actual participants, consent, conditions, assistance, and limits."}\n\n${sections}\n\n## Self-review\n\n0 missing; 1 asserted; 2 supported; 3 supported with clear reasoning and limits. Self-review is not independent grading.\n\n${ratings}\n`;
}
function downloadNotes(text: string, filename: string) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/markdown;charset=utf-8" }));
  const anchor = document.createElement("a"); anchor.href = url; anchor.download = filename; anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function HciProjectPage() {
  const course = useCurrentCourse();
  const content = course.content.interaction!;
  const search = useSearch({ strict: false });
  const navigate = useNavigate();
  const id: HciProjectId = search.project === "permissions" ? "permissions" : "appointment";
  const fixture = hciCases[id];
  const { progress, canSave, updateHciProject } = useProgress();
  const project = progress.hci.projects[id];
  const change = (change: (project: HciProject) => HciProject) => updateHciProject(id, change);
  return <VStack className="course-wrap course-simple-page" gap={5}>
    <VStack as="header" gap={2}><Heading level={1} className="course-display course-page-title">Your HCI capstone</Heading><Text as="p" color="secondary">Carry your module work into one redesign. Complete either case, and explain the evidence and limits.</Text></VStack>
    <RadioList label="Project case" value={id} onChange={(value) => void navigate({ to: "/courses/$courseId/$page", params: { courseId: course.id, page: "project" }, search: { project: value === "permissions" ? "permissions" : "appointment" }, resetScroll: false })}>
      <RadioListItem label="Service appointment" value="appointment" /><RadioListItem label="Team invitations and access" value="permissions" />
    </RadioList>
    <VStack as="section" gap={2}><Heading level={2}>{fixture.title}</Heading><Text as="p">{fixture.brief}</Text><Text as="p" weight="medium">Case rule: {fixture.rule}</Text></VStack>
    <RadioList label="Evidence path" value={project.path} onChange={(value) => change((previous) => ({ ...previous, path: value === "field" ? "field" : "case" }))}>
      <RadioListItem label="Guided case · analyze supplied fictional records" value="case" /><RadioListItem label="Field practice · arrange appropriate consented sessions" value="field" />
    </RadioList>
    <Text as="p" role="status">{project.path === "case" ? "These records support analysis practice. They do not validate your new prototype with real users." : "Document actual observations, consent, conditions, help given, and recruitment limits. Use low-risk tasks and appropriate school or organizational arrangements."}</Text>
    <details><summary>Supplied fictional research and test records</summary><VStack gap={3} paddingBlock={3}><Text as="p">All people, observations, and outcomes below are invented for this teaching case. Keep observations and proposed explanations separate.</Text><VStack isScrollable><Table data={[...fixture.records]} idKey="person" columns={[{ key: "person", header: "Fictional person" }, { key: "observation", header: "Record" }, { key: "outcome", header: "Outcome" }]} /></VStack></VStack></details>
    <VStack gap={2}><ProgressBar label="Project self-checks" value={project.checks.length} max={hciStepIds.length} hasValueLabel formatValueLabel={(value, max) => `${value} of ${max} marked`} /><Text as="p" type="supporting" color="secondary">{canSave ? "Notes and self-checks save in this browser. Export a copy to keep them elsewhere." : "This browser is not saving changes. Keep this tab open and export notes or a progress backup."} Marking checks records your review, not verified mastery.</Text></VStack>
    <HStack gap={2} wrap="wrap"><Button label="Export this project’s notes" onClick={() => downloadNotes(exportHciProject(fixture.title, project, content.moduleOutputs), `graphnotes-hci-${id}-notes.md`)} /><Button label="Backups and preferences" href={`/courses/${course.id}/preferences`} /></HStack>
    <VStack as="section" gap={0} aria-label="Module project workspace">{hciStepIds.map((step, index) => {
      const output = content.moduleOutputs[index];
      const note = project.entries[step] ?? "";
      return <details key={`${id}:${step}`} className="learning-setting" open={index === 0}>
        <summary>{index + 1}. {output.title}{project.checks.includes(step) ? " · self-check marked" : ""}</summary>
        <VStack gap={3} paddingBlock={3}>
          <Text as="p">{output.prompt}</Text>
          <TextArea label={`Your ${output.title.toLowerCase()}`} value={note} onChange={(value) => change((previous) => ({ ...previous, entries: { ...previous.entries, [step]: value }, checks: value.trim() ? previous.checks : previous.checks.filter((key) => key !== step) }))} rows={5} maxLength={4000} htmlMaxLength={4000} description="Label predictions, fictional case observations, and observations from your own study. Add a prototype reference or textual flow; keep the design artifact in your chosen tool." />
          <CheckboxInput label={`I reviewed my ${output.title.toLowerCase()}`} value={project.checks.includes(step)} isDisabled={!note.trim()} disabledMessage="Add notes before marking this self-check." onChange={(checked) => change((previous) => ({ ...previous, checks: checked ? [...new Set([...previous.checks, step])] : previous.checks.filter((key) => key !== step) }))} />
          <details><summary>See a worked example · fictional</summary><Text as="p">{output.example}</Text></details>
          <Button label={`Revisit module ${index + 1}`} href={`/courses/${course.id}/lessons/${course.content.modules[index].lessons[0].id}`} variant="ghost" />
        </VStack>
      </details>;
    })}</VStack>
    <VStack as="section" gap={4} aria-labelledby="rubric-heading"><VStack gap={1}><Heading level={2} id="rubric-heading">Self-review rubric</Heading><Text as="p">0 missing · 1 asserted · 2 supported · 3 supported with clear reasoning and limits. This is a reflection aid; independent grading needs a reviewer.</Text></VStack>
      {hciRubric.map(({ id: key, title, description }) => <RadioList key={key} label={title} description={description} value={project.ratings[key] === undefined ? "" : String(project.ratings[key])} onChange={(value) => change((previous) => ({ ...previous, ratings: { ...previous.ratings, [key]: Number(value) } }))}>{[0, 1, 2, 3].map((value) => <RadioListItem key={value} label={`${value} · ${["Missing", "Asserted", "Supported", "Reasoned with limits"][value]}`} value={String(value)} />)}</RadioList>)}
    </VStack>
  </VStack>;
}
