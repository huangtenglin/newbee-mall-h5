import { createApp } from 'vue'
import "@/assets/style/base.css"
import "@/assets/style/main.css"
import '@/common/style/theme.css'
import 'lib-flexible/flexible'

import App from './App.vue'
import router from './router'
const app = createApp(App);
app.use(router)
app.mount('#app')
