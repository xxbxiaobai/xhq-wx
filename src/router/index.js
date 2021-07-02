import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import cart from '@/components/cart/TheCart'
// import user from '@/components/user/TheUser'

/**
 * 动态改变是否懒加载
 * 这里的意思是：依据当前项目环境，导入对应的文件，
 */
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)
// Vue.use(cart)
// Vue.use(user)

// export default new Router({
const routes = [
  {
    path: '/',
    name: 'index',
    component: _import('components/Views/index'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/personList',
    name: 'personList',
    component: _import('components/Views/personList'),
    meta: {
      title: '人员列表'
    }
  },
  {
    path: '/persondetails',
    name: 'persondetails',
    component: _import('components/Views/persondetails'),
    meta: {
      title: '人员详情'
    }
  },
  {
    path: '/PersonInfo',
    name: 'PersonInfo',
    component: _import('components/Views/PersonInfo'),
    meta: {
      title: '添加人员'
    }
  },
  {
    path: '/DataStatistics',
    name: 'DataStatistics',
    component: _import('components/Views/DataStatistics'),
    meta: {
      title: '数据统计'
    }
  },
  {
    path: '/Techical',
    name: 'Techical',
    component: _import('components/Views/Techical'),
    meta: {
      title: '技术支持'
    }
  },
  {
    path: '/perMap',
    name: 'perMap',
    component: _import('components/Views/perMap'),
    meta: {
      title: '健身地图'
    }
  },
  {
    path: '/schoolList',
    name: 'schoolList',
    component: _import('components/Views/schoolList'),
    meta: {
      title: '学校详情'
    }
  }
]
// })
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new Router({
  mode: 'hash', // 浏览器地址栏不会出现/#/了，也可以去掉
  routes // (缩写) 相当于 routes: routes
})

export default router
