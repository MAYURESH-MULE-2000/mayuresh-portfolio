// Strapi Media Response
export interface StrapiMedia {
  data: {
    id: number
    attributes: {
      url: string
      alternativeText?: string
      width?: number
      height?: number
    }
  } | null
}

// Strapi Response Wrapper
export interface StrapiResponse<T> {
  data: T[]
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// Strapi Single Item
export interface StrapiItem<T> {
  id: number
  attributes: T
}

// Case Study Attributes
export interface CaseStudyAttributes {
  title: string
  slug: string
  category: string
  heroImage: StrapiMedia
  overview?: any
  blocks?: any[]
  navigation?: any
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// Project Attributes (same structure)
export interface ProjectAttributes {
  title: string
  slug: string
  category: string
  heroImage: StrapiMedia
  overview?: any
  blocks?: any[]
  navigation?: any
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// Blog Attributes (same structure)
export interface BlogAttributes {
  title: string
  slug: string
  category: string
  heroImage: StrapiMedia
  overview?: any
  blocks?: any[]
  navigation?: any
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// Content Item (for frontend use)
export interface ContentItem {
  id: string
  title: string
  label: string
  slug: string
  thumbnail: string
  route: 'case-study' | 'project' | 'blog'
}
