// NusaData — router and controls. Hash routes, one page per route; the
// controls on each page (trend tabs, province search/sort, CSV download)
// are wired here after every render.
//
//   #/            Beranda
//   #/ekonomi     Ekonomi
//   #/penduduk    Penduduk
//   #/provinsi    Tabel 38 provinsi
//   #/sosial      Sosial
//   #/tentang     Tentang & sumber
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { PROVINCES, SERIES } from './data.js';
import { lineChart } from './charts.js';
import { ekonomi, home, missing, penduduk, provinsi, sosial, tentang } from './views.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('nav a')];

const ROUTES = {
  '': home,
  ekonomi,
  penduduk,
  provinsi,
  sosial,
  tentang,
};

const TITLES = {
  '': 'NusaData — Portal Statistik Indonesia',
  ekonomi: 'Ekonomi | NusaData',
  penduduk: 'Penduduk | NusaData',
  provinsi: 'Provinsi | NusaData',
  sosial: 'Sosial | NusaData',
  tentang: 'Tentang | NusaData',
};

function fmtId(value) {
  return String(value).replace('.', ',');
}

function renderTrend(key) {
  const series = SERIES[key];
  const chart = document.getElementById('trend-chart');
  const source = document.getElementById('trend-source');
  if (!chart || !series) return;
  chart.innerHTML = lineChart(series);
  if (source) source.textContent = `Sumber: ${series.source} · Satuan: ${series.unit}`;
  for (const tab of document.querySelectorAll('.tab')) {
    tab.classList.toggle('active', tab.dataset.series === key);
  }
}

function renderProvinceRows(rows) {
  const body = document.getElementById('province-rows');
  const count = document.getElementById('table-count');
  const empty = document.getElementById('table-empty');
  if (!body) return;
  const total = PROVINCES.reduce((sum, p) => sum + p.pop, 0);
  body.innerHTML = rows.map((p, i) => {
    const share = ((p.pop / total) * 100).toFixed(1).replace('.', ',');
    return `<tr><td>${i + 1}</td><td>${p.name}</td><td>${p.island}</td><td>${fmtId(p.pop.toFixed(2))}</td><td>${share}%</td></tr>`;
  }).join('');
  if (count) count.textContent = `Menampilkan ${rows.length} dari 38 provinsi.`;
  if (empty) empty.hidden = rows.length !== 0;
}

function wireProvinces() {
  const search = document.getElementById('province-search');
  const buttons = [...document.querySelectorAll('.sort-btn')];
  const download = document.getElementById('download-csv');
  if (!search || !buttons.length) return;
  let sort = 'pop-desc';
  let query = '';
  const apply = () => {
    const needle = query.trim().toLowerCase();
    let rows = PROVINCES.filter((p) => !needle || p.name.toLowerCase().includes(needle) || p.island.toLowerCase().includes(needle));
    if (sort === 'pop-desc') rows = [...rows].sort((a, b) => b.pop - a.pop);
    if (sort === 'pop-asc') rows = [...rows].sort((a, b) => a.pop - b.pop);
    if (sort === 'name') rows = [...rows].sort((a, b) => a.name.localeCompare(b.name, 'id'));
    renderProvinceRows(rows);
  };
  search.addEventListener('input', () => {
    query = search.value;
    apply();
  });
  for (const btn of buttons) {
    btn.addEventListener('click', () => {
      sort = btn.dataset.sort;
      for (const other of buttons) other.classList.toggle('active', other === btn);
      apply();
    });
  }
  if (download) {
    download.addEventListener('click', () => {
      const lines = ['Provinsi,Pulau,Penduduk 2024 (juta)'];
      for (const p of [...PROVINCES].sort((a, b) => b.pop - a.pop)) {
        lines.push(`"${p.name}",${p.island},${p.pop.toFixed(2)}`);
      }
      const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'nusadata-provinsi-2024.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }
  apply();
}

function render() {
  window.__shotReady = false;
  const route = (location.hash.match(/^#\/([^/?]+)/) || [])[1] || '';
  const view = ROUTES[route] || null;
  document.title = TITLES[route] ?? 'NusaData — Portal Statistik Indonesia';
  app.innerHTML = view ? view() : missing();
  for (const link of navLinks) {
    const target = (link.getAttribute('href') || '').replace('#/', '');
    link.classList.toggle('active', target === route);
    if (target === '') link.classList.toggle('active', route === '');
  }
  if (route === '') {
    for (const tab of document.querySelectorAll('.tab')) {
      tab.addEventListener('click', () => renderTrend(tab.dataset.series));
    }
  }
  if (route === 'provinsi') wireProvinces();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
