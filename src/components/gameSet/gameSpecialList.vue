<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/activitiesList' }">游戏设置</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">游戏专题</span>
    </div>
    <el-card class="box-card" style="padding-bottom: 2rem;">
      <div class="MyContainerCon">
        <div style="margin-top: 2rem">
          <!--筛选器-->
          <div class="searchtable">
            <div>
              <el-input v-model="filters.topicname" placeholder="请输入专题名称" clearable></el-input>
            </div>
            <div>
              <el-select v-model="filters.status" placeholder="请选择状态" style="width: 100%" clearable>
                <el-option label="关闭" value="2"></el-option>
                <el-option label="开启" value="1"></el-option>
              </el-select>
            </div>
            <div>
              <el-button type="primary" icon="el-icon-search" @click="getList()"
                         style="height: 38px" v-show="buttonList.search">查询</el-button>
            </div>
            <div>
              <el-button type="primary" icon="el-icon-plus" @click="add()"
                         style="height: 38px;" v-show="buttonList.add">新增</el-button>
            </div>
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
            <el-table-column prop="topicname" label="专题名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" label="状态"  show-overflow-tooltip>
              <template slot-scope="scope">
                <span :class="scope.row.status=='1'? 'finish-pass':'no-pass'">{{scope.row.status=='1'? '开启':'关闭'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="useChannel" label="展示平台" show-overflow-tooltip>
              <template slot-scope="scope">
                {{initUseChannel(scope.row.usechannel)}}
              </template>
            </el-table-column>
            <el-table-column prop="btime" label="开始时间" :formatter="formatTableDate" show-overflow-tooltip width="180">
            </el-table-column>
            <el-table-column show-overflow-tooltip  label="操作">
              <template slot-scope="scope">
                <el-button type="primary" class="status" size="mini" @click="view(scope.$index, scope.row)" v-show="buttonList.view">
                  <i class="fa fa-eye"></i>查看
                </el-button>
                <el-button type="danger" class="status" size="mini" @click="remove(scope.$index, scope.row)" v-show="buttonList.delete">
                  <i class="el-icon-error"></i>删除
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
  import gameSpecial from '../../common/store/gameSpecial'
  import phoneplatform from '../../common/store/phoneplatform'

  var list = new List({store: gameSpecial});

  list.data = function() {
    return {
      routeName: "gameSpecialForm",
      rdate:[],
      loading: false,
      buttonList:{
        search:false,
        view:false,
        add:false,
        delete:false,
      },
      filters:{
        topicname:'',
        status:'',
      },
      pagination: {
        size: 10,
        page: 1
      },
    }
  }

  list.mounted = function() {
    this.$log("gameSpecial mounted", this)
    this.initButton(92,124)
    this.getList()
  }
  list.computed.phoneplatform = function(){
    return phoneplatform.data()
  }
  list.methods.initUseChannel = function(val) {
    if (val && typeof (val) == 'string') {
      val = val.split(',')
      var useChannel = ''
      for (var channel of this.phoneplatform) {
        for (var va of val) {
          if (va == channel.id) {
            useChannel += ',' + channel.platform
          }
        }
      }
      return useChannel.substring(1)//去掉第一个逗号
    }
  }

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
