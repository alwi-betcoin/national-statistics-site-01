// NusaData — chart builders. Every chart is plain inline SVG drawn from the
// numbers in data.js: no library, no network, and the same input always draws
// the same picture.

const INK = '#0f2a3d';
const TEAL = '#0e6b6b';
const AMBER = '#e8a317';
const GRID = '#dfe6e4';
const MUTED = '#5d6f74';

function fmt(value) {
  return String(value).replace('.', ',');
}

function esc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// A line chart with labelled points. `series` is { years, values }.
export function lineChart(series, { height = 220, color = TEAL } = {}) {
  const width = 640;
  const padL = 44;
  const padR = 14;
  const padT = 18;
  const padB = 30;
  const min = Math.min(...series.values);
  const max = Math.max(...series.values);
  const span = max - min || 1;
  const lo = min - span * 0.15;
  const hi = max + span * 0.15;
  const x = (i) => padL + ((width - padL - padR) * i) / (series.years.length - 1);
  const y = (v) => padT + ((hi - v) / (hi - lo)) * (height - padT - padB);
  const points = series.values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const gridLines = [0, 1, 2, 3].map((g) => {
    const gv = lo + ((hi - lo) * g) / 3;
    const gy = y(gv);
    return `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${width - padR}" y2="${gy.toFixed(1)}" stroke="${GRID}" stroke-width="1"/><text x="${padL - 6}" y="${(gy + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="${MUTED}">${fmt(gv.toFixed(1))}</text>`;
  }).join('');
  const dots = series.values.map((v, i) => {
    return `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="4.5" fill="${color}" stroke="#fff" stroke-width="1.5"/><text x="${x(i).toFixed(1)}" y="${(y(v) - 10).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${fmt(v)}</text>`;
  }).join('');
  const years = series.years.map((yr, i) => `<text x="${x(i).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="12" fill="${MUTED}">${yr}</text>`).join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Grafik garis ${esc(series.title)}" style="width:100%;height:auto;display:block">${gridLines}<polyline points="${points}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>${dots}${years}</svg>`;
}

// A horizontal bar chart. `rows` is [{ label, value, suffix }].
export function barChart(rows, { height = 240, color = TEAL, maxValue = null } = {}) {
  const width = 640;
  const top = Math.max(...rows.map((r) => r.value), maxValue ?? 0);
  const labelW = 190;
  const valueW = 64;
  const rowH = Math.max(30, Math.floor((height - 12) / rows.length));
  const bars = rows.map((r, i) => {
    const y = 6 + i * rowH;
    const w = ((width - labelW - valueW - 16) * r.value) / top;
    return `<text x="0" y="${y + rowH / 2 + 4}" font-size="13" fill="${INK}">${esc(r.label)}</text><rect x="${labelW}" y="${y + 4}" width="${w.toFixed(1)}" height="${rowH - 10}" rx="4" fill="${i === 0 ? AMBER : color}"/><text x="${(labelW + w + 8).toFixed(1)}" y="${y + rowH / 2 + 4}" font-size="13" font-weight="700" fill="${INK}">${fmt(r.value)}${r.suffix ?? ''}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Grafik batang" style="width:100%;height:auto;display:block">${bars}</svg>`;
}

// A donut chart for shares that add up to about 100. `rows` is [{ name, share }].
export function donutChart(rows, { size = 260 } = {}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const inner = r * 0.62;
  const palette = ['#0e6b6b', '#e8a317', '#2a7f9e', '#7fb069', '#c96f4a', '#8d99ae'];
  let angle = -90;
  const slices = rows.map((row, i) => {
    const sweep = (row.share / 100) * 360;
    const a0 = (angle * Math.PI) / 180;
    const a1 = ((angle + sweep) * Math.PI) / 180;
    angle += sweep;
    const large = sweep > 180 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1);
    const yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0);
    const yi0 = cy + inner * Math.sin(a0);
    return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${palette[i % palette.length]}"/>`;
  }).join('');
  const legend = rows.map((row, i) => {
    return `<span class="legend-item"><span class="swatch" style="background:${palette[i % palette.length]}"></span>${esc(row.name)} · <strong>${fmt(row.share)}%</strong></span>`;
  }).join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Diagram lingkaran pangsa sektor" style="width:${size}px;max-width:100%;height:auto;display:block">${slices}<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="800" fill="${INK}">100%</text><text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="12" fill="${MUTED}">PDB 2024</text></svg><div class="legend">${legend}</div></div>`;
}

// A small population pyramid: three stacked horizontal bars for the age groups.
export function ageBars(groups) {
  const width = 640;
  const rowH = 44;
  const height = groups.length * rowH + 8;
  const rows = groups.map((g, i) => {
    const y = 4 + i * rowH;
    const w = ((width - 150) * g.share) / 100;
    return `<text x="0" y="${y + 20}" font-size="13" fill="${INK}">${esc(g.group)}</text><rect x="150" y="${y + 6}" width="${w.toFixed(1)}" height="24" rx="4" fill="${i === 1 ? TEAL : AMBER}"/><text x="${(150 + w + 8).toFixed(1)}" y="${y + 23}" font-size="13" font-weight="700" fill="${INK}">${fmt(g.share)}%</text><text x="150" y="${y + 40}" font-size="11" fill="${MUTED}">${esc(g.note)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Struktur umur penduduk 2024" style="width:100%;height:auto;display:block">${rows}</svg>`;
}
