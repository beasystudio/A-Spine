export const config = { runtime: 'edge' }

export default async function handler(req) {
  const url = new URL(req.url)
  const framerUrl = 'https://a-spine.framer.ai' + url.pathname + url.search

  const res = await fetch(framerUrl, {
    headers: req.headers,
  })

  const contentType = res.headers.get('content-type') || ''

  // Rewrite both HTML and XML (sitemaps) content
  if (!contentType.includes('text/html') && !contentType.includes('xml')) {
    return res
  }

  let text = await res.text()
  text = text.replaceAll('a-spine.framer.ai', 'a-spine.be')
  text = text.replaceAll('framer.website', 'a-spine.be')

  // Only inject the verification tag into HTML, not XML
  if (contentType.includes('text/html')) {
    text = text.replace(
      '</head>',
      `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"A-Spine","url":"https://a-spine.be"}</script>
      <meta name="google-site-verification" content="EhIDFVSYNX1GagAUMQCo5ivpgtn6UF8EX3-yHPTUygY" /></head>`
    )
  }

  return new Response(text, {
    status: res.status,
    headers: { 'content-type': contentType },
  })
}
