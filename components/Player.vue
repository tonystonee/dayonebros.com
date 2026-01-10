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
                class="random-btn text-white ml-0 mt-3 px-4"
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

</div>
</template>

<script setup lang="ts">
import Screen from '@/components/Screen.vue'
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
        letter-spacing: 1.5px;
        text-transform: uppercase;
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
    }
    .player {
        .player-progress{
            border-bottom-left-radius:2px;
            border-bottom-right-radius:2px;
        }
}
</style>
