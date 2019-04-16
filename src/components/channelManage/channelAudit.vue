
<template>
  <div>
    <div class="contentTitleModel">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <a v-on:click="closeIt()">渠道管理</a>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second"> 渠道审核</span>
    </div>
    <div style="margin:14px 0 "></div>
    <div v-loading="loading">
      <el-row :gutter="10">
        <el-form  :model="model" :rules="rules" ref="form"  label-width="120px" >
          <el-form-item label="审核意见" prop="status1">
            <el-radio v-model="model.status1" label="2">审核通过</el-radio>
            <el-radio v-model="model.status1" label="1">审核不通过</el-radio>
          </el-form-item>
          <el-form-item prop="remark1" v-if="model.status1=='1'">
            <el-input v-model.trim="model.remark1" type="textarea"
                      :rows="8" placeholder="请输入内容500字以内" :maxlength="500" class="remarkStyle">
            </el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <div style="margin:10px 0 "></div>
      <div style="text-align: center">
        <el-button type="info" icon="el-icon-error" v-on:click="closeIt();resetForm('form')">取消</el-button>
        <el-button type="primary" icon="el-icon-success" v-on:click="saveIt()">提交</el-button>
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
      channel_id:'', status1:'2',remark1:'',
    }
  }
  form.props= ['dialogAudit','channelId']
  form.data=function () {
    return {
      loading: false,
      model:model(),
      rules:{
        status1:[{ required: true, message: '请选审核意见', trigger: 'change' }],
        remark1:[{ required: true, message: '请输入审核不通过原因', trigger: 'blur' },
          { min: 1, max: 500, message: '长度在 500字以内', trigger: 'blur' }],
      }
    }
  };
  form.mounted=function () {
  };
  form.methods.closeIt=function () {
    this.$emit('success',false);
    this.model=model()
  }
  form.methods.resetForm=function(formName) {
    this.$refs[formName].resetFields();
  }
  form.watch={
   'model.status1':function (newVal,oldVal) {
      if(newVal=='2'){
        this.model.remark1=''
      }
    }
  }
  form.methods.setReadStatus = function () {
    var params={idName:'channel_id',
      id:this.channelId,
      isRead:0,
      tableName:'channelauditstatus',
    }
    this.$http['post']('/getNum/changeRead', params)
      .then((response) => {

      })
      .catch((response) => {

      })
  }
  form.methods.saveIt=function () {
    this.model.channel_id=this.channelId
    this.$refs['form'].validate((valid) => {
      if (valid) {
        this.loading = true
        this.$http['post']('/auditManage/channelInfoAudit', this.model)
          .then((response) => {
            this.loading = false
            this.setReadStatus()
            this.$alert('审核成功！', '温馨提示', {
              confirmButtonText: '确定',
              type: 'success'
            }).then(() => {
              this.closeIt()
              this.resetForm('form')
            });;
          })
          .catch((response) => {
            this.$alert('审核失败！', '温馨提示', {
              confirmButtonText: '确定',
              type: 'error'
            });
            this.loading = false
          })
      } else {
        this.$alert('请完善所有必填信息！', '温馨提示', {
          confirmButtonText: '确定',
          center: true,
          type: 'warning '
        });
      }
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
