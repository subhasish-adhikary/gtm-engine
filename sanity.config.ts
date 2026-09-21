import {defineConfig} from 'sanity'
import {visionTool} from '@sanity/vision'
import {structureTool} from 'sanity/structure'

// Sanity Studio for project-almond-feather.
// Schemas are intentionally empty for now: content-model work and article
// migration are a later phase. Document types will be added to this array.
export default defineConfig({
  name: 'default',
  title: 'Subhasish Adhikary — CMS',

  projectId: '0uqx6fx',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [],
  },
})
