<template>
<form @submit.prevent="searchMovieSubmit">
  <div class="movie_search">
    <div class="insert">
      <span class="select">
        <select v-model="selected">
          <option :value="null">선택</option>
          <option :key="idx" :value="opts.value" v-for="(opts, idx) in options">
            {{ opts.txt }}
          </option>
        </select>
      </span>
      <span class="ip">
        <input v-model="date" type="text" :placeholder="today" />
      </span>
    </div>
    <button type="submit" class="submit_btn" @click.prevent="searchMovieSubmit">검색</button>
  </div>
</form>
  
</template>

<script>
import { defineComponent, getCurrentInstance, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'movieSearch',
  setup() {
    const store = useStore()
    const { appContext } = getCurrentInstance()
    const _plugins = appContext.app.config.globalProperties
    const today = `날짜를 입력해주세요. (ex. ${_plugins.$getLatest()})`
    const date = ref('')
    const selected = ref(null)
    const options = [
      {
        txt: '일별',
        value: 'daily'
      },
      {
        txt: '주별',
        value: 'weekly'
      },
    ]

    const asyncData = async () => {
      if(selected.value === 'daily') return await _plugins.$getMoviesDay(date.value)
      if(selected.value === 'weekly') return await _plugins.$getMoviesWeek(date.value)
    }

    const searchMovieSubmit = async () => {
      if(!selected.value) return alert(`옵션을 선택해주세요`)
      if(date.value.length < 8 || isNaN(Number(date.value))) return alert(`날짜를 확인해주세요`)
      store.dispatch('showLoading')
      try {
        const res = await asyncData()
        const resultList = `${selected.value}BoxOfficeList`
        store.dispatch('getMovies', {movies: res.boxOfficeResult[resultList]})
      } catch(e) {
        console.log(e)
        store.dispatch('showError', {error: e})
      }
    }

    return {
      today,
      date,
      selected,
      options,
      searchMovieSubmit
    }
  }
})
</script>

<style>

</style>