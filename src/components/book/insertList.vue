<template>
<div class="wrapBox container">
    <div class="typeBox row-ac border-sCA7">
        <div :class="[searchType == 'insert'?'bgc-main color-sCA1':'color-main']" @click="clickType('insert')">按录入时间搜索</div>
        <div :class="[searchType == 'etd'?'bgc-main color-sCA1':'color-main']" @click="clickType('etd')">按ETD时间搜索</div>
    </div>
    <div class="searchWrap row-ac">
        <div class="time row-ac">
            <el-date-picker v-model="timeValue" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" @change="selectDate"></el-date-picker>
        </div>
        <div class="inputBox row-ac border-sCA7">
            <div class="row-ac iconWrap">
                <!-- <i class=" el-icon-arrow color-sCA5" :class="[optionShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i> -->
                <div class="selectedText color-sCA5">部门:</div>
            </div>
            <input class="searchInput color-sCA5" placeholder='请输入部门' v-model="bookdepart">
        </div>
        <div class="inputBox row-ac border-sCA7" v-if="searchType == 'insert'">
            <div class="row-ac iconWrap">
                <!-- <i class=" el-icon-arrow color-sCA5" :class="[optionShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i> -->
                <div class="selectedText color-sCA5">船东:</div>
            </div>
            <input class="searchInput color-sCA5" placeholder='请输入船东' v-model="bookship">
        </div>
        <div class="inputBox row-ac border-sCA7" v-if="searchType == 'insert'">
            <div class="row-ac iconWrap">
                <!-- <i class=" el-icon-arrow color-sCA5" :class="[optionShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i> -->
                <div class="selectedText color-sCA5">订舱方:</div>
            </div>
            <input class="searchInput color-sCA5" placeholder='请输入订舱方' v-model="bookside">
        </div>
        <div class="inputBox row-ac border-sCA7" v-if="searchType == 'etd'">
            <div class="row-ac iconWrap">
                <!-- <i class=" el-icon-arrow color-sCA5" :class="[optionShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i> -->
                <div class="selectedText color-sCA5">订舱号:</div>
            </div>
            <input class="searchInput color-sCA5" placeholder='请输入订舱号' v-model="bookso">
        </div>
        <div class="inputBox row-ac border-sCA7" v-if="searchType == 'etd'">
            <div class="row-ac iconWrap">
                <!-- <i class=" el-icon-arrow color-sCA5" :class="[optionShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i> -->
                <div class="selectedText color-sCA5">业务单号:</div>
            </div>
            <input class="searchInput color-sCA5" placeholder='请输入业务单号' v-model="servicenumber">
        </div>
        <div class="searchText bgc-blue2 color-main" @click="clickSearch">查询</div>
    </div>


    <el-table :data="bookList" style="max-width: 90%;min-width:900px" height="400" class="listBox">
        <el-table-column prop="bookid" label="编号" width="100" fixed> </el-table-column>
        <el-table-column prop="bookclerk" label="订舱员" width="100"> </el-table-column>
        <el-table-column prop="bookdate" label="录入日期" width="100"> </el-table-column>
        <el-table-column prop="bookpro" label="进程" width="100"> </el-table-column>
        <el-table-column prop="servicenumber" label="业务单号" width="120"> </el-table-column>
        <el-table-column prop="bookcydate" label="CYETD" width="100"> </el-table-column>
        <el-table-column prop="book20gp" label="20`GP" width="100"> </el-table-column>
        <el-table-column prop="book40gp" label="40`GP" width="100"> </el-table-column>
        <el-table-column prop="book40hq" label="40`HQ" width="100"> </el-table-column>
        <el-table-column prop="booktue" label="TUE" width="100"> </el-table-column>
        <el-table-column prop="bookpol" label="POL" width="100"> </el-table-column>
        <el-table-column prop="bookpod" label="POD" width="100"> </el-table-column>
        <el-table-column prop="bookship" label="船东" width="100"> </el-table-column>
        <el-table-column prop="bookside" label="订舱方" width="100"> </el-table-column>
        <el-table-column prop="bookcontract" label="Contract" width="100"> </el-table-column>
        <el-table-column prop="hpl" label="HPL合约号" width="100"> </el-table-column>
        <el-table-column prop="bookso" label="S/O NO" width="100"> </el-table-column>
        <el-table-column prop="bookvelvoy" label="VEL/VOY" width="100"> </el-table-column>
        <el-table-column prop="bookdepart" label="部门" width="100"> </el-table-column>
        <el-table-column prop="servicemanager" label="业务经理" width="100"> </el-table-column>
        <el-table-column prop="serviceman" label="业务员" width="100"> </el-table-column>
        <el-table-column prop="fileman" label="文件员" width="100"> </el-table-column>
        <!-- <el-table-column prop="recordingtime" label="录入时间" width="100"> </el-table-column> -->
        <el-table-column prop="cabinet" label="甩柜、换船" width="100"> </el-table-column>
        <el-table-column label="操作" width="130" fixed="right">
            <template slot-scope="scope">
            <el-button type="primary" plain size="mini" icon="el-icon-edit" @click="showBookEditDailog(scope.row)"></el-button>
            <el-button type="danger" plain size="mini" icon="el-icon-delete" @click="delList(scope.row.bookid)"></el-button>
            </template>
        </el-table-column>

    </el-table>
    <!-- 分页 -->
    <div class="footer">
        <div class="TBox">
            <div>T量:</div>
            <div class="TNumber">{{sumtue}}</div>
        </div>
        <el-pagination class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size=limit
            layout="total, sizes, prev, pager, next, jumper"
            :total=total>
        </el-pagination>
    </div>


    <!-- 修改弹框 -->
    <el-dialog title="修改订舱信息" :visible.sync="bookEditDialog" @close="closeBookEditDialog" width="80%">
        <el-form :model="bookEditData" :rules="bookEditRules" ref="bookEditData">
            <el-form-item>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="bookid" label="编号" label-width="120px">
                        <el-input disabled :value="bookEditData.bookid"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="bookclerk" label="订舱员" label-width="120px">
                        <el-input v-model="bookEditData.bookclerk"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="bookdate" label="录入日期" label-width="120px">
                        <el-date-picker type="date" placeholder="选择日期" v-model="bookEditData.bookdate" style="width: 100%;" autocomplete="off"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="bookpro" label="进程" label-width="120px">
                        <el-input v-model="bookEditData.bookpro" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="servicenumber" label="业务单号" label-width="120px">
                        <el-input v-model="bookEditData.servicenumber" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="bookcydate" label="CYETD" label-width="120px">
                        <el-date-picker type="date" placeholder="选择日期" v-model="bookEditData.bookcydate" style="width: 100%;" autocomplete="off"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="book20gp" label="20`GP" label-width="120px">
                        <el-input v-model="bookEditData.book20gp" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="book40gp" label="40`GP" label-width="120px">
                        <el-input v-model="bookEditData.book40gp" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="book40hq" label="40`HQ" label-width="120px">
                        <el-input v-model="bookEditData.book40hq" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="booktue" label="TUE" label-width="120px">
                        <el-input v-model="bookEditData.booktue" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="bookpol" label="POL" label-width="120px">
                        <el-input v-model="bookEditData.bookpol" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="bookpod" label="POD" label-width="120px">
                        <el-input v-model="bookEditData.bookpod" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="bookship" label="船东" label-width="120px">
                        <el-input v-model="bookEditData.bookship" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="bookside" label="订舱方" label-width="120px">
                        <el-input v-model="bookEditData.bookside" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="bookcontract" label="Contract" label-width="120px">
                        <el-input v-model="bookEditData.bookcontract" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="hpl" label="hpl合约号" label-width="120px">
                        <el-input v-model="bookEditData.hpl" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="bookso" label="S/O NO" label-width="120px">
                        <el-input v-model="bookEditData.bookso" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="bookvelvoy" label="VEL/VOY" label-width="120px">
                        <el-input v-model="bookEditData.bookvelvoy" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item label="部门" prop="bookdepart" label-width="120px">
                        <el-select v-model="bookEditData.bookdepart" placeholder="请选择部门">
                            <el-option label="LILY" value="LILY"></el-option>
                            <el-option label="FIONA" value="FIONA"></el-option>
                            <el-option label="JANA" value="JANA"></el-option>
                            <el-option label="JIM" value="JIM"></el-option>
                            <el-option label="TYLER" value="TYLER"></el-option>
                            <el-option label="YANNIS" value="YANNIS"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="servicemanager" label="业务经理" label-width="120px">
                        <el-input v-model="bookEditData.servicemanager" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="serviceman" label="业务员" label-width="120px">
                        <el-input v-model="bookEditData.serviceman" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="fileman" label="文件员" label-width="120px">
                        <el-input v-model="bookEditData.fileman" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :md="7" :sm="11" :xs="20">
                    <el-form-item prop="cabinet" label="用柜、换船ETD" label-width="120px">
                        <el-input v-model="bookEditData.cabinet" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
        </el-form>
      <div class="row-je-ac">
        <el-button @click="bookEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="editBook">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
    data() {
        return {
            timeValue: '',
            searchType: 'insert',
            // typeFont: '按ETD、订舱号、业务编号搜索',
            // 订舱修改表单数据
            bookEditData: {
                bookid: '-1',
                bookclerk: '',
                bookdate: '',
                bookpro: '',
                servicenumber: '',
                bookcydate: '',
                book20gp: '',
                book40gp: '',
                book40hq: '',
                booktue: '',
                bookpol: '',
                bookpod: '',
                bookship: '',
                bookside: '',
                bookcontract: '',
                hpl: '',
                bookso: '',
                bookvelvoy: '',
                bookdepart: '',
                servicemanager: '',
                serviceman: '',
                fileman: '',
                recordingtime: '',
                cabinet: ''
            },
            // 订舱修改规则
            bookEditRules: {
                bookclerk: [
                    { required: true, message: '请输入订舱员', trigger: 'blur' }
                ],
                bookdate: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                bookpro: [
                    { required: true, message: '请输入进程', trigger: 'blur' }
                ],
                servicenumber: [
                    { required: true, message: '请输入业务单号', trigger: 'blur' }
                ],
                bookcydate: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
                ],
                booktue: [
                    { required: true, message: '请输入TUE', trigger: 'blur' }
                ],
                bookpol: [
                    { required: true, message: '请输入POL', trigger: 'blur' }
                ],
                bookpod: [
                    { required: true, message: '请输入POD', trigger: 'blur' }
                ],
                bookship: [
                    { required: true, message: '请输入船东', trigger: 'blur' }
                ],
                bookside: [
                    { required: true, message: '请输入订舱方', trigger: 'blur' }
                ],
                bookcontract: [
                    { required: true, message: '请输入contract', trigger: 'blur' }
                ],
                bookso: [
                    { required: true, message: '请输入S/O NO', trigger: 'blur' }
                ],
                bookvelvoy: [
                    { required: true, message: '请输入VEL/VOY', trigger: 'blur' }
                ],
                bookdepart: [
                    { required: true, message: '请选择部门', trigger: 'blur' }
                ],
                servicemanager: [
                    { required: true, message: '请输入业务经理', trigger: 'blur' }
                ],
                serviceman: [
                    { required: true, message: '请输入业务员', trigger: 'blur' }
                ],
                fileman: [
                    { required: true, message: '请输入文件员', trigger: 'blur' }
                ],
            },
            bookList: [],// 订舱列表
            bookEditDialog: false, //编辑对话框
            currentPage: 1, // 当前页码
            total: 0, // 总数
            limit: 10, // 每页显示条数
            sumtue: 0, // T量
            startday: '', // 录入日期
            endday: '', // 离港日期
            etdstart: '',
            etdend: '',
            bookship: '',// 船东
            bookdepart: '',// 部门
            bookside: '',// 订舱方
            bookso: '',// 订舱号
            servicenumber: '', //业务编号
        }
    },
    computed: {
        
    },
    created() {
        this.getBookList()
    },
    methods: {
        clickType(str) {
            this.searchType = str
            // this.startday = ''
            // this.endday = ''
            // this.etdstart=''
            // this.etdend = ''
            this.bookship = ''
            this.bookdepart = ''
            this.bookside = ''
            this.bookso = ''
            this.servicenumber = ''
            this.getBookList()
        },
        // 获取订舱列表
        getBookList() {
            // 查询条件
            if(this.searchType == 'etd') {
                var obj = {
                    current: this.currentPage,
                    limit: this.limit,
                    startday: this.etdstart,
                    endday: this.etdend,
                    bookdepart: this.bookdepart,
                    bookso: this.bookso,
                    servicenumber: this.servicenumber
                }
                var url = '/index/search/second'
            }else {
                var obj = {
                    current: this.currentPage,
                    limit: this.limit,
                    startday: this.startday,
                    endday: this.endday,
                    bookdepart: this.bookdepart,
                    bookship: this.bookship,
                    bookside: this.bookside
                }
                var url = '/index/search/index'
            }
            
            // console.log(obj)
            this.$http.post(url,obj).then( res => {
                // console.log(res)
                if(res.status === 200 && res.data.ret == 200) {
                    // console.log('data=',res.data.data.list)
                    this.bookList = res.data.data.list;
                    this.bookList.forEach(item => {
                        if(item.bookdate) {
                            item.bookdate = this.changeDate(new Date(item.bookdate*1000))
                        }
                        if(item.bookcydate) {
                            item.bookcydate = this.changeDate(new Date(item.bookcydate*1000))
                        }
                        if(item.recordingtime) {
                            item.recordingtime = this.changeDate(new Date(item.recordingtime*1000))
                        }

                    });
                    this.total = res.data.data.total
                    this.sumtue = res.data.data.sumtue
                }else {
                    this.$message({
                        message: '请求数据失败',
                        type: 'warning'
                    });
                }
            }).catch(() => {
                this.$message({
                    message: '未连接到服务器，请求数据失败',
                    type: 'warning'
                });
            })
        },
        transformDate(date) {
            return new Date(date)
        },
        // 点击搜索时
        clickSearch() {
            this.getBookList()
        },
        
        // 当每页显示条数改变时
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.limit = val
            this.currentPage = 1
            this.getBookList()
        },
        // 当前页码改变
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.currentPage = val
            this.getBookList()
        },
        //   点击删除
        async delList(id) {
            this.$confirm('确认删除该条记录吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(()=> {
                this.$http.post('/index/add/delete',{bookid: id}).then(res => {
                    if(res.status == 200 && res.data.ret == 200) {
                        this.getBookList()
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                    }else {
                        this.$message({
                            type: 'warning',
                            message: '删除失败，请重新操作'
                        })
                    }
                    // console.log(res)
                }).catch(() => {
                    this.$message({
                        message: '未连接到服务器，删除失败',
                        type: 'warning'
                    });
                })
            })
            .catch(()=> {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        // 点击编辑后触发
        showBookEditDailog(bookInfo) {
            for (const key in this.bookEditData) {
                if(key == 'bookdate' || key == 'bookcydate') {
                    // console.log(key)
                    this.bookEditData[key] = new Date(bookInfo[key])
                }else {
                    this.bookEditData[key] = bookInfo[key]
                }
            }
            this.bookEditDialog = true
        },
        // 关闭订舱编辑对话框
        closeBookEditDialog() {
            // console.log('ruleForm:',this.bookEditData);
            this.$refs.bookEditData.resetFields()
        },
        //编辑订舱按确定按钮后触发
        editBook() {
            this.$refs.bookEditData.validate((valid) => {
                if (valid) {
                    var obj = this.bookEditData
                    // console.log(this.bookEditData.bookdate,this.bookEditData.bookcydate)
                    obj.bookdate = this.changeDate(obj.bookdate)
                    obj.bookcydate = this.changeDate(obj.bookcydate)
                    this.$http.post('/index/add/update',this.bookEditData).then(res => {
                        // console.log(res)
                        if(res.status == 200 && res.data.ret == 200) {
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            })
                            this.bookEditDialog = false
                            this.getBookList()
                        }

                    }).catch(() => {
                        this.$message({
                            message: '未连接到服务器，修改失败',
                            type: 'warning'
                        });
                    })

                } else {

                    return false;
                }
            });
        },
        selectDate() {
            if(this.timeValue) {
                this.startday = this.changeDate(this.timeValue[0])
                this.endday = this.changeDate(this.timeValue[1])
                this.etdstart = this.changeDate(this.timeValue[0])
                this.etdend = this.changeDate(this.timeValue[1])
                
            }else {
                this.etdstart = ''
                this.etdend = ''
                this.startday = ''
                this.endday = ''
            }
            
            // console.log('selectDate:',this.changeDate(this.timeValue[0])+' - '+this.changeDate(this.timeValue[1]))
        },
        changeDate(str) {
            return str.getFullYear()+'-'+this.checkNum(str.getMonth()+1)+'-'+this.checkNum(str.getDate())
        },
        checkNum(num) {
            if(num < 10) {
                return '0'+num
            }else {
                return num
            }
        }

    },
}
</script>

