
// 表单验证

let reg_email = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
let Verification_Code1 = document.getElementById('Verification_Code')

var retrieve_one_model = new Vue({

    el:'.retrieve_password',
    data:{
        // successful - Level 1 module
        erro:'',
        newcode:'',
        retrieve_email: '',
        getNewCode:'',
        getHuGx:'请填写在HuGx个人博客注册的邮箱号',
        getHuGx_type:false,
        skr:'',             // 验证码
        successful:true,   // 判断是否显示 successful block
        // successful - Level 2 module
        code:'',
        Newpassword:'',
        Setpassword:'',
    },
    // 自动加载
    mounted(){
    console.log('文档加载完成了')
        for(var i = 0; i<4; i++){
            this.skr += parseInt(Math.random()*10);
        }
        return this.skr
    },
    methods:{
        // Level 1 module
        // 随机数
        Verification_Code:function(){
            this.skr = ""
            for(var i = 0; i<4; i++){
                this.skr += parseInt(Math.random()*10);
            }
            Verification_Code1.innerHTML = this.skr
        },

        // 邮箱验证
        setEmail:function () {

            if (this.retrieve_email === "")
            {
                this.erro = "邮箱不可为空"
                return false
            }
            else if(!reg_email.test(this.retrieve_email))
            {
                this.erro = "邮箱格式不正确！"
                return false
            }
            else
            {
                this.erro = ""
                return true
            }

        },

        // 验证码验证
        codeNull:function () {

            if (this.getNewCode === "")
            {
                this.newcode = "请输入正确的验证码！"
                return false
            }
            else if (this.getNewCode.length <4)
            {
                this.newcode = "请输入正确的验证码！"
                return false
            }
            else
            {
                this.newcode = ""
                return true
            }

        },

        // "Next step" - 验证
        Next_Step:function () {

            if (!this.setEmail())
            {
                alert("邮箱格式不正确！");
            }
            else if (!this.codeNull())
            {
                alert("请输入正确的验证码！");
            }
            else if (this.getNewCode !== this.skr)
            {
                alert("请输入正确的验证码！");
            }
            // 说有判断成功才进行下列操作
            // 进行异步发送请求查找邮箱操作
            else
            {
                var url = "../landing/email.php";
                let postData = window.Qs.stringify({ email:this.retrieve_email,type:"Retrieve_Password", });
                axios({
                    method:'post',
                    url:url,
                    data:postData,
                })
                    //成功 - 回掉函数
                    .then(resp => {
                        alert(resp.data)
                        console.log(resp.data);
                        // 判断没有此用户时做提示 - 通过显示 successfulBlock
                        if (resp.data === "此邮箱没有在本网站创建过用户！")
                        {
                            this.successful = true
                            this.getHuGx_type = true
                        }
                        else if(resp.data === "验证码发送失败")
                        {
                            this.successful = true
                            this.getHuGx_type = true
                            this.getHuGx = "验证码发送失败";
                        }
                        else
                        {
                            this.getHuGx_type = false
                            this.successful = false
                        }
                    })
                    // 失败 - 回掉函数
                    .catch(err => {
                    console.log('请求失败：'+err.status+','+err.statusText);
                });
                // alert("请稍后")
            }

        },

        // Level 2 module
        Modify_the:function () {
            // 判断密码长度不能小与6位数数 && 不能为空
            if (this.Newpassword.length < 6)
            {
                alert("密码小与6位！")
            }
            // 判断两次密码是否一致
            else if(this.Newpassword !== this.Setpassword)
            {
                alert("两次输入的密码不一致！")
            }
            // 判断通过发送修改密码请求
            else
            {
                var url = "../aggregate/Class_and_method/Change_Password.php";
                let postData = window.Qs.stringify({
                    email:this.retrieve_email,
                    Newpassword:this.Newpassword,
                    code:this.code,
                    type:"Retrieve_Password",
                });
                axios({
                    method:'post',
                    url:url,
                    data:postData,
                })
                //成功 - 回掉函数
                    .then(resp => {
                        alert(resp.data)
                        console.log(resp.data);
                        if (resp.data === "修改成功,请登陆吧")
                        {
                            window.location.href = "../logo.php";
                        }
                    })
                    // 失败 - 回掉函数
                    .catch(err => {
                        console.log('请求失败：'+err.status+','+err.statusText);
                    });
            }

        }

    },



})
