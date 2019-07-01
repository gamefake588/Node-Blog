
//index.js
import myLoading from './loading.vue';
export default {
    /* 
    * Vue:Vue 构造器
    * options:可选插件参数
    */
    install(Vue, options) {
        /*
        *Vue.extend： https://cn.vuejs.org/v2/api/#Vue-extend
        *使用基础 Vue.extend 构造器，创建一个“子类” (Loading)。参数是一个包含组件选项的对象(myLoading)。 
        *然后 创建一个 Loading 的实例 Profile 挂载到一个HTMLElement实例上
        */
        const Loading = Vue.extend(myLoading);
        const Profile = new Loading({
            el: document.createElement('div')
        });

        /*
        *el： https://cn.vuejs.org/v2/api/#el
        *loading.vue中的template模板内容将会替换挂载的元素。挂载元素的内容都将被忽略。 *所以Profile.$el最终是template里面的内容
        */

        //插入到 document.body 
        document.body.appendChild(Profile.$el);

        //这里插件接收三个值 icon progressColor 如果注册的时候传入这些值则赋值给组件内默认值。
        if (options) {
            if (options.icon)
                Profile.icon = options.icon;
            if (options.progressColor)
                Profile.progressColor = options.progressColor;
        }
        //定义显示隐藏的方法  open 会传入一个text 字符串。如果有则赋值给组件内默认值。
        const myLoadingMethod = {
            open(text) {
                Profile.show = true;
                if (text)
                    Profile.text = text;
            },
            hide() {
                Profile.show = false;
            }
        };
        //添加实例方法 把自定义方法挂载到Vue构造器的上,这样每个实例都可以调用。
        Vue.prototype.$myLoading = myLoadingMethod;
    }
}
