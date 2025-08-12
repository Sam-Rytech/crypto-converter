// lib/coingecko.js
const API_BASE = 'https://api.coingecko.com/api/v3'
const API_KEY = 'CG-4PhupCk8w2BKz8Y7AYrufQeL'

// Helper to fetch with API key appended
async function fetchWithKey(url) {
  const separator = url.includes('?') ? '&' : '?'
  const urlWithKey = `${url}${separator}x_cg_demo_api_key=${API_KEY}`

  const res = await fetch(urlWithKey)
  if (!res.ok) throw new Error(`Failed request: ${res.status}`)
  return res.json()
}

// Fetch top coins
export async function fetchTopCoins(limit = 50, vs_currency = 'usd') {
  return fetchWithKey(
    `${API_BASE}/coins/markets?vs_currency=${vs_currency}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
  )
}

// Fetch historical market chart
export async function fetchMarketChart(coinId, days = 7, vs_currency = 'usd') {
  return fetchWithKey(
    `${API_BASE}/coins/${encodeURIComponent(
      coinId
    )}/market_chart?vs_currency=${vs_currency}&days=${days}`
  )
}

// Fetch simple prices
export async function fetchSimplePrice(ids, vs_currencies = ['usd']) {
  const idsParam = Array.isArray(ids) ? ids.join(',') : ids
  const vsParam = Array.isArray(vs_currencies)
    ? vs_currencies.join(',')
    : vs_currencies
  return fetchWithKey(
    `${API_BASE}/simple/price?ids=${encodeURIComponent(
      idsParam
    )}&vs_currencies=${encodeURIComponent(vsParam)}`
  )
}

// Search for a coin
export async function searchCoin(query) {
  if (!query || query.trim() === '') return []
  const data = await fetchWithKey(
    `${API_BASE}/search?query=${encodeURIComponent(query)}`
  )
  return data.coins
}

// Fetch full coin details
export async function fetchCoinDetails(coinId) {
  return fetchWithKey(`${API_BASE}/coins/${encodeURIComponent(coinId)}`)
}
