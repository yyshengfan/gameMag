<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/gameSpecialList' }">游戏设置</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="first">
        <router-link :to="{ path: '/gameSpecialList' }">游戏专题</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">{{resourseStatus}}</span>
    </div>
    <el-card class="box-card changeMar MyContainerCon">
      <div v-loading="loading">
        <el-col :xs="23" :sm="{span:20, offset: 2}" type="flex" class="row-bg" justify="center" v-if="action=='add'">
          <el-form :model="model" ref="form" :rules="rules" label-width="150px"  >
            <el-row :gutter="10">

              <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                <el-form-item label="专题名称" prop="topicname" :class="{'marBot':disabled}">
                  <el-input v-model.trim="model.topicname" placeholder="请输入专题名称" :clearable="!disabled"
                            :disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                <el-form-item label="状态" prop="status" :class="{'marBot':disabled}">
                  <el-select v-model="model.status" placeholder="请选择状态" style="width: 100%" :clearable="!disabled"
                             :disabled="disabled" :class="{'notSel': disabled }">
                    <el-option label="关闭" value="0"></el-option>
                    <el-option label="开启" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="专题简介" prop="topicintro" :class="{'marBot':disabled}">
              <el-input v-model.trim="model.topicintro" placeholder="请输入专题简介150字以内" :clearable="!disabled"
                        :disabled="disabled" type="textarea" :rows="3" :maxlength="150"></el-input>
            </el-form-item>
            <el-form-item label="专题图片" prop="topicimg" class="topicimg">
              <el-upload
                class="upload-demo"
                ref="upload"
                action=""
                :limit="1"
                :on-change='uploadImg'
                :on-exceed="handleExceed"
                :auto-upload="false">
                <el-button  slot="trigger"  :class="disabled?'delImg':''" type="primary">选取文件</el-button>
              </el-upload>
            </el-form-item>
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
          </el-form>
        </el-col>
        <el-collapse v-model="activeNames" style="border-top: none" v-if="action=='update'">
        <el-row :gutter="10">
              <el-collapse-item name="1">
                <template slot="title">
                  <span><i class="fa fa-list-alt"></i>专题信息</span>
                </template>
                <el-col :xs="23" :sm="{span:20, offset: 2}" type="flex" class="row-bg" justify="center">
                <el-form :model="model" ref="form" :rules="rules" label-width="150px" v-loading="loading" >
              <el-row :gutter="10">

                <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="专题名称" prop="topicname" :class="{'marBot':disabled}">
                    <el-input v-model.trim="model.topicname" placeholder="请输入专题名称" :clearable="!disabled"
                              :disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="状态" prop="status" :class="{'marBot':disabled}">
                    <el-select v-model="model.status" placeholder="请选择状态" style="width: 100%" :clearable="!disabled"
                               :disabled="disabled" :class="{'notSel': disabled }">
                      <el-option label="关闭" value="0"></el-option>
                      <el-option label="开启" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="专题简介" prop="topicintro" :class="{'marBot':disabled}">
                <el-input v-model.trim="model.topicintro" placeholder="请输入专题简介150字以内" :clearable="!disabled"
                          :disabled="disabled" type="textarea" :rows="3"></el-input>
              </el-form-item>
                  <el-row :gutter="10">

                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="收藏人数" prop="favorite" :class="{'marBot':disabled}">
                        <el-input v-model.trim="model.favorite" placeholder="请输入收藏人数" :clearable="!disabled"
                                  :disabled="disabled"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="点赞人数" prop="like" :class="{'marBot':disabled}">
                        <el-input v-model.trim="model.like" placeholder="请输入点赞人数" :clearable="!disabled"
                                  :disabled="disabled"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
              <el-form-item label="专题图片" prop="topicimg" class="topicimg">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  action=""
                  :limit="1"
                  :on-change='uploadImg'
                  :on-exceed="handleExceed"
                  :auto-upload="false">
                  <el-button  slot="trigger"  :class="disabled?'delImg':''" type="primary"  v-if="!disabled">选取文件</el-button>
                </el-upload>
                <div v-if="model.topicimg && isOk">
                  <img :src="model.topicimg" alt="" class="imgStyle" style="margin: 10px 0;"  @click="clickImg($event);">
                  <el-button type="danger" plain icon="el-icon-delete" @click="model.topicimg=''" v-if="!disabled">
                    删除图片
                  </el-button>
                </div>
              </el-form-item>
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
            </el-form>
                </el-col>
              </el-collapse-item>
              <el-collapse-item name="2">
                <template slot="title">
                  <span><i class="fa fa-gamepad"></i>包含游戏</span>
                </template>
                <gameBanner v-bind:disabled="disabled"
                           v-bind:model="model"
                            @clickImg='viewImg($event)'>
                </gameBanner>
              </el-collapse-item>
        </el-row>
        </el-collapse>
        <div class="formButton">
          <el-button type="info" icon="el-icon-error" style="width: 18%;"
                     @click="disabled=true;isUpdate=false;resetForm('form')" v-if="!disabled && isUpdate">
            取消
          </el-button>
          <el-button type="info" icon="el-icon-back" style="width: 18%;margin: 0 16px;" @click="back()"
                     v-if="!isUpdate">返回
          </el-button>
          <el-button type="primary" class="status" icon="fa fa-save" style="width: 18%;margin: 0 16px;" @click="saveIt();"
                     v-if="!disabled">保存
          </el-button>
          <el-button type="primary" @click="updateInfo()" icon="el-icon-edit" style="width: 18%;" v-if="disabled">修改
          </el-button>
        </div>
      </div>
    </el-card>
    <!--放大图片-->
    <el-dialog title="" :visible.sync="dialogImg" modal class="allIMg">
      <img :src="imgSrc"  class="lookImg">
    </el-dialog>
  </div>
