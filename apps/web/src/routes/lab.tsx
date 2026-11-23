import { Button } from "@astryxdesign/core/Button";
import { ClickableCard } from "@astryxdesign/core/ClickableCard";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";
import { Selector } from "@astryxdesign/core/Selector";
import { Tab, TabList } from "@astryxdesign/core/TabList";
import { Text } from "@astryxdesign/core/Text";
import { TextInput } from "@astryxdesign/core/TextInput";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type Ref } from "react";
import { ArrowLeft, Grid as GridIcon, Search } from "reicon-react";

import { chartAtlas } from "@/course/chart-atlas";
import { ChartThumbnail } from "@/course/chart-thumbnail";
import { ChartLab } from "@/course/charts";
import { courseLabs, studioLabs } from "@/course/practice-data";

const experiments = [...studioLabs, ...courseLabs];
const familyOptions = [
  { value: "all", label: "All chart families" },
  ...[...new Set(chartAtlas.map(([family]) => family))].map((family) => ({ value: family, label: family })),
];

type LabSearch = { experiment?: string; view?: "atlas" | "browse" };

export const Route = createFileRoute("/lab")({
  validateSearch: (search: Record<string, unknown>): LabSearch => ({
    experiment: experiments.some(({ id }) => id === search.experiment) ? String(search.experiment) : undefined,
    view: search.view === "atlas" || search.view === "browse" ? search.view : undefined,
  }),
  head: () => ({ meta: [{ title: "Chart Lab · Graphnotes" }] }),
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
    <VStack as="section" gap={3} aria-labelledby="chart-atlas-title" className="course-motion-enter">
      <Heading id="chart-atlas-title" level={2} className="lab-panel-title">Find a chart</Heading>
      <HStack gap={2} wrap="wrap" align="end" className="practice-filters lab-atlas-filters">
        <TextInput type="search" label="Search charts" placeholder="Search by chart or task" value={query} onChange={setQuery} hasClear startIcon={<Search size={16} aria-hidden="true" />} />
        <Selector label="Chart family" value={family} options={familyOptions} onChange={(value) => setFamily(value ?? "all")} />
      </HStack>
      <Text as="p" type="supporting" color="secondary" role="status">{results.length} {results.length === 1 ? "chart" : "charts"}</Text>
      {results.length ? (
        <VStack as="ul" className="lab-atlas-results" gap={0}>
          {results.map(([type, name, guidance]) => (
            <VStack as="li" key={name} className="lab-atlas-row" gap={1}>
              <HStack justify="between" align="start" wrap="wrap" gap={1}>
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

function ExperimentCatalog({
  startsInStudio,
  titleRef,
  onBack,
  onOpen,
}: {
  startsInStudio: boolean;
  titleRef: Ref<HTMLHeadingElement>;
  onBack: () => void;
  onOpen: (id: string) => void;
}) {
  const [collection, setCollection] = useState(startsInStudio ? "studio" : "lessons");
  const options = collection === "studio" ? studioLabs : courseLabs;

  return (
    <VStack as="section" aria-labelledby="experiment-library-title" gap={4} className="course-motion-enter">
      <HStack justify="between" align="center" wrap="wrap" gap={2}>
        <Heading id="experiment-library-title" level={2} ref={titleRef} tabIndex={-1} className="lab-panel-title">Browse experiments</Heading>
        <Button variant="ghost" size="sm" label="Back to experiment" icon={<ArrowLeft size={16} aria-hidden="true" />} onClick={onBack} />
      </HStack>
      <VStack gap={3}>
        <SegmentedControl label="Experiment collection" value={collection} onChange={setCollection} size="sm">
          <SegmentedControlItem label="Studio" value="studio" />
          <SegmentedControlItem label="Lessons" value="lessons" />
        </SegmentedControl>
        <Grid columns={{ minWidth: 156, max: 4 }} gap={2}>
          {options.map(({ id, title, lab }) => (
            <ClickableCard key={id} label={title} onClick={() => onOpen(id)} padding={2} className="lab-browser-card">
              <VStack gap={1.5}>
                <ChartThumbnail data={lab.views[0].chart} />
                <Text weight="semibold" as="p">{title}</Text>
              </VStack>
            </ClickableCard>
          ))}
        </Grid>
      </VStack>
    </VStack>
  );
}

function ChartLabPage() {
  const { experiment, view } = Route.useSearch();
  const navigate = Route.useNavigate();
  const current = experiments.find(({ id }) => id === experiment) ?? studioLabs[0];
  const destination = useRef<HTMLHeadingElement>(null);
  const isAtlas = view === "atlas";

  function openExperimentView(nextView: LabSearch["view"], id = experiment) {
    void navigate({ search: { experiment: id, view: nextView }, resetScroll: false }).then(() => {
      requestAnimationFrame(() => destination.current?.focus());
    });
  }

  return (
    <VStack className="course-wrap course-simple-page practice-page lab-page" gap={4}>
      <VStack as="header" gap={2} className="course-motion-enter">
        <Heading level={1} className="course-display course-page-title">Chart Lab</Heading>
        <Text as="p" color="secondary">Change how a chart is drawn and see which patterns become easier to read.</Text>
      </VStack>
      <TabList
        role="tablist"
        aria-label="Chart Lab"
        hasDivider
        value={isAtlas ? "atlas" : "experiments"}
        onChange={(tab) => { void navigate({ search: { experiment, view: tab === "atlas" ? "atlas" : undefined }, resetScroll: false }); }}
      >
        <Tab value="experiments" label="Experiments" panelId="lab-experiments" />
        <Tab value="atlas" label="Chart atlas" panelId="lab-atlas" />
      </TabList>
      <VStack id="lab-experiments" role="tabpanel" aria-label="Experiments" hidden={isAtlas} className="lab-section">
        {view === "browse" ? (
          <ExperimentCatalog
            startsInStudio={studioLabs.some(({ id }) => id === current.id)}
            titleRef={destination}
            onBack={() => openExperimentView(undefined)}
            onOpen={(id) => openExperimentView(undefined, id)}
          />
        ) : (
          <VStack as="section" gap={2} key={current.id} className="course-motion-enter lab-active" aria-labelledby="experiment-title">
            <HStack justify="between" align="center" wrap="wrap" gap={2}>
              <Heading level={2} id="experiment-title" ref={destination} tabIndex={-1} className="lab-panel-title">{current.title}</Heading>
              <Button label="Browse experiments" variant="secondary" size="sm" icon={<GridIcon size={16} aria-hidden="true" />} className="course-action" onClick={() => openExperimentView("browse")} />
            </HStack>
            <ChartLab lab={current.lab} showHeading={false} />
          </VStack>
        )}
      </VStack>
      <VStack id="lab-atlas" role="tabpanel" aria-label="Chart atlas" hidden={!isAtlas} className="lab-section">
        <ChartAtlas />
      </VStack>
    </VStack>
  );
}
