<template>
    <div class="home">
        <div class="top">
            <div id="main" style="width: 600px;height:400px;"></div>
        </div>
        <div class="bottom">
            <div class="btm btm-1">
                <i class="el-icon-user-solid"></i>
                <p>{{count}}</p>
                <span>总用户人数</span>
            </div>
            <div class="btm btm-2">
                <i class="el-icon-box"></i>
                <p>{{normal}}</p>
                <span>普通用户</span>
            </div>
            <div class="btm btm-3">
                <i class="el-icon-pie-chart"></i>
                <p>{{gold}}</p>
                <span>黄金会员</span>
            </div>
            <div class="btm btm-4">
                <i class="el-icon-data-line"></i>
                <p>{{sup}}</p>
                <span>超级会员</span>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState,mapActions} from 'vuex'

    export default {
        data() {
            return {
                normal: 0,
                gold: 0,
                sup: 0,
                option:{
                    title: {
                        text: '用户人数'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        show: true,
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['总用户人数', '普通用户', '黄金会员', '超级会员']
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    series: [
                        {
                            name: '客户数量',
                            type: 'line',
                            data: null,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            }
                        }
                    ]
                }
            }
        },
        methods: {
            ...mapActions(['getData']),

            getEchart(){
                var myChart = this.$echarts.init(document.getElementById('main'));
                // 绘制图表
                this.option.series[0].data = [this.count, this.normal, this.gold, this.sup]
                myChart.setOption(this.option)
            },
            getUser(){
                this.userData.forEach(item=>{
                    if(item.power === '超级管理员'){
                        this.sup++
                    }else if(item.power === '普通用户'){
                        this.normal++
                    }else {
                        this.gold++
                    }
                })

            }
        },
        computed: {
            ...mapState(['userData', 'count'])
        },
        watch: {
            userData(newVal) {
                if (newVal.length > 0) {
                    this.getUser();
                    this.getEchart()
                }
            }
        },
        created() {
            // console.log(this.userData)
        },
        mounted() {
            this.getData({pageNum: 1, limit: this.count})

        }
    }
</script>

<style lang="less" scoped>
    .home{
        .top{
            background-color: #fff;
            min-width: 700px;
            padding-top: 20px;
            display: flex;
            justify-content: space-around;
            .content{
                width: 300px;
                height: 100px;
                border-radius: 10px;

                display: flex;
                padding: 0 70px;
                justify-content: space-evenly;
                align-items: center;
                box-sizing: border-box;
                i{
                    color: white;
                    font-size: 50px;
                }
                span{
                    color: white;
                }
            }
        }
        .bottom{
            background-color: #fff;
            min-width: 700px;
            margin-top: 20px;
            height: 200px;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            .btm{
                border-left: 5px solid #ccc;
                box-sizing: border-box;
                padding-left: 15px;
                width: 200px;
                height: 100px;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                i{
                    font-size: 35px;
                    color: rgba(180,222,150);
                }
                p{
                    font-size: 20px;
                    line-height: 40px;
                    color: rgba(180,222,150);
                }
                span{
                    font-size: 14px;
                }
            }
            .btm-1 i{
                font-size: 50px;
            }
        }
    }
</style>