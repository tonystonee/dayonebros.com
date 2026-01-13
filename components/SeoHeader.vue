<template>
    <section class="seo-hero mx-3 mt-3 mb-4 px-4 py-4">
        <h1 class="seo-title text-h4 font-weight-bold mb-2">
            {{ title }}
        </h1>
    </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
