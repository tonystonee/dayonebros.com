<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl.replace(/\/$/, '')

useHead({
  link: [
    {
      rel: 'canonical',
      href: `${siteUrl}${route.path}`
    }
  ]
})
</script>
