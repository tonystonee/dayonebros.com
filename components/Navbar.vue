<template>
    <div>
        <v-navigation-drawer
            v-if="nav"
            v-model="drawer"
            :color="navColor"
            class="nav-drawer d-flex flex-column justify-center"
            :temporary="!smAndUp"
            :permanent="smAndUp"
            :rail="smAndUp && rail"
            expand-on-hover
            width="240"
            rail-width="72"
        >
            <v-list
                density="compact"
                class="py-0 h-100 d-flex flex-column justify-center"
            >
                <v-list-item
                    v-if="smAndUp"
                    class="my-1 mx-2"
                >
                    <v-tooltip
                        text="Toggle menu"
                        location="right"
                    >
                        <template #activator="{ props }">
                            <v-btn
                                v-bind="props"
                                icon
                                variant="text"
                                class="ml-n2 mt-8"
                                :aria-label="rail ? 'Expand navigation' : 'Collapse navigation'"
                                @click="rail = !rail"
                            >
                                <v-img
                                    :src="hamburgerUrl"
                                    width="36"
                                    height="36"
                                    alt=""
                                />
                            </v-btn>
                        </template>
                    </v-tooltip>
                </v-list-item>
                <v-list-item
                    to="/"
                    class="my-1 mx-2"
                    rounded="lg"
                    :active="currentPath === '/'"
                    :class="{ 'font-weight-bold': currentPath === '/' }"
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
                    class="my-1 mx-2"
                    rounded="lg"
                    :active="currentPath === item.slug"
                    :class="{ 'font-weight-bold': currentPath === item.slug }"
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
            <v-tooltip
                v-if="nav && !smAndUp"
                text="Toggle menu"
                location="bottom"
            >
                <template #activator="{ props }">
                    <v-btn
                        v-bind="props"
                        icon
                        variant="text"
                        :aria-label="drawer ? 'Close navigation' : 'Open navigation'"
                        @click.stop="drawer = !drawer"
                    >
                        <v-img
                            :src="hamburgerUrl"
                            width="36"
                            height="36"
                            alt=""
                        />
                    </v-btn>
                </template>
            </v-tooltip>
            <v-toolbar-title class="ml-2 mr-5 align-center">
                <div class="d-flex align-center">
                    <NuxtLink
                        to="/"
                        class="brand-link d-inline-flex align-center ga-2 mt-2 text-decoration-none font-weight-bold"
                    >
                        <img
                            v-if="isMounted"
                            class="rounded-lg object-fit-contain"
                            :src="logoUrl"
                            alt="DayOneBros logo"
                            width="60"
                            height="60"
                        >
                    </NuxtLink>
                    <span
                        v-if="category"
                        class="d-none d-sm-flex text-capitalize ml-3"
                    >{{ category }}</span>
                    <span
                        v-if="category"
                        class="category-label--compact text-caption d-sm-none text-capitalize text-truncate d-inline-block ml-3"
                    >{{ compactCategory }}</span>
                </div>
            </v-toolbar-title>
            <v-spacer />
            <v-btn
                icon
                variant="text"
                class="mr-2"
                :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                @click="toggleTheme"
            >
                <v-icon>{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
            </v-btn>
        </v-app-bar>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay, useTheme } from 'vuetify'
import { useCategory } from '@/composables/useCategory'
import logoUrl from '@/assets/logo-navbar.png'
import hamburgerUrl from '@/assets/hamburger.png'

type NavItem = {
  icon: string
  text: string
  slug: string
}

defineOptions({ name: 'AppNavbar' })
defineProps<{ source?: string }>()

const drawer = ref(false)
const rail = ref(true)
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
const navColor = computed(() => {
  if (categoryColor.value) {
    return categoryColor.value
  }
  return route.path === '/' ? undefined : 'primary'
})

// Vuetify theme state
const isDark = computed(() => theme.global.current.value.dark)

const compactCategory = computed(() => {
  if (!category.value) return ''
  if (smAndUp.value) return category.value
  return category.value.length > 12 ? `${category.value.slice(0, 12)}…` : category.value
})

// Persist theme choice whenever it changes
const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'dayone' : 'dayoneDark'
}

onMounted(() => {
  isMounted.value = true
})
</script>

<style lang="scss">
.nav-drawer{
    border-right: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}
.brand-link{
    color: inherit;
    letter-spacing: 0.3px;
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
</style>
