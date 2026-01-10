import { createStore } from 'vuex'

export type RootState = {
  key: string
  categoryEndpoint: string
}

export default createStore<RootState>({
  state: {
    key: 'AIzaSyA8jagLA7xPLvibUtFPfHWpAXNyIK2fUMs',
    // Search endpoint
    categoryEndpoint: 'https://www.googleapis.com/youtube/v3/search',
  },
  mutations: {

  },
  actions: {

  }
})
