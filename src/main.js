// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import VueRouter from "vue-router";
import axios from 'axios'




Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.prototype.$axios = axios

Vue.config.productionTip = false;






/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

/*
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
    console.log('需要登录');
    if (localStorage.token) { // 判断当前的token是否存在 ； 登录存入的token
      next();
    }
    else {
      next({
        path: '/',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});*/
