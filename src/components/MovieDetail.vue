<template>
  <div v-if="detail" class="movie_detail">
    <div>
      <button class="back" @click="goBack"><i class="hide">뒤로가기</i></button>
      <label :class="statusCheck(detail.prdtStatNm)">{{ detail.prdtStatNm }}</label>
      <h4>{{ detail.movieNm }} <small>({{ detail.audits[0].watchGradeNm }})</small></h4>
      <section class="info">
        <strong>기본정보</strong>
        <div class="desc">
          <dl>
            <dt>개봉연도</dt>
            <dd>{{ changeDate(detail.openDt) }}</dd>
          </dl>
          <dl>
            <dt>상영시간</dt>
            <dd>{{ detail.showTm }}분</dd>
          </dl>
        </div>
        <div class="desc">
          <dl>
            <dt>장르</dt>
            <dd v-for="(genre, index) in detail.genres" :key="index">
              {{ genre.genreNm }}
            </dd>
          </dl>
          <dl>
            <dt>제작사</dt>
            <dd v-for="(company, index) in detail.companys" :key="index">
              {{ company.companyNm }}
            </dd>
          </dl>
        </div>
      </section>
      <section class="info">
        <strong>감독/출연</strong>
        <div class="desc">
          <ul>
            <li>
              <strong>{{ detail.directors[0].peopleNm }}</strong>
              <span>감독</span>
            </li>
            <li v-for="(actor, index) in detail.aciors" :key="index">
              <strong>{{ actor.peopleNm }}</strong>
              <span :class="actorCastCheck(actor.cast, 'class')">{{ actorCastCheck(actor.cast, 'text') }}</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router'
import { getCurrentInstance, onBeforeMount } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
  name: 'MovieDetail',
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const { movieCd } = route.params
    const { appContext } = getCurrentInstance()
    const _plugins = appContext.app.config.globalProperties
    const detail = ref(null)
    
    const asyncDetailData = async movieCd => {
      store.dispatch('showLoading')
      try {
        const res = await _plugins.$getMovieDetail(movieCd)
        detail.value = res.movieInfoResult.movieInfo
        store.dispatch('showLoading')
      } catch(e) {
        console.log(e)
        store.dispatch('showError', {error: e})
        store.dispatch('showLoading')
      }
    }

    onBeforeMount(asyncDetailData(movieCd))

    const goBack = () => {
      store.dispatch('clearMovies')
      router.go(-1)
    }

    return {
      detail,
      goBack,
      changeDate: _plugins.$changeDate
    }
  },
  methods: {
    statusCheck: prdtStatNm => `status ${prdtStatNm === "개봉" ? "opened" : prdtStatNm === "개봉예정" ? "released": null}`,
    actorCastCheck: (cast, usage) => {
      if(usage === 'class') return !cast ? "none" : null
      if(usage === 'text') return !cast ? "정보없음" : cast
    }
  },
}
</script>

<style>

</style>