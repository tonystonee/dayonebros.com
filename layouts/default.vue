<template>
    <v-app>
        <Navbar />
        <v-main class="bg-background">
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
