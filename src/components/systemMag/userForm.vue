<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/roleMag' }">系统设置</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="first">
        <router-link :to="{ path: '/userMag' }">用户管理</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">{{rolestatus}}</span>
    </div>
    <el-card class="box-card changeMar MyContainerCon">
      <div style="margin-top: 2rem"  v-loading="loading">
        <el-row>
          <el-col :sm="20" :xs="22">
            <el-form label-width="200px" :model="model" ref="form" :rules="rules" class="myCheck02">
              <el-form-item  label="登录名:" prop="loginName">
                <el-input  v-model.trim="model.loginName"></el-input>
              </el-form-item>
              <el-form-item label="密码:" prop="pw">
                <el-input :maxlength="20" type="password" v-model.trim="model.pw"></el-input>
              </el-form-item>
              <el-form-item label="确认密码:" prop="checkPass">
                <el-input :maxlength="20" type="password" v-model.trim="model.checkPass"></el-input>
              </el-form-item>
              <el-form-item label="真实姓名:" prop="userName">
                <el-input :maxlength="10" v-model.trim="model.userName"></el-input>
              </el-form-item>
              <el-form-item label="所属部门:" prop="branch">
                <el-input :maxlength="25" v-model.trim="model.branch"></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱:" prop="email">
                <el-input :maxlength="25" v-model.trim="model.email"></el-input>
              </el-form-item>
              <el-form-item label="手机:" prop="tel">
                <el-input :maxlength="11" v-model.trim="model.tel"></el-input>
              </el-form-item>
              <el-form-item label="所属组别:" prop="group">
                <el-checkbox-group v-model="model.group">
                   <el-checkbox v-for="child in roleList" :label="child.roleId" :key="child.roleId" :value="child.roleId">{{child.roleName}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="formButton">
          <el-button type="info" style="width: 18%" icon="el-icon-error" @click="back">取消</el-button>
          <el-button type="primary" style="width:18%;margin-left: 16px;" icon="el-icon-success" @click="create">保存</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Form from '../../common/form'
import userList from '../../common/store/userList'
// import roleList from '../../common/store/roleList'
import converter from '../../common/converter'

var reg = require('../../common/commonMethods.js')
var form = new Form({store: userList});
var model = function () {
  return {
    user_id:'',
    loginName : '',
    pw : '',
    tel : '',
    group: [],
    userName : '',
    email : '',
    branch : '',
    arryId : [],
    addgroup:[],
    delgroup:[],
  }
};


form.data = function() {
  return {
    rolestatus:'新增角色',
    loading:false,
    model:model(),
    origModel:model(),
    action:'',
    roleList:'',
    modelFormat : {
      arryId:converter.stringToIntArray,
      group:converter.stringToIntArray
    },
    rules:{
      loginName: [
        {required: true,message: '请输入登录名',  trigger: 'blur'},
      ],
      pw: [
        {required: true, validator: reg.password, trigger: 'blur'},
      ],
      checkPass: [
        {required: true, validator: this.checkPass, trigger: 'blur' }
      ],
      userName: [
        {required: true, message: '请输入真实姓名', trigger: 'blur'},
      ],
      branch: [
        {required: true, message: '请输入所属部门', trigger: 'blur'},
      ],
      email: [
        {required: true, validator: reg.RegisterEmail, trigger: 'blur'},
      ],
      tel: [
        {required: true, validator: reg.RegisterPhone, trigger: 'blur'},
      ],
      group: [
        {type: 'array',required: true, message: '请选择所属组别', trigger: 'change'},
      ] ,
    }
  }
}

form.mounted = function(){
  if(this.$route.params.id!=='new'){
    this.action = 'update'
    this.rolestatus = '修改用户'
    this.get()
  }else{
    this.action = 'add'
    this.rolestatus = '新增用户'
  }
  this.getRole()
}

form.watch = {
  'model.pw':function(val){
    if(this.action == 'update' && !this.model.checkPass){
      this.model.checkPass = this.model.pw
    }
  }
}

//获取角色组
form.methods.getRole = function(){
  this.$http.post('privilege/getUserMsg')
  .then((res)=>{
    this.roleList = res.data.data.list
  })
}

//检查两次密码是否一致
form.methods.checkPass = function(rule, value, callback){
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== this.model.pw) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
}

//获取角色组id
form.methods.getarryId = function(val){
  var list = this.model.arryId
  if(list.indexOf(val) == -1){
    list.push(val)
  }else{
    list.splice(list.indexOf(val),1)
  }
  this.model.arryId = list
}

form.computed = {
  // roleList:roleList.data
}

//提交
form.methods.create = function(){
  if(this.action=='update'){
    this.model.addgroup = []
    this.model.delgroup = []
    this.model.ctime = new Date()
    //获取删除和新增的id
    for(var item of this.model.group){
      if(this.origModel.group.indexOf(item)<0){
        this.model.addgroup.push(item)
      }
    }
    for(var item of this.origModel.group){
      if(this.model.group.indexOf(item)<0){
        this.model.delgroup.push(item)
      }
    }
  }else{
    this.model.arryId = this.model.group
  }
  this.save()
}

  export default form
</script>

<style scoped>
</style>
