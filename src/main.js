import { createApp } from 'vue'
import App from './App.vue'
import 'sass-reset'
import '@/styles/index.scss'
import plugins from '@/plugins'
import store from '@/store'

const app = createApp(App)
app.use(store)
app.use(plugins)
app.mount('#app')