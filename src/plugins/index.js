import axios from 'axios'

const API_KEY = '5e73ff3594cdc51745acdfcbbb5063a8'

export default {
  install: (app) => {
    app.config.globalProperties = {
      $comma: num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      $changeDate: date => date.replace(/(\d{4})(\d{2})(\d{2})/, '$1년 $2월 $3일'),
      $getLatest: () => {
        let today = new Date()
        let year = today.getFullYear() // 년
        let month = ("0" + (1 + today.getMonth())).slice(-2) // 월
        let day = ("0" + (today.getDate() - 1)).slice(-2) // 일

        return year + month + day
      },
      $getMoviesDay: async date => {
        const targetDate = date
        try {
          const response = await axios.get(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${API_KEY}&targetDt=${targetDate}`)
          return response.data
        } catch(e) {
          console.log(e)
          return e
        }
      },
      $getMoviesWeek: async date => {
        const targetDate = date
        try {
          const response = await axios.get(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${API_KEY}&targetDt=${targetDate}&weekGb=0`)
          return response.data
        } catch(e) {
          console.log(e)
          return e
        }
      },
      $getMovieDetail: async movieCode => {
        try {
          const response = await axios.get(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${API_KEY}&movieCd=${movieCode}`)
          return response.data
        } catch(e) {
          console.log(e)
          return e
        }
      }
    }
  }
}