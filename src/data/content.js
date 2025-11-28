export const caseStudies = [
  {
    slug: 'pmaps',
    type: 'case-study',
    title: 'PMaps Assessment Platform',
    category: 'Case Study',
    heroImage: '/images/case-studies/pmaps-hero.jpg',
    overview: {
      sections: [
        {
          title: 'The Problem',
          content: `We didn't just design for novice users, we also designed for past users and disabled individuals. We wanted to ensure the product's total user accessibility and relevance of device users.`,
        },
        {
          title: 'The Goal',
          content: `We conducted a learnability study with novice users, that simulated real usage frequency. Evaluated designs with experts, novices, and disabled individuals.`,
        },
        {
          title: 'The Approach',
          content: `Redesigned interface that helped novice users report accurately nature 15% faster than original interface (when compared to expert x).`,
        },
      ],
      sidebar: {
        role: [
          'UX Researcher (Co-Facilitator)',
          'UX Designer',
          'PM Coordinator',
        ],
        team: [
          'Mayuresh Mulana (Mentor-Microsoft)',
          'Priyanka Deshmukh',
          'Shreyas Bhujbal',
        ],
        duration: '6 months',
      },
    },
    blocks: [
      {
        type: 'text',
        data: {
          title: 'What makes this project special?',
          content: `We didn't just design for novice users, we also designed for past users and disabled individuals. We wanted to ensure the product's total user accessibility and relevance of device users of their workflows.`,
        },
      },
      {
        type: 'text',
        data: {
          title: 'What it looks like today...',
          content: '',
        },
      },
      {
        type: 'image',
        data: {
          image: '/images/case-studies/pmaps-screenshot.jpg',
          alt: 'PMaps Platform Screenshot',
          caption: '',
        },
      },
      {
        type: 'left-text-image',
        data: {
          title: 'The User',
          content: `We didn't just design for novice users, we also designed for past users and disabled individuals. We wanted to ensure the product's total user accessibility and relevance of device users of their workflows.`,
          image: '/images/case-studies/pmaps-user-1.jpg',
        },
      },
      {
        type: 'right-text-image',
        data: {
          title: 'The User',
          content: `We didn't just design for novice users, we also designed for past users and disabled individuals. We wanted to ensure the product's total user accessibility.`,
          image: '/images/case-studies/pmaps-user-2.jpg',
        },
      },
      {
        type: 'text',
        data: {
          title: 'The User',
          content: `We didn't just design for novice users, we also designed for past users and disabled individuals. We wanted to ensure the product's total user accessibility and relevance of device users of their workflows.`,
        },
      },
      {
        type: 'image-grid',
        data: {
          images: [
            { src: '/images/case-studies/pmaps-grid-1.jpg', alt: 'Feature 1' },
            { src: '/images/case-studies/pmaps-grid-2.jpg', alt: 'Feature 2' },
            { src: '/images/case-studies/pmaps-grid-3.jpg', alt: 'Feature 3' },
            { src: '/images/case-studies/pmaps-grid-4.jpg', alt: 'Feature 4' },
          ],
          columns: 2,
        },
      },
      {
        type: 'stats',
        data: {
          stats: [
            { value: '80%', label: 'Technology drove policy sales' },
            { value: '+40%', label: 'Increase in user engagement' },
            { value: 'Upto 30%', label: 'Faster task completion' },
          ],
        },
      },
    ],
    navigation: {
      prev: {
        link: '/case-study/ecommerce',
        title: 'E-commerce Redesign',
      },
      next: {
        link: '/case-study/dashboard',
        title: 'Analytics Dashboard',
      },
    },
  },
  {
    slug: 'ecommerce',
    type: 'case-study',
    title: 'E-commerce Platform Redesign',
    category: 'Case Study',
    heroImage: '/images/case-studies/ecommerce-hero.jpg',
    overview: {
      sections: [
        {
          title: 'The Challenge',
          content: `Redesigning a legacy e-commerce platform to improve conversion rates and user experience across mobile and desktop devices.`,
        },
        {
          title: 'The Solution',
          content: `Implemented a mobile-first design approach with streamlined checkout flow and improved product discovery.`,
        },
      ],
      sidebar: {
        role: ['Lead UX Designer', 'Frontend Developer'],
        team: ['Design Team', 'Engineering Team'],
        duration: '4 months',
      },
    },
    blocks: [
      {
        type: 'text',
        data: {
          title: 'Design Process',
          content: `We started with comprehensive user research and competitive analysis to understand pain points in the current system.`,
        },
      },
      {
        type: 'image',
        data: {
          image: '/images/case-studies/ecommerce-before-after.jpg',
          alt: 'Before and After Comparison',
        },
      },
    ],
    navigation: {
      next: {
        link: '/case-study/pmaps',
        title: 'PMaps Assessment',
      },
    },
  },
]

