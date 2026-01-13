<template>
    <div class="mt-3">
        <v-slide-y-transition>
            <h2 class="details-title text-subtitle-1 font-weight-bold ma-0">
                {{ video.title }}
            </h2>
        </v-slide-y-transition>
        <v-row
            v-if="!video"
            class="pa-3"
            justify="center"
        >
            <v-progress-circular
                class="py-5"
                indeterminate
            />
        </v-row>
    </div>
</template>

<script setup lang="ts">
import type { VideoItem } from '@/types/video'

defineProps<{
  video: VideoItem | null
}>()
</script>

<style lang="scss">
    .details-title{
        letter-spacing: 0.2px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>
