# UFTCL stock page spec (AmarStock + LankaBD merged)

Source: `uploads/merged-stock-page-plan.md` and the two SPCL screenshots (`uploads/Shahjibazar-1.png` AmarStock, `uploads/Shahjibazar-2.png` LankaBD).
Target file: `Stock Chart.dc.html` (header lives in `InstrumentBar.dc.html`, shared by all 5 instrument pages).
Goal: one page and one scroll, with everything about a stock visible at a glance. Original UFTCL styling (Base UI system), not a copy of either site.

## Status key
- **Done**: already on the current page
- **Add**: missing, to build next
- **Drop**: intentionally left out

## 1. Header (shared InstrumentBar)
| Item | Source | Status |
|---|---|---|
| Company name, DSE code, sector, category, board badges | LankaBD | Done |
| LTP, change, % change, last-trade time, market status | Both | Done |
| Open, YCP, high, low, volume, value, trades, market cap, EPS, PE, NAV, circuit | Both | Done |
| Day range and 52-week range bars | AmarStock | Done |
| Searchable instrument picker (code, name, sector; "/" shortcut) | UFTCL | Done |
| Watchlist, price alert, compare buttons | UFTCL | Done |
| RSI and turnover velocity mini-meters | LankaBD | Add |
| Credit rating chip (e.g. LT AA1 / ST ST-1) | LankaBD | Add |

## 2. Navigation
- Instrument tabs: Stock chart · VPA · VPA archive · Depth monitor · Effect chart (**Done**)
- Sticky in-page section nav (**Done**). Update the items to: Overview · Chart · Technicals · Financials · Capital & shareholding · Dividends · Governance · News · Reports · Peers · Profile (**Add**)

## 3. Chart block
| Item | Source | Status |
|---|---|---|
| Candle/line, 1M–Max, SMA 20/50, volume, RSI pane, crosshair OHLC | Both | Done |
| Minute (intraday) chart toggle next to Historical | LankaBD | Add |
| Market depth snapshot (5 levels, buy/sell pressure) | LankaBD | Done |
| Return strip: Today, 15D, 30D, 3M, 6M, 1Y | AmarStock | Done as 1W/1M/3M/6M/YTD/1Y. Switch to AmarStock periods (**Add**) |

## 4. KPI tiles (AmarStock)
Six large tiles under the chart, each with a "?" tooltip definition: P/E, EPS, Price/NAV, Free float, Beta, Dividend yield. **Add**

## 5. Key stats (merged)
Done: authorized capital, paid-up capital, face value, total shares, market lot, reserve, free float, listing year, year end, last AGM, beta.
Add: interim P/E and audited P/E (both, dated), last dividend declaration date, next AGM date, credit rating.

## 6. Technicals (one tabbed panel)
- Tab "Signals" (**Done**, extend): overall Buy/Neutral/Sell verdict plus indicator rows. Add MFI, Williams %R and Ultimate oscillator with an interpretation column (Overbought / Oversold / Neutral / Bullish / Bearish).
- Tab "Moving averages" (**Add**, AmarStock): EMA 20/50/100/200 and SMA 20/50/100/200, each with its value and a Bullish/Bearish label.
- Tab "Risk" (**Add**, LankaBD): VaR daily, monthly and annual, plus beta.

## 7. Financials
| Item | Source | Status |
|---|---|---|
| 5-year EPS, NAV, PE, net profit, dividend table + EPS bars | Both | Done |
| Interim performance: Q1 / Half-year / 9 months / Annual × Turnover, Net profit, EPS, NAV | LankaBD | Add |
| 5-year statement summary: balance sheet, income statement, cash flow (negatives in red, in brackets) | LankaBD | Add |
| Tabs: Balance sheet · Profit & loss · Cash flow (replaces AmarStock's drill-down buttons) | AmarStock | Add |

## 8. Capital and shareholding
- Shareholding stacked bars (current vs previous) plus a table with the change column (**Done**). Add a share-count column in crore (**Add**).
- Capital bar: paid-up vs authorized, plus the remaining capacity for raising capital (**Add**). Use a horizontal bar, not a pie, to match the system.

## 9. Dividends and corporate actions
- Year timeline (AmarStock): one node per year, hover shows cash %, stock %, record date. **Add**
- Dividend table: year, type, cash %, stock %, EPS, NAV, record date. **Add** (currently merged into financials; split it out)
- Right issue table: ratio, issue price, premium, record date. Show an empty state when there is none. **Add**
- Events list: AGM, record date, board meetings, with dates. Link to the Event Calendar page. **Add**

## 10. Corporate performance at a glance (AmarStock)
Operational status, loan status date, short-term loan, long-term loan, latest dividend status. **Add**

## 11. People and governance (LankaBD)
- Board of directors: role and name, top 5, then "View more". **Add**
- Director buy and sell: one table (date, name, type, qty, price) with "Load more". **Add**
- Owners/sponsors, auditors and subsidiaries: three small list cards. **Add**

## 12. News and announcements
One feed with date, PSI badge, title and full text, plus "Show all" and a link to the Effect chart. **Done** (extend with full announcement text that expands on click)

## 13. Reports (AmarStock)
Tabs: Quarterly · Annual. Rows show the report name and a download link. **Add**

## 14. Company profile and contact (LankaBD)
Done: name, address, phone, email, web, DSE listing.
Add: an "About" sentence, script codes (DSE/CSE), listing year and debut trading date for both DSE and CSE, fax, fiscal year end.

## 15. Peer comparison
Sortable sector table with the current stock highlighted. **Done**

## Drop
- Duplicate director table, second news feed and the second shareholding chart
- A-Z index (the search picker replaces it)
- Footer promo blocks (WhatsApp, app badges). UFTCL footer stays as is.
- Both sites' pie charts (use bars instead)

## Data rules
- Use the latest figures. Where the sources conflict (P/E, EPS, dividend, market cap), follow LankaBD.
- Always show "as of" dates on P/E, shareholding, financials and dividends.
- Market cap = total shares × LTP (keeps the figures consistent).
- Cash dividend % is based on EPS, and yield = cash% × face value / LTP.
- All mock data stays deterministic per symbol (`uftcl-data.js`) so every page agrees.

## Build order
1. Header additions: RSI, turnover velocity, credit rating
2. KPI tiles and return-strip periods
3. Technicals tabs: MA, risk
4. Financials: interim and statement summary tabs
5. Capital bar, dividend timeline and table, right issue, events
6. Corporate performance and governance (board, director trades, owners, auditors, subsidiaries)
7. Reports, then profile extensions
8. Update the section nav
