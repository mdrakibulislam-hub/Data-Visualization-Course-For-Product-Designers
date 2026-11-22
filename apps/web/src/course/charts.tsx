import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";
import { VStack } from "@astryxdesign/core/VStack";
import { useState, type CSSProperties } from "react";

import type { ChartData, Lab, Values } from "./lab-data";

type DataTable = Extract<ChartData, { kind: "table" }>;

function showValue(value: number | null, unit: string) {
  return value === null ? "Missing" : `${value}${unit.startsWith("%") ? "%" : ""}`;
}

export function DataGrid({ data, title }: { data: DataTable; title: string }) {
  return (
    <table className="course-data">
      <caption className="sr-only">{title}</caption>
      <thead><tr>{data.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
      <tbody>
        {data.rows.map(([label, ...cells]) => (
          <tr key={label}>
            <th scope="row">{label}</th>
            {cells.map((cell, index) => (
              <td
                key={data.columns[index + 1]}
                className={data.heatmap && cell.endsWith("%") ? "course-heat-cell" : undefined}
                style={data.heatmap && cell.endsWith("%") ? { "--heat": Number.parseInt(cell) / 3 + 4 + "%" } as CSSProperties : undefined}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Columns({
  values, max, unit, emphasis, histogram = false,
}: { values: Values; max: number; unit: string; emphasis?: number; histogram?: boolean }) {
  return (
    <VStack className="course-columns" gap={0} aria-hidden="true">
      <p className="course-axis-unit">{unit}</p>
      <HStack className="course-column-layout" gap={0}>
        <VStack as="ol" className="course-column-ticks" gap={0}>
          {[1, .75, .5, .25, 0].map((fraction) => (
            <li key={fraction} style={{ top: `${100 * (1 - fraction)}%` }}>{max * fraction}</li>
          ))}
        </VStack>
        <VStack className="course-column-body" gap={0}>
          <ol className="course-column-plot" data-histogram={histogram || undefined} style={{ "--columns": values.length } as CSSProperties}>
            {values.map(([name, value], index) => (
              <li className="course-column" key={name} data-highlight={index === emphasis || undefined} style={{ "--amount": `${100 * value / max}%` } as CSSProperties}>
                <i><b>{value}</b></i>
              </li>
            ))}
          </ol>
          <ol className="course-column-labels" style={{ "--columns": values.length } as CSSProperties}>
            {values.map(([name]) => <li key={name}>{name}</li>)}
          </ol>
        </VStack>
      </HStack>
    </VStack>
  );
}

function HorizontalBars({ chart }: { chart: Extract<ChartData, { kind: "bars" | "columns" }> }) {
  const min = chart.min ?? 0;
  const middle = (min + chart.max) / 2;
  return (
    <VStack className="course-bars" gap={1} aria-hidden="true">
      <p className="course-axis-unit">{chart.unit}</p>
      <ol>
        {chart.values.map(([label, value], index) => (
          <li key={label} data-highlight={chart.emphasis === index || undefined}>
            <span>{label}</span>
            <i style={{ "--amount": `${100 * (value - min) / (chart.max - min)}%` } as CSSProperties} />
            <b>{showValue(value, chart.unit)}</b>
          </li>
        ))}
      </ol>
      <HStack className="course-bar-axis" justify="between" gap={0}>
        {[min, middle, chart.max].map((tick) => <span key={tick}>{showValue(tick, chart.unit)}</span>)}
      </HStack>
    </VStack>
  );
}

function LineChart({ chart }: { chart: Extract<ChartData, { kind: "line" }> }) {
  const width = 560;
  const left = 42;
  const right = chart.usePatterns ? 472 : 530;
  const top = 26;
  const bottom = 182;
  const min = chart.min ?? 0;
  const x = (index: number) => left + index * (right - left) / (chart.labels.length - 1);
  const y = (value: number) => bottom - (value - min) * (bottom - top) / (chart.max - min);
  const labeledIndices = chart.labels.length > 7
    ? [0, 6, 13, 20, chart.labels.length - 1]
    : chart.labels.map((_, index) => index);

  return (
    <VStack gap={0} aria-hidden="true">
      {chart.unit && <p className="course-axis-unit">{chart.unit}</p>}
      <svg viewBox={`0 0 ${width} 212`} className="course-line" focusable="false">
        {[0, .25, .5, .75, 1].map((fraction) => {
          const tick = Number((min + fraction * (chart.max - min)).toFixed(1));
          return (
            <g key={fraction}>
              <line x1={left} x2={right} y1={y(tick)} y2={y(tick)} className="course-line-grid" />
              <text x={left - 8} y={y(tick) + 4} textAnchor="end">{tick}</text>
            </g>
          );
        })}
        {labeledIndices.map((index) => <text key={index} x={x(index)} y={bottom + 24} textAnchor="middle">{chart.labels[index]}</text>)}
        {chart.series.map(({ name, values, muted }, seriesIndex) => {
          const points = values.map((value, index) => value === null
            ? ""
            : `${index === 0 || values[index - 1] == null ? "M" : "L"} ${x(index)} ${y(value)}`).join(" ");
          const lastIndex = values.findLastIndex((value) => value !== null);
          const last = values[lastIndex];
          return (
            <g key={name} className={muted ? "course-series-muted" : seriesIndex ? "course-series-secondary" : "course-series-primary"}>
              <path d={points} fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={chart.usePatterns && seriesIndex ? "7 6" : undefined} />
              {values.length <= 7 && values.map((value, index) => value === null ? null : <circle key={index} cx={x(index)} cy={y(value)} r="3.5" fill="currentColor" />)}
              {chart.usePatterns && last != null && <text x={x(lastIndex) + 11} y={y(last) + 4} className="course-direct-label course-direct-series-label">{name}</text>}
            </g>
          );
        })}
        {chart.annotations && (
          <g>
            <line x1={x(chart.annotations.index)} x2={x(chart.annotations.index)} y1={top} y2={bottom} className="course-line-note" />
            <text x={x(chart.annotations.index)} y={16} textAnchor="middle" className="course-direct-label">{chart.annotations.label}</text>
          </g>
        )}
      </svg>
      {chart.series.length > 1 && (
        <HStack as="ul" gap={3} className="course-line-legend" data-patterns={chart.usePatterns || undefined}>
          {chart.series.map(({ name, muted }) => <li key={name} data-muted={muted || undefined}><i />{name}</li>)}
        </HStack>
      )}
    </VStack>
  );
}

function Intervals({ chart }: { chart: Extract<ChartData, { kind: "interval" }> }) {
  return (
    <VStack gap={2} className="course-intervals" aria-hidden="true">
      <ol>
        {chart.estimates.map(({ label, low, high, rate, sample }) => (
          <li key={label}>
            <HStack justify="between" gap={2}><strong>{label}</strong><span>{rate}% · {sample}</span></HStack>
            <p style={{ "--start": `${low}%`, "--end": `${high}%`, "--point": `${rate}%` } as CSSProperties}><i /><b /></p>
          </li>
        ))}
      </ol>
      <HStack justify="between" gap={1} className="course-axis-unit"><span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span></HStack>
    </VStack>
  );
}

function valuesTable(data: Exclude<ChartData, DataTable>): DataTable | null {
  switch (data.kind) {
    case "bars":
    case "columns":
      return { kind: "table", columns: ["Group", data.unit], rows: data.values.map(([label, value]) => [label, showValue(value, data.unit)]) };
    case "line":
      return { kind: "table", columns: ["Period", ...data.series.map(({ name }) => name)], rows: data.labels.map((label, index) => [label, ...data.series.map(({ values }) => showValue(values[index], data.unit))]) };
    case "interval":
      return { kind: "table", columns: ["Group", "Sample", "Rate", "95% interval"], rows: data.estimates.map(({ label, sample, rate, low, high }) => [label, sample, `${rate}%`, `${low}% to ${high}%`]) };
    case "symbols":
      return { kind: "table", columns: ["Group", "Signups"], rows: data.values.map(([label, value]) => [label, String(value)]) };
    case "palette":
      return null;
    case "multiples":
      return valuesTable({ ...data.charts[0].chart, series: data.charts.flatMap(({ chart }) => chart.series) });
  }
}

function Chart({ data, title }: { data: ChartData; title: string }) {
  switch (data.kind) {
    case "bars": return <HorizontalBars chart={data} />;
    case "columns": return <Columns {...data} histogram={data.unit === "people"} />;
    case "line": return <LineChart chart={data} />;
    case "interval": return <Intervals chart={data} />;
    case "table": return <DataGrid data={data} title={title} />;
    case "symbols": return (
      <HStack as="ul" gap={4} justify="center" align="end" className="course-symbols">
        {data.values.map(([label, value]) => {
          const ratio = value / data.values[0][1];
          const diameter = data.scale === "area" ? Math.sqrt(ratio) : ratio;
          return <VStack as="li" key={label} align="center" gap={2}>
            <i aria-hidden="true" style={{ "--symbol-size": diameter } as CSSProperties} />
            <strong>{value} signups</strong>
            <small>{label}</small>
          </VStack>;
        })}
      </HStack>
    );
    case "palette": return (
      <HStack as="ul" gap={1} className="course-swatches">
        {data.swatches.map(([label, token]) => <VStack as="li" key={label} gap={1}>
          <i aria-hidden="true" style={{ backgroundColor: `var(--color-data-${token})` }} />
          <small>{label}</small>
        </VStack>)}
      </HStack>
    );
    case "multiples": return (
      <VStack className="course-chart-multiples" gap={3}>
        {data.charts.map(({ title, chart }) => (
          <VStack gap={1} key={title}>
            <strong>{title}</strong>
            <LineChart chart={chart} />
          </VStack>
        ))}
      </VStack>
    );
  }
}

export function ChartLab({ lab, showHeading = true }: { lab: Lab; showHeading?: boolean }) {
  const [selected, setSelected] = useState(0);
  const view = lab.views[selected];
  const chart = view.chart;
  const table = view.detail ?? (chart.kind !== "table" ? valuesTable(chart) : null);
  return (
    <VStack as="section" gap={3} aria-labelledby={showHeading ? "lab-title" : undefined} aria-label={showHeading ? undefined : "Experiment"}>
      {showHeading && <Heading level={2} id="lab-title">Try it</Heading>}
      <p>{lab.prompt}</p>
      <Card className="course-lab" padding={4}>
        <VStack gap={3}>
          <SegmentedControl label="Chart view" size="md" className="course-lab-controls" value={String(selected)} onChange={(value) => setSelected(Number(value))}>
            {lab.views.map(({ label }, index) => <SegmentedControlItem key={label} label={label} value={String(index)} />)}
          </SegmentedControl>
          <VStack as="figure" gap={3} aria-label={view.title}>
            <VStack key={selected} className="course-motion-enter" gap={3}>
              <Heading level={3}>{view.title}</Heading>
              <Chart data={chart} title={view.title} />
            </VStack>
            <figcaption className="course-chart-note" aria-live="polite">{view.note}</figcaption>
            {table && <details className="course-value-details"><summary>View values</summary><DataGrid data={table} title={view.title} /></details>}
          </VStack>
        </VStack>
      </Card>
    </VStack>
  );
}
