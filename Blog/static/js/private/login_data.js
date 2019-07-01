import axios from "axios";
import qs from "qs";

export default {
  name: "login_data",
  data() {
    return {
      // 定义data
    }
  },
  mounted() {

    // 彩蛋
    console.error(" 人非圣贤 孰能无过")

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

      let url = "http://localhost:3333/API/email";
      let register_data = {
        "type": "registered",
        "email": register_email,
      }
      // 判断邮箱不能为空
      if (register_email === "") {
        alert("邮箱不能为空")
      } else {
        // 密码和确认密码
        $.ajax({
          type: "POST",
          url: url,
          data: register_data,
          dataType: "json",
          // 成功回调
          success: function (data) {
            // 提示动画
            console.log(data)
            // 200 === 无错误
            if (data.return_code === '200') {
              register_button.removeAttribute("disabled")
              // 验证码倒计时
              get_CodeCountdown("h_register_button")
              // 保存验证码 - cookie
              setCookie("code", data.register_code)
            }
            // 500 === 错误
            if (data.return_code === '500') {
              register_button.setAttribute("disabled", "disabled")
            }


          },
          // 错误回调
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest, textStatus, errorThrown)
            alert("接口不通");
          }
        });

        register_button.classList.remove('h_disabled')


      }

    }

    // 注册
    register_button.onclick = function () {

      let register_phone = $('#register_phone').val()
      let register_email = $('#register_email').val()
      let email_code = $('#register_phoneCode').val()
      let register_pass = $('#register_pass').val()
      let register_Newpass = $('#register_Newpass').val()
      var phone_msg = /^[1][3,4,5,7,8][0-9]{9}$/;         // 手机号正则

      let register_data = new FormData();
      if ($("#avatar_file")[0].files[0] === undefined) {
        alert("请先上传头像图片");
        return false
      }
      register_data.append("type", "register");
      register_data.append("phone", register_phone);
      register_data.append("email", register_email);
      register_data.append("register_img", $("#avatar_file")[0].files[0]);
      register_data.append("email_code", email_code);
      register_data.append("register_pass", register_pass);

      let url = "http://localhost:3333/API/login";

      // 手机号注册
      if (h_mobile_button === null) {
        // 判断手机号不能为空
        if (register_phone === "" || register_email === "" || register_phoneCode === "" || register_pass === "") {
          if (register_phone === "") {
            h_setAnimation(main, prompt, "手机号为空")
          } else if (email_code === "") {
            h_setAnimation(main, prompt, "验证码不能为空")
          } else if (register_pass === "") {
            h_setAnimation(main, prompt, "密码不能为空")
          } else if (register_email === "") {
            h_setAnimation(main, prompt, "优秀不能为空")
          }
        }
        // 判断手机号格式是否正确
        else if (!phone_msg.test(register_phone)) {
          h_setAnimation(main, prompt, "手机号格式错误")
        }
        // 判断密码长度
        else if (register_pass.length < 6) {
          h_setAnimation(main, prompt, "密码长度小于6位数")
        }
        // 判断两次密码是否相同
        else if (register_pass !== register_Newpass) {
          h_setAnimation(main, prompt, "两次密码不相同")
        } else {
          $.ajax({
            type: "POST",
            url: url,
            data: register_data,
            data_type: "json",
            async: false,
            cache: false,
            processData: false,
            contentType: false,
            // 成功回调
            success: function (data) {
              console.log(data)
              alert(data.return_str);
              if (data.return_code === '200') {
                // 注册成功保存session
                sessionStorage.setItem('email', register_email);
                window.location.href = '/'
              }
              if (data.return_code === '500') {
                // 判断有此用户刷新当前页面
                if (data.return_str === "已有此用户，您可以去登陆") {
                  window.location.reload()
                }
              }

            },
            // 错误回调
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log(XMLHttpRequest, textStatus, errorThrown)
              alert("接口不通");
            }
          });
        }
      }
      // wx绑定
      else if (h_mobile_button !== null) {
        console.log("wx")
      }

    }


    // ----- 登陆 ----- //

    const login_button = document.getElementById('login_button')
    const h_login_button = document.getElementById('h_login_button')

    try {
      // 登陆验证码 - 发送
      h_login_button.onclick = function () {

        let login_PhoneName = $('#login_PhoneName').val()

        let url = "http://localhost:3000/Api/email";
        let data = qs.stringify({
          email: login_PhoneName,
        });
        axios
          .post(url, data)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
        // $.ajax({
        //   type: "POST",
        //   url: url,
        //   data: loginPhone_data,
        //   dataType: 'json',
        //   // 成功回调
        //   success: function (data) {
        //     console.log(data)
        //     alert(data.return_str)
        //     if (data.return_code === '200') {
        //       // 验证码倒计时
        //       get_CodeCountdown("h_login_button")
        //     }
        //     if (data.return_code === '500') {

        //     }

        //   },
        //   // 错误回调
        //   error: function (XMLHttpRequest, textStatus, errorThrown) {
        //     console.log(XMLHttpRequest, textStatus, errorThrown)
        //     alert("接口不通");
        //   }
        // });

      }

      // 登陆
      login_button.onclick = function () {

        let url = ""
        let login_data = {}
        let login_PhoneName

        // 判断 Account_login0 === 密码登陆
        if (login_titleFunction[0].id === "Account_login") {

          url = "http://localhost:3333/API/login"

          let login_name = $('#login_name').val()
          let login_pass = $('#login_pass').val()

          login_data = {
            'type': 'UserLogin',
            'login_name': login_name,
            'login_pass': login_pass,
          }


        }
        // 判断 Account_login1 === 验证码登陆
        else if (login_titleFunction[1].id === "Account_login") {

          url = "http://localhost:3333/API/login"

          login_PhoneName = $('#login_PhoneName').val()
          let login_phoneCode = $('#login_phoneCode').val()

          login_data = {
            'type': 'EmailCodeLogin',
            "email": login_PhoneName,
            "login_Code": login_phoneCode,
          }

        } else {
          alert("错误")
        }

        // 是否记录用户
        var login_checkbox = document.getElementById('login_checkbox')

        $.ajax({
          type: "POST",
          url: url,
          data: login_data,
          dataType: 'json',
          // 成功回调
          success: function (data) {
            console.log(data)
            alert(data.return_str)
            if (data.return_code === '200') {

              // 判断是否保存用户
              if (login_checkbox.checked === true) {
                setCookie("login_email", login_name)
                sessionStorage.setItem('email', login_name);
              } else {
                // 账号密码登陆 保存session
                if (login_titleFunction[0].id === "Account_login") {
                  sessionStorage.setItem('email', login_data.login_name);
                }
                // 邮箱验证码登陆保存session
                else if (login_titleFunction[1].id === "Account_login") {
                  sessionStorage.setItem('email', login_PhoneName);
                }
              }
              window.location.href = `/`
            }
            if (data.return_code === '500') {

            }

          },
          // 错误回调
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest, textStatus, errorThrown)
            alert("接口不通");
          }
        });
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

          let url = "http://localhost:3333/API/email"
          let newPassword_data = {
            "type": "Retrieve_Password",
            "email": email,
          }

          $.ajax({
            type: "POST",
            url: url,
            data: newPassword_data,
            dataType: 'json',
            // 成功回调
            success: function (data) {
              console.log(data)
              h_setAnimation(main, prompt, data.return_str)
              if (data.return_code === '200') {
                sessionStorage.setItem('email', email);
                // 验证码倒计时
                get_CodeCountdown("h_newPassword_button")
                // 判断成功 切换模块
                newPassword_dataPass.style.display = "block"
                newPassword_validation.style.display = "none"
              }
              if (data.return_code === '500') {

              }

            },
            // 错误回调
            error: function () {
              alert("接口不通");
            }
          });

        }

      }

      // 忘记密码模块一发送验证码 - 按钮
      newPassword_button.onclick = function () {

        setNewPswword_()

      }

      // 忘记密码模块二发送验证码 - 按钮
      h_newPassword_button.onclick = function () {

        setNewPswword_()

      }

      // 修改密码 - 按钮
      newPassword_data_button.onclick = function () {

        let newPassword_email = $("#newPassword_email").val()
        let newPassword_phoneCode = $("#newPassword_phoneCode").val()
        let newPassword_pass = $("#newPassword_pass").val()
        let newPassword_Newpass = $("#newPassword_Newpass").val()

        // 判断是否为空
        if (newPassword_phoneCode === "" || newPassword_pass === "" || newPassword_Newpass === "") {
          if (newPassword_phoneCode === "") {
            h_setAnimation(main, prompt, "验证码不可为空")
          } else if (newPassword_pass === "") {
            h_setAnimation(main, prompt, "新密码不可为空")
          }
          // 判断密码长度
          else if (newPassword_pass.length < 6) {
            h_setAnimation(main, prompt, "密码长度小于6位数")
          } else if (newPassword_Newpass === "") {
            h_setAnimation(main, prompt, "再次输入新密码不可为空")
          }
        }
        // 判断两次密码是否相同
        else if (newPassword_pass !== newPassword_Newpass) {
          h_setAnimation(main, prompt, "两次密码输入不一致")
        }
        // 判断成功发送请求
        else {

          let url = "http://localhost:3333/API/login"
          let newPassword_data = {
            "type": "newPassword",
            "newPassword_email": newPassword_email,
            "newPassword_emailCode": newPassword_phoneCode,
            "newPassword_pass": newPassword_pass,
          }

          $.ajax({
            type: "POST",
            url: url,
            data: newPassword_data,
            dataType: 'json',
            // 成功回调
            success: function (data) {
              alert(data.return_str)
              h_setAnimation(main, prompt, data.return_str)
              if (data.return_code === '200') {
                window.location.reload()
              }
              if (data.return_code === '500') {

              }

            },
            // 错误回调
            error: function () {
              alert("接口不通");
            }
          });

        }

      }

    } catch (err) {

    }


  },
}
