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
      <span class="second">游戏基本信息</span>
    </div>
    <el-card class="box-card changeMar MyContainerCon">
      <div style="margin-top: 2rem" v-loading="loading">
        <el-form :model="model" ref="form" :rules="rules" label-width="150px">
          <el-row :gutter="10">
            <el-col :xs="23" :sm="{span: 24}" type="flex" class="row-bg" justify="center">
              <el-form-item label="游戏名称" prop="gName" :class="{'marBot':disabled}">
                <el-input placeholder="游戏名称请与安装包内游戏名称一致" v-model.trim="model.gName"
                          :disabled="disabled" readonly></el-input>
              </el-form-item>
              <el-form-item label="副标题" prop="subhead" :class="{'marBot':disabled}">
                <el-input placeholder="请输入一句话简介(不超过30字)" v-model.trim="model.subhead" :clearable="!disabled"
                          :disabled="disabled" :maxlength="500"></el-input>
              </el-form-item>
              <el-form-item label="关键词(选填)" :class="{'marBot':disabled}">
                                <span style="padding-top:3px;color: #909399;" v-if='disabled'
                                      v-text='model.gamelabel'></span>
                <el-input placeholder="请输入搜索关键词" v-model.trim="model.gamelabel" :clearable="!disabled"
                          :disabled="disabled" type="textarea" :rows="2" v-if='!disabled'></el-input>
              </el-form-item>
              <el-row :gutter="10">
                <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="游戏类型" prop="Type" :class="{'marBot':disabled}">
                    <el-select v-model="model.Type" placeholder="请选择" style="width: 100%" :clearable="!disabled"
                               :disabled="disabled" :class="{ 'notSel': disabled }">
                      <el-option label="单机" value="0"></el-option>
                      <el-option label="网游" value="1"></el-option>
                      <el-option label="H5" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="游戏分类" prop="Sort" :class="{'marBot':disabled}">
                    <el-select v-model="model.Sort" placeholder="请选择" style="width: 100%" :clearable="!disabled"
                               :disabled="disabled" :class="{'notSel': disabled }">
                      <el-option
                        v-for="item in gameSort"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="游戏标签" prop="typetag" v-if="disabled" :class="{'marBot':disabled}">
                <span v-if="disabled" style="color:#8c939d " class="spanColor">{{typetag}}</span>
              </el-form-item>
              <el-form-item label="游戏标签" prop="typetag" v-if="!disabled">
                <div>
                  <el-transfer
                    :titles="['全部标签', '已选标签']"
                    :button-texts="['取消', '选中']"
                    style="text-align:left;width:100%;"
                    v-model="tag"
                    :props="{key: 'id',label: 'tag'}"
                    :data="typetagDatas" @change="settypetag">
                  </el-transfer>
                </div>
              </el-form-item>
              <el-form-item label="是否付费" prop="ispaymoney" :class="{'marBot':disabled}">
                <el-select v-model="model.ispaymoney" placeholder="请选择" style="width: 100%"  :clearable="!disabled"
                           :disabled="disabled" :class="{ 'notSel': disabled }">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="游戏介绍" prop="Introduc" :class="{'marBot':disabled}">
                      <span style="padding-top:3px;padding-left:15px;color: #909399;" v-if='disabled'
                            v-text='model.Introduc'></span>
                <el-input v-if="!disabled"
                          type="textarea"
                          :rows="7"
                          placeholder="请输入游戏简介（500字以内）"
                          v-model.trim="model.Introduc" :disabled="disabled"
                          :maxlength="500">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="游戏ICON" class="ICON" prop="ICON">
            <el-upload class="upload-demo"
                       action=""
                       :limit="1"
                       :on-exceed="handleExceed"
                       :auto-upload='false'
                       :on-change='uploadICON'>
              <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled">本地上传</el-button>
            </el-upload>
            <div v-if="model.ICON && isOk">
              <img :src="model.ICON" alt="" class="imgICON" style="margin: 10px 0;"  @click="clickImg($event);dialogImg = true">
              <el-button type="danger" plain icon="el-icon-delete" @click="model.ICON=''" v-if="!disabled">
                删除图片
              </el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="spanStyle" v-if="!disabled">*512×512像素及以上，大小控制在5MB以下，支持 jpg/png格式</div>
          </el-form-item>
          <!--<el-row :gutter="10" style="margin-bottom: 10px;">
            <el-col :xs="23" :sm="{span: 24, offset: 0}" type="flex" class="row-bg" justify="center">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="{span: 24, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="游戏ICON" class="ICON" prop="ICON" :class="{'marBot':disabled}">
                    <el-upload class="upload-demo"
                               action=""
                               :limit="1"
                               :on-exceed="handleExceed"
                               :auto-upload='false'
                               :on-change='uploadICON'>
                      <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                 :class="disabled?'delImg':''">本地上传
                      </el-button>
                    </el-upload>
                    <div v-if="model.ICON && isOk" style="margin-bottom: 14px;">
                      <img :src="model.ICON" alt="" class="imgICON" style="margin: 10px 0"
                           @click="clickImg($event);dialogImg = true">
                      <el-button type="danger" icon="el-icon-delete" plain @click="model.ICON=''"
                                 :class="disabled?'delImg':''" v-if="!disabled">删除图片
                      </el-button>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <span class="spanStyle" v-if="!disabled">*512×512像素及以上，大小控制在5MB以下，支持 jpg/png格式</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10" style="margin-bottom: 22px;">
                <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="游戏截图(一)" class="img1" prop="img1" :class="{'marBot':disabled}">
                    <el-upload class="upload-demo"
                               action=""
                               :limit="1"
                               :on-exceed="handleExceed"
                               :auto-upload='false'
                               :on-change='uploadImg1'>
                      <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                 :class="disabled?'delImg':''">本地上传
                      </el-button>
                    </el-upload>
                    <div v-if="model.img1 && isOk" style="margin-bottom: 14px;">
                      <img :src="model.img1" alt="" class="imgStyle" style="margin: 10px 0;"
                           @click="clickImg($event);dialogImg = true">
                      <el-button type="danger" icon="el-icon-delete" plain @click="model.img1=''"
                                 :class="disabled?'delImg':''" v-if="!disabled">删除图片
                      </el-button>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="游戏截图(二)" class="img2" prop="img2" :class="{'marBot':disabled}">
                    <el-upload class="upload-demo"
                               action=""
                               :limit="1"
                               :on-exceed="handleExceed"
                               :auto-upload='false'
                               :on-change='uploadImg2'>
                      <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                 :class="disabled?'delImg':''">本地上传
                      </el-button>
                    </el-upload>
                    <div v-if="model.img2 && isOk" style="margin-bottom: 14px;">
                      <img :src="model.img2" alt="" class="imgStyle" style="margin: 10px 0;"
                           @click="clickImg($event);dialogImg = true">
                      <el-button type="danger" icon="el-icon-delete" plain @click="model.img2=''"
                                 :class="disabled?'delImg':''" v-if="!disabled">删除图片
                      </el-button>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10" style="margin-bottom: 22px;">
                <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="游戏截图(三)" class="img3" prop="img3" :class="{'marBot':disabled}">
                    <el-upload class="upload-demo"
                               action=""
                               :limit="1"
                               :on-exceed="handleExceed"
                               :auto-upload='false'
                               :on-change='uploadImg3'>
                      <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                 :class="disabled?'delImg':''">本地上传
                      </el-button>
                    </el-upload>
                    <div v-if="model.img3 && isOk" style="margin-bottom: 14px;">
                      <img :src="model.img3" alt="" class="imgStyle" style="margin: 10px 0;"
                           @click="clickImg($event);dialogImg = true">
                      <el-button type="danger" icon="el-icon-delete" plain @click="model.img3=''"
                                 :class="disabled?'delImg':''" v-if="!disabled">删除图片
                      </el-button>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="游戏截图(四)" class="img4" prop="img4" :class="{'marBot':disabled}">
                    <el-upload class="upload-demo"
                               action=""
                               :limit="1"
                               :on-exceed="handleExceed"
                               :auto-upload='false'
                               :on-change='uploadImg4'>
                      <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                 :class="disabled?'delImg':''">本地上传
                      </el-button>
                    </el-upload>
                    <div v-if="model.img4 && isOk" style="margin-bottom: 14px;">
                      <img :src="model.img4" alt="" class="imgStyle" style="margin: 10px 0;"
                           @click="clickImg($event);dialogImg = true">
                      <el-button type="danger" icon="el-icon-delete" plain @click="model.img4=''"
                                 :class="disabled?'delImg':''" v-if="!disabled">删除图片
                      </el-button>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10" style="margin-bottom: 22px;">
                <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                  <el-form-item label="游戏截图(五)" class="img5" prop="img5" :class="{'marBot':disabled}">
                    <el-upload class="upload-demo"
                               action=""
                               :limit="1"
                               :on-exceed="handleExceed"
                               :auto-upload='false'
                               :on-change='uploadImg5'>
                      <el-button type="primary" icon="fa fa-upload" plain v-if="!disabled"
                                 :class="disabled?'delImg':''">本地上传
                      </el-button>
                    </el-upload>
                    <div v-if="model.img5 && isOk" style="margin-bottom: 14px;">
                      <img :src="model.img5" alt="" class="imgStyle" style="margin: 10px 0;"
                           @click="clickImg($event);dialogImg = true">
                      <el-button type="danger" icon="el-icon-delete" plain @click="model.img5=''"
                                 :class="disabled?'delImg':''" v-if="!disabled">删除图片
                      </el-button>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                        <span class="spanStyle"
                              v-if="!disabled">*原始游戏截图或设计卖场图，共五张，480×800像素及以上大小控制在5MB以下，支持 jpg/png格式</span>
              </el-form-item>
            </el-col>
          </el-row>-->
        </el-form>
        <div class="formButton">
          <el-button type="info" icon="el-icon-error" style="width: 18%;"
                     @click="back()" v-if="!disabled && isUpdate">
            返回
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
import  copress from '../../common/copressimg';
import myGame from '../../common/store/myGame'
import gameSort from '../../common/store/gameSort'
var reg = require('../../common/commonMethods.js')
var form = new Form({store: myGame});
var model = function () {
  return {gName: '',subhead:'',typetag:[],ispaymoney:'',gamelabel:'',cooperationway:'', Type: '0', Sort:'', Introduc:'',
         ICON : '',icon_mini:'', /*img1: '', img2: '', img3: '', img4: '', img5: '',ICON: '',*/}
};

