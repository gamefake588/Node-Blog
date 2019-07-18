
<template>
    <div class="about">
        <header-hugx></header-hugx>
        <div class="aryicle_main">
            <!-- 个人简介 -->
            <section class="home-brief">
                <h4>个人介绍</h4>
                <!-- 介绍 - 列表 -->
                <ul>
                    <!-- 关于个人 -->
                    <li class="home-brief-title">关于我</li>
                    <li class="home-brief-content">
                        <span>名：HUANGXAIN</span>
                    </li>
                    <li class="home-brief-content">
                        <span>性别：男</span>
                    </li>
                    <li class="home-brief-content">
                        <span>年龄：18</span>
                    </li>
                    <li class="home-brief-content">
                        <span>职业：学生</span>
                    </li>
                    <li class="home-brief-content">
                        <span>
                            热爱编程 , 对代码有种特殊的情感。喜欢打篮球 、看电影
                            、旅游 、美食 、发呆 、民谣
                        </span>
                    </li>
                    <!-- 技术栈 -->
                    <li class="home-brief-title debug-top">技术栈</li>
                    <!-- 前端技能栈 -->
                    <li class="home-brief-content">
                        <span style="font-size: 1.2rem;">前端：</span>
                    </li>
                    <li class="home-brief-content debug-left">
                        <span>H5 、Css3 、Js.ES6语法</span>
                    </li>
                    <li class="home-brief-content debug-left">
                        <span
                            >Bootstrap ( 前端快捷开发框架 ) 、Materialize
                            (UI组件库)</span
                        >
                    </li>
                    <li class="home-brief-content debug-left">
                        <span>jQuery ( AJAX ) </span>
                    </li>
                    <li class="home-brief-content debug-left">
                        <span>Vue.js ( Vue-router 、axios 、qs ) </span>
                    </li>
                    <!-- 后端技能栈 -->
                    <li class="home-brief-content">
                        <span style="font-size: 1.2rem;">后端：</span>
                    </li>
                    <li class="home-brief-content debug-left">
                        <span>php</span>
                    </li>
                    <li class="home-brief-content debug-left">
                        <span>Node.js ( Express ) </span>
                    </li>
                    <!-- 校园经历 -->
                    <li class="home-brief-title debug-top">校园经历</li>
                    <li class="home-brief-content">
                        <span>在校前端开发工作室学习一年</span>
                    </li>
                    <li class="home-brief-content">
                        <span>学院网页设计比赛三等奖，学院作品赛二等奖</span>
                    </li>
                    <li class="home-brief-content">
                        <span>中国大学生计算机设计大赛海南赛区专科组web应用开发类二等奖</span>
                    </li>
                    <li class="home-brief-content">
                        <span>2019泛珠三角大学生计算机作品赛海南赛区专科组二等奖</span>
                    </li>
                    <!-- 联系我 -->
                    <li class="home-brief-title debug-top">联系方式</li>
                    <li class="home-brief-content">
                        <span>
                            GitHub：
                            <a href="https://github.com/gamefake588"
                                >huangxian</a
                            >
                        </span>
                    </li>
                    <li class="home-brief-content">
                        <span>
                            微博：
                            <a
                                href="https://weibo.com/5738463632/profile?topnav=1&wvr=6&is_all=1"
                                >子敬</a
                            >
                        </span>
                    </li>
                    <li class="home-brief-content">
                        <span>
                            qq：
                            <a
                                data-v-731ead00=""
                                href="http://wpa.qq.com/msgrd?v=3&amp;uin=2592084620&amp;site=qq&amp;menu=yes"
                                target="_blank"
                                title="QQ"
                                data-balloon="QQ"
                                data-balloon-pos="up"
                                >null</a
                            >
                        </span>
                    </li>
                    <li class="home-brief-content">
                        <span>
                            email：
                            <a
                                data-v-731ead00=""
                                href="2592084620@qq.com"
                                target="_blank"
                                title="Email"
                                data-balloon="Email"
                                data-balloon-pos="up"
                            >
                                <i class="fa fa-envelope"></i>
                            </a>
                        </span>
                    </li>
                </ul>
            </section>
        </div>
        <!-- 脚注 -->
        <footer-hugx></footer-hugx>
    </div>
</template>

<script>
import header_hugx from "./header-hugx";
import footer_hugx from "./footer-hugx";

export default {
    name: 'about',
    components: {
        "header-hugx": header_hugx,
        "footer-hugx": footer_hugx,
    },
    // 加载动画UI
    beforeCreate() {
        this.$myLoading.open()
        setTimeout(() => {
            this.$myLoading.hide()
        }, 300)
    },
    data() {
        return {

        }
    },
}
</script>

<style scoped>
.aryicle_main {
    min-height: 90vh;
    height: auto;
}
/* 个人简介 */
.home-brief {
    background-color: #fff;
    height: auto;
    padding: 10% 8% 5% 8%;
    box-sizing: border-box;
    font-family: "黑体";
}
.home-brief > h4 {
    padding-bottom: 20px;
    border-bottom: 1px solid #c7c2c2;
    font-size: 1.8rem;
}
/* 标题 */
.home-brief-title {
    font-size: 1.4rem;
}
/* 内容 */
.home-brief-content {
    list-style: circle;
    margin: 1rem 0 0 2rem;
    color: #2196f3;
}
.home-brief-content > span {
    color: #666;
    font-family: fantasy;
}
.home-brief-content > span > a {
    color: #999;
}
.debug-top {
    margin-top: 1rem;
}
.debug-left {
    margin-left: 3.5rem;
}
</style>

