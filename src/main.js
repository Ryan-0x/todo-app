import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Toast, toastOptions } from './plugins/toast'
import './index.css'

const app = createApp(App)

app.use(router)
app.use(Toast, toastOptions)
app.mount('#app')
