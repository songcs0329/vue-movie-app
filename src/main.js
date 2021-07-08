import { createApp } from 'vue'
import App from './App.vue'
import 'sass-reset'
import '@/styles/index.scss'
import plugins from '@/plugins'
import store from '@/store'
import router from '@/router'

const app = createApp(App)
app.use(plugins)
app.use(store)
app.use(router)
app.mount('#app')