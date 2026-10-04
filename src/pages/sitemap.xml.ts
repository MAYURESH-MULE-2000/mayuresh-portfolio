import type { APIRoute } from 'astro'
import { getCaseStudies, getProjects, getBlogs, getPMCases } from '../lib/content'
import { journalEntries } from '../data/journal'

// A single /sitemap.xml for search engines. @astrojs/sitemap still emits
// sitemap-index.xml; this one is the canonical file referenced in robots.txt.
export const GET: APIRoute = async ({ site }) => {
  const [caseStudies, projects, blogs, pmCases] = await Promise.all([
    getCaseStudies(),
    getProjects(),
    getBlogs(),
    getPMCases(),
  ])

  const paths = [
    '/',
    '/resources/',
    '/journal/',
    ...caseStudies.map((item) => `/case-study/${item.slug}/`),
    ...projects.map((item) => `/project/${item.slug}/`),
    ...blogs.map((item) => `/blog/${item.slug}/`),
    ...pmCases.map((item: any) => `/pm-cases/${item.slug}/`),
    ...journalEntries.map((entry) => `/journal/${entry.slug}/`),
  ]

  const urls = paths
    .map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`)
    .join('\n')

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
