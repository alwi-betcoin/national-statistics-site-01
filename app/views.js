// NusaData — page renderers. Each route renders one page into #app; every
// figure shown names its source and year right beside it.

import {
  AGE_GROUPS,
  AGE_SOURCE,
  INDICATORS,
  META,
  PROVINCES,
  PROVINCES_SOURCE,
  RELEASES,
  SECTORS,
  SECTORS_SOURCE,
  SERIES,
  SOCIAL,
  TRADE,
} from './data.js';
import { ageBars, barChart, donutChart, lineChart } from './charts.js';

function esc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function sourceLine(source) {
  return `<p class="source">Sumber: ${esc(source)}</p>`;
}

function kpiCard(ind) {
  return `<a class="kpi" href="${ind.route}">
    <span class="kpi-label">${esc(ind.label)}</span>
    <span class="kpi-value">${esc(ind.value)}</span>
    <span class="kpi-detail">${esc(ind.detail)}</span>
    <span class="kpi-change">${esc(ind.change)}</span>
    <span class="kpi-source">${esc(ind.source)}</span>
  </a>`;
}

function sectionHead(kicker, title, blurb) {
  return `<p class="kicker">${esc(kicker)}</p><h2>${esc(title)}</h2><p class="lede">${esc(blurb)}</p>`;
}

// --- Home -----------------------------------------------------------------

export function home() {
  const topProvinces = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 5);
  return `
  <section class="hero">
    <p class="kicker">Portal Statistik Indonesia · Data resmi 2024</p>
    <h1>Angka Indonesia,<br>dalam satu tempat.</h1>
    <p class="lede">NusaData merangkum statistik resmi Indonesia — penduduk, ekonomi, harga,
    ketenagakerjaan, dan pembangunan — dari publikasi Badan Pusat Statistik dan Bank
    Indonesia, lengkap dengan sumber dan tahun setiap angka.</p>
    <div class="hero-actions">
      <a class="btn primary" href="#/ekonomi">Jelajahi ekonomi</a>
      <a class="btn" href="#/provinsi">Lihat 38 provinsi</a>
    </div>
  </section>

  <section class="kpi-grid" aria-label="Indikator kunci">
    ${INDICATORS.map(kpiCard).join('')}
  </section>

  <section class="panel">
    ${sectionHead('Tren lima tahun', 'Ekonomi tumbuh 5,03% pada 2024', 'Pilih indikator untuk melihat tren 2020–2024. Inflasi melandai ke 1,57% setelah memuncak 5,51% pada 2022, sementara pengangguran turun empat tahun berturut-turut.')}
    <div class="tabs" role="tablist" aria-label="Pilih indikator tren">
      <button class="tab active" data-series="pdbGrowth">Pertumbuhan PDB</button>
      <button class="tab" data-series="inflasi">Inflasi</button>
      <button class="tab" data-series="pengangguran">Pengangguran</button>
      <button class="tab" data-series="kemiskinan">Kemiskinan</button>
    </div>
    <div id="trend-chart">${lineChart(SERIES.pdbGrowth)}</div>
    <p class="source" id="trend-source">Sumber: ${esc(SERIES.pdbGrowth.source)} · Satuan: ${esc(SERIES.pdbGrowth.unit)}</p>
  </section>

  <section class="two-col">
    <div class="panel">
      ${sectionHead('Wilayah', 'Jawa menampung 56% penduduk', 'Lima provinsi terpadat semuanya berada di Pulau Jawa. Jawa Barat sendiri berpenduduk hampir 50 juta jiwa — lebih banyak dari kebanyakan negara.')}
      ${barChart(topProvinces.map((p) => ({ label: p.name, value: p.pop, suffix: ' jt' })), { height: 210 })}
      ${sourceLine(PROVINCES_SOURCE)}
      <p><a class="btn small" href="#/provinsi">Tabel lengkap 38 provinsi →</a></p>
    </div>
    <div class="panel">
      ${sectionHead('Rilis terbaru', 'Apa yang baru dari BPS', 'Publikasi statistik resmi terbaru yang dirangkum situs ini.')}
      <ul class="releases">
        ${RELEASES.map((r) => `<li><span class="release-date">${esc(r.date)}</span><span class="release-tag">${esc(r.tag)}</span><span class="release-title">${esc(r.title)}</span></li>`).join('')}
      </ul>
      <p class="source">Sumber: Kalender Rilis BPS, bps.go.id</p>
    </div>
  </section>

  <section class="panel note">
    <h2>Cara membaca situs ini</h2>
    <p>Setiap angka di NusaData disertai sumber dan tahunnya. Angka yang dibulatkan
    diberi catatan. Situs ini bukan situs resmi BPS — ia merangkum publikasi resmi
    agar mudah dijelajahi. Untuk data mentah dan tabel lengkap, kunjungi
    <strong>bps.go.id</strong>. Terakhir diperbarui ${esc(META.updated)}.</p>
  </section>`;
}

