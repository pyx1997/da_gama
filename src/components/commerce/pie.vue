 <template>
    <div class="wrap">
        <div id="commercePie" class="echartsBox">

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
    watch: {
        
    },
    methods: {
        draw() {
            var dom = document.getElementById('commercePie')

            var option = {
                tooltip: {},
                series: {
                    itemStyle: {
                        color: ['#ec7895','#6490c8'],
                    },
                    
                    radius: ['0%','80%'],
                    center: ['30%','46%'],
                    type: 'sunburst',
                    data: [
                        {
                            name: '地中海',
                            value: 30,
                            itemStyle: {
                                color: '#aed6f0',
                            },
                            children: [
                                {
                                    name: 'BG',
                                    value: 10,
                                    itemStyle: {
                                        color: '#50b7e2'
                                    },
                                    children: [
                                        {
                                            name: 'HPL',
                                            value: 6,
                                            itemStyle: {
                                                color: '#039ed4'
                                            },
                                        },
                                        {
                                            name: 'EMC',
                                            value: 2,
                                            itemStyle: {
                                                color: '#039ed4'
                                            },
                                        },
                                        {
                                            name: 'CMA',
                                            value: 2,
                                            itemStyle: {
                                                color: '#039ed4'
                                            },
                                        },
                                    ]
                                },
                                {
                                    name: 'GE',
                                    value: 10,
                                    itemStyle: {
                                        color: '#50b7e2'
                                    },
                                    children: [
                                        {
                                            name: 'HPL',
                                            value: 6,
                                            itemStyle: {
                                                color: '#039ed4'
                                            },
                                        },
                                        {
                                            name: 'EMC',
                                            value: 2,
                                            itemStyle: {
                                                color: '#039ed4'
                                            },
                                        },
                                        {
                                            name: 'CMA',
                                            value: 2,
                                            itemStyle: {
                                                color: '#039ed4'
                                            },
                                        },
                                    ]
                                },
                                {
                                    name: 'GR',
                                    value: 10,
                                    itemStyle: {
                                        color: '#50b7e2'
                                    },
                                    children: [
                                        {
                                            name: 'HPL',
                                            value: 6,
                                            itemStyle: {
                                                color: '#039ed4'
                                            },
                                        },
                                        {
                                            name: 'EMC',
                                            value: 2,
                                            itemStyle: {
                                                color: '#039ed4'
                                            },
                                        },
                                        {
                                            name: 'CMA',
                                            value: 2,
                                            itemStyle: {
                                                color: '#039ed4'
                                            },
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            name: '欧洲',
                            itemStyle: {
                                color: '#c9b0cd'
                            },
                            children: [
                                {
                                    name: 'BG',
                                    value: 10,
                                    itemStyle: {
                                        color: '#9271a8'
                                    },
                                    children: [
                                        {
                                            name: 'HPL',
                                            value: 6,
                                            itemStyle: {
                                                color: '#6b3589'
                                            },
                                        },
                                        {
                                            name: 'EMC',
                                            value: 2,
                                            itemStyle: {
                                                color: '#6b3589'
                                            },
                                        },
                                        {
                                            name: 'CMA',
                                            value: 2,
                                            itemStyle: {
                                                color: '#6b3589'
                                            },
                                        },
                                    ]
                                },
                                {
                                    name: 'GE',
                                    value: 10,
                                    itemStyle: {
                                        color: '#9271a8'
                                    },
                                    children: [
                                        {
                                            name: 'HPL',
                                            value: 6,
                                            itemStyle: {
                                                color: '#6b3589'
                                            },
                                        },
                                        {
                                            name: 'EMC',
                                            value: 2,
                                            itemStyle: {
                                                color: '#6b3589'
                                            },
                                        },
                                        {
                                            name: 'CMA',
                                            value: 2,
                                            itemStyle: {
                                                color: '#6b3589'
                                            },
                                        },
                                    ]
                                },
                            ]
                        },
                    ]
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
.wrap {
    position: relative
}
</style>