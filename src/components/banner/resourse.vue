<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/resourse' }">资源配置</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">资源配置</span>
    </div>
    <el-card class="box-card changeMar MyContainerCon">
      <div style="margin-top: 2rem" v-loading="loading">
        <div class="searchtable">
          <div>
            <el-select v-model="filters.type" placeholder="类型" clearable>
              <el-option :label="type.bannertype" :key="type.id" :value="type.id"
                         v-for="type in resourseType"></el-option>
            </el-select>
          </div>
          <div>
            <el-select v-model="filters.status" placeholder="状态" clearable>
              <el-option label="关闭" key="0" value="0"></el-option>
              <el-option label="开启" key="1" value="1"></el-option>
            </el-select>
          </div>
          <div>
            <el-input v-model="filters.resourseName" placeholder="名称"></el-input>
          </div>
          <div>
            <el-button type="primary" icon="el-icon-search" style="height:38px" @click="getList"
                       v-show="buttonList.search">查询
            </el-button>
          </div>
          <div>
            <el-button type="primary" icon="el-icon-plus" style="height:38px" @click="preAdd"
                       v-show="buttonList.add">新增
            </el-button>
          </div>
        </div>
        <!--表格-->
        <div>
          <div style="margin-top:10px"></div>
          <el-table :size="$store.state.size"
                    :data="data" border
                    class="tableBorder thCenter"
                    style="width: 100%">
            <el-table-column
              label="序号"
              type="index"
              width="70">
            </el-table-column>
            <el-table-column
              prop="resourseName"
              label="名称"
              min-width="200"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              min-width="80"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span :class="scope.row.status=='1'? 'finish-pass':'no-pass'">{{scope.row.status=='1'? '开启':'关闭'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="useChannel"
              label="展示平台"
              min-width="200"
              show-overflow-tooltip>
              <template slot-scope="scope">
                {{initUseChannel(scope.row.useChannel)}}
              </template>
            </el-table-column>
            <el-table-column
              prop="sort"
              label="排序"
              width="70"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="stime"
              label="开始时间"
              width="210"
              :formatter="formatTableDate">
            </el-table-column>
            <el-table-column
              prop="etime"
              label="结束时间"
              width="210"
              :formatter="formatTableDate">
            </el-table-column>
            <el-table-column
              min-width="120"
              label="操作">
              <template slot-scope="scope">
                <el-button class="status" size="mini" @click="view(scope.$index, scope.row)" v-show="buttonList.view"
                           type="primary">
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
  import resourse from '../../common/store/resourse'
  import resourseType from '../../common/store/resourseType'
  import allChannel from '../../common/store/allChannel'

  var list = new List({store: resourse});

  list.data = function () {
    return {
      routeName: "resourseForm",
      rdate: [],
      types: [{id: 1, name: '精品推荐'}, {id: 2, name: '次品推荐'}, {id: 3, name: '残次品推荐'}],
      loading: true,
      buttonList: {
        search: false,
        view: false,
        add: false,
        update: false,
      },
      filters: {
        resourseName: '',
        type: '',
        status: '',
      },
      pagination: {
        size: 15,
        page: 1
      },
    }
  }

  list.mounted = function () {
    this.$log("roleMag mounted", this)
    this.getList();
    this.initButton(123,94);
  }

  list.computed.resourseType = function () {
    return resourseType.data()
  }

  list.computed.allChannel = function () {
    return allChannel.data()
  }

  // 带值
  list.methods.preAdd = function () {
    this.$store.state.bannerType = this.filters.type
    this.add()
  }

  // 获取类型
  list.methods.initUseChannel = function (val) {
    if (val) val = val.split(',')
    else return
    var useChannel = ''
    for (var channel of this.allChannel) {
      for (var va of val) {
        if (va == channel.id) {
          useChannel += '，' + channel.platform
        }
      }
    }
    return useChannel.substring(1)
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
