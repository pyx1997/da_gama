<template>
    <div class="container">
        <div class="section row-ac phoneWrap ">
            <i class="el-icon-phone phoneIcon color-main"></i>
            <div class="phoneBox color-sCA4">
                <div @mouseover="stop" @mouseout="move">{{phoneText}}</div>    
            </div>
        </div>
        <div class="section row-jb">
            
            <div class="questionBox">
                <div class="tab borderB-sCA7 row-jb-ac">
                    <div class="tabText borderB-main color-sCA8">常见问题解决方法</div>
                </div>
                <el-row class="questionList flex-row">
                    <el-col class="questionItem" :lg='6' :md='6' :sm='8' :xs="12" v-for="(item,index) in questionList" :key="index">
                        <div class="col-ac">
                            <img src="../../assets/img/IT/file.png" class="fileImg">
                            <div class="questionName color-sCA4">{{item.name}}</div>
                        </div>
                        
                    </el-col>
                </el-row>
            </div>

            <div class="trainBox">
                <div class="tab borderB-sCA7 row-jb-ac">
                    <div class="tabText borderB-main color-sCA8">MRF培训资料</div>
                </div>
                <div class="color-sCA4 train">
                    <ul class="">
                        <li v-for="(item,index) in train" :key="index" @click="clickTrain(item.img,item.name,item.type,item.path)" class="trainLi">
                            {{item.name}}
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
        <div class="section">
            <div class="tab borderB-sCA7 row-jb-ac">
                <div class="tabText borderB-main color-sCA8">常用软件下载</div>
                <!-- <div class="line bgc-sCA1"></div> -->
                <!-- <i class="download el-icon-download color-sCA8" title="下载原文件" @click="download"></i> -->
            </div>
            <el-row class="row row-js">
                <el-col :lg="3" :md="4" :sm="6" :xs="8" class="row-jc" v-for="(item,index) in softList" :key="index">
                    <div class="softItem col-ac" @click="clickSoft(item.path)" title="下载">
                        <div class="imgBox row-jc-ac">
                            <img :src="item.img" class="" />
                        </div>
                        <div class="softName color-sCA4">{{item.name}}</div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
