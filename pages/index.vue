<template>
    <section class="seo-hero mx-3">
        <h1 class="seo-title text-h4 font-weight-bold mb-2">
            DayOneBros: Today's Top 10 YouTube Videos
        </h1>
    </section>
    <Page
        :uri="uri"
        :max-results="maxResults"
    />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead, useRuntimeConfig } from '#imports'
import Page from '@/components/Page.vue'

defineOptions({ name: 'HomePage' })

const now = new Date()
const month = now.toLocaleString('en-US', { month: 'long' })
const year = now.getFullYear()
const dateStamp = `${month} ${year}`


useHead({
  title: `What to watch on YouTube right now | Top 10 viral videos ${dateStamp} - DayOneBros`,
  meta: [
    {
      name: 'description',
      content: 'Daily YouTube highlight reel with the top 10 viral videos you might have missed today.'
    },
    {
      property: 'og:title',
      content: `Top 10 viral videos ${dateStamp} - DayOneBros`
    },
    {
      property: 'og:description',
      content: 'Best new YouTube videos today, curated into a daily top-10 list.'
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
