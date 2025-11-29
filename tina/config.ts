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
      // you can later mirror your Astro collections here
    ],
  },
})
