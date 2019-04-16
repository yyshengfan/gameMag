import LoadingComp from '@/components/public/LoadingComp'
import ErrorComp from '@/components/public/ErrorComp'

import login from '@/components/public/login'
import pass from '@/components/public/pass'
const main = () => import(/* webpackChunkName: "main" */ '@/components/main/main.vue')

// const organization = () => import(/* webpackChunkName: "organization" */'@/components/organization/organization.vue')

// const userForm = () => (/* webpackChunkName: "user" */ {
//   component: import('@/components/user/userForm.vue'),
//   loading: LoadingComp,
//   error: ErrorComp,
//   delay: 200,
//   timeout: 3000
// });

var routes = [{
  path: '/main',
  name: 'main',
  component: main
}, {
  path: '/',
  name: 'login',
  component: login
}, {
  path: '/pass',
  name: 'pass',
  component: pass
},

]

export default routes
