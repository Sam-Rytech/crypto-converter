'use client'

import React from 'react'

export default function PriceTicker({
  coins = [],
  loading = false,
  onSelectCoin = () => {},
}) {
  if (loading)
    return <div className="p-4 bg-slate-800 rounded">Loading coins...</div>
  if (!coins || coins.length === 0)
    return <div className="p-4 bg-slate-800 rounded">No coins yet</div>

  return (
    <div className="overflow-x-auto bg-slate-800 rounded-lg shadow p-2">
      <table className="min-w-full divide-y divide-slate-700">
        <thead className="text-xs text-slate-300 uppercase">
          <tr>
            <th className="px-3 py-2 text-left">#</th>
            <th className="px-3 py-2 text-left">Coin</th>
            <th className="px-3 py-2 text-right">Price (USD)</th>
            <th className="px-3 py-2 text-right">24h %</th>
            <th className="px-3 py-2 text-right">Market Cap</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {coins.map((coin, idx) => (
            <tr
              key={coin.id}
              className="hover:bg-slate-700 cursor-pointer"
              onClick={() => onSelectCoin(coin.id)}
            >
              <td className="px-3 py-3 text-sm">{coin.market_cap_rank}</td>
              <td className="px-3 py-3 flex items-center gap-3">
                <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                <div>
                  <div className="font-medium">{coin.name}</div>
                  <div className="text-xs text-slate-400">
                    {coin.symbol.toUpperCase()}
                  </div>
                </div>
              </td>
              <td className="px-3 py-3 text-right">
                ${coin.current_price?.toLocaleString()}
              </td>
              <td
                className={`px-3 py-3 text-right font-semibold ${
                  coin.price_change_percentage_24h >= 0
                    ? 'text-green-400'
                    : 'text-rose-400'
                }`}
              >
                {coin.price_change_percentage_24h
                  ? coin.price_change_percentage_24h.toFixed(2)
                  : '—'}
                %
              </td>
              <td className="px-3 py-3 text-right text-sm text-slate-400">
                ${coin.market_cap ? coin.market_cap.toLocaleString() : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
