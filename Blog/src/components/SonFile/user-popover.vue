
 <!-- 用户弹出框 - assembly -->
<template>
    <div
        class="user-popover"
        v-if="popover.show && popover.key === skey"
        :data-key="skey"
        @mouseenter="Get_ThroughInformation(skey)"
        @mouseleave="Open_Information()"
    >
        <!-- 用户头像 - 用户名 -->
        <section class="user-row">
            <!-- 头像 -->
            <div class="user-data-img">
                <img :src="user.head_portrait" height="50" />
            </div>
            <!-- 用户信息 -->
            <div class="user-data">
                <span>{{ user.username }}</span>
                <p :title="user.user_personal_description">{{ user.user_personal_description }}</p>
            </div>
        </section>
        <!-- 用户交互信息 -->
        <section class="user-interactive-data">
            <ul>
                <li>
                    <span>{{ user.article }}</span>
                    <p>文章</p>
                </li>
                <li>
                    <span>{{ user.thumbs }}</span>
                    <p>点赞</p>
                </li>
                <li>
                    <a :href="'/User_space?user_id='+Open_UserId" target="_blank">访问用户</a>
                </li>
            </ul>
        </section>
    </div>
</template>


<script>
import axios from "axios";
import qs from "qs";

export default {
    name: 'popover',
    data() {
        return {
            // 用户信息存放点
            user: {},
            api: this.$store.store.state.api,
        }
    },
    props: ['popover', 'skey'],
    methods: {
        // 鼠标经过显示用户信息
        Get_ThroughInformation(key) {
            // 鼠标移入弹出框 清空key
            let popover = document.querySelectorAll('.user-popover')
            for (let i in popover) {
                if (popover[i].dataset !== undefined) {
                    if (popover[i].dataset.key === key)
                        popover[i].dataset.key = ''
                }
            }
            // 显示
            this.popover.show = true
        },

        // 鼠标移出关闭弹出框
        Open_Information() {
            setTimeout(() => {
                this.popover.show = false
            }, 300)
        },

        // 获取用户信息
        Get_UserData(id) {
            const data = qs.stringify({ Uid: id })
            axios
                .post(`${this.api}/Obtain_UserData`, data)
                .then(res => {
                    // console.log(res.data)
                    if (res.data.return_code === '500') return
                    // 获取成功
                    this.user = res.data.return_obj
                })
                .catch(err => { console.log(err) })

        },

    },
    watch: {
        popover: {
            show(newValue) { return this.popover.show = newValue },
            key(newValue) { return this.popover.key = newValue },
            Uid(newValue) {
                return this.popover.Uid = newValue
            },
        }
    },
    computed: {
        // 监听用户ID变化 - 获取用户信息
        Open_UserId(){
            // console.log(this.popover.Uid)
            this.Get_UserData(this.popover.Uid)
            return this.popover.Uid
        }
    },
    mounted() {

    },
}
</script>

<style scoped>
/* 弹出框主题 */
.user-popover {
    position: absolute;
    left: -75px;
    top: -155px;
    width: 260px;
    height: 160px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 2px 2px 3px #c0bdbd;
    padding: 15px;
    box-sizing: border-box;
    z-index: 9999;
    opacity: 1;
    animation: popo 0.2s;
}
/* 下标 */
.user-popover::before {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translate(-50%);
    border-left: 10px solid transparent;
    border-top: 10px solid #f0f0f5;
    /* border-bottom: 10px solid transparent; */
    border-right: 10px solid transparent;
}
/* top */
.user-row {
    display: flex;
    height: 50%;
}

.user-data-img {
    width: 30%;
}

.user-data-img > img {
    border-radius: 50%;
}

.user-data > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.8rem;
    color: #666;
    width: 7rem;
}
/* bootom */
.user-interactive-data {
    height: 50%;
}

.user-interactive-data > ul {
    display: flex;
}

.user-interactive-data > ul > li {
    width: 30%;
    list-style: none;
}

.user-interactive-data > ul > li > span {
    color: #2c2c2c;
    font-family: "黑体";
}

.user-interactive-data > ul > li > p {
    color: #666;
    font-size: 0.8rem;
}

.user-interactive-data > ul > li:nth-of-type(3) {
    width: 36%;
    padding-top: 10px;
    box-sizing: border-box;
}

.user-interactive-data > ul > li:nth-of-type(3) > a {
    padding: 5px;
    border-radius: 2px;
    border: 1px solid #2196f3;
    text-decoration: none;
    color: #2196f3;
}

/* 动画显示 */
@keyframes popo {
    0% {
        opacity: 0;
    }
    10% {
        opacity: 0.1;
    }
    20% {
        opacity: 0.2;
    }
    30% {
        opacity: 0.3;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
}
</style>
