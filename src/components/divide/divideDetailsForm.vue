<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/divideList' }">分成管理</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="first">
        <router-link :to="{ path:'/divideDetails' }">分成详单</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">{{rolestatus}}</span>
    </div>
    <el-card class="box-card changeMar">
      <div class="MyContainerCon">
        <el-row>
          <div style="margin-top: 50px"></div>
          <el-col :sm="{span:18,offset:3}" :xs="{span:18,offset:4}">
            <el-form v-loading="loading" label-width="200px" :model="model" ref="form" :rules="rules">
              <el-form-item  label="游戏名称:" prop="gameId">
                <el-select clearable filterable v-model.number="model.gameId" placeholder="请输入游戏名称关键字检索" style="width: 100%"
                  class="divideInput" :filter-method="searchGameData">
                  <el-option v-for="item in gameData"
                             :label="item.gameName"
                             :key="item.gameId"
                             :value="item.gameId"
                             >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item  label="渠道名称:" prop="channel_id">
                <el-select clearable filterable v-model.number="model.channel_id" @change="this.getRate"
                  placeholder="请输入渠道名称关键字检索" style="width: 100%"
                  class="divideInput" :filter-method="searchChannelData">
                  <el-option v-for="item in channelData"
                             :label="item.channel_name"
                             :key="item.channel_id"
                             :value="item.channel_id">
                  </el-option>
                </el-select>
              </el-form-item>

<!-- ------------------------------游戏分成-------------------------------------------------------- -->
              <el-form-item  label="游戏分成:" prop="correspondent1">
                <!-- <el-input class="divideInput" v-model="model.gameRate" placeholder="游戏分成" readonly></el-input> -->
                <el-select clearable v-model.number="model.gameRate" style="width: 20%">
                  <el-option v-for="item in rate"
                             :label="item"
                             :key="item"
                             :value="item">
                  </el-option>
                </el-select>
                <!-- <el-input class="divideInput" style="width: 66%" v-model.trim="model.correspondent1" placeholder="请输入分账ID" :maxlength="15"></el-input> -->
              </el-form-item>

              <el-form-item  label="" prop="company_id1">
                <el-select default-first-optionclearable clearable filterable v-model="model.company_id1"
                  placeholder="请输入公司名称关键字检索"
                  class="divideInput" style="width: 100%;" @change="getCompanyInfo(model.company_id1,1)" :filter-method="searchCompany1Data">
                  <el-option v-for="item in companyData1"
                             :label="item.company_name"
                             :key="item.customer_id"
                             :value="item.customer_id">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item prop="bank_name1">
                <el-input class="divideInput" v-model="model.bank_name1" placeholder="结算银行名称" readonly></el-input>
                <el-input class="divideInput" v-model="model.bank_no1" placeholder="结算收款银行账号" readonly></el-input>
                <el-input class="divideInput" style="width: 32%" v-model="model.correspondent1" placeholder="联行行号" readonly></el-input>
              </el-form-item>

<!-- ---------------------------------渠道分成------------------------------------------------------- -->
              <el-form-item  label="渠道分成:" prop="correspondent2">
                <!-- <el-input class="divideInput" v-model="model.channelRate" readonly placeholder="渠道分成"></el-input> -->
                <el-select clearable v-model.number="model.channelRate" style="width: 20%">
                  <el-option v-for="item in rate"
                             :label="item"
                             :key="item"
                             :value="item">
                  </el-option>
                </el-select>
                <!-- <el-input class="divideInput" style="width: 66%" v-model.trim="model.correspondent2" placeholder="请输入分账ID" :maxlength="15"></el-input> -->
              </el-form-item>

              <el-form-item  label="" prop="company_id2">
                <el-select default-first-optionclearable clearable filterable v-model="model.company_id2"
                  placeholder="请输入公司名称关键字检索"
                  class="divideInput" style="width: 100%;" @change="getCompanyInfo(model.company_id2,2)" :filter-method="searchCompany2Data">
                  <el-option v-for="item in companyData2"
                             :label="item.company_name"
                             :key="item.customer_id"
                             :value="item.customer_id">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item prop="bank_name2">
                <el-input class="divideInput" v-model="model.bank_name2" placeholder="结算银行名称" readonly></el-input>
                <el-input class="divideInput" v-model="model.bank_no2" placeholder="结算收款银行账号" readonly></el-input>
                <el-input class="divideInput" style="width: 32%" v-model="model.correspondent2" placeholder="联行行号" readonly></el-input>
              </el-form-item>

