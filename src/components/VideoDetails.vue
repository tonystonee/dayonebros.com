<template>
<div class="videoDetails">
    <v-scale-transition>
            <v-expansion-panels v-if="video" v-model="panel" multiple>
                <v-expansion-panel>
                    <div class="pt-3 px-3 pb-2 d-flex flex-column">
                        <h2 class="text-h5 font-weight-regular">{{video.title}}</h2>
                        <h3 class="text-subtitle-1 text-grey-darken-3">{{video.channelTitle}}</h3>
                    </div>
                    <v-expansion-panel-title class="font-weight-bold">
                        <template #default>
                            <span v-if="!panel.includes(0)">Show More</span>
                            <span v-else>Close 
                                <v-icon size="small" end>close</v-icon>
                            </span>
                        </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-card>
                            <v-card-text class="text-body-1 pt-0">
                                <pre>{{video.description}}</pre>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
    </v-scale-transition>
    <v-row v-if="!video" class="white pa-3" justify="center">
            <v-progress-circular
                class="py-5"
                indeterminate
                color="primary"
            ></v-progress-circular>
    </v-row>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { VideoItem } from '@/types/video'

defineProps<{
  video: VideoItem | null
}>()

const panel = ref<number[]>([])
</script>

<style lang="scss">
    .videoDetails{
        pre{
            white-space: pre-wrap;
        }
    }
</style>
