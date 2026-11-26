// NusaData — data layer. Every figure below is a published public statistic;
// each record names its source and year, and the site shows both next to the figure.
// Figures are rounded for display; the notes say so where rounding matters.
//
// Main sources: Badan Pusat Statistik (BPS), Bank Indonesia, World Bank.
// All values were checked against the publishers' 2024 releases.

export const META = {
  country: 'Indonesia',
  updated: '26 November 2026',
  currency: 'Rupiah (Rp)',
};

// Key indicators shown on the home page. `change` is the move on the previous year.
export const INDICATORS = [
  {
    id: 'populasi',
    label: 'Penduduk',
    value: '281,6 jt',
    detail: 'jiwa, pertengahan 2024',
    change: '+0,99% dari 2023',
    source: 'BPS, Proyeksi Penduduk 2024',
    route: '#/penduduk',
  },
  {
    id: 'pdb',
    label: 'PDB nominal',
    value: 'Rp22.139 T',
    detail: 'harga berlaku, 2024',
    change: '+5,03% riil (y-on-y)',
    source: 'BPS, PDB 2024',
    route: '#/ekonomi',
  },
  {
    id: 'pdb-kapita',
    label: 'PDB per kapita',
    value: 'US$4.960',
    detail: '2024',
    change: '+US$79 dari 2023',
    source: 'BPS, PDB per Kapita 2024',
    route: '#/ekonomi',
  },
  {
    id: 'inflasi',
    label: 'Inflasi (IHK)',
    value: '1,57%',
    detail: 'y-on-y, Desember 2024',
    change: 'turun dari 2,61% (2023)',
    source: 'BPS, Inflasi Desember 2024',
    route: '#/ekonomi',
  },
  {
    id: 'pengangguran',
    label: 'Pengangguran (TPT)',
    value: '4,91%',
    detail: 'Agustus 2024',
    change: 'turun dari 5,32% (Agu 2023)',
    source: 'BPS, Sakernas Agustus 2024',
    route: '#/sosial',
  },
  {
    id: 'kemiskinan',
    label: 'Kemiskinan',
    value: '9,03%',
    detail: 'Maret 2024 · 25,22 juta jiwa',
    change: 'turun dari 9,36% (Mar 2023)',
    source: 'BPS, Kemiskinan Maret 2024',
    route: '#/sosial',
  },
  {
    id: 'gini',
    label: 'Rasio Gini',
    value: '0,379',
    detail: 'Maret 2024',
    change: 'turun dari 0,388 (Mar 2023)',
    source: 'BPS, Gini Maret 2024',
    route: '#/sosial',
  },
  {
    id: 'ipm',
    label: 'Indeks Pembangunan Manusia',
    value: '75,02',
    detail: '2024 · kategori tinggi',
    change: '+0,63 poin dari 2023',
    source: 'BPS, IPM 2024',
    route: '#/sosial',
  },
];

// Yearly series, 2020–2024. Each series carries its unit and source.
export const SERIES = {
  pdbGrowth: {
    title: 'Pertumbuhan PDB',
    unit: '% y-on-y',
    source: 'BPS, PDB 2020–2024',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [-2.07, 3.7, 5.31, 5.05, 5.03],
  },
  inflasi: {
    title: 'Inflasi tahunan (IHK)',
    unit: '% y-on-y, Desember',
    source: 'BPS, Inflasi 2020–2024',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [1.68, 1.87, 5.51, 2.61, 1.57],
  },
  pengangguran: {
    title: 'Tingkat Pengangguran Terbuka',
    unit: '% angkatan kerja, Agustus',
    source: 'BPS, Sakernas 2020–2024',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [7.07, 6.49, 5.86, 5.32, 4.91],
  },
  kemiskinan: {
    title: 'Tingkat Kemiskinan',
    unit: '% penduduk, Maret',
    source: 'BPS, Kemiskinan 2020–2024',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [10.19, 9.71, 9.54, 9.36, 9.03],
  },
  populasi: {
    title: 'Jumlah Penduduk',
    unit: 'juta jiwa, pertengahan tahun',
    source: 'BPS, Sensus 2020 & Proyeksi 2021–2024',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [270.2, 272.25, 275.77, 278.69, 281.6],
  },
};

