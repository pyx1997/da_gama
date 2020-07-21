<template>
    <div class="container">
        <div class="searchBox time row-ac">
            <div class="options border-sCA7 bgc-sCA1" :class="[optionShow ? '' : 'none']">
                <div class="option" :class='[selectNum == 0 ? " bgc-blue2 color-main" : "color-sCA5"]' @click="clickOption(0)">工作单号</div>
                <div class="option" :class='[selectNum == 1 ? " bgc-blue2 color-main" : "color-sCA5"]' @click="clickOption(1)">订舱号</div>
            </div>
            <div class="inputBox row-ac border-sCA7">
                <div class="row-ac" @click="clickArrow">
                    <i class=" el-icon-arrow color-sCA5" :class="[optionShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i>
                    <div class="selectedText color-sCA4">{{selectNum == 0 ? '工作单号' : '订舱号'}}:</div>
                </div>
                <input class="searchInput color-sCA5" v-model="inputValue" :placeholder="[selectNum == 0 ? '请输入工作单号' : '请输入订舱号']">
            </div>
            <el-date-picker v-model="timeValue" type="daterange" @change="selectDate" start-placeholder="下单开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
            
            <!-- <div class="searchText bgc-blue2 color-main" @click="clickSearch">查询</div> -->
        </div>
        <div class="list flex-col">
            <div class="thead flex-row bgc-sCA3">
                <div class="id">工作单号</div>
                <div class="content">订舱号</div>
                <div class="time">下单时间</div>
                <div class="type">订舱类型</div>
                <div class="people">订舱人</div>
                <div class="status">状态</div>
                <div class="detail"></div>
            </div>
            <div class="tbody flex-row" v-for="(item,index) in listData" :key="index">
                <div class="id">{{item.mbfnum}}</div>
                <div class="content">{{item.mbfbookingno}}</div>
                <div class="time">{{item.mbftime}}</div>
                <div class="type" :class="checkType(item.mbftype)">{{item.mbftype}}</div>
                <div class="people">{{item.mbfoption}}</div>
                <div class="status" :class="checkStatus(item.mbfstatus)">{{item.mbfstatus}}</div>
                <div class="detail color-blue1" @click="clickDetail(index)">详情</div>
            </div>
        </div>
        <div class="pageBox row-je">
            <el-pagination class="pagination"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="current"
                :page-sizes="[10, 20, 30, 40]"
                :page-size=limit
                layout="total, sizes, prev, pager, next, jumper"
                :total=total>
            </el-pagination>
        </div>
        <div class="detailPage bgc-opacity row-jc-ac" v-if="detailShow" @click="closeDetail">
            <div class="detailBox bgc-sCA1 flex-col" @click.stop="clickBlank">
                <i class="el-icon-close" @click="closeDetail"></i>
                <div class="detailInfo">
                    <div class="detailTitle color-sCA4">订单详情</div>
                    <div class="return row-ac color-sCA4">
                        <div>订舱单返回:</div>
                        <input type="text" value="HPL网站返回的8位数字" class="color-sCA5" disabled>
                    </div>
                </div>
                <div class="detailList">
                    <div class="flex-row detailLine">
                        <div class="color-sCA4 detailName">下单时间：</div>
                        <div class="color-sCA6 detailContent">{{detailData.mbftime}}</div>
                    </div>
                    <div class="flex-row detailLine">
                        <div class="color-sCA4 detailName">订舱时间：</div>
                        <div class="color-sCA6 detailContent">{{detailData.mbfbookingtime}}</div>
                    </div>
                    <div class="flex-row detailLine">
                        <div class="color-sCA4 detailName">订舱操作：</div>
                        <div class="color-sCA6 detailContent">{{detailData.mbfoption}}</div>
                    </div>
                    <div class="flex-row detailLine">
                        <div class="color-sCA4 detailName">电话：</div>
                        <div class="color-sCA6 detailContent">{{detailData.mbfnotitel}}</div>
                    </div>
                    <!-- <div class="flex-row detailLine">
                        <div class="color-sCA4 detailName">通知人：</div>
                        <div class="color-sCA6 detailContent">{{detailData.mbfni}}</div>
                    </div> -->
                    <div class="flex-row detailLine">
                        <div class="color-sCA4 detailName">通知方式：</div>
                        <div class="color-sCA6 detailContent">{{detailData.mbfnotitype}}</div>
                    </div>
                    <div class="flex-row detailLine">
                        <div class="color-sCA4 detailName">通知内容：</div>
                        <div class="color-sCA6 detailContent">您的订单中订舱信息发生的“变化”，{{detailData.mbfstatus}}。</div>
                    </div>
                    <div class="flex-row detailLine">
                        <div class="color-sCA4 detailName">EDI标准内容：</div>
                        <div class="color-sCA6 detailContent">
                            <!-- {{detailData.mbfedicontent}} -->
                            1. 运输条款、运输服务（整箱主拼or加拼）:{{detailData.mbftsr}} <br>
                            2. 船名航次:{{detailData.mbfvoship}}<br>
                            3. 收货地:{{detailData.mbfreceipt}}<br>
                            4. 装货港:{{detailData.mbfloadingport}}<br>
                            5. 离港日期:{{detailData.mbfetdtime}}<br>
                            6. 卸货港:{{detailData.mbfdischarge}}<br>
                            7. 交货地:{{detailData.mbfdelivery}}<br>
                            8. 货代信息Forwarder：{{detailData.mbfmrf}}<br>
                            9. 货物包装信息:{{detailData.mbfcargo}}<br>
                            10.货物名称:{{detailData.mbfcargoname}}<br>
                            11. 箱量 箱型:{{detailData.mbfboxtn}}<br>
                            12.付款方式:{{detailData.mbfcpi}}<br>
                            13.毛重体积件数:{{detailData.mbfwvc}}<br>
                            14.合约号，合同号:{{detailData.mbfcontrno}}<br>
                            15.唛头:{{detailData.mbfshipingmark}}<br>
                            16.发货人:{{detailData.mbfcz}}<br>
                            17.收货人:{{detailData.mbfcn}}<br>
                            <!-- Sarıgazi Merkez Mahallesi Atatürk Cad. Sanat Sokak No:3 Sancaktepe - Istanbul<br>
                            Tel: +90 216 622 71 11 pbx <br>
                            Fax: +90 216 622 67 76<br>
                            Tax ID : 4810171774<br> -->
                            18.  通知人:{{detailData.mbfni}}<br>
                            19.  HS CODE(海关编码):{{detailData.mbfhs}}<br>
                            20.  备注: {{detailData.mbfremark}}<br>
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
            selectNum: 0,
            listData: [],
            timeValue: '',
            current: 1,
            limit: 10,
            total: 0,
            detailShow: false,
            inputValue: '',
            mbfnum: '',
            mbfbookingno: '',
            detailData: {},
            optionShow: false,
            startTime: '',
            endTime: ''
        }
    },
    watch: {
        inputValue(newValue,oldValue) {
            if(this.selectNum == 0) {
                this.mbfnum = this.inputValue
                this.mbfbookingno = ''
            }else {
                this.mbfnum = ''
                this.mbfbookingno = this.inputValue
            }
            this.current = 1
            this.getList()
        }
    },
    created() {
        this.getList()
    },
    methods: {
        selectDate() {
            if(!this.timeValue) {
                this.startTime = ''
                this.endTime = ''
            }else {
                this.startTime = this.changeDate(this.timeValue[0])
                this.endTime = this.changeDate(this.timeValue[1])
            }
            this.clickSearch()
            // console.log('timeValue: ',this.timeValue)
            // console.log('selectDate:',this.changeDate(this.timeValue[0])+' - '+this.changeDate(this.timeValue[1]))
        },
        changeDate(str) {
            // console.log(str.getHour())
            // console.log(str.getFullYear()+'-'+this.checkNum(str.getMonth()+1)+'-'+this.checkNum(str.getDate()))
            return str.getFullYear()+'-'+this.checkNum(str.getMonth()+1)+'-'+this.checkNum(str.getDate())
        },
        checkNum(num) {
            if(num < 10) {
                return '0'+num
            }else {
                return num
            }
        },
        clickOption(num) {
            this.selectNum = num;
            this.optionShow = false;
            this.inputValue = ''
            
        },
        clickArrow() {
            this.optionShow = !this.optionShow
        },
        // 当每页显示条数改变时
        handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
            this.limit = val
            this.current = 1
            this.getList()
        },
        // 当前页码改变
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.current = val
            this.getList()
        },
        getList() {

            var obj = {
                current: this.current,
                limit: this.limit,
                mbfnum: this.mbfnum,
                mbfbookingno: this.mbfbookingno,
                startday: this.startTime,
                endday: this.endTime
            }
            // console.log('obj:',obj)
            this.$http.post('/index/edisearch/iftmbf',obj).then((res) => {
                // console.log(res)
                if(res.status == 200 && res.data.ret == 200) {
                    // console.log(res.data.data)
                    this.total = res.data.data.total
                    this.listData = res.data.data.list
                    this.listData.forEach((item,index) => {
                        item.mbftime = this.changeDate(new Date(item.mbftime*1000))
                        item.mbfbookingtime = this.changeDate(new Date(item.mbfbookingtime*1000))
                    })
                    localStorage.setItem('bookList',JSON.stringify(this.listData))
                    // console.log('bookList:',JSON.parse(localStorage.getItem('bookList')))
                }else {
                    this.listData = JSON.parse(localStorage.getItem('bookList'))
                    this.$message({
                        message: '请求数据失败，未获取到订舱列表最新数据',
                        type: 'warning'
                    })
                }
            }).catch(() => {
                this.listData = JSON.parse(localStorage.getItem('bookList'))
                this.$message({
                    message: '连接服务器失败，未获取到订舱列表最新数据',
                    type: 'warning'
                })
            })
        },
        clickDetail(index) {
            this.detailShow = true
            this.detailData = this.listData[index]
        },
        closeDetail() {
            this.detailShow = false
        },
        clickBlank() {
            return
        },
        changeDate(str) {
            // console.log(str.getHour())
            return str.getFullYear()+'-'+this.checkNum(str.getMonth()+1)+'-'+this.checkNum(str.getDate())+'  '+this.checkNum(str.getHours())+':'+this.checkNum(str.getMinutes())+':'+this.checkNum(str.getSeconds())
        },
        checkNum(num) {
            if(num < 10) {
                return '0'+num
            }else {
                return num
            }
        },
        clickSearch() {
            this.current = 1
            this.getList()
        },
        checkStatus(str) {
            if(str.search('成功') != -1) {
                return 'color-green1'
            }else if(str.search('取消') != -1) {
                return 'color-red1'
            }else {
                return 'color-main'
            }
        },
        checkType(str) {
            if(str.search('约单') != -1) {
                return 'color-blue3'
            }else if(str.search('预定单') != -1) {
                return 'color-blue4'
            }else {
                return 'color-main'
            }
        },
    }
}
</script>
<style scoped>
.el-icon-arrow {
    font-size: 18px;
    cursor: pointer;
}
.selectedText {
    width: 70px;
    text-indent: 2px;
    font-size: 14px;
    cursor: pointer;
}
.searchBox {
    position: relative;
}
.options {
    position: absolute;
    left: 0;
    top: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.option {
    width: 100px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
}
.inputBox {
    width: 260px;
    height: 30px;
    box-sizing: border-box;
    margin-right: 2px;
    padding: 4px 8px;
    overflow: hidden;
}
.inputBox .searchInput {
    border: none;
    height: 22px;
    /* line-height: 22px; */
    text-indent: 6px;
    outline: none;
    flex: 1;
}
.searchText {
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    margin-left: 6px;
    cursor: pointer;
}
.searchText:hover {
    background: rgb(205, 228, 253)
    /* background: rgb(215, 233, 252) */
}
.none {
    display: none;
}
.el-icon-close {
    position: absolute;
    z-index: 1000;
    right: 10px;
    top: 10px;
    font-size: 20px;
    cursor: pointer;
}
.list {
    margin-top: 20px;
    font-size: 12px;
    max-height: 420px;
    overflow: auto;
}
.thead {
    width: 90%;
    border-top:1px solid rgba(209, 213, 222, 1);
    border-bottom: 1px solid rgba(209, 213, 222, 1);
    border-left: none;
    border-right: none;
    font-weight: 700;
    line-height: 28px;
    box-sizing: border-box;
}
.tbody {
    width: 90%;
    /* flex: 1;
    overflow: auto; */
    line-height: 38px;
    border-bottom: 1px solid rgba(235, 235, 235, 1);
    border-left: none;
    border-right: none;
    border-top: none;
    box-sizing: border-box;
}
.tbody .detail:hover {
    text-decoration: underline
}
.list div {
    text-align: center;
}
.list .id {
    min-width: 100px;
    flex: 1;
}
.list .time {
    min-width: 160px;
    flex: 1;
}
.list .content {
    min-width: 100px;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.tbody div{
    overflow: hidden;
    /* flex:1; */
    white-space: nowrap;
    text-overflow: ellipsis;
    padding:0 2px;
    box-sizing: border-box
}
.list .type {
    min-width: 100px;
    flex:1;
}
.list .people {
    min-width: 100px;
    flex:1;
}
.list .status {
    min-width: 100px;
    flex:1;
}
.list .detail {
    min-width: 100px;
    flex:1;
    cursor: pointer;
}
.pageBox {
    width: 90%;
    height: 50px;
    margin-top: 20px;
}

.detailPage {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    /* left: 50%;
    top: 50px;
    margin-left: -400px;
    width: 800px;
    height: 500px;
    box-shadow:0px 2px 6px 0px rgba(0,0,0,0.2); */
}
.detailBox {
    position: relative;
    width: 800px;
    height: 580px;
    /* overflow: auto; */
}
.detailTitle {
    font-size: 22px;
    font-weight: 500;
    text-indent: 120px;
    /* text-align: center; */
    line-height: 60px;
}
.detailList {
    flex: 1;
    overflow: auto;
    font-size: 12px;
    padding: 10px 40px;
}
.detailLine {
    width: 100%;
    margin-bottom: 20px;
    line-height: 30px;
}
.detailName {
    width: 80px;
    text-align: right;
}
.detailContent {
    padding-left: 10px;
    flex: 1;
    overflow: hidden;
    white-space: normal;
    word-wrap: break-all; 
    
}
.detailInfo {
    position: relative;
}
.detailInfo .return {
    position: absolute;
    right: 120px;
    top: 20px;
    font-size: 14px;
}
.detailInfo .return input {
    box-sizing: border-box;
    margin-left: 10px;
    width: 140px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 13px;
    border: 1px solid rgba(121, 121, 121, 1);
}
</style>