import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      loading: false,
      movies: [],
      error: null,
    }
  },
  mutations: {
    LOADING: state => state.loading = true,
    GET_MOVIES: (state, payload) => {
      console.log('mutations', payload)
      state.loading = false
      state.movies = payload
    },
    ERROR: (state, payload) => {
      console.log('mutations', payload)
      state.loading = false
      state.error = payload
    }
  },
  actions: {
    showLoading: ({ commit }) => commit("LOADING"),
    getMovies: ({ commit }, payload) => commit("GET_MOVIES", payload.movies),
    showError: ({ commit }, payload) => commit("ERROR", payload.error)
  }
})

export default store
