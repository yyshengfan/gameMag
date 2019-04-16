
<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/channelManage' }">渠道管理</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="first"> 渠道详情</span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">当前渠道：{{$route.params.name || model.channel_name}}</span>
    </div>
    <!--用户基本信息表单-->
    <el-card class="box-card changeMar MyContainerCon">
      <div v-loading="loading">
        <div style="margin:6px 0 "></div>
        <div class="headDiv">
          <el-row :gutter="10" type="flex" class="row-bg" justify="center">
            <el-col :span="24">
              <div style="color: #409EFF;text-align: center;">
                <span style="font: 18px large;">渠道状态：</span>
                <p :class="setTitlesCls" style="display: inline-block;">
                  <i :class="setTitlesIcon"></i>{{setTitles}}
                </p>
                <el-button class="status" v-if="buttonList.audit && status=='0'" size="mini" type="warning" @click="audit()">
                  <i class="el-icon-edit-outline"></i>审核
                </el-button>
                <el-button class="status" v-if="buttonList.offline && status=='2' &&  offstatus=='1'" size="mini" type="warning"
                           @click="offLine()">
                  <i class="fa fa-times"></i>下线
                </el-button>
                <el-button class="status" v-if="buttonList.online && offstatus=='0'" size="mini" type="success" @click="goLine()">
                  <i class="el-icon-upload"></i>上线
                </el-button>
                <el-button class="status" v-if="buttonList.auditOffline && status=='3' && offstatus=='1'" size="mini"
                           type="info" @click="auditOffLine()">
                  <i class="el-icon-edit-outline"></i>下线审核
                </el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="margin:6px 0 "></div>
        <div v-loading="loading">
          <el-collapse  v-model="activeNames" style="border-top:none;">
            <el-collapse-item name="1">
              <template slot="title">
                <span><i class="el-icon-edit-outline"></i>渠道详情</span>
              </template>
              <div>
                <el-row :gutter="10">
                  <el-col :xs="23" :sm="{span: 18, offset:3}" type="flex" class="row-bg" justify="center">
                    <el-form :model="model"  ref="form"  label-width="120px" >
                      <el-row :gutter="10">
                        <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center" >
                          <el-form-item label="渠道名称" prop="channel_name" :class="{'marBot':true}">
                            <el-input v-model="model.channel_name" placeholder="请输入渠道名称" readonly class="setBoder"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                          <el-form-item label="联系人" prop="linkman" :class="{'marBot':true}">
                            <el-input v-model="model.linkman" placeholder="请输入联系人姓名" readonly class="setBoder"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                          <el-form-item label="手机号码" prop="phone" :class="{'marBot':true}">
                            <el-input v-model="model.phone" placeholder="请输入手机号码" readonly class="setBoder"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                          <el-form-item label="邮箱" prop="Email" :class="{'marBot':true}">
                            <el-input v-model="model.Email" placeholder="请输入邮箱" readonly class="setBoder"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                          <el-form-item label="渠道类型" prop="type" :class="{'marBot':true}">
                            <el-input v-model="model.type=='0'?'应用商店':model.type=='1'?'门户网站':'广告联盟'" readonly class="setBoder"></el-input>
                            <!-- <el-select  v-model="getInfo.type" placeholder="请选择渠道类型" style="width: 100%" clearable >
                               <el-option label="应用商店" value="0"></el-option>
                               <el-option label="门户网站" value="1"></el-option>
                               <el-option label="广告联盟" value="2"></el-option>
                             </el-select>-->
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                          <el-form-item label="渠道状态" prop="status1" :class="{'marBot':true}">
                            <p readonly class="status" style="margin-left: 14px;margin-top: 4px;" :class="model.status1=='0'?'no-pass':model.status1=='2'?'finish-pass':'no-pass'">
                              <span v-if="model.offstatus" v-text="model.status1=='0'?'待审核':model.status1=='1'?'审核不通过':model.status1=='2'?'审核通过':'下线待审核'"></span>
                              <span v-if="!model.offstatus">已下线</span>
                            </p>
                            <!--<el-select  v-model="getInfo.status" style="width: 100%" clearable >
                              <el-option label="未审核" value="0"></el-option>
                              <el-option label="审核通过" value="1"></el-option>
                              <el-option label="审核失败" value="2"></el-option>
                            </el-select>-->
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                        <el-form-item label="渠道分成比例" prop="cooperation_type" :class="{'marBot':true}">
                          <el-input v-model="model.rate + '(' + model.typename + ')'" readonly class="setBoder"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                          <el-form-item label="提交时间" :class="{'marBot':true}">
                              <span v-text="formatOtherDate(model.dealtime)" class="spanColor"></span>
                            </el-form-item>
                      </el-col>

                      <el-form-item label="渠道资源介绍" prop="introduce" :class="{'marBot':true}">
                        <el-input v-model="model.introduce" type="textarea" :rows="8" placeholder="请输入内容500字以内" readonly class="setBoder"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
            <el-collapse-item name="2">
              <template slot="title">
                <span><i class="el-icon-edit"></i>操作记录</span>
              </template>
              <div>
                <channelOpration v-bind:channel_id="model.channel_id"></channelOpration>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <el-dialog  class="MyModelremove"  :visible.sync="dialogAudit" :width="$store.state.isMobile?'90%':'70%'" @close="closeIt()" center>
          <channelAudit v-bind:dialogAudit = "dialogAudit"
                        v-bind:channelId="channelId"
                        v-on:success="success()">
          </channelAudit>
        </el-dialog>
        <el-dialog  class="MyModelremove"  :visible.sync="dialogOffLine" :width="$store.state.isMobile?'90%':'70%'" @close="closeIt()" center>
          <channelOffline v-bind:dialogOffLine = "dialogOffLine"
                          v-bind:channelId="channelId"
                          v-on:successOff="successOff()">
          </channelOffline>
        </el-dialog>
        <el-dialog  class="MyModelremove"  :visible.sync="dialogAuditOffLine" :width="$store.state.isMobile?'90%':'70%'" @close="closeIt()" center>
          <channelAuditOffline v-bind:dialogAuditOffLine = "dialogAuditOffLine"
                               v-bind:channelId="channelId"
                               v-on:successOff2="successOff2()">
          </channelAuditOffline>
        </el-dialog>
      </div>
    </el-card>
  </div>
  <!--<el-card class="box-card" >
    <div slot="header"  class="clearfix">
      &lt;!&ndash;<p style="font-size: 16px;font-weight: 600;color: #2B6A65">渠道管理-渠道详情</p>&ndash;&gt;
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <el-button type="text" v-on:click="backIt()" class="bread">
            渠道管理
          </el-button>
        </el-breadcrumb-item>
        <el-breadcrumb-item>渠道详情</el-breadcrumb-item>
        <el-breadcrumb-item>当前渠道：{{$route.params.name || model.channel_name}}</el-breadcrumb-item>
      </el-breadcrumb>
      &lt;!&ndash;<div style="margin:10px 0 "></div>
      <el-button icon="el-icon-back" v-on:click="$parent.infoManage=true;back();" ></el-button>&ndash;&gt;
    </div>
    <div>
      <el-row :gutter="10" type="flex" class="row-bg" justify="center">
        <el-col :span="5">
          <span style="color: #409EFF;font: 18px large;">渠道状态——{{setTitles}}</span>
        </el-col>
        <el-col :span="1">
          <el-button v-if="buttonList.audit && status=='0'" size="mini" type="success" @click="audit()">审核</el-button>
          <el-button v-if="buttonList.offline && status=='2' &&  offstatus=='1'" size="mini" type="success" @click="offLine()">下线</el-button>
          <el-button v-if="buttonList.online && offstatus=='0'" size="mini" type="success" @click="goLine()">上线</el-button>
          <el-button v-if="buttonList.auditOffline && status=='3' && offstatus=='1'" size="mini" type="success" @click="auditOffLine()">下线审核</el-button>
        </el-col>
      </el-row>
    </div>
    <div style="margin:6px 0 "></div>
    <div v-loading="loading">
      <el-collapse  v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span style="color: #409EFF;font: 18px large;"><i class="el-icon-edit-outline"></i>渠道详情</span>
          </template>
          <div>
            <el-row :gutter="10">
              <el-col :xs="23" :sm="{span: 18, offset:3}" type="flex" class="row-bg" justify="center">
                <el-form :model="model"  ref="form"  label-width="120px" >
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="渠道名称" prop="channel_name">
                        <el-input v-model="model.channel_name" placeholder="请输入渠道名称" readonly class="setBoder"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="联系人" prop="linkman">
                        <el-input v-model="model.linkman" placeholder="请输入联系人姓名" readonly class="setBoder"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="model.phone" placeholder="请输入手机号码" readonly class="setBoder"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="邮箱" prop="Email">
                        <el-input v-model="model.Email" placeholder="请输入邮箱" readonly class="setBoder"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="渠道类型" prop="type">
                        <el-input v-model="model.type=='0'?'应用商店':model.type=='1'?'门户网站':'广告联盟'" readonly class="setBoder"></el-input>
                       &lt;!&ndash; <el-select  v-model="getInfo.type" placeholder="请选择渠道类型" style="width: 100%" clearable >
                          <el-option label="应用商店" value="0"></el-option>
                          <el-option label="门户网站" value="1"></el-option>
                          <el-option label="广告联盟" value="2"></el-option>
                        </el-select>&ndash;&gt;
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="渠道状态" prop="status">
                        <el-input v-model="model.status=='0'?'未审核':model.status=='1'?'审核通过':'审核失败'" readonly class="setBoder"></el-input>
                        &lt;!&ndash;<el-select  v-model="getInfo.status" style="width: 100%" clearable >

                          <el-option label="未审核" value="0"></el-option>
                          <el-option label="审核通过" value="1"></el-option>
                          <el-option label="审核失败" value="2"></el-option>
                        </el-select>&ndash;&gt;
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                    <el-form-item label="渠道分成比例" prop="cooperation_type">
                      <el-input v-model="model.rate + '(' + model.typename + ')'" readonly class="setBoder"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="{span: 12, offset: 0}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="提交时间">
                        <div class="block">
                          <el-date-picker
                            v-model="model.createtime"
                            type="datetime"
                            style="width: 100%"
                            class="setBoder"
                            placeholder="选择日期时间">
                          </el-date-picker>
                        </div>
                      </el-form-item>
                  </el-col>

                  <el-form-item label="渠道资源介绍" prop="introduce">
                    <el-input v-model="model.introduce" type="textarea" :rows="8" placeholder="请输入内容500字以内" readonly class="setBoder"></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <span style="color: #409EFF;font: 18px large;"><i class="el-icon-edit-outline"></i>操作记录</span>
          </template>
          <div>
            <channelOpration v-bind:channel_id="model.channel_id"></channelOpration>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-dialog  :visible.sync="dialogAudit" :width="$store.state.isMobile?'90%':'70%'" @close="closeIt()" center>
      <channelAudit v-bind:dialogAudit = "dialogAudit"
                    v-bind:channelId="channelId"
                    v-on:success="success()">
      </channelAudit>
    </el-dialog>
    <el-dialog  :visible.sync="dialogOffLine" :width="$store.state.isMobile?'90%':'70%'" @close="closeIt()" center>
      <channelOffline v-bind:dialogOffLine = "dialogOffLine"
                      v-bind:channelId="channelId"
                      v-on:successOff="successOff()">
      </channelOffline>
    </el-dialog>
    <el-dialog  :visible.sync="dialogAuditOffLine" :width="$store.state.isMobile?'90%':'70%'" @close="closeIt()" center>
      <channelAuditOffline v-bind:dialogAuditOffLine = "dialogAuditOffLine"
                           v-bind:channelId="channelId"
                           v-on:successOff2="successOff2()">
      </channelAuditOffline>
    </el-dialog>
  </el-card>-->

