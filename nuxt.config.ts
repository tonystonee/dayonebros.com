import { resolve } from 'path'

export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-P998S9HDSH',
          async: true
        },
        {
          innerHTML: "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-P998S9HDSH');"
        }
      ]
    }
  },
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css', '@/assets/styles/shared.scss'],
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
      youtubeApiKey: process.env.NUXT_PUBLIC_YOUTUBE_API_KEY ,
      youtubeEndpoint: process.env.NUXT_PUBLIC_YOUTUBE_ENDPOINT || 'https://www.googleapis.com/youtube/v3/search'
    }
  }
})
