<template>
  <div class="movie_wrap">
    <MovieSearch />
  </div>
</template>

<script>
import MovieSearch from '@/components/MovieSearch.vue'

export default {
  name: 'MoviesWrap',
  components: {
    MovieSearch
  }
}
</script>