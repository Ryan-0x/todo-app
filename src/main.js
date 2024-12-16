import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Toast, toastOptions } from './plugins/toast'
import './index.css'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(Toast, toastOptions)
app.use(pinia)
app.mount('#app')
