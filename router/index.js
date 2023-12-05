//index route 

//import the router
import { createRouter, createWebHistory } from 'vue-router'

//import the views needed

//home view - all sessions
import HomeSessions from '../components/HomeSessions.vue';

//user sessions - selected sessions
import UserSessionsView from '../views/UserSessionsView.vue';

const routes =  [

  //default route - which is home
    {
      path: '/',
      name: 'home',
      component: HomeSessions
    },

    //sessions route for traveling back
    {
      path: '/sessions',
      name: 'sessions',
      component: HomeSessions
    },
    //user sessions - second page
    {
      path: '/mySessions',
      name: 'mySessions',
      component: UserSessionsView
    }
  ]

  //create and export router

  //create router
  const router = createRouter({
    history: createWebHistory(),
    routes
  });

  //export the router
  export default router;
