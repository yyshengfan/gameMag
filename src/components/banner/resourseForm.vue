<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/resourse' }">资源配置</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="first">
        <router-link :to="{ path: '/resourse' }">资源配置</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">{{resourseStatus}}</span>
    </div>
    <el-card class="box-card changeMar MyContainerCon">
      <div style="margin-top: 2rem" >
        <el-row>
          <el-col :sm="{span:20,offset:2}" :xs="23">
            <el-form label-width="120px" :model="model" ref="form" :rules="rules" :class="viewshow? 'lookForm':''">
              <el-form-item  label="类型:" prop="type" class="inlineBlock">
                <span v-show="viewshow">{{model.typeName}}</span>
                <el-select v-show="!viewshow" v-model="model.type" placeholder="类型" clearable style="width:100%">
                  <el-option :label="type.bannertype" :key="type.id" :value="type.id" v-for="type in resourseType"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="名称:" prop="resourseName" class="inlineBlock margin200">
                <span v-show="viewshow">{{model.resourseName}}</span>
                <el-input v-show="!viewshow" v-model.trim="model.resourseName"></el-input>
              </el-form-item>
              <el-form-item label="开始时间:" prop="stime" class="inlineBlock margin200">
                  <span v-show="viewshow">{{formatDate(model.stime)}}</span>
                  <el-date-picker
                    v-show="!viewshow"
                    style="width:100%"
                    v-model="model.stime"
                    type="datetime"
                    placeholder="选择日期">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间:" prop="etime" class="inlineBlock">
                  <span v-show="viewshow">{{formatDate(model.etime)}}</span>
                  <el-date-picker
                    v-show="!viewshow"
                    style="width:100%"
                    v-model="model.etime"
                    type="datetime"
                    placeholder="选择日期">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="排序:" prop="sort" class="inlineBlock">
                <span v-show="viewshow">{{model.sort}}</span>
                <el-input-number v-show="!viewshow" style="width:100%" v-model="model.sort" :min="1" :max="10"></el-input-number>
              </el-form-item>
              <el-form-item label="状态:" prop="status" class="inlineBlock">
                <span v-show="viewshow">{{model.status=='1'? '开启':'关闭'}}</span>
                <el-radio v-show="!viewshow" v-model.number="model.status" :label="1">开启</el-radio>
                <el-radio v-show="!viewshow" v-model.number="model.status" :label="2">关闭</el-radio>
              </el-form-item>
              <el-form-item label="网页url:" prop="wurl">
                <span v-show="viewshow">{{model.wurl}}</span>
                <el-input v-show="!viewshow" v-model.trim="model.wurl"></el-input>
              </el-form-item>
              <el-form-item label="备注:" prop="remark">
                <span style="line-height: 1.3;padding-top:8px" v-show="viewshow">{{model.remark}}</span>
                <el-input v-show="!viewshow" :maxlength="200" type="textarea" :rows="4" v-model.trim="model.remark"></el-input>
              </el-form-item>
              <el-form-item label="选择平台:" prop="useChannel">
                <span v-show="viewshow">{{initUseChannel(model.useChannel)}}</span>
                <div v-show="!viewshow">
                  <el-transfer
                    :titles="['全部渠道', '可用渠道']"
                    :button-texts="['取消', '选中']"
                    filter-placeholder="请输入城市拼音"
                    style="text-align: left;"
                    v-model="model.useChannel"
                    :props="{key: 'id',label: 'platform'}"
                    :data="allChannel">
                  </el-transfer>
                </div>
              </el-form-item>
              <el-form-item label="图片:" prop="purl">
                <span v-show="viewshow">{{model.purl && model.purl.substring(model.purl.lastIndexOf('/')+1)}}</span>
                <el-upload
                  class="upload-demo"
                  v-show="!viewshow"
                  ref="upload"
                  action="/auditManage/addBanner"
                  :on-change="change"
                  :auto-upload="false"
                  :show-file-list="false">
                  <el-button v-show="!viewshow" slot="trigger" size="small" type="primary" style="margin:0 8px 0 8px">选取文件</el-button>
                  <span>{{model.purl && model.purl.substring(model.purl.lastIndexOf('/')+1)}}</span>
                </el-upload>
              </el-form-item>
              <el-form-item label="点击次数:" prop="clicknum" class="inlineBlock">
                <span v-show="viewshow">{{model.clicknum}}</span>
                <el-input v-show="!viewshow" style="width:100%" v-model="model.clicknum" :min="1" :max="10"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="formButton">
          <el-button type="info" style="width: 18%" icon="el-icon-back" @click="back" v-if="viewshow">返回</el-button>
          <el-button type="primary" @click="xiugai" icon="el-icon-edit" style="width: 18%;margin: 0 16px;" v-if="viewshow">修改</el-button>
          <el-button type="info" @click="xiugai" icon="el-icon-error" style="width: 18%;margin: 0 16px;" v-if="updateshow">取消</el-button>
          <el-button type="primary" @click="create" icon="fa fa-save" style="width: 18%;" v-if="updateshow">保存</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Form from '../../common/form'
