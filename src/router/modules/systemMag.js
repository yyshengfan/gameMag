// const myContract = () => import(/* webpackChunkName: "systemMag" */ '@/components/systemMag/myContract.vue')
// 系统设置
const role = () => import(/* webpackChunkName: "systemMag" */ '@/components/systemMag/role.vue')
const user = () => import(/* webpackChunkName: "systemMag" */ '@/components/systemMag/user.vue')
const roleMag = () => import(/* webpackChunkName: "systemMag" */ '@/components/systemMag/roleMag.vue')
const userMag = () => import(/* webpackChunkName: "systemMag" */ '@/components/systemMag/userMag.vue')
const roleForm = () => import(/* webpackChunkName: "systemMag" */ '@/components/systemMag/roleForm.vue')
const userForm = () => import(/* webpackChunkName: "systemMag" */ '@/components/systemMag/userForm.vue')
const userStatus = () => import(/* webpackChunkName: "systemMag" */ '@/components/systemMag/userStatus.vue')
const userStatusList = () => import(/* webpackChunkName: "systemMag" */ '@/components/systemMag/userStatusList.vue')

// 资源配置
const sourse = () => import(/* webpackChunkName: "resourse" */ '@/components/banner/sourse.vue')
const resourse = () => import(/* webpackChunkName: "resourse" */ '@/components/banner/resourse.vue')
const resourseForm = () => import(/* webpackChunkName: "resourse" */ '@/components/banner/resourseForm.vue')
// 游戏设置-活动配置
const activities = () => import(/* webpackChunkName: "resourse" */ '@/components/gameSet/activities.vue')
const activitiesList = () => import(/* webpackChunkName: "resourse" */ '@/components/gameSet/activitiesList.vue')
const activitiesForm = () => import(/* webpackChunkName: "resourse" */ '@/components/gameSet/activitiesForm.vue')
// 游戏设置-游戏配置gameInfoUpdate
const gameSet = () => import(/* webpackChunkName: "gameSet" */ '@/components/gameSet/gameSet.vue')
const gameSetList = () => import(/* webpackChunkName: "gameSet" */ '@/components/gameSet/gameSetList.vue')
const gameSetForm = () => import(/* webpackChunkName: "gameSet" */ '@/components/gameSet/gameSetForm.vue')
const gameInfoUpdate = () => import(/* webpackChunkName: "gameSet" */ '@/components/gameSet/gameInfoUpdate.vue')

// 游戏设置-游戏类型设置
const gameTypeSet = () => import(/* webpackChunkName: "gameSet" */ '@/components/gameSet/gameTypeSet.vue')
const gameTypeSetList = () => import(/* webpackChunkName: "gameSet" */ '@/components/gameSet/gameTypeSetList.vue')

