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
import AppFooter from '@/components/AppFooter.vue'
import Navbar from '@/components/Navbar.vue'

defineOptions({ name: 'DefaultLayout' })
</script>

<style>
a{
    text-decoration: none;
}
.main-wrapper{
  background: rgb(var(--v-theme-background));
}
</style>
