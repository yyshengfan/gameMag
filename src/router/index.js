import Vue from 'vue'
import Router from 'vue-router'

import routes0 from './modules/base'
import user from './modules/user'
import lyr from './modules/lyr'
import systemMag from './modules/systemMag'
import divide from './modules/divide'
var routes = _.concat(routes0,user,lyr,systemMag,divide);

Vue.use(Router)

var router = new Router({
  // mode: 'history',
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.length ===0) {                                        //如果未匹配到路由
    from.name ? next({ name:from.name }) : next('/');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  } else {
    next();                                                                            //如果匹配到正确跳转
  }
});

export default router
