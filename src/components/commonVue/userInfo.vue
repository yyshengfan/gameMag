<template>
  <div>
    <el-table v-loading="loading" :size="$store.state.size"
              :data="mydata" border
              class="tableBorder thCenter"
              style="width: 100%">
      <el-table-column prop="loginName" label="账号" min-width="120"></el-table-column>
      <el-table-column prop="role" label="账号类型" :formatter="formatter.role" min-width="120"></el-table-column>
      <el-table-column prop="customerId" label="账号ID" min-width="200"></el-table-column>
     <!--<el-table-column prop="phone" label="CPCode" min-width="180"></el-table-column>-->
      <el-table-column prop="regTime" label="注册时间" :formatter="formatTableDate" min-width="150"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import List from '../../common/list'
  import userInfo from '../../common/store/userInfo'
  var list = new List({store: userInfo});
  list.data = function() {
    return {
      loading: false,
      mydata:[],
      formatter:{
        role: (row, column,cellValue) => {
          return this.role[cellValue] || ""
        }
      },
    }
  }
  list.computed.role = function(){
    return userInfo.role;
  };
  list.mounted = function() {
    this.getInfoSelf()
  }
  //获取账户信息
  list.methods.getInfoSelf=function (){
    var customerId=this.$route.params.id
     this.loading=true;
     this.$http['post']('/MyCenter/getInfoSelf',{customerId:customerId})
       .then((response) => {
        this.mydata=response.data.data
         this.loading=false
       })
       .catch((response) => {
         this.loading=false

       })
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