// Share of nominal GDP by sector, 2024 (percent). Rounded; "Lainnya" covers the rest.
export const SECTORS = [
  { name: 'Industri Pengolahan', share: 18.67, note: 'termasuk makanan, tekstil, otomotif' },
  { name: 'Perdagangan Besar & Eceran', share: 12.95, note: 'termasuk reparasi kendaraan' },
  { name: 'Pertanian, Kehutanan & Perikanan', share: 12.48, note: 'tanaman pangan, perkebunan, perikanan' },
  { name: 'Konstruksi', share: 9.85, note: 'bangunan dan infrastruktur' },
  { name: 'Pertambangan & Penggalian', share: 8.45, note: 'batu bara, minyak & gas, mineral' },
  { name: 'Lainnya (11 lapangan usaha)', share: 37.6, note: 'transportasi, keuangan, jasa, dan lain-lain' },
];
export const SECTORS_SOURCE = 'BPS, PDB menurut Lapangan Usaha 2024 (dibulatkan)';

// Age structure, 2024 (percent of population).
export const AGE_GROUPS = [
  { group: '0–14 tahun', share: 24.9, note: 'anak' },
  { group: '15–64 tahun', share: 68.6, note: 'usia kerja' },
  { group: '65 tahun ke atas', share: 6.5, note: 'lansia' },
];
export const AGE_SOURCE = 'BPS, Proyeksi Penduduk 2024';

// Trade, 2024 (US$ miliar).
export const TRADE = {
  ekspor: 264.7,
  impor: 233.66,
  surplus: 31.04,
  eksporTop: [
    { name: 'Batu bara', value: 38.3 },
    { name: 'Minyak sawit (CPO & turunannya)', value: 27.0 },
    { name: 'Besi & baja', value: 26.5 },
    { name: 'Nikel & barang daripadanya', value: 7.9 },
    { name: 'Karet & barang dari karet', value: 5.8 },
  ],
  source: 'BPS, Ekspor–Impor 2024 (nilai dibulatkan ke 0,1 miliar US$)',
};

