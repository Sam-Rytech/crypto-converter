'use client'

import { useEffect, useState } from 'react'
import { fetchTopCoins, searchCoins } from '../lib/coingecko'
import PriceTicker from '../components/PriceTicker'
import CryptoChart from '../components/CryptoChart'
import CurrencyConverter from '../components/CurrencyConverter'

export default function HomePage() {
  const [coins, setCoins] = useState([])
  const [selectedCoinId, setSelectedCoinId] = useState('bitcoin')
  const [loadingCoins, setLoadingCoins] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const REFRESH_MS = 60000 // 60s

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoadingCoins(true)
        const top = await fetchTopCoins(50)
        if (!mounted) return
        setCoins(top)
        if (!selectedCoinId && top.length) setSelectedCoinId(top[0].id)
      } catch (err) {
        console.error('Failed to load top coins:', err)
      } finally {
        if (mounted) setLoadingCoins(false)
      }
    }
    load()
    const id = setInterval(load, REFRESH_MS)
    return () => {
      mounted = false
      clearInterval(id)
    }
  }, [])

  // Handle search
  const handleSearch = async (e) => {
    const term = e.target.value
    setSearchTerm(term)
    if (term.trim().length < 2) {
      setSearchResults([])
      return
    }
    try {
      const results = await searchCoin(term)
      setSearchResults(results)
    } catch (err) {
      console.error('Search failed:', err)
    }
  }

  // When selecting a search result
  const handleSelectSearchCoin = (coinId) => {
    setSelectedCoinId(coinId)
    setSearchTerm('')
    setSearchResults([])
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center">
          CryptoConverter Dashboard
        </h1>
        <p className="text-center text-slate-300 mt-2">
          Search any coin • Live prices • Charts • Converter
        </p>
      </header>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-md mx-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for a coin..."
          className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600"
        />
        {searchResults.length > 0 && (
          <ul className="absolute left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded max-h-60 overflow-y-auto z-10">
            {searchResults.map((coin) => (
              <li
                key={coin.id}
                onClick={() => handleSelectSearchCoin(coin.id)}
                className="px-4 py-2 hover:bg-slate-800 cursor-pointer"
              >
                {coin.name} ({coin.symbol.toUpperCase()})
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <section className="md:col-span-2">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Live Prices</h2>
            <p className="text-sm text-slate-400">
              Click a coin to load chart & converter
            </p>
          </div>
          <PriceTicker
            coins={coins}
            loading={loadingCoins}
            onSelectCoin={(id) => setSelectedCoinId(id)}
          />
        </section>

        <aside className="md:col-span-1">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Converter</h2>
            <p className="text-sm text-slate-400">Convert crypto ⇄ fiat</p>
          </div>
          <CurrencyConverter
            coins={coins}
            selectedCoinId={selectedCoinId}
            onSelectCoin={(id) => setSelectedCoinId(id)}
          />
        </aside>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Historical Chart</h2>
        <CryptoChart coinId={selectedCoinId} />
      </section>

      <footer className="mt-10 text-center text-slate-400 text-sm">
        Prices & charts courtesy of CoinGecko (free API). Auto-refresh every
        60s.
      </footer>
    </main>
  )
}
