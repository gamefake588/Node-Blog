

// 变量声明
var switch_register = document.getElementById('switch_register'),
    switch_login = document.getElementById('switch_login')
var body_register = document.getElementById('body_register'),
    login_body = document.getElementById('login_body')

var Verification_Code = document.getElementById('Verification_Code')

// 验证码
function Verification_Code1(){

    var skr = ""

    for(var i = 0; i<4; i++){
        skr += parseInt(Math.random()*10);
    }
    Verification_Code.innerHTML = skr

}
// 点击切换 登陆，注册
switch_login.onclick = function(){
    
    login_body.style.display = 'block'
    body_register.style.display = 'none'

}
switch_register.onclick = function(){
    
    login_body.style.display = 'none'
    body_register.style.display = 'block'
    

}



// 表单验证
// 登陆
var login = document.getElementById('login'),       //登陆按钮
    code_a = document.getElementById('code_a'),     //验证码
    user_login = document.getElementById('user_login'),     //用户名
    pass_login = document.getElementById('pass_login'),      //密码

    empty = null || " ",         //空

    number = /^[A-Za-z0-9]+$/,   //密码
    phone = /^1[34578]\d{9}$/;  //手机
let emailV = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;   //邮箱验证

// 登陆提交验证


function mylogin(){
    var usernameL = $('#usernameL').val();
    var passwordL = $('#passwordL').val();
    console.log(usernameL,passwordL)
    if(code_a.value=="" || code_a.value==null){
        alert('验证码不能为空')
        return false
    }
    if(code_a.value != Verification_Code.innerHTML){
        alert('验证码不正确')
        window.location.reload()
        code_a.value = ""
        return false
        
    }else {

        $.ajax({
            type: "POST",
            url: "landing/login_c.php",  //同目录下的php文件
            data:"username="+usernameL+"&password="+passwordL,  // 等号前后不要加空格
            async:false,
            success: function(data){  //请求成功后的回调函数
                alert(data);
                if (data === "用户名成功登录" || data === "邮箱账号成功登录")
                {
                    window.location.href= "aggregate/article.php";
                }else
                {
                    window.location.reload()
                }

            },
            error: function () {
                alert("错误");
            }
        });
        return true
    }
    
}

// 注册验证
var user_register = document.getElementById('user_register'),       //用户名
    pass_register = document.getElementById('pass_register'),       //密码  
    alsopass = document.getElementById('alsopass'),                 //再次密码
    phone_register = document.getElementById('phone_register');      //手机号
let email = document.getElementById('email');
let code = document.getElementById('code');

//用户名验证
function userRegister(){

    if(!number.test(user_register.value)){

        user_register.classList.add("Together")
        return false

    }
    else{
        user_register.classList.remove("Together")
    }

    if(user_register.value.length <6){

        user_register.classList.add("Together")
        return false

    }
    else{
        user_register.classList.remove("Together")
    }

}

//密码验证
function passRegister(){

    if(!number.test(pass_register.value)){

        pass_register.classList.add("Together")
        return false

    }
    else{
        pass_register.classList.remove("Together")
    }
    
    if(pass_register.value.length <6){

        pass_register.classList.add("Together")
        return false

    }
    else{
        pass_register.classList.remove("Together")
    }

}
//再次密码验证
function alsopassRegister(){

    if(alsopass.value != pass_register.value){

        alsopass.classList.add("Together")
        return false

    }
    else{
        alsopass.classList.remove("Together")
    }

}

//手机号验证
function phoneRegister(){

    if(!phone.test(phone_register.value)){

        phone_register.classList.add("Together")
        return false

    }
    else{
        phone_register.classList.remove("Together")
    }


}

//邮箱验证
function emailRegister(){

    if(!emailV.test(email.value)){

        email.classList.add("Together")
        return false

    }
    else{
        email.classList.remove("Together")
    }

}

//验证码验证
function codeRegister(){

    if(code.value=="" || code.value==null){
        code.classList.add("Together")
        return false
    }
    else{
        code.classList.remove("Together")
    }

}

//登陆验证判断 ----- 判断成功ajax提交
function myregister(){

    if (userRegister()==false)
    {
        alert("用户名格式错误");
        return false;
    }
    if (passRegister()==false)
    {
        alert("密码格式错误");
        return false;
    }
    if (alsopassRegister()==false)
    {
        alert("再次输入密码格式错误");
        return false;
    }
    if (phoneRegister()==false)
    {
        alert("手机号格式错误");
        return false;
    }
    if (emailRegister()==false)
    {
        alert("邮箱格式错误");
        return false;
    }
    if (codeRegister()==false)
    {
        alert("验证码不能为空");
        return false;
    }
    else
    {
        var username = $('#user_register').val();
        var password = $('#pass_register').val();
        var phone = $('#phone_register').val();
        var email = $('#email').val();
        var hiddenUser_img = $('#hiddenUser_img').val();

        $.ajax({
            type: "POST",
            url: "landing/register_c.php",  //同目录下的php文件
            data:"username="+username+"&password="+password+"&phone="+phone+"&hiddenUser_img="+hiddenUser_img+"&code="+code.value+"&email="+email,  // 等号前后不要加空格
            success: function(data){  //请求成功后的回调函数
                alert(data);
                if (data == "验证失败")
                {
                    return false;
                }
                else if (data == "注册成功，去登陆吧")
                {
                    window.location.reload();
                }

            },
            error: function () {
                alert("服务器异常");
            }
        });
        return true;
    }

}

//随机头像
function getUserimg() {
    var hiddenUser_img = document.getElementById('hiddenUser_img');
    var userRan = "user"+user_img+".png";
    var sttone = hiddenUser_img.value = userRan;
    console.log(sttone)
}
//随机头像

var user_img = Math.floor(Math.random()*10+1);
var userRan = "user"+user_img+".png";
var userImgurl = "images/user_img/"+userRan;
var userDefault = document.getElementById('default');
userDefault.setAttribute('src',userImgurl);



// ajax发送邮箱验证码
let codeTime = 60;
var Adata = 0;
function getCode(){

    var email = $('#email').val();
    var type = "registered";
    $.ajax({
        type: "POST",
        url: "landing/email.php",  //同目录下的php文件
        data:"email="+email+"&type="+type,  // 等号前后不要加空格
        success: function(data){  //请求成功后的回调函数
            alert(data);
            var Hdata = data;
            Adata = Hdata;
        },
        error: function () {
            alert("服务器异常");
        }
    });




}


//关闭第三方登录
function offTHree() {
    alert("该功能目前正在修改 -- 稍后上线");
}
