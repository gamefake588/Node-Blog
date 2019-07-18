<template>
    <div class="index">
        <!-- 搜索框 -->
        <div class="search_box">
            <!--  关闭  -->
            <div class="search_off">
                <a href="javascript:;" class="search_of"> X </a>
            </div>
            <!--  搜索框  -->
            <div class="searchBox">
                <form action="" method="get">
                    <input type="search" name="query" placeholder="search" />
                    <div class="searchBox_auto">
                        <button class="fa fa-search"></button>
                    </div>
                </form>
            </div>
        </div>
        <!-- 搜索框-结束 -->
        <!--  上下标  -->
        <div class="top_bottom">
            <ul>
                <li
                    class="tooltipped"
                    data-position="left"
                    data-delay="20"
                    data-tooltip="上升"
                    onclick="window.location.href='#top'"
                >
                    <a><i class="fa fa-arrow-up fa-2x"></i></a>
                </li>
            </ul>
        </div>
        <!--  上下标-结束  -->
        <!-- box -->
        <div class="box">
            <header-hugx></header-hugx>
            <!-- 文章内容 -->
            <div class="aryicle_main">
                <!-- 左 -->
                <div class="aryicle_left">
                    <!-- 左边-标题 -->
                    <div class="aryicle_left_title">
                        <ul id="tabs">
                            <li class="left a-key">文章</li>
                            <li class="right tab">
                                <a
                                    href="#user"
                                    @click="GetArticle(1, 'article_user')"
                                    >用户</a
                                >
                            </li>
                            <li class="right tab">
                                <a
                                    href="#Blogger"
                                    class="active"
                                    @click="GetArticle(1, 'Get_articles')"
                                    >博主</a
                                >
                            </li>
                        </ul>
                    </div>
                    <!-- 内容-块 -->
                    <div class="aryicle_content">
                        <div class="row" id="Blogger">
                            <!-- 块 -->
                            <div
                                class="col s12 aryicle_content_block"
                                v-for="b in Blogger"
                                :data-key="b.article_id"
                            >
                                <popover
                                    :popover="popover"
                                    :skey="b.article_id"
                                ></popover>
                                <section @click="OpenArticle(b.article_id)">
                                    <!-- 块-标题 -->
                                    <div class="block_title clear">
                                        <ul class="block_title_ul">
                                            <li class="special_column">专栏</li>
                                            <li
                                                @mouseenter="
                                                    Get_ThroughInformation(
                                                        b.article_id,
                                                        b.article_userid
                                                    )
                                                "
                                                @mouseleave="Open_Information()"
                                            >
                                                <a>{{ b.article_username }}</a>
                                            </li>
                                            <li>{{ b.article_date }}</li>
                                            <li>
                                                <a>{{ b.article_label }}</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <!-- 块-显示内容 -->
                                    <div class="display_content">
                                        <a>{{ b.article_title }}</a>
                                    </div>
                                    <!-- 块-用户交互 -->
                                    <div class="home_interactive">
                                        <a
                                            class="waves-effect waves-light btn mybtn"
                                            ><i class="fa fa-thumbs-up"></i
                                            >{{ b.article_thumbs }}</a
                                        >
                                        <a
                                            class="waves-effect waves-light btn mybtn"
                                            ><i class="fa fa-eye"></i
                                            >{{ b.article_browse }}</a
                                        >
                                    </div>
                                </section>
                            </div>
                        </div>
                        <!-- 用户 -->
                        <div class="row" id="user">
                            <!-- 块 -->
                            <div
                                class="col s12 aryicle_content_block"
                                v-for="u in user"
                            >
                                <popover
                                    :popover="popover"
                                    :skey="u.article_id"
                                ></popover>
                                <section @click="OpenArticle(u.article_id)">
                                    <!-- 块-标题 -->
                                    <div class="block_title clear">
                                        <ul class="block_title_ul">
                                            <li class="special_column">专栏</li>
                                            <li
                                                @mouseenter="
                                                    Get_ThroughInformation(
                                                        u.article_id,
                                                        u.article_userid
                                                    )
                                                "
                                                @mouseleave="Open_Information()"
                                            >
                                                <a>{{ u.article_username }}</a>
                                            </li>
                                            <li>{{ u.article_date }}</li>
                                            <li>
                                                <a>{{ u.article_label }}</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <!-- 块-显示内容 -->
                                    <div class="display_content">
                                        <a>{{ u.article_title }}</a>
                                    </div>
                                    <!-- 块-用户交互 -->
                                    <div class="home_interactive">
                                        <a
                                            class="waves-effect waves-light btn mybtn"
                                            ><i class="fa fa-thumbs-up"></i
                                            >{{ u.article_thumbs }}</a
                                        >
                                        <a
                                            class="waves-effect waves-light btn mybtn"
                                            ><i class="fa fa-eye"></i
                                            >{{ u.article_browse }}</a
                                        >
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 右 -->
                <right-hugx></right-hugx>
            </div>
            <!-- box-结束 -->
        </div>
        <!-- 脚注 -->
        <footer-hugx></footer-hugx>
    </div>
