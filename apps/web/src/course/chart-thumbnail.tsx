import type { ChartData } from "./lab-data";

const width = 144;
const height = 64;

function range(value: number, min: number, max: number) {
  return (value - min) / (max - min);
}

function PreviewMarks({ data }: { data: ChartData }) {
  switch (data.kind) {
    case "bars":
    case "columns": {
      const row = data.kind === "bars";
      const step = (row ? 44 : 124) / data.values.length;
      return data.values.map(([label, value], index) => {
        const portion = range(value, data.min ?? 0, data.max);
        const barClass = index === (data.emphasis ?? data.values.length - 1) ? "preview-accent" : "preview-mark";
        return row ? (
          <rect key={label} x={18} y={10 + index * step} width={106 * portion} height={step * .58} rx={2} className={barClass} />
        ) : (
          <rect key={label} x={10 + index * step} y={55 - 44 * portion} width={step * .68} height={44 * portion} rx={2} className={barClass} />
        );
      });
    }
    case "line":
      return data.series.map(({ name, values }, seriesIndex) => {
        const path = values.map((value, index) => value == null ? "" :
          `${values[index - 1] == null ? "M" : "L"} ${10 + index * 124 / Math.max(1, values.length - 1)} ${53 - 43 * range(value, data.min ?? 0, data.max)}`,
        ).join(" ");
        return <path key={name} d={path} className={seriesIndex ? "preview-line preview-line-secondary" : "preview-line"} strokeDasharray={seriesIndex ? "4 4" : undefined} />;
      });
    case "table":
      return (
        <>
          <rect x={16} y={10} width={112} height={44} rx={5} className="preview-table" />
          <path d="M16 23h112M16 33h112M16 43h112M59 10v44M94 10v44" className="preview-grid" />
          {data.heatmap && <><rect x={60} y={24} width={33} height={8} className="preview-accent" /><rect x={95} y={34} width={32} height={8} className="preview-mark" /></>}
        </>
      );
    case "interval":
      return data.estimates.map(({ label, low, high, rate }, index) => {
        const y = 23 + index * 20;
        return <g key={label}><path d={`M${12 + low * 1.2} ${y}H${12 + high * 1.2}`} className="preview-interval" /><circle cx={12 + rate * 1.2} cy={y} r={4} className="preview-accent" /></g>;
      });
    case "symbols":
      return data.values.map(([label, value], index) => {
        const ratio = value / data.values[0][1];
        const radius = (data.scale === "area" ? Math.sqrt(ratio) : ratio) * 12;
        return <circle key={label} cx={46 + 51 * index} cy={51 - radius} r={radius} className={index ? "preview-accent" : "preview-mark"} />;
      });
    case "palette":
      return data.swatches.map(([name, token], index) => (
        <rect key={name} x={11 + index * 25} y={17} width={22} height={30} rx={4} fill={`var(--color-data-${token})`} />
      ));
    case "multiples":
      return data.charts.map(({ title, chart }, index) => (
        <g key={title} transform={`translate(${index * 72}, 12) scale(.46 .65)`}>
          <PreviewMarks data={chart} />
        </g>
      ));
  }
}

export function ChartThumbnail({ data }: { data: ChartData }) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="chart-thumbnail" aria-hidden="true" focusable="false">
      {data.kind !== "table" && data.kind !== "palette" && <path d="M9 54h126M9 33h126M9 12h126" className="preview-grid" />}
      <PreviewMarks data={data} />
    </svg>
  );
}