// --- Economy ---------------------------------------------------------------

export function ekonomi() {
  return `
  <section class="page-head">
    ${sectionHead('Ekonomi', 'PDB Rp22.139 triliun, tumbuh 5,03%', 'Perekonomian Indonesia 2024: tumbuh 5,03% secara riil, inflasi terkendali di 1,57%, dan neraca perdagangan surplus US$31,04 miliar.')}
  </section>

  <section class="kpi-grid" aria-label="Indikator ekonomi">
    ${INDICATORS.filter((i) => ['pdb', 'pdb-kapita', 'inflasi'].includes(i.id)).map(kpiCard).join('')}
    <a class="kpi" href="#/sosial">
      <span class="kpi-label">Neraca perdagangan 2024</span>
      <span class="kpi-value">Surplus US$31,04 M</span>
      <span class="kpi-detail">Ekspor US$264,70 M · Impor US$233,66 M</span>
      <span class="kpi-change">Surplus tahun kelima berturut-turut</span>
      <span class="kpi-source">BPS, Ekspor–Impor 2024</span>
    </a>
  </section>

  <section class="panel">
    ${sectionHead('Pertumbuhan', 'Lima tahun pertumbuhan PDB', 'Setelah kontraksi 2,07% pada 2020, ekonomi tumbuh di atas 5% selama tiga tahun berturut-turut.')}
    ${lineChart(SERIES.pdbGrowth)}
    ${sourceLine(SERIES.pdbGrowth.source + ' · Satuan: ' + SERIES.pdbGrowth.unit)}
  </section>

  <section class="two-col">
    <div class="panel">
      ${sectionHead('Struktur ekonomi', 'Industri pengolahan penyumbang terbesar', 'Enam kelompok lapangan usaha ini membentuk seluruh PDB 2024 menurut harga berlaku.')}
      ${donutChart(SECTORS)}
      ${sourceLine(SECTORS_SOURCE)}
      <ul class="sector-notes">
        ${SECTORS.map((s) => `<li><strong>${esc(s.name)}</strong> — ${esc(s.note)}</li>`).join('')}
      </ul>
    </div>
    <div class="panel">
      ${sectionHead('Perdagangan', 'Ekspor terbesar 2024', 'Batu bara, minyak sawit, dan besi-baja adalah tiga komoditas ekspor terbesar Indonesia pada 2024.')}
      ${barChart(TRADE.eksporTop.map((e) => ({ label: e.name, value: e.value, suffix: '' })), { height: 210, maxValue: 40 })}
      <p class="source">Sumber: ${esc(TRADE.source)} · Nilai dalam miliar US$</p>
      <p class="lede">Ekspor 2024 mencapai <strong>US$264,70 miliar</strong>, impor
      <strong>US$233,66 miliar</strong>, sehingga neraca perdagangan surplus
      <strong>US$31,04 miliar</strong> — surplus tahunan kelima berturut-turut sejak 2020.</p>
    </div>
  </section>

  <section class="panel">
    ${sectionHead('Harga', 'Inflasi melandai ke 1,57%', 'Inflasi tahunan (Desember ke Desember) memuncak 5,51% pada 2022 saat harga energi global melonjak, lalu turun ke 2,61% (2023) dan 1,57% (2024) — di bawah sasaran Bank Indonesia 2,5% ± 1%.')}
    ${lineChart(SERIES.inflasi, { color: '#c96f4a' })}
    ${sourceLine(SERIES.inflasi.source + ' · Satuan: ' + SERIES.inflasi.unit)}
  </section>`;
}

