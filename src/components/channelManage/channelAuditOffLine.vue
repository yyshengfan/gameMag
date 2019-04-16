
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
      <span class="first"> 渠道审核下线</span>
    </div>
    <div style="margin:10px 0 "></div>
    <div v-loading="loading">
      <el-row :gutter="10">
        <el-form :model="model"  ref="form" :rules="rules" label-width="120px" >
          <el-form-item label="审核意见" prop="status">
            <el-radio v-model="model.status" label="2">审核通过</el-radio>
            <el-radio v-model="model.status" label="1">审核不通过</el-radio>
          </el-form-item>
          <el-form-item label="下线意见" prop="offstatus" v-if="model.status=='2'">
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
          <el-form-item label="备注说明" prop="remark2">
            <el-input v-model.trim="model.remark2" type="textarea"
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
      status:'2',
      channel_id:'',offstatus:'0',off_time:'',remark2:''
    }
  }
  form.props= ['dialogAuditOffLine','channelId']
  form.data=function () {
    return {
      loading: false,
      model:model(),
      rules:{
        status:[{ required: true, message: '请选审核意见', trigger: 'change' }],
        offstatus:[{ required: true, message: '请选下线意见', trigger: 'change' }],
        off_time:[{ required: true, message: '请选下线时间', trigger: 'change' }],
        remark6:[{ required: true, message: '请输入备注', trigger: 'blur' },
          { min: 1, max: 500, message: '长度在 500字以内', trigger: 'blur' }]
      }
    }
  };
  form.mounted=function () {
  };
  form.methods.closeIt=function () {
    this.$emit('successOff2');
    this.model=model()
  }
  form.watch={
    'model.offstatus':function (newVal,oldVal) {
      if(newVal=='0'){
        this.model.off_time=''
      }
    }
  },
  form.methods.resetForm=function(formName) {
    this.$refs[formName].resetFields();
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
    if(new Date(this.model.off_time)-new Date()<0){
      this.$confirm("定时时间必须大于当前时间", '提示', {
        type: 'warning',
      })
      return;
    }
    this.model.channel_id = this.channelId
    var params = {}
    if(this.model.status=='2'){//审核通过允许下线——直接调用下线
      if(this.model.offstatus=='0'){
        for(var key in this.model){
          params[key]=this.model[key]
        }
      }else{
        params={channel_id:this.channelId,off_time:this.model.off_time,remark2:this.model.remark2}
      }
    }else{//
      params = {channel_id: this.channelId, remark2: this.model.remark2,status1:2}
    }
    this.$confirm('此操作将审核该下线申请, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$http['post']('/auditManage/channelInfoAudit', params)
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
              this.loading = false
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
