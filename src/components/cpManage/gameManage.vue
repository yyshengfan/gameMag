<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/infoManage' }">CP管理</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">游戏管理</span>
    </div>
    <el-card class="box-card changeMar MyContainerCon">
      <!--表格-->
      <div v-loading="loading">
        <el-radio-group class="tabGroupCon" v-model="tabName" style="margin-bottom: 30px;" @change="setFilters();">
          <el-radio-button class="tabGroup-tabs" label="0">待审核
            <span v-if="total0" class="totalStyle">{{total0<=maxTotal?total0:maxTotal+'+'}}</span>
          </el-radio-button>

          <el-radio-button class="tabGroup-tabs" label="1">审核不通过
            <span v-if="total1" class="totalStyle">{{total1<=maxTotal?total1:maxTotal+'+'}}</span>
          </el-radio-button>
          <el-radio-button class="tabGroup-tabs" label="2">待测试
            <span v-if="total2" class="totalStyle">{{total2<=maxTotal?total2:maxTotal+'+'}}</span>
          </el-radio-button>
          <el-radio-button class="tabGroup-tabs" label="3">测试不通过
            <span v-if="total3" class="totalStyle">{{total3<=maxTotal?total3:maxTotal+'+'}}</span>
          </el-radio-button>
          <el-radio-button class="tabGroup-tabs" label="4">待商用
            <span v-if="total4" class="totalStyle">{{total4<=maxTotal?total4:maxTotal+'+'}}</span>
          </el-radio-button>
          <el-radio-button class="tabGroup-tabs" label="5">商用
            <span v-if="total5" class="totalStyle">{{total5<=maxTotal?total5:maxTotal+'+'}}</span>
          </el-radio-button>
          <el-radio-button class="tabGroup-tabs" label="6">已下线
            <span v-if="total6" class="totalStyle">{{total6<=maxTotal?total6:maxTotal+'+'}}</span>
          </el-radio-button>
          <el-radio-button class="tabGroup-tabs" label="7">待下线
            <span v-if="total7" class="totalStyle">{{total7<=maxTotal?total7:maxTotal+'+'}}</span>
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
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd  23:59:59" placeholder="截止日期">
            </el-date-picker>
          </div>
          <div>
            <el-input v-model="filters.gName" placeholder="输入游戏名称" style="width: 100%" clearable></el-input>
          </div>
          <div>
            <el-button type="primary" icon="el-icon-search" v-on:click="getDatas()" style="height: 38px;">查询</el-button>
          </div>
          <div>
            <el-button type="primary" icon="el-icon-news" v-on:click="excel()" v-loading="exportLoading" style="height: 38px;">导出</el-button>
          </div>
        </div>
        <div class="myTable">
          <el-table size="$store.state.size"
                    :data="data" border
                    class="tableBorder thCenter"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
            <el-table-column type="index" width="70" label="序号"></el-table-column>
            <el-table-column prop="Companyname"  label="公司名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="gName"  label="游戏名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="gameId"  label="游戏ID">
            </el-table-column>
            <el-table-column prop="status" label="游戏状态" :formatter="formatter.status" show-overflow-tooltip width="140">
              <div slot-scope="scope" class="name-wrapper">
                <p v-if='scope.row.offstatus==0'  :class="status[7].split(',')[1]">
                  <!--<i :class="state[7].split(',')[2]"></i>-->
                  {{status[7].split(',')[0]}}
                </p>
                <p v-else  :class="status[scope.row.status].split(',')[1]">
                  <!--<i :class="state[scope.row.state].split(',')[2]"></i>-->
                  {{status[scope.row.status].split(',')[0]}}
                </p>
                <!--<p style="cursor: pointer;" :class="status[scope.row.status].split(',')[1]">
                  &lt;!&ndash;<i :class="status[scope.row.status].split(',')[2]"></i>&ndash;&gt;
                  {{status[scope.row.status].split(',')[0]}}
                </p>-->
              </div>
            </el-table-column>
            <el-table-column prop="grade" label="游戏评级" :formatter="formatter.grade" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="infostatus" label="信息更新"  :formatter="formatter.infostatus" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="ctime" label="更新时间" :formatter="formatTableDate" show-overflow-tooltip width="200">
            </el-table-column>

            <el-table-column label="操作" width="200px">
              <template slot-scope="scope">
                <el-button class="status" v-if="buttonList.view" size="mini" type="primary" @click="viewInfo(scope.$index, scope.row);setReadStatus(scope.$index, scope.row,1)">
                  <i class="fa fa-eye"></i>查看
                </el-button>
                <!--  <el-button size="mini" type="warning" @click="updateInfo(scope.$index, scope.row)">修改</el-button>-->
                <el-button class="status" v-if="buttonList.lever && scope.row.status=='0' && !scope.row.grade || scope.row.grade=='0'"
                           size="mini" type="warning" @click="lever(scope.$index, scope.row);setReadStatus(scope.$index, scope.row,1)">
                  <i class="fa fa-balance-scale"></i>评级
                </el-button>
                <el-button class="status" v-if="buttonList.audit && scope.row.status=='0' && scope.row.grade && scope.row.grade!='0'"
                           size="mini" type="warning" @click="audit(scope.$index, scope.row);setReadStatus(scope.$index, scope.row,1)">
                  <i class="el-icon-edit-outline"></i>审核
                </el-button>
                <el-button class="status" v-if="buttonList.offline && scope.row.status=='5' && scope.row.offstatus=='1'" size="mini"
                           type="warning" @click="offLine(scope.$index, scope.row);setReadStatus(scope.$index, scope.row,1)">
                  <i class="fa fa-times"></i>下线
                </el-button>
                <el-button class="status"v-if="buttonList.test && scope.row.status=='2' && scope.row.offstatus=='1'"
                           size="mini" type="warning" @click="test(scope.$index, scope.row);setReadStatus(scope.$index, scope.row,1)" :disabled="scope.row.teststatus=='0'" >
                  <i class="el-icon-edit-outline"></i>测试
                </el-button>
                <el-button class="status" v-if="buttonList.doit && scope.row.status=='4' && scope.row.offstatus=='1'"
                           size="mini" type="danger" @click="doIt(scope.$index, scope.row);setReadStatus(scope.$index, scope.row,1)">
                  <i class="fa fa-comments-o"></i>商用
                </el-button>
                <el-button class="status" v-if="buttonList.online && scope.row.offstatus=='0'" size="mini" type="success"
                           @click="goLine(scope.$index, scope.row);setReadStatus(scope.$index, scope.row,1)">
                  <i class="el-icon-upload"></i>上线
                </el-button>
                <el-button class="status" v-if="buttonList.auditOffline && scope.row.status=='6' && scope.row.offstatus=='1'"
                           size="mini" type="info" @click="auditOffLine(scope.$index, scope.row);setReadStatus(scope.$index, scope.row,1)">
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
    <el-dialog class="MyModelremove" :visible.sync="dialogAudit" :width="$store.state.isMobile?'90%':'70%'" @close="closeIt()">
      <gameAudit v-bind:dialogUpdate = "dialogAudit"
                 v-bind:gameId="gameId"
                 v-on:success="success($event)">
      </gameAudit>
    </el-dialog>
    <el-dialog class="MyModelremove" :visible.sync="dialogLever" :width="$store.state.isMobile?'90%':'70%'" @close="closeIt()">
      <gameLever v-bind:dialogLever = "dialogLever"
                 v-bind:gameId="gameId"
                 v-on:successLever="successLever()">
      </gameLever>
    </el-dialog>
    <el-dialog class="MyModelremove" :visible.sync="dialogOffLine" :width="$store.state.isMobile?'90%':'70%'" @close="closeIt()">
      <gameOffline v-bind:dialogOffLine = "dialogOffLine"
                   v-bind:gameId="gameId"
                   v-on:successOff="successOff($event)">
      </gameOffline>
    </el-dialog>
    <el-dialog class="MyModelremove" :visible.sync="dialogAuditOffLine" :width="$store.state.isMobile?'90%':'70%'" @close="closeIt()">
      <gameAuditOffLine v-bind:dialogAuditOffLine = "dialogAuditOffLine"
                        v-bind:gameId="gameId"
                        v-on:successOff2="successOff2($event)">
      </gameAuditOffLine>
    </el-dialog>
    <router-view></router-view>
  </div>
  <!--<div>
    <el-card class="box-card" v-show="infoManage">
      &lt;!&ndash;筛选器&ndash;&gt;
      <div slot="header" class="clearfix">
       &lt;!&ndash; <p style="font-size: 16px;font-weight: 600;color: #2B6A65">CP管理-游戏管理</p>&ndash;&gt;
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/infoManage' }">CP管理</el-breadcrumb-item>
          <el-breadcrumb-item>游戏管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-loading="loading">
        <div style="text-align: center;border-bottom: 1px solid #EBEEF5">
          <el-radio-group v-model="tabName" style="margin-bottom: 30px;" @change="setFilters()">
            <el-radio-button label="0">待审核</el-radio-button>
            &lt;!&ndash;<el-radio-button label="1">审核通过</el-radio-button>&ndash;&gt;
            <el-radio-button label="1">审核不通过</el-radio-button>
            <el-radio-button label="2">待测试</el-radio-button>
            <el-radio-button label="3">测试不通过</el-radio-button>
            <el-radio-button label="4">待商用</el-radio-button>
            <el-radio-button label="5">商用</el-radio-button>
            <el-radio-button label="6">已下线</el-radio-button>
            <el-radio-button label="7">待下线</el-radio-button>
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
                    value-format="yyyy-MM-dd  23:59:59"
                    placeholder="截止日期">
                  </el-date-picker>
                </div>
              </template>
            </el-col>
            <el-col :xs="12" :sm="{span: 4, offset: 0}">
              <el-input v-model="filters.gName" placeholder="输入游戏名称" style="width: 103%" clearable></el-input>
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
              <el-table-column prop="Companyname"  label="公司名称" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="gName"  label="游戏名称" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="status" label="游戏状态" :formatter="formatter.status" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="grade" label="游戏评级" :formatter="formatter.grade" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="infostatus" label="信息更新"  :formatter="formatter.infostatus" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="ctime" label="更新时间" :formatter="formatTableDate" show-overflow-tooltip>
              </el-table-column>

              <el-table-column label="操作" width="180px">
                <template slot-scope="scope">
                  <el-button v-if="buttonList.view" size="mini" type="primary" @click="viewInfo(scope.$index, scope.row)">查看</el-button>
                  &lt;!&ndash;  <el-button size="mini" type="warning" @click="updateInfo(scope.$index, scope.row)">修改</el-button>&ndash;&gt;
                  <el-button v-if="buttonList.lever && scope.row.status=='0' && !scope.row.grade || scope.row.grade=='0'" size="mini" type="success" @click="lever(scope.$index, scope.row)">评级</el-button>
                  <el-button v-if="buttonList.audit && scope.row.status=='0' && scope.row.grade && scope.row.grade!='0'" size="mini" type="success" @click="audit(scope.$index, scope.row)">审核</el-button>
                  <el-button v-if="buttonList.offline && scope.row.status=='5' && scope.row.offstatus=='1'" size="mini" type="success" @click="offLine(scope.$index, scope.row)">下线</el-button>
                  <el-button v-if="buttonList.test && scope.row.status=='2' && scope.row.offstatus=='1'" size="mini" type="success" @click="test(scope.$index, scope.row)" :disabled="scope.row.teststatus=='0'">测试</el-button>
                  <el-button v-if="buttonList.doit && scope.row.status=='4' && scope.row.offstatus=='1'" size="mini" type="success" @click="doIt(scope.$index, scope.row)">商用</el-button>
                  <el-button v-if="buttonList.online && scope.row.offstatus=='0'" size="mini" type="success" @click="goLine(scope.$index, scope.row)">上线</el-button>
                  <el-button v-if="buttonList.auditOffline && scope.row.status=='6' && scope.row.offstatus=='1'" size="mini" type="success" @click="auditOffLine(scope.$index, scope.row)">下线审核</el-button>
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
      <gameAudit v-bind:dialogUpdate = "dialogAudit"
                 v-bind:gameId="gameId"
                        v-on:success="success()">
      </gameAudit>
    </el-dialog>
    <el-dialog  :visible.sync="dialogLever" :width="$store.state.isMobile?'90%':'70%'" @close="closeIt()" center>
      <gameLever v-bind:dialogLever = "dialogLever"
                 v-bind:gameId="gameId"
                 v-on:successLever="successLever()">
      </gameLever>
    </el-dialog>
    <el-dialog  :visible.sync="dialogOffLine" :width="$store.state.isMobile?'90%':'70%'" @close="closeIt()" center>
      <gameOffline v-bind:dialogOffLine = "dialogOffLine"
                 v-bind:gameId="gameId"
                 v-on:successOff="successOff()">
      </gameOffline>
    </el-dialog>
    <el-dialog  :visible.sync="dialogAuditOffLine" :width="$store.state.isMobile?'90%':'70%'" @close="closeIt()" center>
      <gameAuditOffLine v-bind:dialogAuditOffLine = "dialogAuditOffLine"
                   v-bind:gameId="gameId"
                   v-on:successOff2="successOff2()">
      </gameAuditOffLine>
    </el-dialog>
    <router-view></router-view>
  </div>-->

