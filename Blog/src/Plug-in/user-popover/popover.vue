

<template>
    <div class="user-popover" v-if="user.show">
        <!-- 用户头像 - 用户名 -->
        <section class="user-row">
            <!-- 头像 -->
            <div class="user-data-img">
                <img
                    :src="user.img"
                    height="50"
                />
            </div>
            <!-- 用户信息 -->
            <div class="user-data">
                <span>{{user.name}}</span>
                <p>{{user.describe}}</p>
            </div>
        </section>
        <!-- 用户交互信息 -->
        <section class="user-interactive-data">
            <ul>
                <li>
                    <span>{{user.article}}</span>
                    <p>文章</p>
                </li>
                <li>
                    <span>{{user.thumbs}}</span>
                    <p>点赞</p>
                </li>
                <li>
                    <a :href="user.id" target="_blank">访问用户</a>
                </li>
            </ul>
        </section>
    </div>
</template>


<script>
export default {
    name: 'popover',
    data() {
        return {
            user: {
                show: false,
                img: '',                                                    // 头像
                name: '',                                                   // 名称
                describe: '',                                               // 描述
                article: '',                                                // 发布文章数
                thumbs: '',                                                 // 点赞数
                id: '',                                                     // ID
            },
        }
    },
}
</script>

<style scoped>
/* 弹出框主题 */
.user-popover {
    position: absolute;
    left: 10%;
    top: 10%;
    width: 260px;
    height: 160px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 2px 2px 3px #c0bdbd;
    padding: 15px;
    box-sizing: border-box;
    z-index: 9999;
}
/* 下标 */
.user-popover::before {
    content: "";
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translate(-50%);
    border-left: 10px solid transparent;
    border-top: 10px solid #f5f5f5;
    border-bottom: 10px solid transparent;
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
    width: 5rem;
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
</style>
