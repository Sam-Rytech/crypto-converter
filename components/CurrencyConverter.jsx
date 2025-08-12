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
    
    return (
      <div className="bg-slate-800 p-4 rounded-lg">
        <div className="mb-3">
          <label className="block text-sm text-slate-300">Coin</label>
          <select
            value={selectedCoinId || ''}
            onChange={handleCoinSelect}
            className="w-full mt-2 p-2 bg-slate-700 rounded"
          >
            {coins.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.symbol.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setMode('crypto->fiat')}
            className={`px-3 py-1 rounded ${
              mode === 'crypto->fiat' ? 'bg-slate-700' : 'bg-slate-700/30'
            }`}
          >
            Crypto → Fiat
          </button>
          <button
            onClick={() => setMode('fiat->crypto')}
            className={`px-3 py-1 rounded ${
              mode === 'fiat->crypto' ? 'bg-slate-700' : 'bg-slate-700/30'
            }`}
          >
            Fiat → Crypto
          </button>
          <div className="ml-auto text-sm text-slate-400">
            Prices refresh every 60s
          </div>
        </div>

        <div className="grid gap-3">
          {mode === 'crypto->fiat' ? (
            <>
              <div>
                <label className="block text-sm text-slate-300">
                  Amount ({selectedSymbol || 'COIN'})
                </label>
                <input
                  className="mt-2 w-full p-2 rounded bg-slate-700"
                  value={cryptoAmount}
                  onChange={(e) => setCryptoAmount(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300">To fiat</label>
                <div className="flex gap-2 mt-2">
                  <select
                    className="p-2 rounded bg-slate-700"
                    value={fiat}
                    onChange={(e) => setFiat(e.target.value)}
                  >
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="ngn">NGN</option>
                  </select>
                  <input
                    className="flex-1 p-2 rounded bg-slate-700"
                    value={fiatAmount}
                    readOnly
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm text-slate-300">
                  Amount ({fiat.toUpperCase()})
                </label>
                <input
                  className="mt-2 w-full p-2 rounded bg-slate-700"
                  value={fiatAmount}
                  onChange={(e) => setFiatAmount(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300">
                  To crypto ({selectedSymbol || 'COIN'})
                </label>
                <div className="mt-2">
                  <input
                    className="w-full p-2 rounded bg-slate-700"
                    value={cryptoAmount}
                    readOnly
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-4 text-sm text-slate-400">
          {prices ? (
            <div>
              1 {selectedSymbol || 'COIN'} ={' '}
              {prices.usd ? `$${prices.usd}` : '—'} •{' '}
              {prices.eur ? `€${prices.eur}` : '—'} •{' '}
              {prices.ngn ? `₦${prices.ngn}` : '—'}
            </div>
          ) : (
            <div>Loading rates…</div>
          )}
        </div>
      </div>
    )
}
