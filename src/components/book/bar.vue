<template>
    <div class="wrap">
        <div id="bar" class="echartsBox">

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // depart: [],
            // seriesData: []
        }
    },
    created() {
        this.getList()
    },
    mounted() {
        // console.log(this.depart,this.seriesData)
        // this.draw(this.depart,this.seriesData)
    },
    methods: {
        draw(depart,seriesData) {
            var dom = document.getElementById('bar')
            // console.log('depart:',depart)
            // console.log("seriesData:",seriesData)
            var option ={
                color: ['#2db7f5','#5d6977','#808bc6','#f9bf00','#7dc856'],
                tooltip: {},
                xAxis: {
                    name: '(业务员)',
                    nameTextStyle: {
                        fontSize: 12,
                        color:'#333333',
                        fontWeight: 'bold'
                    },
                    data: depart,
                    axisLabel: {
                        interval:0,
                        rotate:40
                    },
                    splitLine: {show: false}
                },
                yAxis: {
                    name: '(TEU)',
                    nameTextStyle: {
                        fontSize: 12,
                        color:'#333333',
                        fontWeight: 'bold'
                    },
                    splitLine: {show: false}
                },
                series: [{
                    barWidth:26,
                    type: 'bar',
                    data: seriesData,
                    itemStyle : { 
                        normal: {
                            label : {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#666666'
                                }
                            }
                        }
                    }
                }],
                grid: {
                    height: "60%",
                    top: 34
                }
            } 
            this.$echarts.init(dom).setOption(option)
        },
        getList() {
            this.$http.post('/index/djamaecharts/serviceman').then(res => {
                if(res.status == 200 && res.data.ret == 200) {
                    this.draw(res.data.data.depart,res.data.data.teusum)
                    localStorage.setItem('bookTop10',JSON.stringify({
                        depart: res.data.data.depart,
                        teusum: res.data.data.teusum
                    }))
                    
                }else {
                    if(localStorage.getItem('bookTop10')) {
                        var obj = JSON.parse(localStorage.getItem('bookTop10'))
                        this.draw(obj.depart,obj.teusum)
                    }
                    this.$message({
                        message: '请求数据失败，未获取到最新前日业务员订舱数据',
                        type: 'warning'
                    })
                }
            }).catch(() => {
                if(localStorage.getItem('bookTop10')) {
                    var obj = JSON.parse(localStorage.getItem('bookTop10'))
                    this.draw(obj.depart,obj.teusum)
                }
                this.$message({
                    message: '连接服务器失败，未获取到最新前日业务员订舱数据',
                    type: 'warning'
                })
            })
        }
    }
}
</script>
<style scoped>
.echartsBox {
    height: 100%;
}
</style>