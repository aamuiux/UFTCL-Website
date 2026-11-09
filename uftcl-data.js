/* UFTCL mock market data + chart helpers. Deterministic (seeded) so every page agrees. */
(function () {
  function rng(seed) { let s = (seed >>> 0) || 1; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function hash(str) { let h = 2166136261; for (const c of String(str)) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; }
  const round = (n, d = 2) => Math.round(n * 10 ** d) / 10 ** d;
  const fmt = (n, d = 2) => (n == null || isNaN(n)) ? '-' : Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  const fmtInt = n => fmt(n, 0);
  const sign = (n, d = 2) => (n > 0 ? '+' : '') + fmt(n, d);
  const UP = 'var(--green-700)', DOWN = 'var(--red-700)', FLAT = 'var(--neutral-600)';
  const tone = n => n > 0 ? UP : n < 0 ? DOWN : FLAT;
  const arrow = n => n > 0 ? '▲' : n < 0 ? '▼' : '■';

  const RAW = [['GP','Telecommunication',285],['SQURPHARMA','Pharmaceuticals & Chemicals',214],['BATBC','Food & Allied',372],['BRACBANK','Bank',48.6],['BEXIMCO','Miscellaneous',115.6],['WALTONHIL','Engineering',492],['RENATA','Pharmaceuticals & Chemicals',445.5],['BXPHARMA','Pharmaceuticals & Chemicals',98.4],['ROBI','Telecommunication',28.9],['LHBL','Cement',62.3],['UPGDCL','Fuel & Power',128.7],['SUMITPOWER','Fuel & Power',18.4],['ISLAMIBANK','Bank',34.2],['CITYBANK','Bank',21.8],['EBL','Bank',27.4],['DUTCHBANGL','Bank',58.1],['OLYMPIC','Food & Allied',142.3],['MARICO','Pharmaceuticals & Chemicals',2410],['UNILEVERCL','Pharmaceuticals & Chemicals',2210],['BSRMLTD','Engineering',88.6],['GPHISPAT','Engineering',31.2],['ORIONPHARM','Pharmaceuticals & Chemicals',64.8],['BSCCL','Telecommunication',168.4],['GENEXIL','IT Sector',38.7],['ADNTEL','IT Sector',96.2],['AAMRANET','IT Sector',42.5],['DAFODILCOM','IT Sector',155],['QUASEMIND','Engineering',38.7],['PTL','Textile',58.9],['ENVOYTEX','Textile',44.1],['SQUARETEXT','Textile',61.4],['MALEKSPIN','Textile',24.8],['PIONEERINS','Insurance',62.7],['GREENDELT','Insurance',58.3],['RUPALILIFE','Insurance',112.6],['DELTALIFE','Insurance',94.2],['IDLC','Financial Institutions',42.6],['LANKABAFIN','Financial Institutions',19.8],['IPDC','Financial Institutions',38.4],['DBH','Financial Institutions',52.1],['HEIDELBCEM','Cement',224.5],['CONFIDCEM','Cement',72.8],['PREMIERCEM','Cement',48.9],['RAKCERAMIC','Ceramics',34.6],['SHINEPUKUR','Ceramics',21.3],['BATASHOE','Tannery',892],['APEXFOOT','Tannery',248.6],['FUWANGFOOD','Food & Allied',18.2],['GOLDENHARV','Food & Allied',14.6],['MPETROLEUM','Fuel & Power',214.3],['PADMAOIL','Fuel & Power',198.5],['JAMUNAOIL','Fuel & Power',176.2],['TITASGAS','Fuel & Power',32.4],['1JANATAMF','Mutual Funds',3.4],['1STPRIMFMF','Mutual Funds',12.4],['ICBAMCL2ND','Mutual Funds',6.8],['SEAPEARL','Miscellaneous',68.4],['SALVOCHEM','Pharmaceuticals & Chemicals',32.1],['KOHINOOR','Pharmaceuticals & Chemicals',512.3],['ACI','Pharmaceuticals & Chemicals',224.6],['RENWICKJA','Engineering',612],['NAHEEACP','Engineering',41.5],['MONNOCERA','Ceramics',96.8],['NRBCBANK','Bank',14.2],['PRIMEBANK','Bank',22.6]];

  const stocks = RAW.map(([code, sector, base], i) => {
    const r = rng(hash(code) + 7);
    const ycp = base;
    let pct = (r() - 0.46) * 9; if (r() < 0.1) pct = 0; pct = Math.max(-10, Math.min(10, pct));
    const ltp = round(ycp * (1 + pct / 100), 1);
    const change = round(ltp - ycp, 2); const changePct = round(change / ycp * 100, 2);
    const open = round(ycp * (1 + (r() - 0.5) * 0.02), 1);
    const high = round(Math.max(ltp, open, ycp) * (1 + r() * 0.025), 1);
    const low = round(Math.min(ltp, open, ycp) * (1 - r() * 0.025), 1);
    const volume = Math.round((r() ** 2) * 3.2e6 / Math.sqrt(base / 30) + 8000);
    const value = round(volume * ltp / 1e6, 2);
    const trades = Math.round(volume / (60 + r() * 400)) + 12;
    const eps = round(base / (8 + r() * 30), 2);
    const pe = round(ltp / eps, 2);
    const nav = round(base * (0.3 + r() * 0.9), 2);
    const w52l = round(Math.min(low, base * (0.62 + r() * 0.2)), 1), w52h = round(Math.max(high, base * (1.1 + r() * 0.5)), 1);
    const cat = r() < 0.78 ? 'A' : r() < 0.6 ? 'B' : r() < 0.5 ? 'N' : 'Z';
    const shares = Math.round((50 + r() * 1400) * 1e6);
    const mcap = round(shares * ltp / 1e6, 1);
    return { code, sector, ycp, ltp, change, changePct, open, high, low, close: ltp, volume, value, trades, eps, pe, nav, navPrice: round(nav / ltp, 2), w52l, w52h, cat, mcap,
      beta: round((r() - 0.35) * 2.4, 2), rsi: round(18 + r() * 66, 1), macd: round((r() - 0.5) * 6, 2), stoch: round(r() * 100, 1),
      director: round(20 + r() * 45, 2), board: code.endsWith('MF') ? 'Mutual Fund' : 'Main', breaker: base > 200 ? 10 : base > 100 ? 8.75 : 10,
      index: Math.round((r() - 0.45) * 9 * 100) / 100 };
  });
  stocks.forEach(s => { s.lower = round(s.ycp * (1 - s.breaker / 100), 1); s.upper = round(s.ycp * (1 + s.breaker / 100), 1); s.contrib = round(s.change * s.mcap / 2.2e5, 2); });
  const bySym = Object.fromEntries(stocks.map(s => [s.code, s]));
  const top = (key, n = 10, asc = false) => stocks.slice().sort((a, b) => asc ? a[key] - b[key] : b[key] - a[key]).slice(0, n);

  const gainers = stocks.filter(s => s.change > 0).length, losers = stocks.filter(s => s.change < 0).length, unchanged = stocks.length - gainers - losers;
  const scale = 6.1; // mock universe is ~60 stocks; scale to DSE's ~395
  const breadth = { adv: Math.round(gainers * scale), dec: Math.round(losers * scale), unch: Math.round(unchanged * scale) };
  breadth.total = breadth.adv + breadth.dec + breadth.unch;
  const totals = { value: round(stocks.reduce((a, s) => a + s.value, 0) * 2.9, 2), volume: stocks.reduce((a, s) => a + s.volume, 0) * 3, trades: stocks.reduce((a, s) => a + s.trades, 0) * 3, mcap: 6987421.5 };

  function walk(seed, n, start, vol, drift = 0) { const r = rng(seed); const out = [start]; for (let i = 1; i < n; i++) out.push(out[i - 1] * (1 + (r() - 0.5 + drift) * vol)); return out; }
  function minuteLabels(n) { const out = []; for (let i = 0; i < n; i++) { const m = 600 + Math.round(i * 270 / (n - 1)); out.push(String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0')); } return out; }
  function mkIndex(name, prev, seed, drift) {
    const pts = walk(seed, 136, prev, 0.0016, drift);
    const v = round(pts[pts.length - 1], 2); const ch = round(v - prev, 2);
    const vols = walk(seed + 3, 136, 1, 0.5).map((x, i) => Math.abs(x) * (i < 15 || i > 120 ? 1.8 : 1));
    return { name, value: v, prev, change: ch, pct: round(ch / prev * 100, 2), open: round(pts[0], 2), high: round(Math.max(...pts), 2), low: round(Math.min(...pts), 2), series: pts, vols, ret6m: round((rng(seed)() - 0.6) * 18, 2), ret1y: round((rng(seed + 1)() - 0.7) * 30, 2), w52l: round(prev * 0.84, 2), w52h: round(prev * 1.17, 2) };
  }
  const indices = { DSEX: mkIndex('DSEX', 5234.67, 11, 0.06), DSES: mkIndex('DSES', 1148.32, 23, 0.05), DS30: mkIndex('DS30', 1987.14, 37, 0.07) };
  const times = minuteLabels(136);

  const SECTORS = [...new Set(stocks.map(s => s.sector))];
  const sectors = SECTORS.map(name => {
    const list = stocks.filter(s => s.sector === name);
    const value = round(list.reduce((a, s) => a + s.value, 0) * 2.9, 2);
    const chg = round(list.reduce((a, s) => a + s.changePct, 0) / list.length, 2);
    const r = rng(hash(name));
    return { name, value, yValue: round(value * (0.7 + r() * 0.6), 2), changePct: chg, gain: list.filter(s => s.change > 0).length * 3, lose: list.filter(s => s.change < 0).length * 3, unch: list.filter(s => s.change === 0).length * 3 + 1, pe: round(list.reduce((a, s) => a + s.pe, 0) / list.length, 2), count: list.length, stocks: list };
  }).sort((a, b) => b.value - a.value);
  sectors.forEach(s => { s.share = round(s.value / totals.value * 100, 2); });

  // daily OHLC for a symbol
  function daily(code, n = 260) {
    const s = bySym[code] || stocks[0]; const r = rng(hash(code) + 99);
    const out = []; let p = s.ycp * (0.75 + r() * 0.4); const d0 = new Date(2026, 10, 5);
    for (let i = n - 1; i >= 0; i--) {
      const o = p; const c = o * (1 + (r() - 0.49) * 0.045); const h = Math.max(o, c) * (1 + r() * 0.015); const l = Math.min(o, c) * (1 - r() * 0.015);
      const d = new Date(d0); d.setDate(d0.getDate() - Math.round(i * 7 / 5));
      out.push({ date: d, o: round(o, 1), h: round(h, 1), l: round(l, 1), c: round(c, 1), v: Math.round(s.volume * (0.3 + r() * 1.6)) }); p = c;
    }
    const k = s.ltp / out[out.length - 1].c; out.forEach(b => { b.o = round(b.o * k, 1); b.h = round(b.h * k, 1); b.l = round(b.l * k, 1); b.c = round(b.c * k, 1); });
    out.forEach((b, i) => { const prev = i ? out[i - 1].c : b.o; b.chg = round(b.c - prev, 2); b.chgPct = round(b.chg / prev * 100, 2); b.value = round(b.v * b.c / 1e6, 2); b.trades = Math.round(b.v / 220); });
    return out;
  }
  const sma = (arr, n) => arr.map((_, i) => i < n - 1 ? null : arr.slice(i - n + 1, i + 1).reduce((a, b) => a + b, 0) / n);
  function rsiSeries(cl, n = 14) { const out = cl.map(() => null); let g = 0, l = 0; for (let i = 1; i < cl.length; i++) { const d = cl[i] - cl[i - 1]; if (i <= n) { g += Math.max(d, 0); l += Math.max(-d, 0); if (i === n) out[i] = 100 - 100 / (1 + g / (l || 1e-9)); } else { g = (g * (n - 1) + Math.max(d, 0)) / n; l = (l * (n - 1) + Math.max(-d, 0)) / n; out[i] = 100 - 100 / (1 + g / (l || 1e-9)); } } return out; }

  // minute VPA trades
  function vpa(code, n = 90) {
    const s = bySym[code] || stocks[0]; const r = rng(hash(code) + 5); let p = s.open; const out = [];
    for (let i = 0; i < n; i++) {
      const m = 600 + Math.round(i * 270 / n); p = Math.max(s.low, Math.min(s.high, round(p + (r() - 0.48) * s.ycp * 0.006, 1)));
      const vol = Math.round(s.volume / n * (0.2 + r() * 2.2)); const buy = Math.round(vol * (0.25 + r() * 0.5));
      out.push({ time: String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'), price: p, vol, buy, sell: vol - buy, trades: Math.max(1, Math.round(vol / 300)), value: round(vol * p / 1e5, 2) });
    }
    out[out.length - 1].price = s.ltp;
    out.forEach((x, i) => { x.chg = i ? round(x.price - out[i - 1].price, 2) : round(x.price - s.ycp, 2); });
    return out;
  }
  function depth(code, levels = 10) {
    const s = bySym[code] || stocks[0]; const r = rng(hash(code) + 17); const tick = s.ltp > 100 ? 0.5 : 0.1;
    const bids = [], asks = []; let cb = 0, ca = 0;
    for (let i = 0; i < levels; i++) { const bq = Math.round(800 + r() * 14000); const aq = Math.round(800 + r() * 14000); cb += bq; ca += aq; bids.push({ price: round(s.ltp - tick * (i + 1), 1), qty: bq, cum: cb, orders: 1 + Math.round(r() * 14) }); asks.push({ price: round(s.ltp + tick * i, 1), qty: aq, cum: ca, orders: 1 + Math.round(r() * 14) }); }
    return { bids, asks, buyPct: round(cb / (cb + ca) * 100, 2), sellPct: round(ca / (cb + ca) * 100, 2), totalBid: cb, totalAsk: ca };
  }
  const NEWS_T = ['Board meeting to consider audited financial statements for the year ended 30 June 2026', 'Declared 25% cash dividend; record date fixed', 'Q1 un-audited EPS Tk. 1.42 against Tk. 1.08 for the same period last year', 'Credit rating: AA (long term) and ST-2 (short term) by CRISL', 'Sponsor director expressed intention to buy 500,000 shares', 'Resumption of trading after record date', 'Approval of BSEC for issuance of 10% stock dividend', 'NAV per share Tk. 48.21 as on 30 September 2026', 'Price sensitive information: commencement of commercial operation of new unit', 'Trading suspension for record date'];
  const news = Array.from({ length: 24 }, (_, i) => { const r = rng(400 + i); const s = stocks[Math.floor(r() * stocks.length)]; const t = NEWS_T[Math.floor(r() * NEWS_T.length)]; const h = 9 + Math.floor(r() * 7); return { id: i, code: s.code, title: `${s.code}: ${t}`, short: t, time: `${String(h).padStart(2, '0')}:${String(Math.floor(r() * 60)).padStart(2, '0')}`, date: new Date(2026, 10, 5 - Math.floor(i / 4)), psi: r() < 0.35 }; });
  const blocks = stocks.slice().sort((a, b) => hash(a.code + 'b') - hash(b.code + 'b')).slice(0, 10).map(s => { const r = rng(hash(s.code) + 3); const q = Math.round((20 + r() * 400) * 1000); return { code: s.code, qty: q, value: round(q * s.ycp / 1e6, 2), trades: 1 + Math.round(r() * 6), max: round(s.ycp * 1.01, 1), min: round(s.ycp * 0.99, 1) }; });
  const blockPct = round(blocks.reduce((a, b) => a + b.value, 0) / totals.value * 100, 2);
  const EV_T = ['AGM', 'EGM', 'Record date', 'Board meeting', 'Dividend disbursement', 'IPO lottery'];
  const events = Array.from({ length: 30 }, (_, i) => { const r = rng(900 + i); const s = stocks[Math.floor(r() * stocks.length)]; let dd = 1 + Math.floor(r() * 29); if (dd === 6) dd = 7; const d = new Date(2026, 10, dd); return { code: s.code, type: EV_T[Math.floor(r() * EV_T.length)], date: d, time: ['10:30 AM', '11:00 AM', '3:00 PM', '4:30 PM'][Math.floor(r() * 4)], venue: r() < 0.5 ? 'Digital platform' : 'Company head office, Dhaka' }; }).sort((a, b) => a.date - b.date);
  const ipos = [
    { company: 'Alpha Agro Industries PLC', code: 'ALPHAAGRO', board: 'Main', method: 'Fixed Price', status: 'open', subStart: '02 Nov 2026', subEnd: '09 Nov 2026', price: 10, size: 750, lot: 500, sector: 'Food & Allied' },
    { company: 'Meghna Green Energy PLC', code: 'MGEPL', board: 'Main', method: 'Book Building', status: 'open', subStart: '04 Nov 2026', subEnd: '11 Nov 2026', price: 32, size: 1500, lot: 200, sector: 'Fuel & Power' },
    { company: 'Nexus Pharma PLC', code: 'NEXUSPH', board: 'Main', method: 'Book Building', status: 'upcoming', subStart: '23 Nov 2026', subEnd: '30 Nov 2026', price: 45, size: 1200, lot: 100, sector: 'Pharmaceuticals & Chemicals' },
    { company: 'Delta Fintech PLC', code: 'DELTAFIN', board: 'SME', method: 'Fixed Price', status: 'upcoming', subStart: '07 Dec 2026', subEnd: '14 Dec 2026', price: 10, size: 300, lot: 1000, sector: 'IT Sector' },
    { company: 'IBBL 2nd Mudaraba Bond', code: 'IBBT2BOND3', board: 'ATB', method: 'Fixed Price', status: 'past', subStart: '04 Aug 2024', subEnd: '11 Aug 2024', price: 5000, size: 5000, lot: 1, sector: 'Corporate Bond', listing: 4985, now: 5020 },
    { company: 'Techno Drugs Ltd', code: 'TECHNODRUG', board: 'Main', method: 'Book Building', status: 'past', subStart: '09 Jun 2024', subEnd: '16 Jun 2024', price: 24, size: 1000, lot: 200, sector: 'Pharmaceuticals & Chemicals', listing: 41.2, now: 34.6 },
    { company: 'Asiatic Lab PLC', code: 'ASIATICLAB', board: 'Main', method: 'Book Building', status: 'past', subStart: '14 Dec 2023', subEnd: '21 Dec 2023', price: 40, size: 950, lot: 100, sector: 'Pharmaceuticals & Chemicals', listing: 62.5, now: 51.8 }
  ];

  const NAMES = { GP: 'Grameenphone Ltd.', SQURPHARMA: 'Square Pharmaceuticals PLC', BATBC: 'British American Tobacco Bangladesh Company Ltd.', BRACBANK: 'BRAC Bank PLC', BEXIMCO: 'Bangladesh Export Import Company Ltd.', WALTONHIL: 'Walton Hi-Tech Industries PLC', RENATA: 'Renata PLC', BXPHARMA: 'Beximco Pharmaceuticals Ltd.', ROBI: 'Robi Axiata PLC', LHBL: 'LafargeHolcim Bangladesh PLC', UPGDCL: 'United Power Generation & Distribution Co. Ltd.', SUMITPOWER: 'Summit Power Ltd.', ISLAMIBANK: 'Islami Bank Bangladesh PLC', CITYBANK: 'The City Bank PLC', EBL: 'Eastern Bank PLC', DUTCHBANGL: 'Dutch-Bangla Bank PLC', OLYMPIC: 'Olympic Industries Ltd.', MARICO: 'Marico Bangladesh Ltd.', UNILEVERCL: 'Unilever Consumer Care Ltd.', BSRMLTD: 'BSRM Ltd.', GPHISPAT: 'GPH Ispat Ltd.', ORIONPHARM: 'Orion Pharma Ltd.', BSCCL: 'Bangladesh Submarine Cable Company Ltd.', GENEXIL: 'Genex Infosys Ltd.', ADNTEL: 'ADN Telecom Ltd.', AAMRANET: 'aamra networks Ltd.', DAFODILCOM: 'Daffodil Computers Ltd.', PTL: 'Paramount Textile PLC', ENVOYTEX: 'Envoy Textiles Ltd.', SQUARETEXT: 'Square Textiles PLC', MALEKSPIN: 'Malek Spinning Mills PLC', PIONEERINS: 'Pioneer Insurance Company Ltd.', GREENDELT: 'Green Delta Insurance PLC', IDLC: 'IDLC Finance PLC', LANKABAFIN: 'LankaBangla Finance PLC', IPDC: 'IPDC Finance PLC', DBH: 'DBH Finance PLC', HEIDELBCEM: 'Heidelberg Materials Bangladesh PLC', CONFIDCEM: 'Confidence Cement PLC', PREMIERCEM: 'Premier Cement Mills PLC', RAKCERAMIC: 'RAK Ceramics (Bangladesh) PLC', BATASHOE: 'Bata Shoe Company (Bangladesh) PLC', APEXFOOT: 'Apex Footwear Ltd.', MPETROLEUM: 'Meghna Petroleum Ltd.', PADMAOIL: 'Padma Oil Company Ltd.', JAMUNAOIL: 'Jamuna Oil Company Ltd.', TITASGAS: 'Titas Gas Transmission & Distribution Co. Ltd.', '1JANATAMF': 'First Janata Bank Mutual Fund', '1STPRIMFMF': 'First Prime Finance First Mutual Fund', ICBAMCL2ND: 'ICB AMCL Second Mutual Fund', SEAPEARL: 'Sea Pearl Beach Resort & Spa Ltd.' };
  const company = code => NAMES[code] || (code.charAt(0) + code.slice(1).toLowerCase() + ' PLC');
  function profile(code) {
    const s = bySym[code] || stocks[0]; const r = rng(hash(code) + 333);
    const shares = Math.round(s.mcap * 1e6 / s.ltp); const paid = round(shares * 10 / 1e6, 2);
    const auth = Math.ceil(paid * (1.6 + r() * 3) / 500) * 500;
    let hold = [s.director, r() < 0.3 ? 2 + r() * 18 : 0, 6 + r() * 24, r() * 12];
    const sum = hold.reduce((a, b) => a + b, 0); if (sum > 88) hold = hold.map(h => h * 88 / sum);
    hold.push(100 - hold.reduce((a, b) => a + b, 0)); hold = hold.map(h => round(h, 2));
    const prev = hold.map((h, i) => i === 0 ? h : round(Math.max(0, h + (r() - 0.5) * 2.4), 2)); prev[4] = round(100 - prev.slice(0, 4).reduce((a, b) => a + b, 0), 2);
    const holding = ['Sponsor / director', 'Government', 'Institute', 'Foreign', 'Public'].map((label, i) => ({ label, now: hold[i], prev: prev[i] }));
    const yearEnd = /Bank|Insurance|Financial|Telecom/.test(s.sector) ? 'December' : 'June';
    const years = [2021, 2022, 2023, 2024, 2025].map((y, i) => { const k = 0.7 + i * 0.075 + (r() - 0.5) * 0.12; const eps = round(s.eps * k, 2); const nav = round(s.nav * (0.82 + i * 0.045), 2); return { year: y, eps, nav, pe: round(s.ltp * (0.8 + r() * 0.5) / Math.max(eps, 0.01), 2), profit: round(eps * shares / 1e6, 2), cash: eps > 0 && r() < 0.85 ? Math.round(eps * (0.3 + r() * 0.5) / 10 * 100) : 0, stock: r() < 0.3 ? Math.round(2 + r() * 10) : 0 }; });
    const news = Array.from({ length: 6 }, (_, i) => { const t = NEWS_T[Math.floor(r() * NEWS_T.length)]; const d = new Date(2026, 10, 5 - Math.round(i * 9 + r() * 6)); return { title: t, date: d, psi: r() < 0.4 }; });
    const credit = { lt: ['AAA', 'AA+', 'AA1', 'AA', 'AA-', 'A+', 'A1', 'A'][Math.floor(r() * 8)], st: r() < 0.6 ? 'ST-1' : 'ST-2', agency: ['CRISL', 'ECRL', 'ARGUS', 'WASO'][Math.floor(r() * 4)] };
    return { credit, name: company(code), shares, paid, auth, face: 10, lot: 1, listed: 1986 + Math.floor(r() * 36), yearEnd, lastAgm: new Date(2025, Math.floor(r() * 12), 1 + Math.floor(r() * 27)), freeFloat: round(100 - hold[0] - hold[1], 2), reserve: round(paid * (0.4 + r() * 3), 2), holding, years, news,
      address: ['Gulshan Avenue, Dhaka 1212', 'Motijheel C/A, Dhaka 1000', 'Tejgaon I/A, Dhaka 1208', 'Banani, Dhaka 1213', 'Agrabad C/A, Chattogram 4100'][Math.floor(r() * 5)], phone: '+880 2 ' + (9000000 + Math.floor(r() * 999999)), web: 'www.' + code.toLowerCase().replace(/^\d+/, '') + '.com.bd', email: 'info@' + code.toLowerCase().replace(/^\d+/, '') + '.com.bd' };
  }

  // chart helpers
  function scaleY(vals, h, pad = 4) { const v = vals.filter(x => x != null); const mn = Math.min(...v), mx = Math.max(...v); const span = (mx - mn) || 1; return { min: mn, max: mx, y: x => pad + (h - 2 * pad) * (1 - (x - mn) / span) }; }
  function linePath(vals, w, h, opt = {}) {
    const sc = opt.scale || scaleY(vals, h, opt.pad ?? 4); const n = vals.length; let d = '', started = false;
    vals.forEach((v, i) => { if (v == null) return; const x = (i / (n - 1 || 1)) * w; d += (started ? 'L' : 'M') + x.toFixed(2) + ' ' + sc.y(v).toFixed(2); started = true; });
    return { line: d, area: d + `L${w} ${h}L0 ${h}Z`, min: sc.min, max: sc.max, y: sc.y };
  }
  function bars(vals, w, h, gap = 0.2) { const mx = Math.max(...vals.map(Math.abs)) || 1; const bw = w / vals.length; return vals.map((v, i) => { const bh = Math.abs(v) / mx * h; return { x: (i * bw + bw * gap / 2).toFixed(2), y: (h - bh).toFixed(2), w: (bw * (1 - gap)).toFixed(2), h: bh.toFixed(2), v }; }); }
  function candles(data, w, h, sc) { const bw = w / data.length; return data.map((b, i) => { const x = i * bw; const up = b.c >= b.o; const yo = sc.y(b.o), yc = sc.y(b.c); return { x: (x + bw * 0.15).toFixed(2), cx: (x + bw / 2).toFixed(2), w: Math.max(bw * 0.7, 0.6).toFixed(2), y: Math.min(yo, yc).toFixed(2), h: Math.max(Math.abs(yo - yc), 0.6).toFixed(2), hy: sc.y(b.h).toFixed(2), ly: sc.y(b.l).toFixed(2), color: up ? 'oklch(52.7% 0.154 150.069)' : 'oklch(50.5% 0.213 27.518)' }; }); }
  // tone for heat cells: -5%..+5% mapped to oklch lightness
  function heat(p) { const t = Math.max(-1, Math.min(1, p / 5)); if (Math.abs(t) < 0.03) return 'oklch(92.2% 0 0)'; return t > 0 ? `oklch(${(90 - t * 38).toFixed(1)}% ${(0.04 + t * 0.12).toFixed(3)} 150)` : `oklch(${(90 + t * 38).toFixed(1)}% ${(0.04 - t * 0.16).toFixed(3)} 27)`; }
  const heatText = p => Math.abs(p) > 2.2 ? '#fff' : 'var(--ink)';

  const param = (k, d) => { try { return new URLSearchParams(location.search).get(k) || d; } catch (e) { return d; } };
  const href = (page, q) => encodeURI(page + '.dc.html') + (q ? '?' + new URLSearchParams(q).toString() : '');
  const actions = code => ({ stock: href('Stock Chart', { symbol: code }), chart: href('Chart', { symbol: code }), vpa: href('VPA', { symbol: code }), archive: href('VPA Archive', { symbol: code }), depth: href('Depth Monitor', { symbol: code }), effect: href('News Effect Chart', { symbol: code }) });
  const dateStr = d => d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  // ---- PE ratio model (quarterly EPS, annualised EPS, weighted PE, sector / category roll-ups)
  const fmtIN = (n, d = 0) => (n == null || isNaN(n)) ? '-' : Number(n).toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
  const peModel = (() => {
    const totalM = stocks.reduce((a, s) => a + s.mcap, 0);
    const rows = stocks.map(s => {
      const r = rng(hash(s.code) + 555); const roll = r(); const sg = roll < 0.22 ? -1 : 1; const zero = roll > 0.92;
      const q = k => zero ? 0 : round(sg * s.eps * (0.12 + r() * 0.32) * (sg < 0 ? 1.4 : 1), 2);
      const q1 = q(), q2 = q(), q3 = q(), q4 = 0; const ann = round((q1 + q2 + q3) / 3 * 4, 2);
      const apeV = ann === 0 ? 0 : round(s.ltp / ann, 2); const shares = s.mcap * 1e6 / s.ltp; const earn = ann * shares / 1e6;
      return { code: s.code, sector: s.sector, cat: s.cat, ltp: s.ltp, change: s.change, changePct: s.changePct, q1, q2, q3, q4, ann, ape: apeV, mcap: s.mcap, earn: round(earn, 0), shares: Math.round(shares), wmcap: round(s.mcap / totalM, 4), wpe: round(apeV * s.mcap / totalM, 2), eps: round(q1 + q2 + q3 + q4, 2), tone: ann > 0 ? 1 : ann < 0 ? -1 : 0 };
    });
    const roll = list => { const m = list.reduce((a, x) => a + x.mcap, 0); const e = list.reduce((a, x) => a + x.earn, 0); const pos = list.filter(x => x.tone > 0).length, neg = list.filter(x => x.tone < 0).length; const goodM = list.filter(x => x.ape > 0).reduce((a, x) => a + x.mcap, 0) || 1; return { mcap: m, earn: e, pe: e > 0 ? round(m / e, 2) : 0, wpe: round(list.filter(x => x.ape > 0).reduce((a, x) => a + x.ape * x.mcap / goodM, 0), 2), pos, neg, weight: round(m / totalM, 2) }; };
    const group = key => [...new Set(rows.map(x => x[key]))].sort().map(name => { const list = rows.filter(x => x[key] === name).sort((a, b) => a.code.localeCompare(b.code)); const g = roll(list); list.forEach(x => { x.gw = round(x.mcap / g.mcap, 4); x.gwpe = round(x.ape * x.mcap / g.mcap, 2); }); return { name, rows: list, ...g }; });
    const total = roll(rows);
    return { rows: rows.slice().sort((a, b) => a.code.localeCompare(b.code)), byCode: Object.fromEntries(rows.map(x => [x.code, x])), total, sectors: group('sector'), cats: group('cat') };
  })();

  // ---- chart bars for any stock or index. tf: '1m' (intraday), 'D', 'W' or 'M'. Latest bars are pinned to the quote.
  const chartCache = {};
  function chartBars(code, tf) {
    const key = code + '|' + tf; if (chartCache[key]) return chartCache[key];
    const S = bySym[code], IX = indices[code]; if (!S && !IX) return [];
    const fmtD = d => d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' });
    let out;
    if (tf === '1m') {
      if (S) { const pts = vpa(code, 100); out = pts.map((q, i) => { const o = i ? pts[i - 1].price : S.open; return { o, c: q.price, h: Math.max(o, q.price), l: Math.min(o, q.price), v: q.vol, t: q.time }; }); }
      else out = IX.series.map((v, i) => { const o = i ? IX.series[i - 1] : v; return { o, c: v, h: Math.max(o, v), l: Math.min(o, v), v: Math.round(IX.vols[i] * 2e7), t: times[i] }; });
    } else {
      let raw;
      if (S) {
        raw = daily(code, 1300); const rl = raw[raw.length - 1], rp = raw[raw.length - 2];
        rp.c = S.ycp; rp.h = Math.max(rp.h, S.ycp); rp.l = Math.min(rp.l, S.ycp); rl.o = S.open; rl.h = S.high; rl.l = S.low; rl.c = S.ltp; rl.v = S.volume;
      } else {
        const r = rng(hash(code) + 41); let p = IX.value * (0.8 + r() * 0.2); const d0 = new Date(2026, 10, 5); raw = [];
        for (let i = 1299; i >= 0; i--) { const o = p, c = o * (1 + (r() - 0.49) * 0.014); const d = new Date(d0); d.setDate(d0.getDate() - Math.round(i * 7 / 5)); raw.push({ date: d, o, h: Math.max(o, c) * (1 + r() * 0.004), l: Math.min(o, c) * (1 - r() * 0.004), c, v: Math.round(8e7 * (0.5 + r())) }); p = c; }
        const k = IX.value / raw[raw.length - 1].c; raw.forEach(b => { b.o = round(b.o * k, 2); b.h = round(b.h * k, 2); b.l = round(b.l * k, 2); b.c = round(b.c * k, 2); });
        const rl = raw[raw.length - 1], rp = raw[raw.length - 2]; rp.c = IX.prev; rp.h = Math.max(rp.h, IX.prev); rp.l = Math.min(rp.l, IX.prev); rl.o = IX.open; rl.h = IX.high; rl.l = IX.low; rl.c = IX.value;
      }
      const grp = k => { const g = []; for (let i = raw.length % k; i < raw.length; i += k) { const sl = raw.slice(i, i + k); g.push({ o: sl[0].o, h: Math.max(...sl.map(b => b.h)), l: Math.min(...sl.map(b => b.l)), c: sl[sl.length - 1].c, v: sl.reduce((a, b) => a + b.v, 0), t: fmtD(sl[sl.length - 1].date) }); } return g; };
      out = tf === 'W' ? grp(5) : tf === 'M' ? grp(21) : raw.map(b => ({ o: b.o, h: b.h, l: b.l, c: b.c, v: b.v, t: fmtD(b.date) }));
    }
    return (chartCache[key] = out);
  }

  window.UFT = { chartBars, rng, hash, round, fmt, fmtInt, sign, tone, arrow, UP, DOWN, FLAT, stocks, bySym, top, breadth, totals, indices, times, sectors, daily, sma, rsiSeries, vpa, depth, news, blocks, blockPct, events, ipos, scaleY, linePath, bars, candles, heat, heatText, param, href, actions, dateStr, company, profile, pe: peModel, fmtIN, symbols: stocks.map(s => s.code).sort() };
})();
