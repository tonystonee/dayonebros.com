<template>
  <Page :uri="uri" />
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { createError, definePageMeta, showError, useHead, useRuntimeConfig } from '#imports'
import slugify from 'slugify'
import Page from '@/components/Page.vue'
import categories from '@/config/categories'

const route = useRoute()
const config = useRuntimeConfig()
const maxResults = ref(50)

const slug = computed(() => String(route.params.category || ''))

const category = computed(() =>
  categories.find((item) => slugify(item.name) === slug.value)
)

// ✅ 404 in a way Nuxt supports (safe during SSR + route changes)
watchEffect(() => {
  if (!category.value && slug.value) {
    showError(createError({ statusCode: 404, statusMessage: 'Category not found' }))
  }
})

definePageMeta(() => ({
  barColor: category.value?.color ?? '#F44336'
}))

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

  // ✅ YouTube API uses `order=viewCount` (not orderBy)
  return `${config.public.youtubeEndpoint}?part=snippet&maxResults=${maxResults.value}&order=viewCount&regionCode=us&relevanceLanguage=en&type=video&videoCategoryId=${c.categoryId}&key=${config.public.youtubeApiKey}`
})
</script>
