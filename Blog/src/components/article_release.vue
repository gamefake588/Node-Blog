<template>
    <div class="article_release">
        <!-- 导航 -->
        <header-hugx></header-hugx>
        <!-- 发布内容 -->
        <div class="aryicle_main">
            <!-- 左 -->
            <div class="aryicle_left">
                <div class="user_main article_release">
                    <div class="row">
                        <div class="input-field col s12 article_input">
                            <!-- 标签 -->
                            <select v-model="label.Default">
                                <option
                                    v-for="value in label.values"
                                    :value="value.name"
                                    >{{ value.name }}</option
                                >
                            </select>
                            <!-- 标题 -->
                            <input
                                type="text"
                                id="article_title"
                                placeholder="标题：放牛班的春天"
                                v-model="title"
                            />
                        </div>
                        <div class="input-field col s12 article_input">
                            <!-- 内容 -->
                            <section class="articleContent">
                                <div id="editor"></div>
                            </section>
                        </div>
                        <div class="input-field col s12">
                            <button
                                class="btn waves-effect waves-light col s12 blue"
                                type="submit"
                                name="register"
                                id="switch_register"
                                @click="Publish_articles()"
                            >
                                发布
                                <i class="fa fa-cloud right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 脚注 -->
        <footer-hugx></footer-hugx>
    </div>
</template>

<script>
import header_hugx from "./SonFile/header-hugx";
import footer_hugx from "./SonFile/footer-hugx";
import WangEditor from "wangeditor";
import axios from "axios";
import qs from "qs";

export default {
    name: "articleRelease",
    components: {
        "header-hugx": header_hugx,
        "footer-hugx": footer_hugx
    },
    data() {
        return {
            // 标签
            label: {
                Default: "摸鱼",
                values: [
                    { name: "摸鱼" },
                    { name: "开源" },
                    { name: "Vue" },
                    { name: "Js" },
                    { name: "JQ" },
                    { name: "H5" },
                    { name: "React" },
                    { name: "Node" }
                ]
            },
            // 文章标题
            title: "",
            // 文章内容
            content: "",
            api: this.$store.store.state.api,
        };
    },
    methods: {
        // 发布文章
        Publish_articles() {
            // 获取数据
            const article = {
                email: sessionStorage.getItem("email"),
                label: this.label.Default,
                title: this.title,
                content: this.content
            };
            // 转换数据格式
            const article_data = qs.stringify({
                email: article.email,
                label: article.label,
                title: article.title,
                content: article.content
            });

            const url = `${this.api}/article`
            axios
                .post(url, article_data)
                .then(res => {
                    console.log(res.data)
                    alert(res.data.return_str)
                    if (res.data.return_code === "200") {
                        // 返回首页面
                        this.$router.push({ path: "/" })
                    }

                    if (res.data.return_code === "500") { }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        let _this = this;
        this.editor = new WangEditor("#editor"); //这个地方传入div元素的id 需要加#号
        // 配置 change 事件
        this.editor.change = function () {
            // 编辑区域内容变化时，实时打印出当前内容
            // console.log(this.txt.html());
            _this.content = this.txt.html();
        };
        // 配置菜单
        this.editor.customConfig.menus = [
            "head",
            "bold",
            "italic",
            "underline",
            "image",
            "table",
            "list",
            "link",
            "foreColor",
            "code",
            "emoticon",
            "fontName"
        ];
        // 图片
        this.editor.customConfig.uploadImgServer =
            `${this.api}/uploadImg`;
        this.editor.customConfig.uploadImgMaxLength = 5;
        this.editor.customConfig.uploadFileName = "ArticleImg";
        //图片在编辑器中回显
        this.editor.customConfig.uploadImgHooks = {
            error: function (xhr, editor) {
                alert("2：" + xhr + "请查看你的json格式是否正确，图片并没有上传");
                // 图片上传出错时触发  如果是这块报错 就说明文件没有上传上去，直接看自己的json信息。是否正确
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
            fail: function (xhr, editor, result) {
                //  如果在这出现的错误 就说明图片上传成功了 但是没有回显在编辑器中，我在这做的是在原有的json 中添加了
                //  一个url的key（参数）这个参数在 customInsert也用到
                //
                alert(
                    "1：" + xhr + "请查看你的json格式是否正确，图片上传了，但是并没有回显"
                );
            },
            success: function (xhr, editor, result) {
                //成功 不需要alert 当然你可以使用console.log 查看自己的成功json情况
                // console.log(result)
                // insertImg('https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png')
            },
            customInsert: function (insertImg, result, editor) {
                //console.log(result);
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                insertImg(result.url);
            }
        };
        this.editor.customConfig.showLinkImg = true; //是否开启网络图片，默认开启的。
        this.editor.create(); // 生成编辑器
        // 自定义样式
        let w_container = document.querySelector(".w-e-text-container");
        let w_toolbar = document.querySelector(".w-e-toolbar");
        w_container.style.height = "93%";
        w_toolbar.style.height = "7%";
    }
};
</script>


<style scoped>
@import "../../static/css/private/article.css";
@import "../../static/css/private/personal_center.css";
@import "../../static/css/private/article_release.css";
</style>


