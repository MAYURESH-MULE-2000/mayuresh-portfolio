import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'

// Absolute URLs are required for the sitemap.
// Priority: explicit override -> Vercel's production domain -> local dev fallback.
const site =
  process.env.PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:4321')

// Route prefixes kept out of the sitemap - personal tooling / study material,
// not pages meant to be surfaced in search.
const EXCLUDED_PREFIXES = ['/gym', '/gym-list', '/learn', '/astralearn']

export default defineConfig({
  site,
  integrations: [
    vue(),
    tailwind(),
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page)
        return !EXCLUDED_PREFIXES.some(
          (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
        )
      },
    }),
  ],
  output: 'static',
  adapter: vercel(),
})
