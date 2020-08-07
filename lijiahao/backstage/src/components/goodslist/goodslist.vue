<!--  -->
<template>
    <div class>
        <div class="main">
            <el-tabs type="border-card" @tab-click="changes">
                <el-tab-pane label="全部商品"></el-tab-pane>
                <el-tab-pane label="已上架"></el-tab-pane>
                <el-tab-pane label="已下架"></el-tab-pane>


                <!-- 中间部分 -->
                <el-table :data="filterArr">
                    <el-table-column prop="ProductName" label="商品标题" width="400" height="36"></el-table-column>
                    <el-table-column prop="ProductNum" label="货号" width="100"></el-table-column>
                    <el-table-column prop="Region" label="区域" width="100"></el-table-column>
                    <el-table-column prop="Status" label="上下架" width="90"></el-table-column>
                    <el-table-column prop="PresentPrice" label="价格" width="90"></el-table-column>
                    <el-table-column prop="JoiningTime" label="上传时间△" width="180"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="alter(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="open(scope.$index, scope.row)">删除</el-button>
                            <el-button size="mini" @click="statusChange(scope.$index, scope.row)">修改状态</el-button>
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
                                :page-sizes="[pagesize]"
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
          <i>{{total}}</i>
        </span>
                <span>
          已上架是商品:
          <i>{{up}}</i>
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
    import {mapActions,mapState} from 'vuex'
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {},
        data() {
            //这里存放数据
            return {
                //分页器的数据
                list: [],
                pagesize: 8,
                current: 1,
                total: 0,
                index:''

            };
        },
        methods: {
            ...mapActions(['getPower']),
            changes(tab){
                this.index = tab.index
            },

            getlist() {
                this.axios
                    .get("/api/product/list", {
                        params: {
                            _page: this.current,
                            _limit: this.pagesize,
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
                // console.log(row);
                if(this.personData.power === '超级管理员' || this.personData.power === '管理员'){
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
                }else {
                    this.$message({
                        message:"您的权限不足！",
                        type:"warning"
                    });
                }

            },
            //封装修改价格
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
            //修改数据
            alter(index, row) {
                if(this.personData.power === '超级管理员' ||this.personData.power === '管理员'){
                    this.$prompt("重新定价", "注意", {
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
                }else {
                    this.$message({
                        message:"您的权限不足！",
                        type:"warning"
                    });
                }

            },
            //删除数据
            open(index, row) {
                // console.log(row);
                // console.log(row.ProductNum);
                if(this.personData.power === '超级管理员' ||this.personData.power === '管理员'){
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
                }else {
                    this.$message({
                        message:"您的权限不足！",
                        type:"warning"
                    });
                }

            },
            handleDelete(index, row) {
                this.axios.post("/api/product/deleteProduct", {
                    product_num: row.ProductNum,
                });
                this.getlist();
            },
        },

        //监听属性 类似于data概念
        computed: {
            ...mapState(['personData']),
            filterArr(){
                if(this.index === '0'){
                    return this.list
                }else if(this.index === '1'){
                    return this.list.filter(item=>item.Status === '已上架')
                }else if(this.index === '2'){
                    return this.list.filter(item=>item.Status === '已下架')
                }
                return  this.list
            },
            up: function () {
                let num = 0;
                this.list.forEach((i) => {
                    if (i.Status === "已上架") {
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
            this.getPower()
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