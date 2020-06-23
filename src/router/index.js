import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index'
import Home from '@/components/index/home.vue'


// 订舱
import Book from '@/components/book/book.vue'
import BookIndex from '@/components/book/bookIndex'
import BookList from '@/components/book/bookList'

// 论坛
import Forum from '@/components/forum/forum'

// 行政
import Admin from '@/components/admin/admin'
import AdminIndex from '@/components/admin/adminIndex'
import InformDetail from '@/components/admin/informDetail'
import InformList from '@/components/admin/informList'
import ItIndex from '@/components/admin/itIndex'
import PeriodicalDetail from '@/components/admin/periodicalDetail'
import SystemDetail from '@/components/admin/systemDetail'

// 船期
import SailSchedule from '@/components/sailSchedule/index'
import HplSchedule from '@/components/sailSchedule/hplSchedule'
import NbSchedule from '@/components/sailSchedule/nbSchedule'
import Blank from '@/components/blank'



Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index/home'
    },
    {
      path: '/index',
      component: Index,
      children: [
        {path: 'home',component: Home},
        {
          path: 'book',
          component: Book,
          children: [
            {path: 'bookList', component: BookList},
            {path: 'bookIndex',component: BookIndex}
          ]
        },
        {
          path: 'admin',
          component: Admin,
          children: [
            {path: 'adminIndex',component: AdminIndex},
            {path: 'informDetail',component: InformDetail},
            {path: 'informList',component: InformList},
            {path: 'periodicalDetail',name: 'periodicalDetail',component: PeriodicalDetail},
            {path: 'systemDetail',name: 'systemDetail',component: SystemDetail},
            {path: 'itIndex',component: ItIndex},
          ]
        },
        
        {
          path:'sailSchedule',component: SailSchedule,
          children: [
            {path: 'hplSchedule',component: HplSchedule},
            {path: 'nbSchedule',component: NbSchedule}
          ]
        },
        {path: 'forum',component: Forum},
        {path: 'blank',component: Blank}
      ]
    },
  ]
})

router.beforeEach((to,from,next) => {
  localStorage.setItem('path',to.path)
  next()
  // 
})

export default router
