<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/activitiesList' }">游戏设置</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="first">
        <router-link :to="{ path: '/activitiesList' }">游戏礼包</router-link>
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
                  <el-form-item label="类型" prop="gifttype" :class="{'marBot':disabled}">
                    <el-select v-model="model.gifttype" placeholder="请选择活动类型" style="width: 100%" :clearable="!disabled"
                               :disabled="disabled" :class="{'notSel': disabled }">
                      <el-option
                        v-for="item in activitiesType"
                        :key="item.id"
                        :label="item.gifttype"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="游戏名称" prop="gameId" :class="{'marBot':disabled}">
                    <el-select v-model="model.gameId" :clearable="!disabled" :class="{'notSel': disabled }"
                               :disabled="disabled" filterable placeholder="请选择游戏名称" style="width: 100%">
                      <el-option
                        v-for="item in gameDatas"
                        :key="item.gameId"
                        :label="item.gName"
                        :value="item.gameId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="状态" prop="status" :class="{'marBot':disabled}">
                    <el-select v-model="model.status" placeholder="请选择状态" style="width: 100%" :clearable="!disabled"
                               :disabled="disabled" :class="{'notSel': disabled }">
                      <el-option label="关闭" value="0"></el-option>
                      <el-option label="开启" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="排序" prop="sort" :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.sort" placeholder="请输入排序" clearable v-if="disabled" :disabled="disabled"></el-input>
                    <el-input-number v-model="model.sort" :min="1" label="排序" style="width: 100%" :disabled="disabled"
                                     v-if="!disabled"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="礼包名称" prop="giftname" :class="{'marBot':disabled}">
                <el-input v-model.trim="model.giftname" placeholder="请输入礼包名称" :clearable="!disabled"
                          :disabled="disabled"></el-input>
              </el-form-item>
              <el-form-item label="礼包内容" prop="giftexplain" :class="{'marBot':disabled}">
                <el-input v-model.trim="model.giftexplain" placeholder="请输入礼包内容" :clearable="!disabled"
                          :disabled="disabled"></el-input>
              </el-form-item>
              <el-form-item label="使用方法" prop="useway" :class="{'marBot':disabled}">
                <el-input v-model.trim="model.useway" placeholder="请输入使用方法" :clearable="!disabled"
                          :disabled="disabled" type="textarea" :rows="3"></el-input>
              </el-form-item>
              <el-form-item label="兑换码（未使用）" prop="unusecdkey" :class="{'marBot':disabled}">
                <!--<span v-if="disabled" class="spanColor">{{model.unusecdkey}}</span>-->
                <el-input v-if="disabled" v-model.trim="model.unusecdkey" type="textarea" :rows="8"
                          placeholder="请输入礼包兑换码必需以英文逗号（,）分开" :disabled="disabled"></el-input>
                <el-input v-if="!disabled" v-model.trim="model.unusecdkey" type="textarea" :rows="8"
                          placeholder="请输入礼包兑换码必需以英文逗号（,）分开" :disabled="disabled"></el-input>
              </el-form-item>
              <el-form-item prop="channel_name" v-if="!disabled" :class="{'marBot':disabled}">
                <p style="display: block;float: right;color:#F56C6C ">*礼包兑换码必需以英文逗号（,）分开</p>
              </el-form-item>
              <el-form-item label="兑换码（已使用）" prop="useKey" v-if="model.useKey" :class="{'marBot':disabled}">
              <!--  <span v-if="disabled" class="spanColor">{{model.useKey}}</span>-->
                <el-input v-if="disabled" v-model.trim="model.useKey" type="textarea" :rows="8" :disabled="disabled"></el-input>
                <el-input v-if="!disabled" v-model.trim="model.useKey" type="textarea" :rows="8" :disabled="disabled" readonly></el-input>
              </el-form-item>
              <el-form-item prop="channel_name" v-if="model.useKey && !disabled" :class="{'marBot':disabled}">
                <p style="display: block;float: right;color:#F56C6C ">*不可添加、修改 </p>
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
                        v-if="!disabled"
                        v-model="model.etime"
                        type="datetime"
                        style="width: 100%"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </div>

                  </el-form-item>
                </el-col>
              </el-row>
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
              <el-form-item label="备注" prop="remark" :class="{'marBot':disabled}">
                <el-input v-model.trim="model.remark" type="textarea" :rows="3" placeholder="请输入内容500字以内"
                          :disabled="disabled" :maxlength="500"></el-input>
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
import activitiesType from '../../common/store/activitiesType'
import activities from '../../common/store/activities'
import phoneplatform from '../../common/store/phoneplatform'
import converter from '../../common/converter'
var reg = require('../../common/commonMethods.js')
var form = new Form({store: activities});
var model = function () {
  return { id:"", gifttype:1, gName:"",gameId:"", status:"0", giftname:"", giftexplain:"",
         useway:"", unusecdkey:"",useKey:'', sort:"999", btime:new Date(), etime:new Date(), usechannel:[], remark:"",
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
      usechannel:converter.stringToIntArray
    },
    action:'',
    resourseStatus:'',
    rules:{
      gifttype: [{required: true, message: '请选择类型', trigger: 'change'},] ,
      gameId: [{required: true, message: '请选择游戏', trigger: 'change'},] ,
      status: [{required: true, message: '请选择状态', trigger: 'change'},] ,
      giftname: [{ required: true, message: '请输入礼包名称', trigger: 'blur' },],
      giftexplain: [{ required: true, message: '请输入礼包内容', trigger: 'blur' },],
      sort: [{ required: true, message: '请输入排序', trigger: 'blur' },],
      useway: [{ required: true, message: '请输入使用方法', trigger: 'blur' },],
      unusecdkey:[{required: true, validator: reg.isChinese, trigger: 'blur' }],
      btime: [{ required: true, message: '请选择日期', trigger: 'change' }],
      etime: [{  required: true, message: '请选择日期', trigger: 'change' },
        {required: true, validator: this.etime, trigger: 'blur'}],
      usechannel: [{required: true, message: '请选择可用渠道', trigger: 'blur'},],
      remark: [{required: true, message: '请输入备注', trigger: 'blur'},],
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
    this.getUsecdkey()
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
  'model.btime':function(val){
    if(typeof val == "string") this.model.btime = new Date(val)
  },
  'model.etime':function(val){
    if(typeof val == "string") this.model.etime = new Date(val)
  },
}
form.computed = {
  phoneplatform:phoneplatform.data,
  activitiesType:activitiesType.data,
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
form.methods.getUsecdkey= function () {
  var id=this.$route.params.id
  var params={
    id:id
  }
  this.loading=true
  this.$http['post']('/auditManage/getkeyuseAll',params)
    .then((response) => {
      this.model.unusecdkey=''
      this.model.useKey=''
      var data=response.data.data
      if(data[0].length){
        for(var i=0;i<data[0].length;i++){
          this.model.unusecdkey+=','+data[0][i].notuseKey
        }
      }
      if(data[1].length){
        for(var i=0;i<data[1].length;i++){
          this.model.useKey+=','+data[1][i].useKey
        }
      }
      this.model.unusecdkey = this.model.unusecdkey.substring(1)
      this.model.useKey = this.model.useKey.substring(1)
      this.origModel.unusecdkey = this.model.unusecdkey
      this.origModel.useKey = this.model.useKey
      this.loading=false
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