</template>

<script>
  import List from '../../common/list'
  import gameAudit from './gameAudit.vue'
  import gameLever from './gameLever.vue'
  import gameOffline from './gameOffline.vue'
  import gameAuditOffLine from './gameAuditOffLine.vue'
  var commomMethods= require('../../common/commonMethods')
  import gameManage from '../../common/store/gameManage'

  var list = new List({store: gameManage});
  list.components = {
    'gameAudit': gameAudit,
    'gameLever': gameLever,
    'gameOffline': gameOffline,
    'gameAuditOffLine':gameAuditOffLine,
  };
  list.data=function () {
    return {
      routeName: "gameInfoForm",
      tabName:"0",
      maxTotal:99,
      total0:'',total1:'',total2:'',total3:'', total4:'',total5:'',total6:'',total7:'',
      dialogAudit:false,
      dialogLever:false,
      dialogOffLine:false,
      dialogAuditOffLine:false,
      resStatus:'',
      gameId:'',
      loading: false,
      exportLoading: false,
      pagination: {
        limit:10,
        page: 1,
      },
      sheetName:'',
      sheetTitle: {
        Companyname:'公司名称',
        gName:'游戏名称',
        status:'游戏状态',
        grade:'游戏评级',
        infostatus:'信息更新',
        ctime:'更新时间',
      },
      filters: {
        gName:'',
        begin_time:'',
        end_time:'',
        auditStatus:0,
        offstatus:1,
      },
      buttonList:{
        search:false,
        audit:false,
        view:false,
        offline:false,
        export:false,
        online:false,
        auditOffline:false,
        test:false,
        doit:false,
        lever:false
      },
      mydata:[],
      formatter:{
        status: (row, column,cellValue) => {
          if(row.offstatus===0){
            return this.status[7]
          }
          return this.status[cellValue] || ""
        },
        grade: (row, column,cellValue) => {
          return this.grade[cellValue] || ""
        },
        infostatus:(row, column,cellValue) => {
          return this.infostatus[cellValue] || ""
        },
      },
    }
  };
  list.mounted=function () {
    this.$log("gameManage mounted", this)
    this.initButton(3,9)
    this.getRes()
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
  list.computed.status = function(){
    return gameManage.status;
  };
  list.computed.grade = function(){
    return gameManage.grade;
  };
  list.computed.infostatus = function(){
    return gameManage.infostatus;
  };
  list.methods.getDatas=function () {
    var dateIsOk=commomMethods.dateIsOk(this.filters.begin_time,this.filters.end_time)
    if(!dateIsOk){
      this.$alert('开始日期不能大于截止日期', '温馨提示', {
        confirmButtonText: '确定',
        center: true
      })
    }
    if(dateIsOk){
      this.getList()
    }
  }
  list.methods.setReadStatus = function (index, row,readstatus) {
    var params={idName:'gameId',
                id:row.gameId,
                isRead:readstatus,
                tableName:'gameauditstatus',
              }
    this.$http['post']('/getNum/changeRead', params)
      .then((response) => {

      })
      .catch((response) => {

      })
  }
  list.methods.setTotals = function () {
    this.loading=true
    this.$http['post']('/getNum/getGameStatus')
      .then((response) => {
        var data=response.data.data
        this.total0=data[0];
        this.total1=data[1];
        this.total2=data[2];
        this.total3=data[3];
        this.total4=data[4];
        this.total5=data[5];
        this.total6=data.offline;
        this.total7=data[6];
        this.loading=false
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
  list.methods.setFilters=function () {
    if(this.tabName=='0'){
      this.filters.auditStatus=0
      this.filters.offstatus=1
      this.sheetName='待审核游戏.xlsx'
      this.getList()
    }else if(this.tabName=='1'){
      this.filters.auditStatus=1
      this.filters.offstatus=1
      this.sheetName='审核不通过游戏.xlsx'
      this.getList()
    }else if(this.tabName=='2'){
      this.filters.auditStatus=2
      this.filters.offstatus=1
      this.sheetName='待测试游戏.xlsx'
      this.getList()
    }else if(this.tabName=='3'){
      this.filters.auditStatus=3
      this.filters.offstatus=1
      this.sheetName='测试不通过游戏.xlsx'
      this.getList()
    }else if(this.tabName=='4'){
      this.filters.auditStatus=4
      this.filters.offstatus=1
      this.sheetName='待商用游戏.xlsx'
      this.getList()
    }else if(this.tabName=='5'){
      this.filters.auditStatus=5
      this.filters.offstatus=1
      this.sheetName='商用游戏.xlsx'
      this.getList()
    }else if(this.tabName=='6'){
      this.filters.auditStatus=null
      this.filters.offstatus=0
      this.sheetName='已下线游戏.xlsx'
      this.getList()
    }else if(this.tabName=='7'){
      this.filters.auditStatus=6
      this.filters.offstatus=1
      this.sheetName='带下线游戏.xlsx'
      this.getList()
    }
  }
  //查看
  list.methods.viewInfo=function (index, row) {
    this.infoManage = false
    var params={action:'view',
      id:row.gameId,
      gName:row.gName,
      status:row.status,
      grade:row.grade,
      offstatus:row.offstatus,
      teststatus:row.teststatus}
    this.$router.push({name:'gameInfoForm',params:params})
  }
  //修改
  list.methods.updateInfo=function (index, row) {
    this.infoManage = false
    this.$router.push({name:'gameInfoForm',params:{action:'update',id:row.gameId,gName:row.gName}})
  }
  //点击审核
  list.methods.audit=function (index, row){
    this.gameId=row.gameId
    this.dialogAudit=true
  }
  //点击测试
  list.methods.test=function (index, row){
    this.infoManage = false
    this.$router.push({name:'gameTestInfo',params: {id: row.gameId,gName:row.gName}})
  }
  //点击评级
  list.methods.lever=function (index, row){
    this.gameId=row.gameId
    this.dialogLever=true
  }
  //点击下线
  list.methods.offLine=function (index, row){
    this.gameId=row.gameId
    this.dialogOffLine=true
  }
  //点击下线审核
  list.methods.auditOffLine=function (index, row){
    this.gameId=row.gameId
    this.dialogAuditOffLine=true
  }
  ////点击商用
  list.methods.doIt=function (index, row){
    var gameId = row.gameId
    var status = 5
    this.$confirm('此操作将商用该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.loading = true
      this.$http['post']('/auditManage/gameInfoAudit', {gameId: gameId, auditStatus: status})
        .then((response) => {
          this.loading = false
          this.setReadStatus(index, row,0)
          this.$alert('商用成功！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'success'
          }).then(() => {
            this.filters.auditStatus=5
            this.filters.offstatus=1
            this.tabName='5'
            this.getList()
          });
        })
        .catch((response) => {
          this.$alert('商用失败！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'error'
          });
          this.loading = false
        })
    })
  }
  //点击上线
  list.methods.goLine=function (index, row) {
    var gameId = row.gameId
    var offstatus = 1
    this.$confirm('此操作将上线该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.loading = true
      this.$http['post']('/auditManage/gameInfoAudit', {gameId: gameId, offstatus: offstatus,auditStatus: 5})
        .then((response) => {
          this.loading = false
          this.setReadStatus(index, row,0)
          this.$alert('上线成功！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'success'
          }).then(() => {
            this.filters.auditStatus=5
            this.filters.offstatus=1
            this.tabName='5'
            this.getList()
          });;
        })
        .catch((response) => {
          this.$alert('上线失败！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'error'
          });
          this.loading = false
        })
    })
  }
  //测试成功
  list.methods.getRes=function (){
    if(this.$route.params.status==undefined){
      return
    }else{
      this.resStatus=this.$route.params.status
      if(this.resStatus==true){//测试通过
        this.filters.auditStatus=4
        this.tabName='4'
      }else if(this.resStatus==3){//待测试
        this.filters.auditStatus=2
        this.tabName='2'
      }else if(this.resStatus==false && this.resStatus!=''){//测试不通过
        this.filters.auditStatus=3
        this.tabName='3'
      }else if(this.resStatus==5){//商用成功
        this.filters.auditStatus=5
        this.tabName='5'
      }else if(this.resStatus==8){//审核通过
        this.filters.auditStatus=2
        this.tabName='2'
      }else if(this.resStatus==9){//审核不通过
        this.filters.auditStatus=1
        this.tabName='1'
      } else if(this.resStatus==6){//立即下线
        this.filters.offstatus=0
        this.filters.auditStatus=5
        this.tabName='6'
      }
      /* this.filters.offstatus=1*/
    }

  }
  //审核成功
  list.methods.success=function (res){
    this.dialogAudit = false;
    if(res){
      this.resStatus=res
      if(this.resStatus==8){
        this.filters.auditStatus=2
        this.tabName='2'
      }else{
        this.filters.auditStatus=1
        this.tabName='1'
      }
      this.filters.offstatus=1
    }
  }
  //立即下线成功
  list.methods.successOff=function (res){
    this.dialogOffLine = false;
    if(res) {
      this.filters.offstatus = 0
      this.tabName = '6'
    }
  }
  list.methods.successOff2=function (res){
    this.dialogAuditOffLine = false;
    if(res){
      this.resStatus=res
      if(this.resStatus==6){
        this.filters.offstatus = 0
        this.tabName = '6'
      }else{
        this.filters.auditStatus=5
        this.tabName='5'
      }
    }
  }
  list.methods.successLever=function (){
    this.dialogLever = false;
  }
  list.methods.closeIt=function () {
    this.getList()
  };
  //导出
  list.methods.formatDatas = function(data){
    for(var item of data){
      item.status = this.status[item.status].split(',')[0];
      item.grade = this.grade[item.grade].split(',')[0];
      item.infostatus = this.infostatus[item.infostatus].split(',')[0];
      item.ctime = this.formatDate(item.ctime)

      delete item.offstatus
      delete item.gameId
      delete item.teststatus
      delete item.create_time
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
</style>
