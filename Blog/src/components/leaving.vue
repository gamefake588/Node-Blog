
<template>
    <div class="app-leaving">
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
        <header-hugx></header-hugx>
        <div class="aryicle_main">
            <!-- 左 -->
            <div class="aryicle_left">
                <!-- 左边-标题 -->
                <div class="aryicle_left_title">
                    <span class="message">留言</span>
                    <p class="message_o">人非圣贤,孰能无过</p>
                    <img
                        src="static/images/N1.jpg"
                        class="materialboxed responsive-img"
                    />
                </div>
                <!-- 内容-块 -->
                <div class="aryicle_content">
                    <!-- 块结束 -->
                    <div class="article_comm">
                        <!--评论块-->
                        <div class="article_comm_row row">
                            <div class="col s12">
                                <!-- 留言 - 块 -->
                                <section
                                    class="leaving_row"
                                    v-for="lv in leaving.data"
                                    :key="lv.message_id"
                                >
                                    <!-- 块-标题 -->
                                    <div class="block_title clear">
                                        <!-- 头像 -->
                                        <div class="user_img">
                                            <img
                                                :src="lv.comment_img"
                                                height="40"
                                            />
                                        </div>
                                        <!-- name -->
                                        <div class="user_name">
                                            <span class="user_name_n">
                                                {{ lv.comment_username }}
                                            </span>
                                            <br />
                                            <span class="user_name_data">
                                                {{ lv.time }}
                                            </span>
                                        </div>
                                    </div>
                                    <!-- 块-显示内容 -->
                                    <div class="display_content">
                                        <span>{{ lv.comment_content }}</span>
                                    </div>
                                    <!-- 块-用户交互 -->
                                    <div class="home_interactive">
                                        <a
                                            :href="'#' + lv.message_id"
                                            @mouseover="
                                                Get_DynamicConver(
                                                    lv.message_id,
                                                    lv.comment_username,
                                                    lv.user_id
                                                )
                                            "
                                            @click="Get_DynamicCoclick()"
                                            >回复</a
                                        >
                                    </div>
                                    <!-- 块-用户回复显示 -->
                                    <section v-for="ply in leaving.reply">
                                        <div
                                            class="reply_block"
                                            v-if="lv.message_id === ply.pid"
                                        >
                                            <div class="reply_img">
                                                <img
                                                    :src="ply.user_img"
                                                    height="40"
                                                />
                                            </div>
                                            <div class="reply_content">
                                                <span class="reply_name">
                                                    {{ ply.user_name }}
                                                </span>
                                                回复
                                                <span class="reply_name">
                                                    {{ ply.by_reply_name }}
                                                </span>
                                                : {{ ply.reply_content }}
                                                <div class="time_stamp">
                                                    {{ ply.reply_time }}
                                                    &nbsp;&nbsp;
                                                    <!-- 其他用户回复 -->
                                                    <a
                                                        :href="
                                                            '#' + ply.reply_id
                                                        "
                                                        class="other_users"
                                                        @mouseover="
                                                            Get_DynamicConver(
                                                                lv.message_id,
                                                                ply.user_name,
                                                                ply.user_id
                                                            )
                                                        "
                                                        @click="
                                                            Get_DynamicCoclick()
                                                        "
                                                    >
                                                        <i
                                                            class="fa fa-commenting-o"
                                                        ></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </section>
                                <!-- 留言 - 块 - 结束 -->
                                <!-- 评论模态框 -->
                                <div :id="leaving.modal.id" class="modal">
                                    <div class="modal-content">
                                        <h6>回复</h6>
                                        <textarea
                                            rows="4"
                                            cols="25"
                                            class="comment_textarea"
                                            :placeholder="
                                                '回复【' +
                                                    leaving.modal.name +
                                                    '】'
                                            "
                                            v-model="leaving.modal.content"
                                        ></textarea>
                                        <input
                                            type="hidden"
                                            :v-model="leaving.modal.by_reply_id"
                                            :value="leaving.modal.by_reply_id"
                                        />
                                    </div>
                                    <div class="modal-footer">
                                        <button
                                            class="modal-action modal-close waves-effect waves-green btn-flat"
                                            @click="Get_Replyleving()"
                                        >
                                            评论
                                        </button>
                                    </div>
                                </div>
                                <!-- 发表评论-->
                                <div class="comment">
                                    <div class="comment_title">发表评论</div>
                                    <div class="row">
                                        <div
                                            class="input-field col s12 comment_hugx"
                                        >
                                            <textarea
                                                rows="4"
                                                cols="25"
                                                class="comment_textarea Ocomment_textarea"
                                                placeholder="请发布留言..."
                                                v-model="leaving.content"
                                            ></textarea>
                                        </div>
                                        <div class="input-field col s12">
                                            <button
                                                class="btn waves-effect waves-light col s12 blue"
                                                type="submit"
                                                @click="Get_leving()"
                                            >
                                                发表评论
                                                <i
                                                    class="fa fa-commenting right"
                                                ></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <!-- 发表评论-结束 -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 右 -->
            <right-hugx></right-hugx>
        </div>
        <!-- 脚注 -->
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
    name: 'leaving',
    components: {
        "header-hugx": header_hugx,
        "footer-hugx": footer_hugx,
        "right-hugx": right_hugx
    },
    data() {
        return {
            api: this.$store.store.state.api,
            // 留言
            leaving: {
                // 留言
                data: [],
                // 回复
                reply: [],
                // 模态框属性
                modal: {
                    id: '',                                                     // 评论ID
                    by_reply_id: '',                                            // 被回复的用户ID
                    name: '',                                                   // 被回复的用户名
                    content: '',                                                // 回复内容
                },
                content: '',
            },
            // 获取用户ID
            Uid: sessionStorage.getItem("user_id"),
        }
    },
    methods: {

        // 获取留言信息
        Get_levingData() {
            axios
                .post(`${this.api}/leaving_data`)
                .then(res => {
                    // console.log(res.data)
                    if (res.data.return_code === '500') return
                    // 将获取的数据分布式装入
                    this.leaving.data = res.data.leaving
                    this.leaving.reply = res.data.reply

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
            this.leaving.modal.id = Cid
            this.leaving.modal.name = name
            this.leaving.modal.by_reply_id = Pid
        },
        // 点击 - 弹出模态框
        Get_DynamicCoclick() { $('.modal').modal('open') },

        // 留言
        Get_leving() {
            const data = qs.stringify({
                user_id: this.Uid,
                content: this.leaving.content,
            })
            axios
                .post(`${this.api}/leaving`, data)
                .then(res => {
                    console.log(res.data)
                    alert(res.data.return_str)
                    if (res.data.return_code === '500') return
                    // 留言成功发送请求重新渲染
                    this.Get_levingData()
                    // 清空留言框
                    this.leaving.content = ''
                })
                .catch(err => { console.log(err) })
        },

        // 回复留言
        Get_Replyleving() {
            const data = qs.stringify({
                user_id: this.Uid,
                content: this.leaving.modal.content,
                pid: this.leaving.modal.id,
                by_reply_id: this.leaving.modal.by_reply_id,
            })
            axios
                .post(`${this.api}/Reply_leaving`, data)
                .then(res => {
                    alert(res.data.return_str)
                    if (res.data.return_code === '500') return
                    // 留言成功发送请求重新渲染
                    this.Get_levingData()
                    // 清空留言回复框
                    this.leaving.modal.content = ''
                })
                .catch(err => { console.log(err) })

        },

    },
    // 加载动画UI
    beforeCreate() {
        this.$myLoading.open()
        setTimeout(() => {
            this.$myLoading.hide()
        }, 500)
    },
    mounted() {

        $(document).ready(function () {
            $(".button-collapse").sideNav();
            $('.modal').modal();
            $('.materialboxed').materialbox();
        })

        // 获取留言数据
        this.Get_levingData()

    },
}

</script>


<style scoped>
@import "../../static/css/private/article.css";
@import "../../static/css/private/leaving.css";

.aryicle_main {
    min-height: 90vh;
    height: auto;
}
.comment {
    margin: 15px 0;
}
.leaving_row {
    border-top: 1px solid #e9e9e9;
    padding: 10px 0;
}
</style>

