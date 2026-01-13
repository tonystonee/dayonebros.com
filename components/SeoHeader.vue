<template>
    <section class="seo-hero mx-3">
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