// 游戏设置-特惠游戏
const specialGame = () => import(/* webpackChunkName: "gameSet" */ '@/components/gameSet/specialGame.vue')
const specialGameList = () => import(/* webpackChunkName: "gameSet" */ '@/components/gameSet/specialGameList.vue')
const specialGameForm = () => import(/* webpackChunkName: "gameSet" */ '@/components/gameSet/specialGameForm.vue')
// 游戏设置-游戏专题
const gameSpecial = () => import(/* webpackChunkName: "gameSet" */ '@/components/gameSet/gameSpecial.vue')
const gameSpecialList = () => import(/* webpackChunkName: "gameSet" */ '@/components/gameSet/gameSpecialList.vue')
const gameSpecialForm = () => import(/* webpackChunkName: "gameSet" */ '@/components/gameSet/gameSpecialForm.vue')
// 云闪付-数娱专区
const entertain = () => import(/* webpackChunkName: "quickEntertain" */ '@/components/quickEntertain/entertain.vue')
const entertainList = () => import(/* webpackChunkName: "quickEntertain" */ '@/components/quickEntertain/entertainList.vue')
const entertainForm = () => import(/* webpackChunkName: "quickEntertain" */ '@/components/quickEntertain/entertainForm.vue')
// 运营数据-运营数据
const analysis = () => import(/* webpackChunkName: "analysis" */ '@/components/analysis/analysis.vue')
const gameBaseData = () => import(/* webpackChunkName: "gameBaseData" */ '@/components/analysis/gameBaseData.vue')
const gameStayData = () => import(/* webpackChunkName: "gameStayData" */ '@/components/analysis/gameStayData.vue')
var routes = [
  /*------------------------------------系统设置----------------------------------------*/
  {
    path: '/role',
    name: 'role',
    component: role,
    children: [
      {
        path: '/roleMag',
        name: 'roleMag',
        component: roleMag,
        meta: {keepAlive: true},
      },
      {
        path: '/roleForm/:id',
        name: 'roleForm',
        component: roleForm,
      }
    ]
  } ,
  {
    path: '/user',
    name: 'user',
    component: user,
    children: [
      {
        path: '/userMag',
        name: 'userMag',
        component: userMag,
        meta: {keepAlive: true},
      },
      {
        path: '/userForm/:id',
        name: 'userForm',
        component: userForm,
      }
    ]
  },
  {
    path: '/userStatus',
    name: 'userStatus',
    component: userStatus,
    children: [
      {
        path: '/userStatusList',
        name: 'userStatusList',
        component: userStatusList,
        meta: {keepAlive: false},
      },
    ]
  },
  /*--------------------------------------资源配置-----------------------------------------*/
  {
    path: '/sourse',
    name: 'sourse',
    component: sourse,
    children: [
      {
        path: '/resourse',
        name: 'resourse',
        component: resourse,
        // meta: {keepAlive: true},
      },
      {
        path: '/resourseForm/:id',
        name: 'resourseForm',
        component: resourseForm,
      }
    ]
  },
  /*--------------------------------------资源配置-活动配置-----------------------------------------*/
  {
    path: '/activities',
    name: 'activities',
    component: activities,
    children: [
      {
        path: '/activitiesList',
        name: 'activitiesList',
        component: activitiesList,
        meta: {keepAlive: true},
      },
      {
        path: '/activitiesForm/:id',
        name: 'activitiesForm',
        component: activitiesForm,
      }
    ]
  },
  /*--------------------------------------资源配置-游戏配置-----------------------------------------*/
  {
    path: '/gameSet',
    name: 'gameSet',
    component: gameSet,
    children: [
      {
        path: '/gameSetList',
        name: 'gameSetList',
        component: gameSetList,
        meta: {keepAlive: true},
      },
      {
        path: '/gameSetForm/:id',
        name: 'gameSetForm',
        component: gameSetForm,
      },
      {
        path: '/gameSetForm/:id/gameInfoUpdate',
        name: 'gameInfoUpdate',
        component: gameInfoUpdate,
      }
    ]
  },
  /*--------------------------------------资源配置-游戏配置-----------------------------------------*/
  {
    path: '/gameTypeSet',
    name: 'gameTypeSet',
    component: gameTypeSet,
    children: [
      {
        path: '/gameTypeSetList',
        name: 'gameTypeSetList',
        component: gameTypeSetList,
        meta: {keepAlive: true},
      },
      {
        path: '/gameSetForm/:id',
        name: 'gameSetForm',
        component: gameSetForm,
      }
    ]
  },
  /*--------------------------------------资源配置-特惠游戏-----------------------------------------*/
  {
    path: '/specialGame',
    name: 'specialGame',
    component: specialGame,
    children: [
      {
        path: '/specialGameList',
        name: 'specialGameList',
        component: specialGameList,
        meta: {keepAlive: true},
      },
      {
        path: '/specialGameForm/:id',
        name: 'specialGameForm',
        component: specialGameForm,
      },
    ]
  },
  /*--------------------------------------游戏设置-游戏专题-----------------------------------------*/
  {
    path: '/gameSpecial',
    name: 'gameSpecial',
    component: gameSpecial,
    children: [
      {
        path: '/gameSpecialList',
        name: 'gameSpecialList',
        component: gameSpecialList,
        meta: {keepAlive: false},
      },
      {
        path: '/gameSpecialForm/:id',
        name: 'gameSpecialForm',
        component: gameSpecialForm,
      },
    ]
  },
  /*--------------------------------------云闪付-数娱专区-----------------------------------------*/
  {
    path: '/entertain',
    name: 'entertain',
    component: entertain,
    children: [
      {
        path: '/entertainlList',
        name: 'entertainList',
        component: entertainList,
        meta: {keepAlive: false},
      },
      {
        path: '/entertainlForm/:id',
        name: 'entertainForm',
        component: entertainForm,
      },
    ]
  },
  /*--------------------------------------运营数据-运营数据-----------------------------------------*/
  {
    path: '/analysis',
    name: 'analysis',
    component: analysis,
    meta: {keepAlive: true},
  },
  {
    path: '/gameBaseData',
    name: 'gameBaseData',
    component: gameBaseData,
  },
  {
    path: '/gameStayData',
    name: 'gameStayData',
    component: gameStayData,
  },
  
];

export default routes
