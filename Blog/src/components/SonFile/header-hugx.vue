<template>
    <div class="header">
        <!-- 导航 -->
        <nav id="top">
            <div class="nav-wrapper">
                <a
                    href="#"
                    data-activates="mobile-demo"
                    class="button-collapse"
                >
                    <i class="material-icons">menu</i>
                </a>
                <ul id="nav-mobile" class="left hide-on-med-and-down">
                    <li>
                        <router-link to="/" class="logo_s">
                            <img src="static/images/logo.png" height="30" />
                        </router-link>
                    </li>
                    <li :class="{ active: path === '/' }">
                        <router-link to="/">首页</router-link>
                    </li>
                    <li :class="{ active: path === '/template' }">
                        <router-link to="/template">模板</router-link>
                    </li>
                    <li :class="{ active: path === '/leaving' }">
                        <router-link to="/leaving">留言板</router-link>
                    </li>
                    <li :class="{ active: path === '/about' }">
                        <router-link to="/about">关于</router-link>
                    </li>
                </ul>
                <ul class="right">
                    <li class="user_nm">
                        <router-link to="/login">
                            <i class="fa fa-user"></i>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/article_release">
                            <i class="fa fa-edit"></i>
                        </router-link>
                    </li>
                    <li>
                        <router-link to class="search">
                            <i class="fa fa-search"></i>
                        </router-link>
                    </li>
                </ul>
                <ul class="side-nav" id="mobile-demo">
                    <li :class="{ active: path === '/' }">
                        <router-link to="/">首页</router-link>
                    </li>
                    <li :class="{ active: path === '/template' }">
                        <router-link to="/template">模板</router-link>
                    </li>
                    <li :class="{ active: path === '/leaving' }">
                        <router-link to="/leaving">留言板</router-link>
                    </li>
                    <li :class="{ active: path === '/about' }">
                        <router-link to="/about">关于</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
    name: "headerT",
    components: {},
    data() {
        return {
            path: ""
        };
    },
    methods: {
        Stlogoff() {
            console.log("1");
            let url = "http://localhost:3000/Api/login";
            let data = qs.stringify({
                name: "user_to_save",
                pass: "sessionCode"
            });
            axios
                .post(url, data)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        switch (this.$route.path) {
            case "/":
                this.path = this.$route.path;
                break;

            case "/template":
                this.path = this.$route.path;
                break;

            case "/leaving":
                this.path = this.$route.path;
                break;

            case "/about":
                this.path = this.$route.path;
                break;

            default:
                this.path = null;
        }

        // 用户登录信息判断
        let sessionCode = sessionStorage.getItem("email");
        let user_nm = document.querySelector(".user_nm");
        // 判断用户保存登陆信息
        if (sessionCode !== null) {
            user_nm.innerHTML = ``;
            let url = "http://localhost:3000/Api/automatic_login";
            let user_type = qs.stringify({
                id: sessionCode
            });

            axios
                .post(url, user_type)
                .then(res => {
                    if (res.data.return_code === "200") {
                        user_nm.innerHTML = `
                          <a  class="logo_s">
                              <img src="${
                            res.data.head_portrait
                            }" height="40" class="user_head head_img">
                              <div class="user_s_ul">
                                  <ul>
                                      <li><a href="/personal/personal_center">个人中心</a><input type="hidden" id="userID" value="${
                            res.data.ID
                            }"></li>
                                      <li class="logoff"><a href="javascript:">注销用户</a></li>
                                  </ul>
                              </div>
                          </a>
                        `;
                        // 注销用户操作
                        const logoff = document.querySelector(".logoff");
                        logoff.onclick = () => {
                            const off = confirm("确认退出当前账户吗？");
                            if (off) {
                                const set = Set_logoff();
                                // 注销成功 操作
                                if (set) {
                                    user_nm.innerHTML = `<a href="/login"><i class="fa fa-user"></i></a>`;
                                    alert("注销成功");
                                    // 刷新页面
                                    location.reload()
                                } else alert("注销失败，请稍后重试");
                            }
                        };
                        // 异步 - 调用注销方法
                        async function Set_logoff() {
                            // 注销方法
                            const Set_logoffCookie = (email) => {
                                let date = new Date();
                                date.setTime(date.getTime() - 10000);
                                // 删除cookie
                                const cookie = (document.cookie =
                                    `email=${email}; expires=` + date.toGMTString());
                                // 清空session
                                const session = sessionStorage.clear();
                                if (cookie && session) return true;
                                return false;
                            };
                            await Set_logoffCookie(res.data.email);
                        }
                    }
                    if (res.data.return_code === "500") {
                        console.log(res.data.return_str);
                        user_nm.innerHTML = `<a href="/login"><i class="fa fa-user"></i></a>`;
                    }
                })
                .catch(err => {
                    console.log(err);
                    user_nm.innerHTML = `<a href="/login"><i class="fa fa-user"></i></a>`;
                });
        } else {
            user_nm.innerHTML = `<a href="/login"><i class="fa fa-user"></i></a>`;
        }
        // console.log(sessionCode);
    }
};
</script>


<style scoped>
</style>
