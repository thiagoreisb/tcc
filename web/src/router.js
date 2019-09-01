const Home = () => import('./views/Home.vue');
const Login = () => import('./views/Login.vue');
const Dashboard = () => import('./views/Dashboard.vue');
const Attendance = () => import('./pages/Attendance.vue');
const Contract = () => import('./pages/Contract.vue');
const Report = () => import('./pages/Report.vue');
const Schedule = () => import('./pages/Schedule.vue');
const Erro = () => import('./pages/Error.vue');

/// User role constants
const Constants = require('./utils/constants').default;

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
          customAuth: [Constants.ALL_TYPES]
        },
        children: [
          {
            path: 'monitoria',
            component: Contract,
            meta: {
              customAuth: [Constants.ALL_TYPES]
            }
          },
          {
            path: 'atendimentos',
            component: Attendance,
            meta: {
              customAuth: [Constants.MONITOR_TYPE]
            }
          },
          {
            path: 'relatorios',
            component: Report,
            meta: {
              customAuth: [Constants.MONITOR_TYPE, Constants.ADVISOR_TYPE, Constants.COORDINATOR_TYPE]
            }
          },
          {
            path: 'horarios',
            component: Schedule,
            meta: {
              customAuth: [Constants.MONITOR_TYPE, Constants.ADVISOR_TYPE]
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
        component: () => import('./views/About.vue')
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
      let pageAuth = customAuth === undefined ? true : customAuth.some(r => r === Constants.ALL_TYPES || r === snapshot.val().type);

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
