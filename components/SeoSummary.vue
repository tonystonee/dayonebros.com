<template>
    <div>
        <p class="d-inline-flex align-center ga-2 text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">
            {{ dateLabel }}
        </p>
        <p class="text-body-2 text-medium-emphasis mb-0">
            {{ description }}
        </p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  dateLabel: string
  description: string
}>()
</script>
