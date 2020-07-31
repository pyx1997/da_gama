<template>
    <div class="wrap">
        <div class="row-jc-ac bgc-opacity opacity">
            <div class="editDialog bgc-sCA1">
                <div class="editItem row-ac color-sCA4">
                    <div class="fontSizeB editProperty">部门：</div>
                    <input class="fontSizeC editInput color-sCA4" v-model='depart' placeholder="请输入部门">
                </div>
                <div class="editItem row-ac color-sCA4">
                    <div class="fontSizeB editProperty">申请人：</div>
                    <input class="fontSizeC editInput color-sCA4" v-model='applicant' placeholder="请输入申请人">
                </div>
                <div class="editItem row-ac color-sCA4">
                    <div class="fontSizeB editProperty">用途：</div>
                    <input class="fontSizeC editInput color-sCA4" v-model='use' placeholder="请输入用途">
                </div>
                <div class="editItem row-ac color-sCA4">
                    <div class="fontSizeB editProperty">会议室：</div>
                    <el-select v-model="meetRoom">
                        <el-option
                        v-for="item in meetings"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- <input class="fontSizeC editInput color-sCA4" v-model='addMeeting.meetRoom' readonly> -->
                </div>
                <div class="editItem selectDate row-ac color-sCA4">
                    <div class="fontSizeB editProperty">日期：</div>
                    <el-date-picker
                        v-model="date"
                        type="date"
                        placeholder="选择日期"
                        :clearable="false">
                    </el-date-picker>
                </div>
                <div class="editItem row-ac color-sCA4" v-if="addType=='add'"> 
                    <div class="fontSizeB editProperty">重复：</div>
                    <div class="row-jb-ac repeText" @click="clickRepe">
                        <div class="fontSizeC">{{repeText}}</div>
                        <div class="fontSizeC repeIcon" v-if="isLogin" :class="[repeShow? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></div>
                    </div>
                    <div class="repeBox flex-row bgc-sCA1 border-sCA7" v-if="repeShow">
                        <el-checkbox v-for="(item,index) in repe" :key='index' v-model="item.selected" @change="selectRepe()">{{item.text}}</el-checkbox>
                    </div>
                </div>
                <div class="editItem row-ac color-sCA4 fontSizeB">
                    <div class="fontSizeB editProperty">会议时间：</div>
                    <div class="timeRange row-ac">
                        <el-time-select
                            placeholder="开始"
                            :clearable="false"
                            v-model="time[0]"
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
                            v-model="time[1]"
                            :picker-options="{
                                start: '09:00',
                                step: '00:30',
                                end: '19:00',
                                minTime: time[0]
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
    </div>
