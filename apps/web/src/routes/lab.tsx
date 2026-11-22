import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Selector } from "@astryxdesign/core/Selector";
import { Text } from "@astryxdesign/core/Text";
import { TextInput } from "@astryxdesign/core/TextInput";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

import { chartAtlas } from "@/course/chart-atlas";
import { ChartLab } from "@/course/charts";
import { courseLabs, studioLabs } from "@/course/practice-data";

const experiments = [...studioLabs, ...courseLabs];
const experimentOptions = [
  { type: "section" as const, title: "Studio experiments", options: studioLabs.map(({ id, title }) => ({ value: id, label: title })) },
  { type: "section" as const, title: "Course experiments", options: courseLabs.map(({ id, title }) => ({ value: id, label: title })) },
];
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

  return (
    <VStack className="course-wrap course-simple-page practice-page" gap={6}>
      <VStack as="header" gap={2} className="course-motion-enter practice-header">
        <Heading level={1} className="course-display course-page-title">Chart lab</Heading>
        <p className="course-deck">Change one design choice at a time and see what it makes easier to read.</p>
      </VStack>
      <Selector
        label="Experiment"
        options={experimentOptions}
        value={current.id}
        onChange={(value) => { if (value) void navigate({ search: { experiment: value }, resetScroll: false }); }}
        hasSearch
        containerClassName="practice-selector"
      />
      <VStack as="section" gap={2} key={current.id} className="course-motion-enter" aria-labelledby="experiment-title">
        <Heading level={2} id="experiment-title">{current.title}</Heading>
        <ChartLab lab={current.lab} showHeading={false} />
      </VStack>
      <ChartAtlas />
    </VStack>
  );
}
