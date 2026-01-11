import type * as logger from '@/utils/logger'

declare module '#app' {
  interface NuxtApp {
    $logger: typeof logger
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $logger: typeof logger
  }
}
