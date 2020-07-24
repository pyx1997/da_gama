<template>
    <div class="wrap flex-col">
        <booking class="fixed" :isLogin="isLogin" v-if="addShow" @changeAddShow="changeAddShow" :formData="formData" :addType="addType"></booking>
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
        </div>
        
        
    </div>
</template>
<script>
import booking from './bookMeeting'
export default {
    components: {booking},
    data() {
        return {
            selectDate: '',
            addType: 'add',
            formData: {},
            startTime: '',
            endTime: '',
            addShow: false,
            smallList: [
                {id: '0',time: '09:00 ~ 10:00',depart: '商务部',applicant: '', use: '',repeText: '不重复', meetRoom: '7062 小会议室',date: ''},
                {id: '1',time: '10:00 ~ 10:30',depart: 'IT',applicant: 'Gaogao', use: '每日Sprint会议',repeText: '每天', meetRoom: '7062 小会议室',date:''},
                {id: '2',time: '12:00 ~ 12:30',depart: 'IT',applicant: 'Gaogao', use: '每日Sprint会议',repeText: '周三', meetRoom: '7062 小会议室',date:''}
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
        changeAddShow() {
            this.addShow = false
        },
        
        // 点击预定
        booking(str) {
            // this.$set(this.addMeeting,'meetRoom',str)
            this.formData = {
                time: ['',''],
                depart: '',
                applicant: '',
                use: '',
                date: '',
                meetRoom: '7062 小会议室',
                repeText: '不重复'
            }
            this.addType = 'add'
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
            for(var key in item) {
                if(key == 'time') {
                    this.formData[key] = item[key].split(' ~ ')
                }else {
                    this.formData[key] = item[key]
                }
                
            }
            this.addType = 'edit'
            this.addShow = true
        },
        
    }
}
</script>
<style scoped>
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