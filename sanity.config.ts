import {defineConfig} from 'sanity'
import {visionTool} from '@sanity/vision'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './src/sanity/schemaTypes'

// Sanity Studio for project-almond-feather.
export default defineConfig({
  name: 'default',
  title: 'Subhasish Adhikary — CMS',

  projectId: '0uqx6fxe',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
