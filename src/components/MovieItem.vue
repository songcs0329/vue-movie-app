<template>
  <li v-for="movie in movies" :key="movie.rnum" class="movie_item">
    <router-link :to="toPath(movie.movieCd)">
      <label :class="movie.rankOldAndNew.toLowerCase()">{{ movie.rankOldAndNew.charAt(0) }}</label>
      <div class="item_info"><strong>{{ movie.rank }}</strong><br/>{{ movie.movieNm }}</div>
      <div :class="rateCheck(movie.audiChange)">
        <span>관객수 : {{ comma(movie.audiAcc) }}명<b class="per">{{ movie.audiChange }}</b></span>
        <span>매출액 : {{ comma(movie.salesAcc) }}명<b class="per">{{ movie.salesChange }}</b></span>
      </div>
    </router-link>
  </li>
</template>

<script>
import { computed, getCurrentInstance } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  name: 'movieItem',
  setup() {
    const store = useStore()
    const movies = computed(() => store.state.movies)
    const { appContext } = getCurrentInstance()
    const _plugins = appContext.app.config.globalProperties

    return {
      movies,
      comma: _plugins.$comma
    }
  },
  methods: {
    toPath: movieCd => ({
      name: 'MovieDetailWrap',
      params: {
        movieCd
      }
    }),
    rateCheck: audiChange => `item_rate ${audiChange > 0 ? "up" : "down"}`
  }
}
</script>