import { computed } from 'vue'
import { useRoute } from 'vue-router'
import slugify from 'slugify'
import categories from '@/config/categories'

export function useCategory () {
  const route = useRoute()

  const slug = computed(() => route.params.category?.toString().toLowerCase() ?? '')

  const categoryMatch = computed(() => {
    if (route.path === '/') {
      return null
    }
    return categories.find((item) => slugify(item.name, { lower: true }) === slug.value) ?? null
  })

  const category = computed<string | null>(() => categoryMatch.value?.name ?? null)
  const categoryColor = computed<string | null>(() => categoryMatch.value?.color ?? null)

  return { category, categoryColor }
}
