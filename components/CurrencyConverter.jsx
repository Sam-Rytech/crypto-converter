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
      useEffect(() => {
        loadPrices()
        if (pollRef.current) clearInterval(pollRef.current)
        pollRef.current = setInterval(loadPrices, REFRESH_MS)
        return () => clearInterval(pollRef.current)
      }, [selectedCoinId])

      useEffect(() => {
        if (!prices) return
        const p = prices[fiat]
        if (!p) return

        if (mode === 'crypto->fiat') {
          const crypto = parseFloat(cryptoAmount || '0')
          const fiatVal = crypto * p
          setFiatAmount(
            fiatVal ? fiatVal.toFixed(6).replace(/\.?0+$/, '') : '0'
          )
        } else {
          const fiatVal = parseFloat(fiatAmount || '0')
          const crypto = p ? fiatVal / p : 0
          setCryptoAmount(
            crypto ? crypto.toFixed(6).replace(/\.?0+$/, '') : '0'
          )
        }
      }, [cryptoAmount, fiatAmount, prices, fiat, mode])

    
      function toggleMode() {
        setMode(mode === 'crypto->fiat' ? 'fiat->crypto' : 'crypto->fiat')
        setCryptoAmount((prev) => {
          const prevCrypto = prev
          setFiatAmount(prevCrypto)
          return fiatAmount || '0'
        })
      }

      function handleCoinSelect(e) {
        onSelectCoin(e.target.value)
      }
}
