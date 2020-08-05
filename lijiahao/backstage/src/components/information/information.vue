<template>
    <div class="merchant">
        <div class="nav">
            <el-button type="danger" plain @click="del">批量删除</el-button>
            <span>
        共有商家 :
        <i>{{count}}</i> 家
      </span>
        </div>
        <div class="content">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"

            >
                <el-table-column type="selection" width="55" ></el-table-column>
                <el-table-column prop="ProductNum" label="商家编号" width="120"></el-table-column>
                <el-table-column prop="Region" label="地区" width="120"></el-table-column>
                <el-table-column prop="ProductName" label="地址" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background layout="prev, pager, next"
                        :total='count'
                        :page-size='7'
                        :current-page.sync='pageNum'
                        @current-change='currentChange'
                        @prev-click='prevClick'
                        @next-click='nextClick'
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            // 获取数据
            getData(){
                this.axios({
                    url:'/api/product/list',
                    methods:'get',
                    params:{
                        _page: this.pageNum ,//页数
                        _limit: 7 //每页多少数据
                    }
                }).then(res=>{
                    console.log(res)
                    this.tableData = res.data.data
                    this.count = res.data.count
                })
            },
            // 点击页渲染
            currentChange(){
                this.getData()
            },
            // 点击上一页
            prevClick(){
                this.pageNum--
                this.getData()
            },
            // 点击下一页
            nextClick(){
                this.pageNum++
                this.getData()
            },
            // 删除按钮
            handleDelete(index, row) {
                console.log(row)
                this.axios({
                    url:'/api/product/deleteProduct',
                    method:'post',
                    data:{
                        product_num:row.ProductNum
                    }
                })
                    .then(res=>{
                        console.log(res)
                        this.getData()
                    })
            },
            // 全选
            handleSelectionChange(val){
                this.multipleSelection = val;
                console.log(this.multipleSelection )
            },
            // 批量删除
            del(){
                this.multipleSelection.forEach(item => {
                    this.axios({
                        url:'/api/product/deleteProduct',
                        method:'post',
                        data:{
                            product_num:item.ProductNum
                        }
                    }).then(res=>{
                        console.log(res)
                        this.getData()
                    })
                });
            }

        },
        // 页面初始渲染
        mounted(){
            this.getData()
        },
        data() {
            return {
                tableData: [],
                pageNum: 1,//当前页数
                count: 0, // 总条目数
                multipleSelection:[]
            }
        }
    };
</script>

<style lang="less" scoped>
    .merchant {
        width: 100%;
        height: 100%;
        background-color: #fff;
        .nav {
            padding: 20px;
            display: flex;
            justify-content: space-between;
            span {
                font-size: 14px;
                color: #ccc;
            }
            i {
                font-size: 18px;
                color: rgba(51, 51, 51);
            }
        }
        .content {
            padding: 0 20px;
            .pagination{
                display: flex;
                justify-content: flex-end;
            }
        }
    }
</style>