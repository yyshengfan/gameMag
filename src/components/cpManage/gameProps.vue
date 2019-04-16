<template>
  <div>
    <div style="margin-top: 6px"></div>
    <el-button type="primary"  icon="el-icon-plus" v-on:click="dialogVisible= true" v-if="!disabled">添加</el-button>
    <el-button type="primary" style="float:right" v-on:click="downloadProps" v-if="!disabled">计费模板下载</el-button>
    <el-upload
      v-if="!disabled"
      style="display: inline;float:right"
      :show-file-list="false"
      :on-success="success"
      :before-upload="beforeUpload"
      :data="GameId"
      action="/myGame/uploadGamebilling"
      name="uploadBilling">
      <el-button  type="primary">计费模板导入</el-button>
    </el-upload>
    <div style="margin-top: 6px"></div>
    <el-table v-loading="loading" :size="$store.state.size"
              :data="data" border
              class="tableBorder thCenter"
              style="width: 100%">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="name" label="道具名称"></el-table-column>
      <el-table-column prop="money" label="单价（元）"></el-table-column>
      <el-table-column prop="effect" label="道具功能" show-overflow-tooltip></el-table-column>
      <el-table-column prop="conditions" label="触发条件" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="软/硬计费点">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            {{ scope.row.type=='1'?'软计费点':scope.row.type=='2'?'硬计费点':''}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="propId" label="计费编码"></el-table-column>
      <!--<el-table-column  label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="delProps(scope.$index, data,scope.row)"
            type="danger"
            size="mini"
            :disabled="disabled">删除
          </el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <el-pagination
      layout="total, prev, next ,jumper"
      @current-change="changePage"
      :current-page="pagination.page"
      :page-size="pagination.size"
      :total="total">
    </el-pagination>
    <el-dialog title="添加计费申请" :visible.sync="dialogVisible"
               center :width="$store.state.isMobile?'80%':'40%'"
               v-loading="loading2">
      <el-form :model="modelData" ref="formProps" :rules="rules2" label-width="100px">
        <el-form-item label="道具名称" prop="name">
          <el-input placeholder="请输入" v-model.trim="modelData.name" :clearable="!disabled" ></el-input>
        </el-form-item>
        <el-form-item label="单价（元）" prop="money">
          <el-input placeholder="请输入" v-model.trim="modelData.money" :clearable="!disabled"></el-input>
        </el-form-item>
        <el-form-item label="道具功能" prop="effect">
          <el-input type="textarea" :rows="2" placeholder="300字以内" v-model.trim="modelData.effect" :maxlength="300">
          </el-input>
        </el-form-item>
        <el-form-item label="触发条件" prop="conditions">
          <el-input type="textarea" :rows="2" placeholder="300字以内" v-model.trim="modelData.conditions" :maxlength="300">
          </el-input>
        </el-form-item>
        <el-form-item label="软/硬计费点" prop="type">
          <el-radio v-model="modelData.type" label="1">软计费点</el-radio>
          <el-radio v-model="modelData.type" label="2">硬计费点</el-radio>
        </el-form-item>
        <!--<el-form-item label="计费编码" prop="code">
        <el-input placeholder="系统自动生成" v-model="modelData.code" readonly></el-input>
      </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeIt();resetForm('formProps')">取 消</el-button>
        <el-button type="primary" @click="saveJF">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import List from '../../common/list'
  import gameProps from '../../common/store/gameProps'
  var reg =require('../../common/commonMethods.js')
  var list = new List({store: gameProps});
  var modelData = function(){
    return {gameId:'',name:'',money:'',effect:'',conditions:'',type:'1'}
  }
  list.props=['disabled','model']
  list.data = function() {
    return {
      loading: false,
      loading2:false,
      dialogVisible:false,
      GameId:{},
      pagination: {
        size:5,
        page: 1,
        start:0,
      },
      rules2:{
        name:{ required: true, message: '请输入道具名称', trigger: 'blur' },
        money:[{required: true, validator: reg.RegisterMoney, trigger: 'blur' }],
        effect:[{ required: true, message: '请输入道具功能', trigger: 'blur' },
          { min: 1, max:300, message: '长度在 300字以内', trigger: 'blur' }],
        conditions:[{ required: true, message: '请输入触发条件', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 300字以内', trigger: 'blur' }],
        type:[{ required: true, message: '软/硬计费点', trigger: 'change' }],
      },
      modelData:modelData(),
      filters:{gameId:''},
      formatter:{
        type: (row, column,cellValue) => {
          return this.type[cellValue] || ""
        }
      },
    }
  }
  list.computed.type = function(){
    return gameProps.type;
  };
  list.mounted = function() {
    this.filters.gameId=this.$route.params.id || this.model.GameId
    this.getList()
  }
  //下载计费模板
  list.methods.downloadProps=function (){
    window.location.href='/MyContract/download?type=5'
  }
  //计费文件导入成功后
  list.methods.success = function(response, file, fileList){
    if(response.respCode=="00"){
      this.$alert('计费文件导入成功！', '温馨提示', {
        confirmButtonText: '确定',
        type: 'success'
      }).then(() => {
        this.loading=false
        this.getList()
      });
    }else{
      this.$alert('计费文件导入失败，请确保计费文件格式与模板一致！', '温馨提示', {
        confirmButtonText: '确定',
        type: 'error'
      }).then(() => {
        this.loading=false
        this.getList()
      });;
    }

  }
  list.methods.beforeUpload = function(file){
    var fileType=file.type
    if(fileType!='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && fileType!='application/vnd.ms-excel'){
      this.$alert('计费文件仅支持Excel表格！', '温馨提示', {
        confirmButtonText: '确定',
        center: true,
        type: 'warning'
      });
      return
    }else{
      this.GameId.GameId = this.model.GameId
      this.loading=true
    }

  }
  //删除一行计费列表
  list.methods.delProps=function (index, rows,row) {
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.loading=true
      this.$http['post']('/myGame/delProps', {propId:row.propId})
        .then((response) => {
          this.loading=false
          this.$alert('删除成功！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'success'
          }).then(() => {
            rows.splice(index, 1);
          });
        })
        .catch((response) => {
          this.$alert('删除失败！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'error'
          });
          this.loading=false
        })
    }).catch(() => {
    });
  };
  //保存添加一行计费,并保存入数据库
  list.methods.saveJF=function(){
    var tempData={}
    for(var key in this.modelData){
      tempData[key]=this.modelData[key]
    }
    tempData.gameId=this.model.GameId
    this.$refs['formProps'].validate((valid) => {
      if (valid) {
        this.loading2=true
        this.$http['post']('/myGame/addProps', tempData)
          .then((response) => {
            tempData.propId=response.data.data.propId
            this.$alert('添加成功！', '温馨提示', {
              confirmButtonText: '确定',
              type: 'success'
            }).then(() => {
              this.loading2=false
              this.getList()
              this.closeIt()
              this.resetForm('formProps')
            });
          })
          .catch((response) => {
            this.loading2=false
            this.$alert('添加失败！', '温馨提示', {
              confirmButtonText: '确定',
              type: 'error'
            }).then(() => {
              this.loading2=false
              this.resetForm('formProps')
            });;;
          })
        this.dialogVisible=false
      }else{
        this.$alert('请完善所有必填信息！', '温馨提示', {
          confirmButtonText: '确定',
          center: true,
          type: 'warning '
        });
      }
    })
  },
  list.methods.closeIt=function () {
      this.dialogVisible=false
      this.modelData=modelData()
    }
  list.methods.resetForm=function(formName) {
    this.$refs[formName].resetFields();
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
