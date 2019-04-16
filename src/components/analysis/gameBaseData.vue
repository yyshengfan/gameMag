<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">运营数据</span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">基础数据</span>
    </div>

    <el-card class="box-card">
      <div class="MyContainerCon">
        <el-row>
          <el-col :xs="{}" :sm="{span:24,offset:0}">
            <div class="Myapp-tabs" v-for="tab in tabs" :key="tab.name" @click="tabSelect(tab.name)">
              <el-button size="medium" style="width:100%;height:40px;border-radius: 0" :class="{'active':tab.active}">
                {{tab.text}}
              </el-button>
            </div>
          </el-col>
        </el-row>
        <!--表格-->
        <div style="margin-bottom: 50px;">
          <el-row style="margin-bottom: 20px;">
            <el-col :xs="{span:24,offset:0}" :sm="{span:24,offset:0}">
              <div class="searchtable">
                <div>
                    <el-select v-model="filters.gameId" placeholder="游戏" clearable filterable>
                      <el-option :label="game.gName" :key="game.gameId" :value="game.gameId"
                                  v-for="game in sdkGame"></el-option>
                    </el-select>
                </div>
                <div>
                    <el-select v-model="filters.channelId" placeholder="平台" clearable filterable>
                      <el-option :label="platform.channel_name" :key="platform.channelId" :value="platform.channelId"
                                  v-for="platform in sdkChannel"></el-option>
                    </el-select>
                </div>
                <!-- <div>
                  <el-select v-model="filters.searchbyDate" placeholder="查询方式">
                    <el-option key="h" value="h" label="按天"></el-option>
                    <el-option key="d" value="d" label="按月"></el-option>
                    <el-option key="m" value="m" label="按年"></el-option>
                  </el-select>
                </div> -->
                <div>
                  <el-date-picker
                    type="date"
                    v-model="filters.stime"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :clearable="false"
                    placeholder="开始日期">
                  </el-date-picker>
                </div>
                <div>
                  <el-date-picker
                    type="date"
                    v-model="filters.etime"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :clearable="false"
                    placeholder="结束日期">
                  </el-date-picker>
                </div>
                <div>
                  <el-button type="primary" icon="el-icon-search" @click="getList">查询</el-button>
                </div>
                <div>
                  <el-button type="primary" icon="el-icon-news"  v-loading="exportLoading" @click="excelpre">导出</el-button>
                </div>
              </div>
            </el-col>
          </el-row>

          <el-table v-loading="loading" :size="$store.state.size"
                    :data="data" border
                    class="tableBorder thCenter"
                    style="width: 100%">
            <el-table-column
              label="序号"
              type="index"
              width="70">
            </el-table-column>
            <el-table-column
              prop="daytime"
              label="日期"
              :formatter="formatTableDate"
              min-width="200">
            </el-table-column>
            <el-table-column
              prop="gameName"
              label="游戏名称"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="channelName"
              label="渠道名称"
              min-width="100">
            </el-table-column>

            <!-- 用户数据 -->
            <el-table-column
              v-if="activeTab=='userData'"
              prop="macactive"
              label="设备激活数"
              min-width="100">
            </el-table-column>
            <el-table-column
              v-if="activeTab=='userData'"
              prop="registnum"
              label="新增注册"
              min-width="100">
            </el-table-column>
            <el-table-column
              v-if="activeTab=='userData'"
              prop="accountactive"
              label="账号活跃数"
              min-width="100">
            </el-table-column>  
            <el-table-column
              v-if="activeTab=='userData'"
              prop="loginactive"
              label="登录活跃数"
              min-width="100">
            </el-table-column>
            <el-table-column
              v-if="activeTab=='userData'"
              prop="registtotal"
              label="总注册"
              min-width="100">
            </el-table-column>

            <!-- 充值数据 -->
            <el-table-column
              v-if="activeTab=='payData'"
              prop="newpaynum"
              label="新增充值人数"
              min-width="110">
            </el-table-column>
            <el-table-column
              v-if="activeTab=='payData'"
              prop="newpaymoney"
              label="新增充值金额"
              min-width="110">
            </el-table-column>
            <el-table-column
              v-if="activeTab=='payData'"
              prop="paynum"
              label="充值人数"
              min-width="100">
            </el-table-column>
            <el-table-column
              v-if="activeTab=='payData'"
              prop="paymoney"
              label="充值金额"
              min-width="100">
            </el-table-column>
            <el-table-column
              v-if="activeTab=='payData'"
              prop="payrate"
              label="付费率"
              min-width="100">
            </el-table-column>
            <el-table-column
              v-if="activeTab=='payData'"
              prop="paytotalnum"
              label="总充值人数"
              min-width="100">
            </el-table-column>
            <el-table-column
              v-if="activeTab=='payData'"
              prop="paytotal"
              label="总充值金额"
              min-width="100">
            </el-table-column>

            <!-- 在线数据 -->
            <el-table-column
              v-if="activeTab=='onlineData'"
              prop="averageonline"
              label="平均在线时长(小时)"
              min-width="100">
            </el-table-column>
            <el-table-column
              v-if="activeTab=='onlineData'"
              prop="averageonlinenum"
              label="平均在线(人数)"
              min-width="100">
            </el-table-column>
            <el-table-column
              v-if="activeTab=='onlineData'"
              prop="maxonlinenum"
              label="峰值在线(人数)"
              min-width="100">
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
  import gameBaseData from '../../common/store/gameBaseData'
  import sdkChannel from '../../common/store/sdkChannel'
  import sdkGame from '../../common/store/sdkGame'

  var list = new List({store: gameBaseData});

  list.data = function () {
    return {
      tabs: [{name: "userData", text: "用户数据", active: true}, {name: "payData", text: "充值数据", active: false}, {
        name: "onlineData",
        text: "在线数据",
        active: false
      },],
      sheetName: '',
      sheetTitle: {},
      activeTab: 'userData',
      routeName: "allIncomesForm",
      loading: false,
      exportLoading: false,
      pagination: {
        size: 10,
        page: 1
      },
      filters: {
        stime:'',
        etime:'',
        channelId:'',
        gameId:''
      },
    }  
  };

  list.mounted = function () {
    this.$log("myContract mounted", this)
    this.getList()
  };

  
  //获取游戏以及渠道
  list.computed.sdkGame = function(){
    return sdkGame.data()
  }

  list.computed.sdkChannel = function(){
    return sdkChannel.data()
  }

  //状态切换
  list.methods.tabSelect = function (tabName) {
    this.activeTab = tabName
    this.chartShow = tabName === "whole" ? true : false
    for (var tab of this.tabs) {
      if (tabName === tab.name) {
        tab.active = true
      } else {
        tab.active = false
      }
    }
  }

  //表格数据导出处理
  list.methods.excelpre = function(){
    if(this.activeTab=='userData'){
      this.sheetName = "用户数据.xlsx"
      this.sheetTitle =  {
        daytime: '日期',
        gameName: '游戏名称',
        channelName: '渠道名称',
        macactive:'设备激活数',
        registnum:'新增注册',
        accountactive:'账号活跃数',
        loginactive:'登录活跃数',
        registtotal:'总注册',
      }
    }else if(this.activeTab=='payData'){
      this.sheetName = "充值数据.xlsx"
      this.sheetTitle =  {
        daytime: '日期',
        gameName: '游戏名称',
        channelName: '渠道名称',
        newpaymoney:'新增充值金额',
        paynum:'充值人数',
        paymoney:'充值金额',
        payrate:'付费率',
        paytotalnum:'总充值人数',
        paytotal:'总充值金额',
      }
    }else{
      this.sheetName = "在线数据.xlsx"
      this.sheetTitle =  {
        daytime: '日期',
        gameName: '游戏名称',
        channelName: '渠道名称',
        averageonline:'平均在线时长(小时)',
        averageonlinenum:'平均在线(人数)',
        maxonlinenum:'峰值在线(人数)',
      }
    }
    this.excel()
  }

  // 格式化数据
  list.methods.formatDatas = function (data) {
    for (var item of data) {
      item.daytime = this.formatDate(item.daytime)
    }
    return data
  }

  export default list

</script>

<style scoped>
  .el-form .el-form-item {
    margin-bottom: 10px;
  }

  #container .highcharts-container {
    width: 98% !important;
  }

</style>
