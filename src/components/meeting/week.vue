<template>
    <div class="wrap col-ac container">
        
        <div class="calendarWrap flex-row">
            <div class="weekWrap">
                <div class="weekTop row-jb-ac color-sCA4">
                    <div class="el-icon-arrow-left icon" @click="leftArrow"></div>
                    <div class="year">{{showYear}}年</div>
                    <div class="el-icon-arrow-right icon" @click="rightArrow"></div>
                </div>
                <div class="tip fontSizeD color-sCA6">请选择你要查看的周数</div>
                <div class="weeks flex-row color-sCA4 fontSizeB">
                    <div class="weekNum" :class="[(nowWeek == index+1 && selectYear == showYear)? 'bgc-main color-sCA1' : '']" v-for="(item,index) in weekNum" :key="index" @click="clickWeek(index+1)">{{index+1}}</div>
                </div>
            </div>
            <div class="tableWrap col-as fontSizeA color-sCA8">
                <div class="meetRoom row-ac">
                    <div class="selectWeek">{{selectYear}}年第{{nowWeek}}周</div>
                    <div class="row-jc">
                        <el-select v-model="type" placeholder="请选择类型">
                            <el-option
                            v-for="item in types"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <!-- <div>使用情况</div> -->
                </div>
                
                <div class="table flex-col">
                    <div class="thead fontSizeB color-sCA8 flex-row">
                        <div class="time">时间</div>
                        <div class="week">周日</div>
                        <div class="week">周一</div>
                        <div class="week">周二</div>
                        <div class="week">周三</div>
                        <div class="week">周四</div>
                        <div class="week">周五</div>
                        <div class="week">周六</div>
                    </div>
                    <div class="tbody">
                        <div class="flex-row fontSizeB color-sCA1 item" v-for="(item,index) in list" :key="index">
                            <div class="time color-sCA8">{{item.time}}</div>
                            <div v-for="(item1,index1) in item.data" :key="index1" class="week" :class="[item1.state == 0 ? 'bgc-green2' : 'bgc-red2']">
                                {{item1.depart}}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            weekNum: 0,//一年总周数
            nowWeek: 0,// 当前周数
            showYear: '',// 
            selectYear: '',// 当前选择的年份
            type: '7062 小会议室',
            types: [
                {value: '7062 小会议室',label: '7062 小会议室'},
                {value: '7039 大会议室',label: '7039 大会议室'},
                {value: '7033 培训室',label: '7033 培训室'},
            ],
            list: [
                {
                    time: '09:00 ~ 09:30',
                    data: [
                        {week: '周日',state: 0,depart: '空闲'},
                        {week: '周一',state: 0,depart: '空闲'},
                        {week: '周二',state: 1,depart: '商务'},
                        {week: '周三',state: 0,depart: '空闲'},
                        {week: '周四',state: 0,depart: '空闲'},
                        {week: '周五',state: 0,depart: '空闲'},
                        {week: '周六',state: 0,depart: '空闲'},
                    ]
                },
                {
                    time: '09:30 ~ 10:00',
                    data: [
                        {week: '周日',state: 0,depart: '空闲'},
                        {week: '周一',state: 0,depart: '空闲'},
                        {week: '周二',state: 0,depart: '空闲'},
                        {week: '周三',state: 0,depart: '空闲'},
                        {week: '周四',state: 0,depart: '空闲'},
                        {week: '周五',state: 0,depart: '空闲'},
                        {week: '周六',state: 0,depart: '空闲'},
                    ]
                },
                {
                    time: '10:00 ~ 10:30',
                    data: [
                        {week: '周日',state: 0,depart: '空闲'},
                        {week: '周一',state: 1,depart: 'IT'},
                        {week: '周二',state: 1,depart: 'IT'},
                        {week: '周三',state: 1,depart: 'IT'},
                        {week: '周四',state: 1,depart: 'IT'},
                        {week: '周五',state: 1,depart: 'IT'},
                        {week: '周六',state: 0,depart: '空闲'},
                    ]
                },
                {
                    time: '10:30 ~ 11:00',
                    data: [
                        {week: '周日',state: 0,depart: '空闲'},
                        {week: '周一',state: 1,depart: 'IT'},
                        {week: '周二',state: 1,depart: 'IT'},
                        {week: '周三',state: 1,depart: 'IT'},
                        {week: '周四',state: 1,depart: 'IT'},
                        {week: '周五',state: 1,depart: 'IT'},
                        {week: '周六',state: 0,depart: '空闲'},
                    ]
                },
                
            ]
        }
    },
    computed: {
        
    },
    watch: {
        showYear(newValue,oldValue) {
            this.getDate(newValue)
        }
    },
    props: ['refresh'],
    watch: {
        refresh() {
            
        }
    },
    created() {
        this.selectYear = new Date().getFullYear()
        this.showYear = new Date().getFullYear()
        var month = new Date().getMonth()+1
        var date = new Date().getDate()
        this.getDate(this.selectYear)
        this.getNowWeek(this.selectYear,month,date)
        this.getList()
    },
    methods: {
        leftArrow() {
            this.showYear--
        },
        rightArrow() {
            this.showYear++
        },
        // 获取列表
        async getList() {
            var obj = {
                meetingweekday: this.nowWeek,
                meetingname: this.type
            }
            var res = this.$http.post('http://192.168.53.24/tp5seawatch/public/index/meetingroomlist/meetingweek',obj)
            console.log(res)
        },
        // 计算某年的星期数
        getDate(year) {
            // 一年第一天是周几
            var first = new Date(year,0,1).getDay()
            // 计算一年有多少天
            if((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
                var allyears = 366
            }else {
                var allyears = 365
            }
            // 计算一年有多少周
            var week = parseInt((allyears + first) / 7)
            if(((allyears + first) % 7) != 0) {
                week += 1
            }
            this.weekNum = week
            // console.log(week)
        },
        // 计算特定日期是一年当中第几周
        getNowWeek(year,month,day) {
            var month = month-1
            // 第一天时间戳
            var day1 = +new Date(year,0,1)
            // 特定日期时间戳
            var day2 = +new Date(year,month,day)
            // 计算特定日期到第一天有多少天
            var days = parseInt((day2-day1)/(1000*60*60*24))
            // 计算该天是第几周
            var week1 = new Date(year,0,1).getDay() // 该年第一天是周几
            days = days+week1 +1
            var weeks = parseInt(days/7)
            if(days % 7 != 0) {
                weeks ++
            }
            this.nowWeek = weeks
        },
        clickWeek(index) {
            this.nowWeek = index;
            this.selectYear = this.showYear
        }
    }
}
</script>
<style scoped>
.tip {
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
}
.tableWrap {
    flex: 1;
    padding-left: 40px;
    box-sizing: border-box;
    overflow: auto;
}
.calendarWrap {
    width: 90%;
    padding: 20px;
    border-radius: 6px;
    height: 100%;
    overflow: auto;
    background-color: #F9FBFF;
}
.selectWeek {
    margin-right: 10px;
}
.weeks {
    flex-wrap: wrap;
}
.weekWrap {
    width: 300px;
    height: 100%;
    overflow: auto;
}
.weekNum {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
}
.weekTop {
    padding: 30px 40px 20px;
}
.weekTop .icon {
    cursor: pointer;
    font-size: 30px;
}
.weekTop .year {
    font-size: 20px
}
.meetRoom {
    width: 100%;
    margin-bottom: 20px;
}
.table {
    flex: 1;
    overflow: auto;
    /* width: 90%; */
    border: 1px solid #333;
}
.thead {
    line-height: 30px;
    text-align: center;
    border-bottom: 1px solid #333;
    /* border: 1px solid #333; */
}
.tbody {
    line-height: 40px;
    text-align: center;
    flex: 1;
    overflow: auto;
    /* border: 1px solid #333; */
}
.week {
    width: 100px;
    /* max-width: 120px; */
    border-left: 1px solid #333
}
.time {
    width: 140px;
    /* max-width: 200px; */
}
.depart {
    width: 100px
}
.tbody .item {
    border-bottom: 1px solid #333;
}
.applicat {
    width: 100px;
}
.user {
    flex: 1;
}
</style>