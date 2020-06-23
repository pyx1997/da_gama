<template>
    <div class="wrap">
        <div id="themeRiver" class="echartsBox">

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        this.draw()
    },
    methods: {
        draw() {
            var dom = document.getElementById('themeRiver')
            var option ={
                color: ['#bbcfca','#b5d4f3','#d5f0fd','#5d6977','#808bc6','#2db7f5','#5d6977','#808bc6','#f9bf00','#7dc856'],
                tooltip: {},
                legend: {
                    data: ['深圳业务1部','深圳业务2部','深圳业务3部'],
                    icon: 'pin'
                },
                xAxis: {
                    boundaryGap: false,
                    type: 'category',
                    axisLabel : {//坐标轴刻度标签的相关设置。
                        // clickable:true,//并给图表添加单击事件  根据返回值判断点击的是哪里
                        interval : 0,
                        // formatter : function(params,index){
                        //     if (index % 2 != 0) {
                        //         return '\n\n' + params;
                        //     }
                        //     else {
                        //         return params;
                        //     }
                        // }
                    },
                    data: ["06-14 周日","06-15 周一","06-16 周二","06-17 周三","06-18 周四","06-19 周五","06-20 周六","06-14 周日","06-15 周一","06-16 周二","06-17 周三","06-18 周四","06-19 周五","06-20 周六","06-14 周日","06-15 周一","06-16 周二","06-17 周三","06-18 周四","06-19 周五","06-20 周六"].map((str) => {
                        return str.replace(' ','\n')
                    }),
                    axisLabel: {
                        textStyle: {
                            lineHeight: 18
                        }
                    }
                },
                yAxis: {
                    // type: "value",
                    splitLine: {show: false}
                },
                dataZoom: [
                    {
                        type: 'slider',
                        xAxisIndex: 0,
                        filterMode: 'empty',
                    },
                ],
                series: [
                    {
                        name: '深圳业务1部',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        smooth: true,
                        sampling: 'average',
                        data: [40, 80, 101, 134, 90, 70, 50,40, 80, 101, 134, 90, 70, 50,40, 80, 101, 134, 90, 70, 50]
                    },
                    {
                        name: '深圳业务2部',
                        type: 'line',
                        stack: '总量',
                        sampling: 'average',
                        smooth: true,
                        areaStyle: {},
                        data: [90, 182, 191, 234, 200, 188, 180,40, 80, 101, 134, 90, 70, 50,40, 80, 101, 134, 90, 70, 50]
                    },
                    {
                        name: '深圳业务3部',
                        type: 'line',
                        smooth: true,
                        stack: '总量',
                        sampling: 'average',
                        areaStyle: {},
                        data: [80, 232, 201, 154, 190, 140, 130,40, 80, 101, 134, 90, 70, 50,40, 80, 101, 134, 90, 70, 50]
                    }
                ],
                grid: {
                    height: "54%",
                    top: 40
                }
            } 
            this.$echarts.init(dom).setOption(option)
        }
    }
}
</script>
<style scoped>
.echartsBox {
    height: 100%;
}
</style>