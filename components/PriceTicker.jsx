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
   <div></div>
  )
}
