import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index'
import Home from '@/components/index/home.vue'


// 订舱
import Book from '@/components/book/book.vue'
import BookIndex from '@/components/book/bookIndex'
import BookList from '@/components/book/bookList'
import InsertBook from '@/components/book/insertBook'
import InsertList from '@/components/book/insertList'

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
import TrainDetail from '@/components/admin/trainDetail'
import QuestionList from '@/components/admin/questionList'
import QuestionDetail from '@/components/admin/questionDetail'

// 商务
import Commerce from '@/components/commerce/commerce'
import CommerceStatistics from '@/components/commerce/statistics'
import CommerceList from '@/components/commerce/commerceList'
import CommerceInsert from '@/components/commerce/commerceInsert'

// 船期
import SailSchedule from '@/components/sailSchedule/index'
import HplSchedule from '@/components/sailSchedule/hplSchedule'
import NbSchedule from '@/components/sailSchedule/nbSchedule'
import Blank from '@/components/blank'

// 会议室
import Meeting from '@/components/meeting/meeting'
import MeetingShow from '@/components/meeting/section'



Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index/home'
    },
    {
      path: '/insertBook',
      component: InsertBook
    },
    {
      path: '/meeting',
      component: Meeting,
      children: [
        {path: 'show',component: MeetingShow}
      ]
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
            {path: 'bookIndex',component: BookIndex},
            {path: 'insertBook',component: InsertBook},
            {path: 'insertList',component: InsertList}
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
            {path: 'trainDetail',component: TrainDetail, name: 'trainDetail'},
            {path: 'questionList',component: QuestionList, name: 'questionList'},
            {path: 'questionDetail',component: QuestionDetail, name: 'questionDetail'}
          ]
        },
        // 商务
        {
          path: 'commerce',
          component: Commerce,
          children: [
            {path: 'statistics',component: CommerceStatistics, name: 'CommerceStatistics'},
            {path: 'commerceList',component: CommerceList, name: 'CommerceList'},
            {path: 'commerceInsert',component: CommerceInsert, name: 'CommerceInsert'},
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
