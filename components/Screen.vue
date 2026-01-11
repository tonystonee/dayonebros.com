<template>
    <div>
        <v-responsive :aspect-ratio="16/9">
            <v-sheet
                class="screen pa-0 ma-0"
            >
                <v-scale-transition origin="center, center">
                    <div
                        v-if="video && url"
                        :style="styleObject"
                    >
                        <iframe
                            :src="url"
                            frameborder="0"
                            allowfullscreen=""
                        />
                    </div>
                </v-scale-transition>
                <static-screen v-if="!video" />
            </v-sheet>
        </v-responsive>
        <v-progress-linear
            v-if="!video"
            height="8"
            :indeterminate="true"
            class="player-progress mt-1 mb-0 pt-1"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import StaticScreen from '@/components/StaticScreen.vue'
import type { VideoItem } from '@/types/video'

defineOptions({ name: 'VideoScreen' })

const props = defineProps<{
  video: VideoItem | null
}>()

const styleObject = computed(() => {
  if (!props.video) {
    return null
  }

  const thumb = props.video.thumbnails.maxres ?? props.video.thumbnails.medium
  return {
    backgroundImage: `url("${thumb.url}")`,
    backgroundSize: 'cover',
  }
})

const url = computed(() => {
  if (!props.video) {
    return null
  }
  const videoId = typeof props.video.id === 'string'
    ? props.video.id
    : props.video.id.videoId
  return `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0`
})
</script>

<style lang="scss">

.screen{
    border: 0px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: rgb(var(--v-theme-surface));
    height: 100%;
    width: 100%;
    div{
        height:100%;
    }
    iframe{
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        height: 100%;
        width: 100%;
    }
}
</style>
