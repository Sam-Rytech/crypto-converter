'use client'

import { useEffect, useState } from 'react'
import { fetchTopCoins } from '../lib/coingecko'
import PriceTicker from '../components/PriceTicker'
import CryptoChart from '../components/CryptoChart'
import CurrencyConverter from '../components/CurrencyConverter'

const [coins, setCoins] = useState([])
const [selectedCoinId, setSelectedCoinId] = useState('bitcoin')
const [loadingCoins, setLoadingCoins] = useState(true)
const REFRESH_MS = 60000 // 60s

export default function HomePage() {
  return <div>Homepage</div>
}
