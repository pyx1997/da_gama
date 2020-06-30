<template>
    <div class="wrap">
        <div id="echartsBox" class="echartsBox"></div>
        <div class="totalBox">
            <div class="line1 color-sCA4">{{total}}</div>
            <div class="line2 color-sCA6">当日总量</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            total: 0
        }
    },
    created() {
        this.getList()
    },
    mounted() {
        // this.draw()
    },
    methods: {
        draw(data,seriesData) {
            var dom = document.getElementById('echartsBox')
            var option ={
                color: ['#2db7f5','#5d6977','#808bc6','#f9bf00','#7dc856','#af70ca','#37ccb2','#e27772','#cbe1f7'],
                tooltip: {},
                legend: {
                    orient: 'vertical',
                    left: '70%',
                    y: '4%',
                    icon: 'circle',
                    textStyle: {
                        fontSize: 12,
                        color: '#989898'
                    },
                    // data: ['华东团队','深圳业务1部','深圳业务2部','深圳业务3部']
                    data: data
                },
                graphic: {
                    type: 'group',               // [ default: image ]用 setOption 首次设定图形元素时必须指定。image, text, circle, sector, ring, polygon, polyline, rect, line, bezierCurve, arc, group,
                    top: '36%',              // 描述怎么根据父元素进行定位。top 和 bottom 只有一个可以生效。如果指定 top 或 bottom，则 shape 里的 y、cy 等定位属性不再生效。『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 group 的子元素，父元素就是 group 元素。
                    left: '22%',             // 同上
                    // children: [
                    //     {
                    //         type: 'text',
                    //         style: {
                    //             text: '99',
                    //             fill: '#666',
                    //             fontSize: 32,
                    //             fontWeight: 'bold',
                    //             textAlign: 'center',
                    //             width: 100
                    //         }
                    //     },
                    //     {
                    //         type: 'text',
                    //         style: {
                    //             text: '当日总量',
                    //             fill: '#989898',
                    //             fontSize: 12,
                    //             fontWeight: 'bold',
                    //             // x: 12,
                    //             textAlign: 'center',
                    //             y: 40
                    //         }
                    //     }
                    // ],
                    // style: {
                    //     text: '9999\n当日总数',       // 文本块文字。可以使用 \n 来换行。[ default: '' ]
                    //     fill: '#666',           // 填充色。
                    //     fontSize: 16,           // 字体大小
                    //     fontWeight: 'bold'		// 文字字体的粗细，可选'normal'，'bold'，'bolder'，'lighter'
                    // }
                },
                series: {
                    type: 'pie',
                    radius: ['65%','80%'],
                    center: ['30%','46%'],
                    label: {
                        normal: {
                            show:false
                        }
                    },
                    // data: [
                    //     {name: '华东团队',value: '123'},
                    //     {name: '深圳业务1部',value: '234'},
                    //     {name: '深圳业务2部',value: '345'},
                    //     {name: '深圳业务3部',value: '345'}
                    // ],
                    data: seriesData
                }
            } 
            this.$echarts.init(dom).setOption(option)
        },
        getList() {
            this.$http.post('/index/djamaecharts/dept').then(res => {
                if(res.status == 200 && res.data.ret == 200) {
                    // console.log(res.data.data)
                    var data = []
                    res.data.data.list.forEach((item) => {
                        data.push(item)
                    });
                    this.total = res.data.data.total
                    this.draw(data,res.data.data.list)
                    // this.depart = res.data.data.depart;
                    // this.seriesData = res.data.data.teusum
                    // this.draw(res.data.data.depart,res.data.data.teusum)
                    
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
.wrap {
    position: relative
}
.echartsBox {
    height: 100%;
}
.totalBox {
    position: absolute;
    left: 60px;
    top: 72px;
    width: 130px;
    text-align: center;
    font-weight: bold
}
.line1 {
    font-size: 32px;

}
.line2 {
    margin-top: 2px;
    font-size: 12px
}
</style>