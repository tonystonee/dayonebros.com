<template>
    <div>
        <div class="player">
            <screen :video="video" />
        </div>

        <div class="player-actions d-flex align-center flex-wrap mt-3">
            <v-tooltip location="top">
                <template #activator="{ props }">
                    <v-btn
                        v-bind="props"
                        size="large"
                        rounded="pill"
                        class="random-btn ml-0 px-4"
                        color="primary"
                        @click="emit('random')"
                    >
                        <v-icon
                            class="mr-2"
                            size="20"
                        >
                            mdi-shuffle-variant
                        </v-icon>
                        Random
                    </v-btn>
                </template>
                <span>
                    Fetch a random <span
                        v-if="category"
                        class="text-lowercase"
                    >{{ category }}</span> video 
                </span>
            </v-tooltip>
        </div>
    </div>
</template>

<script setup lang="ts">
import Screen from '@/components/Screen.vue'
import { useCategory } from '@/composables/useCategory'
import type { VideoItem } from '@/types/video'

defineOptions({ name: 'VideoPlayer' })

defineProps<{
  video: VideoItem | null
}>()

const emit = defineEmits<{
  (e: 'random'): void
}>()

const { category } = useCategory()
</script>

<style lang="scss">
    .random-btn{
        letter-spacing: 1.5px;
        text-transform: uppercase;
        box-shadow: 0 10px 24px rgba(var(--v-theme-on-surface), 0.2);
    }
    .player {
        .player-progress{
            border-bottom-left-radius:2px;
            border-bottom-right-radius:2px;
        }
}
</style>
