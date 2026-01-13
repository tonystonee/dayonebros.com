<template>
    <section class="seo-hero mx-3">
        <h1 class="seo-title text-h5 font-weight-bold mb-2">
            DayOneBros: Today's Top 10 {{ category?.name ?? 'Category' }} Videos
        </h1>
    </section>
    <Page
        :uri="uri"
        :summary="summaryText"
    />
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

const slug = computed(() => String(route.params.category || '').toLowerCase())

const category = computed(() =>
  categories.find((item) => slugify(item.name, { lower: true }) === slug.value)
)

const summaryText = computed(() => {
  const categoryName = category.value?.name ?? 'category'
  return `Daily ${categoryName.toLowerCase()} highlights with the best new videos right now.`
})

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
