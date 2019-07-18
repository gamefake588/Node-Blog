

$(document).ready(function () {
    // 搜索框
    $('.search').click(function () {
        $('.search_box').fadeIn();
    })
    $('.search_of').click(function () {
        $('.search_box').fadeOut();
    })
});
//上下标
$(document).scroll(function () {
    var scroH = $(document).scrollTop();  //滚动高度
    var viewH = $(window).height();  //可见高度
    var contentH = $(document).height();  //内容高度

    if (scroH < 100) {  //距离顶部小于100px时
        $('.top_bottom').slideUp(600)
    }
    if (scroH > 100) {  //距离顶部大于100px时
        $('.top_bottom').slideDown(600)
    }
});

//获取get值
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
$('.search').click(function () {
    $('.search_box').fadeIn();
})
$('.search_of').click(function () {
    $('.search_box').fadeOut();
})



/**
 * 鼠标点击动画
 */
const body = document.body

// 随机颜色数组
const randomColor = ['#0c084c','#f09c67','#454d66','#f18c8e','#b0deff','#c72c41','#ffa323','#a9eec2','#002f35','#f3c1c6']
// 随机单词
const randomWord = ['暴富','变帅','变胖','变美','长高10CM','心想事成']

body.onclick = () => {

    // 获取鼠标点击的横向坐标和纵向坐标
    let e = event || window.event
    let x = e.pageX
    let y = e.pageY

    // 获取随机颜色
    let color = randomColor[parseInt(Math.random()*randomColor.length)]
    // 获取随机单词
    let word = randomWord[parseInt(Math.random()*randomWord.length)]
    // 创建节点并赋予属性
    const div = document.createElement('div')
    div.classList.add('random-alert')
    div.style.left = x + "px"
    div.style.top = y + "px"
    div.style.zIndex = '9999999'
    div.style.color = color
    div.innerHTML = word

    // 属性添加完毕插入节点
    body.appendChild(div)

    // 每隔0ms它的top值 - 1
    setInterval(() => {
        let newlTop = parseInt(div.style.top) - 1
        div.style.top = newlTop + 'px'
    }, 1)

    // 插入节点x秒后删除节点
    setTimeout(() => {
        body.removeChild(div);
    }, 2000)

}