// --- Population ------------------------------------------------------------

export function penduduk() {
  const total = PROVINCES.reduce((sum, p) => sum + p.pop, 0);
  return `
  <section class="page-head">
    ${sectionHead('Penduduk', '281,6 juta jiwa pada 2024', 'Indonesia adalah negara berpenduduk terbesar keempat di dunia. Pertumbuhannya melambat — 0,99% pada 2024 — dan penduduk usia kerja mencapai 68,6% dari total.')}
  </section>

  <section class="kpi-grid" aria-label="Indikator penduduk">
    ${INDICATORS.filter((i) => ['populasi'].includes(i.id)).map(kpiCard).join('')}
    <div class="kpi static">
      <span class="kpi-label">Penduduk usia kerja (15–64)</span>
      <span class="kpi-value">68,6%</span>
      <span class="kpi-detail">193,2 juta jiwa, 2024</span>
      <span class="kpi-change">Bonus demografi hingga ~2030-an</span>
      <span class="kpi-source">BPS, Proyeksi Penduduk 2024</span>
    </div>
    <div class="kpi static">
      <span class="kpi-label">Kepadatan penduduk</span>
      <span class="kpi-value">147 jiwa/km²</span>
      <span class="kpi-detail">rata-rata nasional, 2024</span>
      <span class="kpi-change">DKI Jakarta: 15.328 jiwa/km²</span>
      <span class="kpi-source">BPS, Proyeksi Penduduk 2024</span>
    </div>
    <div class="kpi static">
      <span class="kpi-label">Jumlah provinsi</span>
      <span class="kpi-value">38 provinsi</span>
      <span class="kpi-detail">513 kabupaten/kota</span>
      <span class="kpi-change">4 provinsi baru di Papua (2022)</span>
      <span class="kpi-source">Kemendagri, 2024</span>
    </div>
  </section>

  <section class="panel">
    ${sectionHead('Tren', 'Penduduk bertambah 11,4 juta dalam lima tahun', 'Dari 270,2 juta jiwa pada Sensus 2020 menjadi 281,6 juta pada pertengahan 2024.')}
    ${lineChart(SERIES.populasi)}
    ${sourceLine(SERIES.populasi.source + ' · Satuan: ' + SERIES.populasi.unit)}
  </section>

  <section class="panel">
    ${sectionHead('Struktur umur', 'Dua dari tiga penduduk berusia kerja', 'Porsi penduduk usia kerja 68,6% adalah yang tertinggi dalam sejarah Indonesia — jendela bonus demografi yang diperkirakan bertahan hingga 2030-an.')}
    ${ageBars(AGE_GROUPS)}
    ${sourceLine(AGE_SOURCE)}
  </section>

  <section class="panel">
    ${sectionHead('Sebaran', 'Jawa: 56% penduduk di 7% wilayah', `Total 38 provinsi: ${total.toFixed(1).replace('.', ',')} juta jiwa (jumlah tabel, dibulatkan; selisih dengan total nasional 281,6 juta jiwa berasal dari pembulatan per provinsi). Pulau Jawa menampung 156,4 juta jiwa; Sumatera 60,9 juta; Sulawesi 20,7 juta; Kalimantan 17,4 juta; Bali dan Nusa Tenggara 15,6 juta; Maluku 3,4 juta; Papua 5,6 juta.`)}
    <p><a class="btn small" href="#/provinsi">Buka tabel 38 provinsi →</a></p>
  </section>`;
}

// --- Provinces -------------------------------------------------------------

