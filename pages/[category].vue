<template>
    <SeoHeader :title="headerTitle" />
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
import SeoHeader from '@/components/SeoHeader.vue'
import categories from '@/config/categories'

defineOptions({ name: 'CategoryPage' })

const route = useRoute()
const config = useRuntimeConfig()
const maxResults = ref(10)
const now = new Date()
const dateStamp = now.toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})

const slug = computed(() => String(route.params.category || '').toLowerCase())

const category = computed(() =>
  categories.find((item) => slugify(item.name, { lower: true }) === slug.value)
)

const categorySeoCopy = {
  comedy: {
    title: 'Top 10 Funniest YouTube Videos Today',
    description: 'Viral Comedy Clips'
  },
  entertainment: {
    title: 'Best Entertainment Videos Today',
    description: 'Top 10 Trending Clips'
  },
  gaming: {
    title: 'Top 10 Trending Gaming Videos',
    description: "Today's Best Gameplay"
  },
  'science-technology': {
    title: 'Top 10 Tech & Science Videos Today',
    description: 'New Tech Trends'
  },
  education: {
    title: 'Top 10 Educational Videos Today',
    description: 'Learn Something New'
  },
  'howto-style': {
    title: 'Top 10 How-to & DIY Videos Today',
    description: 'Viral Style Trends'
  }
} as const

const seoCopy = computed(() => {
  const key = slug.value as keyof typeof categorySeoCopy
  return categorySeoCopy[key]
})

const summaryText = computed(() => {
  const categoryName = category.value?.name ?? 'category'
  return `Daily ${categoryName.toLowerCase()} highlights with the best new videos right now.`
})

const headerTitle = computed(() => {
  const categoryName = category.value?.name ?? 'Category'
  return `DayOneBros: Today's Top 10 ${categoryName} Videos`
})

// ✅ 404 in a way Nuxt supports (safe during SSR + route changes)
watchEffect(() => {
  if (!category.value && slug.value) {
    showError(createError({ statusCode: 404, statusMessage: 'Category not found' }))
  }
})

useHead(() => {
  const categoryName = category.value?.name ?? 'Category'
  const baseTitle = seoCopy.value?.title ?? `Top 10 ${categoryName} videos today`
  const description = seoCopy.value?.description
    ?? `Daily ${categoryName.toLowerCase()} highlights with the best new videos right now.`
  const title = `${baseTitle} - ${dateStamp}`
  return {
    title,
    meta: [
      {
        name: 'description',
        content: description
      },
      {
        property: 'og:title',
        content: title
      },
      {
        property: 'og:description',
        content: description
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
