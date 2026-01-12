<template>
    <div>
        <v-navigation-drawer
            v-if="nav"
            v-model="drawer"
            :color="navColor"
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
                                width="96"
                                height="96"
                            >
                        </NuxtLink>
                    </v-toolbar-title>
                </div>
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
            :color="navColor"
            class="top-bar"
        >
            <v-app-bar-nav-icon
                v-if="nav"
                @click.stop="drawer = !drawer"
            />
            <v-toolbar-title class="title ml-2 mr-5 align-center">
                <div class="d-flex ">
                    <NuxtLink
                        to="/"
                        class="brand-link mt-2"
                    >
                        <img
                            v-if="isMounted"
                            class="brand-logo"
                            :src="logoUrl"
                            alt="DayOneBros logo"
                            width="60"
                            height="60"
                        >
                    </NuxtLink>
                    <span
                        v-if="category"
                        class="category-label d-none d-sm-flex"
                    >{{ category }}</span>
                    <span
                        v-if="category"
                        class="category-label category-label--compact text-caption d-sm-none"
                    >{{ compactCategory }}</span>
                </div>
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
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay, useTheme } from 'vuetify'
import { useCategory } from '@/composables/useCategory'
import logoUrl from '@/assets/logo-navbar.png'

type NavItem = {
  icon: string
  text: string
  slug: string
}

defineOptions({ name: 'AppNavbar' })
defineProps<{ source?: string }>()

const THEME_KEY = 'theme'

const drawer = ref(false)
const isMounted = ref(false)

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
const { smAndUp } = useDisplay()
const theme = useTheme()
const { category, categoryColor } = useCategory()

const hiddenPaths = ['/terms', '/copyright', '/privacy']
const nav = computed(() => !hiddenPaths.includes(route.path))
const currentPath = computed(() => route.path)
const navColor = computed(() => (route.path === '/' ? undefined : 'primary'))

// Vuetify theme state
const isDark = computed(() => theme.global.current.value.dark)
const basePrimary = ref(theme.global.current.value.colors.primary)

const compactCategory = computed(() => {
  if (!category.value) return ''
  if (smAndUp.value) return category.value
  return category.value.length > 12 ? `${category.value.slice(0, 12)}…` : category.value
})

// Keep basePrimary aligned with the selected theme’s primary
watch(
  () => theme.global.name.value,
  (name) => {
    const themeEntry = theme.themes.value?.[name]
    basePrimary.value = themeEntry?.colors?.primary ?? basePrimary.value
  },
  { immediate: true }
)

// Persist theme choice whenever it changes
watch(
  () => theme.global.name.value,
  (name) => {
    // only persist after mount to avoid SSR / pre-mount weirdness
    if (!isMounted.value) return
    localStorage.setItem(THEME_KEY, name)
  }
)

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'dayone' : 'dayoneDark'
}

// Your existing “category color overrides primary” logic
watchEffect(() => {
  theme.global.current.value.colors.primary = categoryColor.value ?? basePrimary.value
})

onMounted(() => {
  // Load saved theme once we're on the client
  const saved = localStorage.getItem(THEME_KEY)

  // validate the saved theme exists in Vuetify theme registry
  if (saved && theme.themes.value && saved in theme.themes.value) {
    theme.global.name.value = saved
  }

  isMounted.value = true
})
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
        width: 90%;
        height: 90px;
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
    width: 60px;
    height: 60px;
    object-fit: contain;
    border-radius: 10px;
}
.title .d-flex{
    align-items: center;
}
.category-label{
    text-transform: capitalize;
    margin-left: 10px;
}
.category-label--compact{
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
