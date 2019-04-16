<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/gameSetList' }">游戏设置</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="first">
        <router-link :to="{ path: '/gameSetList' }">游戏配置</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">{{resourseStatus}}</span>
    </div>
    <el-card class="box-card changeMar MyContainerCon">
      <div style="margin-top: 2rem" v-loading="loading">
        <el-row :gutter="10">
          <el-col :xs="23" :sm="{span:20, offset: 2}" type="flex" class="row-bg" justify="center">
            <el-form :model="model" ref="form" :rules="$route.params.id == 'updateAll'?rules2:rules" label-width="150px">
              <el-form-item label="游戏名称" prop="gameId" :class="{'marBot':disabled}">
                <!--span v-if="disabled && action == 'add' && model.gName" class="spanColor">{{model.gName}}</span>-->
                <span v-if="disabled && action == 'update'" class="spanColor">{{model.gName}}</span>
                <el-input v-if="!disabled && action == 'update'" v-model.trim="model.gName"  disabled></el-input>
                <el-select v-if="!disabled && action == 'add'" v-model="model.gameId" :clearable="!disabled" :class="{'notSel': disabled }"
                            filterable placeholder="请选择游戏名称" style="width: 100%">
                  <el-option
                    v-for="item in gameDatas"
                    :key="item.gameId"
                    :label="item.gName"
                    :value="item.gameId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="游戏星级" prop="gameId" :class="{'marBot':disabled}">
                <el-rate v-model="model.stars" :disabled="disabled" style="margin-top: 7px"></el-rate>
              </el-form-item>
              <el-row :gutter="10">
                <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="状态" prop="status" :class="{'marBot':disabled}">
                    <el-select v-model="model.status" placeholder="请选择状态" style="width: 100%" :clearable="!disabled"
                               :disabled="disabled" :class="{'notSel': disabled }">
                      <el-option label="关闭" value="2"></el-option>
                      <el-option label="开启" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="排序" prop="sort" :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.sort" placeholder="请输入排序" clearable v-if="disabled" :disabled="disabled"></el-input>
                    <el-input-number v-model="model.sort" :min="0" label="排序" style="width: 100%" :disabled="disabled"
                                     v-if="!disabled"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="热度"  :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.heat" placeholder="请输入热度值（可选）" :clearable="!disabled"
                              :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="下载量" :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.downloadnum" placeholder="请输入下载量（可选）" :clearable="!disabled"
                              :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="开始时间" prop="btime" :class="{'marBot':disabled}">
                    <span v-if="disabled" v-text="formatOtherDate(model.btime)" class="spanColor"></span>
                    <div class="block" v-if="!disabled">
                      <el-date-picker
                        :disabled="disabled"
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
                        :disabled="disabled"
                        v-model="model.etime"
                        type="datetime"
                        style="width: 100%"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </div>

                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item :label="disabled?'可用平台':'选择平台'" prop="phoneplatform"
                            :class="{'marBot':disabled}" v-if="$route.params.id == 'updateAll'">
                <el-input v-if="!disabled && action == 'update'" v-model.trim="model.platform"  disabled></el-input>
              </el-form-item>
              <el-form-item :label="disabled?'已选类型':'选择类型'" prop="gamephonetype"
                            :class="{'marBot':disabled}" v-if="$route.params.id == 'updateAll'">
                <el-input v-if="!disabled && action == 'update'" v-model.trim="model.gametype"  disabled></el-input>
              </el-form-item>
              <el-form-item :label="disabled?'可用平台':'选择平台'" prop="phoneplatform"
                            :class="{'marBot':disabled}" v-if="$route.params.id !== 'updateAll'">
                <span v-if="disabled" style="color:#8c939d ">{{model.platform}}</span>
                <el-input v-if="!disabled && action == 'update'" v-model.trim="model.platform"  disabled></el-input>
                <div v-if="!disabled && action == 'add'">
                  <el-transfer
                    :titles="['全部平台', '可用平台']"
                    :button-texts="['取消', '选中']"
                    style="text-align:left;width:100%;"
                    v-model="model.phoneplatform"
                    :props="{key: 'id',label: 'platform'}"
                    :data="phoneplatform">
                  </el-transfer>
                </div>
              </el-form-item>
              <el-form-item :label="disabled?'已选类型':'选择类型'" prop="gamephonetype"
                            :class="{'marBot':disabled}" v-if="$route.params.id !== 'updateAll'">
                <span v-if="disabled" style="color:#8c939d ">{{model.gametype}}</span>
                <el-input v-if="!disabled && action == 'update'" v-model.trim="model.gametype"  disabled></el-input>
                <div v-if="!disabled && action == 'add'">
                  <el-transfer
                    :titles="['全部类型', '选择类型']"
                    :button-texts="['取消', '选中']"
                    style="text-align:left;width:100%;"
                    v-model="model.gamephonetype"
                    :props="{key: 'id',label: 'gametype'}"
                    :data="gamephoneType">
                  </el-transfer>
                </div>
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
          <el-button type="primary" @click="updateInfo2()" icon="el-icon-edit-outline" style="width: 18%;margin: 0 16px;" v-if="disabled">基本信息
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Form from '../../common/form'
import gamephoneType from '../../common/store/gamephoneType'
import gameSet from '../../common/store/gameSet'
import phoneplatform from '../../common/store/phoneplatform'
var reg = require('../../common/commonMethods.js')
var form = new Form({store: gameSet});
var model = function () {
  return { id:"", gamephonetype:[],gametype:'',platform:'',gName:"",gameId:"", status:"2", heat:'0',
    downloadnum:"0",sort:"999", btime:new Date(), etime:new Date(), phoneplatform:[],stars:3,}
};

