import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useCategory () {
  const route = useRoute()

  const category = computed<string | null>(() => {
    if (route.name === 'home') {
      return null
    }
    if (!route.name) {
      return null
    }
    return route.name.toString()
  })

  const darken = computed<string | null>(() => {
    if (route.name === 'home') {
      return null
    }
    return 'bg-barColor-darken-2'
  })

  return { category, darken }
}
