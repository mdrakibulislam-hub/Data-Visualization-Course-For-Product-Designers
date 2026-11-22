import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";
import { SelectableCard } from "@astryxdesign/core/SelectableCard";
import { Selector } from "@astryxdesign/core/Selector";
import { Text } from "@astryxdesign/core/Text";
import { TextInput } from "@astryxdesign/core/TextInput";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "reicon-react";
import { useState } from "react";

import { chartAtlas } from "@/course/chart-atlas";
import { ChartThumbnail } from "@/course/chart-thumbnail";
import { ChartLab } from "@/course/charts";
import { courseLabs, studioLabs } from "@/course/practice-data";

const experiments = [...studioLabs, ...courseLabs];
const familyOptions = [
  { value: "all", label: "All chart families" },
  ...[...new Set(chartAtlas.map(([family]) => family))].map((family) => ({ value: family, label: family })),
];

export const Route = createFileRoute("/lab")({
  validateSearch: (search: Record<string, unknown>) => ({
    experiment: experiments.some(({ id }) => id === search.experiment) ? String(search.experiment) : undefined,
  }),
  head: () => ({ meta: [{ title: "Chart lab · Data Viz Field Guide" }] }),
  component: ChartLabPage,
});

function ChartAtlas() {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const search = query.trim().toLowerCase();
  const results = chartAtlas.filter(([type, name, guidance]) =>
    (family === "all" || family === type) && `${type} ${name} ${guidance}`.toLowerCase().includes(search),
  );

  return (
    <VStack as="section" gap={3} aria-labelledby="chart-atlas-title" className="practice-atlas">
      <Heading id="chart-atlas-title" level={2} className="course-display course-section-title">Chart atlas</Heading>
      <Text as="p" color="secondary">Find a chart by name or by the relationship you want people to see.</Text>
      <HStack gap={2} wrap="wrap" align="end" className="practice-filters">
        <TextInput type="search" label="Search charts" placeholder="Search by chart or task" value={query} onChange={setQuery} hasClear startIcon={<Search size={16} aria-hidden="true" />} />
        <Selector label="Chart family" value={family} options={familyOptions} onChange={(value) => setFamily(value ?? "all")} />
      </HStack>
      <Text as="p" type="supporting" color="secondary" role="status">{results.length} {results.length === 1 ? "chart" : "charts"}</Text>
      {results.length ? (
        <VStack as="ul" className="atlas-results" gap={0}>
          {results.map(([type, name, guidance]) => (
            <VStack as="li" key={name} className="atlas-row" gap={1}>
              <HStack justify="between" wrap="wrap" gap={1}>
                <Heading level={3}>{name}</Heading>
                <Text type="supporting" color="secondary">{type}</Text>
              </HStack>
              <Text as="p" color="secondary">{guidance}</Text>
            </VStack>
          ))}
        </VStack>
      ) : <Text as="p">Try a different term or choose another family.</Text>}
    </VStack>
  );
}

function ChartLabPage() {
  const { experiment } = Route.useSearch();
  const navigate = Route.useNavigate();
  const current = experiments.find(({ id }) => id === experiment) ?? studioLabs[0];

  const studio = studioLabs.some(({ id }) => id === current.id);
  const options = studio ? studioLabs : courseLabs;

  function choose(id: string, revealChart = false) {
    void navigate({ search: { experiment: id }, resetScroll: false }).then(() => {
      if (!revealChart) return;
      requestAnimationFrame(() => {
        const chart = document.querySelector(".lab-active");
        if (!chart || chart.getBoundingClientRect().top < window.innerHeight - 120) return;
        chart.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      });
    });
  }

  return (
    <VStack className="course-wrap course-simple-page practice-page lab-page" gap={5}>
      <VStack as="header" gap={2} className="course-motion-enter practice-header">
        <Heading level={1} className="course-display course-page-title">Chart Lab</Heading>
        <p className="course-deck">Change one design choice at a time and see what it makes easier to read.</p>
      </VStack>
      <HStack className="lab-workbench" align="start" gap={0}>
        <VStack as="section" gap={3} aria-labelledby="experiment-library-title">
          <HStack justify="between" align="center" wrap="wrap" gap={2}>
            <Heading level={2} id="experiment-library-title">Experiments</Heading>
            <SegmentedControl label="Experiment collection" value={studio ? "studio" : "lessons"} onChange={(value) => choose((value === "studio" ? studioLabs : courseLabs)[0].id)} size="sm">
              <SegmentedControlItem label="Studio" value="studio" />
              <SegmentedControlItem label="Lessons" value="lessons" />
            </SegmentedControl>
          </HStack>
          <VStack className="lab-experiment-grid" gap={0} role="group" aria-label="Choose an experiment">
            {options.map(({ id, title, lab }) => (
              <SelectableCard key={id} label={title} isSelected={current.id === id} onChange={(selected) => { if (selected) choose(id, true); }} padding={2} className="lab-experiment-card">
                <VStack gap={1.5}>
                  <ChartThumbnail data={lab.views[0].chart} />
                  <Text weight="semibold">{title}</Text>
                </VStack>
              </SelectableCard>
            ))}
          </VStack>
        </VStack>
        <VStack as="section" gap={2} key={current.id} className="course-motion-enter lab-active" aria-labelledby="experiment-title">
          <Heading level={2} id="experiment-title">{current.title}</Heading>
          <ChartLab lab={current.lab} showHeading={false} />
        </VStack>
      </HStack>
      <ChartAtlas />
    </VStack>
  );
}
