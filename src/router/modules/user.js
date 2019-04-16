// const myContract = () => import(/* webpackChunkName: "user" */ '@/components/user/myContract.vue')
const electronicNotice = () => import(/* webpackChunkName: "user" */ '@/components/user/electronicNotice.vue')
const electronicNoticeMag = () => import(/* webpackChunkName: "user" */ '@/components/user/electronicNoticeMag.vue')
const electronicNoticeMagAdd = () => import(/* webpackChunkName: "user" */ '@/components/user/electronicNoticeMagAdd.vue')
const electronicNoticeMagShow = () => import(/* webpackChunkName: "user" */ '@/components/user/electronicNoticeMagShow.vue')
const pwdModify = () => import(/* webpackChunkName: "user" */ '@/components/user/pwdModify.vue')

var routes = [
  {
    path: '/electronicNotice',
    name: 'electronicNotice',
    component: electronicNotice,

    children: [
      {
        path: '/electronicNoticeMag',
        name: 'electronicNoticeMag',
        component: electronicNoticeMag,
        meta: {keepAlive: true},
      },
      {
        path: '/electronicNoticeMag/:id',
        name: 'electronicNoticeMagAdd',
        component: electronicNoticeMagAdd,
      },
      {
        path: '/electronicNoticeMagShow/:id',
        name: 'electronicNoticeMagShow',
        component: electronicNoticeMagShow,
      }
    ]
  },
  {
    path: '/pwdModify',
    name: 'pwdModify',
    component: pwdModify,
  }
];

export default routes
