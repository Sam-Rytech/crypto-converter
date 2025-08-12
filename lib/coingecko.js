const API_BASE = 'https://pro-api.coingecko.com/api/v3'
const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY

async function fetchWithKey(url) {
  const res = await fetch(`${url}&x_cg_pro_api_key=${API_KEY}`)
  if (!res.ok) throw new Error(`Failed request: ${res.status}`)
  return res.json()
}

export async function fetchTopCoins(limit = 50, vs_currency = 'usd') {
  return fetchWithKey(
    `${API_BASE}/coins/markets?vs_currency=${vs_currency}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
  )
}

export async function fetchMarketChart(coinId, days = 7, vs_currency = 'usd') {
  return fetchWithKey(
    `${API_BASE}/coins/${encodeURIComponent(
      coinId
    )}/market_chart?vs_currency=${vs_currency}&days=${days}`
  )
}

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

export async function searchCoin(query) {
  if (!query || query.trim() === '') return []
  const data = await fetchWithKey(
    `${API_BASE}/search?query=${encodeURIComponent(query)}`
  )
  return data.coins
}

export async function fetchCoinDetails(coinId) {
  return fetchWithKey(`${API_BASE}/coins/${encodeURIComponent(coinId)}`)
}
