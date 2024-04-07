import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// const app = createApp(App)

import './assets/styles/tailwind.css'

// app.use(router)

// app.mount('#app')
createApp(App).use(router).mount('#app')
