<template>
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
const maxResults = ref(50)

const slug = computed(() => String(route.params.category || '').toLowerCase())

const category = computed(() =>
  categories.find((item) => slugify(item.name, { lower: true }) === slug.value)
)
console.log(categories);

// ✅ 404 in a way Nuxt supports (safe during SSR + route changes)
watchEffect(() => {
  if (!category.value && slug.value) {
    showError(createError({ statusCode: 404, statusMessage: 'Category not found' }))
  }
})

useHead(() => ({
  title: `DayOneBros: ${category.value?.name ?? 'Category'}`,
  meta: [
    {
      name: 'description',
      content: `The top ${category.value?.name ?? 'category'} videos of the day.`
    }
  ]
}))

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
