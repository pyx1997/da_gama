<template>
    <div class="container">
        

        
        <div class="echartsBox pieBox row-jb">
            <div class="pieWrap border-sCA7">
                <div class="title color-sCA4">各团队当日 EDI 订舱量</div>
                <pie></pie>
            </div>
            <div class="pieWrap border-sCA7">
                <div class="title color-sCA4">各船东 EDI 数据</div>
                <ship-pie></ship-pie>
            </div>
        </div>
        
        <div class="themeRiverBox border-sCA7 echartsBox flex-col">
            
            <div class="title color-sCA4">订舱日趋视图(默认半年视图)</div>
            <div class="timeType time row-ac">
                <div class="tab" :class="[timeType == '本周' ? 'border-main color-main' : 'border-sCA7 color-sCA5']" @click="clickTimeType('本周')">本周</div>
                <div class="tab" :class="[timeType == '本月' ? 'border-main color-main' : 'border-sCA7 color-sCA5']" @click="clickTimeType('本月')">本月</div>
                <div class="tab" :class="[timeType == '自定义' ? 'border-main color-main' : 'border-sCA7 color-sCA5']" @click="clickTimeType('自定义')">自定义</div>
                <el-date-picker v-model="timeValue" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" @change="selectDate"></el-date-picker>
            </div>
            <div class="themeEchart">
                <river></river>
            </div>
            
        </div>
        <div class="border-sCA7 echartsBox barBox flex-col">
            <div class="title color-sCA4">前日业务员订舱 TOP 10</div>
            <div class="barBoxInside">
                <bar></bar>
            </div>
        </div>
    </div>
</template>
<script>
import river from './themeRiver'
import pie from './pie'
import shipPie from './shipPie'
import bar from './bar'
export default {
    data() {
        return {
            timeType: '本周',
            timeValue: ''
        }
    },
    components: {
        river,
        pie,
        bar,
        shipPie,
    },
    methods: {
        clickTimeType(str) {
            this.timeType = str;
        },
        selectDate() {
            // console.log('selectDate:',this.changeDate(this.timeValue[0])+' - '+this.changeDate(this.timeValue[1]))
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
    }
}
</script>
<style scoped>
.themeEchart {
    flex: 1;
    width: 100%
}
.container {
    overflow: hidden;
}
.timeType {
    margin-bottom: 20px;
    margin-top: 10px;
}
.timeType .tab {
    font-size: 12px;
    padding: 0 16px;
    margin-right: 1px;
    /* margin-bottom: 20px; */
    line-height: 28px;
    cursor: pointer;
}
.echartsBox {
    padding: 10px;
    width: 900px;
    border-radius: 4px;
    margin: 10px 0 20px;
    box-sizing: border-box;
}
.echartsBox .title {
    font-size: 14px;
    font-weight: 650;
}
.pieBox {
    padding: 0 !important;
    height: 242px;
}
.themeRiverBox {
    height: 400px;
}
.barBox {
    height: 250px;
}
.pieWrap {
    height: 100%;
    width: 48%;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 4px;
}
.barBoxInside {
    flex: 1;
    overflow: hidden;
}
</style>