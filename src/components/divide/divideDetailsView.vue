<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/divideList' }">分成管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path:'/divideDetails' }">分成列表</el-breadcrumb-item>
          <el-breadcrumb-item>{{model.game_name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-row>
        <div style="margin-top: 50px"></div>
        <el-col :sm="{span:18,offset:0}" :xs="{span:18,offset:4}">
          <el-form label-width="400px" :model="model" ref="form" class="divideInput">
            <el-form-item  label="游戏名称:" prop="gameId">
              <div class="divideInput">{{model.game_name}}</div>
            </el-form-item>

            <el-form-item  label="渠道名称:" prop="channel_id">
              <div class="divideInput">{{model.channel_name}}</div>
            </el-form-item>

            <el-form-item  label="游戏分成:" prop="shopId1" v-if="model.gameRate">
              <div class="divideInput">{{model.gameRate}}</div>
            </el-form-item>

            <el-form-item  label="分账ID:" prop="shopId1" v-if="model.gameRate">
              <div class="divideInput">{{model.shopId1}}</div>
            </el-form-item>  

            <el-form-item  label="公司名称:" prop="company_id1" v-if="model.gameRate">
              <div class="divideInput">{{model.company_name1}}</div>
            </el-form-item>  

            <el-form-item label="结算银行名称:"  prop="" v-if="model.gameRate">
              <div class="divideInput">{{model.bank_name1}}</div>  
            </el-form-item>

            <el-form-item label="结算收款银行账号:" prop="bank_name1" v-if="model.gameRate">
              <div class="divideInput">{{model.bank_no1}}</div>  
            </el-form-item>

            
            <el-form-item  label="渠道分成:" prop="shopId2"  v-if="model.channelRate">
              <div class="divideInput">{{model.gameRate}}</div>
            </el-form-item>

            <el-form-item  label="分账ID:" prop="shopId2" v-if="model.channelRate">
              <div class="divideInput">{{model.shopId2}}</div>
            </el-form-item>  

            <el-form-item  label="公司名称:" prop="company_id2" v-if="model.channelRate">
              <div class="divideInput">{{model.company_name2}}</div>
            </el-form-item>  

            <el-form-item label="结算银行名称:"  prop="bank_name2" v-if="model.channelRate">
              <div class="divideInput">{{model.bank_name2}}</div>  
            </el-form-item>

            <el-form-item label="结算收款银行账号:" prop="bank_name2" v-if="model.channelRate">
              <div class="divideInput">{{model.bank_no2}}</div>  
            </el-form-item>


            <el-form-item  label="平台分成:" prop="shopId3"  v-if="model.planRate">
              <div class="divideInput">{{model.gameRate}}</div>
            </el-form-item>

            <el-form-item  label="分账ID:" prop="shopId3"  v-if="model.planRate">
              <div class="divideInput">{{model.shopId3}}</div>
            </el-form-item>  

            <el-form-item  label="公司名称:" prop="company_id3"  v-if="model.planRate">
              <div class="divideInput">{{model.company_name3}}</div>
            </el-form-item>  

            <el-form-item label="结算银行名称:"  prop="bank_name3"  v-if="model.planRate">
              <div class="divideInput">{{model.bank_name3}}</div>  
            </el-form-item>

            <el-form-item label="结算收款银行账号:" prop="bank_name3"  v-if="model.planRate">
              <div class="divideInput">{{model.bank_no3}}</div>  
            </el-form-item>
            
          </el-form>
        </el-col>
      </el-row>
    </div>
  </el-card>

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

    shopId1:'',
    company_name1:'',
    bank_name1:'',
    bank_no1:'',

    shopId2:'',
    company_name2:'',
    bank_name2:'',
    bank_no2:'',

    shopId3:'',
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
    rolestatus:'详单',
    model:model(),
    origModel:model(),
  }
}


form.mounted = function(){
  var list = this.$route.params.id.split(',')
  var params = {
    gameId:list[1],
    channel_id:list[0],
  }
  this.get(params)
}

export default form
</script>

<style scoped>
.divideInput{
  margin-left: 10px;
}
</style>
