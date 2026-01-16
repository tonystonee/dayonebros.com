<template>
    <SeoHeader title="Random YouTube Video Generator" />
    <Page
        :uri="uri"
        :max-results="maxResults"
        :summary="summaryText"
    />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead, useRuntimeConfig } from '#imports'
import Page from '@/components/Page.vue'
import SeoHeader from '@/components/SeoHeader.vue'

defineOptions({ name: 'RandomGeneratorPage' })

const summaryText = 'YouTube Roulette 2026'

useHead({
  title: 'Random YouTube Video Generator',
  meta: [
    {
      name: 'description',
      content: 'YouTube Roulette 2026'
    },
    {
      property: 'og:title',
      content: 'Random YouTube Video Generator'
    },
    {
      property: 'og:description',
      content: 'YouTube Roulette 2026'
    },
    {
      name: 'twitter:card',
      content: 'summary'
    }
  ]
})

const config = useRuntimeConfig()
const maxResults = ref(50)

const uri = computed(() => {
  return `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=${maxResults.value}&key=${config.public.youtubeApiKey}`
})
</script>
