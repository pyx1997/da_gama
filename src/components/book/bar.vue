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
                    data: depart,
                    axisLabel: {
                        interval:0,
                        rotate:40
                    },
                    splitLine: {show: false}
                },
                yAxis: {
                    splitLine: {show: false}
                },
                series: [{
                    barWidth:26,
                    type: 'bar',
                    data: seriesData
                }],
                grid: {
                    height: "60%",
                    top: 30
                }
            } 
            this.$echarts.init(dom).setOption(option)
        },
        getList() {
            this.$http.post('/index/djamaecharts/serviceman').then(res => {
                if(res.status == 200 && res.data.ret == 200) {
                    // console.log(res.data.data)
                    // this.depart = res.data.data.depart;
                    // this.seriesData = res.data.data.teusum
                    this.draw(res.data.data.depart,res.data.data.teusum)
                    
                }else {
                    this.$message({
                        message: '请求数据失败，请刷新页面',
                        type: 'warning'
                    })
                }
            }).catch(() => {
                this.$message({
                    message: '连接服务器失败，未获取到数据',
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