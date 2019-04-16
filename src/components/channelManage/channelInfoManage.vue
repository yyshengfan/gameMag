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
      <span class="second">资质管理</span>
    </div>

    <el-card class="box-card changeMar MyContainerCon">
      <!--表格-->
      <div v-loading="loading">
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
        </el-radio-group>
        <!--筛选器-->
        <div style="margin-top: 2rem" class="searchtable">
          <div>
            <el-date-picker style="width: 100%" :editable="false" clearable v-model="filters.begin_time"
                            type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd 00:00:00" placeholder="开始日期">
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
                       style="height: 38px;">查询
            </el-button>
          </div>
          <div>
            <el-button type="primary" icon="el-icon-news" v-loading="exportLoading" v-on:click="excel()" style="height: 38px;">
              导出
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
            <el-table-column prop="reg_capital" label="注册资金/万" show-overflow-tooltip width="160">
            </el-table-column>
            <el-table-column prop="com_province" label="公司所在省" show-overflow-tooltip width="160">
            </el-table-column>
            <el-table-column prop="com_city" label="公司所在市" show-overflow-tooltip width="160">
            </el-table-column>
            <el-table-column prop="create_time" label="时间" show-overflow-tooltip
                             width="200">
            </el-table-column>
            <el-table-column prop="type" label="资质状态" :formatter="formatter.type" show-overflow-tooltip width="120">
              <div slot-scope="scope" class="name-wrapper">
                <p  :class="type[scope.row.type].split(',')[1]">
                  <!--<i :class="type[scope.row.type].split(',')[2]"></i>-->
                  {{type[scope.row.type].split(',')[0]}}
                </p>
              </div>
            </el-table-column>
            <el-table-column prop="t_status" label="审核状态" :formatter="formatter.t_status" show-overflow-tooltip
                             width="120">
              <div slot-scope="scope" class="name-wrapper">
                <p  :class="t_status[scope.row.t_status].split(',')[1]">
                  <!--<i :class="t_status[scope.row.t_status].split(',')[2]"></i>-->
                  {{t_status[scope.row.t_status].split(',')[0]}}
                </p>
              </div>
            </el-table-column>
            <el-table-column label="操作" width="170px">
              <template slot-scope="scope">
                <el-button class="status" size="mini" type="primary" v-if="buttonList.view"
                           @click="viewInfo(scope.$index, scope.row);setReadStatus(scope.$index, scope.row,1)">
                  <i class="fa fa-eye"></i>查看
                </el-button>
                <!-- <el-button size="mini" type="warning" @click="updateInfo(scope.$index, scope.row)">修改</el-button>-->
                <el-button class="status" size="mini" type="warning" v-if="buttonList.audit && scope.row.t_status=='0'"
                           @click="audit(scope.$index, scope.row);setReadStatus(scope.$index, scope.row,1)"><i class="el-icon-edit-outline"></i>审核
                </el-button>
                <el-button class="status" icon="fa fa-times"
                           size="mini" v-if="buttonList.offline && scope.row.t_status=='8' && scope.row.offstatus=='1'"
                           type="warning" @click="offLine(scope.$index, scope.row);setReadStatus(scope.$index, scope.row,1)">下线
                </el-button>
                <el-button class="status" size="mini" v-if="buttonList.online && scope.row.offstatus=='0'"
                           type="success" icon="fa fa-cart-plus"
                           @click="goLine(scope.$index, scope.row);setReadStatus(scope.$index, scope.row,1)">上线
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
      <channelInfoAudit v-bind:dialogAudit="dialogAudit"
                        v-bind:customerId="customerId"
                        v-on:success="success()">
      </channelInfoAudit>
    </el-dialog>
    <el-dialog class="MyModelremove" :visible.sync="dialogOffLine" :width="$store.state.isMobile?'90%':'70%'"
               @close="closeIt()">
      <channelInfoOffline v-bind:dialogOffLine="dialogOffLine"
                          v-bind:customerId="customerId"
                          v-on:successOff="successOff()">
      </channelInfoOffline>
    </el-dialog>
    <router-view></router-view>
  </div>
</template>

