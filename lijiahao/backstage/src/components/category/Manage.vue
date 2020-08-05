<!--  -->
<template>
    <div class>
        <div class="item-manage">
            <div class="manage-top">
                <img src="../../../public/images/top.jpg" alt="">
            </div>
            <div class="manage-middle">
                <div class="manage-middle-left" >
                    <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
                        <el-form-item label="活动所属地区"  label-width='100px'>
                            <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
                                <el-option label="北京" value="beijing"></el-option>
                                <el-option label="上海" value="shanghai"></el-option>
                                <el-option label="广州" value="guangzhou"></el-option>
                                <el-option label="深圳" value="shenzhen"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="活动名称" label-width='100px'>
                            <el-input v-model="sizeForm.name1" placeholder="活动名称"></el-input>
                        </el-form-item>
                        <el-form-item label="活动副标题" label-width='100px'>
                            <el-input v-model="sizeForm.name2" placeholder="活动副标题"></el-input>
                        </el-form-item>
                        <el-form-item label="活动价格描述" label-width='100px'>
                            <el-input v-model="sizeForm.name3" placeholder="活动价格描述"></el-input>
                            <span>例如: 8折起 119元起  5000元封顶</span>
                        </el-form-item>
                    </el-form>
                </div>
                <!--      <div class="manage-middle-right">-->
                <!--        <el-upload-->
                <!--          class="upload-demo"-->
                <!--          drag-->
                <!--          action="https://jsonplaceholder.typicode.com/posts/"-->
                <!--          multiple>-->
                <!--          <i class="el-icon-upload"></i>-->
                <!--          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
                <!--          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
                <!--        </el-upload>-->
                <!--      </div>-->
                <el-row class="bottom-btn-submit">
                    <el-button type="warning" >发布活动</el-button>
                </el-row>
            </div>
            <div class="manage-bottom">
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            label="日期"
                            width="180">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.date }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="姓名"
                            width="180">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>姓名: {{ scope.row.name }}</p>
                                <p>住址: {{ scope.row.address }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                radio: '1',
                sizeForm: {
                    name1: '',
                    name2: '',
                    name3: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                },
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            };
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        }

    };
</script>
<style lang='less' scoped>
    div.item-manage {
        padding-left: 40px;
        padding-right: 40px;
        width: 90%;
        height: 100%;
        background: #fff;
        margin-left: 10px;
        overflow: hidden;
        div.manage-top {
            margin: 0 auto;
            width: 300px;
            img {
                display: block;
            }
        }
        div.manage-middle {
            padding-bottom: 10px;
            overflow: hidden;
            border-bottom: 1px solid #ccc;
            div.manage-middle-left {
                width: 500px;
                /*float: left;*/
                span {
                    color: #ccc;
                    font-size: 12px;
                }
            }
            div.manage-middle-right {
                float: right;
                margin-right: 50px;
            }
        }
        .manage-bottom {
            .bottom-chose-type {
                margin: 20px 0;
                font-size: 14px;
                text-align: center;
            }
            .bottom-all-imfo {
                display: flex;
                justify-content: space-between;

                .bottom-imfo {
                    width: 100px;
                    height: 130px;
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid #ccc;
                    font-size: 14px;
                    margin-bottom:20px;
                }
            }
            .el-row {
                text-align: center;
            }
            .bottom-chose-all {
                width:100%;
                height: 20px;
                margin-top: 10px;
                display: flex;
                justify-content: center;
                .bottom-chose-product {
                    font-size: 14px;
                    margin-right:40px;
                    span {
                        color: rgb(242,155,16);
                    }
                }
                .bottom-chose-business {
                    font-size: 14px;
                    span {
                        color: rgb(242,155,16);
                    }
                }
            }
            .bottom-btn-submit {
                margin-bottom: 15px;
            }

        }
    }
</style>
