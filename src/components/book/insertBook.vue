<template>
  <div class="insertBook wrapBox">
    <!-- <div style="overflow:auto"> -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm">
        <el-form-item>
          <el-col :md="7" :sm="11" :xs="20">
            <el-form-item label="订舱员" prop="bookclerk">
              <el-input v-model="ruleForm.bookclerk"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :md="7" :sm="11" :xs="20">
            <el-form-item label="日期" prop="bookdate1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.bookdate1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="7" :sm="11" :xs="20">
            <el-form-item label="进程" prop="bookpro">
              <el-input v-model="ruleForm.bookpro"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="7" :sm="11" :xs="20">
            <el-form-item label="业务单号" prop="servicenumber">
              <el-input v-model="ruleForm.servicenumber"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :md="7" :sm="11" :xs="20">
            <el-form-item label="ETDCY" prop="bookcydate1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.bookcydate1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="7" :sm="11" :xs="20">
            <el-form-item label="20`GP" prop="book20gp">
              <el-input v-model="ruleForm.book20gp"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="7" :sm="11" :xs="20">
            <el-form-item label="40`GP" prop="book40gp">
              <el-input v-model="ruleForm.book40gp"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="7" :sm="11" :xs="20">
            <el-form-item label="40`HQ" prop="book40hq">
              <el-input v-model="ruleForm.book40hq"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :md="7" :sm="11" :xs="20">
            <el-form-item label="TUE" prop="booktue">
              <el-input v-model="ruleForm.booktue"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="7" :sm="11" :xs="20">
            <el-form-item label="POL" prop="bookpol">
              <el-input v-model="ruleForm.bookpol"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="7" :sm="11" :xs="20">
            <el-form-item label="POD" prop="bookpod">
              <el-input v-model="ruleForm.bookpod"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="7" :sm="11" :xs="20">
            <el-form-item label="船东" prop="bookship">
              <el-input v-model="ruleForm.bookship"></el-input>
            </el-form-item>
          </el-col>

          <el-col :md="7" :sm="11" :xs="20">
            <el-form-item label="订舱方" prop="bookside">
              <el-input v-model="ruleForm.bookside"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="7" :sm="11" :xs="20">
            <el-form-item label="Contract" prop="bookcontract">
              <el-input v-model="ruleForm.bookcontract"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="7" :sm="11" :xs="20">
            <el-form-item label="hpl合约号" prop="hpl">
              <el-input v-model="ruleForm.hpl"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="7" :sm="11" :xs="20">
            <el-form-item label="S/O NO" prop="bookso">
              <el-input v-model="ruleForm.bookso"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="7" :sm="11" :xs="20">
            <el-form-item label="VEL/VOY" prop="bookvelvoy">
              <el-input v-model="ruleForm.bookvelvoy"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="7" :sm="11" :xs="20">
            <el-form-item label="部门" prop="bookdepart">
              <el-select v-model="ruleForm.bookdepart" placeholder="请选择部门">
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
            <el-form-item label="业务经理" prop="servicemanager">
              <el-input v-model="ruleForm.servicemanager"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="7" :sm="11" :xs="20">
            <el-form-item label="业务员" prop="serviceman">
              <el-input v-model="ruleForm.serviceman"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="7" :sm="11" :xs="20">
            <el-form-item label="文件员" prop="fileman">
              <el-input v-model="ruleForm.fileman"></el-input>
            </el-form-item>
          </el-col>

          <el-col :md="7" :sm="11" :xs="20">
            <el-form-item label="甩柜、换船ETD" prop="cabinet">
              <el-input v-model="ruleForm.cabinet"></el-input>
            </el-form-item>
          </el-col>

          <!-- <el-col :md="24"  class="button">
            <el-button type="primary" @click="submitForm('ruleForm')">确认录入</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-col> -->
        </el-form-item>
        <div class="buttons">
          <div class="button border-main color-main" @click="submitForm('ruleForm')">确认录入</div>
          <div @click="resetForm('ruleForm')" class="button button-reset  border-main color-main">重置</div>
        </div>
      </el-form>
    <!-- </div> -->
    <!-- <breadcrumb :breadcrumb="['订舱管理','录入订舱']"></breadcrumb> -->
    
  </div>