</template>


<script>
import header_hugx from "./SonFile/header-hugx";
import footer_hugx from "./SonFile/footer-hugx";
import right_hugx from "./SonFile/right-hugx";
import popover from "./SonFile/user-popover";
import axios from "axios";
import qs from "qs";

export default {
    name: "indexT",
    components: {
        "header-hugx": header_hugx,
        "footer-hugx": footer_hugx,
        "right-hugx": right_hugx,
        "popover": popover,
    },
    data() {
        return {
            api: this.$store.store.state.api,
            // 博主 - 文章
            Blogger: [],
            // 用户 - 文章
            user: [],
            // 页数
            page: { user: 1, Blogger: 1 },
            // 类型
            type: "",
            // 用户弹出框
            popover: {
                show: false,
                key: '',                                // 钥匙
                Uid: '',                                // 用户ID
            }
        };
    },
    methods: {
        // 获取文章列表 (page) - 页数  (str) - 接口地址
        GetArticle(page, str) {
            const data = qs.stringify({ page: page });
            axios
                .post(`${this.api}/${str}`, data)
                .then(res => {
                    // console.log(res.data)
                    if (res.data.return_code === "500") {
                        console.log(res.data.return_str);
                        return;
                    }
                    // 避免重复
                    this.Blogger = [];
                    this.user = [];
                    // 将获取的数据装入数组
                    for (let i in res.data) {
                        // 判断加入指定的数组
                        if (str === "article_user") {
                            this.user.push(res.data[i]);
                            this.type = "用户";
                        }
                        if (str === "Get_articles") {
                            this.Blogger.push(res.data[i]);
                            this.type = "博主";
                        }
                    }
                })
                .catch(err => { console.log(err) });
        },

        // 根据之前数组匹配对应文章ID 跳转
        OpenArticle(id) {
            // 文章数据存储点
            let data = {}
            // 博主
            this.Blogger.forEach((value, index, arry) => {
                // 匹配用户点击文章信息
                if (value.article_id === id) data = value
            })
            // 用户
            this.user.forEach((value, index, arry) => {
                // 匹配用户点击文章信息
                if (value.article_id === id) data = value
            })
            this.$router.push({
                path: `/details/${data.article_id}`,
                name: "details",
                params: data,
                query: { article_id: data.article_id },
            })
        },

        // 鼠标经过显示用户信息
        Get_ThroughInformation(key, Uid) {
            // 显示
            setTimeout(() => {
                this.popover.show = true
            }, 300)
            // 钥匙
            this.popover.key = key
            // 用户ID
            this.popover.Uid = Uid
        },

        // 鼠标移出关闭弹出框
        Open_Information() {
            let popover = document.querySelectorAll('.user-popover')
            for (let i in popover) {
                // 隐藏
                setTimeout(() => {
                    // 判断是否存在key
                    if (popover[i].dataset === undefined) return
                    // key不为空时关闭弹出框
                    if (popover[i].dataset.key !== '')
                        this.popover.show = !this.popover.show
                }, 300)
            }

        },

    },
    mounted() {

        // 框架配置
        $(document).ready(function () {
            $(".button-collapse").sideNav();
            $(".modal").modal();
            $(".materialboxed").materialbox();
            $("ul#tabs").tabs();
        });

        // 首次博主获取文章信息
        this.GetArticle(this.page.Blogger, "Get_articles");

        let bStop = true;
        // 下拉加载获取文章 - 节流
        window.onscroll = () => {
            if (!bStop) return;
            bStop = false;
            setTimeout(() => {
                let scrollTop =
                    (document.documentElement &&
                        document.documentElement.scrollTop) ||
                    document.body.scrollTop;
                let scrollHeight =
                    (document.documentElement &&
                        document.documentElement.scrollHeight) ||
                    document.body.scrollHeight;
                let clientHeight =
                    document.documentElement.clientHeight || window.innerHeight;
                let scrolledToBottom =
                    Math.ceil(scrollTop + clientHeight) >= scrollHeight;
                // 判断到达底部
                if (scrolledToBottom) {
                    // 判断渲染的类型
                    switch (this.type) {
                        case "":
                            break;
                        case "用户":
                            this.page.user++;
                            this.GetArticle(this.page.user, "article_user");
                            break;
                        case "博主":
                            this.page.Blogger++;
                            this.GetArticle(this.page.Blogger, "Get_articles");
                            break;
                        default:
                            console.log("NULL");
                    }
                }
                bStop = true;
            }, 300);
        };

    },
    updated() {

    },
};
</script>



<style scoped>
/* @import "../../static/css/private/article.css"; */
.aryicle_main {
    overflow: initial;
}
.box {
    clear: both;
    overflow: hidden;
}
</style>


