import axios from "axios";
import qs from "qs";
import { log } from "util";

export default {
  name: "loginT",
  data() {
    return {
      // 定义data
    }
  },
  mounted() {


    $(".button-collapse").sideNav();
    $("#avatar_file").change(function () {
      // 获取上传文件对象
      var file = $(this)[0].files[0];
      // 读取文件URL
      var reader = new FileReader();
      reader.readAsDataURL(file);
      // 阅读文件完成后触发的事件
      reader.onload = function () {
        // 读取的URL结果：this.result
        $("#avatar_img").attr("src", this.result);
      };
    });

    // 彩蛋
    console.error(" 人非圣贤 孰能无过")
    // 定时器
    var a = 60;

    function get_CodeCountdown(switc) {
      // 定义switc参数传递ID
      var switc = document.getElementById(switc)
      // 判断重复调用定时器效果
      if (a > 0) {
        setInterval(function () {
          // 2判断重复调用定时器效果 - 倒计时
          if (a > 0) {
            a--
            switc.innerHTML = a
            switc.setAttribute('disabled', "disabled")
            switc.style.cursor = "wait"
          } else if (a === 0) {
            switc.innerHTML = "发送"
            switc.removeAttribute('disabled')
            switc.style.cursor = "pointer"
          }

        }, 1000)
      } else if (a === 0) {
        a = 60
      }


      // h_button.innerHTML = a
    }

    // Cookie
    function setCookie(name, value) {
      var Days = 1;//天数
      var exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
    }


    // 登陆 - 注册 - 忘记密码模块 切换动画
    let app_login = document.getElementById('app_login')
    let app_register = document.getElementById('app_register')
    let newPassword = document.getElementById('newPassword')
    // 按钮
    let button_login = document.getElementById('button_login')
    let Forgot_password = document.querySelector('.Forgot_a')
    // 样式切换
    let h_main = document.querySelector('.h_main')


    // onclick
    var TypeButton_login = true
    button_login.onclick = function () {
      TypeButton_login = !TypeButton_login
      if (TypeButton_login) {
        get_h_Cut(app_login, app_register, newPassword)
        button_login.innerHTML = "前往注册"
        h_main.style.padding = '5% 0'
      } else {
        get_h_Cut(app_register, app_login, newPassword)
        button_login.innerHTML = "前往登陆"
        h_main.style.padding = '.2% 0'
      }
      this.classList.add('h_active')

    }
    Forgot_password.onclick = function () {
      get_h_Cut(newPassword, app_login, app_register)
      button_login.classList.remove('h_active')
      this.style.color = "#000"
      h_main.style.padding = '5% 0'
    }

    // 切换
    function get_h_Cut(h_swit_a, h_swit_b, h_swit_c) {
      h_swit_a.style.display = "block"
      h_swit_b.style.display = "none"
      h_swit_c.style.display = "none"
    }

    /**
     *
     * @param {按钮} button_len
     * @param {切换物} Want
     */
    // 传值
    var getCut_type = ""
    const login_form_account = document.getElementById('login_form_account')

    function getCut(button_len, Want) {

      for (var i = 0; i < button_len.length; i++) {
        button_len[i].index = i

        button_len[i].onclick = function () {
          for (var j = 0; j < button_len.length; j++) {
            // 判断用户验证码登陆 隐藏记住我功能
            if (button_len[this.index].innerHTML === "短信登陆") {
              login_form_account.style.display = "none"
            } else {
              login_form_account.style.display = "flex"
            }
            Want[j].style.display = "none"
            button_len[j].classList.remove('login_title_active');
            button_len[j].removeAttribute("id", "Account_login")
          }
          Want[this.index].style.display = "block"
          button_len[this.index].classList.add('login_title_active');
          button_len[this.index].id = "Account_login"
        }
      }

    }

    // 验证码 - 密码切换
    const login_titleFunction = document.querySelectorAll('.login_titleFunction')
    const login_FunctionSon = document.querySelectorAll('.login_FunctionSon')

    getCut(login_titleFunction, login_FunctionSon)

    /**
     *
     *  ****************************** 分割线 *****************
     *
     */

    // 接口地址
    const token = "http://www.howig.cn:3000"

    // 获取cookie
    function getCookie(key) {
      var arr1 = document.cookie.split("; ");
      //由于cookie是通过一个分号+空格的形式串联起来的，所以这里需要先按分号空格截断,变成[name=Jack,pwd=123456,age=22]数组类型；
      for (var i = 0; i < arr1.length; i++) {
        var arr2 = arr1[i].split("=");//通过=截断，把name=Jack截断成[name,Jack]数组；
        if (arr2[0] === key) {
          return decodeURI(arr2[1]);
        }
      }

    }

    /**
     * 提示动画
     * @param {触发事件} button
     * @param {动画提示} Main_animation
     * @param {提示语句} promptCluse
     */
    function h_setAnimation(Main_animation, prompt, promptCluse) {
      var time = 2

      function h_getPrompt(main) {
        // 定时器
        var getTime = setInterval(function () {
          if (time !== 0) {
            time--
          } else if (time === 0) {
            main.style.bottom = "110%"
            window.clearInterval(getTime)
          }
        }, 1000)
        main.style.bottom = "0%"
      }

      time = 2
      // 提示文字
      prompt.innerHTML = promptCluse
      // 调用倒计时函数
      h_getPrompt(Main_animation)
      // 双击关闭提示
      Main_animation.onclick = function () {
        Main_animation.style.bottom = "110%"
      }
    }

    const main = document.querySelector('.animation_box')       // 提示主框架
    const prompt = document.querySelector('.animation')         //提示文字显示

    // ----- 注册 ----- //

    const h_register_button = document.getElementById('h_register_button') // 注册 - 发送验证码按钮
    const register_button = document.getElementById('register_button')  // 注册按钮
    register_button.setAttribute("disabled", "disabled")

    // mobile_type bootr
    const h_mobile_button = document.querySelector('.h_mobile_button')
    // 注册 - 发送验证码
    h_register_button.onclick = function () {

      let register_email = $('#register_email').val()

      let url = `${token}/Api/email_code`;

      let register_data = qs.stringify({
        type: "注册",
        email: register_email,
      })

      // 判断邮箱不能为空
      if (register_email === "") {
        alert("邮箱不能为空")
      }
      else {
        axios
          .post(url, register_data, { withCredentials: true })
          .then(res => {

            console.log(res.data)
            alert(res.data.return_str)
            if (res.data.return_code === "200") {
              register_button.removeAttribute("disabled")
              // 验证码倒计时
              get_CodeCountdown("h_register_button")
              // 保存验证码 - cookie
              // setCookie(res.data.email, res.data.code)
            }
            if (res.data.return_code === "500") {
              register_button.setAttribute("disabled", "disabled")
            }

          })
          .catch(err => {
            console.log(err)
          })

        register_button.classList.remove('h_disabled')


      }

    }

    // 注册
    register_button.onclick = function () {

      // 获取用户填写的数据
      let register_phone = $('#register_phone').val()
      let register_email = $('#register_email').val()
      let email_code = $('#register_phoneCode').val()
      let register_pass = $('#register_pass').val()
      let register_Newpass = $('#register_Newpass').val()
      var phone_msg = /^[1][3,4,5,7,8][0-9]{9}$/;         // 手机号正则
      // 附带文件上传表单
      let register_data = new FormData();
      if ($("#avatar_file")[0].files[0] === undefined) {
        alert("请先上传头像图片");
        return false
      }
      register_data.append("phone", register_phone);
      register_data.append("email", register_email);
      register_data.append("head_portrait", $("#avatar_file")[0].files[0]);
      register_data.append("code", email_code);
      register_data.append("pass", register_pass);

      // 将用户信息装入数组
      const register = [
        register_phone, register_email, email_code,
        register_pass, register_Newpass
      ]
      // 循环判断非空
      for (let i in register) {
        if (register[i] === "") {
          h_setAnimation(main, prompt, "请将信息填写完整，谢谢")
          return
        }
      }
      // 验证信息格式
      switch (true) {
        // 判断手机号格式是否正确
        case !phone_msg.test(register_phone):
          h_setAnimation(main, prompt, "手机号格式错误")
          break;
        // 判断密码长度
        case register_pass.length < 6:
          h_setAnimation(main, prompt, "密码长度小于6位数")
          break;
        // 判断两次密码是否相同
        case register_pass !== register_Newpass:
          h_setAnimation(main, prompt, "两次密码不相同")
          break;
        // 发送请求
        default:
          const url = `${token}/Api/register`;
          // axios文件请求头
          let configs = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true, };
          axios
            .post(url, register_data, configs)
            .then(res => {
              console.log(res.data)
              alert(res.data.return_str)
              if (res.data.return_code === '200') {
                // 注册成功保存session
                sessionStorage.setItem('email', register_email);
                window.location.href = '/'
              }
              if (res.data.return_code === '500') {
                // 判断有此用户刷新当前页面
                if (res.data.return_str === "已有此用户，您可以去登陆") window.location.reload()
              }

            })
            .catch(err => {
              console.log(err)
            })
      }

    }


    // ----- 登陆 ----- //

    const login_button = document.getElementById('login_button')
    const h_login_button = document.getElementById('h_login_button')

    try {
      // 登陆验证码 - 发送
      h_login_button.onclick = function () {

        // 邮箱账号
        let login_PhoneName = $('#login_PhoneName').val()

        let url = `${token}/Api/email_code`;
        let data = qs.stringify({
          type: "登陆",
          email: login_PhoneName,
        });

        axios
          // withCredentials:true 跨越请求cookie
          .post(url, data, { withCredentials: true })
          .then(res => {
            console.log(res.data)
            alert(res.data.return_str)
            if (res.data.return_code === "200") {
              // 验证码倒计时
              get_CodeCountdown("h_login_button")
              // 保存验证码
              setCookie(res.data.email, res.data.code)
            }
            if (res.data.return_code === "500") {

            }

          })
          .catch(err => {
            console.log(err);
          });

      }

      // 登陆
      login_button.onclick = function () {

        let url = ""
        let login_data = {}
        let login_PhoneName

        // 判断 Account_login0 === 密码登陆
        if (login_titleFunction[0].id === "Account_login") {

          url = `${token}/Api/login`

          let login_name = $('#login_name').val()
          let login_pass = $('#login_pass').val()

          login_data = qs.stringify({
            login_name: login_name,
            login_pass: login_pass,
          })


        }
        // 判断 Account_login1 === 验证码登陆
        else if (login_titleFunction[1].id === "Account_login") {

          url = `${token}/Api/email_login`

          login_PhoneName = $('#login_PhoneName').val()
          let login_phoneCode = $('#login_phoneCode').val()

          login_data = qs.stringify({
            email: login_PhoneName,
            code: login_phoneCode,
          })

        } else {
          alert("错误")
        }

        // 是否记录用户
        let login_checkbox = document.getElementById('login_checkbox')

        axios
          .post(url, login_data, { withCredentials: true })
          .then(res => {

            alert(res.data.return_str)
            console.log(res.data)
            if (res.data.return_code === '200') {

              // 判断是否保存用户
              if (login_checkbox.checked === true) {
                setCookie("email", res.data.email)
                sessionStorage.setItem('email', res.data.email);
              } else {
                // 账号密码登陆 保存session
                if (login_titleFunction[0].id === "Account_login") {
                  sessionStorage.setItem('email', res.data.email);
                  sessionStorage.setItem('user_id', res.data.ID);
                }
                // 邮箱验证码登陆保存session
                else if (login_titleFunction[1].id === "Account_login") {
                  sessionStorage.setItem('email', login_PhoneName);
                  sessionStorage.setItem('user_id', res.data.ID);
                }
              }
              window.location.href = `/`

            }
            if (res.data.return_code === '500') {

            }

          })
          .catch(err => {
            console.log(err)
          })

      }
    } catch (err) {
      // alert(err)
    }


    // ----- 忘记密码 ----- //
    try {

      const newPassword_button = document.getElementById('newPassword_button')        // 发送验证码 - 按钮
      const h_newPassword_button = document.getElementById('h_newPassword_button')    // 修改密码 忘记密码模块二 - 发送验证码按钮
      const newPassword_data_button = document.getElementById('newPassword_data_button')  // 修改密码 - 按钮

      const newPassword_dataPass = document.querySelector('.newPassword_dataPass')        // 验证 忘记密码模块一
      const newPassword_validation = document.querySelector('.newPassword_validation')    // 修改密码 忘记密码模块二

      const Please_answer = document.querySelector('.Please_answer')      // 随机问题刷出
      var app_randSum

      // 问题
      function setPlease_answer() {
        var app_rand1 = Math.round(Math.random() * 10);
        var app_rand2 = Math.round(Math.random() * 10);
        Please_answer.innerHTML = "请回答: " + app_rand1 + " + " + app_rand2 + " 等于几?"
        app_randSum = app_rand1 + app_rand2
        return app_randSum
      }

      setPlease_answer()

      // 发送验证码函数
      function setNewPswword_() {

        let Answer_the_questions = $("#Answer_the_questions").val()
        var email = $("#newPassword_email").val()

        // 判断手机号格式是否正确
        if (email === '') {
          h_setAnimation(main, prompt, "邮箱不能为空")
        }
        // 判断回答问题是否正确
        else if (Answer_the_questions != app_randSum) {

          h_setAnimation(main, prompt, "答案好像不正确，请重试。")

        } else {

          let url = `${token}/Api/email_code`
          let newPassword_data = qs.stringify({
            type: "忘记密码",
            email: email,
          })

          axios
            .post(url, newPassword_data, { withCredentials: true })
            .then(res => {
              alert(res.data.return_str)
              h_setAnimation(main, prompt, res.data.return_str)
              if (res.data.return_code === '200') {
                sessionStorage.setItem('email', email);
                // 验证码倒计时
                get_CodeCountdown("h_newPassword_button")
                // 判断成功 切换模块
                newPassword_dataPass.style.display = "block"
                newPassword_validation.style.display = "none"
              }
              if (res.data.return_code === '500') {

              }

            })
            .catch(err => {
              console.log(err)
            })

        }

      }

      // 忘记密码模块一发送验证码 - 按钮 (调用自身)
      newPassword_button.onclick = function () { setNewPswword_() }

      // 忘记密码模块二发送验证码 - 按钮 (调用自身)
      h_newPassword_button.onclick = function () { setNewPswword_() }

      // 修改密码 - 按钮
      newPassword_data_button.onclick = function () {

        let newPassword_email = $("#newPassword_email").val()
        let newPassword_phoneCode = $("#newPassword_phoneCode").val()
        let newPassword_pass = $("#newPassword_pass").val()
        let newPassword_Newpass = $("#newPassword_Newpass").val()

        // 获取值装入数组
        const newPassword = [
          newPassword_email, newPassword_phoneCode,
          newPassword_pass, newPassword_Newpass
        ]
        // 循环判断
        for (let i in newPassword) {
          if (newPassword[i] === "") {
            h_setAnimation(main, prompt, "请填写完整，谢谢")
            return
          }
        }
        // 判断密码长度
        if (newPassword_pass.length < 6) {
          h_setAnimation(main, prompt, "密码长度小于6位数")
          return
        }
        // 判断两次密码是否相同
        if (newPassword_pass !== newPassword_Newpass) {
          h_setAnimation(main, prompt, "两次密码输入不一致")
          return
        }
        // 判断成功发送请求
        const url = `${token}/Api/updata_pass`
        const newPassword_data = qs.stringify({
          email: newPassword_email,
          code: newPassword_phoneCode,
          pass: newPassword_pass,
        })
        axios
          .post(url, newPassword_data, { withCredentials: true })
          .then(res => {

            alert(res.data.return_str)
            h_setAnimation(main, prompt, res.data.return_str)
            if (res.data.return_code === '200') window.location.reload()
            if (res.data.return_code === '500') console.log(res.data)

          })
          .catch(err => {
            console.log(err)
          })

      }

    } catch (err) {

    }


  },
}
