# CryptoConverter Dashboard

**CryptoConverter** is a real-time cryptocurrency dashboard built with **Next.js (App Router)**, **Tailwind CSS**, and **Chart.js**.  
It fetches live market data from the **CoinGecko** public API and provides:

- Live prices for the **Top 50** cryptocurrencies by market cap
- Interactive historical price charts with selectable ranges (1D, 7D, 30D, 1Y)
- A currency converter to convert **crypto ⇄ fiat** (USD, EUR, NGN)
- Auto-refresh (every 60 seconds) so the UI stays up-to-date

---

## Features

- **Top 50 coins**: Loads the top 50 coins by market cap using CoinGecko.
- **Live Prices**: Current price, 24h change, market cap shown in a table.
- **Interactive Charts**: Historical price charts using Chart.js with selectable ranges:
  - 1D (hourly)
  - 7D (daily)
  - 30D (daily)
  - 1Y (daily)
- **Currency Converter**: Convert between selected crypto and fiat (USD, EUR, NGN) using CoinGecko simple price endpoint.
- **Auto-refresh**: Prices and charts refresh automatically every 60 seconds.
- **Converter sync**: Selecting a coin in the price list updates the chart and converter automatically.

---

## Tech Stack

- **Next.js (App Router)** — UI and routing
- **Tailwind CSS** — Styling
- **Chart.js** + **react-chartjs-2** — Charts
- **CoinGecko API** — Market data (no API key required)
- JavaScript (ESNext), React 18
