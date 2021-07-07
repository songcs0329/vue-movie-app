<template>
  <Loading v-if="loading"></Loading>
  <router-view></router-view>
</template>

<script>
import { useStore } from 'vuex'
import Loading from '@/layouts/Loading'
import { computed } from '@vue/runtime-core'

export default {
  name: 'App',
  components: {
    Loading
  },
  setup() {
    const store = useStore()
    const loading = computed(() => store.state.loading)

    return {
      loading
    }
  }
}
</script>

