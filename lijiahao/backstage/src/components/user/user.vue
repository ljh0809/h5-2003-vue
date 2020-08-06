<!--  -->
<template>
<div class='user'>
  <p>用户名 :<span>{{personData.name}}</span></p>
  <p>性别 :<span>{{personData.sex}}</span></p>
  <p>年龄 :<span>{{personData.age}}</span></p>
  <p>移动电话 :<span>{{personData.tel}}</span></p>
  <p>电子邮件 :<span>{{personData.email}}</span></p>
  <p>QQ :<span>{{personData.qq}}</span></p>
  <p>权限 :<span>{{personData.power}}</span></p>
  <p>注册时间 :<span>{{personData.registerTime}}</span></p>
</div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data(){
         return  {
             // userData:[]
         }
        },
        computed:
           mapState(['personData'])
        ,
        methods:{
            getData(){
                this.$store.dispatch('getPower')
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>
<style lang='less' scoped>
.user{
  background-color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  p{
    font-size: 20px;
    line-height: 40px;
    width: 400px;
  }
  span{
    display: inline-block;
    margin-left: 50px;
    color: #ccc;
  }
  .btn{
    button{
      width: 100px;
      height: 50px;
      margin-right: 30px;
    }
  }
}
</style>
