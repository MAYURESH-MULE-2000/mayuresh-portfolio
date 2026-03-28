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

/** PM CASES - PM 100 Product Sense Series */
const pmCases = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    company: z.string(),
    questionNumber: z.string(), // e.g. "Q01"
    series: z.string().default('PM 100'),
    difficulty: z.enum(['easy', 'mid', 'hard']),
    date: z.string().optional(),
    order: z.number().optional(),
    cardGradient: z.string().optional(),
    cardHoverGradient: z.string().optional(),
    insights: z.array(z.string()).optional(),

    goal: z.object({
      objective: z.string(),
      measures: z.array(z.string()),
      whyItMatters: z.string(),
    }),

    market: z.object({
      context: z.string().optional(),
      funnel: z.array(z.object({
        label: z.string(),
        value: z.string(),
      })),
      insight: z.string().optional(),
    }),

    users: z.object({
      segments: z.array(z.object({
        name: z.string(),
        who: z.string(),
        coreNeed: z.string(),
        wtp: z.string(),
      })),
      focus: z.string(),
    }),

    pains: z.array(z.object({
      title: z.string(),
      frequency: z.string(),
      severity: z.string(),
      priority: z.enum(['P0', 'P1', 'P2']),
    })),

    features: z.object({
      items: z.array(z.object({
        name: z.string(),
        reach: z.number(),
        impact: z.number(),
        confidence: z.number(),
        effort: z.number(),
        score: z.number(),
      })),
      mvpDecision: z.string(),
    }),

    solution: z.object({
      name: z.string(),
      features: z.array(z.object({
        title: z.string(),
        description: z.string(),
      })),
    }),

    metrics: z.object({
      northStar: z.string(),
      targets: z.array(z.object({
        type: z.string(),
        metric: z.string(),
        target: z.string(),
      })),
      guardrails: z.array(z.string()),
    }),

    risks: z.array(z.object({
      risk: z.string(),
      likelihood: z.string(),
      mitigation: z.string(),
    })),

    summary: z.string().optional(),
  }),
})

export const collections = {
  'case-studies': caseStudies,
  'pm-cases': pmCases,
  projects,
  blogs,
}
