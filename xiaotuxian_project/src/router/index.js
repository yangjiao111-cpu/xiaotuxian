import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Category from '@/views/Layout/Category/index.vue'
import Home from '@/views/Layout/Home/index.vue'
import SubCategory from '@/views/Layout/SubCategory/index.vue'
import Detail from '@/views/Layout/Detail/index.vue'
import CartList from '@/views/Layout/CartList/index.vue'
import Checkout from '@/views/Layout/Checkout/index.vue'
import Pay from '@/views/Layout/Pay/index.vue'
import PayBack from '@/views/Layout/Pay/PayBack.vue'
import Member from '@/views/Layout/Member/index.vue'
import UserInfo from '@/views/Layout/Member/components/UserInfo.vue'
import UserOrder from '@/views/Layout/Member/components/UserOrder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'category/:id',
          component: Category
        },
        {
          path: 'category/sub/:id',
          component: SubCategory
        },
        {
          path: 'detail/:id',
          component: Detail
        },
        {
          path: 'cartlist',
          component: CartList
        },
        {
          path: 'checkout',
          component: Checkout
        },
        {
          path: 'pay',
          component: Pay
        },
        {
          path: 'paycallback',
          component: PayBack
        },
        {
          path: 'member',
          component: Member,
          children: [
            {
              path: '',
              component: UserInfo
            },
            {
              path: 'order',
              component: UserOrder
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ],
})

export default router
