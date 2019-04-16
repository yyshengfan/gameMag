
<template>
  <el-card class="box-card" >
    <div style="border-bottom: 1px solid #ebeef5;">
     <!-- <p style="font-size: 16px;font-weight: 600;color: #2B6A65">渠道管理-修改渠道</p>-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>渠道管理</el-breadcrumb-item>
        <el-breadcrumb-item>修改渠道</el-breadcrumb-item>
        <el-breadcrumb-item>当前渠道：{{$route.params.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="margin:10px 0 "></div>
      <el-button icon="el-icon-back" v-on:click="$parent.infoManage=true;back();" ></el-button>
      <div style="margin:10px 0 "></div>
    </div>
    <div style="margin:10px 0 "></div>
    <div>
      <el-row :gutter="10">
        <el-col :xs="23" :sm="{span: 18, offset: 3}" type="flex" class="row-bg" justify="center">
          <el-form v-loading="loading" :model="model"  ref="form" :rules="rules" label-width="120px" >
            <el-row :gutter="10">
              <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                <el-form-item label="渠道名称" prop="channel_name">
                  <el-input v-model="model.channel_name" placeholder="请输入渠道名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                <el-form-item label="联系人" prop="linkman">
                  <el-input v-model="model.linkman" placeholder="请输入联系人姓名"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                <el-form-item label="手机号码" prop="phone">
                  <el-input v-model="model.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                <el-form-item label="邮箱" prop="Email">
                  <el-input v-model="model.Email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                <el-form-item label="渠道类型" prop="type">
                  <el-select  v-model="model.type" placeholder="请选择渠道类型" style="width: 100%" clearable>
                    <el-option label="应用商店" value="0"></el-option>
                    <el-option label="门户网站" value="1"></el-option>
                    <el-option label="广告联盟" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                <el-form-item label="渠道分成比例" prop="cooperation_type">
                  <!--<el-input v-model="model.cooperation_type" placeholder="请输入渠道分成比例"></el-input>-->
                  <el-select  v-model="model.cooperation_type" placeholder="请选择渠道分成比例" style="width: 100%" clearable>
                    <el-option label="3:4:3" value="0"></el-option>
                    <el-option label="3:3:4" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="渠道资源介绍" prop="introduce">
              <el-input v-model="model.introduce" type="textarea" :rows="8" placeholder="请输入内容500字以内"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div style="margin:10px 0 "></div>
      <div style="text-align: center">
        <el-button type="info" icon="el-icon-error" v-on:click="closeIt()">取消</el-button>
        <el-button type="primary" icon="el-icon-success" v-on:click="updateChannel()" >修改</el-button>
      </div>
    </div>
  </el-card>

</template>

<script>
  import axios from 'axios'
  import Form from '../../common/form'
  var reg =require('../../common/commonMethods.js')
  import myThirdParty from '../../common/store/myThirdParty'
  var form = new Form({store: myThirdParty});
  var model = function(){
    return {
      channel_name:'',linkman:'',phone:'',Email:'',type:'0',introduce:'',cooperation_type:''
    }
  }
  form.data=function () {
    return {
      loading: false,
      model:model(),
      //setAction:'update',
      rules:{
        channel_name:[{required: true, validator: reg.RegisterSign, trigger: 'blur' }],
        linkman:[{required: true, validator: reg.RegisterName, trigger: 'blur' }],
        phone:[{required: true, validator: reg.RegisterPhone, trigger: 'blur' }],
        Email:[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }],
        type:[{ required: true, message: '请选择渠道类型', trigger: 'change' }],
        cooperation_type:[{ required: true, message: '请选择分成比', trigger: 'change' }],
        introduce:[{ required: true, message: '请输入渠道资源介绍', trigger: 'blur' },
          { min: 1, max:500, message: '长度在 500字以内', trigger: 'blur' }],
      },
    }
  };
  form.mounted=function () {
    this.getInfo()
  };
  form.methods.closeIt=function () {
    this.$emit('success',false);
  }
  //根据ID查询
  form.methods.getInfo=function (){
    this.loading=true;
    var id=this.$route.params.id
    axios['post']('/auditManage/checkCnInfo',{channel_id:id})
      .then((response) => {
        for(var key in response.data.data){
          if(response.data.data[key]==="0000-00-00 00:00:00"){
            this.model[key]=''
          }
          else{
            this.model[key]=response.data.data[key]
          }
        }
        this.origModel = _.clone(this.model)
        this.loading=false
      })
      .catch((response) => {
        this.loading=false

      })
  }
  form.methods.updateChannel=function () {
    //this.save()
    this.$refs['form'].validate((valid) => {
      if (valid) {
        this.loading = true
        this.$http['post']('/trench/up', this.model)
          .then((response) => {
            this.loading = false
            this.$alert('修改成功！', '温馨提示', {
              confirmButtonText: '确定',
              type: 'success'
            }).then(() => {
              this.closeIt()
            });
          })
          .catch((response) => {
            this.loading = false
            this.$alert('修改失败！', '温馨提示', {
              confirmButtonText: '确定',
              type: 'error'
            });
          })
      } else {
        this.$alert('请完善所有必填信息！', '温馨提示', {
          confirmButtonText: '确定',
          center: true
        });
      }
    })
  }
  export default form
</script>

<style scoped>

</style>