form.data = function() {
  return {
    loading:false,
    dialogImg: false,
    showImg: false,
    imgSrc: '',
    isOk:true,
    model:model(),
    origModel:model(),
    disabled:true,
    isUpdate:false,
    typetagDatas:[],
    tag:[],
    typetag:'',
    doit:0,
    rules:{
      gName: [{required: true, message: '请输入游戏名称', trigger: 'blur'}],
      subhead:[{required: true, message: '请输入一句话简介', trigger: 'blur'},
        {min: 1, max: 30, message: '长度在 30字以内', trigger: 'blur'}],
      cooperationway: [{required: true, message: '请选择合作方式', trigger: 'change'}],
      Type: [{required: true, message: '请选择游戏类型', trigger: 'change'}],
      Sort: [{required: true, message: '请选择游戏分类', trigger: 'change'}],
      typetag: [{required: true, message: '请选择游戏标签', trigger: 'blur'},],
      ispaymoney: [{required: true, message: '请选择游戏是否付费', trigger: 'blur'},],
      Introduc: [{required: true, message: '请输入游戏介绍', trigger: 'blur'},
        {min: 1, max: 500, message: '长度在 500字以内', trigger: 'blur'}],
      ICON: [{required: true, message: '请上传游戏ICON', trigger: 'blur'}],
      /*img1: [{required: true, message: '请上传游戏截图', trigger: 'blur'}],
      img2: [{required: true, message: '请上传游戏截图', trigger: 'blur'}],
      img3: [{required: true, message: '请上传游戏截图', trigger: 'blur'}],
      img4: [{required: true, message: '请上传游戏截图', trigger: 'blur'}],
      img5: [{required: true, message: '请上传游戏截图', trigger: 'blur'}],*/
    },

  }
}

