<template>
    <div class="wrap">
        <div id="desLine" class="echartsBox">

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            startday: '',
            endday: ''
        }
    },
    props: ['timeValue'],
    mounted() {
        this.draw()
        this.fun()
        // this.getList()
    },
    watch: {
        timeValue() {
            this.selectDate()
        }
        // routearea(newValue,oldValue) {
        //     // this.getList()
        // }
    },
    methods: {
        draw() {
            var arr = [
                {
                    name: 'BG(121)',
                    value: [11,12,23,34,56]
                },
                {
                    name: 'GE(130)',
                    value: [78,30,26,12,23]
                },
                {
                    name: 'GR(110)',
                    value: [12,10,20,56,30]
                }
                
            ]
            var arr1 = [
                {
                    name: 'BG(121)',
                    value: [10,20,30,26,78]
                },
                {
                    name: 'GE(130)',
                    value: [56,34,10,20,11]
                },
                {
                    name: 'GR(110)',
                    value: [26,78,11,23,34]
                }
            ]
            var series=[]
            arr.forEach((item,index) => {
                var barGap = ''
                var stack = ''
                // if(index%2 == 0) {
                //     stack = 'before'
                //     // barGap = '30%'
                // }else {
                //     stack = 'after'
                //     // barGap = '70%'
                // }
                series.push({
                    barWidth:20,
                    // barGap: barGap,
                    // barCategoryGap:'40%',
                    name: item.name,
                    type: 'bar',
                    stack: 'before',
                    data: item.value,
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#333333',
                                fontWeight: 'bold'
                            }
                        }
                    }
                })
                
            })
            // series.push({
            //     barWidth:0,
            //     name: '合计',
            //     type: 'bar',
            //     // barCategoryGap:'40%',
            //     // stack: 'TUE',
            //     data: [101,92,60,102,119],
            //     // barGap: '-100%',
            //     itemStyle:{ 
            //         normal:{ 
            //             label: {
            //                 show: 'false',
            //                 position: 'top',
            //                 // textStyle:{ color:'#000' },
            //             },
            //             color:'rgba(128, 128, 128, 0)' 
            //         } 
            //     },
            // })
            arr1.forEach((item,index) => {
                var barGap = ''
                var stack = ''
                series.push({
                    barWidth:20,
                    // barGap: barGap,
                    // barCategoryGap:'40%',
                    name: item.name,
                    type: 'bar',
                    stack: 'after',
                    data: item.value,
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        label: {
                            show: true,
                            position: 'inside',
                            textStyle: {
                                color: '#333333',
                                fontWeight: 'bold'
                            }
                        }
                    }
                })
                
            })
            // series.push({
            //     barWidth:0,
            //     name: '合计',
            //     type: 'bar',
            //     // barCategoryGap:'40%',
            //     // stack: 'TUE',
            //     data: [92,64,60,102,119],
            //     // barGap: '-50%',
            //     itemStyle:{ 
            //         normal:{ 
            //             label: {
            //                 show: 'false',
            //                 position: 'top',
            //                 // textStyle:{ color:'#000' },
            //             },
            //             color:'rgba(128, 128, 128, 0)' 
            //         } 
            //     },
            // })
            console.log('series1:',series)
            var dom = document.getElementById('desLine')
            var option = {
                // color: ['#2db7f5','#5d6977','#808bc6','#f9bf00','#7dc856'],
                xAxis: {
                    // boundaryGap: false,
                    name: '(周数)',
                    nameTextStyle: {
                        fontSize: 12,
                        color:'#333333',
                        fontWeight: 'bold'
                    },
                    data: ['23/27','24/28','25/29','26/30','27/31'],
                    axisLabel: {
                        interval:0,
                        // rotate:40
                    },
                    // axisTick: {
                    //     show: false
                    // },
                    splitLine: {show: false}
                },
                // dataZoom: [
                //     {
                //         type: 'slider',
                //         xAxisIndex: 0,
                //         filterMode: 'empty',
                //     },
                // ],
                legend: {
                    icon: 'circle',
                    data: ['BG(121)','GE(130)','GR(110)'],
                    itemHeight: 10,
                    // itemWidth: 20,
                },
                tooltip: {
                    trigger: 'axis',
                    formatter:function(a) {
                        var res = ''
                        var sum1 = 0
                        var sum2 = 0
                        var flag = false
                        // console.log('a=',a)
                        a.forEach((item,index) => {
                            // console.log(item.seriesId,item.seriesId.split(')')[1],item.seriesId.split(')')[1].search(0),item.seriesId.split(')')[1].search(1))
                            if(item.seriesId.split(')')[1].search(1)!=-1 && !flag) {
                                res += `合计 : ${sum1}<br/>`
                                flag = true
                            }
                            if(index == 0) {
                                res += `${item.axisValue}<br/>`
                            }
                            if(item.seriesId.split(')')[1].search(0) != -1) {
                                sum1 += item.value
                            }else if(item.seriesId.split(')')[1].search(1) != -1) {
                                sum2 += item.value
                            }
                            res += `${item.marker} ${item.seriesName} : ${item.value}<br/>`
                            if(index == a.length-1) {
                                res += `合计 : ${sum2}`
                            }
                            
                        })
                        return res
                    }
                },
                yAxis: {
                    name: '(TEU)',
                    nameTextStyle: {
                        fontSize: 12,
                        color:'#333333',
                        fontWeight: 'bold'
                    },
                    splitLine: {show: true}
                },
                toolbox: {
                    show: true,
                    feature: {
                        // dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        // restore: {show: true},
                        saveAsImage: {show: true} 
                    },
                    top: 48,
                    right: 40,
                },
                series: series,
                grid: {
                    height: "70%",
                    top: 90,
                }
            }
            this.$echarts.init(dom).setOption(option)
        },  
        selectDate() {
            if(this.timeValue) {
                this.startday = this.changeDate(this.timeValue[0])
                this.endday = this.changeDate(this.timeValue[1])
            }else {
                this.startday = ''
                this.endday = ''
            }
            
            // console.log('selectDate:',this.startday+' - '+this.endday)
        },
        changeDate(str) {
            // console.log(str.getHour())
            return str.getFullYear()+'-'+this.checkNum(str.getMonth()+1)+'-'+this.checkNum(str.getDate())
        },
        checkNum(num) {
            if(num < 10) {
                return '0'+num
            }else {
                return num
            }
        }, 
        fun() {
            var obj = {
                Andrea: ['国家1','国家2','国家3'],
                Bob: ['国家1','国家2','国家3']
            }
            var arr = []
            for(var i in obj) {
                var str = i+'('
                obj[i].forEach((item,index) => {
                    if(index == obj[i].length-1) {
                        str += item+')'
                    }else {
                        str += item+','
                    }
                    
                })
                arr.push(str)
            }
            console.log('arr=',arr)
        }, 
        getList() {
            this.$http.post('/index/djamatradeecharts/third',{routearea: '地中海'}).then(res => {
                // console.log(res)
                if(res.status == 200 && res.data.ret == 200) {
                    this.$emit('getDesweekTotal',res.data.data.teu)
                    var week = res.data.data.weeksu
                    
                    var country = res.data.data.destinationu
                    country.forEach((item,index) => {
                        country[index] = `${country[index]}(${res.data.data.descountrysum[index]})`
                    })
                    var series = []
                    res.data.data.weekx.forEach((item,index) => {
                        series.push({
                            barWidth:26,
                            name: country[index],
                            type: 'bar',
                            stack: 'TUE',
                            data: item,
                            smooth: true,
                            areaStyle: {},
                            emphasis: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#333333',
                                        fontWeight: 'bold'
                                    }
                                }
                            }
                        })
                    })
                    series.push({
                        barWidth:26,
                        name: '合计',
                        type: 'bar',
                        // stack: 'TUE',
                        data: res.data.data.weeksum,
                        barGap: '-100%',
                        itemStyle:{ 
                            normal:{ 
                                label: {
                                    show: 'true',
                                    position: 'top',
                                    textStyle:{ color:'#000' },
                                },
                                color:'rgba(128, 128, 128, 0)' 
                            } 
                        },
                    })
                    this.draw(week,country,series)
                }else {
                    this.$message({
                        message: '获取数据失败',
                        type: 'waring'
                    })
                }
            }).catch (() => {
                this.$message({
                    message: '服务器连接失败',
                    type: 'warning'
                })
            })
        }
    }
}
</script>
<style scoped>
.echartsBox {
    position: relative;
    z-index: 10000;
    height: 100%;
}
.wrap {
    position: relative;
}
</style>