</template>

<script>
  import axios from 'axios'
  import Form from '../../common/form'
  import myThirdParty from '../../common/store/myThirdParty'
  import channelOpration from './channelOpration.vue'
  import channelAudit from './channelAudit.vue'
  import channelOffline from './channelOffline.vue'
  import channelAuditOffline from './channelAuditOffline'
  var form = new Form({store: myThirdParty});
  form.components = {
    'channelOpration': channelOpration,
    'channelAudit':channelAudit,
    'channelOffline':channelOffline,
    'channelAuditOffline':channelAuditOffline
  };
  var model = function(){
    return {
      channel_name:'',linkman:'',phone:'',Email:'',type:'0',introduce:'',cooperation_type:''
    }
  }
  form.data=function () {
    return {
      loading: false,
      model:model(),
      dialogVisible:false,
      activeNames:['1','2'],
      channel_id:'',
      mydata:[],

      dialogAudit:false,
      dialogOffLine:false,
      dialogAuditOffLine:false,
      channelId:"",

      setTitles:'',
      setTitlesCls: '',
      setTitlesIcon: '',
      status:'',
      offstatus:'',
      buttonList:{
        search:false,
        audit:false,
        view:false,
        offline:false,
        export:false,
        online:false,
        auditOffline:false
      },
    }
  };
  form.watch= {
    dialogOffLine(val){
      if(val){
        $('.MyContainerCon').css('position','static');
      }else{
        $('.MyContainerCon').css('position','absolute');
      }
    },
    dialogAudit(val){
      if(val){
        $('.MyContainerCon').css('position','static');
      }else{
        $('.MyContainerCon').css('position','absolute');
      }
    },
    dialogAuditOffLine(val){
    if(val){
      $('.MyContainerCon').css('position','static');
    }else{
      $('.MyContainerCon').css('position','absolute');
    }
  }
  },
  form.mounted=function () {
    this.getInfo()
    this.initButton(4,12)
    this.setTitle()
  };
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
  //获取状态
  form.methods.getStatus=function () {
    this.loading=true;
    var channelId=this.$route.params.id;
    var type='3';
    var typeObj={id:channelId,type:type}
    this.$http['post']('/joinup/getStatusByType',{typeObj:typeObj})
      .then((response) => {
        this.status=response.data.data[0].status
        this.offstatus=response.data.data[0].offstatus
        this.settitle()
        this.loading=false

      })
      .catch((response) => {
        this.loading=false
      })
  }
  //设置状态
  form.methods.setTitle=function () {
    if(this.$route.params.status=="0" || this.$route.params.status){
      this.status=this.$route.params.status
      this.offstatus=this.$route.params.offstatus
      this.settitle()
    }else{
      this.getStatus()
    }

  }
  form.methods.settitle=function () {
    if(this.status=="0"){
      this.setTitles='待审核'
      this.setTitlesCls ='await'
      this.setTitlesIcon = 'el-icon-edit-outline'
    }
    if(this.status=="1"){
      this.setTitles='审核不通过'
      this.setTitlesCls ='no-pass'
      this.setTitlesIcon = 'fa fa-times'
    }
    if(this.status=="2"){
      this.setTitles='审核通过'
      this.setTitlesCls ='finish-pass'
      this.setTitlesIcon = 'fa fa-check'
    }
    if(this.status=="3"){
      this.setTitles='下线待审核'
      this.setTitlesCls ='no-pass'
      this.setTitlesIcon = 'el-icon-edit-outline'
    }
    if(this.offstatus=="0"){
      this.setTitles='已下线'
      this.setTitlesCls ='no-pass'
      this.setTitlesIcon = 'fa fa-times'
    }
  }

  form.methods.backIt=function () {
    this.$router.push({name:'channelManage'});
  }
  //点击审核
  form.methods.audit=function (){
    this.channelId=this.model.channel_id
    this.dialogAudit=true
  }
  //点击下线
  form.methods.offLine=function (index, row){
    this.channelId=this.model.channel_id
    this.dialogOffLine=true
  }
  //点击上线
  form.methods.goLine=function (index, row) {
    var params={channel_id:this.model.channel_id,
      offstatus:1,status1:2}
    this.$confirm('此操作将上线该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.loading = true
      this.$http['post']('/auditManage/channelInfoAudit', params)
        .then((response) => {
          this.$alert('上线成功！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'success'
          });
          this.loading = false
          this.backIt()
        })
        .catch((response) => {
          this.$alert('上线失败！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'error'
          });
        })
    })
  }
  //点击下线审核
  form.methods.auditOffLine=function (index, row){
    this.channelId=this.model.channel_id
    this.dialogAuditOffLine=true
  }
  form.methods.success=function (){
    this.dialogAudit = false;
  }
  form.methods.successOff=function (){
    this.dialogOffLine = false;
  }
  form.methods.successOff2=function (){
    this.dialogAuditOffLine = false;
  }
  form.methods.closeIt=function () {
    this.backIt()
  };
  export default form
</script>

<style>
  .myLine .el-input__icon{
    line-height: 1;
  }
  .bread {
    color: #303133;
    font-weight: 700;
    background: 0 0;
    padding: 0;
  }
  .setBoder .el-input__inner{
    background-color:#ffffff;
    border:none;
    color: #909399;
    cursor: not-allowed;
  }
  .setBoder .el-textarea__inner {
    background-color: #ffffff;
    border:none;
    color: #909399;
    cursor: not-allowed;
  }
  .spanColor{
    color: #909399;
    padding: 0 15px;
  }
</style>
