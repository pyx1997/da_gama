<template>
    <div class="wrap flex-col">
        
        <div class="top row-jb-ac">
            <div class="meeting row-ac color-main fontSizeB">
                <!-- <div class="color-sCA4 back el-icon-arrow-left"></div> -->
                <!-- <div class="tag" @click="selectType('show')" :class="[type == 'show' ? 'selected' : 'bgc-blue2']">会议室使用情况</div>
                <div class="tag" @click="selectType('book')" :class="[type == 'book' ? 'selected' : 'bgc-blue2']">预定会议室</div> -->
                <el-select v-model="type" placeholder="请选择类型">
                    <el-option
                    v-for="item in types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <div class="tag bgc-blue2" @click="booking">预定会议室</div>
            </div>
            
            <!-- <div class="tLeft color-sCA1 bgc-main row-jc-ac">
                <div class="iconfont icon-huiyi"></div>
                <div class="fontSizeA">会议室管理</div>
            </div> -->
            <!-- <div class="row-jc-ac selectDate" v-if="type !='show'">
                <el-date-picker
                    v-model="selectDate"
                    type="date"
                    placeholder="选择日期"
                    :clearable="false">
                </el-date-picker>
            </div> -->
            <div class="tRight row-je-ac fontSizeB color-sCA4">
                <div v-if="isLogin">您的权限：管理员</div>
                <div v-else>您的权限：普通用户</div>
                <div class='logoutBox' v-if="isLogin">
                   <div class="logout border-main color-main" @click="logout">退出登录</div> 
                </div>
                <div class="login row-ac" v-else @click="goLogin">
                    <div class="el-icon-user loginLogo"></div>
                    <div>登录</div>
                </div>
                
            </div>
        </div>
        <div class="section">
            <weeker v-if="type=='week'" :refresh="refresh"></weeker>
            <show :isLogin = "isLogin" :selectDay="selectDay" v-else :refresh="refresh"></show>
            <!-- <router-view></router-view> -->
        </div>
        <div class="bgc-opacity loginWrap row-jc-ac" v-if="loginShow">
            <div class="loginBox bgc-sCA1 col-ac">
                <div class="el-icon-close closeLogo color-sCA4" @click="closeLogin"></div>
                <div class="color-main loginTitle">欢迎登录</div>
                <div class="row-ac loginLine">
                    <div class="el-icon-user logo color-main"></div>
                    <input class="loginInput fontSizeB" placeholder="请输入账号" v-model="userName">
                </div>
                <div class="row-ac loginLine">
                    <div class="el-icon-lock logo color-main"></div>
                    <input class="loginInput fontSizeB" type="password" placeholder="请输入密码" v-model="passWord">
                </div>
                <div class="loginBtn fontSizeA color-sCA1 bgc-main" @click="clickLogin">登录</div>
            </div>
        </div>

        <bookingbox class="fixed" :isLogin="isLogin" v-if="addShow" @changeAddShow="changeAddShow" :formData="formData" addType="add"></bookingbox>
    </div>
