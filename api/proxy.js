export const config = { runtime: 'edge' }

export default async function handler(req) {
  const url = new URL(req.url)
  const framerUrl = 'https://a-spine.framer.ai' + url.pathname + url.search

  const res = await fetch(framerUrl, {
    headers: req.headers,
  })

  const contentType = res.headers.get('content-type') || ''

  if (!contentType.includes('text/html')) {
    return res
  }

  let html = await res.text()
  html = html.replaceAll('a-spine.framer.ai', 'a-spine.com')
  html = html.replaceAll('framer.website', 'a-spine.com')

  return new Response(html, {
    status: res.status,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}
