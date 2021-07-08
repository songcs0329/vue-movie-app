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

export default defineComponent({
  name: 'movieSearch',
  setup() {
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

    const searchMovieSubmit = () => _plugins.$asyncData(date.value, selected.value, _plugins.$getMoviesDay)

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