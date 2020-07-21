 <template>
    <div class="wrap">
        <div id="themeRiver" class="echartsBox">

        </div>
        <div class="loadingBox col-ac color-sCA4" v-show="dataLoading">
            <i class="el-icon-loading"></i>
            <div>数据加载中，请耐心等待！</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dataLoading: true
        }
    },
    props: ['startday','endday','type'],
    mounted() {
        this.getList()
        // this.draw()
    },
    watch: {
        startday(newValue,oldValue) {
            this.dataLoading = true;
            var obj = {
                startday: this.startday,
                endday: this.endday,
                type: this.type
            }
            // console.log(newValue,oldValue)
            this.getList(obj)
            // console.log(this.type,this.startday,this.endday)
        },
        endday() {
            this.dataLoading = true;
            var obj = {
                startday: this.startday,
                endday: this.endday,
                type: this.type
            }
            this.getList(obj)
            // console.log(this.type,this.startday,this.endday)
        },
        type(newValue,oldValue) {
            this.dataLoading = true;
            var obj;
            if(this.type != 'self') {
                obj ={
                    startday: '',
                    endday: '',
                    type: newValue
                }
            }else {
                obj = {
                    startday: this.startday,
                    endday: this.endday,
                    type: newValue
                }
            }
            
            // console.log(newValue,oldValue)
            // console.log(this.type,this.startday,this.endday)
            this.getList(obj)
        }
    },
    methods: {
        draw(name,date,series) {
            this.dataLoading = false;
            var dom = document.getElementById('themeRiver')
            var option ={
                color: ['#2db7f5','#808bc6','#f9bf00','#7dc856','#af70ca','#37ccb2','#e27772','#cbe1f7','#5d6977'],
                // color: ['#855759','#d1dddd','#e0d2b8','#bfaa8f','#e28120','#babcb9','#7c909b'],
                // color: ['#bbcfca','#b5d4f3','#d5f0fd','#5d6977','#808bc6','#2db7f5','#7d84a9','#a5d5ea','#e6d392','#b7d4a8','#a1e0d5'],
                tooltip: {
                    // trigger: 'item'
                    trigger: 'axis',
                    // itemStyle : { normal: {label : {show: true}}}
                },
                legend: {
                    data: name,
                    // data: ['深圳业务1部','深圳业务2部','深圳业务3部'],
                    icon: 'circle',
                    itemHeight: 10,
                    textStyle: {
                        fontSize: 12,
                        color: '#989898'
                    },
                    // legendSelect: {
                    //     itemStyle : { normal: {label : {show: true}}}
                    // }
                    // selectedMode:false,  // 取消点击事件
                    // itemStyle : { normal: {label : {show: true}}} // 显示数值
                    
                },
                // axisPointer : { // 坐标轴指示器，坐标轴触发有效
                //     type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                // },
                xAxis: {
                    boundaryGap: false,
                    type: 'category',
                    name: '(ETD)',
                    nameTextStyle: {
                        fontSize: 12,
                        color:'#333333',
                        fontWeight: 'bold'
                    },
                    axisLabel : {//坐标轴刻度标签的相关设置。
                        // clickable:true,//并给图表添加单击事件  根据返回值判断点击的是哪里
                        interval : 0,
                        
                    },
                    data: date.map((str) => {
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
                    // splitLine: {show: false},
                    name: '(TEU)',
                    nameTextStyle: {
                        fontSize: 12,
                        color:'#333333',
                        fontWeight: 'bold'
                    }
                },
                dataZoom: [
                    {
                        type: 'slider',
                        xAxisIndex: 0,
                        filterMode: 'empty',
                    },
                ],
                series: series,
                grid: {
                    height: "64%",
                    top: 60
                }
            } 
            this.$echarts.init(dom).setOption(option)
        },
        getList(obj) {
            
            this.$http.post('/index/djamaecharts/search',obj).then((res) => {
                
                
                if(res.status == 200 && res.data.ret == 200) {
                    // console.log(res.data.data)
                    var name = []
                    var series = []
                    var dates = res.data.data.date
                    res.data.data.list.forEach((item,index) => {
                        name.push(item.depart)
                        series.push({
                            name: item.depart,
                            type: 'line',
                            stack: '总量',
                            
                            // hoverAnimation:false,
                            sampling: 'average',
                            smooth: true,
                            areaStyle: {},
                            data: item.data,
                            itemStyle : { normal: {label : {show: false}}},
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
                    localStorage.setItem('bookRiver',JSON.stringify({
                        name: name,
                        series: series,
                        dates: dates
                    }))
                    this.draw(name,dates,series)
                }else {
                    if(localStorage.getItem('bookRiver')) {
                        var obj = JSON.parse(localStorage.getItem('bookRiver'))
                        this.draw(obj.name,obj.dates,obj.series)
                    }
                    this.$message({
                        message: '请求数据失败，未获取到订舱日趋视图最新数据',
                        type: 'warning'
                    })   
                    this.dataLoading = false;
                }
            }).catch(() => {
                if(localStorage.getItem('bookRiver')) {
                    var obj = JSON.parse(localStorage.getItem('bookRiver'))
                    this.draw(obj.name,obj.dates,obj.series)
                }
                this.$message({
                    message: '连接服务器失败，未获取到订舱日趋视图最新数据',
                    type: 'warning'
                })
                this.dataLoading = false;
            })
        }
    }
}
</script>
<style scoped>
.echartsBox {
    height: 100%;
}
.wrap {
    position: relative
}
.loadingBox {
    width: 100%;
    position: absolute;
    top: 100px;
    margin: auto;
}
.loadingBox i {
    width: 30px;
    font-size: 30px;

}
.loadingBox div {
    margin-top: 10px;
    font-size: 14px;
}
</style>