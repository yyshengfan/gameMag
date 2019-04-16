<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/electronicNoticeMag' }">个人中心</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">密码修改</span>
    </div>
    <!--用户基本信息表单-->
    <el-card class="box-card MyContainerCon">
      <div v-loading="loading">
        <el-row>
          <el-col :xs="23" :sm="{span: 14,offset: 5 }" type="flex" class="row-bg" justify="center">
            <div style="margin-bottom: 50px"></div>
            <el-form v-loading="loading" :model="model" :rules="rules" ref="form" label-width="120px" :size="$store.state.size" style="height:400px">
              <el-form-item label="原始密码" prop="password">
                <el-input :maxlength="25" type="password" v-model.trim="model.password" placeholder="请输入密码" >
                </el-input>
              </el-form-item>
              <el-form-item label="密码" prop="newpassword">
                <el-input :maxlength="25" type="password" v-model.trim="model.newpassword" placeholder="请输入密码">
                </el-input>
              </el-form-item>
              <el-form-item label="再次输入密码" prop="checkPass">
                <el-input :maxlength="25" type="password" v-model.trim="model.checkPass" placeholder="请输入密码">
                </el-input>
              </el-form-item>
              <el-form-item label="">
                <el-button class="registerbtm" style="width:100%;" type="primary" v-on:click="save" :size="$store.state.size" v-show="buttonList.confirmUpdate">
                  确认修改
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
  import Form from '../../common/form'
  var reg = require('../../common/commonMethods.js')

  var form = new Form({})

  form.data = function(){
    return {
      routeName: "customerForm",
      loading: false,
      model: {
        password:'',
        newpassword:'',
        checkPass:'',
      },
      buttonList:{
        confirmUpdate:false,
      },
      rules:{
        password: [
          {required: true, validator: reg.password, trigger: 'blur'},
        ],
        newpassword: [
          {required: true, validator: reg.password, trigger: 'blur'},
        ],
        checkPass: [
          {required: true, validator: this.checkPass, trigger: 'blur' }
        ]
      }
    }
  }

  form.mounted = function(){
    this.$log("pwdModify mounted", this);
    this.initButton(2,7)
  }

  // 检查两次密码是否一致
  form.methods.checkPass = function(rule, value, callback){
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== this.model.newpassword) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  }

  // 提交
  form.methods.save = function() {
    this.$refs['form'].validate((valid) => {
      if (valid) {
        this.loading = true;
        this.$http.post('/MyCenter/ChangePw', this.model)
          .then((response) => {
            this.loading = false;
            this.$confirm('密码修改成功', '提示', {
              type: 'success',
            })
          })
          .catch((response) => {
            this.loading = false;
            this.$confirm(response.data.respMsg, '提示', {
              type: 'warning',
            })
          })
      }
    })
  }
  
  export default form
</script>

<style scoped>
  .containerMargin {
    margin-bottom: 10px;
  }
</style>
