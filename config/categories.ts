const colors = {
  red: '#F44336',
  blue: '#2196F3',
  yellow: '#FFEB3B',
  pink: '#E91E63',
  lightBlue: '#03A9F4',
  lightGreen: '#8BC34A',
  green: '#4CAF50',
}

// Vuetify harmonious colors (same hue, lighter shade)
const harmoniousSecondary = {
  red: 'deep-orange lighten-3',
  blue: 'cyan lighten-3',
  yellow: 'amber lighten-3',
  pink: 'purple lighten-3',
  lightBlue: 'cyan lighten-3',
  lightGreen: 'lime lighten-3',
  green: 'teal lighten-3',
} as const

export type CategoryConfig = {
  name: string
  categoryId: number
  color: string
  secondaryColor: string
}

const categories: CategoryConfig[] = [
  {
    name: 'Autos & Vehicles',
    categoryId: 2,
    color: colors.red,
    secondaryColor: harmoniousSecondary.red,
  },
  {
    name: 'Comedy',
    categoryId: 23,
    color: colors.blue,
    secondaryColor: harmoniousSecondary.blue,
  },
  {
    name: 'Education',
    categoryId: 27,
    color: colors.yellow,
    secondaryColor: harmoniousSecondary.yellow,
  },
  {
    name: 'Film & Animation',
    categoryId: 1,
    color: colors.pink,
    secondaryColor: harmoniousSecondary.pink,
  },
  {
    name: 'Gaming',
    categoryId: 20,
    color: colors.red,
    secondaryColor: harmoniousSecondary.red,
  },
  {
    name: 'Music',
    categoryId: 10,
    color: colors.blue,
    secondaryColor: harmoniousSecondary.blue,
  },
  {
    name: 'News & Politics',
    categoryId: 25,
    color: colors.lightBlue,
    secondaryColor: harmoniousSecondary.lightBlue,
  },
  {
    name: 'Pets & Animals',
    categoryId: 15,
    color: colors.lightGreen,
    secondaryColor: harmoniousSecondary.lightGreen,
  },
  {
    name: 'Sports',
    categoryId: 17,
    color: colors.green,
    secondaryColor: harmoniousSecondary.green,
  },
  {
    name: 'Science & Technology',
    categoryId: 28,
    color: colors.green,
    secondaryColor: harmoniousSecondary.green,
  },
  {
    name: 'People & Blogs',
    categoryId: 22,
    color: colors.blue,
    secondaryColor: harmoniousSecondary.blue,
  },
  {
    name: 'Entertainment',
    categoryId: 24,
    color: colors.pink,
    secondaryColor: harmoniousSecondary.pink,
  },
  {
    name: 'Howto & Style',
    categoryId: 26,
    color: colors.yellow,
    secondaryColor: harmoniousSecondary.yellow,
  },
  {
    name: 'Travel & Events',
    categoryId: 19,
    color: colors.lightBlue,
    secondaryColor: harmoniousSecondary.lightBlue,
  },
  {
    name: 'Nonprofits & Activism',
    categoryId: 29,
    color: colors.green,
    secondaryColor: harmoniousSecondary.green,
  },
]

export default categories
