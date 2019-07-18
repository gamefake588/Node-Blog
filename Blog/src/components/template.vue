<template>
  <div class="template">
    <!-- 导航 -->
    <header-hugx></header-hugx>
    <!-- 文章内容 -->
    <div class="aryicle_main">
      <!-- 左 -->
      <div class="aryicle_left">
        <!-- 左边-标题 -->
        <div class="aryicle_left_title">
          <ul id="tabs">
            <li class="left a-key">模板</li>
            <li class="right tab">
              <a href="#test3">商城模板</a>
            </li>
            <li class="right tab">
              <a href="#test2">社区类模板</a>
            </li>
            <li class="right tab">
              <a href="#test1" class="active">个人博客模板</a>
            </li>
          </ul>
        </div>
        <!-- 内容-块 -->
        <div class="aryicle_content">
          <div class="row" id="test1">
            <!-- 块 -->
            <div class="col s12 aryicle_content_block">
              <!-- 块-标题 -->
              <div class="block_title clear">
                <ul class="block_title_ul">
                  <li class="special_column">模板</li>
                  <li>
                    <a href>hacker</a>
                  </li>
                  <li>2019-01-01 18:05</li>
                  <li>
                    <a href>个人博客模板</a>
                  </li>
                </ul>
              </div>
              <!-- 块-显示内容 -->
              <div class="display_content">
                <a href>个人博客模板 1.0</a>
              </div>
              <!-- 块-显示图片 -->
              <div class="display_img">
                <img src="static/images/perte/qq2.png" height="100" class="materialboxed">
              </div>
              <!-- 块-用户交互 -->
              <div class="home_interactive">
                <a class="waves-effect waves-light btn mybtn">
                  <i class="fa fa-thumbs-up"></i>44
                </a>
                <a class="waves-effect waves-light btn mybtn">
                  <i class="fa fa-files-o"></i>3
                </a>
              </div>
            </div>
          </div>
          <!-- test2 -->
          <div class="row" id="test2">
            <!-- 块 -->
            <div class="col s12 aryicle_content_block">
              <!-- 块-标题 -->
              <div class="block_title clear">
                <ul class="block_title_ul">
                  <li class="special_column">模板</li>
                  <li>
                    <a href>hacker</a>
                  </li>
                  <li>2019-01-01 18:05</li>
                  <li>
                    <a href>社区类模板</a>
                  </li>
                </ul>
              </div>
              <!-- 块-显示内容 -->
              <div class="display_content">
                <a href>简单大气社区模板 1.0</a>
              </div>
              <!-- 块-显示图片 -->
              <div class="display_img">
                <img src="static/images/perte/qq1.png" height="100" class="materialboxed">
              </div>
              <!-- 块-用户交互 -->
              <div class="home_interactive">
                <a class="waves-effect waves-light btn mybtn">
                  <i class="fa fa-thumbs-up"></i>44
                </a>
                <a class="waves-effect waves-light btn mybtn">
                  <i class="fa fa-files-o"></i>3
                </a>
              </div>
            </div>
          </div>
          <!-- test3 -->
          <div class="row" id="test3">
            <!-- 块 -->
            <div class="col s12 aryicle_content_block">
              <!-- 块-标题 -->
              <div class="block_title clear">
                <ul class="block_title_ul">
                  <li class="special_column">模板</li>
                  <li>
                    <a href>hacker</a>
                  </li>
                  <li>2019-01-01 18:05</li>
                  <li>
                    <a href>商城模板</a>
                  </li>
                </ul>
              </div>
              <!-- 块-显示内容 -->
              <div class="display_content">
                <a href>简介商城模板 1.0</a>
              </div>
              <!-- 块-显示图片 -->
              <div class="display_img">
                <img src="static/images/perte/qq3.png" height="100" class="materialboxed">
              </div>
              <!-- 块-用户交互 -->
              <div class="home_interactive">
                <a class="waves-effect waves-light btn mybtn">
                  <i class="fa fa-thumbs-up"></i>44
                </a>
                <a class="waves-effect waves-light btn mybtn">
                  <i class="fa fa-files-o"></i>3
                </a>
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

export default {
  name: "templateT",
  components: {
    "header-hugx": header_hugx,
    "footer-hugx": footer_hugx,
    "right-hugx": right_hugx,
  },
  // 加载动画UI
    beforeCreate() {
        this.$myLoading.open()
        setTimeout(() => {
            this.$myLoading.hide()
        }, 300)
    },
  mounted() {
      $(document).ready(function () {
        $(".button-collapse").sideNav();
        $('.modal').modal();
        $('.materialboxed').materialbox();
        $('ul#tabs').tabs();
    });
  }
};
</script>


<style scoped>
@import "../../static/css/private/template.css";

.aryicle_main {
    min-height: 90vh;
    height: auto;
}
</style>