export const projects = [
  {
    slug: 'portfolio-website',
    type: 'project',
    title: 'Personal Portfolio Website',
    category: 'Project',
    heroImage: '/images/projects/portfolio-hero.jpg',
    overview: {
      sections: [
        {
          title: 'Overview',
          content: `A modern, responsive portfolio website built with Astro, Vue.js, and Tailwind CSS. Features dark mode, smooth animations, and optimized performance.`,
        },
        {
          title: 'Tech Stack',
          content: `Built with Astro for static site generation, Vue.js for interactive components, and Tailwind CSS for styling. Deployed on Vercel with automatic CI/CD.`,
        },
      ],
      sidebar: {
        role: ['Full-stack Developer', 'Designer'],
        team: ['Solo Project'],
        duration: '2 months',
      },
    },
    blocks: [
      {
        type: 'text',
        data: {
          title: 'Key Features',
          content: `Responsive design, dark mode support, dynamic content blocks, contact form integration, and optimized images for performance.`,
        },
      },
      {
        type: 'image',
        data: {
          image: '/images/projects/portfolio-screenshot.jpg',
          alt: 'Portfolio Homepage',
        },
      },
      {
        type: 'left-text-image',
        data: {
          title: 'Design System',
          content: `Created a cohesive design system with reusable components, consistent typography, and a carefully chosen color palette.`,
          image: '/images/projects/design-system.jpg',
        },
      },
      {
        type: 'stats',
        data: {
          stats: [
            { value: '95+', label: 'Lighthouse Performance Score' },
            { value: '100%', label: 'Accessibility Score' },
            { value: '<1s', label: 'Page Load Time' },
          ],
        },
      },
    ],
    navigation: {
      prev: {
        link: '/project/design-system',
        title: 'Design System',
      },
      next: {
        link: '/project/saas-dashboard',
        title: 'SaaS Dashboard',
      },
    },
  },
  {
    slug: 'design-system',
    type: 'project',
    title: 'Component Design System',
    category: 'Project',
    heroImage: '/images/projects/design-system-hero.jpg',
    overview: {
      sections: [
        {
          title: 'Purpose',
          content: `A comprehensive design system for building consistent and accessible web applications. Includes reusable components, design tokens, and documentation.`,
        },
      ],
      sidebar: {
        role: ['UI/UX Designer', 'Frontend Developer'],
        team: ['Design Team', 'Product Team'],
        duration: '3 months',
      },
    },
    blocks: [
      {
        type: 'text',
        data: {
          title: 'Components Library',
          content: `Built a library of 50+ components including buttons, forms, modals, navigation, and data visualization elements.`,
        },
      },
      {
        type: 'image-grid',
        data: {
          images: [
            { src: '/images/projects/components-1.jpg', alt: 'Buttons' },
            { src: '/images/projects/components-2.jpg', alt: 'Forms' },
            { src: '/images/projects/components-3.jpg', alt: 'Cards' },
            { src: '/images/projects/components-4.jpg', alt: 'Navigation' },
          ],
          columns: 2,
        },
      },
    ],
    navigation: {
      next: {
        link: '/project/portfolio-website',
        title: 'Portfolio Website',
      },
    },
  },
]

