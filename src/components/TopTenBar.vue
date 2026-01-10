
<template>
<div>
    <v-expand-transition>
        <v-card class="top-ten" v-if="videoList">
            <v-toolbar color="barColor" :class="darken" class="text-white">
                <v-toolbar-title>Top 10 
                    <span v-if="category">in {{category}}</span>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-icon color="white">whatshot</v-icon>
            </v-toolbar>

            <v-list class="pt-0" lines="two">
                <template v-for="(item, index) in videoList" :key="index">
                    <v-tooltip location="left">
                        <template #activator="{ props }">
                            <div v-bind="props">
                                <v-list-item
                                    :key="item.title"
                                    class="py-2 px-0"
                                    @click="selectVideo(item, index)"
                                    :class="{
                                        'bg-blue-lighten-5 text-blue': item.active,
                                    }"
                                >
                                    <template #prepend>
                                        <img class="mr-2 thumb" :src="item.thumbnails.medium.url" alt="">
                                    </template>
                                    <v-list-item-title class="text-body-2">{{item.title}}</v-list-item-title>
                                    <v-list-item-subtitle class="text-caption">{{item.channelTitle}}</v-list-item-subtitle>
                                </v-list-item>
                            </div>
                        </template>
                        <span>
                            <h3 class="text-subtitle-2">
                                {{item.title}}
                            </h3>
                        </span>
                    </v-tooltip>
                </template>
            </v-list>
        </v-card>
    </v-expand-transition>
    <v-card v-if="!videoList">
            <v-row class="white pa-3" justify="center">
                    <v-progress-circular
                        class="py-5"
                        indeterminate
                        color="primary"
                    ></v-progress-circular>
            </v-row>
    </v-card>
</div>
</template>

<script>
    import { useCategory } from '@/composables/useCategory'
    export default {
        props: {
            videoList: {
                type: Array,
                default: null,
            },
            activeVideo: {
                type: Number,
                required: true,
            },
        },
        setup () {
            const { category, darken } = useCategory()
            return { category, darken }
        },
        methods: {
            selectVideo(item, index){
                this.$emit('selectVideo', item, index);
            },
        },
    }
</script>
 <style lang="scss">
    .top-ten{
       .v-list-item {
            align-items: flex-start;
            height: auto;
            padding-left: 10px;
            padding-right: 10px;
        }
        .thumb{
            width: 20%;
            min-width: 100px;
        }
        [role="listitem"]{
            cursor: pointer;
        }
    }
 </style>
 
