const API_BASE = 'https://api.coingecko.com/api/v3'

/**
 * Fetch top coins in market including current price in USD
 * returns array of coin market objects
 */
export async function fetchTopCoins(limit = 50, vs_currency = 'usd') {
  const res = await fetch(
    `${API_BASE}/coins/markets?vs_currency=${vs_currency}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
  )
  if (!res.ok) throw new Error('Failed to fetch top coins')
  return res.json()
}

/**
 * Fetch market chart
 * returns object with prices, market caps, and total volumes
 * coinId: id of the coin (e.g. 'bitcoin')
 */
export async function fetchMarketChart(coinId, days = 7, vs_currency = 'usd') {
  const res = await fetch(
    `${API_BASE}/coins/${encodeURIComponent(
      coinId
    )}/market_chart?vs_currency=${vs_currency}&days=${days}`
  )
  if (!res.ok) throw new Error('Failed to fetch market chart')
  return res.json()
}

/**
 * Fetch simple prices for ids in multiple currencies
 * ids: comma-separated string or array
 */
export async function fetchSimplePrice(ids, vs_currencies = ['usd']) {
  const idsParam = Array.isArray(ids) ? ids.join(',') : ids
  const vsParam = Array.isArray(vs_currencies)
    ? vs_currencies.join(',')
    : vs_currencies
  const res = await fetch(
    `${API_BASE}/simple/price?ids=${encodeURIComponent(
      idsParam
    )}&vs_currencies=${encodeURIComponent(vsParam)}`
  )
  if (!res.ok) throw new Error('Failed to fetch simple price')
  return res.json()
}
