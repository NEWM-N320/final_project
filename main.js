import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//importing files and components
import HomeSessions from './components/HomeSessions.vue';

const app = createApp(App)

app.use(router)

app.mount('#app')
