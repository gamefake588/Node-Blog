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
import User_space from './components/User_space'

Vue.use(VueRouter)

// 标题插件
import VueWechatTitle from 'vue-wechat-title';
Vue.use(VueWechatTitle)


Vue.config.productionTip = false

//加载插件
import myLoading from './Plug-in/loading'
Vue.use(myLoading, {
  icon: require('./assets/paper-plane.png'),
  progressColor: 'blue'
})

// 用户弹出窗
// import mypopover from './Plug-in/user-popover'
// Vue.use(mypopover, {
//   img: require('./assets/paper-plane.png'),
//   name: 'blue',
//   describe: '人非草木 孰能无情',
//   article: '9',
//   thumbs: '99',
//   id: 'http://localhost:8080/User_space?user_id=1',
// })



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
    { name: 'User_space', path: '/User_space', component: User_space, meta: { title: 'HuGx | 用户主页' } },
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
