<template>
  <div class="login">
      <h1>欢迎来到子然电商后台管理系统</h1>
      <div class="login-tab">
          <h4>管理员登录</h4>
          <ul>
              <li>
                  <span>用户名：</span>
                  <el-input v-model="input" placeholder="请输入用户名"></el-input>
              </li>
              <li>
                  <span>密码：</span>
                  <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
              </li>
              <li><el-button  type="primary"  class="btn" @click="send">登录</el-button></li>
          </ul>

      </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                input: '',
                password:'',
                token:'token',
                user:'user'
            }
        },
        methods:{
            //封装设置本地存储
            set(key,data){
                localStorage.setItem(key,JSON.stringify(data))
            },
            send(){
                this.axios({
                    url:'/api/login',
                    method:'post',
                    data:{
                        user:this.input,
                        pwd:this.password
                    }
                }).then(res=>{
                    // console.log(res)
                    if(res.data.code === 200){
                        this.set(this.token,res.data.token)
                        this.set(this.user,this.input)
                        this.$router.push('/index')
                    }else {
                        alert(res.data.msg)
                        this.input = '';
                        this.password = ''
                    }
                })
            }
        }
    };
</script>

<style lang="less" scoped>
    .login{
        height: 100vh;
        position: relative;
        background: rgb(112,187,231);
        h1{
            position: absolute;
            top: 0;
            height: 47px;
            width: 100%;
            background: rgba(23,87,125,0.5);
            font-size: 14px;
            line-height: 47px;
            text-indent: 24px;
            color: #fff;
        }

        .login-tab{
            width: 480px;
            height: 375px;
            border: 4px solid #1C77AC;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            h4{
                width: 100%;
                height: 40px;
                margin: 18px 0;
                line-height: 40px;
                color: #fff;
                font-size: 14px;
                text-indent: 24px;
                border-bottom: 1px solid #478fca;
            }
            ul{
                padding: 40px  ;
                li{
                    margin-bottom: 10px;
                }
                li:last-child{
                    text-align: right;
                }
                .btn{
                    margin-right: 20px;
                }
                span{
                    color: #fff;
                }
            }

        }
    }

</style>