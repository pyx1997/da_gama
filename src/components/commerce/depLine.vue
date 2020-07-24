<template>
    <div class="wrap flex-col">
        <div class="row-ac select">
            <el-radio v-model="select" label="1" @change="clickRadio">全选</el-radio>
            <el-radio v-model="select" label="0" @change="clickRadio">全不选</el-radio>
        </div>
        <div id="depLine" class="echartsBox">

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            startyear: '',
            endyear: '',
            formatterData: [],
            selected: '',
            select: '1',
            week: '',
            series: '',
            areamanager: ''
        }
    },
    props: ['timeValue','comTime'],
    mounted() {
        // this.draw()
        this.getList()
    },
    watch: {
        timeValue() {
            this.selectDate()
        },
        comTime() {
            this.selectComMon()
        }
        // routearea(newValue,oldValue) {
        //     // this.getList()
        // }
    },
    methods: {
        clickRadio() {
            if(this.select == 1) {
                for(var key in this.selected) {
                    this.$set(this.selected,key,true)
                } 
            }else {
                for(var key in this.selected) {
                    this.$set(this.selected,key,false)
                } 
            }
            this.draw(this.week,this.areamanager,this.series,this.selected)
        },
        selectComMon() {
            if(!this.comTime){
                this.endyear = ''
                this.startyear = ''
            }else {
                this.startyear = this.changeMonth(this.comTime[0])
                this.endyear = this.changeMonth(this.comTime[1])
                var year1 = parseInt(this.startyear.split('-')[0])
                var year2 = parseInt(this.endyear.split('-')[0])
                var month1 = parseInt(this.startyear.split('-')[1])
                var month2 = parseInt(this.endyear.split('-')[1])
                if(year1 == year2) {
                    if((month2-month1) != 1) {
                        this.$message({
                            message: '月份选择有误，必须选择相邻两个月',
                            type: 'error'
                        })
                        return
                    }
                }else {
                    if((year2-year1) !=1 ) {
                        this.$message({
                            message: '月份选择有误，必须选择相邻两个月',
                            type: 'error'
                        })
                        return
                    }else {
                        if(month1 != 12 || month2 != 1) {
                            this.$message({
                                message: '月份选择有误，必须选择相邻两个月',
                                type: 'error'
                            })
                            return
                        }
                    }
                }
            }
            this.getList()
            // console.log(this.startyear,this.endyear)
            // console.log(this.comTime)
        },
        checkNum(num) {
            if(num < 10) {
                return '0'+num
            }else {
                return num
            }
        },
        changeMonth(str) {
            // console.log(str.getFullYear()+'-'+this.checkNum(str.getMonth()+1))
            return str.getFullYear()+'-'+this.checkNum(str.getMonth()+1)
        },
        draw(week,areamanager,series,selected) {
            var dom = document.getElementById('depLine')
            var self = this
            var option = {
                color: ['#dd6b66','#759aa0','#ffb980','#8dc1a9','#edafda','#ea7e53','#eedd78','#73a373','#5ab1ef','#7289ab', '#d87a80','#f49f42','#c23531','#93b7e3', '#715c87', '#d48265', '#91c7ae','#749f83', '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                xAxis: {
                    // boundaryGap: false,
                    name: '(周数)',
                    nameTextStyle: {
                        fontSize: 12,
                        color:'#333333',
                        fontWeight: 'bold'
                    },
                    data: week,
                    axisLabel: {
                        interval:0,
                        // rotate:40
                    },
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
                    data: areamanager,
                    itemHeight: 10,
                    selected: selected
                    // itemWidth: 20,
                },
                tooltip: {
                    trigger: 'axis',
                    formatter:function(a) {
                        var res = ''
                        var sum1 = 0
                        var sum2 = 0
                        var sum = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                        var flag = false
                        var weeks = a[0].axisValue.split('/')
                        if(!weeks) return
                        var peoNum = a.length / weeks.length
                        for(var i = 1;i<weeks.length;i++) {
                            res += `${weeks[i-1]}/${weeks[i]}周：<br/>`
                            for(var j=((i-1)*peoNum);j<(i-1)*peoNum+peoNum;j++) {
                                res += a[j].marker + a[j].seriesName+ ' : '+ (((a[j+peoNum].value-a[j].value)/a[j].value)*100).toFixed(2)+'%<br/>'
                                sum[i-1] += a[j].value
                                sum[i] += a[j+peoNum].value
                            }
                            // res +='合计：'+weeks[i-1]+'周 ~ '+sum[i-1]+'  '+weeks[i]+'周 ~ ' +sum[i] +' 增长 ~ '+((sum[i]-sum[i-1])/sum[i-1]*100).toFixed(2)
                            res +='合计：'+((sum[i]-sum[i-1])/sum[i-1]*100).toFixed(2)+'%'
                            sum[i-1] = 0
                            sum[i] = 0
                        }
                        // console.log('a=',a)
                        // console.log(self.formatterData)
                        // a.forEach((item,index) => {
                        //     var weeks = item.axisValue.split('/')
                        //     // months.forEach((item,index) => {
                        //     //     res += `${item}周`
                        //     // })
                        //     var len = a.length / weeks.length
                        //     var idx = parseInt(index / len)
                        //     sum[idx] += item.value
                        //     if(index%len == 0) {
                        //         res += `${weeks[idx]}周<br/>`
                        //     }
                        //     var name = item.seriesName.split('(')[0]
                        //     var mark = index-idx*len
                        //     // if(mark == len) {
                        //     //     mark = index-idx*len
                        //     // }
                        //     name += `(${self.formatterData[idx][mark]})`
                        //     res += `${item.marker} ${name} : ${item.value}<br/>`
                        //     if(index!=0 && ((index+1)%len == 0)) {
                        //         res += `合计: ${sum[idx]}<br/><br/>`
                        //     }
                            
                        // })
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
                    top: 60,
                    right: 46,
                },
                series: series,
                grid: {
                    height: "70%",
                    top: 100,
                }
            }
            this.$echarts.init(dom).setOption(option,true)
        },  
        
        getList() {
            this.$http.post('/index/djamatradeecharts/third',{routearea: '欧洲',startyear: this.startyear,endyear: this.endyear}).then(res => {
                // console.log(res)
                if(res.status == 200 && res.data.ret == 200) {
                    // console.log(res.data.data)
                    if(res.data.data instanceof Array) {
                        this.$message({
                            message: '数据为空',
                            type: 'warning'
                        })
                        return
                    }
                    
                    this.select = '1'
                    this.formatterData = res.data.data.areamanagerteusum
                    // console.log(this.formatterData)
                    this.$emit('getCom',res.data.data.years.join(' ~ '))
                    this.$emit('getDepweekTotal',res.data.data.teu)
                    var selected = {}
                    var week = []
                    res.data.data.weeks.forEach((item,index) => {
                        item.forEach((item1,index1) => {
                            if(index == 0) {
                                week.push(item1)
                            }else{
                                week[index1] += `/${item1}`
                            }
                        })
                    })
                    // console.log(week)
                    
                    var areamanager = res.data.data.countryarealist
                    areamanager.forEach((item,index) => {
                        selected[item] = true
                    })
                    var series = []
                    res.data.data.weeksx.forEach((item,index) => {
                        item.forEach((item1,index1) => {
                            series.push({
                                barWidth:22,
                                name: areamanager[index1],
                                type: 'bar',
                                stack: `stack${index}`,
                                data: item1,
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
                    })
                    this.areamanager = areamanager
                    this.week = week
                    this.selected = selected
                    this.series = series
                    this.draw(week,areamanager,series,selected)
                }else {
                    this.$message({
                        message: '获取数据失败',
                        type: 'warning'
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
.select {
    padding-bottom: 10px;
}
.echartsBox {
    position: relative;
    z-index: 10000;
    flex: 1
}
.wrap {
    position: relative;
}
</style>