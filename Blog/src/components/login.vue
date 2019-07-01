<!-- 模板 -->
<template>
  <!-- 登陆 - 注册 -->
  <div class="login">
    <!-- 提示 -->
    <div class="animation_box admin">
        <div class="animation">
        </div>
    </div>
    <!-- main -->
    <article class="h_main">
      <!-- main - block -->
      <section class="h_main_block">
        <!-- 登陆 -->
        <div class="h_login" id="app_login">
          <i
            class="fa fa-arrow-left"
            style="cursor: pointer;color: #58c779;"
            onclick="window.history.go(-1);"
          ></i>
          <!-- 登陆 - form -->
          <div class="h_login_form">
            <!-- 切换 按钮 -->
            <div class="h_login_title">
              <!-- 账号登陆 -->
              <div class="login_title_Z">
                <span class="login_titleFunction login_title_active" id="Account_login">账号登陆</span>
              </div>
              <!-- 短信登陆 -->
              <div class="login_title_D">
                <span class="login_titleFunction">邮箱登陆</span>
              </div>
            </div>
            <!-- 登陆 - top -->
            <div class="h_login_top">
              <!-- password -->
              <div class="login_pass login_FunctionSon">
                <!-- 块 -->
                <div class="login_form_block">
                  <!-- 提示 -->
                  <div class="login_form_prompt">
                    <a href="javascript:">邮箱</a>
                  </div>
                  <!-- input -->
                  <div class="login_form_input">
                    <input type="text" id="login_name" class="h_input">
                  </div>
                </div>
                <!-- 块 - 结束 -->
                <!-- 块 -->
                <div class="login_form_block" id="login_password">
                  <!-- 提示 -->
                  <div class="login_form_prompt">
                    <a href="javascript:">密码</a>
                  </div>
                  <!-- input -->
                  <div class="login_form_input">
                    <input type="password" id="login_pass" class="h_input">
                  </div>
                </div>
                <!-- 块 - 结束 -->
              </div>
              <!-- code -->
              <div class="login_code login_FunctionSon">
                <!-- 块 -->
                <div class="login_form_block">
                  <!-- 提示 -->
                  <div class="login_form_prompt">
                    <a href="javascript:">邮箱</a>
                  </div>
                  <!-- input -->
                  <div class="login_form_input" style="width: 62%;">
                    <input type="text" id="login_PhoneName" class="h_input">
                  </div>
                </div>
                <!-- 块 - 结束 -->
                <!-- 块 -->
                <div class="login_form_block" id="login_code">
                  <!-- 提示 -->
                  <div class="login_form_prompt">
                    <a href="javascript:">验证码</a>
                  </div>
                  <!-- input -->
                  <div class="login_form_input">
                    <input type="text" id="login_phoneCode" class="h_input">
                    <button class="h_button" id="h_login_button">发送</button>
                  </div>
                </div>
                <!-- 块 - 结束 -->
              </div>
            </div>
            <!-- 块 -->
            <div class="login_form_block" id="login_form_account">
              <!-- 提示 -->
              <div class="login_form_prompt">
                <a href="javascript:"></a>
              </div>
              <!-- input -->
              <div class="login_form_input">
                <a href="javascript:">
                  <input type="checkbox" id="login_checkbox">
                  <label for="login_checkbox">记住我（请在私人设备上使用此功能）</label>
                </a>
              </div>
            </div>
            <!-- 块 - 结束 -->
            <!-- 块 -->
            <div class="login_form_block h_submit">
              <button id="login_button">登陆</button>
            </div>
            <!-- 块 - 结束 -->
            <div class="last"></div>
          </div>
        </div>
        <!-- 登陆 - 结束 -->
        <!-- 注册 -->
        <div class="h_register" id="app_register">
          <i
            class="fa fa-arrow-left"
            style="cursor: pointer;color: #58c779;"
            onclick="window.history.go(-1);"
          ></i>
          <!-- 注册 - form -->
          <div class="h_register_form">
            <!-- 块 -->
            <div class="login_form_block">
              <div class="user_formImg">
                <img src="static/images/user_img/userImg.png" class="user_p_heard" id="avatar_img">
                <input type="file" id="avatar_file" name="hear_portrait" accept="image/*">
              </div>
            </div>
            <!-- 块 - 结束 -->
            <!-- 块 -->
            <div class="login_form_block">
              <!-- 提示 -->
              <div class="login_form_prompt">
                <a href="javascript:">手机号</a>
              </div>
              <!-- input -->
              <div class="login_form_input">
                <input type="text" id="register_phone" class="h_input">
              </div>
            </div>
            <!-- 块 - 结束 -->
            <!-- 块 -->
            <div class="login_form_block">
              <!-- 提示 -->
              <div class="login_form_prompt">
                <a href="javascript:">邮箱</a>
              </div>
              <!-- input -->
              <div class="login_form_input">
                <input type="text" id="register_email" class="h_input">
              </div>
            </div>
            <!-- 块 - 结束 -->
            <!-- 块 -->
            <div class="login_form_block" id="login_code">
              <!-- 提示 -->
              <div class="login_form_prompt">
                <a href="javascript:">验证码</a>
              </div>
              <!-- input -->
              <div class="login_form_input">
                <input type="text" id="register_phoneCode" class="h_input">
                <button class="h_button" id="h_register_button">发送</button>
              </div>
            </div>
            <!-- 块 - 结束 -->
            <!-- 块 -->
            <div class="login_form_block">
              <!-- 提示 -->
              <div class="login_form_prompt">
                <a href="javascript:">密码</a>
              </div>
              <!-- input -->
              <div class="login_form_input">
                <input type="password" id="register_pass" class="h_input">
              </div>
            </div>
            <!-- 块 - 结束 -->
            <!-- 块 -->
            <div class="login_form_block">
              <!-- 提示 -->
              <div class="login_form_prompt">
                <a href="javascript:">再次输入密码</a>
              </div>
              <!-- input -->
              <div class="login_form_input">
                <input type="password" id="register_Newpass" class="h_input">
              </div>
            </div>
            <!-- 块 - 结束 -->
            <!-- 块 -->
            <div class="login_form_block h_submit">
              <button id="register_button" class="h_disabled" disabled="disabled">注册</button>
            </div>
            <!-- 块 - 结束 -->
            <div class="last"></div>
          </div>
        </div>
        <!-- 注册 - 结束 -->
        <!-- 忘记密码 -->
        <div class="newPassword" id="newPassword">
          <!-- 忘记密码 - form -->
          <div class="newPassword_form">
            <!-- 忘记密码 - 验证 -->
            <section class="newPassword_validation">
              <!-- 块 -->
              <div class="login_form_block">
                <!-- 提示 -->
                <div class="login_form_prompt">
                  <a href="javascript:">邮箱</a>
                </div>
                <!-- input -->
                <div class="login_form_input">
                  <input type="text" id="newPassword_email" class="h_input" placeholder="请输入邮箱">
                </div>
              </div>
              <!-- 块 - 结束 -->
              <!-- 块 -->
              <div class="login_form_block" id="login_code">
                <!-- 提示 -->
                <div class="login_form_prompt">
                  <a href="javascript:">回答问题</a>
                </div>
                <!-- input -->
                <div class="login_form_input">
                  <input
                    type="text"
                    id="Answer_the_questions"
                    class="h_input"
                    style="width: 100% !important;"
                    placeholder="填入答案"
                  >
                  <span class="Please_answer"></span>
                </div>
              </div>
              <!-- 块 - 结束 -->
              <!-- 块 -->
              <div class="login_form_block h_submit">
                <button id="newPassword_button">发送</button>
              </div>
              <!-- 块 - 结束 -->
            </section>
            <!-- 忘记密码 修改密码model -->
            <section class="newPassword_dataPass">
              <!-- 块 -->
              <div class="login_form_block" id="login_code">
                <!-- 提示 -->
                <div class="login_form_prompt">
                  <a href="javascript:">验证码</a>
                </div>
                <!-- input -->
                <div class="login_form_input">
                  <input
                    type="text"
                    id="newPassword_phoneCode"
                    class="h_input"
                    style="width: 65% !important;"
                  >
                  <button class="h_button" id="h_newPassword_button">发送</button>
                </div>
              </div>
              <!-- 块 - 结束 -->
              <!-- 块 -->
              <div class="login_form_block">
                <!-- 提示 -->
                <div class="login_form_prompt">
                  <a href="javascript:">新密码</a>
                </div>
                <!-- input -->
                <div class="login_form_input">
                  <input
                    type="password"
                    id="newPassword_pass"
                    class="h_input"
                    placeholder="请输入新的密码"
                  >
                </div>
              </div>
              <!-- 块 - 结束 -->
              <!-- 块 -->
              <div class="login_form_block">
                <!-- 提示 -->
                <div class="login_form_prompt">
                  <a href="javascript:">再次输入新密码</a>
                </div>
                <!-- input -->
                <div class="login_form_input">
                  <input
                    type="password"
                    id="newPassword_Newpass"
                    class="h_input"
                    placeholder="请再次输入新密码"
                  >
                </div>
              </div>
              <!-- 块 - 结束 -->
              <!-- 块 -->
              <div class="login_form_block h_submit">
                <button id="newPassword_data_button">修改</button>
              </div>
              <!-- 块 - 结束 -->
            </section>
            <div class="last"></div>
          </div>
        </div>
        <!-- 忘记密码 - 结束 -->
        <!-- 底部 -->
        <div class="h_login_footer clear">
          <!-- 操作按钮 -->
          <div class="Action_buttons">
            <button class="h_button h_active" id="button_login">前往注册</button>
          </div>
          <!-- 忘记密码 - -->
          <div class="Forgot_password">
            <a href="javascript:" class="Forgot_a">忘记密码？点这里找回</a>
          </div>
        </div>
        <br>
        <!-- main - block - footer -->
        <div class="h_main_footer">
          <span>用户注册/登录说明：</span>
          <p>
            1、实际使用之前，需配置用户管理组件中的相关验证码
            <br>2、新用户注册后的审核方式有三种：自动核准、邮箱验证码激活
          </p>
        </div>
      </section>
    </article>
  </div>
</template>


<!-- 操作 -->
<script>
import axios from "axios";
import login_all from "../../static/js/private/login_all";

export default {
  ...login_all
};
</script>


<!-- 样式 -->
<style scoped>
@import "../../static/css/private/login_css.css";
</style>
