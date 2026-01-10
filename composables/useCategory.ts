import { computed } from 'vue'
import { useRoute } from 'vue-router'
import slugify from 'slugify'
import categories from '@/config/categories'

export function useCategory () {
  const route = useRoute()

  const slug = computed(() => route.params.category?.toString() ?? '')

  const category = computed<string | null>(() => {
    if (route.path === '/') {
      return null
    }
    const match = categories.find((item) => slugify(item.name) === slug.value)
    return match?.name ?? null
  })

  const darken = computed<string | null>(() => {
    if (route.path === '/') {
      return null
    }
    return 'bg-barColor-darken-2'
  })

  return { category, darken }
}
