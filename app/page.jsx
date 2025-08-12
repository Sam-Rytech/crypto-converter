'use client'

import { useEffect, useState } from 'react'
import { fetchTopCoins } from '../lib/coingecko'
import PriceTicker from '../components/PriceTicker'
import CryptoChart from '../components/CryptoChart'
import CurrencyConverter from '../components/CurrencyConverter'


export default function HomePage() {
  const [coins, setCoins] = useState([])
  const [selectedCoinId, setSelectedCoinId] = useState('bitcoin')
  const [loadingCoins, setLoadingCoins] = useState(true)
  const REFRESH_MS = 60000 // 60s

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoadingCoins(true);
        const top = await fetchTopCoins(50);
        if (!mounted) return;
        setCoins(top);
        // if selectedCoinId is not set or not in list, choose first
        if (!selectedCoinId && top.length) setSelectedCoinId(top[0].id);
      } catch (err) {
        console.error("Failed to load top coins:", err);
      } finally {
        if (mounted) setLoadingCoins(false);
      }
    }
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center">
          CryptoConverter Dashboard
        </h1>
        <p className="text-center text-slate-300 mt-2">
          Top 50 coins • Live prices • Charts • Converter
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <section className="md:col-span-2">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Live Prices (Top 50)</h2>
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
