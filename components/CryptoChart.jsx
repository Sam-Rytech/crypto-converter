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
}
