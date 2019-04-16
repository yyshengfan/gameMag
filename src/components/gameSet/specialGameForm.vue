<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/specialGameList' }">游戏设置</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="first">
        <router-link :to="{ path: '/specialGameList' }">游戏特惠</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">{{resourseStatus}}</span>
    </div>
    <el-card class="box-card changeMar MyContainerCon">
      <div style="margin-top: 2rem" v-loading="loading">
        <el-row :gutter="10">
          <el-col :xs="23" :sm="{span:20, offset: 2}" type="flex" class="row-bg" justify="center">
            <el-form :model="model" ref="form" :rules="rules" label-width="150px" v-loading="loading" >
              <el-row :gutter="10">
                <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="特惠名称" prop="sGname" :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.sGname" placeholder="请输入特惠名称(8字以内)" :clearable="!disabled"
                              :disabled="disabled" :maxlength="8"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="状态" prop="status" :class="{'marBot':disabled}">
                    <el-select v-model="model.status" placeholder="请选择状态" style="width: 100%" :clearable="!disabled"
                               :disabled="disabled" :class="{'notSel': disabled }">
                      <el-option label="关闭" value="2"></el-option>
                      <el-option label="开启" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="简介" prop="intro" :class="{'marBot':disabled}">
                <el-input v-model.trim="model.intro" placeholder="请输入特惠简介(50字以内)" :clearable="!disabled"
                          :disabled="disabled" :maxlength="50"></el-input>
              </el-form-item>
              <el-form-item label="特惠说明" prop="explain" :class="{'marBot':disabled}">
                <el-input v-model.trim="model.explain" placeholder="请输入特惠说明（200字以内）" :clearable="!disabled"
                          :disabled="disabled" type="textarea" :rows="3" :maxlength="200"></el-input>
              </el-form-item>
              <el-row :gutter="10">
                <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="开始时间" prop="btime" :class="{'marBot':disabled}">
                    <span v-if="disabled" v-text="formatOtherDate(model.btime)" class="spanColor"></span>
                    <div class="block" v-if="!disabled">
                      <el-date-picker
                        v-model="model.btime"
                        type="datetime"
                        style="width: 100%"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="结束时间" prop="etime" :class="{'marBot':disabled}">
                    <span v-if="disabled" v-text="formatOtherDate(model.etime)" class="spanColor"></span>
                    <div class="block" v-if="!disabled">
                      <el-date-picker
                        v-model="model.etime"
                        type="datetime"
                        style="width: 100%"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </div>

                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item :label="disabled?'可用游戏':'选择游戏'" prop="usegame"
                            :class="{'marBot':disabled}">
                <span v-if="disabled" style="color:#8c939d ">{{initUseGame(model.usegame)}}</span>
                <div v-if="!disabled">
                  <el-transfer
                    :titles="['全部游戏', '可用游戏']"
                    :button-texts="['取消', '选中']"
                    style="text-align:left;width:100%;"
                    filterable
                    filter-placeholder="请输入游戏名称"
                    v-model="model.usegame"
                    :props="{key: 'gameId',label: 'gName'}"
                    :data="gameDatas">
                  </el-transfer>
                </div>
              </el-form-item>
              <el-form-item :label="disabled?'可用平台':'选择平台'" prop="usechannel"
                            :class="{'marBot':disabled}">
                <span v-if="disabled" style="color:#8c939d ">{{initUseChannel(model.usechannel)}}</span>
                <div v-if="!disabled">
                  <el-transfer
                    :titles="['全部平台', '可用平台']"
                    :button-texts="['取消', '选中']"
                    style="text-align:left;width:100%;"
                    v-model="model.usechannel"
                    :props="{key: 'id',label: 'platform'}"
                    :data="phoneplatform">
                  </el-transfer>
                </div>
              </el-form-item>
              <el-form-item label="备注(选填)" prop="remark" :class="{'marBot':disabled}">
                <el-input v-model.trim="model.remark" type="textarea" :rows="3" placeholder="请输入内容50字以内"
                          :disabled="disabled" :maxlength="50"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="formButton">
          <el-button type="info" icon="el-icon-error" style="width: 18%;"
                     @click="disabled=true;isUpdate=false;resetForm('form')" v-if="!disabled && isUpdate">
            取消
          </el-button>
          <el-button type="info" icon="el-icon-back" style="width: 18%;margin: 0 16px;" @click="back()"
                     v-if="!isUpdate">返回
          </el-button>
          <el-button type="primary" class="status" icon="fa fa-save" style="width: 18%;margin: 0 16px;" @click="save();"
                     v-if="!disabled">保存
          </el-button>
          <el-button type="primary" @click="updateInfo()" icon="el-icon-edit" style="width: 18%;" v-if="disabled">修改
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Form from '../../common/form'
import specialGame from '../../common/store/specialGame'
import phoneplatform from '../../common/store/phoneplatform'
import converter from '../../common/converter'
var reg = require('../../common/commonMethods.js')
var form = new Form({store: specialGame});
var model = function () {
  return { id:"", sGname:"",status:"2", intro:"", explain:"",
          btime:new Date(), etime:new Date(), usegame:[],usechannel:[], remark:"",
        }
};