</template>

<script>
//   import axios from 'axios'
  // import breadcrumb from '../common/breadcrumb'
  export default {
    data() {
      return {
        ruleForm: {
          bookclerk: '',
          bookdate: '',
          bookdate1: '',
          bookpro: '',//进程
          servicenumber: '',//业务单号
          bookcydate: '',
          bookcydate1: '',
          book20p: '',
          book40gp: '',
          book40hq: '',
          booktue: '',
          bookpol: '',
          bookpod: '',
          bookship: '',//船东
          bookside: '',//订舱方
          bookcontract: '',
          hpl: '',
          bookso: '',
          bookvelvoy: '',
          bookdepart: '',//部门
          servicemanager: '',//业务经理
          serviceman:　'',//业务员
          fileman: '',//文件员
          cabinet: '',
        },
        rules: {
          bookclerk: [
            { required: true, message: '请输入订舱员姓名', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          bookdate1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          bookpro: [
            { required: true, message: '请输入进程', trigger: 'blur' }
          ],
          servicenumber: [
            { required: true, message: '请输入业务单号', trigger: 'blur' }
          ],
          bookcydate1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          book20gp: [
            // { required: true, message: '请输入20`GP', trigger: 'blur' }
          ],
          book40gp: [
            // { required: true, message: '请输入40`GP', trigger: 'blur' }
          ],
          book40hq: [
            // { required: true, message: '请输入40`HQ', trigger: 'blur' }
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
          hpl: [
            // { required: true, message: '请输入hpl合约号', trigger: 'blur' }
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
          cabinet: [
            // { required: true, message: '请输入甩柜、换船ETD', trigger: 'blur' }
          ],
        }
      };
    },
    // components: {breadcrumb},
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            // console.log('ruleForm:',this.ruleForm);
            this.ruleForm.bookdate = this.changeDate(this.ruleForm.bookdate1)
            this.ruleForm.bookcydate = this.changeDate(this.ruleForm.bookcydate1)
            // this.$set(this.ruleForm,'bookdate',this.changeDate(this.ruleForm.bookdate))
            // this.$set(this.ruleForm,'bookcydate',this.changeDate(this.ruleForm.bookcydate))
            // console.log('data:',this.ruleForm)
            this.$http.post('/index/add/index',this.ruleForm).then(res => {
              if(res.status == 200 && res.data.ret == 200) {
                // this.resetForm('ruleForm')
                this.$message({
                  message: '订舱录入成功！',
                  type: 'success'
                });
              }else {
                this.$message({
                  message: '订舱录入失败',
                  type: 'warning'
                });
              }
            }).catch(() => {
              this.$message({
                message: '未连接到服务器，订舱录入失败',
                type: 'warning'
              });
            })
            // console.log(res)
          } else {
            // console.log('ruleForm:',this.ruleForm);
            // this.$http.post('http://127.0.0.1:8888/').then(res => {
            //   console.log(res)
            // })
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      changeDate(str) {
        return str.getFullYear()+'-'+(str.getMonth()+1)+'-'+str.getDate()
      }
    }
  }
</script>

<style scoped>
  .wrapBox {
    width: 100%;
    height: 100%;
    border-left: 1px solid rgba(217, 217, 217, 1);
    box-sizing: border-box;
    overflow: auto;
  }
  .demo-ruleForm {
      margin-top: 30px;
  }
  .buttons {
    font-size: 14px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .button {
    border-radius: 4px;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    padding: 0;
    cursor: pointer;
  }
  .button:hover {
      background: #2277DA;
      color: #fff;
  }
  .button-reset {
      margin-left: 20px;
  }
  .el-form {
    padding-bottom: 20px;
  }
  .el-form-item > .el-form-item__content:first-child {
    margin-left: 50px !important;
  }
  .el-form-item {
    margin-bottom: 0px !important;
  }
  .el-form-item .el-form-item {
    margin-bottom: 22px !important;
  }
</style>

