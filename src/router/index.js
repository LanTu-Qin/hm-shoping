import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import Login from '@/views/login'
import MyOrder from '@/views/myorder'
import Pay from '@/views/pay'
import Prodetail from '@/views/prodetail'
import Search from '@/views/search/index.vue'
import SearchList from '@/views/search/list.vue'

import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'

import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      // 重定向：进入tabbar栏页面后跳转到默认home页面
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/login', component: Login },
    { path: '/myorder', component: MyOrder },
    { path: '/pay', component: Pay },
    // 动态路由传参，确定那个商品，路由参数需要携带id
    { path: '/paodetail/:id', component: Prodetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList }
  ]
})
// 全局前置守卫
// to：完整的要到的路由信息对象（路径，参数）
// from：完整的从哪来的路由信息对象（路径，参数）
// next：是否放行
// next() 直接放行
// next(路径) 拦截并转到填写的路径里面
const authUrls = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
// console.log(store.state.user.userInfo.token)
// next()

  if (!authUrls.includes(to.path)) next()
  else if (store.state.user.userInfo.token !== '') {
    next()
  } else next('/login')
})

export default router