<script>
  import List from '../../common/list'
  import channelInfoAudit from './channelInfoAudit.vue'
  import channelInfoOffline from './channelInfoOffline.vue'

  var commomMethods = require('../../common/commonMethods')
  import channelInfoManage from '../../common/store/channelInfoManage'

  var list = new List({store: channelInfoManage});
  list.components = {
    'channelInfoAudit': channelInfoAudit,
    'channelInfoOffline': channelInfoOffline
  };
  list.data = function () {
    return {
      routeName: "channelInfoForm",
      tabName: "0",
      maxTotal:99,
      total0:'',total1:'',total2:'',total3:'',
      dialogAudit: false,
      dialogOffLine: false,
      customerId: '',
      loading: false,
      exportLoading:false,
      pagination: {
        limit: 10,
        page: 1,
      },
      sheetName: '',
      sheetTitle: {
        company_name: '公司名称',
        reg_capital: '注册资金/万',
        com_province: '公司所在省',
        com_city: '公司所在市',
        create_time: '时间',
        type: '资质状态',
        t_status: '审核状态',
      },
      filters: {
        type: 1,
        Companyname: '',
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
      },
      mydata: [],
      formatter: {
        t_status: (row, column, cellValue) => {
          return this.t_status[cellValue] || ""
        },
        type: (row, column, cellValue) => {
          if (row.offstatus == 0) {
            return this.type[3]
          }
          return this.type[cellValue] || ""
        },
      },
    }
  };
  list.mounted = function () {
    this.$log("channelInfoManage mounted", this)
    this.initButton(4,11)
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
  list.computed.t_status = function () {
    return channelInfoManage.t_status;
  };
  list.computed.type = function () {
    return channelInfoManage.type;
  };
  list.methods.getDatas = function () {
    var dateIsOk = commomMethods.dateIsOk(this.filters.startTime, this.filters.endTime)
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
    var params={type:this.filters.type}
    this.$http['post']('/getNum/aptitudeMag', params)
      .then((response) => {
        var data=response.data.data
        this.total0=data[0];
        this.total1=data[8];
        this.total2=data.aptitudeNO;
        this.total3=data.offline;
        this.loading=false;
      })
      .catch((response) => {

      })
  }
  list.methods.setReadStatus = function (index, row,readstatus) {
    var params={idName:'customerId',
      id:row.customerId,
      isRead:readstatus,
      tableName:'auditstatus',
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
  list.methods.setFilters = function () {
    if (this.tabName == '0') {
      this.filters.auditStatus = 0
      this.filters.offstatus = 1
      this.sheetName = '待审核渠道资质.xlsx'
      this.getList()
    } else if (this.tabName == '1') {
      this.filters.auditStatus = 8
      this.filters.offstatus = 1
      this.sheetName = '审核通过渠道资质.xlsx'
      this.getList()
    } else if (this.tabName == '2') {
      this.filters.auditStatus = 3
      this.filters.offstatus = 1
      this.sheetName = '审核不通过渠道资质.xlsx'
      this.getList()
    } else if (this.tabName == '3') {
      this.filters.auditStatus = ''
      this.filters.offstatus = 0
      this.sheetName = '已下线渠道资质.xlsx'
      this.getList()
    }

  }
  //查看
  list.methods.viewInfo = function (index, row) {
    this.infoManage = false
    var params = {
      action: 'view', id: row.customerId, name: row.company_name, status: row.t_status, offstatus: row.offstatus
    }
    this.$router.push({name: 'channelInfoForm', params: params})
  }
  //修改
  list.methods.updateInfo = function (index, row) {
    this.infoManage = false
    this.$router.push({name: 'channelInfoForm', params: {action: 'update', id: row.customerId, name: row.company_name}})
  }
  //点击审核
  list.methods.audit = function (index, row) {
    this.customerId = row.customerId
    this.dialogAudit = true
  }
  //点击下线
  list.methods.offLine = function (index, row) {
    this.customerId = row.customerId
    this.dialogOffLine = true
  }
  //点击上线
  list.methods.goLine = function (index, row) {
    var customerId = row.customerId
    var offstatus = 1
    this.$confirm('此操作将上线该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.loading = true
      this.setReadStatus(index, row,0)
      this.$http['post']('/auditManage/infoAudit', {customerId: customerId, offstatus: offstatus})
        .then((response) => {
          this.$alert('上线成功！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'success'
          });
          this.loading = false
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
  list.methods.success = function () {
    this.dialogAudit = false;
  }
  list.methods.successOff = function () {
    this.dialogOffLine = false;
  }
  list.methods.closeIt = function () {
    this.getList()
  };
  //导出
  list.methods.formatDatas = function (data) {
    for (var item of data) {
      item.t_status = this.t_status[item.t_status].split(',')[0];
      item.type = this.type[item.type].split(',')[0];
      delete item.offstatus
      delete item.customerId
      delete item.status1
      delete item.status2
      delete item.status3
      delete item.status4
      delete item.status5
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
