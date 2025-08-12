'use client'

import { useEffect, useState, useRef } from 'react'
import { fetchMarketChart } from '../lib/coingecko'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
)
export default function CryptoChart({ coinId }) {
  const [days, setDays] = useState(7)
  const [chartData, setChartData] = useState(null)
  const [loading, setLoading] = useState(false)
  const REFRESH_MS = 60000 // 60s
  const intervalRef = useRef(null)

  useEffect(() => {
    async function load() {
      if (!coinId) return
      try {
        setLoading(true)
        const raw = await fetchMarketChart(coinId, days)
        const labels = raw.prices.map((p) => {
          const d = new Date(p[0])
          return days === 1
            ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : d.toLocaleDateString()
        })
        const data = raw.prices.map((p) => p[1])
        setChartData({
          labels,
          datasets: [
            {
              label: `${coinId.toUpperCase()} price (USD)`,
              data,
              borderColor: '#60a5fa',
              backgroundColor: 'rgba(96,165,250,0.18)',
              fill: true,
              tension: 0.2,
            },
          ],
        })
      } catch (err) {
        console.error('Chart load err:', err)
        setChartData(null)
      } finally {
        setLoading(false)
      }
    }

    load()

    // auto-refresh for chart
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(load, REFRESH_MS)
    return () => clearInterval(intervalRef.current)
  }, [coinId, days])

  const ranges = [
    { label: '1D', days: 1 },
    { label: '7D', days: 7 },
    { label: '30D', days: 30 },
    { label: '1Y', days: 365 },
  ]

  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          {ranges.map((r) => (
            <button
              key={r.label}
              onClick={() => setDays(r.days)}
              className={`px-3 py-1 rounded text-sm ${
                days === r.days
                  ? 'bg-slate-700'
                  : 'bg-slate-700/30 hover:bg-slate-700'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        <div className="text-sm text-slate-400">Auto-refresh every 60s</div>
      </div>

      {loading && (
        <div className="text-center text-slate-400 py-12">Loading chart...</div>
      )}

      {!loading && chartData && (
        <div>
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { labels: { color: '#e2e8f0' } },
                tooltip: { mode: 'index', intersect: false },
              },
              scales: {
                x: { ticks: { color: '#cbd5e1' } },
                y: { ticks: { color: '#cbd5e1' } },
              },
            }}
          />
        </div>
      )}

      {!loading && !chartData && (
        <div className="text-center text-slate-400 py-12">No chart data</div>
      )}
    </div>
  )
}
