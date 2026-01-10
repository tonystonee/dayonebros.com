<template>
    <page :uri="uri"/>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import Page from '@/components/Page.vue'
import type { RootState } from '@/store'

const props = defineProps<{
  categoryId: number
}>()

const store = useStore<RootState>()
const maxResults = ref(50)

const uri = computed(() => {
  return `${store.state.categoryEndpoint}?part=snippet&maxResults=${maxResults.value}&orderBy=viewCount&regionCode=us&relevanceLanguage=en&type=video&videoCategoryId=${props.categoryId}&key=${store.state.key}`
})
</script>
