
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
      <span class="first"> 资质审核</span>
    </div>
    <div style="margin:10px 0 "></div>
    <div v-loading="loading" class="overFlowStyle">
      <el-row :gutter="10">
        <el-form :model="model" :rules="rules" ref="form"  label-width="150px" >
          <el-form-item label="基本信息" prop="status1">
            <el-radio v-model="model.status1" label="2">审核通过</el-radio>
            <el-radio v-model="model.status1" label="1">审核不通过</el-radio>
          </el-form-item>
          <el-form-item  prop="remark1" v-if="model.status1=='1'">
            <el-input v-model.trim="model.remark1" type="textarea"
                      :rows="8" placeholder="请输入审核不通过原因，500字以内" :maxlength="500" class="remarkStyle">
            </el-input>
          </el-form-item>
          <el-form-item label="资质证明" prop="status2">
            <el-radio v-model="model.status2" label="2">审核通过</el-radio>
            <el-radio v-model="model.status2" label="1">审核不通过</el-radio>
          </el-form-item>
          <el-form-item  prop="remark2" v-if="model.status2=='1'">
            <el-input v-model.trim="model.remark2" type="textarea"
                      :rows="8" placeholder="请输入审核不通过原因，500字以内" :maxlength="500" class="remarkStyle">
            </el-input>
          </el-form-item>
          <el-form-item label="合同与结算信息" prop="status3">
            <el-radio v-model="model.status3" label="2">审核通过</el-radio>
            <el-radio v-model="model.status3" label="1">审核不通过</el-radio>
          </el-form-item>
          <el-form-item  prop="remark3" v-if="model.status3=='1'">
            <el-input v-model.trim="model.remark3" type="textarea"
                      :rows="8" placeholder="请输入审核不通过原因，500字以内" :maxlength="500" class="remarkStyle">
            </el-input>
          </el-form-item>
          <el-form-item label="联系信息" prop="status4">
            <el-radio v-model="model.status4" label="2">审核通过</el-radio>
            <el-radio v-model="model.status4" label="1">审核不通过</el-radio>
          </el-form-item>
          <el-form-item  prop="remark4" v-if="model.status4=='1'" >
            <el-input v-model.trim="model.remark4" type="textarea"
                      :rows="8" placeholder="请输入审核不通过原因，500字以内" :maxlength="500" class="remarkStyle">
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
      customerId:'',status1:'2',remark1:'',status2:'2',remark2:'',status3:'2',remark3:'',status4:'2',remark4:'',
    }
  }
  form.props= ['dialogAudit','customerId']
  form.data=function () {
    return {
      loading: false,
      model:model(),
      rules:{
        status1:[{ required: true, message: '请选审核意见', trigger: 'change' }],
        remark1:[{ required: true, message: '请输入审核不通过原因', trigger: 'blur' },
          { min: 1, max: 500, message: '长度在 500字以内', trigger: 'blur' }],
        status2:[{ required: true, message: '请选审核意见', trigger: 'change' }],
        remark2:[{ required: true, message: '请输入审核不通过原因', trigger: 'blur' },
          { min: 1, max: 500, message: '长度在 500字以内', trigger: 'blur' }],
        status3:[{ required: true, message: '请选审核意见', trigger: 'change' }],
        remark3:[{ required: true, message: '请输入审核不通过原因', trigger: 'blur' },
          { min: 1, max: 500, message: '长度在 500字以内', trigger: 'blur' }],
        status4:[{ required: true, message: '请选审核意见', trigger: 'change' }],
        remark4:[{ required: true, message: '请输入审核不通过原因', trigger: 'blur' },
          { min: 1, max: 500, message: '长度在 500字以内', trigger: 'blur' }],
      }
    }
  };
  form.mounted=function () {

  };
  form.watch={
    'model.status1':function (newVal,oldVal) {
      if(newVal=='2'){
        this.model.remark1=''
      }
    },
    'model.status2':function (newVal,oldVal) {
      if(newVal=='2'){
        this.model.remark2=''
      }
    },
    'model.status3':function (newVal,oldVal) {
      if(newVal=='2'){
        this.model.remark3=''
      }
    },
    'model.status4':function (newVal,oldVal) {
      if(newVal=='2'){
        this.model.remark4=''
      }
    },
  }
  form.methods.closeIt=function () {
    this.$emit('success');
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
    this.model.customerId=this.customerId
    this.$refs['form'].validate((valid) => {
      if (valid) {
        this.loading = true
        this.$http['post']('/auditManage/infoAudit', this.model)
          .then((response) => {
            this.loading = false
            this.setReadStatus()
            this.$alert('审核成功！', '温馨提示', {
              confirmButtonText: '确定',
              type: 'success'
            }).then(() => {
              this.closeIt()
              this.resetForm('form')
            });
          })
          .catch((response) => {
            this.$alert('审核失败！', '温馨提示', {
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
