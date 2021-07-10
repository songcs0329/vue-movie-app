<template>
  <MovieSearch />
  <MoviesList />
</template>

<script>
import MovieSearch from '@/components/MovieSearch.vue'
import MoviesList from '@/components/MoviesList.vue'

export default {
  name: 'MoviesWrap',
  components: {
    MovieSearch,
    MoviesList
  }
}
</script>