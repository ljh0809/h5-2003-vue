<!--  -->
<template>
  <div class>
    <div class="main">
      <el-tabs type="border-card">
        <el-tab-pane label="全部商品"></el-tab-pane>
        <el-tab-pane label="已上架"></el-tab-pane>
        <el-tab-pane label="已下架"></el-tab-pane>

        <div class="list-select">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-select v-model="value2" placeholder="所有类别" size="mini">
              <el-option label="贵的" value="expensive"></el-option>
              <el-option label="便宜的" value="cheap"></el-option>
              <el-option label="又贵又便宜的" value="weird"></el-option>
            </el-select>
            <el-select v-model="value3" placeholder="地区选择" size="mini">
              <el-option label="上海" value="shanghai"></el-option>
              <el-option label="北京" value="beijing"></el-option>
              <el-option label="杭州" value="hangzhou"></el-option>
            </el-select>

            <!-- 时间 -->
            <div class="block">
              <span class="demonstration"></span>
              <el-date-picker
                v-model="value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
              ></el-date-picker>
            </div>
            <!-- 上下架 -->
            <el-select v-model="value4" placeholder="上下架" size="mini">
              <el-option label="已上架" value="up"></el-option>
              <el-option label="已下架" value="down"></el-option>
            </el-select>

            <el-form-item>
              <el-button type="primary" @click="onSubmit" size="mini" class="list-title-sbm">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 中间部分 -->
        <div class="list-content">
          <el-row class="list-content-title">
            <el-col :span="6">
              <div class="grid-content bg-purple-dark">
                <el-checkbox v-model="checked">商品标题</el-checkbox>
              </div>
            </el-col>
            <el-col :span="3">
              <div>所属分类</div>
            </el-col>
            <el-col :span="4">
              <div>所属材料商</div>
            </el-col>
            <el-col :span="2">
              <div>区域</div>
            </el-col>
            <el-col :span="3">
              <div>上下架</div>
            </el-col>
            <el-col :span="4">
              <div>上传时间</div>
            </el-col>
            <el-col :span="2">
              <div>操作</div>
            </el-col>
          </el-row>
          <!-- 商品循环 -->
          <div class="list-content-product">
            <ul>
              <!-- //loop -->
              <li>
                <el-row class="list-content-loop">
                  <el-col :span="6">
                    <div class="grid-content bg-purple-dark">
                      <el-checkbox></el-checkbox>

                      <div class="list-content-loop-img">
                        <img src="../../assets/logo.png" alt />
                      </div>

                      <span>阳台洗衣柜带搓衣板 不锈钢浴室柜组合 现代简约落地式卫浴柜洗衣池</span>
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div>瓷砖>抛轴砖</div>
                  </el-col>
                  <el-col :span="4">
                    <div>汉斯格雅旗舰店</div>
                  </el-col>
                  <el-col :span="2">
                    <div>苏州</div>
                  </el-col>
                  <el-col :span="3">
                    <div>已下架</div>
                  </el-col>
                  <el-col :span="4">
                    <div>2020/10/21&nbsp;24:00:00</div>
                  </el-col>
                  <el-col :span="2">
                    <div>
                      <a href="#" class="list-content-loop-look">预览</a>
                    </div>
                  </el-col>
                </el-row>
              </li>
              <!-- //loop -->
              <li>
                <el-row class="list-content-loop">
                  <el-col :span="6">
                    <div class="grid-content bg-purple-dark">
                      <el-checkbox></el-checkbox>

                      <div class="list-content-loop-img">
                        <img src="../../assets/logo.png" alt />
                      </div>

                      <span>阳台洗衣柜带搓衣板 不锈钢浴室柜组合 现代简约落地式卫浴柜洗衣池</span>
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div>瓷砖>抛轴砖</div>
                  </el-col>
                  <el-col :span="4">
                    <div>汉斯格雅旗舰店</div>
                  </el-col>
                  <el-col :span="2">
                    <div>苏州</div>
                  </el-col>
                  <el-col :span="3">
                    <div>已下架</div>
                  </el-col>
                  <el-col :span="4">
                    <div>2020/10/21&nbsp;24:00:00</div>
                  </el-col>
                  <el-col :span="2">
                    <div>
                      <a href="#" class="list-content-loop-look">预览</a>
                    </div>
                  </el-col>
                </el-row>
              </li>
              <!-- //loop -->
              <li>
                <el-row class="list-content-loop">
                  <el-col :span="6">
                    <div class="grid-content bg-purple-dark">
                      <el-checkbox></el-checkbox>

                      <div class="list-content-loop-img">
                        <img src="../../assets/logo.png" alt />
                      </div>

                      <span>阳台洗衣柜带搓衣板 不锈钢浴室柜组合 现代简约落地式卫浴柜洗衣池</span>
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div>瓷砖>抛轴砖</div>
                  </el-col>
                  <el-col :span="4">
                    <div>汉斯格雅旗舰店</div>
                  </el-col>
                  <el-col :span="2">
                    <div>苏州</div>
                  </el-col>
                  <el-col :span="3">
                    <div>已下架</div>
                  </el-col>
                  <el-col :span="4">
                    <div>2020/10/21&nbsp;24:00:00</div>
                  </el-col>
                  <el-col :span="2">
                    <div>
                      <a href="#" class="list-content-loop-look">预览</a>
                    </div>
                  </el-col>
                </el-row>
              </li>
              <!-- //loop -->
              <li>
                <el-row class="list-content-loop">
                  <el-col :span="6">
                    <div class="grid-content bg-purple-dark">
                      <el-checkbox></el-checkbox>

                      <div class="list-content-loop-img">
                        <img src="../../assets/logo.png" alt />
                      </div>

                      <span>阳台洗衣柜带搓衣板 不锈钢浴室柜组合 现代简约落地式卫浴柜洗衣池</span>
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div>瓷砖>抛轴砖</div>
                  </el-col>
                  <el-col :span="4">
                    <div>汉斯格雅旗舰店</div>
                  </el-col>
                  <el-col :span="2">
                    <div>苏州</div>
                  </el-col>
                  <el-col :span="3">
                    <div>已下架</div>
                  </el-col>
                  <el-col :span="4">
                    <div>2020/10/21&nbsp;24:00:00</div>
                  </el-col>
                  <el-col :span="2">
                    <div>
                      <a href="#" class="list-content-loop-look">预览</a>
                    </div>
                  </el-col>
                </el-row>
              </li>
              <!-- //loop -->
              <li>
                <el-row class="list-content-loop">
                  <el-col :span="6">
                    <div class="grid-content bg-purple-dark">
                      <el-checkbox></el-checkbox>

                      <div class="list-content-loop-img">
                        <img src="../../assets/logo.png" alt />
                      </div>

                      <span>阳台洗衣柜带搓衣板 不锈钢浴室柜组合 现代简约落地式卫浴柜洗衣池</span>
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div>瓷砖>抛轴砖</div>
                  </el-col>
                  <el-col :span="4">
                    <div>汉斯格雅旗舰店</div>
                  </el-col>
                  <el-col :span="2">
                    <div>苏州</div>
                  </el-col>
                  <el-col :span="3">
                    <div>已下架</div>
                  </el-col>
                  <el-col :span="4">
                    <div>2020/10/21&nbsp;24:00:00</div>
                  </el-col>
                  <el-col :span="2">
                    <div>
                      <a href="#" class="list-content-loop-look">预览</a>
                    </div>
                  </el-col>
                </el-row>
              </li>
              <!-- //loop -->
              <li>
                <el-row class="list-content-loop">
                  <el-col :span="6">
                    <div class="grid-content bg-purple-dark">
                      <el-checkbox></el-checkbox>

                      <div class="list-content-loop-img">
                        <img src="../../assets/logo.png" alt />
                      </div>

                      <span>阳台洗衣柜带搓衣板 不锈钢浴室柜组合 现代简约落地式卫浴柜洗衣池</span>
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div>瓷砖>抛轴砖</div>
                  </el-col>
                  <el-col :span="4">
                    <div>汉斯格雅旗舰店</div>
                  </el-col>
                  <el-col :span="2">
                    <div>苏州</div>
                  </el-col>
                  <el-col :span="3">
                    <div>已下架</div>
                  </el-col>
                  <el-col :span="4">
                    <div>2020/10/21&nbsp;24:00:00</div>
                  </el-col>
                  <el-col :span="2">
                    <div>
                      <a href="#" class="list-content-loop-look">预览</a>
                    </div>
                  </el-col>
                </el-row>
              </li>
            </ul>
          </div>
        </div>

        <!-- 底部 -->
        <div class="list-footer">
          <el-row>
            <el-checkbox v-model="checked">全选</el-checkbox>
            <el-button type="warning" round size="mini">删除</el-button>
            <el-button type="success" round size="mini">上架</el-button>
            <el-button type="info" round size="mini">下架</el-button>

            <span class="list-footer-span">
              <i>120</i>个商品
            </span>
            <el-pagination
              class="list-footer-pagi"
              background
              layout="prev, pager, next"
              :total="50"
            ></el-pagination>
          </el-row>
        </div>
      </el-tabs>
      <div class="list-title">
        <span>
          商品总数:
          <i>9001</i> |
        </span>
        <span>
          已上架是商品:
          <i>8900</i> |
        </span>
        <span>
          已下架商品:
          <i>101</i>
        </span>
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
        user: "",
        region: "",
      },

      //时间选择
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      checked: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
.main {
  position: relative;
  background-color: #fff;
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
  .block {
    display: inline-block;
  }
  .list-select {
  }
  .list-title-sbm {
    position: absolute;
    right: -80px;
  }
  //中间部分
  .list-content {
    .list-content-title {
      padding: 10px;
      font-size: 12px;
      background-color: rgb(235, 235, 235);
    }
    .list-content-product {
      background-color: #fff;
      margin-bottom: 20px;
      ul li {
      }
      //循环数据
      .list-content-loop {
        line-height: 70px;
        font-size: 12px;
        font-weight: 600;
        .grid-content {
          vertical-align: middle;
          .list-content-loop-img {
            display: inline-block;
            width: 35px;
            height: 50px;
            vertical-align: middle;
            margin: 0 10px;
            img {
              display: inline-block;
              width: 100%;
              height: 100%;
            }
          }
          span {
            display: inline-block;
            font-size: 9px;
            line-height: 12px;
            width: 180px;
            font-weight: 800;
          }
        }
        .list-content-loop-look {
          color: rgb(250, 169, 82);
        }
      }
    }
  }

  //底部
  .list-footer {
    overflow: hidden;
    position: relative;
    .el-button--mini {
      font-size: 8px;
    }
    .list-footer-span {
      position: absolute;
      font-size: 16px;
      right: 340px;
      bottom: 3px;
    }
    .list-footer-pagi {
      position: absolute;
      display: inline-block;
      right: 20px;
      bottom: 0;
    }
  }
}
</style>