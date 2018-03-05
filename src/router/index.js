import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Setting from '@/components/home/Setting'
import Writting from '@/components/home/Writting'
import MyArtical from '@/components/home/MyArtical'
import Editor from '@/components/home/Editor'
import Hot from '@/components/home/hot'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'setting',
          name: 'setting',
          component: Setting
        }, {
          path: 'writting',
          name: 'writting',
          component: Writting
        }, {
          path: 'myartical',
          component: MyArtical
        }, {
          path: 'editor/:id',
          component: Editor
        }, {
          path: 'hot',
          component: Hot
        }
      ]
    }
  ]
})