</template>
<script>
import show from './section'
import weeker from './week'
import bookingbox from './bookMeeting'
export default {
    data() {
        return {
            refresh: false,
            type: 'week',
            types: [
                {value: 'week',label: '按周查看'},
                {value: 'day',label: '按天查看'}
            ],
            isLogin: false,
            passWord: '',
            userName: '',
            loginShow: false,
            selectDate: '',
            selectDay: '',
            addShow: false,
            formData: {}
        }
    },
    watch: {
        selectDate(newValue,oldValue) {
            this.selectDay = this.changeDate(newValue)
            var today = +new Date(new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate())
            var select = +new Date(this.selectDay)
            // console.log(today,select,today<select)
            // console.log('date：',this.selectDay)
        }
    },
    components: {show,weeker,bookingbox},
    created() {
        var isLogin = localStorage.getItem('isLogin')
        if(isLogin && isLogin=='login') {
            this.isLogin = true
        }
        this.selectDate = new Date()
        this.selectDay = this.changeDate(this.selectDate)
    },
    methods: {
        changeAddShow() {
            this.addShow = false
            this.refresh = !this.refresh
        },
        booking() {
            // this.$set(this.addMeeting,'meetRoom',str)
            // console.log('kk')
            this.formData = {
                meetingid: '',
                time: ['',''],
                meetingdepart: '',
                meetingpro: '',
                meetinguse: '',
                meetingday: '',
                meetingname: '7062 小会议室',
                meetingreuse: '不重复'
            }
            this.addShow = true
        },
        goLogin() {
            this.loginShow = true
        },
        selectType(type) {
            this.type = type
        },
        closeLogin() {
            this.loginShow = false
        },
        logout() {// 退出登录
            this.isLogin = false
            localStorage.removeItem('isLogin')
        },
        clickLogin() {
            var pass = this.passWord.trim()
            var user = this.userName.trim()
            if(pass == '' || user == '') {
                this.$message({
                    message: '账号或密码不能为空',
                    type: 'warning'
                })
            }else if (pass != '123456' || user != 'admin') {
                this.$message({
                    message: '账号或密码错误',
                    type: 'error'
                })
            }else {
                this.isLogin = true
                this.loginShow = false
                localStorage.setItem('isLogin','login')
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
    }
}
</script>
<style scoped>
.back {
    font-size: 26px;
    margin-right: 10px;
}
.fixed {
    position: fixed;

}
.tag {
    margin-left: 10px;
    border-radius: 2px;
    cursor: pointer;
    padding: 6px 10px;
    /* border-left: 2px solid #fff;
    border-top: 2px solid #fff;
    border-bottom: 2px solid #888;
    border-right: 2px solid #888; */
}
/* .selected {
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    border-top: 2px solid #888;
    border-left: 2px solid #888;
    background: rgb(205, 228, 253)
} */
.tag:hover{
    background: rgb(205, 228, 253)
}
.top .el-date-editor.el-input {
  width: 180px;
}
.section {
    flex: 1;
    width: 100%;
    overflow: auto;
}
.selectDate {
    /* margin-left: 42%; */
    /* position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px; */
}
.top {
    padding: 0 30px;
    box-sizing: border-box;
    position: relative;
    height: 50px;
    box-shadow:0px 2px 6px 0px rgba(12,12,13,0.1);
}
.tLeft {
    height: 100%;
    width: 200px;
}
.icon-huiyi {
    margin-right: 6px;
    font-size: 28px;
}
.tRight {
    /* width: 300px; */
    position: relative;
    z-index: 10000;
    box-sizing: border-box;
    height: 100%;
    /* flex: 1; */
}
.login {
    margin-left: 10px;
    padding-left: 10px;
    border-left: 1px solid #666666;
    cursor: pointer;
}
.login:hover {
    color: #2277DA
}
.loginLogo {
    font-size: 20px;
    margin-right: 4px
}
.logoutBox {
    padding-left: 10px;
    margin-left: 10px;
    border-left: 1px solid #666666;
}
.logout {
    padding: 2px 6px;
}
.logout:hover {
    background: #2277DA;
    color: #fff;
    cursor: pointer;
}
.loginWrap {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
}
.loginBox {
    position: relative;
    border-radius: 10px;
    width: 400px;
    /* height: 400px; */
}
.closeLogo {
    font-size: 24px;
    position: absolute;
    padding: 10px;
    top: 0px;
    right: 0px;
    cursor: pointer;
}
.loginTitle {
    padding: 30px 0 40px;
    font-size: 24px;
    letter-spacing: 2px;
    font-weight: 600;
}
.loginBox .logo {
    font-size: 24px;
    margin-right: 20px;
}
.loginLine {
    width: 300px;
    margin-bottom: 30px;
    border-bottom: 1px solid #CFD4DB;
}
.loginInput {
    flex: 1;
    height: 28px;
    line-height: 28px;
    border: none;
    outline: none;
}
.loginBtn {
    width: 300px;
    height: 36px;
    margin: 30px 0 40px;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
}
</style>