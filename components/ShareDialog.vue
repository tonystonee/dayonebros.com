<template>
  <v-dialog
    class="share-dialog"
    v-model="internalDialog"
    width="520"
  >
    <v-card>
      <v-card-title class="text-h6">
        Share Video
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Video URL"
          :model-value="videoUrl || ''"
          readonly
          variant="outlined"
          density="comfortable"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="internalDialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  dialog: boolean
  videoUrl: string | null
}>(), {
  dialog: false,
  videoUrl: null
})

const emit = defineEmits<{
  (e: 'update:dialog', value: boolean): void
}>()

const internalDialog = computed({
  get: () => props.dialog,
  set: (value: boolean) => emit('update:dialog', value)
})
</script>
