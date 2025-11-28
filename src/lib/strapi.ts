// Types
interface StrapiMediaData {
  data: {
    id: number
    attributes: {
      url: string
      alternativeText?: string
    }
  } | null
}

interface StrapiItem<T> {
  id: number
  attributes: T
}

interface ContentAttributes {
  title: string
  slug: string
  category: string
  heroImage: StrapiMediaData
  overview?: any
  blocks?: any[]
  navigation?: any
}

interface ContentItem {
  slug: string
  type: string
  title: string
  category: string
  heroImage: string
  overview: any
  blocks: any[]
  navigation: any
}

// Strapi API base URL
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337'



export async function getJsonTableRows() {
  const res = await fetch(`${STRAPI_URL}/api/json-table-tests`)
  const json = await res.json()
  // Debug: uncomment next line to verify response
  console.log('Strapi JSON:', json)

  // FIX: Access .data[0] and then .rows directly, since .attributes is NOT present
  // in your specific log output for this endpoint.
  const rows = json.data && json.data[0]?.rows

  return Array.isArray(rows) ? rows : []
}


/**
 * Fetch data from Strapi API
 */
async function fetchAPI(endpoint: string, options: { query?: Record<string, any> } = {}) {
  const { query = {} } = options
  
  const queryString = new URLSearchParams(query).toString()
  const url = `${STRAPI_URL}/api/${endpoint}${queryString ? `?${queryString}` : ''}`
  
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch from Strapi: ${response.statusText}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Strapi fetch error:', error)
    throw error
  }
}

/**
 * Get all case studies
 */
export async function getCaseStudies(): Promise<ContentItem[]> {
  const data = await fetchAPI('case-studies', {
    query: {
      populate: 'deep'
    }
  })
  
  return data.data.map((item: StrapiItem<ContentAttributes>) => transformCaseStudy(item))
}

/**
 * Get single case study by slug
 */
export async function getCaseStudyBySlug(slug: string): Promise<ContentItem | null> {
  const data = await fetchAPI('case-studies', {
    query: {
      'filters[slug][$eq]': slug,
      populate: 'deep'
    }
  })
  
  if (!data.data || data.data.length === 0) {
    return null
  }
  
  return transformCaseStudy(data.data[0])
}

/**
 * Get all projects
 */
export async function getProjects(): Promise<ContentItem[]> {
  const data = await fetchAPI('projects', {
    // Add populate to ensure heroImage is included
    query: {
      populate: 'heroImage' 
    }
  })
  
  // Note: We use data.data here, and map it using the revised transformProject
  return data.data.map(transformProject)
}

/**
 * Get single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<ContentItem | null> {
  const data = await fetchAPI('projects', {});
  // Find by slug manually since no filters in your backend
  const item = data.data.find((item: any) => item.slug === slug);
  return item ? transformProject(item) : null;
}


/**
 * Get all blogs
 */
export async function getBlogs(): Promise<ContentItem[]> {
  const data = await fetchAPI('blogs', {
    query: {
      populate: 'deep'
    }
  })
  
  return data.data.map((item: StrapiItem<ContentAttributes>) => transformBlog(item))
}

/**
 * Get single blog by slug
 */
export async function getBlogBySlug(slug: string): Promise<ContentItem | null> {
  const data = await fetchAPI('blogs', {
    query: {
      'filters[slug][$eq]': slug,
      populate: 'deep'
    }
  })
  
  if (!data.data || data.data.length === 0) {
    return null
  }
  
  return transformBlog(data.data[0])
}

/**
 * Transform Strapi case study to our format
 */
function transformCaseStudy(item: StrapiItem<ContentAttributes>): ContentItem {
  const attrs = item.attributes
  
  return {
    slug: attrs.slug,
    type: 'case-study',
    title: attrs.title,
    category: attrs.category || 'Case Study',
    heroImage: getStrapiMedia(attrs.heroImage),
    overview: attrs.overview || null,
    blocks: transformBlocks(attrs.blocks || []),
    navigation: attrs.navigation || null,
  }
}

/**
 * Transform project (assuming non-standard flat structure: { id, title, slug, heroImage, ... })
 * @param {any} item - The flat project item from Strapi's data array
 * @returns {ContentItem}
 */
function transformProject(item: any): ContentItem {
  // Since the slug, title, and category are directly on the item (not item.attributes)
  return {
    slug: item.slug,
    type: 'project',
    title: item.title,
    category: item.category || 'Project',
    
    // The heroImage data object is also directly on the item
    heroImage: getStrapiMedia(item.heroImage), 
    
    overview: item.overview || null, // Access any overview field if it exists
    blocks: item.blocks ? transformBlocks(item.blocks) : [],
    navigation: item.navigation || null,
  }
}
/**
 * Transform blog
 */
function transformBlog(item: StrapiItem<ContentAttributes>): ContentItem {
  const attrs = item.attributes
  
  return {
    slug: attrs.slug,
    type: 'blog',
    title: attrs.title,
    category: attrs.category || 'Blog',
    heroImage: getStrapiMedia(attrs.heroImage),
    overview: attrs.overview || null,
    blocks: transformBlocks(attrs.blocks || []),
    navigation: attrs.navigation || null,
  }
}

/**
 * Transform blocks to include full image URLs
 */
function transformBlocks(blocks: any[]): any[] {
  return blocks.map((block: any) => {
    const transformed = { ...block }
    
    // Handle different block types
    if (block.__component === 'content.image-block' && block.image) {
      transformed.data = {
        ...block,
        image: getStrapiMedia(block.image)
      }
    }
    
    if (block.__component === 'content.left-text-image' && block.image) {
      transformed.data = {
        ...block,
        image: getStrapiMedia(block.image)
      }
    }
    
    if (block.__component === 'content.right-text-image' && block.image) {
      transformed.data = {
        ...block,
        image: getStrapiMedia(block.image)
      }
    }
    
    if (block.__component === 'content.image-grid' && block.images) {
      transformed.data = {
        ...block,
        images: block.images.data?.map((img: any) => ({
          src: getStrapiMedia({ data: img }),
          alt: img.attributes.alternativeText || ''
        })) || []
      }
    }
    
    return transformed
  })
}

/**
 * Get full Strapi media URL
 */
function getStrapiMedia(media: StrapiMediaData | null | undefined): string {
  if (!media || !media.data) return ''
  
  const url = media.data.attributes.url
  
  // If URL is already absolute, return as is
  if (url.startsWith('http')) {
    return url
  }
  
  // Otherwise prepend Strapi URL
  return `${STRAPI_URL}${url}`
}

