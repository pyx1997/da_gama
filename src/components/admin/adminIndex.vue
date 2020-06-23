<template>
    <div class="container">
        <div class="section system">
            <div class="tab borderB-sCA7 row-jb-ac">
                <div class="tabText borderB-main color-sCA8">行政制度</div>
                <!-- <i class="download el-icon-download color-sCA8" title="下载原文件" @click="download"></i> -->
            </div>
            <div class="systemItems row-ja">
                <div class="systemItem col-ac email" v-for="(item,index) in systemList" :key="index" @click="clickSystem(item.img,item.text,item.file,item.fileName)">
                    <div class="iconBox row-jc-ac"> 
                        <div class="filltx row-jc-ac" :class="item.color"></div>
                        <!-- <div class="iconfont icon-tx-fill-liubianxing filltx row-jc-ac" :class="item.color">
                            
                        </div> -->
                        <div class="iconfont color-sCA1 smIcon" :class="item.icon"></div>
                        
                    </div>
                    <div class="iconText color-sCA8">{{item.text}}</div>
                </div>
            </div>
        </div>
        <div class="wrapBox row-jb">
            <div class="noticeBox">
                <div class="tab borderB-sCA7 row-jb-ac">
                    <div class="tabText borderB-main color-sCA8">通知公告</div>
                    <div class="more color-sCA4" title="查看所有通知" @click="clickMoreInform">更多 >></div>
                </div>
                <div class="informList color-sCA4" @mouseenter="mouseenter" @mouseleave="mouseleave">
                    <ul :class="textArr.length>1?{inform_top:animate}:''" class="inform_list">
                        <li class="item row-ac" v-for="(item,index) in textArr" :key="index" @click="clickInformItem" title="查看详情">
                            <div class="text">{{item.text}}</div>
                            <div class="date">{{item.date}}</div>
                        </li>
                    </ul>
                    
                </div>
            </div>
            <div class="promoteBox">
                <div class="tab borderB-sCA7 row-jb-ac">
                    <div class="tabText borderB-main color-sCA8">岗位晋升</div>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="tab borderB-sCA7 row-jb-ac">
                <div class="tabText borderB-main color-sCA8">每月期刊</div>
            </div>
            <div class="period">
                <i class="el-icon-arrow-left iconleft color-sCA7" :class="{'not-allowed' : perIdx == 0}" @click="clickLeft"></i>
                <!-- <transition> -->
                    <div class="flex-row periodicalItems" :class="[perIdx == 1 ? 'period2' : '']" ref="periodicalItems">
                    
                        <div class="periodicalItem" title="查看原文件" v-for="(item,index) in periodicals" :key="index" @click="showDetail(item.mark,item.num)">
                            <img :src="item.img" class="cover"/>
                            <!-- <div class="coverText1 color-sCA8">
                                <div>{{item.num}}</div>
                                <div class="theme">{{item.theme}}</div>
                            </div> -->
                            <div class="coverText bgc-opacity">
                                <div class="color-sCA1">{{item.num}}</div>
                                <div class="color-sCA1 theme">{{item.theme}}</div>
                            </div>
                        </div>
                    </div>
                <!-- </transition> -->
                <i class="el-icon-arrow-right iconright color-sCA7" :class="{'not-allowed' : perIdx == 1}" @click="clickRight"></i>
            </div>
            
        </div>
        
        
    </div>
</template>
<script>
var timer;
var img1 = require('../../assets/img/periodical/cover1.png')
var img2 = require('../../assets/img/periodical/cover2.png')
var img3 = require('../../assets/img/periodical/cover3.png')
var img4 = require('../../assets/img/periodical/cover4.png')
var img5 = require('../../assets/img/periodical/cover5.png')
var img6 = require('../../assets/img/periodical/cover6.png')
var img7 = require('../../assets/img/periodical/cover7.png')

var email = require('../../assets/img/admin/system/email.jpg')
var kpI = require('../../assets/img/admin/system/kpI.jpg')
var check = require('../../assets/img/admin/system/check.jpg')
var dimission = require('../../assets/img/admin/system/dimission.jpg')
var entry = require('../../assets/img/admin/system/entry.jpg')
var invite = require('../../assets/img/admin/system/invite.jpg')
var meeting = require('../../assets/img/admin/system/meeting.jpg')
var purchase = require('../../assets/img/admin/system/purchase.jpg')
var regular = require('../../assets/img/admin/system/zhuanz.jpg')

