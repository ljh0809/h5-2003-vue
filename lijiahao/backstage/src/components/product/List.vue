<!--  -->
<template>
<div class="">
<div class='main'>

  <el-tabs type="border-card">

  <el-tab-pane label="全部商品"></el-tab-pane>
  <el-tab-pane label="已上架"></el-tab-pane>
  <el-tab-pane label="已下架"></el-tab-pane>
  
  <div class="list-select">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
        

      
        <el-select v-model="formInline.region" placeholder="所有类别">
          <el-option label="贵的" value="expensive"></el-option>
          <el-option label="便宜的" value="cheap"></el-option>
          <el-option label="又贵又便宜的" value="weird"></el-option>
        </el-select>   
        <el-select v-model="formInline.region" placeholder="地区选择">
          <el-option label="上海" value="shanghai">123</el-option>
          <el-option label="北京" value="beijing"></el-option>
          <el-option label="杭州" value="hangzhou"></el-option>
        </el-select>   

        <!-- 时间 -->
        <div class="block" >
          <span class="demonstration"></span>
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
          <!-- 上下架 -->
         <el-select v-model="formInline.region" placeholder="上下架">
          <el-option label="已上架" value="up"></el-option>
          <el-option label="已下架" value="down"></el-option>

        </el-select>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  </el-tabs>
  <div class="list-title">
    <span>商品总数:<i>9001</i> |</span>
    <span>已上架是商品:<i>8900</i> |</span>
    <span>已下架商品:<i>101</i></span>
  </div>


</div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
      formInline: {
          user: '',
          region: ''
        },

        //时间选择
         pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: ''
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    onSubmit() {
        console.log('submit!');
      }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
  .main {
    position: relative;
    background-color:#fff;
    height: 100%;
  el-tabs {
    el-tab-pane {

    }
  }

  .list-title {
    position: absolute;
      top: 15px;
      right: 10px;
    span {
      font-size: 9px;
      i {
        color: red;
      }
    }
  }
  .block{
      display: inline-block;
  }
  .list-select{
    input{
      height: 10px;
    }
  }
}
  
</style>