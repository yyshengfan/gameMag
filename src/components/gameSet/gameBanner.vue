<template>
  <div>
    <div>
      <div style="margin-top: 6px"></div>
      <el-button type="primary" icon="el-icon-plus" v-on:click="addGame()" v-if="!disabled">添加</el-button>
      <div style="margin-top: 6px"></div>
      <el-table v-loading="loading"
                :size="$store.state.size"
                :data="data" border
                class="tableBorder thCenter"
                style="width: 100%">
        <el-table-column label="序号" type="index" width="70">
        </el-table-column>
        <el-table-column prop="gamename" label="游戏名称">
        </el-table-column>
        <el-table-column prop="gameintro" label="游戏简介" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gameimg" label="图片url" show-overflow-tooltip>
        </el-table-column>
        <!--<el-table-column prop="gameimg" label="游戏图片预览" width="160px">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-button type="text"
                         @click="viewImg(scope.$index,scope.row);"
                         v-if="scope.row.gameimg"
                         style="margin-left: 10px">预览
              </el-button>
            </div>
          </template>
        </el-table-column>-->
        <el-table-column show-overflow-tooltip width="160" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" class="status" size="mini" @click="viewImg(scope.$index,scope.row);">
              <i class="fa fa-eye"></i>预览
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
      <!-- 添加弹框 ---->
      <el-dialog class="MyModelremove" title="" :visible.sync="dialogVisible"
                 center :width="$store.state.isMobile?'80%':'50%'" @close="resetForm('form');reUpload()">
        <div class="contentTitleModel">
        <span class="first">
          <img src="../../resource/images/img/navHome-Icon.png">
        </span>
          <span class="first">
          <a>添加包含游戏</a>
        </span>
        </div>
        <div style="margin:14px 0 "></div>
        <el-form :model="model" ref="form" :rules="rules" label-width="100px"v-loading="loading2">
          <el-form-item label="游戏名称" prop="gameId" :class="{'marBot':disabled}">
            <el-select v-model="model.gameId" clearable
                       filterable placeholder="请选择游戏名称" style="width: 100%">
              <el-option
                v-for="item in gameDatas"
                :key="item.gameId"
                :label="item.gName"
                :value="item.gameId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="游戏简介" prop="gameintro">
            <el-input v-model.trim="model.gameintro" placeholder="请输入游戏简介150字以内"
                      type="textarea" :rows="3" :maxlength="150"></el-input>
          </el-form-item>
          <el-form-item label="游戏图片" prop="gameimg" class="gameimg">
            <el-upload
              class="upload-demo"
              :limit="1"
              :on-success="success"
              :on-change='uploadGameImg'
              :on-exceed="handleExceed"
              action=""
              ref="upload"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <div style="text-align: center">
          <el-button type="info" icon="el-icon-error" @click="dialogVisible=false;resetForm('form');reUpload()">取消</el-button>
          <el-button  type="primary" style="margin-left: 20px;" icon="el-icon-success" @click="saveIt();resetForm('form');reUpload()">确定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
  import List from '../../common/list'
  import gameBanner from '../../common/store/gameBanner'
  var reg =require('../../common/commonMethods.js')
  var list = new List({store: gameBanner});
  var model = function(){
    return {topicId:'',gameId:'',gamename :'',gameintro:'',gameimg:'',}
  }
  list.props=['disabled']
  list.data = function() {
    return {
      loading: false,
      loading2: false,
      dialogVisible:false,
      pagination: {
        size:5,
        page: 1,
        start:0,
      },
      rules:{
        gameId:{ required: true, message: '请选择游戏', trigger: 'blur' },
        gameintro:[{required: true, message: '请输入游戏简介', trigger: 'blur' }],
        gameimg:[{required: true, message: '请上传游戏图片', trigger: 'blur'}],
      },
      model:model(),
      gameDatas:[],
      filters:{topicId:''},
    }
  }
  list.watch = {
    'model.gameId': function () {
      if (this.model.gameId) {
        this.getGameName()
      }
    },
    dialogVisible(val) {
      if (val) {
        $('.MyContainerCon').css('position', 'static');
      } else {
        $('.MyContainerCon').css('position', 'absolute');
      }
    }
  }
  list.mounted = function() {
    this.filters.topicId=this.$route.params.id || this.model.GameId
    this.getGames();
    this.getList()
  }
  list.methods.getGames= function () {
    var params={
      status:'5',offstatus:'1',pass:'1'
    }
    this.$http['post']('/auditManage/getGameAll',params)
      .then((response) => {
        this.gameDatas=response.data.data
      })
      .catch((response) => {
      })
  }
  list.methods.getGameName= function () {
    var data=this.gameDatas
    for(var i=0;i<data.length;i++){
      if(this.model.gameId==data[i].gameId){
        this.model.gamename=data[i].gName
      }
    }
  }
  //上传提醒每次只能上传一张图片
  list.methods.handleExceed = function (files, fileList) {
    this.$alert('每次请选择 1 个文件进行上传！', '温馨提示', {
      confirmButtonText: '确定',
      center: true,
      type: 'warning'
    });
  }
  list.methods.uploadGameImg = function(file,fileList){
      this.limitIMG(file, fileList, 5)
  },
  //图片限制1 大小类型（单位M）
  list.methods.limitIMG= function (file,fileList,size) {
    var imgType=file.raw.type
    var imgSize=Math.floor(file.raw.size / 1024);
    if(imgType!=='image/jpeg' && imgType!=='image/png'){
      this.$alert('上传文件仅支持jpg/png格式！', '温馨提示', {
        confirmButtonText: '确定',
        center: true,
        type: 'warning'
      });
      fileList.shift()
    }else if(imgSize>size*1024){
      this.$alert('上传图片大小不能超过'+size+'MB!', '温馨提示', {
        confirmButtonText: '确定',
        center: true,
        type: 'warning'
      });
      fileList.shift()
    }else{
      return fileList
    }
  }
  //提交成功后
  list.methods.success = function (response, file, fileList) {
    fileList.shift()
  }
  list.computed.type = function(){
    return gameProps.type;
  };
  list.methods.reUpload = function () {
    this.$refs.upload.clearFiles()
  }
  list.methods.resetForm = function (formName) {
    this.$refs[formName].resetFields();
  }
  list.methods.addGame=function(){
    this.dialogVisible=true;
    this.model={}
  }
  list.methods.saveIt = function () {
    var formData = new window.FormData();
    var gameimg = document.querySelector('.gameimg .el-upload .el-upload__input').files[0];
    if (gameimg) {
      this.model.gameimg = gameimg;//gameimg
    }
    this.model.topicId=this.$route.params.id
    for (var key in this.model) {
      if (this.model[key]) {
        formData.append(key, this.model[key])
      }
    }
    this.$refs['form'].validate((valid) => {
      if (valid) {
        this.loading2 = true
        this.$http['post']('/auditManage/setTopicGame', formData)
          .then((response) => {
            this.$alert('提交信息成功！', '温馨提示', {
              confirmButtonText: '确定',
              type: 'success'
            }).then(() => {
              this.dialogVisible = false
              this.loading2=false;
              this.getList()
            });
          })
          .catch((response) => {
            this.$alert('提交信息失败！', '温馨提示', {
              confirmButtonText: '确定',
              type: 'error'
            }).then(() => {
              this.dialogVisible = false
              this.loading2 = false
            });
          })
      } else {
        this.$alert('请完善所有必填信息！', '温馨提示', {
          confirmButtonText: '确定',
          center: true,
          type: 'warning '
        });
      }
    })
  }
  list.methods.viewImg= function (index, row) {
    var imgSrc = row.gameimg;
    this.$emit('clickImg', imgSrc)
  }
  export default list

</script>
<style scoped>
  .el-form .el-form-item {
    margin-bottom: 10px;
  }
  .buttonStyle{
    display: block;margin-top: 6px
  }
</style>