var timer
var foxmailImg = require('../../assets/img/IT/foxmail.jpg')
var skypeImg = require('../../assets/img/IT/skypeLogo.png')
var qqImg = require('../../assets/img/IT/qq.png')
var pdfImg = require('../../assets/img/IT/pdfspeed.png')
var pdfChange = require('../../assets/img/IT/pdfChange.png')
var pdfEdit = require('../../assets/img/IT/pdfEdit.png')
var fmsImg = require('../../assets/img/IT/fms.png')
var TeamViewer = require('../../assets/img/IT/TeamViewer.png')
var img360 = require('../../assets/img/IT/360.png')
var img263 = require('../../assets/img/IT/263.png')
var sun = require('../../assets/img/IT/sun.png')
var txMeet = require('../../assets/img/IT/txMeet.jpg')
var google = require('../../assets/img/IT/google.jpg')
export default {
    data() {
        return {
            questionList: [
                {name: 'Foxmail问题',list: [
                    {title: '如何设置退订邮件（如何运用超链接）',img: 'Foxmail/1.png'},
                    {title: '假日申请邮箱',img: 'Foxmail/2.png'},
                    {title: '拆穿邮箱骗术！263企业邮箱教你防范邮箱“黑科技”',img: 'Foxmail/3.png'},
                    {title: 'Foxmail显示不了图片（表格出不来、设置了纯文本）',img: 'Foxmail/4.png'},
                    {title: 'Foxmail更改服务器为263的服务器',img: 'Foxmail/5.png'},
                    {title: 'Foxmail更新教程',img: 'Foxmail/6.png'},
                    {title: '错误信息501（please check emil<>）',img: 'Foxmail/7.png'},
                    {title: 'Foxmail收取文件自动进文件夹（邮件自动分类）',img: 'Foxmail/8.png'},
                    {title: 'Foxmail更改服务器（邮件发送不出去或收不进来）',img: 'Foxmail/9.png'},
                    {title: 'Foxmail发送或接收时出现错误（错误信息550）',img: 'Foxmail/10.png'},
                    {title: 'Foxmail接收密码错误',img: 'Foxmail/11.png'},
                    {title: '双击Foxmail打不开',img: 'Foxmail/12.png'},
                    {title: '邮箱硬盘已满问题',img: 'Foxmail/13.png'},
                    {title: '垃圾邮件、钓鱼邮件辨识方法及例子',img: 'Foxmail/14.png'},
                    {title: '邮箱自动收取以前邮件问题',img: 'Foxmail/15.png'},
                    {title: '邮件搜索不出来（但是可以手动寻找到）',img: 'Foxmail/16.png'},
                    {title: 'Foxmail发帖时提示输入QQ密码',img: 'Foxmail/17.png'},
                    {title: 'Foxmail删除重复邮件',img: 'Foxmail/18.png'},
                    {title: 'Foxmail双击附件不能直接打开',img: 'Foxmail/19.png'},
                    {title: 'Foxmail更改你的签名',img: 'Foxmail/20.png'},
                    {title: '回复邮件，Foxmail出错闪退',img: 'Foxmail/21.png'},
                ]},
                {name: '打印机问题',list:[
                    {title: '更换打印机打印',img: 'printer/1.png'},
                    {title: '新打印机的使用方式',img: 'printer/1.png'},
                    {title: '新型打印机3060款安装方法',img: 'printer/1.png'},
                    {title: '设置默认打印机',img: 'printer/1.png'},
                    {title: '打印机换碳粉之S2110或S20ll',img: 'printer/1.png'},
                    {title: '针式打印机换色带',img: 'printer/1.png'},
                    {title: '打印机显示已暂停（打印机打印不出来）',img: 'printer/1.png'},
                ]},
                {name: 'FMS问题',list:[
                    {title: 'FMS登录不了（弹出没有用户许可证）',img: 'fms/1.png'},
                    {title: 'PDFCrreator导不出单子（PDFCreator导单子时出现个框）',img: 'fms/2.png'},
                    {title: 'FMS调整自动关闭时间（系统等待时间）',img: 'fms/3.png'},
                    {title: '数据库连接不上',img: 'fms/4.png'},
                    {title: 'FMS登录不了，显示没有注册或注册后又被注销',img: 'fms/5.png'},
                    {title: '找不到工作单',img: 'fms/6.png'},
                    {title: 'FMS关联（三种情况）',img: 'fms/7.png'},
                    {title: '使用PDF-XChange在FMS导单失败（360拦截）',img: 'fms/8.png'},
                    {title: 'FMS配置（新安装时配置图）',img: 'fms/9.png'},
                    {title: 'FMS系统与有道取词划线功能不兼容（FMS打不开、FMS卡死）',img: 'fms/10.png'},
                    {title: 'FMS预览图片出错闪退或窗口显示不全（恢复默认设置）',img: 'fms/11.png'},
                    {title: 'FMS导单导出PDF',img: 'fms/12.png'},
                    {title: 'FMS系统卡顿与掉线解释与解决方案',img: 'fms/13.png'},
                    {title: 'FMS导单背景格式没有了',img: 'fms/14.png'},
                ]},
                {name: 'PDF问题',list:[
                    {title: 'PDF压缩',img: 'pdf/1.png'},
                    {title: 'PDF转换',img: 'pdf/2.png'},
                    {title: '把图片转换成PDF',img: 'pdf/3.png'},
                    {title: 'PDF有锁压缩不了怎么办',img: 'pdf/4.png'},
                ]},
                {name: '硬件相关',list:[
                    {title: '电脑黑屏无反应',img: 'hardware/1.png'},
                ]},
                {name: '网络问题',list:[
                    {title: '突然断网了（IP地址变了）',img: 'network/1.png'},
                    {title: '网页数据刷新不出来（网页打不开）',img: 'network/2.png'},
                    {title: '网页打不开（DNS错误或者代理服务器显示异常）',img: 'network/3.png'},
                ]},
                // {name: '记录文案',list:[
                //     {title: 'pgsql数据备份',img: 'copy/1.png'},
                //     {title: 'fms备份数据的导入',img: 'copy/2.png'},
                // ]},
                {name: '常见小问题',list:[
                    {title: '清除浏览器缓存',img: 'common/1.png'},
                    {title: '修改默认浏览器',img: 'common/2.png'},
                    {title: '调整默认输入法',img: 'common/3.png'},
                    {title: '语言栏不见了',img: 'common/4.png'},
                ]},
                {name: '新人软件安装',list:[
                    {title: 'FMS各部门权限设置图',img: 'recruits/1.png'},
                    {title: '针式打印机的安装（正本打印机）',img: 'recruits/2.png'},
                    {title: 'P盘的映射（P盘不见啦）',img: 'recruits/3.png'},
                    {title: 'Foxmail邮箱的安装',img: 'recruits/4.png'},
                    {title: '顺丰打印机安装',img: 'recruits/5.png'},
                    {title: 'QQ绑定邮箱',img: 'recruits/6.png'},
                    {title: 'QQ解绑邮箱',img: 'recruits/7.png'},
                    {title: '新人旧机使用流程',img: 'recruits/8.png'},
                    {title: '打印机驱动安装教程详解',img: 'recruits/9.png'},
                    {title: '新人裸机安装软件流程',img: 'recruits/10.png'},
                    {title: '新入职之更改计算机名字',img: 'recruits/11.png'},
                    {title: 'PDF虚拟打印机安装',img: 'recruits/12.png'},
                    {title: 'FMS的安装',img: 'recruits/13.png'},
                    {title: 'PDFCreator安装（用于FMS中打印成PDF）',img: 'recruits/14.png'},
                ]},

            ],
            // move: 0,
            phoneText: '呼到前台直接按 0；公司内部：直接拨打4位数分机号；市内电话：9+电话号或者手机号；拨打国内长途：9+17909+0+手机号或9+17909+区号+电话号码； 拨打港澳台电话：00852-98765432(香港)，可拨 9+118080085298765432，或者9+17909+0085298765432； 拨打国际长途 ：001-408-8765432(美国加州)，可拨 9+118080014088765432或9+17909+0014088765432。     ',
            softList: [
                {name: 'Foxmail', img: foxmailImg, class: 'foxmailImg',path: 'https://www.foxmail.com/'},
                {name: 'FMS', img: fmsImg, class: 'foxmailImg',path: 'http://192.168.53.250/download/IT/soft/fms3.zip'},
                {name: 'QQ', img: qqImg, class: 'qqImg',path: 'https://im.qq.com/pcqq/'},
                {name: '极速pdf阅读器', img: pdfImg, class: 'pdfImg',path: 'https://www.jisupdf.com/'},
                {name: 'pdf全能转换器', img: pdfChange, class: 'pdfChange',path: 'http://192.168.53.250/download/IT/soft/PDF全能转换.zip'},
                {name: 'pdf修改器', img: pdfEdit, class: 'pdfEdit',path: 'http://192.168.53.250/download/IT/soft/PDF修改器.zip'},
                {name: 'TeamViewer', img: TeamViewer, class: 'teamviewer',path: 'https://www.teamviewer.cn/cn/download/windows/'},
                {name: 'Skype', img: skypeImg, class: 'skypeImg',path: 'http://skype.gmw.cn/down/'},
                {name: '360安全卫士', img: img360, class: '',path: 'http://www.51xiazai.cn/soft/51933.htm'},
                {name: '263云通讯', img: img263, class: '',path: 'http://192.168.53.250/download/IT/soft/em_setup.exe'},
                {name: '向日葵', img: sun, class: '',path: 'https://sunlogin.oray.com/download/'},
                {name: '腾讯会议', img: txMeet, class: '',path: 'https://cloud.tencent.com/act/event/tencentmeeting_free?fromSource=gwzcw.3375071.3375071.3375071&utm_medium=cpc&utm_id=gwzcw.3375071.3375071.3375071'},
                {name: 'Google', img: google, class: '',path: 'https://www.google.cn/chrome/'},
            ],
            train: [
                {name: 'PIC培训计划',path: '',img: 'PIC.png',type: 'img'},
                {name: '2019/11/02旺季培训会(销售一部)',path: '',img: 'sell1.png',type: 'img'},
                {name: '2019/11/02旺季培训会(销售二部)',path: '',img: 'sell2.png',type: 'img'},
                {name: '2019/11/02旺季培训会(销售三部)',path: '',img: 'sell3.png',type: 'img'},
                {name: '风控知识培训(第一期)视频',path: '风控知识培训(第一讲）.mp4',img: 'sell3.png',type: 'video'},
                {name: '风控知识培训(第二期)视频',path: '风控知识培训(第二讲).mp4',img: 'sell3.png',type: 'video'},
                {name: '宣传片',path: '宣传视频.mp4',img: 'sell3.png',type: 'video'},
            ]
        }
    },
    created() {
        // setInterval(()=> {
        //     this.move = 1
        //     setTimeout(()=> {
        //         this.move = 0
        //     },5000)
        // },5000)
        // console.log('created')
        this.move()
    },
    methods: {
        clickSoft(path) {
            window.open(path)
        },
        clickTrain(img,name,type,file) {
            var obj = {
                img: img,
                name: name,
                type: type,
                file: file
            }
            localStorage.setItem('train',JSON.stringify(obj))
            this.$router.push({
                name: 'trainDetail',
                params: obj
            })
        },
        move() {
            // console.log('move')
            timer = setInterval(() => {
            //获取到头的第一个字符
                let start = this.phoneText.substring(0,1);
                //获取到后面的所有字符
                let end = this.phoneText.substring(1);
                //重新拼接得到新的字符串，并赋值给this.phoneText
                this.phoneText = end + start;
                // console.log(this.phoneText)
            }, 200);
        },
        stop() {
            // console.log('stop')
            clearInterval(timer)
        },
        clickQuestion(name,list) {
            console.log('click')
            localStorage.setItem('questionItem',JSON.stringify({
                name: name,
                list: list
            }))
            this.$router.push({
                name: 'questionList',
                params: {
                    name: name,
                    list: list
                }
            })
        }
        
    }
}
</script>
<style scoped>
/* .softModule {
    width: 390px;
} */
.row {
    flex-wrap: wrap;
}
.phoneIcon {
    position: relative;
    z-index: 1000;
    font-size: 18px;
}
.phoneBox {
    padding-left: 10px;
    box-sizing: border-box;
    overflow: hidden;
    flex: 1;
    font-size: 14px;
}
.phoneBox {
    white-space: nowrap;
}
.phoneBox div {
    position: relative;
}
.anim {
    z-index: 1;
    position: relative;
    animation: move 10s infinite;
}
.move1 {
    left: -100%;
    transition: all 5s;
}
.move2 {
    left: 100%
}
@keyframes move {
    0% {left: 0}
    25% {left: -100%}
    50% {left: 100%}
    100% {left: 0}
}
.fileImg {
    /* width: 50px; */
    width: 54px;
    height: 54px;
}
.questionList {
    width: 100%;
    height: 210px;
    overflow: auto;
    flex-wrap: wrap;

}
.questionName {
    /* font-size: 12px; */
    width: 100%;
    font-size: .18rem;
    font-weight: 500;
    margin-top: 10px;
    text-align: center;
}
.questionItem {
    /* width: 25%; */
    margin-top: 20px;
    cursor: pointer;
}
.questionItem:hover .questionName{
    font-weight: bold
}
.questionItem:hover .fileImg {
    margin-top: -3px;
    width: 56px;
    height: 56px;
}
.tab {
    position: relative;
}
.questionBox {
    width: 54%;
}
.trainBox {
    width: 42%;
}
.train {
    font-size: 14px;
}
.train ul {
    margin-top: 10px;
    padding-left: 10px;
}
.train li {
    line-height: 30px;
    letter-spacing: 2px;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

}
.train li:hover {
    text-decoration: underline
}
.line {
    position: absolute;
    width: 30px;
    height: 3px;
    right: 0;
    bottom: -1px;
}
.section {
    width: 94%;
    margin-bottom: 10px;
}
.phoneWrap {
    padding: 6px 0;
    margin-bottom: 20px;
    border-top: 1px dashed rgba(217, 217, 217, 1);
    border-bottom: 1px dashed rgba(217, 217, 217, 1);
}
.softBox {
    /* width: 430px; */
    flex-wrap: wrap;
}
.softItem {
    border-radius: 6px;
    margin-top: 10px;
    padding-top: 10px;
    /* margin-right: 30px; */
    width: 110px;
    cursor: pointer;
}
.softItem:hover  {
    box-shadow:2px 4px 6px 4px rgba(0,0,0,0.2);
}
.softItem img {
    /* cursor: pointer; */
    width: 100%;
}
.imgBox {
    width: 60px;
    height: 60px;
    overflow: hidden;
}
.softName {
    margin-top: 16px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 700;
    /* cursor: pointer; */
}
.foxmailImg {
    width: 40%
}
.skypeImg {
    width: 60%;
}
</style>