// All 38 provinces, 2024 mid-year population (millions, BPS projection, rounded to 0.01).
// `island` groups them for the island summary on the provinces page.
export const PROVINCES = [
  { name: 'Jawa Barat', pop: 49.94, island: 'Jawa' },
  { name: 'Jawa Timur', pop: 41.81, island: 'Jawa' },
  { name: 'Jawa Tengah', pop: 37.89, island: 'Jawa' },
  { name: 'Sumatera Utara', pop: 15.59, island: 'Sumatera' },
  { name: 'Banten', pop: 12.43, island: 'Jawa' },
  { name: 'DKI Jakarta', pop: 10.56, island: 'Jawa' },
  { name: 'Sulawesi Selatan', pop: 9.36, island: 'Sulawesi' },
  { name: 'Lampung', pop: 9.12, island: 'Sumatera' },
  { name: 'Sumatera Selatan', pop: 8.84, island: 'Sumatera' },
  { name: 'Riau', pop: 6.64, island: 'Sumatera' },
  { name: 'Sumatera Barat', pop: 5.83, island: 'Sumatera' },
  { name: 'Kalimantan Barat', pop: 5.8, island: 'Kalimantan' },
  { name: 'Nusa Tenggara Timur', pop: 5.68, island: 'Nusa Tenggara' },
  { name: 'Aceh', pop: 5.55, island: 'Sumatera' },
  { name: 'Nusa Tenggara Barat', pop: 5.54, island: 'Nusa Tenggara' },
  { name: 'Bali', pop: 4.39, island: 'Nusa Tenggara' },
  { name: 'Kalimantan Selatan', pop: 4.16, island: 'Kalimantan' },
  { name: 'Kalimantan Timur', pop: 3.94, island: 'Kalimantan' },
  { name: 'DI Yogyakarta', pop: 3.76, island: 'Jawa' },
  { name: 'Jambi', pop: 3.61, island: 'Sumatera' },
  { name: 'Sulawesi Tengah', pop: 3.07, island: 'Sulawesi' },
  { name: 'Sulawesi Tenggara', pop: 2.79, island: 'Sulawesi' },
  { name: 'Kalimantan Tengah', pop: 2.74, island: 'Kalimantan' },
  { name: 'Sulawesi Utara', pop: 2.72, island: 'Sulawesi' },
  { name: 'Kepulauan Riau', pop: 2.15, island: 'Sumatera' },
  { name: 'Bengkulu', pop: 2.07, island: 'Sumatera' },
  { name: 'Maluku', pop: 1.98, island: 'Maluku' },
  { name: 'Sulawesi Barat', pop: 1.52, island: 'Sulawesi' },
  { name: 'Kepulauan Bangka Belitung', pop: 1.49, island: 'Sumatera' },
  { name: 'Maluku Utara', pop: 1.44, island: 'Maluku' },
  { name: 'Papua Pegunungan', pop: 1.44, island: 'Papua' },
  { name: 'Papua Tengah', pop: 1.35, island: 'Papua' },
  { name: 'Gorontalo', pop: 1.25, island: 'Sulawesi' },
  { name: 'Papua', pop: 1.06, island: 'Papua' },
  { name: 'Kalimantan Utara', pop: 0.74, island: 'Kalimantan' },
  { name: 'Papua Barat Daya', pop: 0.61, island: 'Papua' },
  { name: 'Papua Barat', pop: 0.56, island: 'Papua' },
  { name: 'Papua Selatan', pop: 0.55, island: 'Papua' },
];
export const PROVINCES_SOURCE = 'BPS, Proyeksi Penduduk per Provinsi 2024 (dibulatkan ke 0,01 juta)';

// Social indicators, 2024.
export const SOCIAL = [
  { label: 'Angka harapan hidup', value: '74,15 tahun', source: 'BPS, IPM 2024' },
  { label: 'Harapan lama sekolah', value: '13,21 tahun', source: 'BPS, IPM 2024' },
  { label: 'Rata-rata lama sekolah', value: '9,01 tahun', source: 'BPS, IPM 2024' },
  { label: 'Pengeluaran per kapita (disesuaikan)', value: 'Rp12,34 juta/tahun', source: 'BPS, IPM 2024' },
  { label: 'Angkatan kerja', value: '152,11 juta orang', source: 'BPS, Sakernas Agustus 2024' },
  { label: 'Pekerja informal', value: '58,57% dari pekerja', source: 'BPS, Sakernas Agustus 2024' },
  { label: 'Upah minimum provinsi tertinggi', value: 'Rp5.396.761 (DKI Jakarta)', source: 'Pemprov DKI Jakarta, UMP 2025' },
  { label: 'Rumah tangga berakses internet', value: '86,62%', source: 'BPS, Susenas 2024' },
];

// Latest statistical releases (BPS release calendar).
export const RELEASES = [
  { date: '5 Nov 2024', title: 'Tingkat Pengangguran Terbuka Agustus 2024: 4,91%', tag: 'Ketenagakerjaan' },
  { date: '15 Nov 2024', title: 'Indeks Pembangunan Manusia 2024: 75,02', tag: 'Pembangunan' },
  { date: '2 Jan 2025', title: 'Inflasi Desember 2024: 1,57% (y-on-y)', tag: 'Harga' },
  { date: '5 Feb 2025', title: 'Pertumbuhan Ekonomi 2024: 5,03%', tag: 'Ekonomi' },
  { date: '1 Jul 2024', title: 'Tingkat Kemiskinan Maret 2024: 9,03%', tag: 'Kemiskinan' },
  { date: '15 Jan 2025', title: 'Ekspor 2024: US$264,70 miliar, surplus US$31,04 miliar', tag: 'Perdagangan' },
];
