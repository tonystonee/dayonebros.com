<template>
    <page :uri="uri" :maxResults="maxResults"/>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import Page from '@/components/Page.vue'
import type { RootState } from '@/store'

const store = useStore<RootState>()
const maxResults = ref(50)

const uri = computed(() => {
  return `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=${maxResults.value}&key=${store.state.key}`
})
</script>