import resourse from '../../common/store/resourse'
import resourseType from '../../common/store/resourseType'
import allChannel from '../../common/store/allChannel'
import converter from '../../common/converter'

var reg = require('../../common/commonMethods.js')
var form = new Form({store: resourse});
var model = function () {
  return {
    type:'',
    resourseName : '',
    status:1,
    purl : '',
    wurl : '',
    sort: '1',
    stime : new Date(),
    etime : new Date(),
    useChannel : [],
    remark:'',
    clicknum:1,
    typeName:'',
  }
};

form.data = function() {
  return {
    viewshow:false,
    updateshow:false,
    loading:false,
    resourseStatus:'新增角色',
    model:model(),
    origModel:model(),
    action:'',
    rules:{
      type: [
        {required: true, message: '请选择类型', trigger: 'change'},
      ],
      resourseName: [
        {required: true, message: '请输入名称', trigger: 'blur'},
      ],
      stime: [
        {required: true, message: '请选择开始时间', trigger: 'blur'},
      ],
      etime: [
          {required: true, validator: this.checkEtime, trigger: 'blur'},
      ],
      sort: [
        {required: true, message: '排序不能为空', trigger: 'blur'},
      ],
      status: [
        {required: true, message: '请选择状态', trigger: 'blur'},
      ],
      // wurl: [
      //   {required: true, message: '请输入网页url', trigger: 'blur'},
      // ],
      remark: [
        {required: true, message: '请输入备注', trigger: 'blur'},
      ],
      useChannel: [
        {required: true, message: '请选择可用渠道', trigger: 'blur'},
      ],
      // purl: [
      //   {required: true, message: '请上传图片', trigger: 'change'},
      // ],
      clicknum: [
        {required: true, type: 'number',message: '请输入点击次数', trigger: 'change'},
      ],
      
    },
    modelFormat : {
      useChannel:converter.stringToIntArray
    },

  }
}

form.mounted = function(){
  if(this.$route.params.id!=='new'){
    this.model.id = this.$route.params.id;
    this.action = 'update'
    this.resourseStatus = '查看'
    this.viewshow = true
    this.get()
  }else{
    this.model.type  = this.$store.state.bannerType
    this.action = 'add'
    this.resourseStatus = '新增'
    this.updateshow = true
  }
}

form.watch = {
  'model.stime':function(val){
    if(typeof val == "string") this.model.stime = new Date(val)
  },
  'model.etime':function(val){
    if(typeof val == "string") this.model.etime = new Date(val)
  },
  model:{
    handler:function(){
      for(let item of this.resourseType){
        if(this.model.type == item.id){
          this.model.typeName = item.bannertype
          break;
        }
      }
    },
    deep:true
  }
}

form.computed = {
  resourseType:resourseType.data,
  allChannel:allChannel.data,
}

//新增方法提交
form.methods.create = function(){
  var fileValue = document.querySelector('.el-upload .el-upload__input')
  var fd = new window.FormData()
  fd.append('fileType', 'category')
    if(fileValue.files[0] && fileValue.files[0].size/1024/1024>1){
      this.$confirm('图片不能大于1M', '提示', {
        type: 'warning',
      })
      return
    }
  fd.append('file', fileValue.files[0])
  for(var key in this.model){
    fd.append(key, this.model[key])
  }
  this.save(fd)
    //图片压缩
    // converter.compress(fileValue.files[0],1,function(msg,file){
    //   fd.append('file', file)
    //   for(var key in this.model){
    //     fd.append(key, this.model[key])
    //   }
    //   this.save(fd)
    // }.bind(this))
}

//修改
form.methods.xiugai = function(){
  if(this.action=='add'){
    this.back()
    return
  }else{
    this.$refs['form'].resetFields();
    this.reset()
  }
  setTimeout(()=>{
    this.viewshow = !this.viewshow
    this.updateshow = !this.viewshow
  },500)
}

//点击上传
form.methods.change = function(file){
  this.model.purl =  file.name
}

//格式化渠道
form.methods.initUseChannel = function(val){
  var useChannel =  ''
  for(var channel of this.allChannel){
    for(var va of val){
      if(va == channel.id){
        useChannel+='，'+channel.platform
      }
    }
  }
  return useChannel.substring(1)
}

//检查时间的方法
form.methods.checkEtime = function(rules, etime ,callback){
  if (new Date(etime).getTime()-new Date(this.model.stime).getTime()<0) {
    return callback(new Error('结束时间必须大于开始时间'));
  }else{
    callback()
  }
}
export default form
</script>

<style scoped>
  .lookForm .el-form-item {
    margin-bottom: 0px;
  }
  .inlineBlock{
    display: inline-block;
    width:49%;
  }
  .margin200{
    /* margin-left: -9%; */
  }
  .el-form-item__content span{
    flex-wrap: wrap;
    display: block;
    word-break:break-all;
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

  .el-upload-list__item{
    display: inline-block
  }

</style>
