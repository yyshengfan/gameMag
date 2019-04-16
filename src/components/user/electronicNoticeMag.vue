<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/electronicNoticeMag' }">个人中心</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">电子公告</span>
    </div>

    <el-card class="box-card changeMar MyContainerCon">
      <!--表格-->
      <div style="margin-top: 2rem">
        <div class="searchtable">
          <div>
            <el-date-picker
              v-model="filters.stime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd 00:00:00"
              :editable="false"
              placeholder="请选择开始日期">
            </el-date-picker>
          </div>
          <div>
            <el-date-picker
              v-model="filters.etime"
              :editable="false"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd 23:59:59"
              placeholder="请选择截止日期">
            </el-date-picker>
          </div>
          <div>
            <el-select v-model="filters.rold" clearable>
              <el-option label="开发商/发行商" :value="0"></el-option>
              <el-option label="用户消息" :value="4"></el-option>
              <el-option label="渠道商" :value="1"></el-option>
              <el-option label="官网" :value="2"></el-option>
            </el-select>
          </div>
          <div>
            <el-input v-model="filters.title" placeholder="请输入标题关键词"></el-input>
          </div>
          <div>
            <el-button type="primary" icon="el-icon-search" style="height: 38px" @click="getList" v-show="buttonList.search">查询</el-button>
          </div>
        </div>
        <div class="myTable">
          <el-button type="primary" icon="el-icon-plus" @click="add" v-show="buttonList.add">新增</el-button>
          <div style="margin-top:10px"></div>
          <el-table v-loading="loading"
                    :size="$store.state.size"
                    :data="data" border
                    class="tableBorder thCenter"
                    style="width: 100%">
            <el-table-column
              label="序号"
              type="index"
              width="70">
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题"
              width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="rold"
              label="接收角色"
              width="120">
              <template slot-scope="scope">
                <p>
                  {{ scope.row.rold=='0'? '开发商/发行商':(scope.row.rold=='1'? '渠道商':(scope.row.rold=='2'? '官网':(scope.row.rold=='4'? '用户消息':'开发商/发行商,渠道商'))) }}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              prop="s_time"
              label="发送时间"
              :formatter="formatTableDate"
              width="200">
            </el-table-column>
            <el-table-column
              prop="admin"
              label="操作人"
              min-width="130">
            </el-table-column>
            <el-table-column
              label="发送状态"
              width="110">
              <template slot-scope="scope">
                <p :class="scope.row.status=='1'? 'finish-pass':(scope.row.status=='2')? 'no-pass':'await' ">
                  {{ scope.row.status=='1'? '已发送':(scope.row.status=='2')? '未发送':'暂时保存' }}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              label="操作" min-width="260">
              <template slot-scope="scope">
                <el-button class="status" type="primary" size="mini"
                           @click="$router.push({name:'electronicNoticeMagShow',params:{id:scope.row.noticeId}})">
                  <i class="fa fa-eye"></i>查看
                </el-button>
                <el-button class="status" type="warning" size="mini" @click="edit(scope.$index, scope.row)"
                           v-show="scope.row.status=='1' && buttonList.revoke">
                  <i class="fa fa-arrow-right"></i>撤销
                </el-button>
                <el-button class="status" type="success" size="mini" @click="edit(scope.$index, scope.row)"
                           v-show="scope.row.status!='1' && buttonList.update">
                  <i class="el-icon-edit"></i>编辑
                </el-button>
                <el-button type="danger" icon="fa fa-times" class="status" size="mini"
                           @click="del(scope.$index, scope.row)" v-show="buttonList.delete">
                  删除
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
  import Form from '../../common/form'
  import electronicNotice from '../../common/store/electronicNotice'

  var list = new List({store: electronicNotice});
  var form = new Form({store: electronicNotice});

  var excelName = '电子公告明细表'
  list.data = function () {
    return {
      routeName: "electronicNoticeMagAdd",
      loading: false,
      details: '',
      title: '',
      edate: [],
      buttonList: {
        search: false,
        add: false,
        view: false,
        delete: false,
        revoke: false,
        update: false,
      },
      dialogVisible: false,
      showDetails: false,
      filters: {
        rold: "",
        title: "",
        stime: '',
        etime: ''
      },
      pagination: {
        type: 0,
        size: 10,
        page: 1
      },
    }
  }

  list.mounted = function () {
    this.$log("electronicNotice mounted", this)
    this.getList();
    this.initButton(2,6)
  }

  // 删除电子公告
  list.methods.del = function (index, row) {
    var model = _.clone(row)
    model.status = 0
    this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then((result) => {
      this.loading = true
      electronicNotice.delete(model, (data) => {
        this.loading = false;
      }, () => {
        this.loading = false
      })
    })
  }

  // 编辑和撤销电子公告
  list.methods.edit = function (index, row) {
    var model = _.clone(row)

    if (model.status != '1') {
      this.view(index, model)
    } else {
      this.$confirm('此操作将撤销该记录, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then((result) => {
      model.status = 2
      this.model = model
      this.loading = true
      electronicNotice.update(model, (data) => {
        this.loading = false;
      }, () => {
        this.loading = false
      })
    },()=>{})
    }
  }
  export default list

</script>

<style>
  .el-table .warning-row {
    color: #409DFB;
    font-weight: 600
  }

  .details {
    background-color: #F0F8FF;
    border-radius: 10px;
  }
</style>
