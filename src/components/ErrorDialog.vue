  <template>
      <v-dialog
    class="error-dialog"
    v-model="internalDialog"
    width="500"
    >

      <v-card>
        <v-card-title
          class="text-h5 bg-grey-lighten-2"
        >
          Error
        </v-card-title>

        <v-card-text>We're sorry, but an error has occured. Please contact the adminstrator to address the issue.
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="text"
            @click="internalDialog = false"
          >
            OKAY
          </v-btn>
        </v-card-actions>
        <code>{{error}}</code>

        <v-divider></v-divider>

      </v-card>
    </v-dialog>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'

  const props = withDefaults(defineProps<{
    error: string | null
    dialog: boolean
  }>(), {
    error: null,
    dialog: false
  })

  const emit = defineEmits<{
    (e: 'update:dialog', value: boolean): void
  }>()

  const internalDialog = computed({
    get: () => props.dialog,
    set: (value: boolean) => emit('update:dialog', value)
  })
  </script>
  
