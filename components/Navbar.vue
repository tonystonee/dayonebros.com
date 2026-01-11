<template>
    <div>
        <v-navigation-drawer
            v-if="nav"
            v-model="drawer"
            class="nav-drawer"
            width="230"
            temporary
        >
            <v-list
                density="compact"
                class="py-0"
            >
                <div class="d-flex align-top">
                <v-app-bar-nav-icon
                    class="mx-1"
                    @click.stop="drawer = !drawer"
                />
                <v-toolbar-title class="title ml-1 mr-5 align-center">
                    <NuxtLink
                        to="/"
                        class="brand-link"
                    >
                        <img
                            class="brand-logo"
                            :src="logoUrl"
                            alt="DayOneBros logo"
                        >
                    </NuxtLink>
                </v-toolbar-title>
                </div>
                <v-divider />
                <v-divider />
                <v-list-item
                    to="/"
                    class="nav-item"
                    rounded="lg"
                    :active="currentPath === '/'"
                    :class="{ 'nav-item--active': currentPath === '/' }"
                >
                    <template #prepend>
                        <v-icon size="20">
                            mdi-home
                        </v-icon>
                    </template>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item>
                <v-list-item
                    v-for="item in items"
                    :key="item.text"
                    :to="{path: item.slug}"
                    class="nav-item"
                    rounded="lg"
                    :active="currentPath === item.slug"
                    :class="{ 'nav-item--active': currentPath === item.slug }"
                >
                    <template #prepend>
                        <v-icon size="20">
                            {{ item.icon }}
                        </v-icon>
                    </template>
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            density="comfortable"
            elevation="1"
            class="top-bar"
        >
            <v-app-bar-nav-icon
                v-if="nav"
                @click.stop="drawer = !drawer"
            />
            <v-toolbar-title class="title ml-2 mr-5 align-center">
                <NuxtLink
                    to="/"
                    class="brand-link mt-2"
                >
                    <img
                        class="brand-logo"
                        :src="logoUrl"
                        alt="DayOneBros logo"
                    >
                </NuxtLink>
                <span
                    v-if="category"
                    class="text-subtitle-1"
                >{{ category }}</span>
            </v-toolbar-title>
            <v-spacer />
            <v-btn
                icon
                variant="text"
                class="theme-toggle"
                :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                @click="toggleTheme"
            >
                <v-icon>{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
            </v-btn>
        </v-app-bar>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from 'vuetify'
import { useCategory } from '@/composables/useCategory'
import logoUrl from '@/assets/logo.png'

type NavItem = {
  icon: string
  text: string
  slug: string
}

defineOptions({ name: 'AppNavbar' })

defineProps<{ source?: string }>()

const drawer = ref<boolean | null>(null)
const items: NavItem[] = [
  { icon: 'mdi-car', text: 'Autos & Vehicles', slug: '/autos-and-vehicles' },
  { icon: 'mdi-emoticon-happy-outline', text: 'Comedy', slug: '/comedy' },
  { icon: 'mdi-school-outline', text: 'Education', slug: '/education' },
  { icon: 'mdi-movie-open-outline', text: 'Film & Animation', slug: '/film-and-animation' },
  { icon: 'mdi-gamepad-variant-outline', text: 'Gaming', slug: '/gaming' },
  { icon: 'mdi-music', text: 'Music', slug: '/music' },
  { icon: 'mdi-newspaper-variant-outline', text: 'News & Politics', slug: '/news-and-politics' },
  { icon: 'mdi-paw', text: 'Pets & Animals', slug: '/pets-and-animals' },
  { icon: 'mdi-football', text: 'Sports', slug: '/sports' },
  { icon: 'mdi-flask-outline', text: 'Science & Technology', slug: '/science-and-technology' },
  { icon: 'mdi-account-group', text: 'People & Blogs', slug: '/people-and-blogs' },
  { icon: 'mdi-star-outline', text: 'Entertainment', slug: '/entertainment' },
  { icon: 'mdi-brush', text: 'Howto & Style', slug: '/howto-and-style' },
  { icon: 'mdi-airplane', text: 'Travel & Events', slug: '/travel-and-events' },
  { icon: 'mdi-hand-heart-outline', text: 'Nonprofits & Activism', slug: '/nonprofits-and-activism' },
]

const route = useRoute()
const theme = useTheme()
const { category } = useCategory()

const hiddenPaths = ['/terms', '/copyright', '/privacy']
const nav = computed(() => !hiddenPaths.includes(route.path))
const currentPath = computed(() => route.path)
const isDark = computed(() => theme.global.current.value.dark)

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'dayone' : 'dayoneDark'
}
</script>


<style lang="scss">
.title{
    a{
        text-decoration: none;
    }
}
.nav-drawer{
    border-right: 1px solid rgba(var(--v-theme-on-surface), 0.08);

    .title-tile{
        height: 64px;
        .v-toolbar__content{
            padding: 0 8px;
            align-items: center;
            .title{
                font-size: 16px !important;
            }
        }
    }
    .brand-logo{
        width: 40px;
        height: 40px;
    }
}
.brand-link{
    color: inherit;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    letter-spacing: 0.3px;
    text-decoration: none;
}
.brand-logo{
    width: 96px;
    object-fit: contain;
    border-radius: 10px;
}
.top-bar{
    backdrop-filter: blur(10px);
}
.nav-item{
    margin: 4px 8px;
}
.nav-item--active{
    font-weight: 700;
}
.theme-toggle{
    margin-right: 6px;
}
</style>
