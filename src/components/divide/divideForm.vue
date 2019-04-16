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
        <router-link :to="{ path:'/divideList' }">分成列表</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">{{rolestatus}}</span>
    </div>
    <el-card class="box-card changeMar MyContainerCon">
      <div style="margin-top: 2rem">
        <el-row>
          <div style="margin-top: 50px"></div>
          <el-col :sm="{span:18,offset:3}">
            <el-form label-width="200px" :model="model" ref="form" :rules="rules" v-loading="loading">
              <el-form-item  label="渠道公司:" prop="customer_id">
                <el-select clearable filterable v-model.number="model.customer_id" style="width: 70%">
                  <el-option v-for="item in trenchAll"
                           :label="item.company_name"
                           :key="item.customer_id"
                           :value="item.customer_id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item  label="游戏分成:" prop="gameRate">
                <el-select clearable v-model.number="model.gameRate" style="width: 70%">
                  <el-option v-for="item in gameRate"
                             :label="item"
                             :key="item"
                             :value="item">
                  </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item  label="渠道分成:" prop="channelRate">
                <el-select clearable v-model.number="model.channelRate" style="width: 70%">
                  <el-option v-for="item in channelRate"
                             :label="item"
                             :key="item"
                             :value="item">
                  </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item  label="平台分成:" prop="planRate">
                <el-select clearable v-model.number="model.planRate" style="width: 70%">
                  <el-option v-for="item in planRate"
                             :label="item"
                             :key="item"
                             :value="item">
                  </el-option>
                  </el-select>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div class="formButton">
        <el-button type="info" style="width: 18%" icon="el-icon-error" @click="back">取消</el-button>
        <el-button type="primary" style="width:18%;margin-left: 16px;" icon="el-icon-success" @click="savepre">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import Form from '../../common/form'
import divideList from '../../common/store/divideList'
import trenchAll from '../../common/store/trenchAll'

var reg = require('../../common/commonMethods.js')
var form = new Form({store: divideList});

var model = function () {
  return {
    uuid:'',
    loading:false,
    customer_id:'',
    rate:'0:0:0',
    gameRate:'',
    channelRate:'',
    planRate:'',
    typename:'',
    status:1
  }
};


form.data = function() {
  return {
    loading:false,
    rolestatus:'新增分成',
    model:model(),
    origModel:model(),
    action:'',
    gameRate:[0,1,2,3,4,5,6,7,8,9],
    channelRate:[0,1,2,3,4,5,6,7,8,9],
    planRate:[0,1,2,3,4,5,6,7,8,9],
    rules:{
      customer_id: [
        {required: true, message: '请选择渠道', trigger: 'change'},
      ] ,
      gameRate: [
        {required: true, message: '请选择渠道', trigger: 'change'},
      ] ,
      channelRate: [
        {required: true, message: '请选择渠道', trigger: 'change'},
      ] ,
      planRate: [
        {required: true, message: '请选择渠道', trigger: 'change'},
      ] ,
    }
  }
}

form.watch = {
  'model.rate':function(val){
    this.changeRate(val)
  },
  'model.gameRate':function(val){
    var rate = [0,1,2,3,4,5,6,7,8,9]
    var index = rate.indexOf(11-val)
    this.channelRate = index < 0 ? rate : rate.splice(0,index)
    if(this.model.channelRate > this.channelRate[this.channelRate.length-1]) {
      this.model.channelRate = this.channelRate[0]
    }
  },
  'model.channelRate':function(val){
    var rate = [0,1,2,3,4,5,6,7,8,9]
    var index = rate.indexOf(11 - val - this.model.gameRate)
    this.planRate = index < 0 ? rate : rate.splice(0,index)
    if(this.model.planRate > this.planRate[this.planRate.length-1]){
      this.model.planRate = this.planRate[0]
    }
  }
},

form.computed = {
  trenchAll:trenchAll.data
}

form.mounted = function(){
  if(this.$route.params.id!=='new'){
    this.action = 'update'
    this.rolestatus = '修改分成'
    this.get()
  }else{
    this.action = 'add'
    this.rolestatus = '新增分成'
  }
}

//分成改变调用
form.methods.changeRate = function(val){
  val = val.split(':')
  var key = this.model.typename.split(':')
  var obj = {}
  for(var item in val){
    obj[key[item]] = val[item]
  }
  this.model.gameRate = parseInt(obj['游戏'] || 0);
  this.model.channelRate = parseInt(obj['渠道'] || 0);
  this.model.planRate = parseInt(obj['平台'] || 0);
}

//重置数据
form.methods.resetData = function(){
  this.reset();
  this.action=='update' && this.changeRate(this.model.Rate)
}

//提交前确保分成为10
form.methods.savepre = function(){
  if(this.model.gameRate+this.model.channelRate+this.model.planRate != 10){
    this.$alert('分成总和必须为10', '温馨提示', {
      confirmButtonText: '确定',
      center: true
    })
    return
  }
  this.model.rateList = [];
  this.model.rate = "";
  this.model.typename = "";

  if(this.model.gameRate){
    this.model.rateList.push({'游戏':this.model.gameRate });
    this.model.rate += this.model.gameRate;
    this.model.typename += '游戏';
  }

  if(this.model.channelRate){
    this.model.rateList.push({'渠道':this.model.channelRate });
    this.model.rate += ':'+this.model.channelRate;
    this.model.typename += ':渠道';
  }

  if(this.model.planRate){
    this.model.rateList.push({'平台':this.model.planRate });
    this.model.rate += ':'+this.model.planRate;
    this.model.typename += ':平台';
  }

  this.save()
}
  export default form
</script>

<style scoped>
</style>
