import { defineConfig } from 'tinacms'

export default defineConfig({
  clientId: '', // or from env
  branch: 'main',
  token: '', // or from env in production
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'case_studies',
        label: 'Case Studies',
        path: 'src/content/case-studies',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'category',
            label: 'Category',
            ui: {
              defaultValue: 'Case Study',
            },
          },
          {
            type: 'image',
            name: 'heroImage',
            label: 'Hero Image',
          },
          {
            type: 'string',
            name: 'metaTitle',
            label: 'Meta Title',
          },
          {
            type: 'string',
            name: 'metaDescription',
            label: 'Meta Description',
          },
          {
            type: 'object',
            name: 'overview',
            label: 'Overview',
            fields: [
              {
                type: 'object',
                name: 'sections',
                label: 'Sections',
                list: true,
                fields: [
                  { type: 'string', name: 'title', label: 'Title' },
                  { type: 'string', name: 'content', label: 'Content', ui: { component: 'textarea' } },
                ],
              },
              {
                type: 'object',
                name: 'sidebar',
                label: 'Sidebar',
                fields: [
                  { type: 'string', name: 'role', label: 'Role', list: true },
                  { type: 'string', name: 'team', label: 'Team', list: true },
                  { type: 'string', name: 'duration', label: 'Duration' },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'navigation',
            label: 'Navigation',
            fields: [
              {
                type: 'object',
                name: 'prev',
                label: 'Previous',
                fields: [
                  { type: 'string', name: 'title', label: 'Title' },
                  { type: 'string', name: 'link', label: 'Link' },
                ],
              },
              {
                type: 'object',
                name: 'next',
                label: 'Next',
                fields: [
                  { type: 'string', name: 'title', label: 'Title' },
                  { type: 'string', name: 'link', label: 'Link' },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'blocks',
            label: 'Content Blocks',
            list: true,
            templates: [
              {
                name: 'text',
                label: 'Text',
                fields: [
                  { type: 'string', name: 'title', label: 'Title' },
                  { type: 'string', name: 'content', label: 'Content', ui: { component: 'textarea' } },
                ],
              },
              {
                name: 'image',
                label: 'Image',
                fields: [
                  { type: 'image', name: 'image', label: 'Image' },
                  { type: 'string', name: 'alt', label: 'Alt Text' },
                  { type: 'string', name: 'caption', label: 'Caption' },
                ],
              },
              {
                name: 'left_text_image',
                label: 'Left Text / Right Image',
                fields: [
                  { type: 'string', name: 'title', label: 'Title' },
                  { type: 'string', name: 'content', label: 'Content', ui: { component: 'textarea' } },
                  { type: 'image', name: 'image', label: 'Image' },
                ],
              },
              {
                name: 'right_text_image',
                label: 'Right Text / Left Image',
                fields: [
                  { type: 'string', name: 'title', label: 'Title' },
                  { type: 'string', name: 'content', label: 'Content', ui: { component: 'textarea' } },
                  { type: 'image', name: 'image', label: 'Image' },
                ],
              },
              {
                name: 'image_grid',
                label: 'Image Grid',
                fields: [
                  { type: 'number', name: 'columns', label: 'Columns' },
                  {
                    type: 'object',
                    name: 'images',
                    label: 'Images',
                    list: true,
                    fields: [
                      { type: 'image', name: 'src', label: 'Image Source' },
                      { type: 'string', name: 'alt', label: 'Alt Text' },
                    ],
                  },
                ],
              },
              {
                name: 'stats',
                label: 'Stats',
                fields: [
                  {
                    type: 'object',
                    name: 'stats',
                    label: 'Stats List',
                    list: true,
                    fields: [
                      { type: 'string', name: 'value', label: 'Value' },
                      { type: 'string', name: 'label', label: 'Label' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'projects',
        label: 'Projects',
        path: 'src/content/projects',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'category',
            label: 'Category',
            ui: {
              defaultValue: 'Project',
            },
          },
          {
            type: 'image',
            name: 'heroImage',
            label: 'Hero Image',
          },
          {
            type: 'string',
            name: 'metaTitle',
            label: 'Meta Title',
          },
          {
            type: 'string',
            name: 'metaDescription',
            label: 'Meta Description',
          },
          {
            type: 'object',
            name: 'overview',
            label: 'Overview',
            fields: [
              {
                type: 'object',
                name: 'sections',
                label: 'Sections',
                list: true,
                fields: [
                  { type: 'string', name: 'title', label: 'Title' },
                  { type: 'string', name: 'content', label: 'Content', ui: { component: 'textarea' } },
                ],
              },
              {
                type: 'object',
                name: 'sidebar',
                label: 'Sidebar',
                fields: [
                  { type: 'string', name: 'role', label: 'Role', list: true },
                  { type: 'string', name: 'team', label: 'Team', list: true },
                  { type: 'string', name: 'duration', label: 'Duration' },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'navigation',
            label: 'Navigation',
            fields: [
              {
                type: 'object',
                name: 'prev',
                label: 'Previous',
                fields: [
                  { type: 'string', name: 'title', label: 'Title' },
                  { type: 'string', name: 'link', label: 'Link' },
                ],
              },
              {
                type: 'object',
                name: 'next',
                label: 'Next',
                fields: [
                  { type: 'string', name: 'title', label: 'Title' },
                  { type: 'string', name: 'link', label: 'Link' },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'blocks',
            label: 'Content Blocks',
            list: true,
            templates: [
              {
                name: 'text',
                label: 'Text',
                fields: [
                  { type: 'string', name: 'title', label: 'Title' },
                  { type: 'string', name: 'content', label: 'Content', ui: { component: 'textarea' } },
                ],
              },
              {
                name: 'image',
                label: 'Image',
                fields: [
                  { type: 'image', name: 'image', label: 'Image' },
                  { type: 'string', name: 'alt', label: 'Alt Text' },
                  { type: 'string', name: 'caption', label: 'Caption' },
                ],
              },
              {
                name: 'left_text_image',
                label: 'Left Text / Right Image',
                fields: [
                  { type: 'string', name: 'title', label: 'Title' },
                  { type: 'string', name: 'content', label: 'Content', ui: { component: 'textarea' } },
                  { type: 'image', name: 'image', label: 'Image' },
                ],
              },
              {
                name: 'right_text_image',
                label: 'Right Text / Left Image',
                fields: [
                  { type: 'string', name: 'title', label: 'Title' },
                  { type: 'string', name: 'content', label: 'Content', ui: { component: 'textarea' } },
                  { type: 'image', name: 'image', label: 'Image' },
                ],
              },
              {
                name: 'image_grid',
                label: 'Image Grid',
                fields: [
                  { type: 'number', name: 'columns', label: 'Columns' },
                  {
                    type: 'object',
                    name: 'images',
                    label: 'Images',
                    list: true,
                    fields: [
                      { type: 'image', name: 'src', label: 'Image Source' },
                      { type: 'string', name: 'alt', label: 'Alt Text' },
                    ],
                  },
                ],
              },
              {
                name: 'stats',
                label: 'Stats',
                fields: [
                  {
                    type: 'object',
                    name: 'stats',
                    label: 'Stats List',
                    list: true,
                    fields: [
                      { type: 'string', name: 'value', label: 'Value' },
                      { type: 'string', name: 'label', label: 'Label' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'blogs',
        label: 'Blogs',
        path: 'src/content/blogs',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'category',
            label: 'Category',
            ui: {
              defaultValue: 'Blog',
            },
          },
          {
            type: 'image',
            name: 'heroImage',
            label: 'Hero Image',
          },
          {
            type: 'string',
            name: 'metaTitle',
            label: 'Meta Title',
          },
          {
            type: 'string',
            name: 'metaDescription',
            label: 'Meta Description',
          },
          {
            type: 'object',
            name: 'overview',
            label: 'Overview',
            fields: [
              {
                type: 'object',
                name: 'sections',
                label: 'Sections',
                list: true,
                fields: [
                  { type: 'string', name: 'title', label: 'Title' },
                  { type: 'string', name: 'content', label: 'Content', ui: { component: 'textarea' } },
                ],
              },
              {
                type: 'object',
                name: 'sidebar',
                label: 'Sidebar',
                fields: [
                  { type: 'string', name: 'role', label: 'Role', list: true },
                  { type: 'string', name: 'team', label: 'Team', list: true },
                  { type: 'string', name: 'duration', label: 'Duration' },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'navigation',
            label: 'Navigation',
            fields: [
              {
                type: 'object',
                name: 'prev',
                label: 'Previous',
                fields: [
                  { type: 'string', name: 'title', label: 'Title' },
                  { type: 'string', name: 'link', label: 'Link' },
                ],
              },
              {
                type: 'object',
                name: 'next',
                label: 'Next',
                fields: [
                  { type: 'string', name: 'title', label: 'Title' },
                  { type: 'string', name: 'link', label: 'Link' },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'blocks',
            label: 'Content Blocks',
            list: true,
            templates: [
              {
                name: 'text',
                label: 'Text',
                fields: [
                  { type: 'string', name: 'title', label: 'Title' },
                  { type: 'string', name: 'content', label: 'Content', ui: { component: 'textarea' } },
                ],
              },
              {
                name: 'image',
                label: 'Image',
                fields: [
                  { type: 'image', name: 'image', label: 'Image' },
                  { type: 'string', name: 'alt', label: 'Alt Text' },
                  { type: 'string', name: 'caption', label: 'Caption' },
                ],
              },
              {
                name: 'left_text_image',
                label: 'Left Text / Right Image',
                fields: [
                  { type: 'string', name: 'title', label: 'Title' },
                  { type: 'string', name: 'content', label: 'Content', ui: { component: 'textarea' } },
                  { type: 'image', name: 'image', label: 'Image' },
                ],
              },
              {
                name: 'right_text_image',
                label: 'Right Text / Left Image',
                fields: [
                  { type: 'string', name: 'title', label: 'Title' },
                  { type: 'string', name: 'content', label: 'Content', ui: { component: 'textarea' } },
                  { type: 'image', name: 'image', label: 'Image' },
                ],
              },
              {
                name: 'image_grid',
                label: 'Image Grid',
                fields: [
                  { type: 'number', name: 'columns', label: 'Columns' },
                  {
                    type: 'object',
                    name: 'images',
                    label: 'Images',
                    list: true,
                    fields: [
                      { type: 'image', name: 'src', label: 'Image Source' },
                      { type: 'string', name: 'alt', label: 'Alt Text' },
                    ],
                  },
                ],
              },
              {
                name: 'stats',
                label: 'Stats',
                fields: [
                  {
                    type: 'object',
                    name: 'stats',
                    label: 'Stats List',
                    list: true,
                    fields: [
                      { type: 'string', name: 'value', label: 'Value' },
                      { type: 'string', name: 'label', label: 'Label' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
})
