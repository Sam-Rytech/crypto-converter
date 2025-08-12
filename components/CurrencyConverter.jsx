'use client'

import { useEffect, useState, useRef } from 'react'
import { fetchSimplePrice } from '../lib/coingecko'

export default function CurrencyConverter({
  coins = [],
  selectedCoinId,
  onSelectCoin = () => {},
}) {
  const [mode, setMode] = useState('crypto->fiat')
  const [cryptoAmount, setCryptoAmount] = useState('1')
  const [fiatAmount, setFiatAmount] = useState('')
  const [fiat, setFiat] = useState('usd')
  const [prices, setPrices] = useState(null)
  const REFRESH_MS = 60000
  const pollRef = useRef(null)

  const selectedCoin = coins.find((c) => c.id === selectedCoinId) || null
  const selectedSymbol = selectedCoin ? selectedCoin.symbol.toUpperCase() : ''

  async function loadPrices() {
    if (!selectedCoinId) return
    try {
      const res = await fetchSimplePrice(selectedCoinId, ['usd', 'eur', 'ngn'])
      setPrices(res[selectedCoinId] || null)
    } catch (err) {
      console.error('Failed to fetch simple price:', err)
    }
  }
}
