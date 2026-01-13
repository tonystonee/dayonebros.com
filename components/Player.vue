<template>
    <div>
        <div class="player pb-3">
            <Screen :video="video" />
        </div>

        <div class="player-actions d-flex align-center flex-wrap mt-0">
            <v-tooltip location="top">
                <template #activator="{ props }">
                    <v-btn
                        v-bind="props"
                        size="large"
                        rounded="pill"
                        class="random-btn ml-0 px-4 text-uppercase"
                        variant="elevated"
                        color="primary"
                        elevation="4"
                        @click="emit('random')"
                    >
                        <v-icon
                            class="mr-2"
                            size="20">
                            mdi-shuffle-variant
                        </v-icon>
                        Random
                    </v-btn>
                </template>
                <span>
                    Fetch a random 
                    <span 
                        v-if="category" 
                        class="text-lowercase" 
                    >
                        {{ category }}
                    </span> video 
                </span>
            </v-tooltip>

            <v-tooltip location="top" v-if="shareUrl">
                <template #activator="{ props }">
                    <v-btn
                        v-bind="props"
                        size="large"
                        class="ml-2"
                        icon
                        elevation="4"
                        @click="shareDialog = true"
                    >
                        <v-icon 
                            color="primary" 
                            size="20"
                        >
                            mdi-share-variant
                        </v-icon>
                    </v-btn>
                </template>
                <span>Share this video</span>
            </v-tooltip>
        </div>

        <ShareDialog  
            v-if="isMounted"
            v-model:dialog="shareDialog" 
            :video-url="shareUrl"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Screen from '@/components/Screen.vue'
import ShareDialog from '@/components/ShareDialog.vue'
import { useCategory } from '@/composables/useCategory'
import type { VideoItem } from '@/types/video'

const props = defineProps<{
  video: VideoItem | null
}>()

const emit = defineEmits<{
  (e: 'random'): void
}>()

const { category } = useCategory()
const isMounted = ref(false)
const shareDialog = ref(false)

const shareUrl = computed(() => {
  if (!props.video) {
    return null
  }
  const videoId = typeof props.video.id === 'string'
    ? props.video.id
    : props.video.id.videoId
  return `https://www.youtube.com/watch?v=${videoId}`
})

onMounted(() => {
  isMounted.value = true
})
</script>

<style lang="scss">
    .random-btn{
        letter-spacing: 1.5px;
    }
    .player {
        background: #000;
        .player-progress{
            border-bottom-left-radius:2px;
            border-bottom-right-radius:2px;
        }
}
</style>
