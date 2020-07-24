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
                <div class="editItem row-ac color-sCA4"> 
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
            meetRoom: '',
            depart: '',
            applicant: '',
            use: '',
            date: '',
            time: ['',''],
            addMeeting: {},
            repeText: ''
            // addMeeting: {
            //     time: ['',''],
            //     depart: '',
            //     applicant: '',
            //     use: '',
            //     date: '',
            //     meetRoom: '7062 小会议室',
            //     repeText: '不重复'
            // },
        }
    },
    created() {
        // for(var key in this.formData) {
        //     this.addMeeting[key] = this.formData[key]
        // }
        this.depart = this.formData.depart
        this.applicant = this.formData.applicant
        this.use = this.formData.use
        this.date = this.formData.date
        this.time = this.formData.time
        this.repeText = this.formData.repeText
        this.meetRoom = this.formData.meetRoom
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
        cancelAdd() {
            // this.addShow = false
            this.repeShow = false
            // this.repeText = '不重复'
            this.repe.forEach((item,index) => {
                item.selected = false
            })
            this.$emit('changeAddShow')
        },
        ensureAdd() {
            // console.log(this.addMeeting)
            // this.repeText = '不重复'
            this.repe.forEach((item,index) => {
                item.selected = false
            })
            this.repeShow = false
            // console.log(this.addMeeting)
            this.$emit('changeAddShow')
            // this.addShow = false
        },
        // 设置重复选中按钮
        setRepe(str) {
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
                    console.log(idx)
                    this.$set(this.repe[idx],'selected',true)
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