<style scoped>
    /* .wrapBox {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        overflow: auto
    } */
    .typeBox {
        width: 220px;
        height: 30px;
        font-size: 14px;
        /* padding: 0 10px; */
        border-radius: 6px;
        margin-bottom: 20px;
    }
    .typeBox div {
        text-align: center;
        flex: 1;
        line-height: 30px;
        border-radius: 6px;
        cursor: pointer;
    }
    .searchWrap {
        margin-bottom: 20px;
    }
    .inputBox {
        width: 180px;
        height: 30px;
        box-sizing: border-box;
        margin-right: 2px;
        padding: 4px 8px;
        margin-left: 2px;
        overflow: hidden;
    }
    .inputBox .searchInput {
        border: none;
        height: 22px;
        /* line-height: 22px; */
        text-indent: 6px;
        outline: none;
        flex: 1;
        overflow: hidden
    }
    .selectedText {
        white-space: nowrap;
        max-width: 90px;
        text-indent: 2px;
        font-size: 14px;
        cursor: pointer;
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

    .tableWrap {
        width: 90%;
        height: 400px;
        /* margin: auto; */
        overflow: auto;
        border: 1px solid #333;
    }

    .condition {
        color: #333;
        font-size: 12px;
        margin-left: 40px;
        width: 60px;
        min-width: 60px;
    }
    

    .pagination {
        float: right;
        /* margin-right: 40px; */
        /* padding-bottom: 70px; */
    }

    .el-form-item .el-form-item {
        margin-bottom: 20px;
    }
    .row2 {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #333;
        font-size: 12px;
    }
    .row2 .block {
        margin-left: 20px;
    }
    .row2 .block input {
        height: 20px !important;
        line-height: 20px !important;
    }
    .typeBtn {
        position: fixed;
        top: 5px;
        right: 6%;
        width: 210px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        border-radius: 4px;
        cursor: pointer;
    }
    .searchBtn {
        width: 50px;
        height: 26px;
        margin-left: 40px;
        font-size: 14px;
        line-height: 26px;
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
    }
    .el-dialog__body {
        padding: 0 !important;
    }
    .TBox {
        float: left;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #606266;
        font-size: 13px;
    }
    .TNumber {
        padding:0 10px;
        line-height: 28px;
        border: 1px solid #e1e5e6;
        margin-left: 10px;
    }
    .footer {
        /* display: flex;
        flex-direction: row;
        align-items: center; */
        width: 90%;
        overflow: hidden;
        margin: 20px 0 0;
    }
    /* .time {
        height: 30px
    } */
    /* .el-input__inner {
        height: 20px !important;
        line-height: 20px !important;
    } */
</style>