form.data = function() {
  return {
    loading:false,
    model:model(),
    origModel:model(),
    disabled:false,
    isUpdate:false,
    action:'',
    resourseStatus:'',
    rules:{
      gamephonetype: [{required: true, message: '请选择类型', trigger: 'blur'},] ,
      gameId: [{required: true, message: '请选择游戏', trigger: 'change'},] ,
      status: [{required: true, message: '请选择状态', trigger: 'change'},] ,
      sort: [{ required: true, message: '请输入排序', trigger: 'blur' },],
      btime: [{ required: true, message: '请选择日期', trigger: 'change' }],
      etime: [{  required: true, message: '请选择日期', trigger: 'change' },
        {required: true, validator: this.etime, trigger: 'blur'}],
      phoneplatform: [{required: true, message: '请选择可用平台', trigger: 'blur'},],
    },
    rules2:{},
    gameDatas:[],

  }
}

form.mounted = function() {
  this.getGames()
  if(this.$route.params.id == 'new') {
    this.action = 'add'
    this.resourseStatus = '新增'
  } else if(this.$route.params.id == 'updateAll'){
    this.action = 'update'
    this.resourseStatus = '批量修改'
    this.model.stars=0;
    this.model.status='1';
    this.model.sort=0;
    this.model.downloadnum=''
    this.model.heat=''
    this.setDates()
  }else{
    this.action = 'update'
    this.resourseStatus = '查看'
    this.disabled = true
    this.get()
  }
}
form.watch = {
  'model.gameId': function () {
    if (this.model.gameId) {
      this.getGameName()
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
  gamephoneType:gamephoneType.data,
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
form.methods.setDates= function () {
  this.disabled=false
  var params=this.$route.params
  this.model.gameId=params.gameId
  this.model.gName=params.gName
  if(params.gamephonetype){
    this.model.gamephonetype.push(params.gamephonetype)
    for(var i=0;i<this.gamephoneType.length;i++){
      if(params.gamephonetype==this.gamephoneType[i].id){
        this.model.gametype=this.gamephoneType[i].gametype
      }
    }
  }else{
    for(let item of this.gamephoneType){
      this.model.gamephonetype.push(item.id)
      this.model.gametype+=item.gametype+'，'
    }
    this.model.gametype=this.model.gametype.substr(0,this.model.gametype.length-1)
  }

  if(params.phoneplatform){
    this.model.phoneplatform.push(params.phoneplatform)
    for(var i=0;i<this.phoneplatform.length;i++){
      if(params.phoneplatform==this.phoneplatform[i].id){
        this.model.platform=this.phoneplatform[i].platform
      }
    }
  }else{
    for(let item of this.phoneplatform){
      this.model.phoneplatform.push(item.id)
      this.model.platform+=item.platform+'，'
    }
    this.model.platform=this.model.platform.substr(0,this.model.platform.length-1)
  }
}
form.methods.getGameName= function () {
  var data=this.gameDatas
  for(var i=0;i<data.length;i++){
    if(this.model.gameId==data[i].gameId){
      this.model.gName=data[i].gName
    }
  }
}
//点击修改
form.methods.updateInfo = function () {
  this.isUpdate = true;
  this.disabled = false;
}
form.methods.updateInfo2 = function () {
  this.$router.push({name:'gameInfoUpdate'})
}
form.methods.resetForm=function(formName) {
  this.$refs[formName].resetFields();
  this.reset()
}
/*form.methods.saveIt=function() {
  this.loading=true
  this.$http['post']('/auditManage/addGameOption',this.model)
    .then((response) => {
      this.loading=false
      this.$router.push({name:'gameSetList'})
      this.$parent.getList()
    })
    .catch((response) => {
      this.loading=false
    })
}*/
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
