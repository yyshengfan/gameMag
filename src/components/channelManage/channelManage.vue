<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/channelInfoManage' }">渠道管理</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">渠道管理</span>
    </div>
    <el-card class="box-card changeMar MyContainerCon">
      <!--表格-->
      <div v-loading="loading">
        <div style="text-align: center;">
          <el-radio-group class="tabGroupCon" v-model="tabName" style="margin-bottom: 30px;" @change="setFilters();">
            <el-radio-button class="tabGroup-tabs" label="0">待审核
              <span v-if="total0" class="totalStyle">{{total0<=maxTotal?total0:maxTotal+'+'}}</span>
            </el-radio-button>
            <el-radio-button class="tabGroup-tabs" label="1">审核通过
              <span v-if="total1" class="totalStyle">{{total1<=maxTotal?total1:maxTotal+'+'}}</span>
            </el-radio-button>
            <el-radio-button class="tabGroup-tabs" label="2">审核不通过
              <span v-if="total2" class="totalStyle">{{total2<=maxTotal?total2:maxTotal+'+'}}</span>
            </el-radio-button>
            <el-radio-button class="tabGroup-tabs" label="3">已下线
              <span v-if="total3" class="totalStyle">{{total3<=maxTotal?total3:maxTotal+'+'}}</span>
            </el-radio-button>
            <el-radio-button class="tabGroup-tabs" label="4">待下线
              <span v-if="total4" class="totalStyle">{{total4<=maxTotal?total4:maxTotal+'+'}}</span>
            </el-radio-button>
          </el-radio-group>

        </div>
        <!--筛选器-->
        <div style="margin-top: 2rem" class="searchtable">
          <div>
            <el-date-picker style="width: 100%" :editable="false" clearable v-model="filters.begin_time" type="date"
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd 00:00:00" placeholder="开始日期">
            </el-date-picker>
          </div>
          <div>
            <el-date-picker clearable v-model="filters.end_time" style="width: 100%" :editable="false" type="date"
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd 23:59:59" placeholder="截止日期">
            </el-date-picker>
          </div>
          <div>
            <el-input v-model="filters.Companyname" placeholder="输入公司名称" style="width: 100%" clearable></el-input>
          </div>
          <div>
            <el-button type="primary" icon="el-icon-search" v-on:click="getDatas()"
                       style="height: 38px" v-if="buttonList.search">查询
            </el-button>
          </div>
          <div>
            <el-button type="primary" icon="el-icon-news" v-on:click="excel()" v-loading="exportLoading"
                       style="height: 38px;" v-if="buttonList.export">导出
            </el-button>
          </div>
        </div>
        <div class="myTable">
          <el-table size="$store.state.size"
                    :data="data" border
                    class="tableBorder thCenter"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
            <el-table-column type="index" width="70" label="序号"></el-table-column>
            <el-table-column prop="company_name" label="公司名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="channel_name" label="渠道名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="type" label="渠道类型" :formatter="formatter.type" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="createtime" label="时间" show-overflow-tooltip width="200">
            </el-table-column>
            <el-table-column prop="status" label="渠道状态" :formatter="formatter.status" show-overflow-tooltip min-width="120">
              <div slot-scope="scope" class="name-wrapper">
                <p style="cursor: pointer;" :class="status[scope.row.status].split(',')[1]">
                  <!--<i :class="status[scope.row.status].split(',')[2]"></i>-->
                  {{status[scope.row.status].split(',')[0]}}
                </p>
              </div>
            </el-table-column>
            <el-table-column prop="status1" label="审核状态" :formatter="formatter.status1" show-overflow-tooltip min-width="120">
              <div slot-scope="scope" class="name-wrapper">
                <p v-if='scope.row.offstatus==0'  :class="status1[4].split(',')[1]">
                  <!--<i :class="status1[4].split(',')[2]"></i>-->
                  {{status1[4].split(',')[0]}}
                </p>
                <p v-else  :class="status1[scope.row.status1].split(',')[1]">
                  <!--<i :class="status1[scope.row.status1].split(',')[2]"></i>-->
                  {{status1[scope.row.status1].split(',')[0]}}
                </p>
              </div>
            </el-table-column>

            <el-table-column label="操作" width="200px">
              <template slot-scope="scope">
                <el-button class="status" size="mini" type="primary" v-if="buttonList.view"
                           @click="viewInfo(scope.$index, scope.row);setReadStatus(scope.$index, scope.row,1)">
                  <i class="fa fa-eye"></i>查看
                </el-button>
                <el-button class="status" size="mini" type="warning" v-if="buttonList.audit && scope.row.status1=='0'"
                           @click="audit(scope.$index, scope.row);setReadStatus(scope.$index, scope.row,1)">
                  <i class="el-icon-edit-outline"></i>审核
                </el-button>
                <el-button class="status" size="mini" type="warning"
                           v-if="buttonList.offline && scope.row.status1=='2' && scope.row.offstatus=='1'"
                           @click="offLine(scope.$index, scope.row);setReadStatus(scope.$index, scope.row,1)">
                  <i class="fa fa-times"></i>下线
                </el-button>
                <el-button class="status" size="mini" type="success"
                           v-if="buttonList.online && scope.row.offstatus=='0'"
                           @click="goLine(scope.$index, scope.row);setReadStatus(scope.$index, scope.row,1)">
                  <i class="el-icon-upload"></i>上线
                </el-button>
                <el-button class="status" size="mini" type="info"
                           v-if="buttonList.auditOffline && scope.row.status1=='3' && scope.row.offstatus=='1'"
                           @click="auditOffLine(scope.$index, scope.row);setReadStatus(scope.$index, scope.row,1)">
                  <i class="el-icon-edit-outline"></i>下线审核
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            layout="total, prev, next ,jumper"
            @current-change="changePage"
            :current-page="pagination.page"
            :page-size="pagination.limit"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </el-card>
    <el-dialog class="MyModelremove" :visible.sync="dialogAudit" :width="$store.state.isMobile?'90%':'70%'"
               @close="closeIt()">
      <channelAudit v-bind:dialogAudit="dialogAudit"
                    v-bind:channelId="channelId"
                    v-on:success="success()">
      </channelAudit>
    </el-dialog>
    <el-dialog class="MyModelremove" :visible.sync="dialogOffLine" :width="$store.state.isMobile?'90%':'70%'"
               @close="closeIt()">
      <channelOffline v-bind:dialogOffLine="dialogOffLine"
                      v-bind:channelId="channelId"
                      v-on:successOff="successOff()">
      </channelOffline>
    </el-dialog>
    <el-dialog class="MyModelremove" :visible.sync="dialogAuditOffLine" :width="$store.state.isMobile?'90%':'70%'"
               @close="closeIt()">
      <channelAuditOffline v-bind:dialogAuditOffLine="dialogAuditOffLine"
                           v-bind:channelId="channelId"
                           v-on:successOff2="successOff2()">
      </channelAuditOffline>
    </el-dialog>
    <router-view></router-view>
  </div>
  <!--<div>
    <el-card class="box-card" v-show="infoManage">
      &lt;!&ndash;筛选器&ndash;&gt;
      <div slot="header" class="clearfix">
        &lt;!&ndash;<p style="font-size: 16px;font-weight: 600;color: #2B6A65">渠道管理-渠道管理</p>&ndash;&gt;
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: 'channelInfoManage' }">渠道管理</el-breadcrumb-item>
          <el-breadcrumb-item>渠道管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-loading="loading">
        <div style="text-align: center;border-bottom: 1px solid #EBEEF5">
          <el-radio-group v-model="tabName" style="margin-bottom: 30px;" @change="setFilters()">
            <el-radio-button label="0">待审核</el-radio-button>
            <el-radio-button label="1">审核通过</el-radio-button>
            <el-radio-button label="2">审核不通过</el-radio-button>
            <el-radio-button label="3">已下线</el-radio-button>
            <el-radio-button label="4">待下线</el-radio-button>
          </el-radio-group>

        </div>
        &lt;!&ndash;筛选器&ndash;&gt;
        <div style="margin:10px 0 "></div>
        <div>
          <el-row :gutter="15" type="flex" justify="center">
            <el-col :xs="12" :sm="4" >
              <template>
                <div class="block">
                  <el-date-picker
                    style="width: 100%"
                    :editable="false"
                    clearable
                    v-model="filters.begin_time"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd 00:00:00"
                    placeholder="开始日期">
                  </el-date-picker>
                </div>
              </template>
            </el-col>
            <el-col :xs="12" :sm="4" >
              <template>
                <div class="block">
                  <el-date-picker
                    clearable
                    v-model="filters.end_time"
                    style="width: 100%"
                    :editable="false"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd 23:59:59"
                    placeholder="截止日期">
                  </el-date-picker>
                </div>
              </template>
            </el-col>
            <el-col :xs="12" :sm="{span: 4, offset: 0}">
              <el-input v-model="filters.companyName" placeholder="输入公司名称" style="width: 103%" clearable></el-input>
            </el-col>
            <el-button type="primary" icon="el-icon-search" v-on:click="getDatas()" style="margin-left: 10px;height: 40px">查询</el-button>
            <el-button type="primary" icon="el-icon-news" v-on:click="excel()" style="height: 40px;margin-left: 10px">导出</el-button>
          </el-row>
        </div>
        &lt;!&ndash;表格&ndash;&gt;
        <div>
          <div style="margin:6px 0 "></div>
          <div>
            <el-table size="$store.state.size"
                      :data="data" stripe border
                      class="tableBorder thCenter"
                      style="width: 100%">
              <el-table-column type="index" width="50" label="序号"></el-table-column>
              <el-table-column prop="company_name"  label="公司名称" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="channel_name" label="渠道名称" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="type" label="渠道类型" :formatter="formatter.type" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="createtime" label="时间"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="status" label="渠道状态" :formatter="formatter.status" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="status1" label="审核状态" :formatter="formatter.status1" show-overflow-tooltip>
              </el-table-column>

              <el-table-column label="操作" width="180px">
                <template slot-scope="scope">
                  <el-button v-if="buttonList.view" size="mini" type="primary" @click="viewInfo(scope.$index, scope.row)">查看</el-button>
                  &lt;!&ndash;<el-button size="mini" type="warning" @click="updateInfo(scope.$index, scope.row)">修改</el-button>&ndash;&gt;
                  <el-button v-if="buttonList.audit && scope.row.status1=='0'" size="mini" type="success" @click="audit(scope.$index, scope.row)">审核</el-button>
                  <el-button v-if="buttonList.offline && scope.row.status1=='2' && scope.row.offstatus=='1'" size="mini" type="success"@click="offLine(scope.$index, scope.row)">下线</el-button>
                  <el-button v-if="buttonList.online && scope.row.offstatus=='0'" size="mini" type="success" @click="goLine(scope.$index, scope.row)">上线</el-button>
                  <el-button v-if="buttonList.auditOffline && scope.row.status1=='3' && scope.row.offstatus=='1'" size="mini" type="success" @click="auditOffLine(scope.$index, scope.row)">下线审核</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              layout="total, prev, next ,jumper"
              @current-change="changePage"
              :current-page="pagination.page"
              :page-size="pagination.limit"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </el-card>
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
    <router-view></router-view>
  </div>-->

