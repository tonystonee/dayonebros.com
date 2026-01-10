export default defineNuxtConfig({
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],
  build: {
    transpile: ['vuetify']
  },
  vite: {
    ssr: {
      noExternal: ['vuetify']
    }
  },
  runtimeConfig: {
    public: {
      youtubeApiKey: process.env.NUXT_PUBLIC_YOUTUBE_API_KEY || 'AIzaSyA8jagLA7xPLvibUtFPfHWpAXNyIK2fUMs',
      youtubeEndpoint: process.env.NUXT_PUBLIC_YOUTUBE_ENDPOINT || 'https://www.googleapis.com/youtube/v3/search'
    }
  }
})
