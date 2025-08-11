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
}
