<template>
  <v-app>
    <Navbar />
    <v-main class="main-wrapper">
      <slot />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import slugify from 'slugify'
import { useTheme } from 'vuetify'
import AppFooter from '@/components/AppFooter.vue'
import Navbar from '@/components/Navbar.vue'
import categories from '@/config/categories'

const route = useRoute()
const theme = useTheme()

const barColor = computed(() => {
  if (route.path === '/') {
    return '#F44336'
  }
  const slug = route.params.category?.toString() ?? ''
  const match = categories.find((item) => slugify(item.name) === slug)
  return match?.color ?? '#F44336'
})

watch(
  barColor,
  (primary) => {
    if (primary) {
      theme.global.current.value.colors.barColor = primary
    }
  },
  { immediate: true }
)
</script>

<style>
a{
    text-decoration: none;
}
.main-wrapper{
  background: rgb(250,250,250);
  background: linear-gradient(90deg, rgba(250,250,250,1) 0%, rgba(189,189,189,1) 39%, rgba(238,238,238,1) 100%);
}
</style>
