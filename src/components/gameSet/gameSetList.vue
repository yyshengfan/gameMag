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
      <span class="second">游戏配置</span>
    </div>
    <el-card class="box-card" style="padding-bottom: 2rem;">
      <div class="MyContainerCon">
        <div style="margin-top: 2rem">
          <!--筛选器-->
          <div class="searchtable">
            <div>
              <el-select  v-model="filters.gamephonetype" placeholder="请选择类型" style="width: 100%" clearable>
                <el-option
                  v-for="item in gamephoneType"
                  :key="item.id"
                  :label="item.gametype"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div>
              <el-select  v-model="filters.phoneplatform" placeholder="请选择平台" style="width: 100%" clearable>
                <el-option
                  v-for="item in phoneplatform"
                  :key="item.id"
                  :label="item.platform"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div>
              <el-select v-model="filters.status" placeholder="请选择状态" style="width: 100%" clearable>
                <el-option label="关闭" value="2"></el-option>
                <el-option label="开启" value="1"></el-option>
              </el-select>
            </div>
            <div>
              <el-select v-model="filters.gameId" clearable
                         filterable placeholder="请选择游戏名称" style="width: 100%">
                <el-option
                  v-for="item in gameDatas"
                  :key="item.gameId"
                  :label="item.gName"
                  :value="item.gameId">
                </el-option>
              </el-select>
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
          </div>
          <div  style="text-align: center">
              <el-button type="primary" icon="el-icon-search" @click="getList()"
                         style="height: 38px" v-show="buttonList.search">查询</el-button>
              <el-button type="primary" icon="el-icon-plus" @click="add()"
                         style="height: 38px;" v-show="buttonList.add">新增</el-button>
              <el-button type="primary" icon="el-icon-edit-outline" @click="updateAll()"
                         style="height: 38px;" v-show="buttonList.add">批量修改</el-button>
              <el-button type="primary" icon="el-icon-news" @click="excelIt()"
                         style="height: 38px;" v-show="buttonList.add" v-loading="loading2">数据导出</el-button>
          </div>
        </div>
        <!--表格-->
        <div style="margin:10px 0 "></div>
        <div>
          <el-table v-loading="loading"
                    :size="$store.state.size"
                    :data="data" border
                    class="tableBorder thCenter"
                    style="width: 100%">
            <el-table-column label="序号" type="index" width="70">
            </el-table-column>
            <el-table-column prop="gName" label="游戏名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" label="状态"  show-overflow-tooltip width="70">
              <template slot-scope="scope">
                <span :class="scope.row.status=='1'? 'finish-pass':'no-pass'">{{scope.row.status=='1'? '开启':'关闭'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="gametype" label="显示类型" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="platform" label="平台名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="sort" label="排序"  show-overflow-tooltip width="70">
            </el-table-column>
            <el-table-column prop="btime" label="开始时间" :formatter="formatTableDate" show-overflow-tooltip width="180">
            </el-table-column>
            <el-table-column prop="etime" label="结束时间" :formatter="formatTableDate" show-overflow-tooltip width="180">
            </el-table-column>
            <el-table-column show-overflow-tooltip width="100" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" class="status" size="mini" @click="view(scope.$index, scope.row)" v-show="buttonList.view">
                  <i class="fa fa-eye"></i>查看
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
  import gamephoneType from '../../common/store/gamephoneType'
  import gameSet from '../../common/store/gameSet'
  import phoneplatform from '../../common/store/phoneplatform'

  var list = new List({store: gameSet});

  list.data = function() {
    return {
      routeName: "gameSetForm",
      loading:false,
      loading2:false,
      rdate:[],
      gameDatas:[],
      loading: false,
      sheetName: '游戏每日统计数据.xlsx',
      sheetTitle: {
        time: '日期',
        gameId: '游戏ID',
        gamename: '游戏名称',
        gameplantform: '平台编号',
        plantformname: '平台名称',
        heat: '访问量',
        download: '下载量',
      },
      buttonList:{
        search:false,
        view:false,
        add:false,
        update:false,
      },
      filters:{
        gameId:'',
        gamephonetype:'',
        gName:'',
        phoneplatform:'',
        status:'',stime:'',etime:'',
      },
      pagination: {
        size: 10,
        page: 1
      },
    }
  }

  list.mounted = function() {
    this.$log("activitiesList mounted", this)
    this.initButton(92,104)
    this.getList()
    this.getGames()
  }
  list.watch={
    '$route' (to, from) {
      if(from.path=='/gameSetForm/new'){
        this.getList()
      }
      if(from.path=='/gameSetForm/updateAll'){
        this.getList()
      }
    },
    'filters.gameId': function (val) {
      if (val) {
        this.getGameName()
      }
    },
  }
  list.methods.getGameName= function () {
    var data=this.gameDatas
    for(var i=0;i<data.length;i++){
      if(this.filters.gameId==data[i].gameId){
        this.filters.gName=data[i].gName
      }
    }
  }
  list.methods.getGames= function () {
    var params={
      status:'5',offstatus:'1',pass:'1'
    }
    this.$http['post']('/auditManage/getGameAll',params)
      .then((response) => {
        this.gameDatas=response.data.data
      })
      .catch((response) => {
      })
  }
  list.methods.excelIt=function () {
    this.loading2=true
    this.$http['post']('/auditManage/getGamePhoneInfoAll',this.filters)
      .then((response) => {
      this.loading2=false
      this.excel(response.data.data)
      })
      .catch((response) => {
        this.$alert('下载失败！', '温馨提示', {
          confirmButtonText: '确定',
          type: 'error'
        });
        this.loading2=false
      })
  }
  list.computed.phoneplatform = function(){
    return phoneplatform.data()
  }
  list.computed.gamephoneType = function(){
    return gamephoneType.data()
  }
  list.methods.updateAll = function () {
    if(this.filters.gameId){
      var params={
        id:'updateAll',
      }
      for(var key in this.filters){
        params[key]=this.filters[key]
      }
      this.$router.push({name:'gameSetForm',params:params})
    }else{
      this.$alert('请选择要修改的游戏！', '温馨提示', {
        confirmButtonText: '确定',
        center: true,
        type: 'warning '
      });
    }

  }
  /*list.methods.initPlatform = function(val) {
    if (val && typeof (val) == 'string') {
      val = val.split(',')
      var platform = ''
      for (var key of this.phoneplatform) {
        for (var va of val) {
          if (va == key.id) {
            platform += ',' + key.platform
          }
        }
      }
      return platform.substring(1)//去掉第一个逗号
    } else {
      var platform = ''
      for (var key of this.phoneplatform) {
        for (var va of val) {
          if (va == key.id) {
            platform += ',' + key.platform
          }
        }
      }
      return platform.substring(1)//去掉第一个逗号
    }
  }
  list.methods.initGamephoneType = function(val) {
    if (val && typeof (val) == 'string') {
      val = val.split(',')
      var gamephoneType = ''
      for (var key of this.gamephoneType) {
        for (var va of val) {
          if (va == key.id) {
            gamephoneType += ',' + key.gametype
          }
        }
      }
      return gamephoneType.substring(1)//去掉第一个逗号
    } else {
      var gamephoneType = ''
      for (var key of this.gamephoneType) {
        for (var va of val) {
          if (va == key.id) {
            gamephoneType += ',' + key.gametype
          }
        }
      }
      return gamephoneType.substring(1)//去掉第一个逗号
    }
  }*/
  export default list

</script>

<style>
  .el-table .warning-row {
    color: #409DFB;
    font-weight: 600
  }
  .details{
    background-color: #F0F8FF;
    border-radius: 10px;
  }
</style>