export default {
    data () {
        return {
            perIdx: 0,
            idx: 0,
            animate: false,
            interval: null,
            systemList: [
                {text: '邮件管理',icon: 'icon-youjian',color: 'bgc-blue4',class: '',img: email,file: 'email.docx',fileName: 'MRF邮件管理制度.pdf'},
                {text: 'KPI考核',icon: 'icon-KPIguanli',color: 'bgc-purple1',class: '',img: kpI,file: 'kpI.docx',fileName: 'KPI考核管理制度.pdf'},
                {text: '入职管理',icon: 'icon-yuangongruzhi',color: 'bgc-or1',class: '',img: entry,file: 'entry.docx',fileName: 'MRF入职管理制度.pdf'},
                {text: '转正管理',icon: 'icon-zhuanzheng1',color: 'bgc-green2',class: '',img: regular,file: 'regular.docx',fileName: 'MRF转正管理制度.pdf'},
                {text: '离职管理',icon: 'icon-lizhi1',color: 'bgc-red2',class: '',img: dimission,file: 'dimission.docx',fileName: 'MRF离职管理制度.pdf'},
                {text: '考勤管理',icon: 'icon-baobeikaoqin',color: 'bgc-purple1',class: '',img: check,file: 'check.docx',fileName: 'MRF考勤管理制度.pdf'},
                {text: '会议管理',icon: 'icon-huiyishi',color: 'bgc-or1',class: '',img: meeting,file: 'meeting.docx',fileName: 'MRF会议管理制度.pdf'},
                {text: '采购管理',icon: 'icon-caigouguanli-',color: 'bgc-green2',class: '',img: purchase,file: 'purchase.docx',fileName: 'MRF采购管理制度.pdf'},
                {text: '招聘管理',icon: 'icon-zhaopin',color: 'bgc-red2',class: '',img: invite,file: 'invite.docx',fileName: 'MRF招聘管理制度终版.pdf'},
            ],
            periodicals: [
                {num: '第七期',theme: 'MRF 11 周年',img: img7,mark: 7},
                {num: '第六期',theme: '向最美劳动者致敬',img: img6,mark: 6},
                {num: '第五期',theme: '众志成城 抗击疫情',img: img5,mark: 5},
                {num: '第四期',theme: '优秀员工事迹',img: img4,mark: 4},
                {num: '第三期',theme: 'Jim个人专访',img: img3,mark: 3},
                {num: '第二期',theme: 'Jana个人专访',img: img2,mark: 2},
                {num: '第一期',theme: 'Tyler个人专访',img: img1,mark: 1},
            ],
            textArr: [
                {text: '这是一段文字文字这是一段文字文字这是一段文字文字这是一段文字文字这是一段文字文字这是一段文字文字',date: '2020-04-28'},
                {text: '这是一段文字文字这是一段文字文字',date: '2020-04-28'},
                {text: '这是一段文字文字这是一段文字文字',date: '2020-04-28'},
                {text: '这是一段文字文字这是一段文字文字',date: '2020-04-28'},
                {text: '这是一段文字文字',date: '2020-04-28'},
                {text: '这是一段文字文字',date: '2020-04-28'},
                {text: '这是一段文字文字这是一段文字文字这是一段文字文字',date: '2020-04-28'},
                {text: '这是一段文字文字',date: '2020-04-28'},
                {text: '这是一段文字文字',date: '2020-04-28'},
                {text: '这是一段文字文字',date: '2020-04-28'},
                {text: '这是一段文字文字',date: '2020-04-28'},
                {text: '这是一段文字文字这是一段文字文字这是一段文字文字',date: '2020-04-28'},
                {text: '这是一段文字文字这是一段文字文字这是一段文字文字',date: '2020-04-28'},
                {text: '这是一段文字文字',date: '2020-04-28'},
                {text: '这是一段文字文字',date: '2020-04-28'},
                {text: '这是一段文字文字',date: '2020-04-28'},
            ],
            // ie: false
        }
    },
    created () {
        // 页面显示
        let t = this
        t.interval = setInterval(t.showInform, 2000)
    },
    mounted () {
        // this.ie = this.isIE()
        // console.log("isIE:",this.isIE())
    },
    methods: {
        
        showInform () {
            let t = this
            t.animate = true
            setTimeout(() => {
                t.textArr.push(t.textArr[0])
                t.textArr.shift()
                t.animate = false
            }, 500)
        },
        mouseenter() {
            clearInterval(this.interval)
            
        },
        mouseleave() {
            this.interval = setInterval(this.showInform, 2000)
        },
        clickInformItem() {
            this.$router.push('/index/admin/informDetail')
        },
        clickMoreInform() {
            this.$router.push('/index/admin/informList')
        },
        showDetail(index,name) {
            // window.open('http://192.168.53.250/download/admin/periodical/MRF期刊'+name+'.pdf')
            this.$router.push({
                name: 'periodicalDetail',
                params: {
                    index:index,
                    name: "MRF期刊"+name
                }
            })
        },
        clickSystem(img,text,file,fileName) {
            // console.log('file1:',file)
            this.$router.push({
                name:'systemDetail',
                params: {
                    img: img,
                    name:text+'制度',
                    file: file,
                    fileName: fileName
                }
            })
        },
        clickLeft() {
            this.perIdx = 0
        },
        clickRight() {
            this.perIdx = 1
        }
    }
}
</script>
<style scoped>
.section {
    width: 94%;
    margin-bottom: 40px;
}
/* .tab {
    margin-bottom: 20px;
} */
.tabText {
    /* width: 100px; */
    padding: 0 10px;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    border-bottom-width: 4px !important;
}

