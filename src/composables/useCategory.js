import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useCategory () {
  const route = useRoute()

  const category = computed(() => {
    if (route.name === 'home') {
      return null
    }
    return route.name ?? null
  })

  const darken = computed(() => {
    if (route.name === 'home') {
      return null
    }
    return 'bg-barColor-darken-2'
  })

  return { category, darken }
}
