const colors = {
  red: '#F44336',
  blue: '#2196F3',
  yellow: '#FFEB3B',
  pink: '#E91E63',
  lightBlue: '#03A9F4',
  lightGreen: '#8BC34A',
  green: '#4CAF50'
}

export type CategoryConfig = {
  name: string
  categoryId: number
  color: string
}

const categories: CategoryConfig[] = [
  {
    name: 'Auto',
    categoryId: 2,
    color: colors.red,
  },
  {
    name: 'Comedy',
    categoryId: 23,
    color: colors.blue,
  },
  {
    name: 'Education',
    categoryId: 27,
    color: colors.yellow,
  },
  {
    name: 'Film and Animation',
    categoryId: 1,
    color: colors.pink,
  },
  {
    name: 'Gaming',
    categoryId: 20,
    color: colors.red,
  },
  {
    name: 'Music',
    categoryId: 10,
    color: colors.blue,
  },
  {
    name: 'News',
    categoryId: 25,
    color: colors.lightBlue,
  },
  {
    name: 'Pets',
    categoryId: 15,
    color: colors.lightGreen,
  },
  {
    name: 'Sports',
    categoryId: 17,
    color: colors.green,
  },
  {
    name: 'Science',
    categoryId: 28,
    color: colors.green,
  },
]

export default categories
