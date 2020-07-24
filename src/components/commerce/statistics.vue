<template>
    <div class="wrap container">
        <div class="echartsBox border-sCA7">
            <div class="row-jb-ac top">
                <div class="title color-sCA4 fontSizeB">按国家船东展示</div>
                <div class="row-ac">
                    <div class="contract border-sCA7 row-ac">
                        <div class='contractText fontSizeC color-sCA4'>合约：</div>
                        <el-select v-model="contract" placeholder="请选择">
                            <el-option
                                v-for="item in contracts"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <!-- <div class="selectArea flex-row">
                        <el-radio v-model="routearea" label="地中海">地中海</el-radio>
                        <el-radio v-model="routearea" label="欧洲">欧洲</el-radio>
                    </div> -->
                    <div class="time row-jc">
                        <el-date-picker v-model="timeValue" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" @change="selectDate"></el-date-picker>
                    </div>
                </div>
                
            </div>
            
            <div class="row-jb">
                <div class="barBox flex-col">
                    <div class="total row-jc">
                        <div class="bgc-blue2 color-main">总T量: {{desTotal}}</div>
                    </div>
                    
                    <div class="echarts">
                        <desbar routearea="地中海" @getdesTotal="getdesTotal" :startday="startday" :endday="endday" :contract='contract'></desbar>
                    </div>
                    <div class="name color-sCA4">地中海</div>
                </div>

                <div class="barBox flex-col">
                    <div class="total row-jc">
                        <div class="bgc-blue2 color-main">总T量: {{depTotal}}</div>
                    </div>
                    <div class="echarts">
                        <depbar routearea="欧洲" @getdepTotal="getdepTotal" :startday="startday" :endday="endday" :contract='contract'></depbar>
                    </div>
                    <div class="name color-sCA4">欧洲</div>
                </div>
            </div>
           
        </div>
        <div class="echartsBox border-sCA7">
            <div class="top row-jb-ac">
                <div class="title color-sCA4 fontSizeB">环比图{{compData}}</div>
                <div class="time row-jc">
                    <el-date-picker v-model="comTime" type="monthrange" start-placeholder="开始月份" end-placeholder="结束月份" @change="selectComMon"></el-date-picker>
                </div>
            </div>
            
            <!-- <div class="time selectMonth row-jc">
                <el-date-picker v-model="monthrange" type="month" @change="selectMonth"></el-date-picker>
            </div> -->
            <div class="row-jb">
                <div class="lineBox flex-col">
                    <div class="total row-jc">
                        <div class="bgc-blue2 color-main">总T量: {{desWeekTotal}}</div>
                    </div>
                    <div class="echarts">
                        <!-- <testline></testline> -->
                        <desline :timeValue="timeValue" @getDesweekTotal="getDesweekTotal" @getCom="getCom" :comTime="comTime"></desline>
                    </div>
                    <div class="name color-sCA4">地中海</div>
                </div>
                <div class="lineBox flex-col">
                    <div class="total row-jc">
                        <div class="bgc-blue2 color-main">总T量: {{depWeekTotal}}</div>
                    </div>
                    <div class="echarts">
                        <depline :timeValue = "timeValue" @getDepweekTotal="getDepweekTotal" @getCom="getCom" :comTime="comTime"></depline>
                    </div>
                    <div class="name color-sCA4">欧洲</div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import desline from './desLine'
import depline from './depLine'
import pie from './pie'
import depbar from './depBar'
import desbar from './desBar'
import testline from './testLine'
export default {
    data() {
        return {
            contract: '全部',
            contracts: [
                {value: '全部',label: '全部'},
                {value: 'MRF',label: 'MRF'},
                {value: 'Agent',label: 'Agent'}
            ],
            routearea: '地中海',
            depTotal:0,
            depWeekTotal: 0,
            desWeekTotal: 0,
            desTotal:0,
            timeValue: '',
            startday: '',
            endday: '',
            monthrange: '',
            compData: '',
            endyear: '',
            startyear: '',
            comTime: ''
            // arr: [],
            // input: ''
        }
    },
    watch: {
        contract() {

        }
        // input() {
        //     this.checkStr()
        // }
    },
    components: {pie,desbar,depbar,desline,depline,testline},
    created() {
        
    },
    methods: {
        getdepTotal(val) {
            this.depTotal = val
        },
        getdesTotal(val) {
            this.desTotal = val
        },
        getDesweekTotal(val) {
            this.desWeekTotal = val
        },
        getDepweekTotal(val) {
            this.depWeekTotal = val
        },
        selectMonth() {
            // console.log(this.monthrange)
        },
        selectDate() {
            if(!this.timeValue) {
                this.startday = ''
                this.endday = ''
            }else {
                this.startday = this.changeDate(this.timeValue[0])
                this.endday = this.changeDate(this.timeValue[1])
            }
            // console.log(this.startday,this.endday)
        },
        selectComMon() {
            if(!this.comTime){
                this.endyear = ''
                this.startyear = ''
            }else {
                this.startyear = this.changeMonth(this.comTime[0])
                this.endyear = this.changeMonth(this.comTime[1])
            }
            // console.log(this.startyear,this.endyear)
            console.log(this.comTime)
        },
        changeDate(str) {
            return str.getFullYear()+'-'+this.checkNum(str.getMonth()+1)+'-'+this.checkNum(str.getDate())
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
        getCom(val) {
            this.compData = `(${val}月份)`
        }
    }
}
</script>
<style scoped>
.contractText {
    line-height: 30px;
    margin-left: 10px;
}
.time {
    margin-left: 4px;
}
.lineBox .total {
    top: 86px !important;
}
.check {
    width: 100px;
    flex-wrap: wrap;
    font-size: 16px;
}
.red {
    color: red;
}
.total {
    position: absolute;
    top: 106px;
    font-size: 14px;
    width: 100%;
    line-height: 28px;
    /* text-align: center; */
}

.total div {
    padding: 0 10px;
}
.container {
    overflow: auto;
}
.echartsBox {
    position: relative;
    padding: 10px;
    width: 96%;
    min-width: 900px;
    border-radius: 4px;
    margin: 10px 0 20px;
    box-sizing: border-box;
}
.echartsBox .title {
    /* width: 200px; */
    position: relative;
    z-index: 1;
    margin-right: 20px;
    /* margin-bottom: 10px; */
    font-weight: 650;
    line-height: 28px;
    /* text-align: center; */
}
/* .selectArea {
    width: 100%;
    position: absolute;
    left: 0px;
    top: 20px;
    margin: 10px 0px 20px;
} */
.barBox {
    position: relative;
    z-index: 100;
    width: 48%;
    height: 560px;
}
.lineBox {
    position: relative;
    z-index: 100;
    width: 48%;
    height: 500px;
}
.pieBoxInside {
    flex: 1;
    overflow: hidden;
}
.barWrap {
    height: 100%;
    width: 48%;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 4px;
}
.echarts {
    position: relative;
    z-index: 1000;
    width: 100%;
    flex: 1;
}
.barEcharts {
    flex: 1;
}
.selectMonth {
    width: 100%;
    position: absolute;
    left: 0;
    top: 10px;
    z-index: 100000;
}
.name {
    font-size: 14px;
    font-weight: 650;
    text-align: center;
}
.top {
    margin-bottom: 20px;
}
</style>