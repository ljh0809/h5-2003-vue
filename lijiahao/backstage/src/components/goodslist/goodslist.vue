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
                <el-table :data="list">
                    <el-table-column prop="ProductName" label="商品标题" width="400" height="36"></el-table-column>
                    <el-table-column prop="ProductNum" label="货号" width="100"></el-table-column>
                    <el-table-column prop="Region" label="区域" width="100"></el-table-column>
                    <el-table-column prop="Status" label="上下架" width="90"></el-table-column>
                    <el-table-column prop="PresentPrice" label="价格" width="90"></el-table-column>
                    <el-table-column prop="JoiningTime" label="上传时间△" width="140"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="alter(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="open(scope.$index, scope.row)">删除</el-button>
                            <el-button size="mini" @click="statusChange(scope.$index, scope.row)">change</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 底部 -->
                <div class="list-footer">
                    <el-row>
                        <el-pagination
                                class="list-footer-pagi"
                                background
                                layout="prev, pager, next, sizes, total"
                                :total="total"
                                :page-size="pagesize"
                                :page-sizes="[6]"
                                :current-page="current"
                                @current-change="handleCurrentChange"
                        ></el-pagination>
                    </el-row>
                </div>
            </el-tabs>

            <!-- 小title -->
            <div class="list-title">
        <span>
          商品总数:
          <i>{{total}}</i> |
        </span>
                <span>
          已上架是商品:
          <i>{{up}}</i> |
        </span>
                <span>
          已下架商品:
          <i>{{down}}</i>
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

        methods: {
            //查询
            onSubmit() {

            },
            getlist() {
                this.axios
                    .get("/api/product/list", {
                        params: {
                            _page: this.current,
                            _limit: 6,
                        },
                    })
                    .then((data) => {
                        //   console.log(data);
                        this.list = data.data.data;
                        //   console.log(this.list);
                        this.total = data.data.count;

                        this.list.map(function (item) {
                            item.Status === 1
                                ? (item.Status = "已上架")
                                : (item.Status = "已下架");
                        });
                        //修改时间戳
                        this.list.forEach((item) => {
                            item.JoiningTime = new Date(parseInt(item.JoiningTime))
                                .toLocaleString()
                                .replace(/:\d{1,2}$/, " ");
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            handleCurrentChange(cpage) {
                this.current = cpage;
                this.getlist();
            },
            //修改状态
            statusChange(index, row) {
                console.log(row);
                if (row.Status === "已上架") {
                    this.axios
                        .post("/api/product/changeStatus", {
                            product_num: row.ProductNum,
                            status: 5,
                        })
                        .then((res) => {
                            console.log(res);
                            this.getlist();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else if (row.Status === "已下架") {
                    this.axios
                        .post("/api/product/changeStatus", {
                            product_num: row.ProductNum,
                            status: 1,
                        })
                        .then((res) => {
                            console.log(res);
                            this.getlist();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            },
            //修改数据
            handleEdit(index, row, _value) {
                console.log(index, row);
                let num = _value - 0;
                this.axios
                    .post("/api/product/modifiedProduct", {
                        product_num: row.ProductNum,
                        product_name: row.ProductName,
                        original_price: row.OriginalPrice,

                        present_price: num,
                    })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                this.getlist();
            },
            alter(index, row) {
                this.$prompt("请自己输入商品价格", "恭喜中奖", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                })
                    .then(({ value }) => {
                        this.$message({
                            type: "success",
                            message: "修改成功",
                        });
                        let _value = value - 0;
                        this.handleEdit(index, row, _value);
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "取消输入",
                        });
                    });
            },
            //删除数据
            open(index, row) {
                console.log(row);
                console.log(row.ProductNum);
                this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        });
                        this.handleDelete(index, row);
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除",
                        });
                    });
            },
            handleDelete(index, row) {
                this.axios.post("/api/product/deleteProduct", {
                    product_num: row.ProductNum,
                });
                this.getlist();
            },
        },
        data() {
            //这里存放数据
            return {
                //分页器的数据
                list: [],
                pagesize: 6,
                current: 1,
                total: 0,

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
        computed: {
            up: function () {
                let num = 0;
                this.list.forEach((i) => {
                    if (i.Status == "已上架") {
                        num++;
                    }
                });
                return num;
            },
            down: function () {
                let num = 0;
                this.list.forEach((i) => {
                    if (i.Status === "已下架") {
                        num++;
                    }
                });
                return num;
            },
        },
        //监控data中的数据变化
        watch: {},
        //方法集合

        //生命周期 - 创建完成（可以访问当前this实例）
        created() {},
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.getlist();
        },
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

        .list-title-sbm {
            position: absolute;
            right: -80px;
        }

        //底部
        .list-footer {
            padding: 10px 0;
            overflow: hidden;
            position: relative;
            //  height: 30px;
            //  line-height: 30px;

            .list-footer-pagi {
                display: inline-block;
            }
        }
    }
</style>