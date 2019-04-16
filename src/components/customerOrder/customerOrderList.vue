<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first"><router-link :to="{ path: '/customerOrderList' }">订单管理</router-link></span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">订单列表</span>
    </div>
    <el-card class="box-card" style="padding-bottom: 2rem;">
      <div class="MyContainerCon">
        <!--筛选器-->
        <div style="margin-top: 2rem">
          <div class="searchtable">
            <div>
              <el-select v-model="filters.customerId" clearable placeholder="合作方全称" filterable
                         style="width:100%" @change="getGamesByCustomerId()" @clear="gameDatas=gameAllDatas">
                <el-option v-for="item in customerDatas" :key="item.customerId" :label="item.Companyname"
                           :value="item.customerId">
                </el-option>
              </el-select>
            </div>
            <div>
              <el-select v-model="filters.GameId" clearable placeholder="游戏名称" filterable
                         style="width:100%" @change="getPropsByGameId()" @clear="propDatas=propAllDatas">
                <el-option v-for="item in gameDatas" :key="item.GameId" :label="item.gName"
                           :value="item.GameId">
                </el-option>
              </el-select>
            </div>
            <div>
              <el-select v-model="filters.propId" clearable placeholder="商品名称" filterable style="width:100%">
                <el-option v-for="item in propDatas" :key="item.propId" :label="item.name"
                           :value="item.propId">
                </el-option>
              </el-select>
            </div>
            <div>
              <el-input v-model="filters.phone" placeholder="手机号" style="width: 100%" clearable></el-input>
            </div>

            <div>
              <el-date-picker style="width: 100%" :editable="false" clearable v-model="filters.stime" type="date"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd 00:00:00" placeholder="开始日期">
              </el-date-picker>
            </div>
            <div>
              <el-date-picker clearable v-model="filters.etime" style="width: 100%" :editable="false" type="date"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd 23:59:59" placeholder="截止日期">
              </el-date-picker>
            </div>
            <div>
              <el-input v-model="filters.thirdorderId" placeholder="订单号" style="width: 100%" clearable></el-input>
            </div>
            <div>
              <el-select v-model="filters.status" clearable placeholder="订单状态"  style="width:100%">
                <el-option label="支付失败" value="1"></el-option>
                <el-option label="支付成功" value="2"></el-option>
                <el-option label="退款失败" value="3"></el-option>
                <el-option label="退款成功" value="4"></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div style="text-align: center">
          <el-button type="primary" icon="el-icon-search" v-on:click="getList()"
                     style="margin-left: 10px;height: 38px" v-show="buttonList.search">查询
          </el-button>
          <el-button type="primary" icon="el-icon-news" v-on:click="excel()" v-show="buttonList.export"
                     style="height: 38px;margin-left: 10px" v-loading="exportLoading">导出</el-button>
          <el-button type="primary" icon="el-icon-error" v-on:click="resetFilter()"
                     style="margin-left: 10px;height: 38px">清除
          </el-button>
        </div>
        <!--表格-->
        <div style="margin:10px 0 "></div>
        <div>
          <!-- <el-tabs v-model="activeName" type="card" @tab-click="setStatus()">
             <el-tab-pane label="支付订单" name="1"></el-tab-pane>
             <el-tab-pane label="退款订单" name="2"></el-tab-pane>
           </el-tabs>-->

          <el-table v-loading="loading" size="$store.state.size"
                    :data="data | getDatas()" border class="tableBorder thCenter" style="width: 100%">
            <el-table-column prop="thirdorderId" label="订单号" min-width="100" show-overflow-tooltip>
            </el-table-column>
            <!--<el-table-column prop="phone" width="140" label="手机号" show-overflow-tooltip>
            </el-table-column>-->
            <!-- 支付成功，支付失败，退款成功退款失败 -->
            <!--  :class="(STATUS == '支付成功' || STATUS=='退款成功')? 'finish-pass':'no-pass' " -->
            <el-table-column prop="STATUS" label="订单状态" width="120">
            </el-table-column>
            <!--<el-table-column prop="bfmtxnTime" :formatter="formatTableDate" label="下单时间" width="110">
            </el-table-column>-->
            <el-table-column prop="txnTime" :formatter="formatTableDate" label="支付时间" show-overflow-tooltip width="180">
            </el-table-column>
            <el-table-column prop="settleM" :formatter="formatTableNumber" label="金额/元" width="90">
            </el-table-column>
            <!-- <el-table-column prop="couponM"  label="优惠金额/元">
             </el-table-column>-->
            <el-table-column prop="smoney" label="手续费/元" show-overflow-tooltip width="140">
            </el-table-column>
            <el-table-column prop="rate" label="分成比例" show-overflow-tooltip width="140">
              <template slot-scope="scope">
                {{scope.row.rate=='/'?'10':scope.row.rate}}({{scope.row.typename=='/'?'平台':scope.row.typename}})
              </template>
            </el-table-column>
            <el-table-column prop="gm" label="游戏分成/元" width="100">
            </el-table-column>
            <el-table-column prop="cm" label="渠道分成/元" width="100">
            </el-table-column>
            <el-table-column prop="pm" label="平台分成/元" width="100">
            </el-table-column>
            <!--<el-table-column prop="name" width="120" label="合作方全称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="gName" width="120" label="游戏名称" show-overflow-tooltip>
            </el-table-column>-->
            <el-table-column prop="propsname" min-width="120" label="商品名称" show-overflow-tooltip>
            </el-table-column>
            <!--<el-table-column prop="orderDesc" width="120" label="订单描述" show-overflow-tooltip>
            </el-table-column>-->
            <el-table-column type="expand" label="查看" width="60" fixed="right">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand myexpandList" labelWidth="120px">
                  <el-form-item label="订单号" class="expandleft">
                    <span >{{ props.row.thirdorderId }}</span>
                  </el-form-item>

                  <el-form-item label="手机号" class="expandleft">
                    <span>{{ props.row.phone }}</span>
                  </el-form-item>

                  <el-form-item label="订单状态" class="expandleft">
                    <span>{{ props.row.STATUS }}</span>
                  </el-form-item>

                  <el-form-item label="下单时间" class="expandleft">
                    <span v-text='formatOtherDate(props.row.bfmtxnTime)'></span>
                  </el-form-item>

                  <el-form-item label="支付时间" class="expandleft">
                    <span v-text='formatOtherDate(props.row.txnTime )'></span>
                  </el-form-item>

                  <el-form-item label="金额/元" class="expandleft">
                    <span>{{ props.row.settleM }}</span>
                  </el-form-item>

                  <el-form-item label="优惠金额/元" class="expandleft">
                    <span>{{ props.row.couponM }}</span>
                  </el-form-item>

                  <el-form-item label="手续费/元" class="expandleft">
                    <span>{{ props.row.smoney }}</span>
                  </el-form-item>

                  <el-form-item label="分成比例" class="expandleft">
                    <span>{{props.row.rate=='/'?'10':props.row.rate}}({{props.row.typename=='/'?'平台':props.row.typename}})</span>
                  </el-form-item>

                  <el-form-item label="游戏分成/元" class="expandleft">
                    <span>{{ props.row.gm }}</span>
                  </el-form-item>

                  <el-form-item label="渠道分成/元" class="expandleft">
                    <span>{{ props.row.cm }}</span>
                  </el-form-item>

                  <el-form-item label="平台分成/元" class="expandleft">
                    <span>{{ props.row.pm }}</span>
                  </el-form-item>

                  <el-form-item label="合作方全称" class="expandleft">
                    <span>{{props.row.name}}</span>
                  </el-form-item>

                  <el-form-item label="游戏名称" class="expandleft">
                    <span>{{ props.row.gName }}</span>
                  </el-form-item>

                  <el-form-item label="商品名称" class="expandleft">
                    <span>{{ props.row.propsname }}</span>
                  </el-form-item>

                  <el-form-item label="订单描述" class="expandleft">
                    <span>{{ props.row.orderDesc }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-edit-outline" type="warning"
                           v-show="buttonList.refund"
                           @click="refund(scope.$index, scope.row)">退款
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            layout="total, prev, next ,jumper"
            @current-change="changePage"
            :current-page="pagination.page"
            :page-size="pagination.size"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>

</template>

<script>
  import List from '../../common/list'
  import order from '../../common/store/order'

  var list = new List({store: order});

  list.data = function () {
    return {
      routeName: "customerOrderForm",
      loading: false,
      exportLoading: false,
      activeName:'1',
      dataLists:[],
      customerDatas:[],
      gameDatas:[],
      gameAllDatas:[],
      propDatas:[],
      propAllDatas:[],
      sheetName: '订单数据.xlsx',
      sheetTitle: {
        thirdorderId: '订单ID',
        phone: '手机号码',
        bfmtxnTime: '下单时间',
        STATUS: '状态',
        txnTime: '支付时间',
        settleM: '金额/元',
        couponM: '优惠金额/元',
        smoney: '手续费/元',
        rate: '分成比例',
        gm: '游戏分成/元',
        cm: '渠道分成/元',
        pm: '平台分成/元',
        name: '合作方全称',
        gName: '游戏名称',
        propsname: '商品名称',
        orderDesc: '订单描述',
      },
      pagination: {
        size:10,
        page: 1,
      },
      filters: {
        stime: '',
        etime: '',
        customerId: '',
        phone: '',
        GameId:'',
        propId:'',
        status:'',
        thirdorderId:''
      },
      buttonList:{
        search:false,
        export:false,
        refund:false,
      },
    }
  }
  list.mounted = function () {
    this.getList()
    this.getCustomers()
    this.getGames()
    this.getProps()
    this.initButton(91,93)
  }
  list.filters= {
    getDatas:function (val) {
      var list=val
      for(var i=0;i<list.length;i++){
        if(!list[i].settleM){
          list[i].settleM='0'
        }
        list[i].pm='-'
        list[i].gm='-'
        list[i].cm='-'
        var temp=list[i].ratio_money
        if(temp){
          temp=temp.split(':')
          for(var j=0;j<temp.length;j++){
            var array = eval ("(" + temp[j]+ ")");
            if(array[1]==0){//平台
              list[i].pm=array[0]
            }
            if(array[1]==1){//游戏
              list[i].gm=array[0]
            }
            if(array[1]==2){//渠道
              list[i].cm=array[0]
            }
          }
        }
      }
      return list
    }
  }
  /*list.methods.changeView=function () {
    alert(11111111111111111)
  }*/
  list.methods.getCustomers = function () {
    this.$http['post']('/orderFilters/queryAllCustomers')
      .then((response) => {
        this.customerDatas=response.data.data
      })
      .catch((response) => {
      })
  }
  list.methods.getGames= function () {
    this.$http['post']('/orderFilters/queryAllGames')
      .then((response) => {
        this.gameDatas=response.data.data
        this.gameAllDatas=response.data.data
      })
      .catch((response) => {
      })
  }
  list.methods.getProps= function () {
    this.$http['post']('/orderFilters/queryAllProps')
      .then((response) => {
        this.propDatas=response.data.data
        this.propAllDatas=response.data.data
      })
      .catch((response) => {
      })
  }
  //根据公司查游戏
  list.methods.getGamesByCustomerId= function () {
    this.gameDatas=this.gameAllDatas
    this.filters.gName=''
    var datas=[]
    for(var i=0;i<this.gameDatas.length;i++){
      if(this.gameDatas[i].customerId==this.filters.customerId){
        datas.push(this.gameDatas[i])
      }
    }
    this.gameDatas=datas
  }
  list.methods.formatDatas = function(data){
    for(var item of data){
      item.bfmtxnTime = this.formatDate(item.bfmtxnTime)
      item.txnTime = this.formatDate(item.txnTime)
      item.rate = (item.rate=='/'?'10':item.rate)+'('+item.typename+')'
      delete item.typename
      delete item.orderId
      //delete item.ratio_money
    }
    var list=data
    for(var i=0;i<list.length;i++){
      list[i].pm='-'
      list[i].gm='-'
      list[i].cm='-'
      var temp=list[i].ratio_money
      if(temp){
        temp=temp.split(':')
        for(var j=0;j<temp.length;j++){
          var array = eval ("(" + temp[j]+ ")");
          if(array[1]==0){//平台
            list[i].pm=array[0]
          }
          if(array[1]==1){//游戏
            list[i].gm=array[0]
          }
          if(array[1]==2){//渠道
            list[i].cm=array[0]
          }
        }
      }
    }
    for(var item of data) {
      delete item.ratio_money
    }
    return data
  }
  list.methods.getPropsByGameId= function () {
    this.propDatas=this.propAllDatas
    this.filters.name=''
    var datas=[]
    for(var i=0;i<this.propDatas.length;i++){
      if(this.propDatas[i].GameId==this.filters.GameId){
        datas.push(this.propDatas[i])
      }
    }
    this.propDatas=datas
  }
  // 退款
  list.methods.refund = function(index,row){
    console.log(row.orderId)
    this.$confirm("确认退款！", '提示', {
      confirmButtonText: '确定',
      text: "确认退款！",
      cancelButtonText: '取消',
      type: 'warning'
    }).then((result) => {
        this.loading = true
        this.$http.post('/refund/refund', {orderId:row.orderId})
          .then((response) => {
            this.loading = false
            this.$confirm(response.data.respMsg, '提示', {
              type: 'warning',
            })
          })
          .catch((response) => {
            this.loading = false
            this.$confirm(response.data.respMsg, '提示', {
              type: 'warning',
            })
          })

    }).catch((result)=>{

    })
  }


  export default list
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #333333;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .expandleft{
    text-align: left;
  }
  .myexpandList .expandleft label.el-form-item__label,
  .myexpandList .expandleft .el-form-item__content {
    line-height: 28px;
  }
</style>
