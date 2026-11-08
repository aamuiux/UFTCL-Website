# Merged Stock Page Plan: AmarStock + LankaBD

Goal: combine the AmarStock and LankaBD company pages (example: SPCL, Shahjibazar Power Co. Ltd.) into one page so users see everything at a glance. Where both sites have a section, the richer version is used.

## Unique sections

### Only on AmarStock
- Period return strip: Today, 15 days, 30 days, 3 months, 6 months, 1 year
- Technical tab with EMA 20/50/100/200 and moving-average levels, each marked Bullish or Bearish, beside a candlestick chart
- KPI tiles: P/E, EPS, Price/NAV, Free Float, Beta, Dividend Yield
- Corporate Action timeline (year-by-year dividend, 2022-2025)
- Corporate Performance at a Glance: operational status, loan status, short-term and long-term loans
- Quarterly and Annual Report PDF downloads
- Shareholding with change vs previous period (e.g. Institute +0.79%, Public -0.79%) and cr shares
- Day range and 52-week range sliders, DSEX market bar, A-Z stock index, WhatsApp support block

### Only on LankaBD
- Peer Comparison, Financial Report and Ratio tabs
- Interim Financial Performance: turnover, net profit, EPS, NAV by quarter, half-year and nine months
- Financial Statement Summary: 5-year balance sheet, income statement, cash flow
- Technical indicators and risk: MFI, Stochastic, Williams %R, MACD, VaR (daily, monthly, annual), Beta
- Board of Directors, Owners, Auditors, Subsidiaries, Contacts, Company Profile
- Right Issue, Events calendar, Market Announcement
- Capital Proportionate pie (paid-up vs authorized capital)
- Credit rating, RSI, Turnover Velocity, Sector and Board

### Shared (keep one version)
Price chart, stock stats, shareholding, dividend history, director buy and sell, news and announcements, contact details.

## Merged page layout (top to bottom)

| # | Section | Take from | What to keep |
|---|---|---|---|
| 1 | Header | Both | Name, symbol, sector, board, category (LankaBD). Price, change, OHLC, volume, value. Day and 52-week range sliders (AmarStock). RSI and turnover velocity (LankaBD). Market status and DSEX (AmarStock). |
| 2 | Tabs | Both | Overview, Chart, Financials, Ratio, Peers, News, VPA, Market Depth |
| 3 | Chart | Both | Price/volume chart with Minute, Historical, Market Depth toggles (LankaBD). Return strip (AmarStock). |
| 4 | KPI tiles | AmarStock | P/E, EPS, Price/NAV, Free Float, Beta, Dividend Yield |
| 5 | Key stats | Both, merged | Capital, shares, NAV, circuit limits, listed year, category. Market lot, credit rating, AGM date, interim and audited P/E (LankaBD). |
| 6 | Technical | Both, one tabbed panel | EMA/MA bullish-bearish table (AmarStock). MFI, Stochastic, Williams %R, MACD, VaR, Beta (LankaBD). |
| 7 | Financials | LankaBD, AmarStock drill-downs | Interim performance. 5-year balance sheet, income, cash flow summary. Cash Flow, P&L, Balance Sheet buttons open detail (AmarStock). |
| 8 | Capital and shareholding | Both | Paid-up vs authorized capital pie (LankaBD). Shareholding table with change column and cr shares (AmarStock). |
| 9 | Dividends and corporate actions | Both | Year timeline (AmarStock). Dividend table with cash, stock, EPS, NAV, record date (LankaBD). Right Issue and Events calendar (LankaBD). |
| 10 | Corporate performance | AmarStock | Operational status, loan status, short-term and long-term loans |
| 11 | People and governance | Mostly LankaBD | Board, Owners, Auditors, Subsidiaries (LankaBD). One Director Buy & Sell table with "Load more" (AmarStock). |
| 12 | News and announcements | Either | One feed (content is identical on both) |
| 13 | Reports | AmarStock | Quarterly and annual PDF downloads |
| 14 | Company profile and contact | LankaBD | About, script code, listing year, debut date, DSE/CSE listing, web, address, phone |
| 15 | Peer comparison | LankaBD tab | Peer comparison data not yet reviewed; verify before relying on it |

## Drop

- Duplicate director table
- Second news feed
- Both footers' promo blocks
- A-Z index (or replace with a search box)
- Both shareholding pies (keep one)

## Data conflicts to resolve before merging

AmarStock numbers appear stale in these places:

- **P/E:** AmarStock's tile shows 24.15, but its own stats show 10.12. The tile uses the old EPS of 2.53; the latest EPS is 6.04. LankaBD shows 9.85 (interim) and 23.52 (audited).
- **EPS:** AmarStock shows 2.53 (FY2025). LankaBD's dividend table shows 6.04 for 2026.
- **Dividend:** AmarStock shows 20% for 2025, but 40% was declared on 27 Oct 2026 (LankaBD).
- **Market cap:** AmarStock shows 517.69cr. LankaBD shows 11,403 mn BDT (about 1,140cr), which matches 18.66cr shares at 61.10.

Recommendation: use LankaBD as the source for these four fields, and add a data-freshness check if scraping both sites.

## Next step

Build a one-page mockup (card layout, sticky tabs) from this plan.
