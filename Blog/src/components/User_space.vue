
<template>
    <div class="User-Space">
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
        <!-- 导航 -->
        <header-hugx></header-hugx>
        <!-- 用户信息 -->
        <!--   作者头像及背景图 -头部  -->
        <div class="personal_in_top">
            <div class="personal_top_img">
                <!-- 头像 -->
                <img :src="user.basic.head_portrait" class="head_img" />
                <!-- 用户姓名 -->
                <span class="personal_top_username">
                    <h5>{{ user.basic.username }}</h5>
                </span>
                <!-- 用户介绍 -->
                <span class="personal_top_brief">
                    {{ user.basic.user_personal_description }}
                </span>
            </div>
        </div>
        <!--   作者头像及背景图 -头部 - end  -->
        <!-- 个人内容 -->
        <div class="aryicle_main">
            <!-- 左 -->
            <div class="aryicle_left">
                <div class="user_main data_main">
                    <!-- 用户资料-4块-->
                    <div class="row">
                        <div class="col s12">
                            <ul class="tabs">
                                <!-- 用户资料-1-->
                                <li class="tab col s3">
                                    <a class="active" href="#data_block"
                                        >资料</a
                                    >
                                </li>
                                <!-- 用户资料-2-->
                                <li
                                    class="tab col s3"
                                    @click="Get_interactive('文章')"
                                >
                                    <a href="#article_block">文章</a>
                                </li>
                                <!-- 用户资料-4-->
                                <li
                                    class="tab col s3"
                                    @click="Get_interactive('评论')"
                                >
                                    <a href="#comment_block">评论</a>
                                </li>
                                <!-- 用户资料-5-->
                                <li class="tab col s3">
                                    <a href="#set_up">个人设置</a>
                                </li>
                            </ul>
                        </div>
                        <!-- 用户资料-1显示 -->
                        <div class="data_block" id="data_block">
                            <!-- 用户登陆信息显示 -->
                            <div class="landing_information">
                                <!-- 用户登陆信息显示-头像 -->
                                <div class="landing_information_img">
                                    <img :src="user.basic.head_portrait" />
                                </div>
                                <!-- 用户登陆信息显示-用户名.. -->
                                <div class="landing_information_user">
                                    <span class="landing_username">
                                        {{ user.basic.username }}
                                    </span>
                                    <p>
                                        加入时间 :
                                        {{ user.basic.register_time }}
                                    </p>
                                    <p>登陆时间 : {{ user.basic.user_time }}</p>
                                </div>
                                <!-- 基本信息 -->
                                <div class="essential_information">
                                    <h5>基本信息</h5>
                                    <div class="row">
                                        <!-- 基本信息-行 -->
                                        <div class="col s2 e_name">昵称</div>
                                        <div class="col s10">
                                            {{ user.basic.username }}
                                        </div>
                                        <!-- 基本信息-行 -->
                                        <div class="col s2 e_name">网站</div>
                                        <div class="col s10">
                                            <a
                                                :href="user.basic.user_website"
                                                target="_blank"
                                            >
                                                {{ user.basic.user_website }}
                                            </a>
                                        </div>
                                        <!-- 基本信息-行 -->
                                        <div class="col s2 e_name">
                                            个人描述
                                        </div>
                                        <div class="col s10">
                                            {{
                                                user.basic
                                                    .user_personal_description
                                            }}
                                        </div>
                                        <div
                                            class="col s12"
                                            style="margin-top: 5%;"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 用户资料-2显示 -->
                        <div class="article_block" id="article_block">
                            <!-- 用户发布过的文章显示 -->
                            <div class="article_user row">
                                <!-- 块 -->
                                <div
                                    class="col s12 aryicle_content_block"
                                    v-for="article in user.interactive"
                                >
                                    <!-- 块-标题 -->
                                    <div class="block_title clear">
                                        <ul class="block_title_ul">
                                            <li class="special_column">专栏</li>
                                            <li>
                                                <a href="javascript:">{{
                                                    article.article_username
                                                }}</a>
                                            </li>
                                            <li>{{ article.article_date }}</li>
                                            <li>
                                                <a href="javascript:">{{
                                                    article.article_label
                                                }}</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <!-- 块-显示内容 -->
                                    <div class="display_content">
                                        <a
                                            href="javascript:"
                                            @click="
                                                Get_JumpArticle(
                                                    article.article_id
                                                )
                                            "
                                        >
                                            {{ article.article_title }}
                                        </a>
                                    </div>
                                    <!-- 块-用户交互 -->
                                    <div class="home_interactive">
                                        <a
                                            class="waves-effect waves-light btn mybtn"
                                            ><i class="fa fa-thumbs-up"></i
                                            >{{ article.article_thumbs }}</a
                                        >
                                        <a
                                            class="waves-effect waves-light btn mybtn"
                                            ><i class="fa fa-eye"></i
                                            >{{ article.article_browse }}</a
                                        >
                                    </div>
                                </div>
                                <!-- 块-结束 -->
                            </div>
                        </div>
                        <!-- 用户资料-2 - end -->
                        <!-- 用户资料-4显示 -->
                        <div class="comment_block" id="comment_block">
                            <!-- 用户评论 -->
                            <div class="personal_comment">
                                <div class="personal_comment_block row">
                                    <!-- 用户评论-小块 -->
                                    <div
                                        class="col s12 personal_comment_cat"
                                        v-for="comm in user.interactive"
                                    >
                                        <div>
                                            <span class="col">
                                                {{ comm.article_comm_time }}
                                            </span>
                                            评论
                                            <span>
                                                <a
                                                    href="javascript:"
                                                    @click="
                                                        Get_JumpArticle(
                                                            comm.article_id
                                                        )
                                                    "
                                                >
                                                    {{
                                                        comm.article_comm_content
                                                    }}
                                                </a>
                                            </span>
                                        </div>
                                        <!-- 用户评论-图像及评论内容 -->
                                        <div class="comment_img_content">
                                            <span class="comment_img col s1">
                                                <img
                                                    :src="comm.head_portrait"
                                                />
                                            </span>
                                            <span
                                                class="comment_content col s10"
                                            >
                                                {{ comm.article_comm_content }}
                                            </span>
                                        </div>
                                    </div>
                                    <!-- 用户评论-小块结束 -->
                                </div>
                            </div>
                        </div>
                        <!-- 用户资料-4 - end -->
                        <!-- 用户登陆信息设置 -->
                        <div class="set_up" id="set_up">
                            <!-- 个人资料 -->
                            <section v-if="user.basic.ID === user_id">
                                <div class="row">
                                    <h5>个人资料</h5>
                                    <!-- 分类 -->
                                    <div class="col s12 set_up_block">
                                        <div class="col s2">头像</div>
                                        <div class="col s10 set_up_potion">
                                            <img
                                                :src="user.basic.head_portrait"
                                                class="user_p_heard"
                                                id="avatar_img"
                                            />
                                            <input
                                                type="file"
                                                id="avatar_file"
                                                name="hear_portrait"
                                                accept="image/*"
                                                @change="Get_File"
                                            />
                                            <span class="head_portrait">
                                                点击图片更改 在点击上传-建议
                                                jpg,png,gif格式的图片
                                                <p>
                                                    <button
                                                        class="btn waves-effect waves-light blue file_block"
                                                        @click="
                                                            Get_Uploadimage()
                                                        "
                                                    >
                                                        点击上传
                                                    </button>
                                                </p>
                                            </span>
                                        </div>
                                    </div>

                                    <div class="col s12 set_up_block">
                                        <div class="col s2">昵称</div>
                                        <div class="col s10">
                                            <input
                                                type="text"
                                                id="username"
                                                :placeholder="
                                                    user.basic.username
                                                "
                                                v-model="update.name"
                                            />
                                        </div>
                                    </div>
                                    <div class="col s12 set_up_block">
                                        <div class="col s2">网站</div>
                                        <div class="col s10">
                                            <input
                                                type="text"
                                                id="website"
                                                :placeholder="
                                                    user.basic.user_website
                                                "
                                                v-model="update.website"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        class="col s12 set_up_block"
                                        style="border-bottom:none;"
                                    >
                                        <div class="col s2">个人描述</div>
                                        <div class="col s10">
                                            <textarea
                                                rows="4"
                                                cols="25"
                                                class="comment_textarea"
                                                id="personal_description"
                                                :placeholder="
                                                    user.basic
                                                        .user_personal_description
                                                "
                                                v-model="
                                                    update.Personal_Description
                                                "
                                            ></textarea>
                                        </div>
                                        <button
                                            class="btn waves-effect waves-light blue"
                                            style="margin: 15px 0 0 10vw"
                                            @click="Get_PersonalData()"
                                        >
                                            保存修改
                                        </button>
                                    </div>
                                </div>
                                <!-- row - end -->
                                <!--  隐私设置  -->
                                <div class="row">
                                    <h5>隐私设置</h5>
                                    <!-- 分类 -->
                                    <div class="col s12 set_up_block">
                                        <div class="privacy_i">
                                            <i
                                                class="fa fa-unlock-alt"
                                                aria-hidden="true"
                                            ></i>
                                        </div>
                                        密码<br />
                                        <span class="privacy_span"
                                            >用于保护账号信息和登录安全</span
                                        >
                                        <div class="privacy_right right">
                                            <a href="#updatePass">修改</a>
                                            <!--  修改密码 - 模态框  -->
                                            <div
                                                id="updatePass"
                                                class="modal updatePass"
                                            >
                                                <div class="modal-content">
                                                    <h6>修改密码</h6>
                                                    <div
                                                        class="updatePass_form"
                                                    >
                                                        <div
                                                            class="updatePass_block"
                                                        >
                                                            <span
                                                                >输入原始密码：</span
                                                            ><input
                                                                type="password"
                                                                id="password"
                                                                placeholder="输入密码"
                                                                v-model="
                                                                    update.pass
                                                                "
                                                            />
                                                        </div>
                                                        <div
                                                            class="updatePass_block"
                                                        >
                                                            <span
                                                                >输入新密码：</span
                                                            ><input
                                                                type="password"
                                                                id="Newpassword"
                                                                placeholder="输入密码"
                                                                v-model="
                                                                    update.NewPassword
                                                                "
                                                            />
                                                        </div>
                                                        <div
                                                            class="updatePass_block"
                                                        >
                                                            <span
                                                                >确认新密码：</span
                                                            ><input
                                                                type="password"
                                                                id="Setpassword"
                                                                placeholder="再次输入密码"
                                                                v-model="
                                                                    update.AgaNewPassword
                                                                "
                                                            />
                                                        </div>
                                                        <div
                                                            class="updatePass_get"
                                                        >
                                                            <a
                                                                class="modal-action waves-effect waves-green btn-flat"
                                                                @click="
                                                                    Get_PersonalPass()
                                                                "
                                                                >确定</a
                                                            >
                                                            <a
                                                                href="#!"
                                                                class=" modal-action modal-close waves-effect waves-green btn-flat"
                                                                >取消</a
                                                            >
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--  修改密码 - 模态框 - 结束  -->
                                        </div>
                                    </div>
                                </div>
                                <!--  隐私设置 - 结束  -->
                            </section>
                            <!-- 非当前用户 -->
                            <div v-else style="padding:15vh 0; color: #666;text-align: center;">
                                <h4>非用户本人无法查看:(</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 用户登陆信息设置-结束 -->
            </div>
        </div>
        <!-- 用户信息 - end -->
        <!-- 脚注 -->
        <footer-hugx></footer-hugx>
    </div>
</template>


<script>
import header_hugx from "./SonFile/header-hugx";
import footer_hugx from "./SonFile/footer-hugx";
import axios from "axios";
import qs from "qs";

export default {
    name: 'User_space',
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
            // 用户信息
            user: {
                // 基本信息
                basic: {},
                // 用户发布的文章，点赞，评论
                interactive: [],
            },
            // 个人设置修改
            update: {
                name: '',
                website: '',
                Personal_Description: '',
                img: {},
                // 密码
                pass: '',
                NewPasswor: '',
                AgaNewPassword: '',
            },
            // 用户ID - Url参数
            Uid: this.$route.query.user_id,
            // 用户ID - session
            user_id: sessionStorage.getItem('user_id'),
            api: this.$store.store.state.api,
        }
    },
    methods: {

        // 获取用户信息
        Get_BasicData() {
            const data = qs.stringify({ user_id: this.Uid });
            axios
                .post(`${this.api}/basic_user`, data)
                .then(res => {
                    // console.log(res.data)
                    if (res.data.return_code === '500') return
                    // 存入自定义对象
                    this.user.basic = res.data.return_obj
                })
                .catch(err => { consloe.log(err) })

        },

        // 点击获取用户交互信息
        Get_interactive(type) {
            const data = qs.stringify({
                user_id: this.Uid,
                type: type
            })
            axios
                .post(`${this.api}/user_interactive`, data)
                .then(res => {
                    // console.log(res.data)
                    if (res.data.return_code === '500') return
                    // 获取成功装入自定义数组
                    this.user.interactive = res.data.return_list
                })
                .catch(err => { console.log(err) })
        },

        // 文章页面跳转
        Get_JumpArticle(id) {
            this.$router.push({
                path: `/details`,
                name: "details",
                query: { article_id: id },
            })
        },

        // 获取用户头像图片
        Get_File(e) {
            // 将图片信息放入自定义对象
            this.update.img = e.target.files[0]
            // 读取文件URL
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            // 阅读文件完成后触发的事件
            reader.onload = function () {
                // 读取的URL结果：this.result
                $("#avatar_img").attr("src", this.result);
            }
        },

        // 上传图像
        Get_Uploadimage() {
            // 文件上传表单
            let data = new FormData();
            data.append("Uid", this.Uid);
            data.append("head_portrait", this.update.img);
            // axios文件请求头
            let configs = { headers: { 'Content-Type': 'multipart/form-data' } };
            axios
                .post(`${this.api}/Settings_img`, data)
                .then(res => {
                    // console.log(res.data)
                    alert(res.data.return_str)
                    // 修改成功
                    if (res.data.return_code === '200') this.Get_BasicData()
                })
                .catch(err => { console.log(err) })
        },

        // 修改个人资料
        Get_PersonalData() {
            // 判断是否为空
            if (['', null].includes(this.update.name)) {
                alert('昵称不能为空')
                return
            }
            if (this.update.name.length <= 2) {
                alert('昵称长度不能小于两位')
                return
            }
            const data = qs.stringify({
                Uid: this.Uid,
                name: this.update.name,
                website: this.update.website,
                Personal_Description: this.update.Personal_Description,
            })
            // 提交修改
            axios
                .post(`${this.api}/update_PersonalData`, data)
                .then(res => {
                    // console.log(res.data)
                    alert(res.data.return_str)
                    if (res.data.return_code === '500') return
                    // 修改成功
                    this.Get_BasicData()
                })
                .catch(err => { console.log(err) })
        },

        // 修改个人密码
        Get_PersonalPass() {
            let arr = ['', null]
            // 判断
            switch (true) {
                case arr.includes(this.update.pass):
                    alert('请输入密码')
                    break;
                case arr.includes(this.update.NewPassword):
                    alert('请输入新密码')
                    break;
                case (this.update.NewPassword.length < 6):
                    alert('密码长度必须大于6位')
                    break;
                case arr.includes(this.update.AgaNewPassword):
                    alert('请再次输入新密码')
                    break;
                case this.update.NewPassword !== this.update.AgaNewPassword:
                    alert('两次密码输入不一致')
                    break;
                default:
                    // 提交格式转换
                    const data = qs.stringify({
                        Uid: this.Uid,
                        pass: this.update.pass,
                        NewPassword: this.update.NewPassword,
                        AgaNewPassword: this.update.AgaNewPassword,
                    })
                    // 提交数据
                    axios
                        .post(`${this.api}/AgaNewPassword`, data)
                        .then(res => {
                            // console.log(res.data);
                            alert(res.data.return_str)
                            if (res.data.return_code === '500') return
                            // 修改成功
                            alert('请重新登陆')
                            // 清空session - 用户重新使用新密码登陆
                            sessionStorage.clear();
                            window.location.reload()
                        })
                        .catch(err => { console.log(err) })
            }

        },

    },
    mounted() {

        // cat
        setTimeout(() => {
            $(document).ready(function () {
                $(".button-collapse").sideNav();
                $('.modal').modal();
                $('.materialboxed').materialbox();
                $("ul.tabs").tabs();
            });
        }, 100)
        // 头像预览
        $("#avatar_file").change(function () {
            // 获取上传文件对象
            var file = $(this)[0].files[0];
            // 读取文件URL
            var reader = new FileReader();
            reader.readAsDataURL(file);
            // 阅读文件完成后触发的事件
            reader.onload = function () {
                // 读取的URL结果：this.result
                $("#avatar_img").attr("src", this.result);
            }
        });

        // 获取用户基本信息
        this.Get_BasicData()

    },
}
</script>


<style scoped>
@import "../../static/css/private/personal_center.css";

.landing_information_user > p {
    margin: 13.5px 0;
}
</style>
