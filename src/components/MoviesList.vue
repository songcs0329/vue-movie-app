<template>
  <ul class="movie_list">
    <li v-if="movies.length < 1">검색결과가 없습니다.</li>
    <li v-else v-for="movie in movies" :key="movie.rnum" class="movie_item">
      <router-link :to="toPath(movie.movieCd)">
        <div class="item_info">
          <strong :class="newCheck(movie.rankOldAndNew)">{{ movie.rank }}</strong><br/>{{ movie.movieNm }}
        </div>
        <div :class="audiCheck(movie.audiChange)">
          <span>관객수 : {{ comma(movie.audiAcc) }}명<b class="per">{{ movie.audiChange }}</b></span>
          <span>매출액 : {{ comma(movie.salesAcc) }}명<b class="per">{{ movie.salesChange }}</b></span>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { computed, getCurrentInstance } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  name: 'moviesList',
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
    audiCheck: audiChange => `item_rate ${audiChange > 0 ? "up" : "down"}`,
    newCheck: rankOldAndNew => rankOldAndNew === "NEW" && "new"
  }
}
</script>