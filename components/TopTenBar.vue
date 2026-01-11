
<template>
    <div>
        <v-expand-transition>
            <v-card
                v-if="videoList"
            >
                <v-toolbar class="top-ten-toolbar">
                    <v-toolbar-title>
                        Top 10 Videos
                        <span v-if="category">in {{ category }}</span>
                    </v-toolbar-title>

                    <v-spacer />

                    <v-icon>whatshot</v-icon>
                </v-toolbar>

                <v-list
                    class="pt-0"
                    lines="two"
                >
                    <template
                        v-for="(item, index) in videoList"
                        :key="index"
                    >
                        <v-tooltip location="left">
                            <template #activator="{ props }">
                                <div v-bind="props">
                                    <v-list-item
                                        :key="item.title"
                                        class="top-ten-item"
                                        :class="{
                                            'top-ten-item--active': item.active,
                                        }"
                                        @click="selectVideo(item, index)"
                                    >
                                        <template #prepend>
                                            <img
                                                class="top-ten-thumb"
                                                :src="item.thumbnails.medium.url"
                                                :alt="item.title"
                                            >
                                        </template>
                                        <v-list-item-title class="top-ten-title text-body-2">
                                            {{ item.title }}
                                        </v-list-item-title>
                                        <v-list-item-subtitle class="top-ten-subtitle text-caption">
                                            {{ item.channelTitle }}
                                        </v-list-item-subtitle>
                                    </v-list-item>
                                </div>
                            </template>
                            <span>
                                <h3 class="text-subtitle-2">
                                    {{ item.title }}
                                </h3>
                            </span>
                        </v-tooltip>
                    </template>
                </v-list>
            </v-card>
        </v-expand-transition>
        <v-card v-if="!videoList">
            <v-row
                class="pa-3"
                justify="center"
            >
                <v-progress-circular
                    class="py-5"
                    indeterminate
                />
            </v-row>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { useCategory } from '@/composables/useCategory'
import type { VideoItem } from '@/types/video'

withDefaults(defineProps<{
  videoList: VideoItem[] | null
  activeVideo: number
}>(), {
  videoList: null
})

const emit = defineEmits<{
  (e: 'selectVideo', item: VideoItem, index: number): void
}>()

const { category } = useCategory()

const selectVideo = (item: VideoItem, index: number) => {
  emit('selectVideo', item, index)
}
</script>
 <style lang="scss">
    .top-ten{
        background: rgb(var(--v-theme-surface));
    }
    .top-ten-item{
        align-items: flex-start;
        height: auto;
        margin: 6px 8px;
        padding: 10px 12px;
        border-radius: 12px;
        transition: background 120ms ease, box-shadow 120ms ease, transform 120ms ease;
    }
    .top-ten-item:hover{
        background: rgba(var(--v-theme-on-surface), 0.04);
        box-shadow: 0 6px 18px rgba(var(--v-theme-on-surface), 0.16);
        transform: translateY(-1px);
    }
    .top-ten-item--active{
        box-shadow: 0 10px 26px rgba(var(--v-theme-on-surface), 0.22);
        border-color: rgba(var(--v-theme-on-surface), 0.18);
    }
    .top-ten-thumb{
        width: 88px;
        height: 56px;
        object-fit: cover;
        border-radius: 8px;
        margin-right: 10px;
        box-shadow: 0 4px 10px rgba(var(--v-theme-on-surface), 0.18);
    }
    .top-ten-title{
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-weight: 600;
        letter-spacing: 0.2px;
    }
    .top-ten-subtitle{
        opacity: 0.7;
    }
    [role="listitem"]{
        cursor: pointer;
    }
 </style>
 