form.data = function() {
  return {
    loading:false,
    model:model(),
    origModel:model(),
    disabled:false,
    isUpdate:false,
    modelFormat : {
      usechannel:converter.stringToIntArray,
      usegame:converter.stringToIntArray
    },
    action:'',
    resourseStatus:'',
    rules:{
      status: [{required: true, message: '请选择状态', trigger: 'change'},] ,
      sGname: [{ required: true, message: '请输入特惠名称', trigger: 'blur' },
        { min: 1, max: 8, message: '请输入特惠名称(8字以内)', trigger: 'blur' }],
      intro: [{ required: true, message: '请输入特惠简介', trigger: 'blur' },
        { min: 1, max: 50, message: '请输入特惠简介(50字以内)', trigger: 'blur' }],
      explain: [{ required: true, message: '请输入特惠说明', trigger: 'blur' },
        { min: 1, max: 200, message: '请输入特惠说明(200字以内)', trigger: 'blur' }],
      btime: [{ required: true, message: '请选择日期', trigger: 'change' }],
      etime: [{  required: true, message: '请选择日期', trigger: 'change' },
        {required: true, validator: this.etime, trigger: 'blur'}],
      usechannel: [{required: true, message: '请选择可用渠道', trigger: 'blur'},],
      usegame: [{required: true, message: '请选择可用游戏', trigger: 'blur'},],
    },
    gameDatas:[],

  }
}

form.mounted = function(){
  if(this.$route.params.id!=='new'){
    this.action = 'update'
    this.resourseStatus = '查看'
    this.disabled=true
    this.get()
  }else{
    this.action = 'add'
    this.resourseStatus = '新增'
  }
  this.getGames()
}

form.watch = {
  'model.gameId':function () {
    if(this.model.gameId){
      this.getGameName()
    }
  },
  'model.usechannel':function (newVal,oldVal) {
    if(newVal){
      this.initUseChannel(this.model.usechannel)
    }
  },
  'model.usegame':function (newVal,oldVal) {
    if(newVal){
      this.initUseGame(this.model.usegame)
    }
  },
  'model.btime':function(val){
    if(typeof val == "string") this.model.btime = new Date(val)
  },
  'model.etime':function(val){
    if(typeof val == "string") this.model.etime = new Date(val)
  },
}
form.computed = {
  phoneplatform:phoneplatform.data,
}
form.methods.filterMethod=function(query, item) {
  return item.gameDatas.indexOf(query) > -1;
}

form.methods.getGames= function () {
  var params={
    status:'5',offstatus:'1',pass:'1'
  }
  this.$http['post']('/auditManage/getGameAll',params)
    .then((response) => {
      this.gameDatas=response.data.data
    })
    .catch((response) => {
    })
}
form.methods.getGameName= function () {
  var data=this.gameDatas
  for(var i=0;i<data.length;i++){
    if(this.model.gameId==data[i].gameId){
      this.model.gName=data[i].gName
    }
  }
}
form.methods.initUseChannel = function(val){
  var useChannel =  ''
  for(var channel of this.phoneplatform){
    for(var va of val){
      if(va == channel.id){
        useChannel+=','+channel.platform
      }
    }
  }
  return useChannel.substring(1)
}
form.methods.initUseGame = function(val){
  var useGame =''
  for(var game of this.gameDatas){
    for(var va of val){
      if(va == game.gameId){
        useGame+=','+game.gName
      }
    }
  }
  return useGame.substring(1)
}
//点击修改
form.methods.updateInfo = function () {
  this.isUpdate = true;
  this.disabled = false;
}
form.methods.resetForm=function(formName) {
  this.$refs[formName].resetFields();
  this.reset()
}
form.methods.etime = function (start, end, callback) {
  start = this.model.btime
  end = this.model.etime
  this.vailDate(start, end, callback)
}
//日期验证（开始日期小于结束日期）
form.methods.vailDate = function (start, end, callback) {
  var dateIsOk = reg.dateIsOk(start, end)
  var endit = end
  if (!dateIsOk) {
    this.$alert('截止日期不能小于开始日期!', '温馨提示', {
      confirmButtonText: '确定',
      center: true,
      type: 'warning'
    }).then(() => {
      callback(new Error('请输入正确的日期'));
    })
  } else {
    callback()
  }

}
  export default form
</script>

<style scoped>
  .inlineBlock {
    display: inline-block;
    width: 49%;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-input.is-disabled .el-input__inner{
    background-color:#ffffff !important;
    border:none !important;
    color: #909399 !important;
    cursor: not-allowed;
    padding-left: 0 !important;
  }
  .el-input--suffix.is-disabled .el-input__inner{
    padding-left: 0;
  }
  .spanColor {
    color: #909399;
  }

</style>
