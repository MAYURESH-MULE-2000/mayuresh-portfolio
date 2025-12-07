import { getCollection } from 'astro:content'

function mapEntry(entry: any) {
  return {
    title: entry.data.title,
    slug: entry.slug,
    category: entry.data.category,
    heroImage: entry.data.heroImage,
    logo: entry.data.logo, // Company/project logo
    metaTitle: entry.data.metaTitle,
    metaDescription: entry.data.metaDescription,
    overview: entry.data.overview,
    blocks: entry.data.blocks,
    navigation: entry.data.navigation,
    order: entry.data.order ?? 999, // Default to 999 if no order specified
    audioFile: entry.data.audioFile, // Audio overview file
    cardGradient: entry.data.cardGradient, // Custom card gradient
  }
}

// CASE STUDIES
export async function getCaseStudies() {
  const entries = await getCollection('case-studies')
  const mapped = entries.map(mapEntry)

  // Debug: Log the order values
  console.log('Case Studies Order Debug:')
  mapped.forEach(item => {
    console.log(`  ${item.title}: order=${item.order}`)
  })

  const sorted = mapped.sort((a, b) => a.order - b.order)

  console.log('After sorting:')
  sorted.forEach((item, index) => {
    console.log(`  ${index + 1}. ${item.title} (order: ${item.order})`)
  })

  return sorted
}

export async function getCaseStudyBySlug(slug: string) {
  const entries = await getCollection('case-studies')
  const entry = entries.find((e: any) => e.slug === slug)
  return entry ? mapEntry(entry) : null
}

// PROJECTS
export async function getProjects() {
  const entries = await getCollection('projects')
  return entries
    .map(mapEntry)
    .sort((a, b) => a.order - b.order) // Sort by order ascending
}

export async function getProjectBySlug(slug: string) {
  const entries = await getCollection('projects')
  const entry = entries.find((e: any) => e.slug === slug)
  return entry ? mapEntry(entry) : null
}

// BLOGS
export async function getBlogs() {
  const entries = await getCollection('blogs')
  return entries
    .map(mapEntry)
    .sort((a, b) => a.order - b.order) // Sort by order ascending
}

export async function getBlogBySlug(slug: string) {
  const entries = await getCollection('blogs')
  const entry = entries.find((e: any) => e.slug === slug)
  return entry ? mapEntry(entry) : null
}
