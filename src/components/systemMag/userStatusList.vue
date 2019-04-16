<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/userStatusList' }">系统设置</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">用户状态</span>
    </div>
    <el-card class="box-card" style="padding-bottom: 2rem;">
      <div class="MyContainerCon">
        <div style="margin-top: 2rem">
          <!--筛选器-->
          <div class="searchtable">
            <div>
              <el-select v-model="filters.type" placeholder="请选择用户类型" style="width: 100%">
                <el-option label="CP/渠道方" value="customers"></el-option>
                <el-option label="后台管理" value="users"></el-option>
                <el-option label="游戏用户" value="hallcustomers"></el-option>
              </el-select>
            </div>
            <div>
              <el-input v-model="filters.loginName" placeholder="请输入用户账号" style="width: 100%" clearable></el-input>
            </div>
            <div>
              <el-select v-model="filters.status" placeholder="请选择状态" style="width: 100%" clearable>
                <el-option label="锁定" value="0"></el-option>
                <el-option label="正常" value="1"></el-option>
              </el-select>
            </div>
            <div>
              <el-button type="primary" icon="el-icon-search" @click="getList()"
                         style="height: 38px" v-show="buttonList.search">查询</el-button>
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
            <el-table-column prop="loginName" label="用户名" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="regTime" label="创建时间" :formatter="formatTableDate">
            </el-table-column>
            <el-table-column prop="number" label="锁定次数">
            </el-table-column>
            <el-table-column prop="status" label="状态"  show-overflow-tooltip>
              <template slot-scope="scope">
                <span :class="scope.row.status=='1'? 'finish-pass':'no-pass'">{{scope.row.status=='1'? '正常':'锁定'}}</span>
              </template>
            </el-table-column>

            <el-table-column show-overflow-tooltip  label="操作">
              <template slot-scope="scope">
                <el-button type="danger" class="status" size="mini" @click="delBlock(scope.$index, scope.row)"
                           v-show="buttonList.deblocking" :disabled="scope.row.status=='1'">
                  <i class="el-icon-warning"></i>解锁
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
  import userStatus from '../../common/store/userStatus'

  var list = new List({store: userStatus});

  list.data = function() {
    return {
      loading: false,
      buttonList:{
        search:false,
        deblocking:false,
      },
      filters:{
        type:'customers',
        loginName:'',
        status:'',
      },
      pagination: {
        size: 10,
        page: 1
      },
    }
  }

  list.mounted = function() {
    this.$log("userStatusList mounted", this)
    this.initButton(5,131)
    this.getList()
  }
  list.methods.delBlock = function(index,row){
    var params={type:this.filters.type,loginName:row.loginName}
    this.$confirm("此操作将解锁该用户, 是否继续?！", '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then((result) => {
      this.loading = true
      this.$http.post('/deblocking/deblockingUser', params)
        .then((response) => {
          this.loading = false
          this.$alert('解锁成功！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'success'
          }).then(() => {
            row.number++;
            row.status=1
            return row
          });
        })
        .catch((response) => {
          this.loading = false
          this.$alert('解锁失败！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'error'
          });
        })

    }).catch((result)=>{

    })
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
