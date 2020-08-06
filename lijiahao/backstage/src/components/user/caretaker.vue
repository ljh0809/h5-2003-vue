<template>
    <div class="uso">
        <div class="uso-bar">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="uso-table">
            <div class="table-header">
                <el-button @click="handleDeleteAll" class="delete mr10" type="primary">
                    <i class="el-icon-delete"></i>批量删除
                </el-button>
            </div>
            <div class="table-body">
                <el-table
                        ref="multipleTable"
                        border
                        class="table"
                        header-cell-class-name="table-header"
                        :data="userData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column prop="name" label="用户名" width="120" align="center"></el-table-column>
                    <el-table-column prop="sex" label="性别" width="120" align="center"></el-table-column>
                    <el-table-column prop="age" label="年龄" width="120" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="tel" label="联系方式" align="center"></el-table-column>
                    <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
                    <el-table-column prop="qq" label="QQ" align="center"></el-table-column>
                    <el-table-column prop="power" label="权限" align="center"></el-table-column>
                    <el-table-column prop="registerTime" label="注册时间" width="120" align="center"></el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button
                                    type="text"
                                    data-con="el-icon-edit"
                                    @click="handleEdit(scope.row)"
                            >编辑
                            </el-button>
                            <el-button
                                    type="text"
                                    data-con="el-icon-delete"
                                    class="red"
                                    @click="handleDelete(scope.row.name)"
                            >删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        class="paging"
                        background
                        layout="prev, pager, next"
                        :total="count"
                        @current-change="changePage"
                        @prev-click="previous"
                        @next-click="nextPage"
                        :page-size="5"
                        :current-page.sync ="pageNum"
                ></el-pagination>
            </div>
        </div>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input  v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input  v-model="form.sex" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth">
                    <el-input  v-model="form.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth">
                    <el-input  v-model="form.tel" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input  v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限" :label-width="formLabelWidth">
                    <el-input  v-model="form.power" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import {mapState,mapActions} from 'vuex';
    export default {
        //import引入的组件需要注入到对象中才能使用
        components: {},
        data() {
            //这里存放数据
            return {
                text: "",
                value: "",
                // tableData: [],
                multipleSelection: [],
                pageNum: 1,
                // count: 0,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form: {
                    name: '',
                    sex: '',
                    age: '',
                    tel: '',
                    email: '',
                    power: ''
                },
            };
        },
        //监听属性 类似于data概念
        computed:
            mapState(['personData','userData','count'])
        ,
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            //获取个人数据和所有用户数据
            ...mapActions(['getPower','getData']),

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //删除数据
            handleDelete(name) {
                this.personData.power === '超级管理员' ? this.deleteData(name) :this.$message({
                  message:"您的权限不足！",
                  type:"warning"
              });
            },
            //弹出框修改数据
            handleEdit(data) {
                // console.log(data);
                if(this.personData.power === '超级管理员'){
                    this.form = data;
                    this.dialogFormVisible = true;
                }else {
                    this.$message({
                        message:"您的权限不足！",
                        type:"warning"
                    });
                    return false
                }

            },
            handleSubmit() {
                    this.dialogFormVisible = false;
                    this.axios({
                        url:'/api/changeUserData',
                        method:'post',
                        data: {
                            user: this.form.name,
                            ...this.form
                        }
                    }).then(res => {
                        this.$alert(res.data.msg, '提示', {
                            confirmButtonText: '确定',
                            callback: () => {
                                this.getData({pageNum:this.pageNum,limit:5});
                            }
                        });
                    })


            },
            handleDeleteAll() {
               if(this.personData.power === '超级管理员'){
                   const deleteArr = this.$refs.multipleTable.selection;
                   if (deleteArr.length < 1) {
                       return;
                   }
                   const data = deleteArr.map(item => {
                       return item.name;
                   });
                   this.deleteData(data);
               }else {
                   this.$message({
                       message:"您的权限不足！",
                       type:"warning"
                   });
                   return false
               }
            },
            //点击上一页渲染数据
            previous(){
                this.pageNum--;
                this.getData({pageNum:this.pageNum,limit:5});
            },
            //点击下一页渲染数据
            nextPage(){
                this.pageNum++;
                this.getData({pageNum:this.pageNum,limit:5});
            },
            changePage(e){
                this.pageNum = e;
                // console.log(this.pageNum);
                this.getData({pageNum:this.pageNum,limit:5});
            },

            //删除数据
            deleteData(name) {
                this.axios({
                    url:'/api/deleteUserData',
                    method:'post',
                    data: {
                        user: name
                    }
                }).then(res => {
                    this.getData({pageNum:this.pageNum,limit:5});

                    this.$alert(res.data.msg, '提示', {
                        confirmButtonText: '确定',
                    });
                })
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
        mounted() {
            this.getData({pageNum:this.pageNum,limit:5});
            this.getPower()
        }
    };
</script>
<style lang="less" scoped>
    .uso {
        .uso-bar {
            margin: 10px 0;
        }

        .uso-table {
            padding: 30px;
            background: #fff;

            .table-header {
                margin-bottom: 20px;

                .handle-input {
                    width: 300px;
                    display: inline-block;
                }

                .handle-select {
                    padding-right: 30px;
                }

                .select {
                    width: 120px;
                }

                .mr10 {
                    margin-right: 10px;
                }
            }

            .table-body {
                .paging {
                    margin-top: 20px;
                }

            }
        }
    }
</style>