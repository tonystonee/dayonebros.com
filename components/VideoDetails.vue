<template>
<div class="videoDetails">
    <v-slide-y-transition>
            <h2 class="details-title">{{video.title}}</h2>
    </v-slide-y-transition>
    <v-row v-if="!video" class="pa-3" justify="center">
            <v-progress-circular
                class="py-5"
                indeterminate
            ></v-progress-circular>
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
    .videoDetails{
        margin-top: 12px;
    }
    .details-title{
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0.2px;
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>
