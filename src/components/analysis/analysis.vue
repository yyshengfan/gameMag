<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">运营数据</span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">运营数据</span>
    </div>
    <el-card class="box-card">
      <div class="MyContainerCon">
        <div style="margin-bottom: 50px;">
          <el-row style="margin-bottom: 20px;">
            <el-col :xs="{span:24,offset:0}" :sm="{span:24,offset:0}">
              <div class="searchtable">
                <div>
                    <el-select v-model="filters.phoneplatform" placeholder="平台" clearable>
                      <el-option :label="platform.platform" :key="platform.id" :value="platform.id"
                                  v-for="platform in allChannel"></el-option>
                    </el-select>
                  </div>
                <div>
                  <el-select v-model="filters.searchbyDate" placeholder="查询方式">
                    <el-option key="h" value="h" label="按天"></el-option>
                    <el-option key="d" value="d" label="按月"></el-option>
                    <el-option key="m" value="m" label="按年"></el-option>
                  </el-select>
                </div>
                <div>
                  <el-date-picker
                    type="date"
                    v-model="filters.stime"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :clearable="false"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
                <div>
                  <el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
                </div>
                <div>
                  <el-button type="primary" icon="el-icon-news"  v-loading="exportLoading" @click="excel(myData)">导出</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- charts -->
          <div v-loading="loading" >
            <el-row v-show="chartShow">
              <el-col :xs="{}" :sm="{span:23,offset:0}">
                <div id="container"></div>
              </el-col>
            </el-row>
            <el-table :size="$store.state.size"
                      :data="newData" border
                      class="tableBorder thCenter"
                      style="width: 100%">
              <el-table-column
                label="序号"
                type="index"
                width="70">
              </el-table-column>
              <el-table-column
                prop="date"
                :label="filters.searchbyDate=='h'?'小时':filters.searchbyDate=='d'?'日期':'月份'"
                width="200">
              </el-table-column>
              <el-table-column
                prop="count"
                label="注册量"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="loginnum"
                label="登录量"
                min-width="180">
              </el-table-column>
              <el-table-column
                prop="visitnum"
                label="访问量"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="downloadnum"
                label="下载量"
                min-width="150">
              </el-table-column>
            </el-table>
            <el-pagination
              layout="total, prev, next ,jumper"
              @current-change="newChangePage"
              :current-page="pagination.page"
              :page-size="pagination.size"
              :total="total">
            </el-pagination>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </el-card>

  </div>
</template>

<script>
  import List from '../../common/list'
  import customer from '../../common/store/customer'
  import allChannel from '../../common/store/allChannel'
  import highcharts from '@/resource/js/highcharts'//highcharts资源


  var list = new List({store: customer});

  list.data = function () {
    return {
      count:0,
      chartShow: true,
      exportLoading:false,
      myData: [],
      newData: [],
      routeName: "customerForm",
      loading: false,
      sheetName: '运营数据.xlsx',
      totals:0,
      sheetTitle: {
        date: '时间',
        count: '注册量',
        loginnum: '登录量',
        visitnum: '访问量',
        downloadnum: '下载量',
      },
      sheetData:{},
      filters:{
        phoneplatform:'',
        searchbyDate:'d',
        stime:new Date(),
        etime:new Date(),
      },
      pagination: {
        total:0,
        prev:0,
        next:0,
        jumper:1,
        size: 16,
        page: 1
      },
      options: {
        chart: {//图表配置
          type: 'spline',
        },
        credits: {
          enabled: false
        },
        title: {//标题
          text: ''
        },
        xAxis: {
          categories: []
        },
        yAxis: {
          min: -1,
          title: {
            text: ''
          },
          labels: {
            formatter: function () {
              return this.value;
            }
          },
          lineWidth: 3
        },
        legend: {// 图例
          // enabled: true,
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },
        tooltip: {//数据提示框
          headerFormat: '<b>{series.name}量</b><br/>',
          pointFormat: '{point.y}'
        },
        series: [
          {//数据列
            name: '注册',
            data: []
          },
          {//数据列
            name: '登录',
            data: []
          },
          {//数据列
            name: '访问',
            data: []
          },
          {//数据列
            name: '下载',
            data: []
          }
        ]
      },
    }
  };

  list.mounted = function () {
    this.$log("myContract mounted", this)
    this.getData()
  };

  list.computed.allChannel = function () {
    return allChannel.data()
  }

  // 获取数据
  list.methods.getData = function(){
    this.loading = true;
    let sheetData = {};
    let urls = ['/auditManage/getLoginUsernum','/auditManage/getRegistUsernum','/auditManage/getVisitNum','/auditManage/getDownLoadnum',]
    for(let url of urls){
      this.$http.post(url,this.filters).then((response)=>{
        //统一接口将每一组数据拼接到sheetData上
        let data = response.data.data.list;
        for(let item of data){
          sheetData[item['date']] = sheetData[item['date']] || {}
          sheetData[item['date']].count = sheetData[item['date']].count || item['count'] || 0;
          sheetData[item['date']].loginnum = sheetData[item['date']].loginnum || item['loginnum'] || 0;
          sheetData[item['date']].visitnum = sheetData[item['date']].visitnum || item['visitnum'] || 0;
          sheetData[item['date']].downloadnum = sheetData[item['date']].downloadnum || item['downloadnum'] || 0;
          sheetData[item['date']].date = sheetData[item['date']].date || item['date'] || 0;
        }
        this.getSchartData(sheetData)
      });
    }
  }

  // 数据处理画图
  list.methods.getSchartData = function (data) {
    this.count++
    if(this.count!==4){
      return
    }else{
      //total赋值'
      this.$store.dispatch(customer.option.local.total,Object.keys(data).length)
      this.totals = data.length
      // 先将原来的数据清空
      this.count = 0;
      this.myData = [];
      this.options.xAxis.categories = [];
      for(let i=0;i<4;i++){
        this.options.series[i].data = [];
      }
      // 赋值
      let numName = ['count','loginnum','visitnum','downloadnum']
      this.options.xAxis.categories = Object.keys(data).sort()
      for(let item of Object.keys(data).sort()){
        this.myData.push((data[item]));
        for(let i=0;i<4;i++){
          this.options.series[i].data.push(data[item][numName[i]]);
        }
      }
      this.loading = false;
    }
    this.newChangePage(1)
    new Highcharts.Chart("container", this.options);
  }

  //对象排序
  list.methods.sortByDate = function(data,type){
    let keys = Object.keys(data).sort();
    let newData = {}
    for(let key of keys){
      newData[key] = data[key]
    }
    return newData
  }

  //分页处理
  list.methods.newChangePage = function(val){
    this.pagination.page = val;
    this.newData = val=='1'? this.myData.slice(0,16) : this.myData.slice(16,this.myData.length)
  }

  export default list

</script>

<style scoped>
  .el-form .el-form-item {
    margin-bottom: 10px;
  }

  #container .highcharts-container {
    width: 98% !important;
  }

</style>
