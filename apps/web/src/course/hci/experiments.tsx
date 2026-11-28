import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { CheckboxInput } from "@astryxdesign/core/CheckboxInput";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { RadioList, RadioListItem } from "@astryxdesign/core/RadioList";
import { Table } from "@astryxdesign/core/Table";
import { Text } from "@astryxdesign/core/Text";
import { TextInput } from "@astryxdesign/core/TextInput";
import { VStack } from "@astryxdesign/core/VStack";
import { useId, useRef, useState } from "react";
import type { InteractionLab, LabKind } from "./types";

const times = ["Tuesday 14:00", "Tuesday 15:00", "Wednesday 10:00"];
const appointments = [
  { id: "a", day: "Tuesday", time: "14:00", location: "North", status: "Available" },
  { id: "b", day: "Tuesday", time: "15:00", location: "South", status: "Full" },
  { id: "c", day: "Wednesday", time: "10:00", location: "South", status: "Available" },
  { id: "d", day: "Tuesday", time: "16:00", location: "South", status: "Available" },
];
function Choices({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return <RadioList label={label} value={value} onChange={onChange}>{options.map((option) => <RadioListItem key={option} value={option} label={option} />)}</RadioList>;
}
function TimeList({ value, onChange }: { value: string; onChange: (value: string) => void }) { return <Choices label="Appointment time" value={value} onChange={onChange} options={times} />; }
function CompareSearch() {
  const [view, setView] = useState("Mixed list");
  const [selected, setSelected] = useState("");
  const items = view === "Mixed list" ? [appointments[2], appointments[1], appointments[3], appointments[0]] : [...appointments].sort((a, b) => a.day.localeCompare(b.day) || a.time.localeCompare(b.time));
  return <VStack gap={3}>
    <Choices label="Arrangement" value={view} onChange={setView} options={["Mixed list", "Grouped by day and time"]} />
    <VStack as="ul" gap={2}>{items.map((item) => <HStack as="li" key={item.id} justify="between" wrap="wrap" align="center" gap={2}>
      <Text>{view === "Mixed list" ? `${item.location} · ${item.status} · ${item.time} · ${item.day}` : `${item.day} ${item.time} · ${item.status} · ${item.location}`}</Text>
      <Button label={`Choose ${item.day} ${item.time}`} isDisabled={item.status === "Full"} onClick={() => setSelected(`${item.day} ${item.time}`)} />
    </HStack>)}</VStack>
    <Text as="p" role="status">{selected ? `Selected ${selected}. The first available Tuesday afternoon time is 14:00.` : "No time selected."}</Text>
  </VStack>;
}
function Memory() {
  const [view, setView] = useState("Recall");
  const [time, setTime] = useState(times[0]);
  const [step, setStep] = useState(1);
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  return <VStack gap={3}>
    <Choices label="Information available" value={view} onChange={setView} options={["Recall", "Persistent summary"]} />
    {step === 1 ? <><TimeList value={time} onChange={setTime} /><Button label="Continue to review" onClick={() => { setStep(2); setChecked(false); }} /></> : <>
      {view === "Persistent summary" && <Text as="p" weight="semibold">Your choice: {time}. Service: initial appointment.</Text>}
      <TextInput label="Which day and time did you choose?" value={answer} onChange={(value) => { setAnswer(value); setChecked(false); }} description="No score or timer. You can return to the choice." />
      <HStack gap={2} wrap="wrap"><Button label="Return to choice" onClick={() => setStep(1)} /><Button label="Reveal chosen time" onClick={() => setChecked(true)} /></HStack>
      {checked && <Text as="p" role="status">You chose {time}. Compare the effort with and without the visible summary.</Text>}
    </>}
  </VStack>;
}
function Model() {
  const [result, setResult] = useState("No action yet. The selected time is a draft.");
  return <VStack gap={3}><Text as="p">Draft: Tuesday 14:00 · initial appointment</Text><HStack gap={2} wrap="wrap">
    <Button label="Save draft" onClick={() => setResult("Draft saved. No request sent and no appointment confirmed. You can return and edit.")} />
    <Button label="Send request" onClick={() => setResult("Request sent. Staff approval is still required; this is not a confirmed appointment.")} />
    <Button label="Confirm booking" onClick={() => setResult("Appointment confirmed for Tuesday 14:00. This fixture has immediate availability and no staff-approval requirement.")} />
  </HStack><Text as="p" role="status">{result}</Text></VStack>;
}
const taskSteps = ["Identify the current booking", "Choose a suitable replacement", "Review the replacement and consequences", "Confirm the replacement", "Release the original booking"];
function TaskOrder() {
  const [order, setOrder] = useState([4, 2, 0, 3, 1]);
  const [checked, setChecked] = useState(false);
  function move(index: number, offset: number) {
    const next = [...order];
    [next[index], next[index + offset]] = [next[index + offset], next[index]];
    setOrder(next); setChecked(false);
  }
  return <VStack gap={3}><VStack as="ol" gap={3}>{order.map((id, index) => <VStack as="li" key={id} gap={1}>
    <Text weight="medium">{index + 1}. {taskSteps[id]}</Text><HStack gap={2} wrap="wrap">
      <Button label={`Move step ${index + 1} earlier`} isDisabled={index === 0} onClick={() => move(index, -1)} />
      <Button label={`Move step ${index + 1} later`} isDisabled={index === order.length - 1} onClick={() => move(index, 1)} />
    </HStack></VStack>)}</VStack>
    <Button label="Check the plan" onClick={() => setChecked(true)} />
    {checked && <Text as="p" role="status">{order.every((id, index) => id === index) ? "The sequence fits the case rule. If no replacement is suitable, keep the original." : "Review the dependency: confirm a suitable replacement before releasing the original. Identify, choose, and review come before commitment."}</Text>}
  </VStack>;
}
function Feedback() {
  const [state, setState] = useState("draft");
  const messages: Record<string, string> = { draft: "Draft: Tuesday 14:00. Nothing has been requested.", pending: "Request pending. Acknowledged, but not yet confirmed.", confirmed: "Appointment confirmed: Tuesday 14:00 · reference DEMO-14.", failed: "This time could not be booked. Your details remain available; choose another time.", unknown: "The response was lost. Confirmation is unknown. Check the request before attempting another booking." };
  return <VStack gap={3}><Text as="p" role="status">{messages[state]}</Text>
    {state === "draft" && <Button label="Send fictional booking request" variant="primary" onClick={() => setState("pending")} />}
    {state === "pending" && <HStack gap={2} wrap="wrap"><Button label="Simulate success" onClick={() => setState("confirmed")} /><Button label="Simulate rejection" onClick={() => setState("failed")} /><Button label="Simulate lost response" onClick={() => setState("unknown")} /></HStack>}
    {state === "unknown" && <Button label="Check request status" onClick={() => setState("confirmed")} />}
    {state === "failed" && <Button label="Return to draft" onClick={() => setState("draft")} />}
  </VStack>;
}
function Recovery() {
  const [mode, setMode] = useState("Immediate cancellation");
  const [state, setState] = useState("booked");
  return <VStack gap={3}><Choices label="Cancellation behavior" value={mode} options={["Immediate cancellation", "Review before commitment"]} onChange={(value) => { setMode(value); setState("booked"); }} />
    <Text as="p" role="status">{state === "booked" ? "Current appointment: Tuesday 14:00." : state === "review" ? "Review: cancellation releases Tuesday 14:00. You can keep the booking instead." : "Appointment cancelled. This teaching fixture still holds the time so Undo can restore it."}</Text>
    {state === "booked" && <Button label="Cancel appointment" variant="destructive" onClick={() => setState(mode === "Immediate cancellation" ? "cancelled" : "review")} />}
    {state === "review" && <HStack gap={2} wrap="wrap"><Button label="Keep appointment" onClick={() => setState("booked")} /><Button label="Confirm cancellation" variant="destructive" onClick={() => setState("cancelled")} /></HStack>}
    {state === "cancelled" && <Button label="Undo cancellation" onClick={() => setState("booked")} />}
  </VStack>;
}
function Direct() {
  const [slot, setSlot] = useState(0);
  return <VStack gap={3}><VStack as="ul" gap={2}>{times.map((time, index) => <HStack as="li" key={time} gap={2} wrap="wrap"><Text weight={slot === index ? "semibold" : "normal"}>{time}</Text>{slot === index && <Text color="accent">Your appointment draft</Text>}</HStack>)}</VStack>
    <HStack gap={2} wrap="wrap"><Button label="Move appointment earlier" isDisabled={slot === 0} onClick={() => setSlot(slot - 1)} /><Button label="Move appointment later" isDisabled={slot === times.length - 1} onClick={() => setSlot(slot + 1)} /></HStack>
    <TimeList value={times[slot]} onChange={(value) => setSlot(times.indexOf(value))} /><Text as="p" role="status">Draft time: {times[slot]}. Both paths change the same visible object; nothing is booked.</Text>
  </VStack>;
}
function MiniForm({ keyboard = false }: { keyboard?: boolean }) {
  const [mode, setMode] = useState("Preserve valid answers");
  const [name, setName] = useState("");
  const [time, setTime] = useState(times[0]);
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const id = useId();
  const error = submitted && (!name.trim() ? "Type the name to use for this booking." : !time ? "Choose an appointment time." : "");
  return <VStack gap={3}>
    {!keyboard && <Choices label="Error behavior" value={mode} onChange={setMode} options={["Preserve valid answers", "Clear the other answers"]} />}
    <VStack as="form" ref={ref} gap={3} onSubmit={(event) => {
      event.preventDefault(); setSubmitted(true); setDone(false);
      if (!name.trim() || !time) { if (!keyboard && mode === "Clear the other answers") setTime(""); }
      else setDone(true);
    }}>
      {error && <VStack gap={1} role="alert"><Text as="p">{error}</Text><Button label="Go to correction" variant="ghost" onClick={() => ref.current?.querySelector<HTMLInputElement>(!name.trim() ? `input[name="name-${id}"]` : `input[name="time-${id}"]`)?.focus()} /></VStack>}
      <TextInput label="Name for this fictional booking" value={name} onChange={(value) => { setName(value); setDone(false); }} htmlName={`name-${id}`} status={submitted && !name.trim() ? { type: "error", message: "Type a name." } : undefined} autoComplete="off" />
      <RadioList label="Appointment time" value={time} onChange={(value) => { setTime(value); setDone(false); }} htmlName={`time-${id}`} status={submitted && !time ? { type: "error", message: "Choose a time." } : undefined}>{times.map((value) => <RadioListItem key={value} label={value} value={value} />)}</RadioList>
      <Button type="submit" label="Review fictional booking" variant="primary" />
      {done && <Text as="p" role="status">Ready for review: {name.trim()} · {time}. This experiment has not booked a real appointment.</Text>}
    </VStack>
  </VStack>;
}
function Pointing() {
  const [small, setSmall] = useState(0);
  const [large, setLarge] = useState(0);
  return <VStack gap={3}><Text as="p">Same label and outcome, different action area. No timing or ability score.</Text>
    <HStack gap={3} wrap="wrap"><Button label="Choose time" size="sm" onClick={() => setSmall(small + 1)} /><Text>Activations: {small}</Text></HStack>
    <Button label="Choose time" size="lg" width="100%" onClick={() => setLarge(large + 1)} /><Text as="p" role="status">Wide-area activations: {large}.</Text>
    <details><summary>Inspect the separate choice example</summary><Text as="p">Choosing among four equally likely unfamiliar responses in a controlled reaction task is different from searching twelve familiar, grouped service names. Do not use a choice model to assume the second menu must be worse. The task, familiarity, grouping, and complete path need evaluation.</Text></details>
  </VStack>;
}
function Find() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All locations");
  const items = appointments.filter((item) => item.status === "Available" && `${item.day} ${item.time}`.toLowerCase().includes(query.toLowerCase().trim()) && (location === "All locations" || item.location === location));
  return <VStack gap={3}><TextInput label="Search available appointment days or times" type="search" value={query} onChange={setQuery} hasClear />
    <Choices label="Location restriction" value={location} onChange={setLocation} options={["All locations", "North", "South"]} />
    <Text as="p" role="status">{items.length} matching available {items.length === 1 ? "appointment" : "appointments"}. Location: {location}. {query && `Query: ${query}.`}</Text>
    <VStack as="ul" gap={1}>{items.map((item) => <VStack as="li" key={item.id}><Text>{item.day} {item.time} · {item.location} · Available</Text></VStack>)}</VStack>
    {!items.length && <Text as="p">No available times match this query and location. Change the words or clear the restriction.</Text>}
    <HStack gap={2} wrap="wrap"><Button label="Clear location restriction" onClick={() => setLocation("All locations")} /><Button label="Clear all" onClick={() => { setQuery(""); setLocation("All locations"); }} /></HStack>
  </VStack>;
}
function Help() {
  const [service, setService] = useState("Initial appointment");
  const [open, setOpen] = useState(false);
  return <VStack gap={3}><Choices label="Service" value={service} onChange={setService} options={["Initial appointment", "Follow-up appointment"]} />
    <Button label={open ? "Close service explanation" : "What does this service include?"} aria-expanded={open} onClick={() => setOpen(!open)} />
    {open && <Text as="p">Initial appointment introduces the service and your needs. Follow-up is for an existing case. Changing the service may require choosing a different valid time; existing personal details can remain. This is a fictional service policy.</Text>}
    <Text as="p" role="status">Your selected service remains {service}.</Text>
  </VStack>;
}
function Consent() {
  const [share, setShare] = useState(false);
  const [committed, setCommitted] = useState<boolean | null>(null);
  return <VStack gap={3}><Text as="p">Book Tuesday 14:00. Optional: send the time and service name to your chosen reminder contact. The core booking does not require sharing.</Text>
    <CheckboxInput label="Share my appointment reminder with my chosen contact" value={share} onChange={setShare} description="The contact receives the time and service name. You can stop future reminders; information already sent cannot be recalled." />
    <Button label={committed !== null ? "Update reminder preference" : "Confirm fictional booking"} onClick={() => setCommitted(share)} variant="primary" />
    {committed !== null && <Text as="p" role="status">Booking confirmed. Saved reminder sharing is {committed ? "on for the chosen contact" : "off"}. Your booking is available either way.{share !== committed && " Your changed preference is a draft until you update it."}</Text>}
  </VStack>;
}
const sessionRows = [
  { id: "P1", behavior: "Correct service and time, no hints.", result: "Independent completion", seconds: "44" },
  { id: "P2", behavior: "Found Submit after moderator pointed to it.", result: "Assisted completion", seconds: "73" },
  { id: "P3", behavior: "Confirmed the wrong service, no correction.", result: "Task not achieved", seconds: "53" },
];
function Evidence() {
  const [reveal, setReveal] = useState(false);
  return <VStack gap={3}><VStack isScrollable><Table data={sessionRows} idKey="id" columns={[{ key: "id", header: "Fictional record" }, { key: "behavior", header: "Observation" }, { key: "result", header: "Outcome" }, { key: "seconds", header: "Seconds" }]} /></VStack>
    <Button label={reveal ? "Hide interpretation" : "Reveal interpretation"} onClick={() => setReveal(!reveal)} />
    {reveal && <Text as="p" role="status">One of three completed independently under the rule. A quick wrong booking is not success. Time includes different outcomes and assistance, so an average alone would conceal important differences. These are teaching records, not observed results for your prototype.</Text>}
  </VStack>;
}
function Collaboration() {
  const [perspective, setPerspective] = useState("Inviter");
  const [shared, setShared] = useState("Not sent");
  const [seen, setSeen] = useState("Not sent");
  const visible = perspective === "Inviter" ? seen : shared;
  return <VStack gap={3}><Choices label="Perspective" value={perspective} onChange={setPerspective} options={["Inviter", "Invitee"]} />
    <Text as="p">Scope: read access to the whole Demo workspace after acceptance.</Text>
    <Text as="p" role="status">{perspective} sees: {visible}.</Text>
    {perspective === "Inviter" ? <HStack gap={2} wrap="wrap">
      {shared === "Not sent" && <Button label="Send fictional invitation" onClick={() => { setShared("Pending"); setSeen("Pending"); }} />}
      <Button label="Refresh invitation status" onClick={() => setSeen(shared)} />
      {seen === "Accepted" && <Button label="Revoke access" variant="destructive" onClick={() => { setShared("Revoked"); setSeen("Revoked"); }} />}
    </HStack> : <>
      {shared === "Pending" && <HStack gap={2} wrap="wrap"><Button label="Accept invitation" onClick={() => setShared("Accepted")} /><Button label="Decline invitation" onClick={() => setShared("Declined")} /></HStack>}
      {shared === "Accepted" && <Text as="p">You can now read the Demo workspace. Switch perspective to inspect the inviter’s older view before refreshing it.</Text>}
      {shared === "Revoked" && <Text as="p">Future workspace access has ended. Previously viewed information cannot be taken back.</Text>}
    </>}
  </VStack>;
}
function Ai() {
  const [suggestion, setSuggestion] = useState(true);
  const [draft, setDraft] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  return <VStack gap={3}>
    {suggestion && !confirmed && <><Text as="p">Suggested: Tuesday 14:00, based on earlier afternoon choices in this fictional case. Your current constraints may differ.</Text><HStack gap={2} wrap="wrap"><Button label="Use suggestion in draft" onClick={() => setDraft(times[0])} /><Button label="Reject suggestion" onClick={() => { setSuggestion(false); setDraft(""); }} /></HStack></>}
    {!confirmed && <><TimeList value={draft} onChange={setDraft} /><Text as="p" role="status">{draft ? `Draft: ${draft}. No booking committed.` : "Choose a suitable time. Nothing is booked."}</Text><Button label="Confirm fictional booking" isDisabled={!draft} onClick={() => setConfirmed(true)} variant="primary" /></>}
    {confirmed && <Text as="p" role="status">Confirmed: {draft}. Selecting a suggestion did not book it; the separate confirmation committed the choice.</Text>}
  </VStack>;
}
function Body({ kind }: { kind: LabKind }) {
  switch (kind) {
    case "search": return <CompareSearch />;
    case "memory": return <Memory />;
    case "model": return <Model />;
    case "tasks": return <TaskOrder />;
    case "feedback": return <Feedback />;
    case "recovery": return <Recovery />;
    case "direct": return <Direct />;
    case "form": return <MiniForm />;
    case "pointing": return <Pointing />;
    case "find": return <Find />;
    case "help": return <Help />;
    case "keyboard": return <MiniForm keyboard />;
    case "consent": return <Consent />;
    case "evidence": return <Evidence />;
    case "collaboration": return <Collaboration />;
    case "ai": return <Ai />;
  }
}
export function InteractionExperiment({ lab }: { lab: InteractionLab }) {
  const [attempt, setAttempt] = useState(0);
  return <Card variant="muted" padding={4}><VStack as="section" gap={4} aria-label={lab.title}>
    <VStack gap={1}><Heading level={3}>{lab.title}</Heading><Text as="p">{lab.prompt}</Text><Text as="p" type="supporting" color="secondary">Fictional teaching example. No real booking, invitation, or sharing occurs.</Text></VStack>
    <Body key={`${lab.id}:${attempt}`} kind={lab.id} />
    <details><summary>What to notice</summary><Text as="p">{lab.explanation}</Text></details>
    <HStack><Button label="Reset this experiment" variant="ghost" onClick={() => setAttempt(attempt + 1)} /></HStack>
  </VStack></Card>;
}
