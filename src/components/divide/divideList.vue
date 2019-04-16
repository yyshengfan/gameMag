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
      <span class="second">分成列表</span>
    </div>
    <el-card class="box-card changeMar MyContainerCon">
      <div style="margin-top: 2rem">
        <div class="searchtable">
          <div>
            <el-date-picker type="date" v-model="filters.stime" style="width: 100%" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd 00:00:00" placeholder="开始时间">
            </el-date-picker>
          </div>
          <div>
            <el-date-picker type="date" v-model="filters.etime" format="yyyy-MM-dd" value-format="yyyy-MM-dd 23:59:59"
                            style="width: 100%" placeholder="结束时间">
            </el-date-picker>
          </div>
          <div>
            <el-select clearable placeholder="状态" style="width:160px;" v-model="filters.status">
              <el-option label="已下线" value="0"></el-option>
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </div>
          <div>
            <el-input placeholder="请输入渠道名称" v-model="filters.company_name"></el-input>
          </div>
          <div>
            <el-button type="primary" style="height: 38px;" icon="el-icon-search" @click="getList"
                       v-show="buttonList.search">查询
            </el-button>
          </div>
          <div>
            <el-button type="primary" style="height: 38px;" icon="el-icon-news" @click="excel()" v-loading="exportLoading"
                       v-show="buttonList.export">导出
            </el-button>
          </div>
        </div>

        <!--表格-->
        <div>
          <el-button type="primary" icon="el-icon-plus" v-show="buttonList.add" @click="add">新增</el-button>
          <div style="margin-top:10px"></div>
          <el-table v-loading="loading"
                    :size="$store.state.size"
                    :data="data" border
                    class="tableBorder thCenter"
                    style="width: 100%">
            <el-table-column
              label="序号"
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="company_name"
              label="公司名称"
              min-width="100"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="rate"
              label="分成比例(游戏：渠道：平台)"
              min-width="120">
              <template slot-scope="scope">
                {{scope.row.rate}}({{scope.row.typename}})
              </template>
            </el-table-column>
            <el-table-column
              prop="ctime"
              :formatter="formatTableDate"
              label="创建时间"
              width="200">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              min-width="80">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  @change="del(scope.$index, scope.row,1)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="190">
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-edit-outline" type="warning"
                           v-show="buttonList.update"
                           @click="view(scope.$index, scope.row)">修改
                </el-button>
                <el-button
                  size="mini" type="danger" icon="el-icon-delete"
                  v-show="buttonList.delete"
                  @click="del(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            layout="total, prev, next ,jumper" P
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
  import divideList from '../../common/store/divideList'

  var list = new List({store: divideList});

  list.data = function () {
    return {
      loading: false,
      exportLoading: false,
      dialogVisible: false,
      routeName: 'divideForm',
      sheetName: '分成数据.xlsx',
      contractOne: {},
      sheetTitle: {
        uuid: '渠道ID',
        customer_id: '公司ID',
        company_name: '渠道名称',
        Rate: '分成比例(游戏：渠道：平台)',
        status: '状态',
        ctime: '创建时间',
      },
      model: {
        reason: '',
        status: '',
      },
      buttonList: {
        search: false,
        export: false,
        add: false,
        delete: false,
        update: false,
      },
      filters: {
        stime: '',
        etime: '',
        status: '',
        company_name: '',
      },
      rules: {
        status: [{required: true, message: '请选择审核状态', trigger: 'change'},]
      },
      formatter: {
        status: (row, column, cellValue) => {
          return this.status[cellValue] || ''
        },
      },
      pagination: {
        size: 10,
        page: 1
      },
    }
  };

  list.mounted = function () {
    this.$log("divide mounted", this)
    this.getList()
    this.initButton(51,53)
  };

  list.computed.status = function () {
    return divideList.status;
  };

  list.watch = {
    data: function (val) {
      for (var item of val) {
        item.status = !!item.status
      }
    }
  }

  // 格式化数据
  list.methods.formatDatas = function (data) {
    for (var item of data) {
      item.status = item.status? '开启':'关闭';
      item.ctime = this.formatDate(item.ctime)
    }
    return data
  }

  // 修改或删除分成
  list.methods.del = function (index, row, type) {
    var model = JSON.parse(JSON.stringify(row))
    var msg = type ? '此操作将修改渠道分成状态, 是否继续?' : '此操作将删除该记录, 是否继续?'
    model.status = type ? (row.status ? 1 : 0) : 2
    this.$confirm(msg, '提示', {
      confirmButtonText: '确定',
      text: msg,
      cancelButtonText: '取消',
      type: 'warning'
    }).then((result) => {
        this.loading = true
        this.$http.post('/auditManage/delRate', model)
          .then((response) => {
            type || this.data.splice(this.data.indexOf(row), 1);
            this.loading = false
          })
          .catch(() => {
            if (type) row.status = !row.status;
            this.loading = false
          })
     
    }).catch((result)=>{
      if (type) row.status = !row.status;
    })
  }

  export default list

</script>

<style scoped>
  .el-form .el-form-item {
    margin-bottom: 10px;
  }
</style>
