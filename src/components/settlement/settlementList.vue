<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">结算报表</span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">结算数据</span>
    </div>

    <el-card class="box-card">
      <div class="MyContainerCon">
        <!--筛选器-->
        <div style="margin: 10px 0 20px 0;">
          <div class="searchtable">
            <div>
              <template>
                <div class="block">
                  <el-date-picker
                    style="width: 100%"
                    clearable
                    v-model="filters.stime"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="开始账期">
                  </el-date-picker>
                </div>
              </template>
            </div>
            <div>
              <template>
                <div class="block">
                  <el-date-picker
                    clearable
                    v-model="filters.etime"
                    style="width: 100%"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="结束账期">
                  </el-date-picker>
                </div>
              </template>
            </div>
            <div>
              <el-button type="primary" icon="el-icon-search" v-on:click="getList"
                         v-show="buttonList.search" style="margin-left: 10px">查询</el-button>
            </div>
            <div>
              <el-button type="primary" icon="el-icon-news" v-on:click="excel()"
                         v-loading="exportLoading" v-show="buttonList.export">导出</el-button>
            </div>
          </div>
        </div>
        <!--表格-->
        <div style="margin-top: 6px"></div>
        <div>
          <div style="margin-bottom: 50px">
            <el-table v-loading="loading" :size="$store.state.size"
                      :data="data | getDatas()" border class="tableBorder thCenter"
                      style="width: 100%">
              <el-table-column type="index" label="序号" width="80"></el-table-column>
              <el-table-column prop="settleDate" label="账期">
                <template slot-scope="scope">
                  {{formatOtherDate(scope.row.settleDate,3)}}
                </template>
              </el-table-column>
              <el-table-column prop="gm" label="游戏结算/元">
              </el-table-column>
              <el-table-column prop="cm" label="渠道结算/元">
              </el-table-column>
              <el-table-column prop="pm" label="平台结算/元">
              </el-table-column>
              <el-table-column show-overflow-tooltip width="100" label="明细下载">
                <template slot-scope="scope">
                  <el-button type="primary"  class="status" v-show="buttonList.export"
                             size="mini" @click="getDeldatas(scope.$index, scope.row);">
                    <i class="el-icon-download"></i>下载
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
      </div>
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script>
  import List from '../../common/list'
  import settlement from '../../common/store/settlement'

  var list = new List({store: settlement});
  list.data = function () {
    return {
      loading: false,
      exportLoading:false,
      /*dialogVisible1: false,
      dialogVisible2: false,*/
      sheetName: '结算报表.xlsx',
      sheetTitle: {
        settleDate:"账期",
        gm: '游戏结算/元',
        cm: '渠道结算/元',
        pm: '平台结算/元'
      },
      pagination: {
        size: 10,
        page: 1
      },
      filters: {
        stime: '',
        etime: '',
      },
      buttonList:{
        search:false,
        export:false,
      },
    }
  }
  list.filters= {
    getDatas:function (val) {
      var list=val
      for(var i=0;i<list.length;i++){
        list[i].pm='-'
        list[i].gm='-'
        list[i].cm='-'
        var temp=list[i].all
        if(temp){
          temp=temp.split(':')
          for(var j=0;j<temp.length;j++){
            var array = eval ("(" + temp[j]+ ")");
            if(array[1]==0){//平台
              list[i].pm=array[0]
            }
            if(array[1]==1){//游戏
              list[i].gm=array[0]
            }
            if(array[1]==2){//渠道
              list[i].cm=array[0]
            }
          }
        }
      }
      return list
    }
  }
  list.mounted = function () {
    this.$log("settlement mounted", this)
    this.initButton(114,115)
    this.getList()
  }
  list.methods.getDeldatas= function (index, row)  {
    this.loading = true;
    var params={
      settleDate:this.formatDate(row.settleDate,3),
    }
    this.sheetName='结算报表明细.xlsx',
      this.sheetTitle= {
      settleDate:"账期",
        Companyname:'公司名称',
        money: '结算金额/元',
        bank_no:'账号',
        genre:'来源',

    },
    this.$http.post('/balance/download',params)
      .then((response) => {
        this.excel(response.data.data.list)
        this.loading = false;
        this.sheetName= '结算报表.xlsx';
        this.sheetTitle= {
        settleDate:"账期",
          gm: '游戏结算/元',
          cm: '渠道结算/元',
          pm: '平台结算/元'
        }
      })
      .catch((response) => {
        this.loading = false;
        this.$alert('下载失败！', '温馨提示', {
          confirmButtonText: '确定',
          type: 'error'
        });
      })
  },
  list.methods.formatDatas = function(data){
    for(var item of data){
      item.settleDate = this.formatDate(item.settleDate,3);
      item.genre = item.genre==0?'平台':item.genre==1?'游戏':'渠道'
    }
    var list=data
    for(var i=0;i<list.length;i++){
      list[i].pm='-'
      list[i].gm='-'
      list[i].cm='-'
      var temp=list[i].all
      if(temp){
        temp=temp.split(':')
        for(var j=0;j<temp.length;j++){
          var array = eval ("(" + temp[j]+ ")");
          if(array[1]==0){//平台
            list[i].pm=array[0]
          }
          if(array[1]==1){//游戏
            list[i].gm=array[0]
          }
          if(array[1]==2){//渠道
            list[i].cm=array[0]
          }
        }
      }
    }
    return data
  }
  export default list
</script>

<style>
  .myCell .el-checkbox__input {
    display: none
  }

</style>
