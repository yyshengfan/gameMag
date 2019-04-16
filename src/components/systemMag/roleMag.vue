<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/roleMag' }">系统设置</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">角色管理</span>
    </div>
    <el-card class="box-card changeMar MyContainerCon">
      <div style="margin-top: 2rem">
        <div class="searchtable">
          <div>
            <el-date-picker v-model="filters.stime" format="yyyy-MM-dd" value-format="yyyy-MM-dd 00:00:00"
                            type="date" :editable="false" placeholder="请选择开始日期">
            </el-date-picker>
          </div>
          <div>
            <el-date-picker v-model="filters.etime" :editable="false" type="date" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd 23:59:59" placeholder="请选择截止日期">
            </el-date-picker>
          </div>
          <div>
            <el-input v-model="filters.roleName" placeholder="请输入角色名称"></el-input>
          </div>
          <div>
            <el-button type="primary" style="height: 38px;" icon="el-icon-search" @click="getList" v-show="buttonList.search">查询</el-button>
          </div>
        </div>
        <!--表格-->
        <div  style="margin-bottom: 50px">
          <el-button type="primary" icon="el-icon-plus"  @click="add" v-show="buttonList.add">新增</el-button>
          <div style="margin-top:10px"></div>

          <el-table v-loading="loading"
                    :size="$store.state.size"
                    :data="data" border
                    class="tableBorder thCenter"
                    style="width: 100%">
            <el-table-column
              label="序号"
              type="index"
              width="80">
            </el-table-column>
            <el-table-column
              prop="roleName"
              label="角色名称"
              min-width="300"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="ctime"
              label="创建时间"
              width="220"
              :formatter="formatTableDate"
              >
            </el-table-column>
            <el-table-column
              fixed="right"
              min-width="120"
              label="操作"
              >
              <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="remove(scope.$index,scope.row)" v-show="buttonList.delete">删除</el-button>
                <el-button type="primary" size="mini" @click="view(scope.$index,scope.row)" v-show="buttonList.update">编辑</el-button>
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
  import roleList from '../../common/store/roleList'

  var list = new List({store: roleList});

  list.data = function() {
    return {
      routeName: "roleForm",
      rdate:[],
      loading: false,
      buttonList:{
        search:false,
        view:false,
        add:false,
        update:false,
      },
      filters:{
        etime:'',
        stime:'',
        roleName:"",
      },
      pagination: {
        size: 15,
        page: 1
      },
    }
  }

  list.mounted = function() {
    this.$log("roleMag mounted", this)
    this.getList();
    this.initButton(5,14)
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
