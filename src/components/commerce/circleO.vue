<template>
    <div class="wrap flex-col">
        <div class="row-ac select">
            <el-radio v-model="select" label="1" @change="clickRadio">全选</el-radio>
            <el-radio v-model="select" label="0" @change="clickRadio">全不选</el-radio>
        </div>
        <div id="circleO" class="echartsBox">

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
            shipowner: '',// 船东
            series: '',
            country: '',
        }
    },
    props: ['monthRange','monthContract'],
    mounted() {
        // this.draw()
        this.getList()
    },
    watch: {
        monthRange() {
            // console.log('selectMonth')
            this.selectComMon()
        },
        monthContract() {
            this.getList()
        }
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
            this.draw(this.country,this.shipowner,this.series,this.selected)
        },
        // 选择月份时
        selectComMon() {
            if(!this.monthRange){
                this.endyear = ''
                this.startyear = ''
            }else {
                this.startyear = this.changeMonth(this.monthRange[0])
                this.endyear = this.changeMonth(this.monthRange[1])
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
        },
        // 获取后端数据
        async getList() {
            var obj = {
                routearea: '欧洲',
                startyear: this.startyear,
                endyear: this.endyear,
                contracts: this.monthContract
            }
            var res = await this.$http.post('/index/djamatrademonth',obj)
            if(res.status == 200 && res.data.ret==200) {
                this.$emit('getmonthtext',res.data.data.years.join(' ~ '))
                var destinationu = res.data.data.destinationu
                var shipowner = res.data.data.shipowner
                var series = []
                var selected = {}
                this.$emit('getDepMonthTotal',res.data.data.teu)
                destinationu.forEach((item,index) => {
                    selected[item] = true
                })
                res.data.data.shipownerx.forEach((item,index) => {
                    series.push({
                        barWidth:26,
                        name: destinationu[index],
                        type: 'bar',
                        stack: 'TUE',
                        data: item,
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
                
                res.data.data.shipownerxa.forEach((item,index) => {
                    series.push({
                        barWidth:26,
                        name: destinationu[index],
                        type: 'bar',
                        stack: 'TUE1',
                        data: item,
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
                this.selected = selected
                this.series = series
                this.country = destinationu
                this.shipowner = shipowner
                // console.log(destinationu,shipowner,series,selected)
                this.draw(destinationu,shipowner,series,selected)
            }
            
        },
        // 绘制echarts图
        draw(country,shipowner,series,selected) {
            var dom = document.getElementById('circleO')
            var self = this
            var option = {
                color: ['#dd6b66','#759aa0','#ffb980','#8dc1a9','#edafda','#ea7e53','#eedd78','#73a373','#5ab1ef','#7289ab', '#d87a80','#f49f42','#c23531','#93b7e3', '#715c87', '#d48265', '#91c7ae','#749f83', '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                xAxis: {
                    // boundaryGap: false,
                    name: '(船东)',
                    nameTextStyle: {
                        fontSize: 12,
                        color:'#333333',
                        fontWeight: 'bold'
                    },
                    data: shipowner,
                    axisLabel: {
                        interval:0,
                        // rotate:40
                    },
                    splitLine: {show: false}
                },
                legend: {
                    icon: 'circle',
                    data: country,
                    itemHeight: 10,
                    selected: selected
                    // itemWidth: 20,
                },
                tooltip: {
                    trigger: 'axis',
                    formatter:function(a) {
                        // console.log(a)
                        var a1 = a.slice(0,a.length/2)
                        var a2 = a.slice(a.length/2)
                        var res = ''
                        var sum1 = 0
                        var sum2 = 0
                        var sum = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                        a1.forEach((item,index) => {
                            sum1 += item.value
                            sum2 += a2[index].value
                            res += `${item.marker}${item.seriesName} (${a1[index].value},${a2[index].value})  : ${(((a2[index].value-a1[index].value)/a1[index].value)*100).toFixed(2)}%<br/>`
                        })
                        res += `合计 (${sum1},${sum2}) ：${((sum2-sum1)/sum1*100).toFixed(2)}%`
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
                    right: 100,
                },
                series: series,
                grid: {
                    height: "70%",
                    top: 100,
                }
            }
            
            // console.log('ddd')
            this.$echarts.init(dom).setOption(option,true)
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