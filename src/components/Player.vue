<template>
<div>
    <div class="player">
        <screen :video="video"/>
    </div>

    <v-tooltip location="top">
        <template #activator="{ props }">
            <v-btn
                v-bind="props"
                @click="emit('random')"
                size="large"
                rounded="pill"
                color="barColor"
                :class="darken"
                class="random-btn text-white ml-0 mt-3 px-3"
            >
                <v-icon class="mr-2">cached</v-icon>
                Random
            </v-btn>
        </template>
        <span>
            Fetch a random <span class="text-lowercase" v-if="category">{{category}}</span> video 
        </span>
    </v-tooltip>

    <div class="my-3 white">
        <video-details :video="video"></video-details>
    </div>
</div>
</template>

<script setup lang="ts">
import Screen from '@/components/Screen.vue'
import VideoDetails from '@/components/VideoDetails.vue'
import { useCategory } from '@/composables/useCategory'
import type { VideoItem } from '@/types/video'

defineProps<{
  video: VideoItem | null
}>()

const emit = defineEmits<{
  (e: 'random'): void
}>()

const { category, darken } = useCategory()
</script>

<style lang="scss">
    .random-btn{
        letter-spacing: 5px;
    }
    .player {
        .player-progress{
            border-bottom-left-radius:2px;
            border-bottom-right-radius:2px;
        }
}
</style>
