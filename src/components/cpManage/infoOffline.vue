
<template>
  <div>
    <div class="contentTitleModel">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <a v-on:click="closeIt()">CP管理</a>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="first"> 资质下线</span>
    </div>
    <div style="margin:10px 0 "></div>
    <div v-loading="loading" >
      <el-row :gutter="10">
        <el-form :model="model"  ref="form" :rules="rules" label-width="120px" >
          <el-form-item label="下线意见" prop="offstatus">
            <el-radio v-model="model.offstatus" label="0">立即下线</el-radio>
            <el-radio v-model="model.offstatus" label="1">定时下线</el-radio>
            <el-form-item  v-if="model.offstatus=='1'" prop="off_time" style="display: inline-block;margin-left: 50px">
              <div class="block">
                <el-date-picker
                  v-model="model.off_time"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-form-item>
          <el-form-item label="备注说明" prop="remark5">
            <el-input v-model.trim="model.remark5" type="textarea"
                      :rows="8" placeholder="请输入内容500字以内" :maxlength="500" class="remarkStyle">
            </el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <div style="margin:10px 0 "></div>
      <div style="text-align: center">
        <el-button type="info" icon="el-icon-error" v-on:click="closeIt();resetForm('form')">取消</el-button>
        <el-button type="primary" icon="el-icon-success"  v-on:click="saveIt()">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Form from '../../common/form'
  var reg =require('../../common/commonMethods.js')
  import myThirdParty from '../../common/store/myThirdParty'
  var form = new Form({store: myThirdParty});
  var model = function(){
    return {
      offstatus:'0',off_time:'',remark5:''
    }
  }
  form.props= ['dialogOffLine','customerId']
  form.data=function () {
    return {
      loading: false,
      model:model(),
      rules:{
        offstatus:[{ required: true, message: '请选下线意见', trigger: 'change' }],
        off_time:[{ required: true, message: '请选下线时间', trigger: 'change' }],
        remark5:[{ required: true, message: '请输入备注', trigger: 'blur' },
          { min: 1, max: 500, message: '长度在 500字以内', trigger: 'blur' }]
      }
    }
  };
  form.mounted=function () {
  };
  form.watch={
    'model.offstatus':function (newVal,oldVal) {
      if(newVal=='0'){
        this.model.off_time=''
      }
    }
    },
  form.methods.closeIt=function () {
    this.$emit('successOff');
    this.model=model()
  }
  form.methods.resetForm=function(formName) {
    this.$refs[formName].resetFields();
  }
  form.methods.setReadStatus = function () {
    var params={idName:'customerId',
      id:this.customerId,
      isRead:0,
      tableName:'auditstatus',
    }
    this.$http['post']('/getNum/changeRead', params)
      .then((response) => {

      })
      .catch((response) => {

      })
  }
  form.methods.saveIt=function () {
    if(new Date(this.model.off_time)-new Date()<0){
      this.$confirm("定时时间必须大于当前时间", '提示', {
        type: 'warning',
      })
      return;
    }
    this.model.customerId = this.customerId
    var params = {}
    if (this.model.offstatus == '0') {
      for (var key in this.model) {
        params[key] = this.model[key]
      }
    } else {
      params = {customerId: this.customerId, off_time: this.model.off_time, remark5: this.model.remark5}
    }
    this.$confirm('此操作将下线该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$http['post']('/auditManage/infoAudit', params)
            .then((response) => {
              this.loading = false
              this.setReadStatus()
              this.$alert('下线成功！', '温馨提示', {
                confirmButtonText: '确定',
                type: 'success'
              }).then(() => {
                this.closeIt()
                this.resetForm('form')
              });
            })
            .catch((response) => {
              this.loading = false
              this.$alert('下线失败！', '温馨提示', {
                confirmButtonText: '确定',
                type: 'error'
              });
            })
        } else {
          this.$alert('请完善所有必填信息！', '温馨提示', {
            confirmButtonText: '确定',
            center: true,
            type: 'warning '
          });
        }
      })
    })
  }
  export default form
</script>

<style scoped>
  .bread {
    color: #303133;
    font-weight: 700;
    background: 0 0;
    padding: 0;
  }
</style>
