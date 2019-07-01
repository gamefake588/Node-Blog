// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 引入Vuex
import store from '@/store/store'

// 路由
import VueRouter from 'vue-router'
import indexT from './components/index'
import templateT from './components/template'
import loginT from './components/login'
import articleRelease from './components/article_release'
import details from './components/Ar_details'
import leaving from './components/leaving'
import about from './components/SonFile/about'

Vue.use(VueRouter)

// 标题插件
import VueWechatTitle from 'vue-wechat-title';
Vue.use(VueWechatTitle)


Vue.config.productionTip = false

//加载插件
import myLoading from './loading'
Vue.use(myLoading, {
  icon: require('./assets/paper-plane.png'),
  progressColor: 'blue'
})



// 配置路由
const router = new VueRouter({

  routes: [
    { path: '/', component: indexT, meta: { title: 'HuGx' } },
    { path: '/template', component: templateT, meta: { title: 'HuGx | 模板' } },
    { path: '/login', component: loginT, meta: { title: 'HuGx | 登陆/注册' } },
    { path: '/article_release', component: articleRelease, meta: { title: 'HuGx | 发布文章' } },
    { name: 'details', path: '/details', component: details, meta: { title: 'HuGx | 文章' } },
    { name: 'leaving', path: '/leaving', component: leaving, meta: { title: 'HuGx | 留言' } },
    { name: 'about', path: '/about', component: about, meta: { title: 'HuGx | 关于' } },
  ],
  mode: 'history',

})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