</template>

<script>
import Form from '../../common/form'
import gameSpecial from '../../common/store/gameSpecial'
import phoneplatform from '../../common/store/phoneplatform'
import converter from '../../common/converter'
var reg = require('../../common/commonMethods.js')
var form = new Form({store: gameSpecial});
import gameBanner from './gameBanner.vue'

form.components = {
  'gameBanner': gameBanner,
}
var model = function () {
  return { id:"", topicname:'', topicintro:'',topicimg:'',btime:new Date(),favorite:0,like:0,usechannel:[],status:'0',
        }
};

form.data = function() {
  return {
    loading:false,
    isOk:true,
    dialogImg: false,
    showImg: false,
    imgSrc: '',
    activeNames:['1','2'],
    model:model(),
    origModel:model(),
    disabled:false,
    isUpdate:false,
    modelFormat : {
      usechannel:converter.stringToIntArray,
    },
    action:'',
    resourseStatus:'',
    rules:{
      status: [{required: true, message: '请选择状态', trigger: 'change'},] ,
      topicname: [{ required: true, message: '请输入专题名称', trigger: 'blur' },],
      topicintro: [{ required: true, message: '请输入专题简介', trigger: 'blur' },],
      btime: [{ required: true, message: '请选择日期', trigger: 'change' }],
      usechannel: [{required: true, message: '请选择可用渠道', trigger: 'blur'},],
      topicimg:[{required: true, message: '请上传专题图片', trigger: 'blur'}],
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
}

form.watch = {
  'model.usechannel':function (newVal,oldVal) {
    if(newVal){
      this.initUseChannel(this.model.usechannel)
    }
  },
  'model.btime':function(val){
    if(typeof val == "string") this.model.btime = new Date(val)
  },
}
form.computed = {
  phoneplatform:phoneplatform.data,
}
form.methods.doAlert = function () {
  this.$alert('请先删除原文件后再上传！', '温馨提示', {
    confirmButtonText: '确定',
    center: true,
    type: 'warning'
  });
}
//上传提醒每次只能上传一张图片
form.methods.handleExceed = function (files, fileList) {
  this.$alert('每次请选择 1 个文件进行上传！', '温馨提示', {
    confirmButtonText: '确定',
    center: true,
    type: 'warning'
  });
}
//图片限制1 大小类型（单位M）
form.methods.limitIMG= function (file,fileList,size) {
  var imgType=file.raw.type
  var imgSize=Math.floor(file.raw.size / 1024);
  if(imgType!=='image/jpeg' && imgType!=='image/png'){
    this.$alert('上传文件仅支持jpg/png格式！', '温馨提示', {
      confirmButtonText: '确定',
      center: true,
      type: 'warning'
    });
    fileList.shift()
  }else if(imgSize>size*1024){
    this.$alert('上传图片大小不能超过'+size+'MB!', '温馨提示', {
      confirmButtonText: '确定',
      center: true,
      type: 'warning'
    });
    fileList.shift()
  }else{
    return fileList
  }
}
form.methods.changeUpload = function (file, fileList, className) {
  var imgType = file.raw.type
  if (imgType == 'application/zip' || imgType == '' || imgType=='application/pdf') {
    return
  } else {
    var className = '.' + className + ' ' + '.el-upload-list'
    var fileLists = fileList;
    this.$nextTick(
      () => {
        let upload_list_li = document.querySelector(className).children;
        for (let i = 0; i < upload_list_li.length; i++) {
          let li_a = upload_list_li[i];
          //li样式
          li_a.setAttribute('style', "width: 250px;height: 150px;margin:10px;float:left;margin-bottom: 25px;");
          let imgElement = document.createElement("img");
          imgElement.setAttribute('src', fileLists[i].url);
          //img样式
          imgElement.setAttribute('style', "width: 250px;height: 150px;");
          if (li_a.lastElementChild.nodeName !== 'IMG') {
            li_a.appendChild(imgElement);
          }
        }
      });
  }
}
form.methods.uploadImg = function(file,fileList){
  if(this.model.topicimg){
    this.doAlert()
    fileList.shift()
  }else {
    if (this.limitIMG(file, fileList, 5)) {
      this.changeUpload(file, fileList, 'topicimg ');
    }
  }
},
  form.methods.saveIt = function () {
    var formData = new window.FormData();
    var topicimg = document.querySelector('.topicimg .el-upload .el-upload__input') ?
      document.querySelector('.topicimg .el-upload .el-upload__input').files[0] : ''
    if (topicimg) {
      this.model.topicimg = topicimg;//topicimg
    }
    for (var key in this.model) {
      formData.append(key, this.model[key])
    }
    this.save(formData)
  },
  form.methods.viewImg = function (res) {
    this.dialogImg = true
    //放大图片
    this.showImg = true;
    // 获取当前图片地址
    this.imgSrc = res;
  }
  form.methods.clickImg = function (e) {
    this.dialogImg = true
    //放大图片
    this.showImg = true;
    // 获取当前图片地址
    this.imgSrc = e.currentTarget.src;
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
