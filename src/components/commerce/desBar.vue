<template>
    <div class="wrap flex-col">
        
        <div class="row-ac select">
            <el-radio v-model="select" label="1" @change="clickRadio">全选</el-radio>
            <el-radio v-model="select" label="0" @change="clickRadio">全不选</el-radio>
        </div>
        <div id="desbar" class="echartsBox">

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            selected: '',
            select: '1',
            country: '',
            series: '',
            shipowner: ''
        }
    },
    props: ['routearea','startday','endday','contract'],
    mounted() {
        this.getList()
    },
    watch: {
        routearea(newValue,oldValue) {
            this.getList()
        },
        startday() {
            this.getList()
        },
        endday() {
            this.getList()
        },
        contract() {
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
        draw(coutry,shipowner,series,selected) {
            var dom = document.getElementById('desbar')
            var option = {
                // color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3','#7289ab','#daa5aa','#413956','#315f47','#9a4360'],
                color: ['#dd6b66','#759aa0','#ffb980','#8dc1a9','#edafda','#ea7e53','#eedd78','#73a373','#5ab1ef','#7289ab', '#d87a80','#f49f42','#c23531','#93b7e3', '#715c87', '#d48265', '#91c7ae','#749f83', '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                xAxis: {
                    name: '(船东)',
                    nameTextStyle: {
                        fontSize: 12,
                        color:'#333333',
                        fontWeight: 'bold'
                    },
                    data: shipowner,
                    axisLabel: {
                        interval:0,
                        rotate:40
                    },
                    splitLine: {show: false}
                },
                legend: {
                    icon: 'circle',
                    data: coutry,
                    selected: selected,
                    itemHeight: 10,
                    // itemWidth: 20,
                },
                tooltip: {
                    trigger: 'axis',
                    formatter:function(a) {
                        var res = ''
                        var sum = 0
                        // console.log('a=',a)
                        a.forEach((item,index) => {
                            if(index == 0) {
                                res += `${item.axisValue}<br/>`
                            }
                            sum += item.value
                            res += `${item.marker} ${item.seriesName} : ${item.value}<br/>`
                            if(index==a.length-1) {
                                res += `合计 : ${sum}`
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
                    top: 80,
                    right: 46,
                },
                series: series,
                grid: {
                    height: "68%",
                    top: 120,
                }
            }
            this.$echarts.init(dom).setOption(option,true)
        },     
        getList() {
            // console.log('data')
            if(this.contract == '全部') {
                var contract = ''
            }else {
                var contract = this.contract
            }
            
            this.$http.post('/index/djamatradeecharts',{routearea: this.routearea,startday: this.startday,endday: this.endday,contract: contract}).then(res => {
                // console.log(res)
                if(res.status == 200 && res.data.ret == 200) {
                    this.$emit('getdesTotal',res.data.data.teu)
                    // console.log(res.data.data)
                    var selected = {}
                    var series = []
                    var destinationu = res.data.data.destinationu
                    destinationu.forEach((item,index) => {
                        destinationu[index] = `${item}(${res.data.data.countrysum[index]})`
                        selected[destinationu[index]] = true
                    })
                    this.select = '1'
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
                    });
                    this.country = destinationu
                    var shipowner = res.data.data.shipowner
                    this.shipowner = shipowner
                    this.selected = selected
                    this.series = series
                    this.draw(destinationu,shipowner,series,selected)
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