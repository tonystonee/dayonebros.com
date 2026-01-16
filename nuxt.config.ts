import { resolve } from 'path'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Day One Bros',
      titleTemplate: '%s | Day One Bros',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { name: 'description', content: 'Daily video picks, rankings, and highlights from Day One Bros.' },
        { property: 'og:site_name', content: 'Day One Bros' },
        { property: 'og:title', content: 'Day One Bros' },
        { property: 'og:description', content: 'Daily video picks, rankings, and highlights from Day One Bros.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Day One Bros' },
        { name: 'twitter:description', content: 'Daily video picks, rankings, and highlights from Day One Bros.' }
      ],
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
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://dayonebros.com',
      youtubeApiKey: process.env.NUXT_PUBLIC_YOUTUBE_API_KEY ,
      youtubeEndpoint: process.env.NUXT_PUBLIC_YOUTUBE_ENDPOINT || 'https://www.googleapis.com/youtube/v3/search'
    }
  }
})
