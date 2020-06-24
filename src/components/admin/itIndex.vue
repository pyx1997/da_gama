<template>
    <div class="container">
        <div class="section row-jb">
            <div class="questionBox">
                <div class="tab borderB-sCA7 row-jb-ac">
                    <div class="tabText borderB-main color-sCA8">常见问题解决方法</div>
                </div>
            </div>

            <div class="trainBox">
                <div class="tab borderB-sCA7 row-jb-ac">
                    <div class="tabText borderB-main color-sCA8">MRF培训资料</div>
                </div>
                <div class="color-sCA4 train">
                    <ul class="">
                        <li v-for="(item,index) in train" :key="index" @click="clickTrain(item.img,item.name,item.type,item.path)">
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
            <el-row>
                <el-col :lg="3" :md="4" :sm="6" :xs="8" class="row-jc">
                    <div class="softItem col-ac" @click="clickSoft(softList[0].path)">
                        <div class="imgBox row-jc-ac">
                            <img :src="softList[0].img" class="" />
                        </div>
                        <div class="softName color-sCA4">{{softList[0].name}}</div>
                    </div>
                </el-col>
                <el-col :lg="3" :md="4" :sm="6" :xs="8" class="row-jc">
                    <div class="softItem col-ac" @click="clickSoft(softList[1].path)">
                        <div class="imgBox row-jc-ac">
                            <img :src="softList[1].img" class="" />
                        </div>
                        <div class="softName color-sCA4">{{softList[1].name}}</div>
                    </div>
                </el-col>
                <el-col :lg="3" :md="4" :sm="6" :xs="8" class="row-jc">
                    <div class="softItem col-ac" @click="clickSoft(softList[2].path)">
                        <div class="imgBox row-jc-ac">
                            <img :src="softList[2].img" class="" />
                        </div>
                        <div class="softName color-sCA4">{{softList[2].name}}</div>
                    </div>
                </el-col>
                <el-col :lg="3" :md="4" :sm="6" :xs="8" class="row-jc">
                    <div class="softItem col-ac" @click="clickSoft(softList[3].path)">
                        <div class="imgBox row-jc-ac">
                            <img :src="softList[3].img" class="" />
                        </div>
                        <div class="softName color-sCA4">{{softList[3].name}}</div>
                    </div>
                </el-col>
                <el-col :lg="3" :md="4" :sm="6" :xs="8" class="row-jc">
                    <div class="softItem col-ac" @click="clickSoft(softList[4].path)">
                        <div class="imgBox row-jc-ac">
                            <img :src="softList[4].img" class="" />
                        </div>
                        <div class="softName color-sCA4">{{softList[4].name}}</div>
                    </div>
                </el-col>
                <el-col :lg="3" :md="4" :sm="6" :xs="8" class="row-jc">
                    <div class="softItem col-ac" @click="clickSoft(softList[5].path)">
                        <div class="imgBox row-jc-ac">
                            <img :src="softList[5].img" class="" />
                        </div>
                        <div class="softName color-sCA4">{{softList[5].name}}</div>
                    </div>
                </el-col>
                <el-col :lg="3" :md="4" :sm="6" :xs="8" class="row-jc">
                    <div class="softItem col-ac" @click="clickSoft(softList[6].path)">
                        <div class="imgBox row-jc-ac">
                            <img :src="softList[6].img" class="" />
                        </div>
                        <div class="softName color-sCA4">{{softList[6].name}}</div>
                    </div>
                </el-col>
                <el-col :lg="3" :md="4" :sm="6" :xs="8" class="row-jc">
                    <div class="softItem col-ac" @click="clickSoft(softList[7].path)">
                        <div class="imgBox row-jc-ac">
                            <img :src="softList[7].img" class="" />
                        </div>
                        <div class="softName color-sCA4">{{softList[7].name}}</div>
                    </div>
                </el-col>
            </el-row>
            <!-- <div class="softBox flex-row">
                <div class="softItem col-ac" v-for="(item,index) in softList" :key="index" @click="clickSoft(item.path)">
                    <div class="imgBox row-jc-ac">
                        <img :src="item.img" class="" />
                    </div>
                    <div class="softName color-sCA4">{{item.name}}</div>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
var foxmailImg = require('../../assets/img/IT/foxmail.jpg')
var skypeImg = require('../../assets/img/IT/skypeLogo.png')
var qqImg = require('../../assets/img/IT/qq.png')
var pdfImg = require('../../assets/img/IT/pdfspeed.png')
var pdfChange = require('../../assets/img/IT/pdfChange.png')
var pdfEdit = require('../../assets/img/IT/pdfEdit.png')
var fmsImg = require('../../assets/img/IT/fms.png')
var TeamViewer = require('../../assets/img/IT/TeamViewer.png')
export default {
    data() {
        return {
            softList: [
                {name: 'Foxmail', img: foxmailImg, class: 'foxmailImg',path: 'https://www.foxmail.com/'},
                {name: 'FMS', img: fmsImg, class: 'foxmailImg',path: 'http://192.168.53.250/download/IT/soft/fms3.zip'},
                {name: 'QQ', img: qqImg, class: 'qqImg',path: 'https://im.qq.com/pcqq/'},
                {name: '极速pdf阅读器', img: pdfImg, class: 'pdfImg',path: 'https://www.jisupdf.com/'},
                {name: 'pdf全能转换器', img: pdfChange, class: 'pdfChange',path: 'http://192.168.53.250/download/IT/soft/PDF全能转换.zip'},
                {name: 'pdf修改器', img: pdfEdit, class: 'pdfEdit',path: 'http://192.168.53.250/download/IT/soft/PDF修改器.zip'},
                {name: 'TeamViewer', img: TeamViewer, class: 'teamviewer',path: 'https://www.teamviewer.cn/cn/download/windows/'},
                {name: 'Skype', img: skypeImg, class: 'skypeImg',path: 'http://skype.gmw.cn/down/'},
                // {name: 'Foxmail', img: foxmailImg, class: 'foxmailImg',path: 'https://www.foxmail.com/'},
                // {name: 'Skype', img: skypeImg, class: 'skypeImg',path: 'http://skype.gmw.cn/down/'},
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
    methods: {
        clickSoft(path) {
            window.open(path)
        },
        clickTrain(img,name,type,file) {
            this.$router.push({
                 name: 'trainDetail',
                params: {
                    img: img,
                    name: name,
                    type: type,
                    file: file
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
.tab {
    position: relative;
}
.questionBox,.trainBox {
    width: 48%;
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