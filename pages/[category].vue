<template>
    <section class="seo-hero">
        <h1 class="seo-title">DayOneBros: Today's Top 10 {{ category?.name ?? 'Category' }} Videos</h1>
        <p class="seo-date">{{ dateLabel }}</p>
        <p class="seo-copy">
            Daily {{ (category?.name ?? 'category').toLowerCase() }} highlights with the best new videos right now.
        </p>
    </section>
    <Page :uri="uri" />
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { createError, showError, useHead, useRuntimeConfig } from '#imports'
import slugify from 'slugify'
import Page from '@/components/Page.vue'
import categories from '@/config/categories'

defineOptions({ name: 'CategoryPage' })

const route = useRoute()
const config = useRuntimeConfig()
const maxResults = ref(10)
const dateLabel = new Date().toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
})

const slug = computed(() => String(route.params.category || '').toLowerCase())

const category = computed(() =>
  categories.find((item) => slugify(item.name, { lower: true }) === slug.value)
)

// ✅ 404 in a way Nuxt supports (safe during SSR + route changes)
watchEffect(() => {
  if (!category.value && slug.value) {
    showError(createError({ statusCode: 404, statusMessage: 'Category not found' }))
  }
})

useHead(() => {
  const categoryName = category.value?.name ?? 'Category'
  return {
    title: `Top 10 ${categoryName} videos today | DayOneBros`,
    meta: [
      {
        name: 'description',
        content: `Daily ${categoryName.toLowerCase()} highlights with the top 10 videos to watch right now.`
      },
      {
        property: 'og:title',
        content: `Top 10 ${categoryName} videos today | DayOneBros`
      },
      {
        property: 'og:description',
        content: `Best new ${categoryName.toLowerCase()} videos today in a daily list.`
      },
      {
        name: 'twitter:card',
        content: 'summary'
      }
    ]
  }
})

const uri = computed(() => {
  const c = category.value
  if (!c) return ''

  // Use search.list with a category query and order by view count
  const url = new URL('https://www.googleapis.com/youtube/v3/search')
  url.searchParams.set('part', 'snippet')
  url.searchParams.set('order', 'viewCount')
  url.searchParams.set('type', 'video')
  url.searchParams.set('videoCategoryId', String(c.categoryId))
  url.searchParams.set('regionCode', 'us')
  url.searchParams.set('maxResults', String(maxResults.value))
  url.searchParams.set('q', c.name)
  url.searchParams.set('key', config.public.youtubeApiKey)
  return url.toString()
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
    font-size: 26px;
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
