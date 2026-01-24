import { z, defineCollection } from 'astro:content'

/**
 * Shared block schema for ContentLayout
 * Matches block.type and block.data used in your Vue components.
 */
const blocksSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('text'),
    data: z.object({
      title: z.string(),
      content: z.string(),
    }),
  }),
  z.object({
    type: z.literal('image'),
    data: z.object({
      image: z.string(),
      alt: z.string().optional(),
      caption: z.string().optional(),
    }),
  }),
  z.object({
    type: z.literal('left-text-image'),
    data: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string(),
    }),
  }),
  z.object({
    type: z.literal('right-text-image'),
    data: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string(),
    }),
  }),
  z.object({
    type: z.literal('image-grid'),
    data: z.object({
      columns: z.number().optional(),
      images: z.array(
        z.object({
          src: z.string(),
          alt: z.string().optional(),
        })
      ),
    }),
  }),
  z.object({
    type: z.literal('stats'),
    data: z.object({
      stats: z.array(
        z.object({
          value: z.string(),
          label: z.string(),
          description: z.string().optional(),
          icon: z.string().optional(),
        })
      ),
    }),
  }),
])

const overviewSchema = z
  .object({
    sections: z
      .array(
        z.object({
          title: z.string(),
          content: z.string(),
        })
      )
      .optional(),
    sidebar: z
      .object({
        role: z.array(z.string()).optional(),
        team: z.array(z.string()).optional(),
        duration: z.string().optional(),
        teamMembers: z
          .array(
            z.object({
              name: z.string(),
              role: z.string(),
              image: z.string().optional(),
              linkedIn: z.string(),
            })
          )
          .optional(),
      })
      .optional(),
  })
  .optional()

const navigationSchema = z
  .object({
    prev: z
      .object({
        title: z.string(),
        link: z.string(),
      })
      .optional(),
    next: z
      .object({
        title: z.string(),
        link: z.string(),
      })
      .optional(),
  })
  .optional()

/** CASE STUDIES */
const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // slug: z.string(),
    category: z.string().default('Case Study'),
    order: z.number().optional(), // For controlling display order
    audioFile: z.string().optional(), // Path to audio overview file
    cardGradient: z.string().optional(), // Custom gradient for card (e.g., 'from-blue-500 to-purple-600')
    cardHoverGradient: z.string().optional(),
    logo: z.string().optional(), // Company/project logo for card display
    heroImage: z.string().optional(), // ContentLayout passes string to HeroBlock
    heroVideo: z.string().optional(), // Loop video for hero
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    overview: overviewSchema,
    insights: z.array(z.string()).optional(),
    blocks: z.array(blocksSchema).default([]),
    navigation: navigationSchema,
  }),
})

/** PROJECTS */
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // slug: z.string(),
    category: z.string().default('Project'),
    order: z.number().optional(), // For controlling display order
    audioFile: z.string().optional(), // Path to audio overview file
    cardGradient: z.string().optional(), // Custom gradient for card
    cardHoverGradient: z.string().optional(),
    logo: z.string().optional(), // Company/project logo for card display
    heroImage: z.string().optional(),
    heroVideo: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    overview: overviewSchema,
    insights: z.array(z.string()).optional(),
    blocks: z.array(blocksSchema).default([]),
    navigation: navigationSchema,
  }),
})

/** BLOGS */
const blogs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // slug: z.string(),
    category: z.string().default('Blog'),
    order: z.number().optional(), // For controlling display order
    audioFile: z.string().optional(), // Path to audio overview file
    cardGradient: z.string().optional(), // Custom gradient for card
    cardHoverGradient: z.string().optional(),
    logo: z.string().optional(), // Company/project logo for card display
    heroImage: z.string().optional(),
    heroVideo: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    overview: overviewSchema.optional(), // blogs can be simpler
    insights: z.array(z.string()).optional(),
    blocks: z.array(blocksSchema).default([]),
    navigation: navigationSchema,
  }),
})

export const collections = {
  'case-studies': caseStudies,
  projects,
  blogs,
}