</template>
<script>
export default {
    data() {
        return {
            repeShow: false,
            repe: [
                {text: '周日',selected: false},
                {text: '周一',selected: false},
                {text: '周二',selected: false},
                {text: '周三',selected: false},
                {text: '周四',selected: false},
                {text: '周五',selected: false},
                {text: '周六',selected: false},
            ],
            meetings: [
                {value: '7062 小会议室',label: '7062 小会议室'},
                {value: '7039 大会议室',label: '7039 大会议室'},
                {value: '7033 培训室',label: '7033 培训室'},

            ],
            id: '',
            meetRoom: '', //会议室名称
            depart: '',// 部门
            applicant: '',// 申请人
            use: '',// 用途
            date: '',// 日期
            time: ['',''],// [开始时间，结束时间]
            // addMeeting: {},
            repeText: '', // 重复
        }
    },
    created() {
        // for(var key in this.formData) {
        //     this.addMeeting[key] = this.formData[key]
        // }
        this.id = this.formData.meetingid
        this.depart = this.formData.meetingdepart
        this.applicant = this.formData.meetingpro
        this.use = this.formData.meetinguse
        this.date = this.formData.meetingday
        this.time = this.formData.time
        this.repeText = this.formData.meetingreuse
        this.meetRoom = this.formData.meetingname
        // console.log(this.addType)
        this.setRepe(this.repeText)
    },
    props: ['isLogin','formData','addType'],
    methods: {
        
        selectRepe() {
            
            var flag = this.repe.some(item => {
                return item.selected
            })
            var idx = 0
            if(!flag) {
                this.repeText = '不重复'
                // this.$set(this.addMeeting,'repeText','不重复')
            }else {
                this.repeText = ''
                // this.$set(this.addMeeting,'repeText','')
                this.repe.forEach((item,index) => {
                    if(item.selected) {
                        if (idx == 0) {
                            // this.$set(this.addMeeting,'repeText',item.text)
                            this.repeText += item.text
                        }else {
                            // this.$set(this.addMeeting,'repeText',this.addMeeting.repeText+'/'+item.text)
                            this.repeText += `/${item.text}`
                        }
                        idx++
                        if(idx == 7) {
                            this.repeText = '每天'
                        //    this.$set(this.addMeeting,'repeText','每天')
                        }
                    }
                });
            }
        },
        // 点击重复
        clickRepe() {
            if(this.isLogin) {
                this.repeShow = !this.repeShow
            }
            
        },
        // 点击取消
        cancelAdd() {
            // this.addShow = false
            this.repeShow = false
            // this.repeText = '不重复'
            this.repe.forEach((item,index) => {
                item.selected = false
            })
            this.$emit('changeAddShow')
        },
        // 点击确定时
        ensureAdd() {
            // 检查是否输入部门
            if(this.depart.trim() == '') {
                this.$message({
                    message: '请输入部门',
                    type: 'warning',
                    duration: 1000,
                })
                return
            }
            // 检查是否输入申请人
            if(this.applicant.trim() == '') {
                this.$message({
                    message: '请输入申请人',
                    type: 'warning',
                    duration: 1000,
                })
                return
            }
            // 检查是否选择日期
            if(this.date == '') {
                this.$message({
                    message: '请选择日期',
                    type: 'warning',
                    duration: 1000,
                })
                return
            }
            // 检查是否选择时间
            if(this.time[0].trim() == '') {
                this.$message({
                    message: '请选择会议开始时间',
                    type: 'warning',
                    duration: 1000,
                })
                return
            }
            if(this.time[1].trim() == '') {
                this.$message({
                    message: '请选择会议结束时间',
                    type: 'warning',
                    duration: 1000,
                })
                return
            }
            // 会议预定（点击会议预定弹出）
            if(this.addType == 'add') {
                this.bookMeeting()
            }else if(this.addType == 'edit') { // 当为编辑时
                // console.log(this.addType)
                this.editMeeting()
            }
            
            // this.addShow = false
        },
        // 修改会议记录
        async editMeeting() {
            if(typeof(this.date) == 'string') {
                var date = this.date
            }else {
                var date = this.changeDate(this.date)
            }
            var obj = {
                meetingid: this.id,
                meetingday: date,
                meetingname: this.meetRoom,
                meetingdepart: this.depart,
                meetingpro: this.applicant,
                meetinguse: this.use,
                meetingstarttime: this.time[0],
                meetingendtime: this.time[1]
            }
            var res = await this.$http.post('/index/meetingroomchange',obj)
            
            // console.log(res)
            if(res.status == 200 && res.data.ret== 200) {
                this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                })
                
                this.repeShow = false
                this.$emit('changeAddShow')
            }else {
                this.$message({
                    message: '修改失败',
                    type: 'error',
                    duration: 1000
                })
            }
        },
        
        // 设置重复选中按钮
        setRepe(str) {
            // console.log(str)
            if(str == '不重复') {
                this.repe.forEach((item,index) => {
                    item.selected = false
                }) 
            }else if(str == '每天') {
                this.repe.forEach((item,index) => {
                    item.selected = true
                })
            }else {
                var arr = str.split('/')
                // console.log(arr)
                arr.forEach((item1,index1) => {
                    var idx = this.repe.findIndex(item2 => {
                        return item1 == item2.text
                    })
                    // console.log(idx)
                    this.$set(this.repe[idx],'selected',true)
                })
            }
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
        // 预定会议
        async bookMeeting() {
            var date = this.changeDate(this.date)
            // 录入或的值
            var obj = {
                meetingname: this.meetRoom,
                meetingdepart: this.depart,
                meetingpro: this.applicant,
                meetinguse: this.use,
                meetingstarttime: this.time[0],
                meetingendtime: this.time[1],
                meetingreuse: this.repeText,
                meetingday: date
            }
            // console.log(obj)
            var res = await this.$http.post('/index/meetingroom/',obj)
            // console.log(res.data)
            if(res.status == 200 && res.data.ret== 200) {
                if(res.data.msg=='请求成功') {
                    this.$message({
                        message: '预定成功,请刷新页面查看',
                        type: 'success'
                    })
                    this.repe.forEach((item,index) => {
                        item.selected = false
                    })
                    this.repeShow = false
                    // console.log(this.addMeeting)
                    this.$emit('changeAddShow')
                }else if(res.data.msg == '重复') {
                    this.$message({
                        message: '选择时间有冲突，预定失败',
                        type: 'warning'
                    })
                }
                
            }else {
                this.$message({
                    message: '预定失败',
                    type: 'warning'
                })
            }
        }
    }
}
</script>
<style scoped>
.repeText {
    flex: 1;
    cursor: pointer;
}
.repeIcon {
    margin-left: 2px
}
.repeBox {
    width: 328px;
    flex-wrap: wrap;
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
    padding-right: 30px;
}
.el-date-editor .el-range-input {
    text-align: left !important;
}
.timeRange {
    flex: 1;
}
.timeRange .el-date-editor.el-input {
    width: 60px;
}
.opacity {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 1000000;
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
    margin-bottom: 26px;
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
</style>