const info = () => import(/* webpackChunkName: "cpManage" */ '@/components/cpManage/info.vue')
const infoManage = () => import(/* webpackChunkName: "cpManage" */ '@/components/cpManage/infoManage.vue')
const infoForm = () => import(/* webpackChunkName: "cpManage" */ '@/components/cpManage/infoForm.vue')
const game= () => import(/* webpackChunkName: "cpManage" */ '@/components/cpManage/game.vue')
const gameManage = () => import(/* webpackChunkName: "cpManage" */ '@/components/cpManage/gameManage.vue')
const gameInfoForm = () => import(/* webpackChunkName: "cpManage" */ '@/components/cpManage/gameInfoForm.vue')
const gameTestInfo = () => import(/* webpackChunkName: "cpManage" */ '@/components/cpManage/gameTestInfo.vue')
const gameTestReport = () => import(/* webpackChunkName: "cpManage" */ '@/components/cpManage/gameTestReport.vue')
const cpContract = () => import(/* webpackChunkName: "cpManage" */ '@/components/cpManage/cpContract.vue')
const cpContractForm = () => import(/* webpackChunkName: "cpManage" */ '@/components/cpManage/cpContractForm.vue')

const channelInfo = () => import(/* webpackChunkName: "channelManage" */ '@/components/channelManage/channelInfo.vue')
const channelInfoManage = () => import(/* webpackChunkName: "channelManage" */ '@/components/channelManage/channelInfoManage.vue')
const channelInfoForm = () => import(/* webpackChunkName: "channelManage" */ '@/components/channelManage/channelInfoForm.vue')

const channel = () => import(/* webpackChunkName: "channelManage" */ '@/components/channelManage/channel.vue')
const channelManage = () => import(/* webpackChunkName: "channelManage" */ '@/components/channelManage/channelManage.vue')
const channelInfoView = () => import(/* webpackChunkName: "channelManage" */ '@/components/channelManage/channelInfoView.vue')
const channelInfoUpdate = () => import(/* webpackChunkName: "channelManage" */ '@/components/channelManage/channelInfoUpdate.vue')
const channelContract = () => import(/* webpackChunkName: "channelManage" */ '@/components/channelManage/channelContract.vue')

const customerOrder = () => import(/* webpackChunkName: "customerOrder" */ '@/components/customerOrder/customerOrder.vue')
const customerOrderList = () => import(/* webpackChunkName: "customerOrder" */ '@/components/customerOrder/customerOrderList.vue')

const settlement = () => import(/* webpackChunkName: "settlement" */ '@/components/settlement/settlement.vue')
const settlementList = () => import(/* webpackChunkName: "settlement" */ '@/components/settlement/settlementList.vue')
var routes = [
  /*---------------------cp管理---------------------*/
  {
    path: '/info',
    name: 'info',
    component: info,
    children:[
      {
        path: '/infoManage',
        name: 'infoManage',
        component: infoManage,
      },
      {
        path: '/infoManage/:id/infoForm',
        name: 'infoForm',
        component: infoForm,
      },
    ]
  },
  {
    path: '/game',
    name: 'game',
    component: game,
    children:[
      {
        path: '/gameManage',
        name: 'gameManage',
        component: gameManage,
      },
      {
        path: '/gameManage/:id/gameInfoForm',
        name: 'gameInfoForm',
        component: gameInfoForm,
      },
      {
        path: '/gameManage/:id/gameTestInfo',
        name: 'gameTestInfo',
        component: gameTestInfo,
      },
      {
        path: '/gameManage/:id/gameTestReport',
        name: 'gameTestReport',
        component: gameTestReport,
      },
    ]
  },
  {
    path: '/cpContract',
    name: 'cpContract',
    component: cpContract,
  },
  {
    path: '/cpContract/:id',
    name: 'cpContractForm',
    component: cpContractForm,
  },
  /*---------------------渠道管理---------------------*/
  {
    path: '/channelContract',
    name: 'channelContract',
    component: channelContract,
  },
  {
    path: '/channelInfo',
    name: 'channelInfo',
    component: channelInfo,
    children:[
      {
        path: '/channelInfoManage',
        name: 'channelInfoManage',
        component: channelInfoManage,
      },
      {
        path: '/channelInfo/:id/channelInfoForm',
        name: 'channelInfoForm',
        component: channelInfoForm,
      },
    ]
  },
  {
    path: '/channel',
    name: 'channel',
    component: channel,
    children:[
      {
        path: '/channelManage',
        name: 'channelManage',
        component: channelManage,
      },
      {
        path: '/channelManage/:id/channelInfoView',
        name: 'channelInfoView',
        component: channelInfoView,
      },
      {
        path: '/channelManage/channelInfoUpdate',
        name: 'channelInfoUpdate',
        component: channelInfoUpdate,
      },
    ]
  },
  /*---------------------订单查询---------------------*/
  {
    path: '/customerOrder',
    name: 'customerOrder',
    component: customerOrder,
    children:[
      {
        path: '/customerOrderList',
        name: 'customerOrderList',
        component: customerOrderList,
      },
  ]
  },
  /*---------------------结算报表---------------------*/
  {
    path: '/settlement',
    name: 'settlement',
    component: settlement,
    children:[
      {
        path: '/settlementList',
        name: 'settlementList',
        component: settlementList,
      },
    ]
  },
];

export default routes
