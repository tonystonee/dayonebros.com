import { resolve } from 'path'

export default defineNuxtConfig({
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],
  build: {
    transpile: ['vuetify']
  },
  vite: {
    ssr: {
      noExternal: ['vuetify']
    },
    resolve: {
      alias: {
        '#app-manifest': resolve(__dirname, 'app-manifest')
      }
    }
  },
  compatibilityDate: '2026-01-10',
  postcss: {
    plugins: {
      autoprefixer: {}
    }
  },
  runtimeConfig: {
    public: {
      youtubeApiKey: process.env.NUXT_PUBLIC_YOUTUBE_API_KEY || 'AIzaSyA8jagLA7xPLvibUtFPfHWpAXNyIK2fUMs',
      youtubeEndpoint: process.env.NUXT_PUBLIC_YOUTUBE_ENDPOINT || 'https://www.googleapis.com/youtube/v3/search'
    }
  }
})
