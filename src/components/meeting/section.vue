<template>
    <div class="wrap row-ja">
        <div class="meetRoom flex-col">
            <div class="meetTop row-jb-ac color-sCA1 bgc-blue4">
                <div class="row-ac">
                    <div class="iconfont icon-huiyi icon"></div>
                    <div class="fontSizeA">7062 小会议室</div>
                </div>
                
                <div class="fontSizeC color-sCA1 border-sCA1 booking" @click="booking('7062小会议室')" v-if="checkToday">预定</div>
            </div>
            <div class="meetList border-sCA7">
                <div class="meetItem row-ac fontSizeB color-sCA4" v-for="(item,index) in smallList" :key="index">
                    <div class="meetTime">{{item.time}}</div>
                    <div class="meetUser">{{item.depart}}</div>
                    <div class="iconBox edit row-jc-ac" title="修改" v-if="isLogin" @click="clickEdit(item)">
                        <div class="el-icon-edit fontSizeB"></div>
                    </div>
                    <div class="iconBox del row-jc-ac" title="删除" v-if="isLogin" @click="clickDel(item.id)">
                        <div class="el-icon-delete fontSizeB"></div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="meetRoom flex-col">
            <div class="meetTop row-jb-ac color-sCA1 bgc-or1">
                <div class="row-ac">
                    <div class="iconfont icon-huiyi icon"></div>
                    <div class="fontSizeA">7039 大会议室</div>
                </div>
                
                <!-- <div class="fontSizeC color-sCA1 border-sCA1 booking" @click="booking('7039大会议室')" v-if="checkToday">预定</div> -->
            </div>
            <div class="meetList border-sCA7">
                <!-- <div class="meetItem row-ac fontSizeB color-sCA4" v-for="(item,index) in list7039" :key="index">
                    <div class="meetTime">{{item.time}}</div>
                    <div class="meetUser" v-if=" !item.type">{{item.depart}}</div>
                    <div class="iconBox edit row-jc-ac" title="修改" v-if="isLogin && !item.type" @click="clickEdit(item)">
                        <div class="el-icon-edit fontSizeB"></div>
                    </div>
                    <div class="iconBox del row-jc-ac" title="删除" v-if="isLogin && !item.type" @click="clickDel(item.id)">
                        <div class="el-icon-delete fontSizeB"></div>
                    </div>
                    <div class="color-green1 free" v-if="item.type" @click="bookNowTime(item.time)">空闲 去预定</div>
                    
                </div> -->
            </div>
        </div>
        <div class="meetRoom flex-col">
             <div class="meetTop row-ac color-sCA1 bgc-purple1">
                <div class="iconfont icon-huiyi icon"></div>
                <div class="fontSizeA">7033 培训室</div>
            </div>
            <div class="meetList border-sCA7">
                <div class="meetItem row-ac fontSizeB color-sCA4">
                    <div class="meetTime">9:00 ~ 9:30</div>
                    <div class="meetUser">商务部</div>
                </div>
            </div>
        </div>
        <div class="row-jc-ac bgc-opacity opacity" v-if="editShow">
            <div class="editDialog bgc-sCA1">
                <!-- <div class="color-main fontSizeA editName">修改</div> -->
                <div class="editItem row-ac color-sCA4">
                    <div class="fontSizeB editProperty">部门：</div>
                    <input class="fontSizeC editInput color-sCA4" v-model='editData.depart'>
                </div>
                <div class="editItem row-ac color-sCA4">
                    <div class="fontSizeB editProperty">申请人：</div>
                    <input class="fontSizeC editInput color-sCA4" v-model='editData.applicant'>
                </div>
                <div class="editItem row-ac color-sCA4">
                    <div class="fontSizeB editProperty">用途：</div>
                    <input class="fontSizeC editInput color-sCA4" v-model='editData.use'>
                </div>
                <div class="editItem row-ac color-sCA4">
                    <div class="fontSizeB editProperty">会议室：</div>
                    <el-select v-model="editData.meetRoom">
                        <el-option
                        v-for="item in meetings"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- <input class="fontSizeC editInput color-sCA4" v-model='editData.meetRoom'> -->
                </div>
                <div class="editItem row-ac color-sCA4">
                    <div class="fontSizeB editProperty">会议时间：</div>
                    <!-- <input class="fontSizeC editInput color-sCA4" v-model='editData.time'> -->
                    <el-time-picker
                        is-range
                        v-model="meetingTime"
                        :clearable="false"
                        range-separator="~"
                        start= '09:00'
                        end='22:00'
                        step='00:15'
                        format="HH:mm"
                        selectableRange="09:30:00 - 12:00:00"
                        start-placeholder="开始"
                        end-placeholder="结束"
                        placeholder="选择时间范围"
                        @change="selectTime">
                    </el-time-picker>
                </div>
                <div class="row-ja fontSizeA">
                    <div class="editBtn bgc-main color-sCA1" @click="ensureEdit">确认</div>
                    <div class="editBtn border-main color-main" @click="cancelEdit">取消</div>
                </div>
            </div>
            
        </div>
        <div class="row-jc-ac bgc-opacity opacity" v-if="addShow">
            <div class="editDialog bgc-sCA1">
                <div class="editItem row-ac color-sCA4">
                    <div class="fontSizeB editProperty">部门：</div>
                    <input class="fontSizeC editInput color-sCA4" v-model='addMeeting.depart' placeholder="请输入部门">
                </div>
                <div class="editItem row-ac color-sCA4">
                    <div class="fontSizeB editProperty">申请人：</div>
                    <input class="fontSizeC editInput color-sCA4" v-model='addMeeting.applicant' placeholder="请输入申请人">
                </div>
                <div class="editItem row-ac color-sCA4">
                    <div class="fontSizeB editProperty">用途：</div>
                    <input class="fontSizeC editInput color-sCA4" v-model='addMeeting.use' placeholder="请输入用途">
                </div>
                <div class="editItem row-ac color-sCA4"> 
                    <div class="fontSizeB editProperty">重复：</div>
                    <div class="row-ac ">
                        <div class="fontSizeC">不重复</div>
                        <div class="el-icon-arrow-down fontSizeB repeIcon"></div>
                    </div>
                    <div class="repeBox row-ac bgc-sCA1">
                        <el-checkbox v-model="repe[0]">周一</el-checkbox>
                        <el-checkbox v-model="repe[1]">周二</el-checkbox>
                        <el-checkbox v-model="repe[2]">周三</el-checkbox>
                        <el-checkbox v-model="repe[3]">周四</el-checkbox>
                        <el-checkbox v-model="repe[4]">周五</el-checkbox>
                    </div>
                </div>
                <div class="editItem row-ac color-sCA4">
                    <div class="fontSizeB editProperty">会议室：</div>
                    <input class="fontSizeC editInput color-sCA4" v-model='addMeeting.meetRoom' readonly>
                </div>
                <div class="editItem row-ac color-sCA4 fontSizeB">
                    <div class="fontSizeB editProperty">会议时间：</div>
                    <div class="timeRange row-ac">
                        <el-time-select
                            placeholder="开始"
                            :clearable="false"
                            v-model="addMeeting.time[0]"
                            :picker-options="{
                                start: '09:00',
                                step: '00:30',
                                end: '19:00'
                            }">
                        </el-time-select>
                        <div class="line">~</div>
                        <el-time-select
                            :clearable="false"
                            placeholder="结束"
                            v-model="addMeeting.time[1]"
                            :picker-options="{
                                start: '09:00',
                                step: '00:30',
                                end: '19:00',
                                minTime: startTime
                            }">
                        </el-time-select>
                    </div>
                </div>
                <div class="row-ja fontSizeA">
                    <div class="editBtn bgc-main color-sCA1" @click="ensureAdd">确认</div>
                    <div class="editBtn border-main color-main" @click="cancelAdd">取消</div>
                </div>
            </div>
            
        </div>

        <!-- <div class="row-jc-ac bgc-opacity opacity" v-if="bookShow">
            <div class="editDialog bgc-sCA1">
                <div class="editItem row-ac color-sCA4">
                    <div class="fontSizeB editProperty">部门：</div>
                    <input class="fontSizeC editInput color-sCA4" v-model='bookMeeting.depart' placeholder="请输入部门">
                </div>
                <div class="editItem row-ac color-sCA4">
                    <div class="fontSizeB editProperty">申请人：</div>
                    <input class="fontSizeC editInput color-sCA4" v-model='bookMeeting.applicant' placeholder="请输入申请人">
                </div>
                <div class="editItem row-ac color-sCA4">
                    <div class="fontSizeB editProperty">用途：</div>
                    <input class="fontSizeC editInput color-sCA4" v-model='bookMeeting.use' placeholder="请输入用途">
                </div>
                <div class="editItem row-ac color-sCA4">
                    <div class="fontSizeB editProperty">会议室：</div>
                    <input class="fontSizeC editInput color-sCA4" v-model='bookMeeting.meetRoom' readonly>
                </div>
                <div class="editItem row-ac color-sCA4">
                    <div class="fontSizeB editProperty">会议时间：</div>
                    <div class="timeRange row-ac">
                        <el-time-select
                            placeholder="起始时间"
                            :clearable="false"
                            v-model="startTime"
                            :picker-options="{
                                start: bookMeeting.start,
                                step: '00:05',
                                end: bookMeeting.end
                            }">
                        </el-time-select>
                        <el-time-select
                            :clearable="false"
                            placeholder="结束时间"
                            v-model="endTime"
                            :picker-options="{
                                start: bookMeeting.start,
                                step: '00:05',
                                end: bookMeeting.end,
                                minTime: startTime
                            }">
                        </el-time-select>
                    </div>
                    
                </div>
                <div class="row-ja fontSizeA">
                    <div class="editBtn bgc-main color-sCA1" @click="ensureBook">确认</div>
                    <div class="editBtn border-main color-main" @click="cancelBook">取消</div>
                </div>
            </div>
            
        </div> -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            repe: [false,false,false,false,false],
            startTime: '',
            endTime: '',
            selectableRange: '',
            meetings: [
                {value: '7062 小会议室',label: '7062 小会议室'},
                {value: '7039 大会议室',label: '7039 大会议室'},
                {value: '7033 培训室',label: '7033 培训室'},

            ],
            bookShow: false,
            // bookMeeting: null,
            meetingTime: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
            addShow: false,
            editShow: false,
            editData: {},
            addMeeting: {
                time: ['',''],
                depart: '',
                applicant: '',
                use: '',
                meetRoom: ''
            },
            list7039: [
                {id: '0',time: '09:00 ~ 10:00',depart: '商务部',applicant: '', use: '',meetRoom: '7039大会议室'},
                {id: '1',time: '10:00 ~ 10:30',depart: 'IT',applicant: 'Gaogao', use: '每日Sprint会议',meetRoom: '7039大会议室'},
                {time: '10:30 ~ 15:30',type: 'free'},
                {id: '1',time: '15:30 ~ 16:30',depart: '行政',applicant: 'Tantan', use: '例会',meetRoom: '7039大会议室'},
                {time: '16:30 ~ 22:00',type: 'free'},
            ],
            smallList: [
                {id: '0',time: '09:00 ~ 10:00',depart: '商务部',applicant: '', use: '',meetRoom: '7062小会议室'},
                {id: '1',time: '10:00 ~ 10:30',depart: 'IT',applicant: 'Gaogao', use: '每日Sprint会议',meetRoom: '7062小会议室'},
                {id: '2',time: '12:00 ~ 12:30',depart: 'IT',applicant: 'Gaogao', use: '每日Sprint会议',meetRoom: '7062小会议室'},
                // {time: '10:30 ~ 12:30',type: 'free'}
            ]
        }
    },
    props: ['isLogin','selectDay'],
    created() {
        
    },
    computed: {
        checkToday() {
            var today = +new Date(new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate())
            var select = +new Date(this.selectDay)
            // console.log(today,select,today<select)
            return today<select
            // console.log()
        }
    },
    methods: {
        booking(str) {
            this.$set(this.addMeeting,'meetRoom',str)
            this.addShow = true
        },
        clickDel() {
            this.$confirm('此操作将永久删除该记录, 是否继续?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        clickEdit(item) {
            // console.log(item)
            // this.$set(this.editData,item)
            this.editData = item
            var arr = this.editData.time.split(' ~ ')
            if(!this.meetingTime) {
                this.meetingTime = []
                this.meetingTime.push(new Date(2020,7,17,parseInt(arr[0].split(':')[0]),parseInt(arr[0].split(':')[1])))
                this.meetingTime.push(new Date(2020,7,17,parseInt(arr[1].split(':')[0]),parseInt(arr[1].split(':')[1])))
            }else {
                this.meetingTime[0] = new Date(2020,7,17,parseInt(arr[0].split(':')[0]),parseInt(arr[0].split(':')[1]))
                this.meetingTime[1] = new Date(2020,7,17,parseInt(arr[1].split(':')[0]),parseInt(arr[1].split(':')[1]))
            }
            this.editShow = true
        },
        // bookNowTime(time) {
        //     this.bookShow = true
        //     var arr = time.split(' ~ ')
        //     this.startTime = arr[0]
        //     this.endTime = arr[1]
        //     this.$set(this.bookMeeting,'start',arr[0])
        //     this.$set(this.bookMeeting,'end',arr[1])
        //     this.$set(this.bookMeeting,'step','00:05')
        //     console.log(this.bookMeeting)
            
        //     this.selectableRange = arr.join('-')
        //     console.log(this.selectableRange)
        // },
        cancelEdit() {
            this.editShow = false
        },
        ensureEdit() {
            this.editShow = false
        },
        cancelAdd() {
            this.addShow = false
        },
        ensureAdd() {
            // console.log(this.addMeeting)
            this.addShow = false
        },
        cancelBook() {
            this.bookShow = false
        },
        ensureBook() {
            this.bookShow = false
        },
        selectTime() {
            // console.log(console.log(this.meetingTime))
        },
        selectTimeAdd() {
            console.log(this.addMeeting)
        },
        
    }
}
</script>
<style scoped>
.repeIcon {
    margin-left: 2px
}
.repeBox {
    position: absolute;
    left: 0;
    top: 30px;
    margin: auto;
    z-index: 10000;
    /* width: 200px; */
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.line {
    padding: 0 10px;
}
.el-date-editor .el-range-input {
    text-align: left !important;
}
.timeRange {
    flex: 1;
}
.timeRange .el-date-editor.el-input {
    width: 40px;
}
.free {
    cursor: pointer;
}
.free:hover{
    text-decoration: underline
}
.booking {
    padding: 2px 4px;
    cursor: pointer;
}
.booking:hover {
    margin-top: -2px;
}
.opacity {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
}
.editDialog {
    padding: 30px 40px;
    width: 300px;
    border-radius: 6px;
}
.editProperty {
    width: 100px;
}
.editBtn {
    text-align: center;
    line-height: 40px;
    width: 100px;
    height: 40px;
    border-radius: 4px;
    cursor: pointer;
}
/* .editName {
    margin: 
} */
.editItem {
    position: relative;
    margin-bottom: 30px;
    line-height: 30px;
    border-bottom: 1px solid rgba(217, 217, 217, 1);
}
.editInput {
    flex: 1;
    border: none;
    outline: none;
}
.wrap {
    padding: 20px;
    box-sizing: border-box;
    overflow: auto;
}
.meetRoom {
    padding: 20px;
    box-sizing: border-box;
    width: 28%;
}
.meetTop {
    padding: 20px;
    box-sizing: border-box;
    height: 60px;
}
.meetTop .icon {
    font-size: 28px;
    margin-right: 20px;
}
.meetItem {
    padding: 10px;
    box-sizing: border-box;
    height: 38px;
    border-bottom: 1px dashed rgba(217, 217, 217, 1)
}
/* .meetItem .icon {
    font-size: 18px;
} */
.meetList {
    flex: 1;
    overflow: auto;
}
.meetTime {
    padding-right: 10px;
    margin-right: 10px;
    border-right: 1px solid rgba(217, 217, 217, 1);
}
.meetUser {
    flex: 1
}
.edit {
    color: #2277DA;
    border: 1px solid #2277DA;
}
.del {
    color: #D9001B;
    border: 1px solid #D9001B;
    margin-left: 10px;
}
.edit:hover {
    background: #2277DA;
    color: #fff !important;
}
.del:hover {
    background: #D9001B;
    color: #fff !important;
}
.iconBox {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    cursor: pointer;
}
</style>