  <template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/infoManage' }">CP管理</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">合同管理</span>
    </div>

    <el-card class="box-card changeMar MyContainerCon">
      <!--表格-->
      <div style="margin-top: 2rem">
        <div class="searchtable">
          <div>
            <el-date-picker type="date" v-model="filters.stime" style="width: 100%" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd 00:00:00" placeholder="开始时间">
            </el-date-picker>
          </div>
          <div>
            <el-date-picker type="date" v-model="filters.etime" format="yyyy-MM-dd" value-format="yyyy-MM-dd 23:59:59"
                            style="width: 100%" placeholder="结束时间">
            </el-date-picker>
          </div>
          <div>
            <el-select clearable placeholder="合同状态" style="width:160px;" v-model="filters.status">
              <el-option label="待签约" value="1"></el-option>
              <el-option label="驳回" value="2"></el-option>
              <el-option label="签约成功" value="3"></el-option>
            </el-select>
          </div>
          <div>
            <el-input placeholder="请输入公司名称" v-model="filters.companyName"></el-input>
          </div>
          <div>
            <el-button type="primary" icon="el-icon-search" style="height: 38px;" @click="getList"
                       v-show="buttonList.search">查询
            </el-button>
          </div>
          <div>
            <el-button type="primary" icon="el-icon-news" style="height: 38px;" @click="excel()" v-loading="exportLoading"
                       v-show="buttonList.export">导出
            </el-button>
          </div>
        </div>
        <div class="myTable">
          <el-button type="primary" icon="el-icon-plus" @click="add" v-show="buttonList.add">新增</el-button>
          <div style="margin-top:10px"></div>
          <el-table v-loading="loading"
                    :size="$store.state.size"
                    :data="data" border
                    class="tableBorder thCenter"
                    style="width: 100%">
            <el-table-column
              label="序号"
              type="index"
              width="70">
            </el-table-column>
            <el-table-column
              prop="Companyname"
              label="公司名称"
              min-width="100"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="contractId"
              label="合同编号"
              min-width="80">
            </el-table-column>
            <el-table-column
              prop="type"
              label="合同类型"
              :formatter="formatter.type"
              min-width="80">
            </el-table-column>
            <el-table-column
              prop="status"
              label="合同状态"
              :formatter="formatter.status"
              width="110">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <p   :class="status[scope.row.status].split(',')[1]">
                    <!--<i :class="status[scope.row.status].split(',')[2]"></i>-->
                    {{status[scope.row.status].split(',')[0]}}
                  </p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              :formatter="formatTableDate"
              label="生效时间"
              width="200">
            </el-table-column>
            <el-table-column
              label="操作"
              width="160">
              <template slot-scope="scope">
                <el-button
                  v-show="scope.row.downloadfile && buttonList.download"
                  size="mini" icon="fa fa-download" type="primary"
                  @click="downLoad(scope.$index, scope.row)">下载
                </el-button>
                <el-button
                  v-show="scope.row.downloadfile && buttonList.audit"
                  size="mini" icon="el-icon-edit-outline" type="warning"
                  @click="toaudit(scope.$index, scope.row)">审核
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            layout="total, prev, next ,jumper" P
            @current-change="changePage"
            :current-page="pagination.page"
            :page-size="pagination.size"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </el-card>

    <el-dialog class="MyModelremove"
               :visible.sync="dialogVisible"
               width="70%"
               :center="true">
      <div class="contentTitleModel">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
        <span class="first">合同管理</span>
        <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
        <span class="first">
        <a v-on:click="closeIt()">合同审核</a>
      </span>
      </div>
      <el-form :model="model" ref="form" label-width="100px" :rules="rules">
        <el-form-item label="审核状态：" prop="status">
          <el-radio-group v-model="model.status">
            <el-radio label="2">驳回</el-radio>
            <el-radio label="3">签约成功</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="model.status==2" label="驳回原因："
                      :rules="[{ required: true, message: '请输入驳回原因', trigger: 'blur' }]" prop="reason">
          <el-input type="textarea"
                    :rows="5"
                    :maxlength='200'
                    v-model.trim="model.reason"
                    placeholder="输入驳回原因">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" icon="el-icon-error" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" icon="el-icon-success" @click="audit">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import List from '../../common/list'
  import myContract from '../../common/store/myContract'

  var list = new List({store: myContract});

  list.data = function () {
    return {
      loading: false,
      exportLoading: false,
      dialogVisible: false,
      routeName: 'cpContractForm',
      sheetName: '合同数据.xlsx',
      contractOne: {},
      sheetTitle: {
        contractId: '合同编号',
        Companyname: '公司名称',
        type: '合同类型',
        status: '合同状态',
        createTime: '生效时间',
      },
      model: {
        reason: '',
        status: '',
      },
      buttonList: {
        search: false,
        download: false,
        export: false,
        audit: false,
      },
      filters: {
        stime: '',
        etime: '',
        status: '',
        companyName: '',
        type: '1'
      },
      rules: {
        status: [{required: true, message: '请选择审核状态', trigger: 'change'},]
      },
      formatter: {
        status: (row, column, cellValue) => {
          return this.status[cellValue] || ''
        },
        type: (row, column, cellValue) => {
          return this.type[cellValue] || ''
        },
      },
      pagination: {
        size: 10,
        page: 1
      },
    }
  };

  list.mounted = function () {
    this.$log("myContract mounted", this)
    this.getList()
    this.initButton(3,10)
  };

  list.computed.status = function () {
    return myContract.status;
  };

  list.computed.type = function () {
    return myContract.type;
  };

  // 格式化数据
  list.methods.formatDatas = function (data) {
    for (var item of data) {
      item.status = this.status[item.status].split(',')[0];
      item.type = this.type[item.type];
      item.createTime = this.formatDate(item.createTime)
    }
    return data
  }

  // 合同下载
  list.methods.downLoad = function (index, row) {
    window.location.href = row.downloadfile
  }

  // 弹出审核
  list.methods.toaudit = function (index, row) {
    this.dialogVisible = true
    this.contractOne = row
  }

  // 提交审核
  list.methods.audit = function () {
    var model = _.clone(this.model);
    var row = _.clone(this.contractOne);

    row.reason = model.reason
    row.status = model.status

    this.$refs['form'].validate((valid) => {
      if (valid) {
        this.dialogVisible = false
        myContract.update(row, (data) => {
          this.model = {
            reason: '',
            status: '',
          }
          this.loading = false
        }, () => {
          this.loading = false
        })
      }
    })
  }

  export default list

</script>

<style scoped>
  .el-form .el-form-item {
    margin-bottom: 10px;
  }
</style>