form.mounted = function() {
  this.getGameInfo()
  this.getTypeTag()
}
form.watch = {
  'model.Sort':function (val) {
    if(val){
      this.getTypeTag()
    }
  },
  'typetagDatas':function (val) {
    if(val.length){
      this.settypetagArray()
    }
  },
  /*'model.typetag':function (val) {
    if(val){
      this.settypetagArray(val)
    }
  }*/
}
form.computed = {
  gameSort:gameSort.data,
}
form.methods.getGameInfo=function () {
  this.loading=true
  this.$http['post']('/auditManage/getGameById',{id:this.$route.params.id} )
    .then((response) => {
      this.model=response.data.data[0]
      this.origModel=response.data.data[0]
      this.loading=false
    })
    .catch((response) => {

    })
}
form.methods.saveIt = function () {
  var formData = new window.FormData();
  var ICON = document.querySelector('.ICON .el-upload .el-upload__input') ?
    document.querySelector('.ICON .el-upload .el-upload__input').files[0] : ''
  /* var img1 = document.querySelector('.img1 .el-upload .el-upload__input') ?
     document.querySelector('.img1 .el-upload .el-upload__input').files[0] : ''
   var img2 = document.querySelector('.img2 .el-upload .el-upload__input') ?
     document.querySelector('.img2 .el-upload .el-upload__input').files[0] : ''
   var img3 = document.querySelector('.img3 .el-upload .el-upload__input') ?
     document.querySelector('.img3 .el-upload .el-upload__input').files[0] : ''
   var img4 = document.querySelector('.img4 .el-upload .el-upload__input') ?
     document.querySelector('.img4 .el-upload .el-upload__input').files[0] : ''
   var img5 = document.querySelector('.img5 .el-upload .el-upload__input') ?
     document.querySelector('.img5 .el-upload .el-upload__input').files[0] : ''

   if (img1) {
     this.model.img1 = img1;//游戏截图
   }
   if (img2) {
     this.model.img2 = img2;//游戏截图
   }
   if (img3) {
     this.model.img3 = img3;//游戏截图
   }
   if (img4) {
     this.model.img4 = img4;//游戏截图
   }
   if (img5) {
     this.model.img5 = img5;//游戏截图
   }
   this.settypetag()

   }*/
  if (ICON) {
    this.model.ICON = ICON;//游戏ICON
  }

  for (var key in this.model) {
    formData.append(key, this.model[key])
  }

   this.settypetag()
    this.loading = true
    this.$refs['form'].validate((valid) => {
      if (valid) {
        this.loading = true
        this.$http['post']('/auditManage/updateGameInfo',formData)
          .then((response) => {
            this.loading = false
            this.$alert('提交信息成功！', '温馨提示', {
              confirmButtonText: '确定',
              type: 'success'
            }).then(() => {
              this.back()
            });
          })
          .catch((response) => {
            this.loading = false
            this.$alert('提交信息失败！', '温馨提示', {
              confirmButtonText: '确定',
              type: 'error'
            });
            this.isOk = false
          })
      } else {
        this.$alert('请完善所有必填信息！', '温馨提示', {
          confirmButtonText: '确定',
          center: true,
          type: 'warning '
        });
        this.loading = false
        this.isOk = false
      }
    })
},
form.methods.getTypeTag=function () {
  this.$http['post']('/myGame/getGameTag',{gameType:this.model.Sort} )
    .then((response) => {
      this.typetagDatas=response.data.data
    })
    .catch((response) => {

    })
}
form.methods.settypetag = function(){
  var temp = ''
  for(var va of this.tag){
    if(va){
      temp+=','+va
    }
  }
  this.model.typetag=temp.substring(1)
}
form.methods.settypetagArray = function(){
  if(this.doit==0 && !this.isUpdate){
    if(this.model.typetag){
      this.tag=this.model.typetag.toString().split(',')
      for(var i=0;i<this.tag.length;i++){
        this.tag[i]=parseInt(this.tag[i])
      }
      var temp =  ''
      for(var item of this.typetagDatas){
        for(var va of this.tag){
          if(va == item.id){
            temp+=','+item.tag
          }
        }
      }
      this.doit=1;
      this.typetag=temp.substring(1)
    }else{
      return
    }

  }
},
//点击修改
form.methods.updateInfo = function () {
  this.isUpdate = true;
  this.disabled = false;
  this.settypetagArray()
}
form.methods.resetForm=function(formName) {
  this.$refs[formName].resetFields();

}
form.methods.doAlert = function () {
  this.$alert('请先删除原文件后再上传！', '温馨提示', {
    confirmButtonText: '确定',
    center: true,
    type: 'warning'
  });
}
//图片限制1 大小类型（单位M）
form.methods.limitIMG= function (file,fileList,size) {
  var imgType=file.raw.type
  var imgSize=Math.floor(file.raw.size / 1024);
  if(imgType!=='image/jpeg' && imgType!=='image/png' && imgType!=='application/zip' && imgType!=='' && imgType !=='application/pdf'){
    this.$alert('上传文件仅支持jpg/png/zip/rar/pdf格式！', '温馨提示', {
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
//上传提醒每次只能上传一张图片
form.methods.handleExceed = function (files, fileList) {
  this.$alert('每次请选择 1 个文件进行上传！', '温馨提示', {
    confirmButtonText: '确定',
    center: true,
    type: 'warning'
  });
}
form.methods.uploadICON = function(file,fileList){
  if(this.model.ICON){
    this.doAlert()
    fileList.shift()
  }else {
    if (this.limitIMG(file, fileList, 5)) {
      this.changeUpload(file, fileList, 'ICON ');
      copress(file.raw,1,0.2,(err,result)=>{
        console.log(err);
        if (!err){
          this.model.icon_mini = result;
        }
      });
    }
  }
},
form.methods.uploadImg1 = function (file, fileList) {
  if (this.limitIMG(file, fileList, 5)) {
    this.changeUpload(file, fileList, 'img1')
  }
},
form.methods.uploadImg2 = function (file, fileList) {
  if (this.limitIMG(file, fileList, 5)) {
    this.changeUpload(file, fileList, 'img2')
  }
},
form.methods.uploadImg3 = function (file, fileList) {
  if (this.limitIMG(file, fileList, 5)) {
    this.changeUpload(file, fileList, 'img3')
  }
},
form.methods.uploadImg4 = function (file, fileList) {
  if (this.limitIMG(file, fileList, 5)) {
    this.changeUpload(file, fileList, 'img4')
  }
},
form.methods.uploadImg5 = function (file, fileList) {
  if (this.limitIMG(file, fileList, 5)) {
    this.changeUpload(file, fileList, 'img5')
  }
},
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
form.methods.clickImg = function (e) {
  //放大图片
  this.showImg = true;
  // 获取当前图片地址
    this.imgSrc = e.currentTarget.src;
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
  .spanSty{
    margin-left: 20px;
    color: #409EFF;
    font-size: 16px;
  }
</style>
