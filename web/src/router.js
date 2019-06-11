import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import Attendance from './components/Attendance.vue'
import Contract from './components/Contract.vue'
import Report from './components/Report.vue'
import Schedule from './components/Schedule.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      // redirects to the specified page every non-existent path
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/app',
      name: 'app',
      component: Dashboard,
      children: [
        {
          path: 'monitoria',
          component: Contract
        },
        {
          path: 'atendimentos',
          component: Attendance
        },
        {
          path: 'relatorios',
          component: Report
        },
        {
          path: 'horarios',
          component: Schedule
        }
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('app');
  else next();
});

export default router;