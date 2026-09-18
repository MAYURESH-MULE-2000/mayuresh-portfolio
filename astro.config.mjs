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

export default defineConfig({
  site,
  integrations: [
    vue(),
    tailwind(),
    sitemap(),
  ],
  output: 'static',
  adapter: vercel(),
})
