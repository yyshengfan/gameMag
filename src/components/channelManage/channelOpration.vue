<template>
  <div>
    <el-table v-loading="loading"
              :size="$store.state.size"
              :data="data" border
              class="tableBorder thCenter"
              style="width: 100%">
      <el-table-column type="index" label="序号" width="70"></el-table-column>
      <el-table-column prop="deal_person" label="操作人" min-width="120">
      </el-table-column>
      <el-table-column prop="deal_result" label="操作结果" :formatter="formatter.deal_result" min-width="200">
      </el-table-column>
      <el-table-column prop="remark" label="备注" min-width="180"></el-table-column>
      <el-table-column prop="create_time" label="时间" :formatter="formatTableDate" width="200"></el-table-column>
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
  import chanelOpration from '../../common/store/channelOpration'
  var list = new List({store: chanelOpration});
  list.props= ['channel_id']
  list.data = function() {
    return {
      loading: false,
      pagination: {
        size:5,
        page: 1
      },
      filters:{channel_id:''},
      formatter:{
        deal_result: (row, column,cellValue) => {
          return this.deal_result[cellValue] || ""
        }
      },
    }
  }
  list.watch={
    'channel_id':function (newVal,oldVal) {
      this.filters.channel_id=newVal
      this.getList()
    }
  }
  list.computed.deal_result = function(){
    return chanelOpration.deal_result;
  };

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
