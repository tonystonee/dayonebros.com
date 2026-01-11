<template>
    <v-container fluid>
        <ErrorDialog
            v-model:dialog="dialog"
            :error="error"
        />
        <v-row>
            <v-col
                cols="12"
                md="8"
                :class="{'pr-4': mdAndUp}"
            >
                <Player
                    :video="currentVideo"
                    @random="random"
                />  
            </v-col>
            <v-col
                cols="12"
                md="4"
            >
                <TopTenBar
                    :active-video="activeVideo"
                    :video-list="topTen"
                    @select-video="changeVideo"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFetch } from '#imports'
import { useDisplay, useGoTo } from 'vuetify'
import ErrorDialog from '@/components/ErrorDialog.vue'
import Player from '@/components/Player.vue'
import TopTenBar from '@/components/TopTenBar.vue'
import type { VideoItem } from '@/types/video'

defineOptions({ name: 'AppPage' })

const props = defineProps<{
  uri: string
  maxResults?: number
}>()

const currentVideo = ref<VideoItem | null>(null)
const videos = ref<VideoItem[] | null>(null)
const topTen = ref<VideoItem[] | null>(null)
const activeVideo = ref(0)
const dialog = ref(false)
const error = ref<string | null>(null)

const { mdAndUp } = useDisplay()
const goTo = useGoTo()

const selectFrom = (lowerValue: number, upperValue: number) => {
  const choices = upperValue - lowerValue + 1
  return Math.floor(Math.random() * choices + lowerValue)
}

const toTop = () => {
  goTo(0, {
    duration: 220,
    offset: 0,
    easing: 'linear',
  })
}

const random = () => {
  if (!videos.value || !topTen.value) {
    return
  }

  if (activeVideo.value > -1) {
    topTen.value[activeVideo.value].active = false
    activeVideo.value = -1
  }

  currentVideo.value = videos.value[selectFrom(0, videos.value.length - 1)]
}

type YouTubeResponse = {
  items: Array<{
    id: VideoItem['id']
    snippet: Omit<VideoItem, 'id' | 'active'>
  }>
}

const { data, error: fetchError } = await useFetch<YouTubeResponse>(() => {
  return props.uri || null
}, {
  watch: [() => props.uri]
})

watch([data, fetchError], () => {
  if (fetchError.value) {
    dialog.value = true
    const errorValue = fetchError.value
    const message = errorValue instanceof Error
      ? errorValue.message
      : (typeof errorValue === 'object'
        && errorValue !== null
        && 'message' in errorValue
        && typeof (errorValue as { message?: unknown }).message === 'string')
        ? (errorValue as { message: string }).message
        : 'Unknown error'
    error.value = message.replace(/key=([^&]+)/g, 'key=REDACTED')
    console.error(errorValue, message)
    return
  }
  if (!data.value) {
    return
  }

  const mapped = data.value.items.map((item) => ({
    active: false,
    id: item.id,
    ...item.snippet,
  })) as VideoItem[]

  videos.value = mapped
  topTen.value = mapped.slice(0, 10)
  if (topTen.value.length > 0) {
    topTen.value[0].active = true
    currentVideo.value = topTen.value[0]
  } else {
    currentVideo.value = null
  }
}, { immediate: true })

const changeVideo = (video: VideoItem, index: number) => {
  if (!topTen.value) {
    return
  }
  if (activeVideo.value > -1) {
    topTen.value[activeVideo.value].active = false
  }
  video.active = true
  activeVideo.value = index
  currentVideo.value = video
  toTop()
}
</script>

<style lang="scss">
    .v-dialog{
        code{
            width: 100%;
        }
    }
</style>
