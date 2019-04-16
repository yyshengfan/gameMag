// const myContract = () => import(/* webpackChunkName: "divide" */ '@/components/divide/myContract.vue')
const divide = () => import(/* webpackChunkName: "divide" */ '@/components/divide/divide.vue')
const divideList = () => import(/* webpackChunkName: "divide" */ '@/components/divide/divideList.vue')
const divideForm = () => import(/* webpackChunkName: "divide" */ '@/components/divide/divideForm.vue')

const divideDe = () => import(/* webpackChunkName: "divide" */ '@/components/divide/divideDe.vue')
const divideDetails = () => import(/* webpackChunkName: "divide" */ '@/components/divide/divideDetails.vue')
const divideDetailsForm = () => import(/* webpackChunkName: "divide" */ '@/components/divide/divideDetailsForm.vue')
const divideDetailsView = () => import(/* webpackChunkName: "divide" */ '@/components/divide/divideDetailsView.vue')

var routes = [
  {
    path: '/divide',
    name: 'divide',
    component: divide,
    children: [
      {
        path: '/divideList',
        name: 'divideList',
        component: divideList,
        meta: {keepAlive: true},
      } ,
      {
        path: '/divideForm/:id',
        name: 'divideForm',
        component: divideForm,
      }
    ]
  },
  {
    path: '/divideDe',
    name: 'divideDe',
    component: divideDe,
    children: [
      {
        path: '/divideDetails',
        name: 'divideDetails',
        component: divideDetails,
        // meta: {keepAlive: true},
      } ,
      {
        path: '/divideDetailsForm/:id',
        name: 'divideDetailsForm',
        component: divideDetailsForm,
      },
      {
        path: '/divideDetailsView/:id',
        name: 'divideDetailsView',
        component: divideDetailsView,
      }
    ]
  }
];

export default routes