<!-- -----------------------------------平台分成------------------------------------------------------ -->
              <el-form-item  label="平台分成:" prop="correspondent3">
                <!-- <el-input class="divideInput" v-model="model.planRate" readonly placeholder="平台分成"></el-input> -->
                <el-select clearable v-model.number="model.planRate" style="width: 20%">
                  <el-option v-for="item in rate"
                             :label="item"
                             :key="item"
                             :value="item">
                  </el-option>
                </el-select>
                <!-- <el-input class="divideInput" style="width: 66%" v-model.trim="model.correspondent3" placeholder="请输入分账ID" :maxlength="15"></el-input> -->
              </el-form-item>

              <el-form-item  label="" prop="company_id3">
                <el-input class="divideInput" style="width: 100%" v-model.trim="model.company_name3" placeholder="公司名称" :maxlength="15" readonly></el-input>
                <!-- <el-select default-first-optionclearable clearable filterable v-model="model.company_id3"
                  placeholder="请输入公司名称关键字检索"
                  class="divideInput" style="width: 100%;" @change="getCompanyInfo(model.company_id3,3)" :filter-method="searchCompany3Data">
                  <el-option v-for="item in companyData3"
                             :label="item.company_name"
                             :key="item.customer_id"
                             :value="item.customer_id">
                  </el-option>
                </el-select> -->
              </el-form-item>

              <el-form-item prop="bank_name3">
                <el-input class="divideInput" v-model="model.bank_name3" placeholder="结算银行名称" readonly></el-input>
                <el-input class="divideInput" v-model="model.bank_no3" placeholder="结算收款银行账号" readonly></el-input>
                <el-input class="divideInput" style="width: 32%" v-model="model.correspondent3" placeholder="联行行号" readonly></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="formButton">
          <el-button type="info" style="width: 18%" icon="el-icon-error" @click="back">取消</el-button>
          <el-button type="primary" style="width:18%;margin-left: 16px;" icon="el-icon-success" @click="save()">保存</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Form from '../../common/form'
import divideDetails from '../../common/store/divideDetails'
import trenchAll from '../../common/store/trenchAll'

var reg = require('../../common/commonMethods.js')
var form = new Form({store: divideDetails});

var model = function () {
  return {
    channel_id:'',
    channel_name:'',
    gameId:'',
    game_name:'',
    Rate:'',
    gameRate:'',
    channelRate:'',
    planRate:'',

    correspondent1:'',
    company_name1:'',
    bank_name1:'',
    bank_no1:'',

    correspondent2:'',
    company_name2:'',
    bank_name2:'',
    bank_no2:'',

    correspondent3:'',
    company_name3:'',
    bank_name3:'',
    bank_no3:'',

    company_id1:'',
    company_id2:'',
    company_id3:'',
  }
};


form.data = function() {
  return {
    rolestatus:'新增详单',
    model:model(),
    origModel:model(),
    action:'',
    loading:false,
    searchOnce:true,
    selectLoading:false,
    gameData:[],
    channelData:[],
    companyData1:[],
    companyData2:[],
    companyData3:[],
    rate:[0,1,2,3,4,5,6,7,8,9],
    rules:{
      gameId: [
        {required: true, message: '请选择游戏', trigger: 'change'},
      ] ,
      // channel_id: [
      //   {required: true, message: '请选择渠道', trigger: 'change'},
      // ] ,
      // correspondent1: [
      //   {required: true, validator: reg.isNumber, trigger: 'blur'},
      // ] ,
      company_id1: [
        {required: true, message: '请选择公司', trigger: 'change'},
      ] ,
      // correspondent2: [
      //   {required: true, validator: reg.isNumber, trigger: 'blur'},
      // ] ,
      // company_id2: [
      //   {required: true, message: '请选择公司', trigger: 'change'},
      // ] ,
      // correspondent3: [
      //   {required: true, validator: reg.isNumber, trigger: 'blur'},
      // ] ,
      // company_id3: [
      //   {required: true, message: '请选择公司', trigger: 'change'},
      // ] ,
      bank_name1: [
        {required: true, message: '结算银行信息不能为空', trigger: 'blur'},
      ] ,
      // bank_name2: [
      //   {required: true, message: '结算银行信息不能为空', trigger: 'blur'},
      // ] ,
      bank_name3: [
        {required: true, message: '结算银行信息不能为空', trigger: 'blur'},
      ] ,
    }
  }
}

