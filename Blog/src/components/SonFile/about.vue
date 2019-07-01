
<template>
    <div class="about">
        <header-hugx></header-hugx>
        <div class="aryicle_main">
            <!-- 个人简介 -->
            <section class="home-brief">
                个人简介
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
}
</style>

