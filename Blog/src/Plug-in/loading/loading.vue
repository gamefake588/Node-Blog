
<template>
    <div class="custom-loading" v-if="show">
        <div class="custom-loading-Mask"></div>
        <div class="custom-loading-box">
            <div class="custom-loading-content">
                <img :src="icon" />
                <span>{{ text }}</span>
                <em :style="{ borderLeftColor: progressColor }"></em>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'loading',
    data() {
        return {
            icon: require('../../assets/logo.png'),
            show: false,
            text: '加载中...',
            progressColor: '#ff0000',
        }
    },
}

</script>


<style scoped>
.custom-loading {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 9999999999;
    display: flex;
    justify-content: center;
    align-items: center;
}
.custom-loading-Mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
}
.custom-loading-box {
    width: 138px;
    height: 138px;
    border-radius: 6px;
    background: #fff;
    position: relative;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
}
.custom-loading-content {
    width: 106px;
    height: 106px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    border: 3px solid #eee;
    position: relative;
}
.custom-loading-content:after {
}
@-webkit-keyframes haha1 {
    0% {
        -webkit-transform: rotate(0deg);
    }
    25% {
        -webkit-transform: rotate(90deg);
    }
    50% {
        -webkit-transform: rotate(180deg);
    }
    75% {
        -webkit-transform: rotate(270deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
    }
}

.custom-loading-content img {
    width: 30px;
    height: 30px;
    margin-bottom: 20px;
    border-radius: 50%;
}
.custom-loading-content span {
    width: 100%;
    text-align: center;
    font-size: 12px;
}
.custom-loading-content em {
    position: absolute;
    width: 100px;
    height: 100px;
    top: -3px;
    /* left: -3px; */
    border: 3px solid transparent;
    border-left: 3px solid;
    border-radius: 50%;
    box-sizing: content-box;
    -webkit-animation: haha1 1s infinite linear;
    animation: haha1 1s infinite linear;
}
</style>


