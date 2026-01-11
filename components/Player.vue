<template>
<div>
    <div class="player">
        <screen :video="video"/>
    </div>

    <div class="player-actions d-flex align-center flex-wrap mt-3">
        <v-tooltip location="top">
            <template #activator="{ props }">
                <v-btn
                    v-bind="props"
                    @click="emit('random')"
                    size="large"
                    rounded="pill"
                    class="random-btn ml-0 px-4"
                    variant="elevated"
                >
                    <v-icon class="mr-2" size="20">mdi-shuffle-variant</v-icon>
                    Random Pick
                </v-btn>
            </template>
            <span>
                Fetch a random <span class="text-lowercase" v-if="category">{{category}}</span> video 
            </span>
        </v-tooltip>

        <v-tooltip location="top" v-if="shareUrl">
            <template #activator="{ props }">
                <v-btn
                    v-bind="props"
                    @click="shareDialog = true"
                    size="large"
                    class="share-btn ml-2"
                    icon
                    variant="elevated"
                >
                    <v-icon size="20">mdi-share-variant</v-icon>
                </v-btn>
            </template>
            <span>Share this video</span>
        </v-tooltip>
    </div>

    <share-dialog v-model:dialog="shareDialog" :video-url="shareUrl" />

</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
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
</script>

<style lang="scss">
    .random-btn{
        letter-spacing: 1.5px;
        text-transform: uppercase;
        box-shadow: 0 10px 24px rgba(var(--v-theme-on-surface), 0.2);
    }
    .share-btn{
        box-shadow: 0 10px 24px rgba(var(--v-theme-on-surface), 0.2);
    }
    .player {
        .player-progress{
            border-bottom-left-radius:2px;
            border-bottom-right-radius:2px;
        }
}
</style>
