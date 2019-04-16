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
      <span class="second">用户管理</span>
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
            <el-input v-model="filters.userName" placeholder="请输入用户名称"></el-input>
          </div>
          <div>
            <el-input v-model="filters.tel" :maxlength="11" placeholder="请输入手机号"></el-input>
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
                    style="width: 100%;">
            <el-table-column
              label="序号"
              type="index"
              width="80">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="用户名称"
              min-width="200"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="ctime"
              label="创建时间"
              :formatter="formatTableDate"
              min-width="220">
            </el-table-column>
            <el-table-column
              prop="tel"
              label="电话"
              min-width="200">
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="80">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="view(scope.$index,scope.row)" v-show="buttonList.update">
                  编辑
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
  import userList from '../../common/store/userList'

  var list = new List({store: userList});

  list.data = function() {
    return {
      routeName: "userForm",
      udate:[],
      loading: false,
      buttonList:{
        search:false,
        add:false,
        update:false,
      },
      filters:{
        etime:'',
        stime:'',
        userName:"",
        tel:"",
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
    this.initButton(5,15)
  }

  export default list

</script>

<style>
  .el-table .warning-row {
    /* color: #409DFB; */
    font-weight: 600
  }
  .details{
    background-color: #F0F8FF;
    border-radius: 10px;
  }
</style>
