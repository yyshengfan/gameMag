<template>
  <div>
    <el-table v-loading="loading"
              :size="$store.state.size"
              :data="data" border
              class="tableBorder thCenter"
              style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="deal_person" label="操作人" min-width="120">
      </el-table-column>
      <el-table-column prop="deal_result" label="操作结果" :formatter="formatter.deal_result" min-width="200">
      </el-table-column>
      <el-table-column prop="remark" label="备注" min-width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="create_time" label="时间" :formatter="formatTableDate" min-width="150"></el-table-column>
    </el-table>
    <el-pagination
      layout="total, prev, next ,jumper"
      @current-change="changePage"
      :current-page="pagination.page"
      :page-size="pagination.size"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import List from '../../common/list'
  import gameOpration from '../../common/store/gameOpration'
  var list = new List({store: gameOpration});

  list.data = function() {
    return {
      loading: false,
      pagination: {
        size:5,
        page: 1
      },
      filters:{gameId:''},
      formatter:{
        deal_result: (row, column,cellValue) => {
          return this.deal_result[cellValue] || ""
        }
      },
    }
  }
  list.computed.deal_result = function(){
    return gameOpration.deal_result;
  };
  list.mounted = function() {
    this.filters.gameId=this.$route.params.id
    this.getList()
  }
  export default list

</script>

<style scoped>
  .el-form .el-form-item {
    margin-bottom: 10px;
  }
  .buttonStyle{
    display: block;margin-top: 3px
  }
</style>
