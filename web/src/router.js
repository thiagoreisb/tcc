const Home = require('./views/Home.vue').default;
const Login = require('./views/Login.vue').default;
const Dashboard = require('./views/Dashboard.vue').default;
const Attendance = require('./pages/Attendance.vue').default;
const Contract = require('./pages/Contract.vue').default;
const Report = require('./pages/Report.vue').default;
const Schedule = require('./pages/Schedule.vue').default;
const Erro = require('./pages/Error.vue').default;

/// User role constants
const STUDENT_TYPE = 0;
const PROFESSOR_TYPE = 1;
const ADMIN_TYPE = 2;
const SYS_ADMIN_TYPE = 3;
const MONITOR_TYPE = 10;
const ADVISOR_TYPE = 20;
const COORDINATOR_TYPE = 30;
const ALL_TYPES = 999;

module.exports = function (Router, firebase) {
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
        meta: {
          requiresAuth: true,
          customAuth: [ALL_TYPES]
        },
        children: [
          {
            path: 'monitoria',
            component: Contract,
            meta: {
              customAuth: [ALL_TYPES]
            }
          },
          {
            path: 'atendimentos',
            component: Attendance,
            meta: {
              customAuth: [MONITOR_TYPE]
            }
          },
          {
            path: 'relatorios',
            component: Report,
            meta: {
              customAuth: [MONITOR_TYPE, ADVISOR_TYPE, COORDINATOR_TYPE]
            }
          },
          {
            path: 'horarios',
            component: Schedule,
            meta: {
              customAuth: [MONITOR_TYPE]
            }
          }
        ]
      },
      {
        path: '/erro',
        name: 'error',
        component: Erro
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
    const db = firebase.database();
    const currentUser = firebase.auth().currentUser;
    const uid = currentUser == null ? 'anonymous' : currentUser.uid;
    const ref = db.ref('roles/' + uid);
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    
    ref.on("value", function(snapshot) {
      // Gets the deepest route
      let customAuth = to.matched.slice().reverse()[0].meta.customAuth;
      
      // Checks user authorization
      let pageAuth = customAuth === undefined ? true : customAuth.some(r => r === ALL_TYPES || r === snapshot.val().type);

      if (requiresAuth && !currentUser) next('login');
      else if (!requiresAuth && currentUser) next('app');
      else if (!pageAuth) next('app');
      else next();
    }, function (errorObject) {
      next('error');
    });
  });
  
  return router;
}
