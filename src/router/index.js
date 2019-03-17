import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import FirstView from '@/components/FirstView'

Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '/',
      name: 'FirstView',
      component: FirstView,
      meta: {
        title: '首页',
        requiresAuth: true // 是否需要判断是否登录
      }

    }, {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录页面',
       // requiresAuth: true // 是否需要判断是否登录
      }

    },{

      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Home'
      }

    }
  ]
})
