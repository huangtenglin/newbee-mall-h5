import { createApp } from 'vue'
import "@/assets/style/base.css"
import "@/assets/style/main.css"
import '@/common/style/theme.css'
import 'lib-flexible/flexible'
import 'vant/es/toast/style'

import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
const app = createApp(App);

app.config.globalProperties.$filters = {
    prefix(url:string) {
        if (url && url.startsWith("http")) {
            return url;
        } else {
            return `http://backend-api-01.newbee.ltd${url}`
        }
    }
}

app.use(router)
app.use(createPinia)
app.mount('#app')