.systemItems {
    width: 100%;
    margin-top: 20px;
}
.systemItem {
    position: relative;
    width: 9%;
    cursor: pointer;
}
.systemItem:hover {
    margin-top: -4px;
    box-shadow:2px 4px 6px 4px rgba(0,0,0,0.2);
}
.iconBox {
    width: 1.6rem;
    height: 1.6rem;
    position: relative;
}
.iconBox .smIcon {
    position: absolute;
    z-index: 1000;
    /* left: 50%; */
    left:0;
    top: 0;
    /* top: 50%; */
    /* margin-left: -0.25rem; */
    /* margin-top: -0.25rem; */
    font-size: .5rem;
    font-weight: 500;
    line-height: 1.6rem;
    width: 1.6rem;
    text-align: center;
    /* transform: rotate(-90deg) */
}
.iconText {
    text-align: center;
    font-size: .20rem;
    font-weight: bold;
    letter-spacing: 2px;
}
.filltx {
    /* transform: rotate(45deg); */
    font-size: 1.6rem;
    width: 0.9rem;
    height: 0.9rem;
    text-align: center;
}
.iconfont:before {
    /* content: "\E64B"; */
    display: block !important;
}
.periodical {
    /* overflow: scroll; */
    width: 94%;
}
.periodicalItems {
    width: 140%;
    position: relative;
    margin-top: 20px;
    /* width: 1500px; */
    overflow: auto;
    transition: all 1s;
    /* margin-left: -40px; */
}
.period {
    width: 100%;
    overflow: hidden;
}
.period2 {
    /* transition: left 1s; */
    margin-left: -40%;
}
.promoteBox {
    width: 40%;
}
.iconleft {
    position: absolute;
    left: -10px;
    top: 50%;
    font-size: 40px;
    margin-top: -20px;
    font-weight: bold;
    cursor: pointer;
    z-index: 100;
}
.not-allowed {
    cursor: not-allowed !important;
}
.iconright {
    position: absolute;
    right: -10px;
    top: 50%;
    font-size: 40px;
    margin-top: -20px;
    font-weight: bold;
    cursor: pointer;
}
.noticeBox {
    width: 58%
}
.coverText {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 4px 2px;
    box-sizing: border-box;
    /* text-align: center; */
    font-size: 14px;
}
.coverText1 {
    margin-top: 10px;
    /* margin-bottom: 20px; */
    text-align: center;
    font-size: 14px;
}
.theme {
    font-weight: bold;
}
.slideshow {
    position: relative;
    width: 400px;
    height: 100%; 
}
.periodicalItem {
    /* min-width: 2.2rem; */
    margin: 0 2% 20px;
    box-sizing: content-box;
    width: 16%;
    position: relative;
    cursor: pointer;
}
.periodicalItem:hover {
    box-shadow:2px 4px 4px 4px rgba(0,0,0,0.2);
    margin-top: -2px;
}
.cover {
    width: 100%;
}
.slideshow:hover .arrow{
    display: flex
}
.dotBox {
    position: absolute;
    bottom: 10px;
    width: 100%;
}
.arrow {
    /* display: none; */
    width: 100%;
    position: absolute;
    top: 50%;
    margin-top: -20px;
    font-size: 40px;
}
.leftArrow {
    cursor: pointer;
}
.inform_list {
    height: 270px;
    overflow: hidden;
}
.inform_top {
    transition: all 0.5s;
    margin-top: -30px;
}
.slide-enter-active, .slide-leave-active {
    transition: all 1s linear;
}
.slide-enter{
    transform: translateY(20px) scale(1);
    opacity: 1;
}
.slide-leave-to {
    transform: translateY(-20px) scale(0.8);
    opacity: 0;
}
.informBox {
    /* width: 40%; */
    width: 32%;
    /* min-width: 364px; */
}
.top {
    box-sizing: border-box;
    height: 50px;
    line-height: 50px;
    padding: 0 20px
}
.periodicalContent {
    width: 100%;
    /* overflow: auto; */
    /* height: 270px; */
    /* padding: 20px 0; */
    box-sizing: border-box;
    box-shadow:0px 2px 6px 0px rgba(0,0,0,0.2);
    margin-bottom: 20px;
}
.period {
    position: relative;
}
.informList {
    position: relative;
    top: 0px;
    left: 0px;
    height: 290px;
    padding: 10px;
    box-sizing: border-box;
    /* box-shadow:0px 2px 6px 0px rgba(0,0,0,0.2); */
    border-radius: 5px;
    font-size: 14px;
    overflow: hidden;
}
.wrapBox {
    width: 94%;
    margin-bottom: 20px;
}
.item { 
    /* position: absolute; */
    line-height: 30px;
    cursor: pointer;
    /* padding-left: 10px; */
}
.item .date {
    min-width: 80px;
    width: 80px;
    padding-left: 10px;
    box-sizing: content-box;
}
.item .text {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.title {
    font-size: 18px;
    font-weight: bold;
    /* text-align: center; */
}
.notice {
    width: 100%;
    height: 40px;
    overflow: hidden;
    white-space:nowrap;
}
.more {
    padding-right: 10px;
    font-size: 12px;
    cursor: pointer;
}
.more:hover {
    color: #2277DA;
    font-weight: bold;
}
li:hover {
    color: #2277DA
}
</style>