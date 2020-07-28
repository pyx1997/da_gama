<template>
    <div class="wrap flex-col">
        
        <div class="selectDateWrap fontSizeB color-sCA4 row-jc-ac">
            <div>选择日期：</div>
            <div class="row-jc-ac meetselectDate">
                <el-date-picker
                    v-model="selectDate"
                    type="date"
                    placeholder="选择日期"
                    :clearable="false">
                </el-date-picker>
            </div>
        </div>
        <div class="row-jb meetRooms">
            <div class="meetRoom flex-col">
                <div class="meetTop row-jb-ac color-sCA1 bgc-blue4">
                    <div class="row-ac">
                        <div class="iconfont icon-huiyi icon"></div>
                        <div class="fontSizeA">7062 小会议室</div>
                    </div>
                    
                    <!-- <div class="fontSizeC color-sCA1 border-sCA1 booking" @click="booking('7062小会议室')" v-if="checkToday">预定</div> -->
                </div>
                
                <div class="meetList border-sCA7">
                    <div class="fontSizeA color-sCA7 empty" v-if="list7062.length==0">没有会议数据</div>
                    <div class="meetItem row-ac fontSizeB color-sCA4" v-for="(item,index) in list7062" :key="index">
                        <div class="meetTime">{{item.time}}</div>
                        <div class="meetUser">{{item.meetingdepart}}</div>
                        <div class="iconBox edit row-jc-ac" title="修改" v-if="isLogin" @click="clickEdit(item)">
                            <div class="el-icon-edit fontSizeB"></div>
                        </div>
                        <div class="iconBox del row-jc-ac" title="删除" v-if="isLogin" @click="clickDel(item.meetingid)">
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
                    <div class="fontSizeA color-sCA7 empty" v-if="list7039.length==0">没有会议数据</div>
                    <div class="meetItem row-ac fontSizeB color-sCA4" v-for="(item,index) in list7039" :key="index">
                        <div class="meetTime">{{item.time}}</div>
                        <div class="meetUser">{{item.meetingdepart}}</div>
                        <div class="iconBox edit row-jc-ac" title="修改" v-if="isLogin" @click="clickEdit(item)">
                            <div class="el-icon-edit fontSizeB"></div>
                        </div>
                        <div class="iconBox del row-jc-ac" title="删除" v-if="isLogin" @click="clickDel(item.meetingid)">
                            <div class="el-icon-delete fontSizeB"></div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="meetRoom flex-col">
                <div class="meetTop row-ac color-sCA1 bgc-purple1">
                    <div class="iconfont icon-huiyi icon"></div>
                    <div class="fontSizeA">7033 培训室</div>
                </div>
                <div class="meetList border-sCA7">
                    <div class="fontSizeA color-sCA7 empty" v-if="list7033.length==0">没有会议数据</div>
                    <div class="meetItem row-ac fontSizeB color-sCA4" v-for="(item,index) in list7033" :key="index">
                        <div class="meetTime">{{item.time}}</div>
                        <div class="meetUser">{{item.meetingdepart}}</div>
                        <div class="iconBox edit row-jc-ac" title="修改" v-if="isLogin" @click="clickEdit(item)">
                            <div class="el-icon-edit fontSizeB"></div>
                        </div>
                        <div class="iconBox del row-jc-ac" title="删除" v-if="isLogin" @click="clickDel(item.meetingid)">
                            <div class="el-icon-delete fontSizeB"></div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        <booking class="fixed" :isLogin="isLogin" v-if="addShow" @changeAddShow="changeAddShow" :formData="formData" :addType="addType"></booking>
        
    </div>
</template>
<script>
import booking from './bookMeeting'
export default {
    components: {booking},
    data() {
        return {
            selectDate: new Date(),
            addType: 'add',
            formData: {},
            startTime: '',
            endTime: '',
            addShow: false,
            // list7062: [
            //     {id: '0',time: '09:00 ~ 10:00',depart: '商务部',applicant: '', use: '',repeText: '不重复', meetRoom: '7062 小会议室',date: ''},
            //     {id: '1',time: '10:00 ~ 10:30',depart: 'IT',applicant: 'Gaogao', use: '每日Sprint会议',repeText: '每天', meetRoom: '7062 小会议室',date:''},
            //     {id: '2',time: '12:00 ~ 12:30',depart: 'IT',applicant: 'Gaogao', use: '每日Sprint会议',repeText: '周三', meetRoom: '7062 小会议室',date:''}
            // ],
            list7062: [],
            list7039: [],
            list7033: []
        }
    },
    props: ['isLogin','selectDay','refresh'],
    created() {
        this.getList()
    },
    watch: {
        selectDate(newValue,oldValue) {
            this.getList()
        },
        refresh() {
            this.getList()
        }
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
        changeAddShow() {
            this.addShow = false
        },
        // 获取数据列表
        async getList() {
            var date = this.changeDate(this.selectDate)
             // 获取7062小会议室数据
            var res1 = await this.$http.post('http://192.168.53.24/tp5seawatch/public/index/meetingroomlist/',{meetingday: date,meetingname: '7062 小会议室'})
            if(res1.status == 200 && res1.data.ret == 200 ) {
                this.list7062 = res1.data.data
                // console.log(this.list7062)
            }else {
                this.$message({
                    message: '获取7062小会议室数据失败',
                    type: 'warning',
                    duration: 1000
                })
            }
             // 获取7039大会议室数据
            var res2 = await this.$http.post('http://192.168.53.24/tp5seawatch/public/index/meetingroomlist/',{meetingday: date,meetingname: '7039 大会议室'})
            if(res2.status == 200 && res2.data.ret == 200 ) {
                this.list7039 = res2.data.data
            }else {
                this.$message({
                    message: '获取7039大会议室数据失败',
                    type: 'warning',
                    duration: 1000
                })
            }
            // 获取7033培训室数据
            var res3 = await this.$http.post('http://192.168.53.24/tp5seawatch/public/index/meetingroomlist/',{meetingday: date,meetingname: '7033 培训室'})
            if(res3.status == 200 && res3.data.ret == 200 ) {
                this.list7033 = res3.data.data
            }else {
                this.$message({
                    message: '获取7033培训室数据失败',
                    type: 'warning',
                    duration: 1000
                })
            }
        },
        
        // 点击预定
        // booking() {
        //     // this.$set(this.addMeeting,'meetRoom',str)
        //     this.formData = {
        //         time: ['',''],
        //         depart: '',
        //         applicant: '',
        //         use: '',
        //         date: '',
        //         meetRoom: '7062 小会议室',
        //         repeText: '不重复'
        //     }
        //     this.addType = 'add'
        //     this.addShow = true
        // },
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
            for(var key in item) {
                if(key == 'time') {
                    this.formData[key] = item[key].split(' ~ ')
                }else {
                    this.formData[key] = item[key]
                }
            }
            // console.log('formData',this.formData)
            this.addType = 'edit'
            this.addShow = true
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
.empty {
    text-align: center;
    line-height: 60px;
}
.selectDateWrap {
    /* width: 200px; */
    line-height: 30px;
    margin-left: 20px;
    margin-bottom: 30px;
    padding: 0 10px;
}
.meetRooms {
    padding: 0 20px;
    flex: 1;
}
.fixed {
    position: fixed;

}
.el-date-editor .el-range-input {
    text-align: left !important;
}
.booking {
    padding: 2px 4px;
    cursor: pointer;
}
.booking:hover {
    margin-top: -2px;
}
.wrap {
    padding: 20px;
    box-sizing: border-box;
    overflow: auto;
}
.meetRoom {
    /* padding: 20px; */
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