</template>

<script>
  import List from '../../common/list'
  import channelAudit from './channelAudit.vue'
  import channelOffline from './channelOffline.vue'

  var commomMethods = require('../../common/commonMethods')
  import channelManage from '../../common/store/channelManage'
  import channelAuditOffline from './channelAuditOffline'

  var list = new List({store: channelManage});
  list.components = {
    'channelAudit': channelAudit,
    'channelOffline': channelOffline,
    'channelAuditOffline': channelAuditOffline
  };
  list.data = function () {
    return {
      tabName: "0",
      maxTotal:99,
      total0:'',total1:'',total2:'',total3:'',total4:'',
      dialogAudit: false,
      dialogOffLine: false,
      dialogAuditOffLine: false,
      channelId: "",
      loading: false,
      exportLoading:false,
      pagination: {
        limit: 25,
        page: 1,
        start: 0
      },
      sheetName: '',
      sheetTitle: {
        company_name: '公司名称',
        channel_name: '渠道名称',
        type: '渠道类型',
        createtime: '时间',
        status: '渠道状态',
        status1: '审核状态',
      },
      filters: {
        companyName: '',
        begin_time: '',
        end_time: '',
        auditStatus: 0,
        offstatus: 1,
      },
      buttonList: {
        search: false,
        audit: false,
        view: false,
        offline: false,
        export: false,
        online: false,
        auditOffline: false
      },
      formatter: {
        type: (row, column, cellValue) => {
          return this.type[cellValue] || ""
        },
        status1: (row, column, cellValue) => {
          return this.status1[cellValue] || ""
        },
        status: (row, column, cellValue) => {
          if (row.offstatus == 0) {
            return this.status[3]
          }
          return this.status[cellValue] || ""
        },
      },
      mydata: [],
    }
  };
  list.mounted = function () {
    this.$log("channelInfoManage mounted", this)
    this.initButton(4,12)
    this.getList()
    this.setFilters()
    //this.setTotals()
  }
  list.watch={
    'data':function (val) {
      if(val){
        this.setTotals()
      }
    }
  }
  list.computed.type = function () {
    return channelManage.type;
  };
  list.computed.status1 = function () {
    return channelManage.status1;
  };
  list.computed.status = function () {
    return channelManage.status;
  };
  list.methods.getDatas = function () {
    var dateIsOk = commomMethods.dateIsOk(this.filters.begin_time, this.filters.end_time)
    if (!dateIsOk) {
      this.$alert('开始日期不能大于截止日期', '温馨提示', {
        confirmButtonText: '确定',
        center: true
      })
    }
    if (dateIsOk) {
      this.getList()
    }
  }
  list.methods.setTotals = function () {
    this.loading=true
    this.$http['post']('/getNum/getChannelStatus')
      .then((response) => {
        var data=response.data.data
        this.total0=data[0];
        this.total1=data[2];
        this.total2=data[1]
        this.total3=data.offline
        this.total4=data[3]
        this.loading=false
      })
      .catch((response) => {

      })
  }
  list.methods.setFilters = function () {
    if (this.tabName == '0') {
      this.filters.auditStatus = 0
      this.filters.offstatus = 1
      this.sheetName = '待审核渠道.xlsx'
      this.getList()
    } else if (this.tabName == '1') {
      this.filters.auditStatus = 2
      this.filters.offstatus = 1
      this.sheetName = '审核通过渠道.xlsx'
      this.getList()
    } else if (this.tabName == '2') {
      this.filters.auditStatus = 1
      this.filters.offstatus = 1
      this.sheetName = '审核不通过渠道.xlsx'
      this.getList()
    } else if (this.tabName == '3') {
      this.filters.auditStatus = ''
      this.filters.offstatus = 0
      this.sheetName = '已下线渠道.xlsx'
      this.getList()
    } else if (this.tabName == '4') {
      this.filters.auditStatus = '3'
      this.filters.offstatus = 1
      this.sheetName = '待下线渠道.xlsx'
      this.getList()
    }
  }
  list.methods.setReadStatus = function (index, row,readstatus) {
    var params={idName:'channel_id',
      id:row.channel_id,
      isRead:readstatus,
      tableName:'channelauditstatus',
    }
    this.$http['post']('/getNum/changeRead', params)
      .then((response) => {

      })
      .catch((response) => {

      })
  }
  list.methods.tableRowClassName=function({row, rowIndex}) {
    if (row.isRead== 0) {
      return 'warning-row';
    } else if (row.isRead == 1) {
      return '';
    }
    return '';
  }
  //查看
  list.methods.viewInfo = function (index, row) {
    this.infoManage = false
    var params = {
      action: 'view',
      id: row.channel_id,
      name: row.channel_name,
      status: row.status1,
      offstatus: row.offstatus
    }
    this.$router.push({name: 'channelInfoView', params: params})
  }
  list.methods.updateInfo = function (index, row) {
    this.infoManage = false
    this.$router.push({
      name: 'channelInfoUpdate',
      params: {action: 'update', id: row.channel_id, name: row.channel_name}
    })
  }
  //点击审核
  list.methods.audit = function (index, row) {
    this.channelId = row.channel_id
    this.dialogAudit = true
  }
  //点击下线
  list.methods.offLine = function (index, row) {
    this.channelId = row.channel_id
    this.dialogOffLine = true
  }
  //点击上线
  list.methods.goLine = function (index, row) {
    var params = {
      channel_id: row.channel_id,
      offstatus: 1, status1: 2
    }
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
          this.setReadStatus(index, row,0)
          this.getList()
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
  list.methods.auditOffLine = function (index, row) {
    this.channelId = row.channel_id
    this.dialogAuditOffLine = true
  }
  list.methods.success = function () {
    this.dialogAudit = false;
  }
  list.methods.successOff = function () {
    this.dialogOffLine = false;
  }
  list.methods.successOff2 = function () {
    this.dialogAuditOffLine = false;
  }
  list.methods.closeIt = function () {
    this.getList()
  };
  //导出
  list.methods.formatDatas = function (data) {
    for (var item of data) {
      item.status = this.status[item.status].split(',')[0];
      item.status1 = this.status1[item.status1].split(',')[0];
      item.type = this.type[item.type].split(',')[0];

      delete item.offstatus
      delete item.channel_id
      delete item.isRead
    }
    return data
  }
  export default list
</script>

<style>
  .totalStyle{
    background-color: #f56c6c;
    border-radius: 10px;
    color: #fff;
    font-size: 12px;
    padding: 0 6px;
    text-align: center;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