export function provinsi() {
  const total = PROVINCES.reduce((sum, p) => sum + p.pop, 0);
  const islands = [...new Set(PROVINCES.map((p) => p.island))].map((name) => {
    const rows = PROVINCES.filter((p) => p.island === name);
    return { name, count: rows.length, pop: rows.reduce((s, p) => s + p.pop, 0) };
  }).sort((a, b) => b.pop - a.pop);
  return `
  <section class="page-head">
    ${sectionHead('Provinsi', '38 provinsi, 281,6 juta jiwa', 'Cari provinsi, lalu urutkan tabel berdasarkan nama atau jumlah penduduk. Angka adalah proyeksi BPS pertengahan 2024, dibulatkan ke 0,01 juta.')}
  </section>

  <section class="panel">
    <div class="island-grid">
      ${islands.map((g) => `<div class="island"><span class="island-name">${esc(g.name)}</span><span class="island-pop">${g.pop.toFixed(1).replace('.', ',')} jt jiwa</span><span class="island-count">${g.count} provinsi · ${((g.pop / total) * 100).toFixed(1).replace('.', ',')}% penduduk</span></div>`).join('')}
    </div>
    ${sourceLine(PROVINCES_SOURCE)}
  </section>

  <section class="panel">
    <div class="table-tools">
      <label class="search">Cari provinsi
        <input id="province-search" type="search" placeholder="mis. Jawa Barat" autocomplete="off">
      </label>
      <div class="sort-group" role="group" aria-label="Urutkan tabel">
        <button class="btn small sort-btn active" data-sort="pop-desc">Terpadat dulu</button>
        <button class="btn small sort-btn" data-sort="pop-asc">Tersedikit dulu</button>
        <button class="btn small sort-btn" data-sort="name">Nama A–Z</button>
      </div>
      <button class="btn small" id="download-csv" type="button">Unduh CSV</button>
    </div>
    <p class="table-count" id="table-count"></p>
    <div class="table-wrap">
      <table id="province-table">
        <thead><tr><th>#</th><th>Provinsi</th><th>Pulau</th><th>Penduduk 2024 (juta)</th><th>Pangsa</th></tr></thead>
        <tbody id="province-rows"></tbody>
      </table>
    </div>
    <p id="table-empty" class="empty" hidden>Tidak ada provinsi yang cocok dengan pencarian Anda.</p>
    ${sourceLine(PROVINCES_SOURCE + ' · Total tabel ' + total.toFixed(2).replace('.', ',') + ' juta jiwa; selisih dengan total nasional 281,6 juta jiwa berasal dari pembulatan per provinsi.')}
  </section>`;
}

// --- Social ----------------------------------------------------------------

export function sosial() {
  return `
  <section class="page-head">
    ${sectionHead('Sosial', 'Kemiskinan 9,03% — terendah sepanjang sejarah', 'Maret 2024 mencatat tingkat kemiskinan terendah sejak pencatatan dimulai, sementara pengangguran turun ke 4,91% dan IPM naik ke 75,02.')}
  </section>

  <section class="kpi-grid" aria-label="Indikator sosial">
    ${INDICATORS.filter((i) => ['kemiskinan', 'pengangguran', 'gini', 'ipm'].includes(i.id)).map(kpiCard).join('')}
  </section>

  <section class="two-col">
    <div class="panel">
      ${sectionHead('Kemiskinan', 'Turun 1,16 poin dalam lima tahun', 'Dari 10,19% pada Maret 2020 menjadi 9,03% pada Maret 2024 — 25,22 juta jiwa masih berada di bawah garis kemiskinan.')}
      ${lineChart(SERIES.kemiskinan, { color: '#7fb069' })}
      ${sourceLine(SERIES.kemiskinan.source + ' · Satuan: ' + SERIES.kemiskinan.unit)}
    </div>
    <div class="panel">
      ${sectionHead('Ketenagakerjaan', 'Pengangguran terendah sejak 2019', 'Tingkat pengangguran terbuka Agustus 2024 sebesar 4,91%, turun dari puncak 7,07% pada Agustus 2020.')}
      ${lineChart(SERIES.pengangguran, { color: '#2a7f9e' })}
      ${sourceLine(SERIES.pengangguran.source + ' · Satuan: ' + SERIES.pengangguran.unit)}
      <p class="lede">Angkatan kerja Agustus 2024 mencapai <strong>152,11 juta orang</strong>;
      58,57% pekerja berada di sektor informal.</p>
    </div>
  </section>

  <section class="panel">
    ${sectionHead('Pembangunan manusia', 'IPM 75,02 — kategori tinggi', 'Indeks Pembangunan Manusia naik 0,63 poin pada 2024, didorong harapan lama sekolah 13,21 tahun dan angka harapan hidup 74,15 tahun.')}
    <dl class="fact-list">
      ${SOCIAL.map((s) => `<div class="fact"><dt>${esc(s.label)}</dt><dd>${esc(s.value)}</dd><dd class="fact-source">${esc(s.source)}</dd></div>`).join('')}
    </dl>
  </section>`;
}

