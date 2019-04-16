<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/gameSpecialList' }">云闪付</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="first">
        <router-link :to="{ path: '/gameSpecialList' }">数娱专区</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">{{resourseStatus}}</span>
    </div>
    <el-card class="box-card changeMar MyContainerCon">
      <div v-loading="loading">
        <el-col :xs="23" :sm="{span:20, offset: 2}" type="flex" class="row-bg" justify="center">
          <el-form :model="model" ref="form" :rules="rules" label-width="150px"  >
            <el-row :gutter="10">
              <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                <el-form-item label="类型" prop="type" :class="{'marBot':disabled}">
                  <el-select v-model="model.type" placeholder="请选择" style="width: 100%" :clearable="!disabled"
                             :disabled="disabled" :class="{ 'notSel': disabled }" @change="getGames">
                    <el-option label="今日游戏" value="1"></el-option>
                    <el-option label="游戏排序" value="2"></el-option>
                    <el-option label="资讯排序" value="3"></el-option>
                    <el-option label="即将开测" value="4"></el-option>
                    <el-option label="小弹窗" value="5"></el-option>
                    <el-option label="H5游戏" value="6"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                <el-form-item label="名称" prop="name" :class="{'marBot':disabled}" v-if="model.type==2 || model.type==6">
                  <el-input v-if="disabled " v-model.trim="model.name"  disabled></el-input>
                  <el-select v-if="!disabled" v-model="model.name" :clearable="!disabled" :class="{'notSel': disabled }"
                             filterable placeholder="请选择游戏名称" style="width: 100%">
                    <el-option
                      v-for="item in gameDatas"
                      :key="item.gameId"
                      :label="item.gName"
                      :value="item.gName">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="名称" prop="name" :class="{'marBot':disabled}" v-else>
                  <el-input v-model.trim="model.name" placeholder="请输入名称" :clearable="!disabled"
                            :disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center" v-if="model.type!=5">
                <el-form-item label="排序" prop="sort" :class="{'marBot':disabled}">
                  <el-input v-model.trim="model.sort" placeholder="请输入排序" clearable v-if="disabled" :disabled="disabled"></el-input>
                  <el-input-number v-model="model.sort" :min="1" label="排序" style="width: 100%" :disabled="disabled"
                                   v-if="!disabled"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="{span:model.type!=5? 12:24, offset: 0}" type="flex" class="row-bg" justify="center">
                <el-form-item label="状态" prop="status" :class="{'marBot':disabled}">
                  <el-select v-model="model.status" placeholder="请选择状态" style="width: 100%" :clearable="!disabled"
                             :disabled="disabled" :class="{'notSel': disabled }">
                    <el-option label="关闭" value="0"></el-option>
                    <el-option label="开启" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="简介" prop="intro" :class="{'marBot':disabled}" v-if="model.type!=5">
              <el-input v-model.trim="model.intro" placeholder="请输入专题简介150字以内" :clearable="!disabled"
                        :disabled="disabled" type="textarea" :rows="3" :maxlength="150"></el-input>
            </el-form-item>
            <el-form-item label="图片" prop="imgUrl" class="img">
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
              <div v-if="model.imgUrl && isOk">
                <img :src="model.imgUrl" alt="" class="imgStyle" style="margin: 10px 0;"  @click="clickImg($event);">
                <el-button type="danger" plain icon="el-icon-delete" @click="model.imgUrl=''" v-if="!disabled">
                  删除图片
                </el-button>
              </div>
            </el-form-item>
            <el-form-item label="跳转url" prop="url" :class="{'marBot':disabled}">
              <el-input v-model.trim="model.url" placeholder="请输入跳转url" :clearable="!disabled" :disabled="disabled">
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
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
import entertain from '../../common/store/entertain.js'
var reg = require('../../common/commonMethods.js')
var form = new Form({store: entertain});

var model = function () {
  return { id:"", type:'', name:'',sort:'',intro:'',imgUrl:'',status:'0',url:'',}
};

form.data = function() {
  return {
    loading:false,
    isOk:true,
    dialogImg: false,
    showImg: false,
    imgSrc: '',

    model:model(),
    origModel:model(),
    disabled:false,
    isUpdate:false,
    action:'',
    resourseStatus:'',
    rules:{
      status: [{required: true, message: '请选择状态', trigger: 'change'},] ,
      sort: [{ required: true, message: '请输入排序', trigger: 'blur' },],
      name: [{ required: true, message: '请输入名称', trigger: 'blur' },],
      intro: [{ required: true, message: '请输入简介', trigger: 'blur' },],
      type: [{required: true, message: '请选择类型', trigger: 'blur'},],
      imgUrl:[{required: true, message: '请上传图片', trigger: 'blur'}],
      url: [{ required: true, message: '请输入跳转url', trigger: 'blur' },],
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
  'model.type': function () {
    this.model.type=this.model.type.toString()
    if (this.model.type==6 || this.model.type==2) {
      this.getGames()
    }
  },
  'model.status': function () {
    this.model.status=this.model.status.toString()
  },
}
form.computed = {

}
form.methods.getGames= function () {
  if(this.model.type==6){
    var params={
      status:'5',offstatus:'1',pass:'1',Type:'2'
    }
  }else{
    var params={
      status:'5',offstatus:'1',pass:'1'
    }
  }
  this.$http['post']('/entertain/getGameByType',params)
    .then((response) => {
      this.gameDatas=response.data.data
    })
    .catch((response) => {
    })
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
  if(this.model.imgUrl){
    this.doAlert()
    fileList.shift()
  }else {
    if (this.limitIMG(file, fileList, 5)) {
      this.changeUpload(file, fileList, 'img ');
    }
  }
},
  form.methods.saveIt = function () {
    var formData = new window.FormData();
    var img = document.querySelector('.img .el-upload .el-upload__input') ?
      document.querySelector('.img .el-upload .el-upload__input').files[0] : ''
    if (img) {
      this.model.imgUrl = img;//img
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
