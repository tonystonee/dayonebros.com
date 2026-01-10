<template>
  <v-app>
    <navbar/>
    <v-main class="main-wrapper">
      <router-view></router-view>
    </v-main>
    <app-footer/>
  </v-app>
</template>

<script>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from 'vuetify'
import AppFooter from '@/components/AppFooter.vue'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    AppFooter,
    Navbar,
  },
  setup () {
    const route = useRoute()
    const theme = useTheme()

    watch(
      () => route.matched,
      () => {
        const primary = route.matched[0]?.props?.default?.primary
        if (primary) {
          theme.global.current.value.colors.barColor = primary
        }
      },
      { immediate: true }
    )
  }
}
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