export const blogs = [
  {
    slug: 'building-accessible-uis',
    type: 'blog',
    title: 'Building Accessible User Interfaces',
    category: 'Blog',
    heroImage: '/images/blogs/accessibility-hero.jpg',
    overview: {
      sections: [
        {
          title: 'Introduction',
          content: `Accessibility is not just a feature—it's a fundamental aspect of good design. Learn how to build interfaces that work for everyone.`,
        },
      ],
      sidebar: {
        role: ['Author'],
        team: ['Mayuresh Mule'],
        duration: 'Published: Nov 2025',
      },
    },
    blocks: [
      {
        type: 'text',
        data: {
          title: 'Why Accessibility Matters',
          content: `Over 1 billion people worldwide live with some form of disability. Creating accessible interfaces ensures that everyone can use your product, regardless of their abilities.`,
        },
      },
      {
        type: 'text',
        data: {
          title: 'Key Principles',
          content: `The four main principles of accessibility are: Perceivable, Operable, Understandable, and Robust (POUR). These principles guide all accessibility decisions.`,
        },
      },
      {
        type: 'image',
        data: {
          image: '/images/blogs/accessibility-principles.jpg',
          alt: 'POUR Principles Diagram',
          caption: 'The four principles of web accessibility',
        },
      },
      {
        type: 'left-text-image',
        data: {
          title: 'Keyboard Navigation',
          content: `Ensure all interactive elements can be accessed and operated using only a keyboard. This is crucial for users who cannot use a mouse.`,
          image: '/images/blogs/keyboard-nav.jpg',
        },
      },
      {
        type: 'right-text-image',
        data: {
          title: 'Color Contrast',
          content: `Maintain sufficient color contrast between text and background. WCAG recommends a minimum contrast ratio of 4.5:1 for normal text.`,
          image: '/images/blogs/color-contrast.jpg',
        },
      },
      {
        type: 'text',
        data: {
          title: 'Semantic HTML',
          content: `Use proper HTML elements for their intended purpose. This helps screen readers understand the structure and meaning of your content.`,
        },
      },
      {
        type: 'stats',
        data: {
          stats: [
            {
              value: '15%',
              label: 'of global population has some form of disability',
            },
            { value: '4.5:1', label: 'Minimum color contrast ratio (WCAG AA)' },
            { value: '100%', label: 'Users benefit from accessible design' },
          ],
        },
      },
    ],
    navigation: {
      next: {
        link: '/blog/ux-research-methods',
        title: 'UX Research Methods',
      },
    },
  },
  {
    slug: 'ux-research-methods',
    type: 'blog',
    title: 'Essential UX Research Methods',
    category: 'Blog',
    heroImage: '/images/blogs/research-hero.jpg',
    overview: {
      sections: [
        {
          title: 'Introduction',
          content: `UX research is the foundation of great product design. Explore the most effective methods for understanding your users.`,
        },
      ],
      sidebar: {
        role: ['Author'],
        team: ['Mayuresh Mule'],
        duration: 'Published: Nov 2025',
      },
    },
    blocks: [
      {
        type: 'text',
        data: {
          title: 'Qualitative vs Quantitative',
          content: `Understanding the difference between qualitative and quantitative research methods is crucial for choosing the right approach for your project.`,
        },
      },
      {
        type: 'image',
        data: {
          image: '/images/blogs/research-methods.jpg',
          alt: 'Research Methods Overview',
        },
      },
      {
        type: 'left-text-image',
        data: {
          title: 'User Interviews',
          content: `One-on-one conversations with users to understand their needs, pain points, and behaviors. Best for exploratory research.`,
          image: '/images/blogs/interviews.jpg',
        },
      },
      {
        type: 'right-text-image',
        data: {
          title: 'Usability Testing',
          content: `Observing users as they interact with your product to identify usability issues and areas for improvement.`,
          image: '/images/blogs/usability-testing.jpg',
        },
      },
    ],
    navigation: {
      prev: {
        link: '/blog/building-accessible-uis',
        title: 'Building Accessible UIs',
      },
      next: {
        link: '/blog/design-systems',
        title: 'Design Systems 101',
      },
    },
  },
]

// Helper function to get all content for resources page
export const getAllContent = () => {
  return [
    ...caseStudies.map((item) => ({ ...item, label: 'Case Study' })),
    ...projects.map((item) => ({ ...item, label: 'Project' })),
    ...blogs.map((item) => ({ ...item, label: 'Blog' })),
  ]
}
