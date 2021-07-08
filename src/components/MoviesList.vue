<template>
  <ul class="movie_list">
    <li>{{ movies }}</li>
  </ul>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex'
export default {
  name: 'moviesList',
  setup() {
    const store = useStore()
    console.log('moviesList', store.state)
    const movies = computed(() => store.state.movies)
    console.log(movies)

    return {
      movies
    }
  }
}
</script>

<style>

</style>