// --- About -----------------------------------------------------------------

export function tentang() {
  return `
  <section class="page-head">
    ${sectionHead('Tentang', 'Tentang NusaData', 'NusaData adalah situs perangkum statistik Indonesia yang dibuat untuk lomba situs statistik nasional make.fun 2026. Situs ini merangkum — bukan menggantikan — publikasi resmi.')}
  </section>

  <section class="panel">
    <h2>Sumber data</h2>
    <ul class="source-list">
      <li><strong>Badan Pusat Statistik (BPS)</strong> — bps.go.id: PDB, inflasi, kemiskinan, pengangguran, IPM, proyeksi penduduk, ekspor–impor.</li>
      <li><strong>Bank Indonesia</strong> — bi.go.id: sasaran inflasi dan data moneter.</li>
      <li><strong>Kementerian Dalam Negeri</strong> — jumlah provinsi dan kabupaten/kota.</li>
      <li><strong>Pemerintah Provinsi DKI Jakarta</strong> — upah minimum provinsi 2025.</li>
    </ul>
    <p class="lede">Setiap angka di situs ini menampilkan sumber dan tahunnya di tempat angka
    itu muncul. Angka dibulatkan untuk keterbacaan; catatan pembulatan ditulis di
    samping sumbernya. Bila sebuah angka di sini berbeda dari publikasi terbaru,
    publikasi resmilah yang berlaku.</p>
  </section>

  <section class="panel">
    <h2>Metodologi singkat</h2>
    <ul class="source-list">
      <li>Pertumbuhan PDB dan inflasi memakai perbandingan tahun-ke-tahun (y-on-y).</li>
      <li>Tingkat pengangguran memakai definisi Sakernas BPS untuk Agustus tiap tahun.</li>
      <li>Tingkat kemiskinan memakai garis kemiskinan BPS per Maret tiap tahun.</li>
      <li>Populasi memakai Sensus Penduduk 2020 dan proyeksi BPS 2021–2024.</li>
      <li>Grafik digambar dari angka yang sama dengan yang tertulis di halaman — tidak ada angka ilustrasi.</li>
    </ul>
  </section>

  <section class="panel">
    <h2>Teknis</h2>
    <p class="lede">Situs statis tanpa build step dan tanpa permintaan jaringan: seluruh konten
    berasal dari berkas situs sendiri. Grafik digambar sebagai SVG dari data lokal.
    Situs berfungsi di desktop dan ponsel, dan seluruh kontrol — navigasi, tab tren,
    pencarian provinsi, pengurutan tabel, dan unduhan CSV — berjalan di peramban.</p>
  </section>`;
}

export function missing() {
  return `
  <section class="panel">
    <p class="kicker">Halaman tidak ditemukan</p>
    <h2>Statistik yang Anda cari belum ada di sini.</h2>
    <p class="lede">Tautan ini tidak mengarah ke halaman NusaData. Coba salah satu bagian di bawah.</p>
    <p><a class="btn primary" href="#/">Kembali ke Beranda</a>
    <a class="btn" href="#/provinsi">Tabel provinsi</a></p>
  </section>`;
}
