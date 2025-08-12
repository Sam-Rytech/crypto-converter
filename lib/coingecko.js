// lib/coingecko.js
const API_BASE = 'https://api.coingecko.com/api/v3'

/**
 * Fetch top coins in market including current price in USD
 * @param {number} limit - Number of coins to return (default: 50)
 * @param {string} vs_currency - Currency to compare against (default: 'usd')
 */
export async function fetchTopCoins(limit = 50, vs_currency = 'usd') {
  const res = await fetch(
    `${API_BASE}/coins/markets?vs_currency=${vs_currency}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
  )
  if (!res.ok) throw new Error('Failed to fetch top coins')
  return res.json()
}

/**
 * Fetch market chart data for a specific coin
 * @param {string} coinId - CoinGecko ID of the coin (e.g. 'bitcoin')
 * @param {number|string} days - Number of days of historical data (1, 7, 30, 365, 'max')
 * @param {string} vs_currency - Currency to compare against (default: 'usd')
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
 * Fetch simple prices for specific coins in multiple currencies
 * @param {string[]|string} ids - CoinGecko IDs (comma-separated string or array)
 * @param {string[]|string} vs_currencies - Currencies to compare against
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

/**
 * Search for a coin by name or symbol
 * @param {string} query - Search term (e.g. 'bitcoin', 'eth')
 * @returns {Promise<object[]>} Array of matching coins
 */
export async function searchCoin(query) {
  if (!query || query.trim() === '') return []
  const res = await fetch(
    `${API_BASE}/search?query=${encodeURIComponent(query)}`
  )
  if (!res.ok) throw new Error('Failed to search for coin')
  const data = await res.json()
  return data.coins // returns array of coins with id, name, symbol, market_cap_rank, thumb, etc.
}

/**
 * Fetch full coin details by ID
 * @param {string} coinId - CoinGecko ID of the coin
 */
export async function fetchCoinDetails(coinId) {
  const res = await fetch(`${API_BASE}/coins/${encodeURIComponent(coinId)}`)
  if (!res.ok) throw new Error('Failed to fetch coin details')
  return res.json()
}
