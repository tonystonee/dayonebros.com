<template>
    <section class="seo-hero">
        <h1 class="seo-title">DayOneBros: Today's Top 10 YouTube Videos</h1>
        <p class="seo-date">{{ dateLabel }}</p>
        <p class="seo-copy">
            Daily YouTube highlight reel with the top 10 viral videos you might have missed today.
        </p>
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
const dateLabel = now.toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
})

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

<style scoped lang="scss">
.seo-hero{
    margin: 12px 0 16px;
    padding: 16px 18px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(var(--v-theme-surface), 0.95), rgba(var(--v-theme-surface), 0.7));
    border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
    box-shadow: 0 10px 24px rgba(var(--v-theme-on-surface), 0.08);
}
.seo-title{
    font-size: 28px;
    font-weight: 800;
    letter-spacing: 0.2px;
    margin: 0 0 8px;
}
.seo-date{
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: rgba(var(--v-theme-on-surface), 0.7);
    margin: 0 0 10px;
}
.seo-date::before{
    content: '';
    width: 12px;
    height: 2px;
    background: rgba(var(--v-theme-primary), 0.85);
    border-radius: 999px;
}
.seo-copy{
    margin: 0;
    font-size: 15px;
    line-height: 1.5;
    color: rgba(var(--v-theme-on-surface), 0.72);
}
</style>
