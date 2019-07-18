<template>
    <div class="Ar_details">
        <header-hugx></header-hugx>
        <div class="aryicle_main">
            <!-- 左 -->
            <div class="aryicle_left">
                <!-- 左边-标题 -->
                <div class="aryicle_left_title details_auto">
                    <h5>{{ article.article_title }}</h5>
                    <div class="details_other">
                        <i class="material-icons fa fa-bell-o"></i>
                        <span>{{ article.article_time }}</span>
                        <i class="fa fa-eye margin-left"></i>
                        <span>{{ article.article_browse }}次阅读</span>
                        <i class="fa fa-comment-o margin-left"></i>
                        <span>{{ article.article_comment }}人评论</span>
                        <i class="fa fa-thumbs-o-up margin-left"></i>
                        <span>{{ article.article_thumbs }}</span>
                        <span>人点赞</span>
                    </div>
                    <div class="brief_introduction">
                        简介: {{ article.article_title }}
                    </div>
                </div>
                <!-- 内容-块 -->
                <div class="aryicle_content">
                    <!--文章内容-->
                    <div
                        class="details_content"
                        v-html="article.article_content"
                    ></div>
                    <!--文章内容 - 底部-->
                    <div class="details_content_foot">
                        <div class="details_content_thumbs">
                            <button @click="Get_Praise(article.article_id)">
                                <i class="fa fa-thumbs-up"></i>点赞
                            </button>
                        </div>
                    </div>
                    <!--文章内容 - 底部-结束-->
                </div>
                <!-- 块结束 -->
                <div class="article_comm">
                    <!--评论块-->
                    <div class="article_comm_row row">
                        <!-- 小块 -->
                        <div
                            class="col s12 aryicle_content_block"
                            v-for="comm in articleComm.comm"
                        >
                            <!-- 块-标题 -->
                            <div class="block_title clear">
                                <!-- 头像 -->
                                <div class="user_img">
                                    <img
                                        :src="comm.head_portrait"
                                        height="40"
                                    />
                                </div>
                                <!-- name -->
                                <div class="user_name">
                                    <span class="user_name_n">
                                        {{ comm.username }}
                                    </span>
                                    <br />
                                    <span class="user_name_data">
                                        {{ comm.article_comm_time }}
                                    </span>
                                </div>
                            </div>
                            <!-- 块-显示内容 -->
                            <div class="display_content">
                                <span>{{ comm.article_comm_content }}</span>
                            </div>
                            <!-- 块-用户交互 -->
                            <div class="home_interactive">
                                <a
                                    :href="'#' + comm.article_comm_id"
                                    @mouseover="
                                        Get_DynamicConver(
                                            comm.article_comm_id,
                                            comm.username,
                                            comm.article_userid
                                        )
                                    "
                                    @click="Get_DynamicCoclick()"
                                    >回复</a
                                >
                            </div>
                            <!-- 块-用户回复显示 -->
                            <section
                                v-for="reply in articleComm.reply"
                                :key="reply.reply_id"
                            >
                                <div
                                    class="reply_block"
                                    v-if="comm.article_comm_id === reply.pid"
                                >
                                    <div class="reply_img">
                                        <img
                                            :src="reply.user_img"
                                            height="40"
                                        />
                                    </div>
                                    <div class="reply_content">
                                        <span class="reply_name">
                                            {{ reply.user_name }}
                                        </span>
                                        回复
                                        <span class="reply_name">
                                            {{ reply.by_reply_name }}
                                        </span>
                                        :
                                        {{ reply.reply_content }}
                                        <div class="time_stamp">
                                            {{ reply.reply_time }} &nbsp;&nbsp;
                                            <!-- 其他用户回复 -->
                                            <a
                                                :href="'#' + reply.reply_id"
                                                class="other_users"
                                                @mouseover="
                                                    Get_DynamicConver(
                                                        comm.article_comm_id,
                                                        reply.user_name,
                                                        reply.user_id
                                                    )
                                                "
                                                @click="Get_DynamicCoclick()"
                                            >
                                                <i
                                                    class="fa fa-commenting-o"
                                                ></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <!--评论块结束-->
                    </div>
                    <!--评论结束-->
                    <!-- 评论模态框 -->
                    <div :id="articleComm.modal.id" class="modal">
                        <div class="modal-content">
                            <h6>评论</h6>
                            <textarea
                                rows="4"
                                cols="25"
                                class="comment_textarea"
                                :placeholder="
                                    '回复【' + articleComm.modal.name + '】'
                                "
                                v-model="articleComm.modal.content"
                            ></textarea>
                            <input
                                type="hidden"
                                :v-model="articleComm.modal.by_reply_id"
                                :value="articleComm.modal.by_reply_id"
                            />
                        </div>
                        <div class="modal-footer">
                            <button
                                class="modal-action modal-close waves-effect waves-green btn-flat"
                                @click="Get_ReplyComm()"
                            >
                                评论
                            </button>
                        </div>
                    </div>
                    <!-- 发表评论-->
                    <div class="comment">
                        <div class="comment_title">发表评论</div>
                        <div class="row">
                            <div class="input-field col s12 comment_hugx">
                                <textarea
                                    rows="4"
                                    cols="25"
                                    class="comment_textarea Ocomment_textarea"
                                    placeholder="请发表评论..."
                                    v-model="articleComm.textarea"
                                ></textarea>
                            </div>
                            <div class="input-field col s12">
                                <button
                                    class="btn waves-effect waves-light col s12 blue"
                                    type="submit"
                                    @click="Get_CommArticle(article.article_id)"
                                >
                                    发表评论
                                    <i class="fa fa-commenting right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- 发表评论-结束 -->
                </div>
            </div>
            <right-hugx></right-hugx>
        </div>
        <footer-hugx></footer-hugx>
    </div>
