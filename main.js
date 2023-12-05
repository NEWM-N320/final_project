//main js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//importing files and components

//home sessions
import HomeSessions from './components/HomeSessions.vue';

//user sessions
import UserSessions from './components/UserSessions.vue';

const app = createApp(App)

app.use(router)

app.component('HomeSessions', HomeSessions);
app.mount('#app')
