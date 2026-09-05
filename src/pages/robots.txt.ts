import type { APIRoute } from 'astro'

// Mirrors the sitemap exclusions in astro.config.mjs - personal tooling and
// study material stay out of search results.
const DISALLOWED = ['/gym', '/gym-list', '/learn', '/astralearn']

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('sitemap-index.xml', site).href

  const body = [
    'User-agent: *',
    'Allow: /',
    ...DISALLOWED.map((path) => `Disallow: ${path}`),
    '',
    `Sitemap: ${sitemapUrl}`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
