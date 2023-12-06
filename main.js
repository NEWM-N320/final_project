//main js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//importing files and components

//home sessions
import HomeSessions from './components/HomeSessions.vue';

//user sessions
import UserSessions from './components/UserSessions.vue';

//slotted btn
import SlottedButton from './components/SlottedButton.vue';

//slotted btn for tags
import TagsSlottedButton from './components/TagsSlottedButton.vue';


//create the app
const app = createApp(App)


//router
app.use(router)

//all components
app.component('HomeSessions', HomeSessions);
app.component('UserSessions', UserSessions);
app.component('SlottedButton', SlottedButton);
app.component('TagsSlottedButton', TagsSlottedButton);
app.mount('#app')
