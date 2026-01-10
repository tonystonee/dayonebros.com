import slugify from 'slugify'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Category from './views/Category.vue'
import Home from './views/Home.vue'
import Terms from './views/Terms.vue'
import Copyright from './views/Copyright.vue'
import Privacy from './views/Privacy.vue'
import categories from './config/categories'
import type { CategoryConfig } from './config/categories'

const barColor = '#F44336'

type MetaTag = {
  name: string
  content: string
}

type RouteMetaData = {
  title: string
  metaTags: MetaTag[]
}

function desc(category: string) {
  return `The top ${category} videos of the day.`
}

function categoryRoute(category: CategoryConfig): RouteRecordRaw {
  const slug = slugify(category.name)
  return {
    path: `/${slug}`,
    name: category.name,
    component: Category,
    props: {
      categoryId: category.categoryId,
      primary: category.color,
    },
    meta: {
      title: `DayOneBros: ${category.name}`,
      metaTags: [
        {
          name: 'description',
          content: desc(category.name),
        }
      ],
    } as RouteMetaData,
  }
}

const categoryRoutes: RouteRecordRaw[] = categories.map((category) =>
  categoryRoute(category)
)

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    props: {
      primary: barColor,
    },
    meta: {
      title: 'Home - Day One Bros',
      metaTags: [
        {
          name: 'description',
          content: 'Bored? Browse the top ten videos of the day at dayonebros.com.',
        }
      ],
    } as RouteMetaData,
  },
  ...categoryRoutes,
  {
    path: '/terms',
    name: 'terms',
    component: Terms,
    props: {
      primary: barColor,
    },
    meta: {
      title: 'Day One Bros - terms of service',
      metaTags: [
        {
          name: 'description',
          content: 'Fake terms of service',
        }
      ],
    } as RouteMetaData,
  },
  {
    path: '/copyright',
    name: 'copyright',
    component: Copyright,
    props: {
      primary: barColor,
    },
    meta: {
      title: 'Day One Bros - copyright',
      metaTags: [
        {
          name: 'description',
          content: 'Fake copyright  ',
        }
      ],
    } as RouteMetaData,
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: Privacy,
    props: {
      primary: barColor,
    },
    meta: {
      title: 'Day One Bros - privacy',
      metaTags: [
        {
          name: 'description',
          content: 'Fake privacy',
        }
      ],
    } as RouteMetaData,
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

// This callback runs before every route change, including on page load.
router.beforeEach((to, _from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find((r) => r.meta && (r.meta as RouteMetaData).title)

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find((r) => r.meta && (r.meta as RouteMetaData).metaTags)

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = (nearestWithTitle.meta as RouteMetaData).title
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).forEach((el) => {
    el.parentNode?.removeChild(el)
  })

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next()

  // Turn the meta tag definitions into actual elements in the head.
  ;(nearestWithMeta.meta as RouteMetaData).metaTags.map((tagDef) => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach((key) => {
      tag.setAttribute(key, tagDef[key as keyof MetaTag])
    })

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '')

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach((tag) => document.head.appendChild(tag));

  next()
})

export default router;
