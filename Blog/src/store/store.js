
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


/**
 * vuex的核心是：state,getter,actions,mutations
 * state就是根据你项目的需求，自己定义的一个数据结构，里面可以放些通用的状态。
 * getter怎么理解呢？通俗的理解可以认为是getter里的函数就是vuex里的计算属性
 * mutations官方定义：更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
 */
const store = new Vuex.Store({
    state: {
        // 接口地址
        api: 'http://www.howig.cn:3000',
        // 用户头像
        user_img: '',
    },
})

export default{
    store
}