<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/activitiesList' }">云闪付</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">数娱专区</span>
    </div>
    <el-card class="box-card" style="padding-bottom: 2rem;">
      <div class="MyContainerCon">
        <div style="margin-top: 2rem">
          <!--筛选器-->
          <div class="searchtable">
            <div>
              <el-input v-model="filters.name" placeholder="请输入名称" clearable></el-input>
            </div>
            <div>
              <el-select v-model="filters.type" placeholder="请选择类型" style="width: 100%" clearable>
                <el-option label="今日游戏" value="1"></el-option>
                <el-option label="游戏排序" value="2"></el-option>
                <el-option label="资讯排序" value="3"></el-option>
                <el-option label="即将开测" value="4"></el-option>
                <el-option label="小弹窗" value="5"></el-option>
                <el-option label="H5游戏" value="6"></el-option>
              </el-select>
            </div>
            <div>
              <el-select v-model="filters.status" placeholder="请选择状态" style="width: 100%" clearable>
                <el-option label="关闭" value="0"></el-option>
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
            <el-table-column prop="name" label="名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="type" label="类型" :formatter="formatter.type">
            </el-table-column>
            <el-table-column prop="status" label="状态"  show-overflow-tooltip>
              <template slot-scope="scope">
                <span :class="scope.row.status=='1'? 'finish-pass':'no-pass'">{{scope.row.status=='1'? '开启':'关闭'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="Sort" label="排序">
              <template slot-scope="scope">
                {{scope.row.sort? scope.row.sort:'-'}}
              </template>
            </el-table-column>
            <el-table-column prop="url" label="跳转url" show-overflow-tooltip>
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
  import entertain from '../../common/store/entertain'

  var list = new List({store: entertain});

  list.data = function() {
    return {
      routeName: "entertainForm",
      rdate:[],
      loading: false,
      buttonList:{
        search:false,
        view:false,
        add:false,
        delete:false,
      },
      filters:{
        type:'',
        name:'',
        status:'',
      },
      pagination: {
        size: 10,
        page: 1
      },
      formatter: {
        type: (row, column, cellValue) => {
          return this.type[cellValue] || ""
        }
      },
    }
  }

  list.mounted = function() {
    this.$log("gameSpecial mounted", this)
    this.initButton(92,124)
    this.getList()
  }
  list.computed.type = function () {
    return entertain.type;
  };
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
