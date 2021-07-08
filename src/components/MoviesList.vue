<template>
  <ul class="movie_list">
    <li v-if="movies.length < 1">검색결과가 없습니다.</li>
    <MovieItem
      v-else
    />
  </ul>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex'
import MovieItem from '@/components/MovieItem.vue'


export default {
  name: 'moviesList',
  components: {
    MovieItem
  },
  setup() {
    const store = useStore()
    const movies = computed(() => store.state.movies)

    return {
      movies
    }
  }
}
</script>

<style>

</style>