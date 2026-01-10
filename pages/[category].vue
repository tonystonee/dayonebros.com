<template>
    <page :uri="uri"/>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import slugify from 'slugify'
import Page from '@/components/Page.vue'
import categories from '@/config/categories'

const route = useRoute()
const config = useRuntimeConfig()
const maxResults = ref(50)

const slug = computed(() => route.params.category?.toString() ?? '')
const category = computed(() =>
  categories.find((item) => slugify(item.name) === slug.value)
)

if (!category.value) {
  throw createError({ statusCode: 404, statusMessage: 'Category not found' })
}

definePageMeta({
  barColor: category.value?.color ?? '#F44336'
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
  if (!category.value) {
    return ''
  }
  return `${config.public.youtubeEndpoint}?part=snippet&maxResults=${maxResults.value}&orderBy=viewCount&regionCode=us&relevanceLanguage=en&type=video&videoCategoryId=${category.value.categoryId}&key=${config.public.youtubeApiKey}`
})
</script>