</template>

<script>
import header_hugx from "./SonFile/header-hugx";
import footer_hugx from "./SonFile/footer-hugx";
import right_hugx from "./SonFile/right-hugx";
import axios from 'axios';
import qs from 'qs';

export default {
    name: "Ardetails",
    components: {
        "header-hugx": header_hugx,
        "footer-hugx": footer_hugx,
        "right-hugx": right_hugx
    },
    data() {
        return {
            api: this.$store.store.state.api,
            // 接收获取到的数据
            article: {},
            // 文章评论
            articleComm: {
                // 接收数据
                reply: [],
                comm: [],
                // 发送数据
                // 文章评论
                textarea: '',
                // 绑定模态框值
                modal: {
                    id: '',                                                     // 评论ID
                    by_reply_id: '',                                            // 被回复的用户ID
                    name: '',                                                   // 被回复的用户名
                    content: '',                                                // 回复内容
                },
            },
            // 获取用户ID
            Uid: sessionStorage.getItem("user_id"),
            // 文章ID
            Aid: this.$route.query.article_id,
        }
    },
    methods: {

        // 获取文章数据
        Get_ArticleData() {
            const data = qs.stringify({ Aid: this.Aid })
            axios
                .post(`${this.api}/article_data`, data)
                .then(res => {
                    // console.log(res.data)
                    if (res.data.return_code === '500') return
                    // 获取成功存入自定义列表
                    this.article = res.data.return_obj
                })
        },

        // 获取文章详情信息
        Get_ArticleDetails() {
            const data = qs.stringify({ Aid: this.article.article_id })
            axios
                .post(`${this.api}/article_details`, data)
                .then(res => {
                    // console.log(res.data)
                    if (res.data.return_code === '500') return
                    // 重置数组
                    this.articleComm.comm = []
                    this.articleComm.reply = []
                    // 循环将评论信息存入自定义数组
                    for (let i in res.data.Onelist) this.articleComm.comm.push(res.data.Onelist[i])         // 一级评论
                    for (let i in res.data.Sonlist) this.articleComm.reply.push(res.data.Sonlist[i])         // 子评论
                })
                .catch(err => { console.log(err) })
        },

        // 点赞功能
        Get_Praise(Aid) {
            const data = qs.stringify({
                article_id: Aid,
                user_id: this.Uid,
            })
            if (Aid === '' || Aid === null) return
            if (this.Uid === '' || this.Uid === null) {
                alert("请先登录")
                return
            }
            axios
                .post(`${this.api}/Fabulous`, data)
                .then(res => {
                    console.log(res.data)
                    alert(res.data.return_str)
                    if (res.data.return_code === '200') this.article.article_thumbs++
                })
                .catch(err => { console.log(err) });
        },

        // 文章评论
        Get_CommArticle(Aid) {
            const data = qs.stringify({
                article_id: Aid,
                user_id: this.Uid,
                content: this.articleComm.textarea,
            })
            axios
                .post(`${this.api}/FirstLevel_Com`, data)
                .then(res => {
                    // console.log(res.data)  
                    alert(res.data.return_str)
                    if (res.data.return_code === '500') return
                    // 调用获取文章详情信息方法
                    this.Get_ArticleDetails()
                    // 评论数量加一
                    this.article.article_comment++

                })
                .catch(err => { console.log(err) })
        },

        // 移入事件 - 动态转换模态框ID
        /**
         * Cid - 评论id
         * name - 被评论的用户名
         * Pid - 被评论的用户ID
         */
        Get_DynamicConver(Cid, name, Pid) {
            this.articleComm.modal.id = Cid
            this.articleComm.modal.name = name
            this.articleComm.modal.by_reply_id = Pid
        },
        // 点击 - 弹出模态框
        Get_DynamicCoclick() { $('.modal').modal('open') },

        // 回复评论
        Get_ReplyComm() {
            const data = qs.stringify({
                user_id: this.Uid,
                content: this.articleComm.modal.content,
                pid: this.articleComm.modal.id,
                by_reply_id: this.articleComm.modal.by_reply_id,
            })
            axios
                .post(`${this.api}/Reply_comment`, data)
                .then(res => {
                    console.log(res.data)
                    alert(res.data.return_str)
                    if (res.data.return_code === '500') return
                    // 调用获取文章详情信息方法
                    this.Get_ArticleDetails()
                    // 评论数量加一
                    this.article.article_comment++
                })
                .catch(err => { console.log(err) })
        },

    },
    // 加载动画UI
    beforeCreate() {
        this.$myLoading.open()
        setTimeout(() => {
            this.$myLoading.hide()
        }, 300)
    },
    created() {

        // 将获取的文章数据存入自定义对象
        // if (this.$route.params.article_id !== undefined) this.article = this.$route.params
        // 保存当前文章数据到localStorage
        // localStorage.setItem(this.article.article_id, JSON.stringify(this.article))
    },
    mounted() {

        $(document).ready(function () {
            $(".button-collapse").sideNav();
            $('.modal').modal();
            $('.materialboxed').materialbox();
        })

        /**
         * F5强制刷新保存文章值
         */
        // 获取路由传入文章ID从localStorage中获取保存的信息
        // const id = this.$route.query.article_id
        // // 将数据放入自定义对象
        // this.article = id

        // 获取文章数据
        this.Get_ArticleData()

        // 获取文章详情信息
        setTimeout(() => {
            this.Get_ArticleDetails()
        }, 500)


    },
};
</script>


<style scoped>
@import "../../static/css/private/article.css";
@import "../../static/css/private/leaving.css";

.aryicle_main {
    min-height: 90vh;
    height: auto;
}
</style>