form.computed = {
  trenchAll:trenchAll.data
}

form.watch = {
  model:{
    handler:function(model){
      if(this.searchOnce){
        model.game_name && this.searchData({'game_name':model.game_name},'gameData')
        model.channel_name && this.searchData({'channel_name':model.channel_name},'channelData')
        model.company_name1 && this.searchData({'company_name1':model.company_name1},'companyData1')
        model.company_name2 && this.searchData({'company_name2':model.company_name2},'companyData2')
        model.company_name3 && this.searchData({'company_name3':model.company_name3},'companyData3')
      }
      this.searchOnce = false
    },
    deep:true
  },
  'model.gameId':function(val){
    if(!val){
      this.gameData = []
    }
  },
  'model.channel_id':function(val){
    if(!val){
      this.channelData = []
    }
  },
  'model.company_id1':function(val){
    if(!val){
      this.companyData1 = []
      this.model.bank_name1 = ''
      this.model.bank_no1 = ''
      this.model.correspondent1 = ''
    }
  },
  'model.company_id2':function(val){
    if(!val){
      this.companyData2 = []
      this.model.bank_name2 = ''
      this.model.bank_no2 = ''
      this.model.correspondent2 = ''
    }
  },
  'model.company_id3':function(val){
    val && this.getCompanyInfo(val,3)
  }
}

form.mounted = function(){
  if(this.$route.params.id!=='new'){
    this.action = 'update'
    this.rolestatus = '修改详单'
    var list = this.$route.params.id.split(',')
    var params = {
      gameId:list[1],
      channel_id:list[0],
    }
    this.get(params)
  }else{
    this.action = 'add'
    this.rolestatus = '新增详单'
  }
  this.getAlldata()
}

form.methods.searchGameData = function(val){
  val && this.searchData({'game_name':val},'gameData')
}

form.methods.searchChannelData = function(val){
  val && this.searchData({'channel_name':val},'channelData')
}

form.methods.searchCompany1Data = function(val){
  val && this.searchData({'company_name1':val},'companyData1')
}

form.methods.searchCompany2Data = function(val){
  val && this.searchData({'company_name2':val},'companyData2')
}

form.methods.searchCompany3Data = function(val){
  val && this.searchData({'company_name3':val},'companyData3')
}

form.methods.searchData = function(params,dataName){
  setTimeout(function(){
    this.$http.post('/auditManage/searchData',params)
      .then((response)=>{
        if(dataName) this[dataName] = response.data.data
      })
      .catch(()=>{
      })
  }.bind(this),1000)
}

form.methods.getRate = function(val){
  this.$http.post('/auditManage/getRateBychannelId',{'channel_id':val})
  .then((response)=>{
    var rateArr = response.data.data.rateArr
    var ratename = response.data.data.ratename
    var obj = {}
    for(var item in rateArr){
      obj[ratename[item]] = rateArr[item]
    }
    this.model.channelRate = obj['渠道'] || 0
    this.model.planRate = obj['平台'] || 0
    this.model.gameRate = obj['游戏'] || 0
  })
  .catch(()=>{
  })
}

form.methods.getCompanyInfo = function(id,type){
  var bankName = 'bank_name'+type;
  var bankNo = 'bank_no'+type;
  var correspondent = 'correspondent'+type;
  this.$http.post('/auditManage/getbankInfoBycustomerId',{'customerId':id})
    .then((response)=>{
      this.model[bankName] = response.data.data.bank_name
      this.model[bankNo] = response.data.data.bank_no
      this.model[correspondent] = response.data.data.correspondent
    })
    .catch(()=>{
    })
}

form.methods.getAlldata = function(){
  this.$http.post('/auditManage/getsearchData')
    .then((response)=>{
      this['gameData'] = response.data.data[0]
      this['channelData'] = response.data.data[1]
      this['companyData1'] = response.data.data[2]
      this['companyData2'] = response.data.data[3]
      this.model.company_id3 = response.data.data[4][0].customer_id
      this.model.company_name3 = response.data.data[4][0].company_name
    })
    .catch(()=>{
    })
}

export default form

</script>

<style scoped>
.divideInput{
  width: 33%;
  display: inline-block;
}
</style>
