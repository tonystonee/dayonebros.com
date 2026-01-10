<template>
    <div>
        <v-navigation-drawer
            v-if="nav"
            class="nav-drawer"
            :color="navColor"
            v-model="drawer"
            width="230"
            temporary
        >
            <v-list density="compact" class="py-0">
                <v-toolbar :color="navColor" class="title-tile">
                    <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="mx-1" />
                    <v-icon class="mx-0" :color="iconColor">mdi-play-circle</v-icon>
                    <v-toolbar-title class="title ml-1 mr-5 align-center ">
                        <NuxtLink to="/" :class="textColor">DayOneBros &nbsp;</NuxtLink>
                    </v-toolbar-title>
                    <v-divider></v-divider>
                </v-toolbar>
                <v-divider></v-divider>
                <v-list-item
                    v-for="item in items"
                    :key="item.text"
                    :to="{path: item.slug}"
                    class="nav-item"
                    rounded="lg"
                    :active="currentPath === item.slug"
                    active-color="barColor"
                >
                    <template #prepend>
                        <v-icon size="20">{{ item.icon }}</v-icon>
                    </template>
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            :color="navColor"
            density="comfortable"
            elevation="1"
            class="top-bar"
        >
            <v-app-bar-nav-icon v-if="nav" @click.stop="drawer = !drawer" />
            <v-icon class="ml-2 mr-0 navicon" :color="iconColor">mdi-play-circle</v-icon>
            <v-toolbar-title class="title ml-2 mr-5 align-center ">
                <NuxtLink to="/" :class="textColor">DayOneBros &nbsp;</NuxtLink>
                <span v-if="category" :class="textColor" class="text-subtitle-1">{{category}}</span>
            </v-toolbar-title>
        </v-app-bar>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCategory } from '@/composables/useCategory'

type NavItem = {
  icon: string
  text: string
  slug: string
}

defineProps<{ source?: string }>()

const drawer = ref<boolean | null>(null)
const items: NavItem[] = [
  { icon: 'mdi-newspaper-variant-outline', text: 'News', slug: '/news' },
  { icon: 'mdi-emoticon-happy-outline', text: 'Comedy', slug: '/comedy' },
  { icon: 'mdi-football', text: 'Sports', slug: '/sports' },
  { icon: 'mdi-car', text: 'Auto', slug: '/auto' },
  { icon: 'mdi-music', text: 'Music', slug: '/music' },
  { icon: 'mdi-movie-open-outline', text: 'Film and Animation', slug: '/film-and-animation' },
  { icon: 'mdi-gamepad-variant-outline', text: 'Gaming', slug: '/gaming' },
  { icon: 'mdi-paw', text: 'Pets', slug: '/pets' },
  { icon: 'mdi-flask-outline', text: 'Science', slug: '/science' },
  { icon: 'mdi-school-outline', text: 'Education', slug: '/education' },
]

const route = useRoute()
const { category } = useCategory()

const hiddenPaths = ['/terms', '/copyright', '/privacy']
const nav = computed(() => !hiddenPaths.includes(route.path))
const isHome = computed(() => route.path === '/')
const currentPath = computed(() => route.path)
const textColor = computed(() => (route.path === '/' ? 'text-black' : 'text-white'))
const iconColor = computed(() => (route.path === '/' ? 'red' : 'white'))
const navColor = computed(() => (route.path === '/' ? 'white' : 'barColor'))
</script>


<style lang="scss">
.title{
    a{
        text-decoration: none;
    }
}
.nav-drawer{
    border-right: 1px solid rgba(0, 0, 0, 0.06);

    .title-tile{
        display: flex;
        flex-direction: column;
        align-content: center;
        height: 48px;
        .v-toolbar__content{
            padding: 0;
            .title{
                font-size: 16px !important;
            }
        }
    }
    .text-primary{
        background-image: none;
        color: inherit !important;
    }
}
.top-bar{
    backdrop-filter: blur(10px);
}
.nav-item{
    margin: 4px 8px;
}
</style>
