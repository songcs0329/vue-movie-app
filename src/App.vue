<template>
  <div>asdasd</div>
</template>

<script>
import { defineComponent, getCurrentInstance, ref } from '@vue/runtime-core';
// import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  setup() {
    const { appContext } = getCurrentInstance()
    const _plugins = appContext.app.config.globalProperties
    // const date = ref(_plugins.$getLatest())
    const options = ref("daily")

    const fetchData = async () => {
      return await _plugins.$asyncData("", options.value, _plugins.$getMoviesDay)
    }
    console.log(fetchData());

    // return {
    //   store,
    //   date,
    //   options
    // }
  }
})
</script>

