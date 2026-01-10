<template>
    <page :uri="uri" :maxResults="maxResults"/>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Page from '@/components/Page.vue'

definePageMeta({
  barColor: '#F44336'
})

useHead({
  title: 'Home - Day One Bros',
  meta: [
    {
      name: 'description',
      content: 'Bored? Browse the top ten videos of the day at dayonebros.com.'
    }
  ]
})

const config = useRuntimeConfig()
const maxResults = ref(50)

const uri = computed(() => {
  return `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=${maxResults.value}&key=${config.public.youtubeApiKey}`
})
</script>
