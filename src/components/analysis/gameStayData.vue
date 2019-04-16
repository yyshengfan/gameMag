<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">运营数据</span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">留存数据</span>
    </div>

    <el-card class="box-card">
      <div class="MyContainerCon">
        <!--表格-->
        <div style="margin-bottom: 50px;" v-show="activeTab=='whole'">
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
                <div>
                  <el-select v-model="filters.type" placeholder="筛选类型">
                    <el-option label="留存人数" key="1" value="1"></el-option>
                    <el-option label="留存率" key="2" value="2"></el-option>
                  </el-select>
                </div>
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
              prop="channel_name"
              label="渠道名称"
              min-width="100">
            </el-table-column>
            <el-table-column
              :prop="filters.type == '1'?'ri2':'rate2'"
              label="2日"
              min-width="100">
            </el-table-column>
            <el-table-column
              :prop="filters.type == '1'?'ri3':'rate3'"
              label="3日"
              min-width="100">
            </el-table-column>
            <el-table-column
              :prop="filters.type == '1'?'ri4':'rate4'"
              label="4日"
              min-width="100">
            </el-table-column>
            <el-table-column
              :prop="filters.type == '1'?'ri5':'rate5'"
              label="5日"
              min-width="100">
            </el-table-column>
            <el-table-column
              :prop="filters.type == '1'?'ri6':'rate6'"
              label="6日"
              min-width="100">
            </el-table-column>
            <el-table-column
              :prop="filters.type == '1'?'ri7':'rate7'"
              label="7日"
              min-width="100">
            </el-table-column>
            <el-table-column
              :prop="filters.type == '1'?'ri14':'rate14'"
              label="14日"
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
  import gameStayData from '../../common/store/gameStayData'
  import sdkChannel from '../../common/store/sdkChannel'
  import sdkGame from '../../common/store/sdkGame'

  var list = new List({store: gameStayData});

  list.data = function () {
    return {
      buttonList: {
        search: false,
      },
      sheetName: '整体收入.xlsx',
      sheetTitle: {},
      gameAll:[],
      activeTab: 'whole',
      routeName: "allIncomesForm",
      loading: false,
      exportLoading: false,
      pagination: {
        size: 10,
        page: 1
      },
      filters: {
        gamaId: '',
        channelId:'',
        stime:'',
        etime:'',
        type:'1',
      },
    }  
  };

  //获取游戏以及渠道
  list.computed.sdkGame = function(){
    return sdkGame.data()
  }

  list.computed.sdkChannel = function(){
    return sdkChannel.data()
  }

  list.mounted = function () {
    this.$log("myContract mounted", this)
    this.getList()
  };

  //表格数据导出处理
  list.methods.excelpre = function(){
    if(this.filters.type=='1'){
      this.sheetName = "留存人数.xlsx"
      this.sheetTitle =  {
        daytime: '日期',
        gameName: '游戏名称',
        channel_name: '渠道名称',
        ri2:'2日',
        ri3:'3日',
        ri4:'4日',
        ri5:'5日',
        ri6:'6日',
        ri7:'7日',
        ri14:'14日',
      }
    }else{
      this.sheetName = "留存率.xlsx"
      this.sheetTitle =  {
        daytime: '日期',
        gameName: '游戏名称',
        channel_name: '渠道名称',
        rate2:'2日',
        rate3:'3日',
        rate4:'4日',
        rate5:'5日',
        rate6:'6日',
        rate7:'7日',
        rate14:'14日',
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
