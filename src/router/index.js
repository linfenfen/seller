import Vue from 'vue'
import Router from 'vue-router'
import index from 'components/index/index'
import seller from 'components/seller/seller'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import detailFood from 'components/detailFood/detailFood'
import account from 'components/account/account'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
  {
    path: '/',
    component: index,
    children: [
    {
      path: '/seller',
      name: 'seller',
      component: seller
    },
    { path: '/goods',
      name: 'goods',
      component: goods
    },
    { path: '/ratings',
      name: 'ratings',
      component: ratings
    }]
  },
  {
    path: '/food/:goodName/:foodName',
    name: 'food',
    component: detailFood
  },
  {
    path: '/account',
    name: 'account',
    component: account
  }]
})
