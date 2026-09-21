import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '0uqx6fx',
    dataset: 'production',
  },
  // `sanity build` output target — the Vite build copies public/ into dist/,
  // so the Studio ships inside the main site deployment under /studio/.
  studioHost: 'subhasishadhikary',
})
