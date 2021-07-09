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
    LOADING: state => state.loading = !state.loading,
    GET_MOVIES: (state, payload) => state.movies = payload,
    CLEAR_MOVIES: state => state.movies = [],
    ERROR: (state, payload) => state.error = payload
  },
  actions: {
    showLoading: ({ commit }) => commit("LOADING"),
    getMovies: ({ commit }, payload) => commit("GET_MOVIES", payload.movies),
    clearMovies: ({ commit }) => commit("CLEAR_MOVIES"),
    showError: ({ commit }, payload) => commit("ERROR", payload.error)
  }
})

export default store
