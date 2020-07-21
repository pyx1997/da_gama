<template>
    <div class="wrap container">
        <div class="searchWrap flex-row color-sCA4">
            
            <div class="inputBox row-ac border-sCA7">
                <div class="row-ac iconWrap" @click="clickArrow">
                    <i class=" el-icon-arrow color-sCA5" :class="[optionShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i>
                    <div class="selectedText color-sCA4">{{selected}}:</div>
                </div>
                <input class="searchInput color-sCA5" v-model="inputValue" :placeholder="'请输入'+selected" @keyup.enter="clickSearch">
            </div>
            <div class="searchText bgc-blue2 color-main" @click="clickSearch">查询</div>
            <div class="options border-sCA7 bgc-sCA1" :class="[optionShow ? '' : 'none']">
                <div class="option" :class='[selected == "航线区域" ? " bgc-blue2 color-main" : "color-sCA5"]' @click="clickOption('航线区域')">航线区域</div>
                <div class="option" :class='[selected == "目的港国家" ? " bgc-blue2 color-main" : "color-sCA5"]' @click="clickOption('目的港国家')">目的港国家</div>
                <div class="option" :class='[selected == "起运港国家" ? " bgc-blue2 color-main" : "color-sCA5"]' @click="clickOption('起运港国家')">起运港国家</div>
                <div class="option" :class='[selected == "船东" ? " bgc-blue2 color-main" : "color-sCA5"]' @click="clickOption('船东')">船东</div>
            </div>
            <!-- <div class="searchItem row-ac">
                <div>区域:</div>
                <input v-model="routearea" class="input border-sCA7">
            </div> -->
        </div>
        <div class="listBox flex-row">
            <div class="tablewrap">
                <el-table :data="listData" style="max-width: 100%" height="400">
                    <el-table-column fixed prop="jobnum" label="工作号" width="150"></el-table-column>
                    <!-- <el-table-column prop="clerk" label="业务员" width="120"> </el-table-column>
                    <el-table-column prop="referencenum" label="参考号" width="140"> </el-table-column> -->
                    <el-table-column prop="departurecountry" label="起运港国家" width="100"> </el-table-column>
                    <!-- <el-table-column prop="departure" label="起运港" width="100"> </el-table-column> -->
                    <!-- <el-table-column prop="destination" label="目的港" width="100"> </el-table-column> -->
                    <el-table-column prop="destinationcountry" label="目的港国家" width="100"> </el-table-column>
                    <el-table-column prop="teu" label="TEU" width="50"> </el-table-column>
                    <el-table-column prop="routearea" label="航线区域" width="100"> </el-table-column>
                    <el-table-column prop="shipowner" label="船东名字" width="100"> </el-table-column>
                    <el-table-column prop="priceman" label="拿价人" width="100"> </el-table-column>
                    <el-table-column prop="etdtime" label="ETD" width="120"> </el-table-column>
                    <el-table-column prop="months" label="月份" width="60"> </el-table-column>
                    <el-table-column prop="weeks" label="周数" width="80"> </el-table-column>
                    <el-table-column prop="contract" label="合约" width="80"> </el-table-column>

                    
                </el-table>
                <div class="pageBox row-je">
                    <el-pagination class="pagination"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="current"
                        :page-sizes="[10, 20, 30, 40]"
                        layout="total, prev, pager, next, jumper"
                        :total=total>
                    </el-pagination>
                </div>
            </div>
            
        </div>

        
    </div>
</template>
<script>
export default {
    data() {
        return {
            listData: [],
            routearea: '',
            descountry: '',
            depcountry: '',
            shipowner: '',
            selected: '航线区域',
            optionShow: false,
            inputValue: '',
            current: 1,
            limit: 9,
            total: 0,
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            var obj = {
                current: this.current,
                limit: this.limit,
                routearea: this.routearea,
                descountry: this.descountry,
                depcountry: this.depcountry,
                shipowner: this.shipowner
            }
            // console.log(obj)
            this.$http.post('/index/djamatrade/index',obj).then((res) => {
                // console.log(res)
                if(res.status == 200 && res.data.ret == 200) {
                    this.listData = res.data.data.list
                    this.listData.forEach(item => {
                        item.etdtime = this.changeDate(new Date(item.etdtime*1000))
                    })
                    this.total = res.data.data.total
                }else {
                    // this.listData = JSON.parse(localStorage.getItem('bookList'))
                    this.$message({
                        message: '请求数据失败',
                        type: 'warning'
                    })
                }
                // console.log(res)
            }).catch(() => {
                // this.listData = JSON.parse(localStorage.getItem('bookList'))
                this.$message({
                    message: '服务器连接失败',
                    type: 'warning'
                })
            })
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
        clickOption(str) {
            this.selected = str;
            this.routearea = ''
            this.descountry = ''
            this.depcountry = ''
            this.shipowner = ''
            this.optionShow = false;
            this.inputValue = ''
            
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
        clickArrow() {
            this.optionShow = !this.optionShow
        },
        clickSearch() {
            this.current = 1
            if(this.selected == '航线区域') {
                this.routearea = this.inputValue
            }else if(this.selected == '目的港国家') {
                this.descountry = this.inputValue
            }else if(this.selected == '起运港国家') {
                this.depcountry = this.inputValue
            }else if(this.selected == '船东') {
                this.shipowner = this.inputValue
            }
            this.getList()
        }
    }
}
</script>
<style scoped>
.searchWrap {
    position:relative;
    font-size: 14px;
    margin-bottom: 20px;
}
/* .iconWrap {
    max-width: 100px;
} */
/* .searchItem {
    margin-right: 20px;
}
.searchItem .input {
    margin-left: 10px;
    width: 100px;
    line-height: 26px;
    height: 26px;
    text-align: center;
} */
.searchBox {
    position: relative;
}
.options {
    z-index: 1000;
    position: absolute;
    left: 0;
    top: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.option {
    width: 140px;
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
.el-icon-arrow {
    font-size: 18px;
    cursor: pointer;
}
.selectedText {
    white-space: nowrap;
    max-width: 90px;
    text-indent: 2px;
    font-size: 14px;
    cursor: pointer;
}
.none {
    display: none;
}
.tablewrap {
    max-width: 92%;
}
.pageBox {
    margin-top: 20px;
    /* width: 92% !important */
}
</style>