

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
$(document).scroll(function() {
    var scroH = $(document).scrollTop();  //滚动高度
    var viewH = $(window).height();  //可见高度
    var contentH = $(document).height();  //内容高度

    if(scroH <100){  //距离顶部小于100px时
        $('.top_bottom').slideUp(600)
    }
    if(scroH >100){  //距离顶部大于100px时
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




