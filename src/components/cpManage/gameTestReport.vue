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
      <span class="first">生成测试报告</span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">当前游戏：{{$route.params.gName}}</span>
    </div>
    <!--用户基本信息表单-->
    <el-card class="box-card changeMar">
      <div class="MyContainerCon">
        <div v-loading="loading5">
          <el-form ref="form" :model="model" label-width="100px" style="margin-top: 30px;">
            <!-- 测试结果 -->
            <div class="spanTitle"><i class="fa fa-pencil-square-o "></i>测试结果</div>
            <el-row :gutter="10">
              <el-col :xs="23" :sm="{span: 24, offset: 0}" type="flex" class="row-bg" justify="center">
                <div style="width:100%;padding: 10px;margin: 0 30px">
                  <span class="report">测试意见:</span>
                  <el-switch
                    style="width:40%"
                    v-model="value"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="测试通过"
                    inactive-text="测试不通过">
                  </el-switch>
                </div>
              </el-col>
            </el-row>
          </el-form>
          <!-- 测试问题描述 -->
          <div class="spanTitle"><i class="fa fa-question-circle-o"></i>测试问题描述</div>
          <el-collapse v-model="activeNames" style="margin: 0 30px;border-top:none;">
            <el-collapse-item name="1">
              <template slot="title">
                <span class="smallSpan"><i class="el-icon-edit-outline"></i>游戏安装</span>
              </template>
              <el-button type="primary" icon="el-icon-plus" v-on:click="gameInstall()" size="small">添加</el-button>
              <div style="margin-top: 6px"></div>
              <el-table v-loading="loading1" :size="$store.state.size"
                        :data="dataList1" border
                        class="tableBorder thCenter"
                        style="width: 100%">
                <el-table-column type="index" label="序号" width="80"></el-table-column>
                <el-table-column prop="model" label="机型"></el-table-column>
                <el-table-column prop="testresult" label="测试结果">
                  <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                      {{ scope.row.testresult=='1'?'测试未通过':scope.row.testresult=='2'?'测试通过':''}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="question" label="问题描述"></el-table-column>
                <el-table-column prop="accessory" label="附件" width="160px" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                      <el-button type="text"
                                 @click="clickImg(scope.$index, scope.row);dialogImg = true"
                                 v-if="scope.row.accessory"
                                 style="margin-left: 10px">查看附件
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="accessory" label="附件"></el-table-column>-->
                <el-table-column label="操作" width="100px">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="del(scope.$index,dataList1,loading1,scope.row)"
                      type="danger" icon="el-icon-delete" class="status"
                      size="mini">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
            <el-collapse-item name="2">
              <template slot="title">
                <span class="smallSpan"><i class="fa fa-hourglass-start"></i>游戏启动</span>
              </template>
              <el-button type="primary" icon="el-icon-plus" v-on:click="gameStart()" size="small">添加</el-button>
              <div style="margin-top: 6px"></div>
              <el-table v-loading="loading2" :size="$store.state.size"
                        :data="dataList2" border
                        class="tableBorder thCenter"
                        style="width: 100%">
                <el-table-column type="index" label="序号" width="80"></el-table-column>
                <el-table-column prop="model" label="机型"></el-table-column>
                <el-table-column prop="testresult" label="测试结果">
                  <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                      {{ scope.row.testresult=='1'?'测试未通过':scope.row.testresult=='2'?'测试通过':''}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="question" label="问题描述"></el-table-column>
                <el-table-column prop="accessory" label="附件" width="160px" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                      <el-button type="text"
                                 @click="clickImg(scope.$index,scope.row);dialogImg = true"
                                 v-if="scope.row.accessory"
                                 style="margin-left: 10px">查看附件
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="accessory" label="附件"></el-table-column>-->
                <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="del(scope.$index,dataList2,loading2,scope.row)"
                      type="danger" icon="el-icon-delete" class="status"
                      size="mini">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
            <el-collapse-item name="3">
              <template slot="title">
                <span class="smallSpan"><i class="el-icon-edit-outline"></i>计费测试</span>
              </template>
              <el-button type="primary" icon="el-icon-plus" v-on:click="gameTest()" size="small">添加</el-button>
              <div style="margin-top: 6px"></div>
              <el-table v-loading="loading3" :size="$store.state.size"
                        :data="dataList3" border
                        class="tableBorder thCenter"
                        style="width: 100%">
                <el-table-column type="index" label="序号" width="70"></el-table-column>
                <el-table-column prop="model" label="机型"></el-table-column>
                <el-table-column prop="testresult" label="测试结果">
                  <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                      {{ scope.row.testresult=='1'?'测试未通过':scope.row.testresult=='2'?'测试通过':''}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="question" label="问题描述"></el-table-column>
                <el-table-column prop="accessory" label="附件" width="160px" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                      <el-button type="text"
                                 @click="clickImg(scope.$index,scope.row);dialogImg = true"
                                 v-if="scope.row.accessory"
                                 style="margin-left: 10px">查看附件
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="del(scope.$index,dataList3,loading3,scope.row)"
                      type="danger" icon="el-icon-delete" class="status"
                      size="mini">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
            <el-collapse-item name="4">
              <template slot="title">
                <span class="smallSpan"><i class="fa fa-pinterest"></i>其他问题</span>
              </template>
              <el-button type="primary" icon="el-icon-plus" v-on:click="gameOther()" size="small">添加</el-button>
              <div style="margin-top: 6px"></div>
              <el-table v-loading="loading4" :size="$store.state.size"
                        :data="dataList4" border
                        class="tableBorder thCenter"
                        style="width: 100%">
                <el-table-column type="index" label="序号" width="80"></el-table-column>
                <el-table-column prop="model" label="机型"></el-table-column>
                <el-table-column prop="testresult" label="测试结果">
                  <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                      {{ scope.row.testresult=='1'?'测试未通过':scope.row.testresult=='2'?'测试通过':''}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="question" label="问题描述"></el-table-column>
                <el-table-column prop="accessory" label="附件" width="160px" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                      <el-button type="text"
                                 @click="clickImg(scope.$index,scope.row);dialogImg = true"
                                 v-if="scope.row.accessory"
                                 style="margin-left: 10px">查看附件
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="accessory" label="附件"></el-table-column>-->
                <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="del(scope.$index,dataList4,loading4,scope.row)"
                      type="danger" icon="el-icon-delete" class="status"
                      size="mini">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
          <div style="margin:10px 0 "></div>
          <div class="formButton">
            <el-button type="info" style="width: 18%" icon="el-icon-error" v-on:click="backIt('gameTestInfo')">返回</el-button>
            <el-button type="primary" style="width: 18%;margin-left:16px;" icon="el-icon-success" v-on:click="saveIt()">提交报告</el-button>
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog class="MyModelremove" title="" :visible.sync="dialogVisible"
               center :width="$store.state.isMobile?'80%':'50%'" @close="resetForm('form');reUpload()">
      <div class="contentTitleModel">
        <span class="first">
          <img src="../../resource/images/img/navHome-Icon.png">
        </span>
          <span class="first">
          <a>测试问题描述</a>
        </span>
      </div>
      <div style="margin:14px 0 "></div>
      <el-form :model="model" ref="form" :rules='rules' label-width="100px">
        <el-form-item label="机型" prop="model">
          <el-input placeholder="请输入机型" v-model.trim="model.model" clearable></el-input>
        </el-form-item>
        <el-form-item label="测试结果">
          <el-radio-group v-model="model.testresult" size="small">
            <el-radio label="2">测试通过</el-radio>
            <el-radio label="1">测试不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="问题描述" prop="question" v-if="model.testresult=='1'">
          <el-input type="textarea" :rows="2" placeholder="300字以内" v-model.trim="model.question" :maxlength="300">
          </el-input>
        </el-form-item>
        <el-form-item label="附件上传" class="accessory">
          <el-upload
            class="upload-demo"
            :limit="1"
            :on-success="success"
            :on-exceed="handleExceed"
            :on-change='uploadImg'
            action=""
            ref="upload"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="info" icon="el-icon-error" @click="dialogVisible = false;resetForm('form');reUpload()">取 消</el-button>
        <el-button type="primary" icon="el-icon-success" @click="commitInfo()" v-loading="loading">确 定</el-button>
      </div>
    </el-dialog>
    <!--放大图片-->
    <el-dialog title="" :visible.sync="dialogImg" modal class="allIMg">
      <img :src="imgSrc" class="lookImg">
    </el-dialog>
  </div>
</template>

<script>
  import Form from '../../common/form'

  var reg = require('../../common/commonMethods.js')
  import myThirdParty from '../../common/store/myThirdParty'

  var form = new Form({store: myThirdParty});
  var model = function () {
    return {
      gameId: '', test_type: '', model: '', testresult: '2', question: '', accessory: ''
    }
  }
  form.data = function () {
    return {
      dialogImg: false,
      showImg: false,
      imgSrc: '',
      loading: false,
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      activeNames: ['1', '2', '3', '4'],
      model: model(),
      value: false,
      modelData: {type: '', result: '', effect: '', picture: '',},
      dialogVisible: false,
      dataList1: [], dataList2: [], dataList3: [], dataList4: [],
      rules: {
        model: [{required: true, message: '请输入手机机型', trigger: 'blur'},],
        testresult: [{required: true, message: '请选择测试结果', trigger: 'change'}],
        question: [{required: true, message: '请输入问题描述', trigger: 'blur'},
          {min: 1, max: 300, message: '长度在 300字以内', trigger: 'blur'}],
      },
    }
  };
  form.mounted = function () {
    this.$parent.infoManage = false
    this.getCheckGame()
  };
  form.watch = {
    'model.testresult': function (newVal, oldVal) {
      if (newVal == '2') {
        this.model.textarea = ''
      }
    },
  }
  form.methods.getCheckGame = function () {
    this.dataList1 = []
    this.dataList2 = []
    this.dataList3 = []
    this.dataList4 = []
    this.$http['post']('/myGame/getGameCheckItem', {gameId: this.$route.params.id})
      .then((response) => {
        if (response.data.data) {
          for (var i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].test_type == '1') {
              this.dataList1.push(response.data.data[i])
            }
            if (response.data.data[i].test_type == '2') {
              this.dataList2.push(response.data.data[i])
            }
            if (response.data.data[i].test_type == '3') {
              this.dataList3.push(response.data.data[i])
            }
            if (response.data.data[i].test_type == '4') {
              this.dataList4.push(response.data.data[i])
            }
          }
        }
      })
      .catch((response) => {

      })
  }
  form.methods.gameInstall = function () {
    this.model = model()
    this.dialogVisible = true
    this.model.test_type = 1
  }
  form.methods.gameStart = function () {
    this.model = model()
    this.dialogVisible = true
    this.model.test_type = 2
  }
  form.methods.gameStart = function () {
    this.model = model()
    this.dialogVisible = true
    this.model.test_type = 2
  }
  form.methods.gameTest = function () {
    this.model = model()
    this.dialogVisible = true
    this.model.test_type = 3
  }
  form.methods.gameOther = function () {
    this.model = model()
    this.dialogVisible = true
    this.model.test_type = 4
  }
  //上传提醒每次只能上传一张图片
  form.methods.handleExceed = function (files, fileList) {
    this.$alert('每次请选择 1 个文件进行上传！', '温馨提示', {
      confirmButtonText: '确定',
      center: true,
      type: 'warning'
    });
  }
  form.methods.uploadImg = function(file,fileList){
    this.limitIMG(file, fileList, 5)
  },
  //图片限制1 大小类型（单位M）
  form.methods.limitIMG= function (file,fileList,size) {
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
  form.methods.success = function (response, file, fileList) {
    fileList.shift()
  }
  //删除一行问题描述
  form.methods.del = function (index, rows, load, row) {
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      load = true
      var dateModel = {
        id: row.id, gameId: row.gameId, test_type: row.test_type
      }
      this.$http['post']('/myGame/delGameCheckItem', dateModel)
        .then((response) => {
          this.$alert('删除成功！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'success'
          }).then(() => {
            load = false
            rows.splice(index, 1);
          });
        })
        .catch((response) => {
          this.loading = false
          this.$alert('删除失败！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'error'
          });
          load = false
        })
    })
  };
  //添加问题描述
  form.methods.commitInfo = function () {
    var formData = new window.FormData();
    var accessory = document.querySelector('.accessory .el-upload .el-upload__input').files[0]
    if (accessory) {
      this.model.accessory = accessory;//accessory
    }
    this.model.gameId = this.$route.params.id
    for (var key in this.model) {
      if (this.model[key]) {
        formData.append(key, this.model[key])
      }
    }
    this.$refs['form'].validate((valid) => {
      if (valid) {
        this.loading = true
        this.$http['post']('/myGame/addGameCheckItem', formData)
          .then((response) => {
            this.$alert('提交信息成功！', '温馨提示', {
              confirmButtonText: '确定',
              type: 'success'
            }).then(() => {
              this.dialogVisible = false
              this.model = model()
              this.loading = false
              this.getCheckGame()
              this.resetForm('form')
              this.reUpload()
            });
          })
          .catch((response) => {
            this.loading = false
            this.$alert('提交信息失败！', '温馨提示', {
              confirmButtonText: '确定',
              type: 'error'
            }).then(() => {
              this.dialogVisible = false
              this.loading = false
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
  form.methods.reUpload = function () {
    this.$refs.upload.clearFiles()
  }
  form.methods.resetForm = function (formName) {
    this.$refs[formName].resetFields();
  }
  form.methods.clickImg = function (index, row) {
    this.showImg = true;
    // 获取当前图片地址
    this.imgSrc = row.accessory;
  }
  //返回
  form.methods.backIt = function (name) {
    this.$router.push({name: name, params: {id: this.$route.params.id, gName: this.$route.params.gName}});
  }
  //返回2
  form.methods.backIt2 = function (name) {
    this.$router.push({name: name, params: {status: this.value}});
  }
  form.methods.setReadStatus = function () {
    var params={idName:'gameId',
      id:this.$route.params.id,
      isRead:0,
      tableName:'gameauditstatus',
    }
    this.$http['post']('/getNum/changeRead', params)
      .then((response) => {

      })
      .catch((response) => {

      })
  }
  //提交报告
  form.methods.saveIt = function () {
    this.loading5 = true
    var dateModel = {
      gameId: '', pass: '', auditStatus: ''
    }
    dateModel.pass = '1'//是否提交0未提交1提交
    dateModel.gameId = this.$route.params.id
    if (this.value) {
      dateModel.auditStatus = 4//测试通过，待商用
    } else {
      dateModel.auditStatus = 3//不通过
    }
    this.$http['post']('/myGame/updateTestInfo', dateModel)
      .then((response) => {
        this.loading5 = false
        this.setReadStatus()
        this.$alert('提交报告成功！', '温馨提示', {
          confirmButtonText: '确定',
          type: 'success'
        }).then(() => {
          this.backIt2('gameManage')
        });
      })
      .catch((response) => {
        this.loading5 = false
        this.$alert('提交报告失败！', '温馨提示', {
          confirmButtonText: '确定',
          type: 'error'
        }).then(() => {
        });
      })

  }
  export default form
</script>

<style scoped>
  .smallSpan {
    font-size: 90%;
  }

  .MyContainer .el-collapse-item__header span.smallSpan i {
    font-size: 16px;
    margin-right: 4px;
  }

  .spanTitle {
    font-size: 17px;
    padding-left: 6px;
    color: #409EFF;
    margin-top: 16px;
    border-bottom: 1px dashed #dddddd;
  }

  .spanTitle i {
    margin-right: 8px;
  }

  .report {
    margin-top: 2px;
    margin-right: 16px;
  }

  .secondTabs {
    color: #409EFF;
    font: 16px Medium;

  }

  .spanStyle {
    color: #606266;
    font: 18px Medium;
    padding: 10px 0px;
    display: block;
    font-weight: 700;
  }

  .divStyle {
    background-color: #f5f7fa;
    color: #909399;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none;
    display: inline-block;
    width: 20%;
    text-align: center;
    /* padding: 10px 0px 10px 0px;*/
    height: 50px;
    line-height: 50px;
    float: left;

  }

  .switchStyle {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    display: inline-block;
    width: 76%;
    text-align: center;
    /* padding: 10px 0px 10px 0px;*/
    line-height: 50px;
    float: left;
    height: 50px;
  }

  .bread {
    color: #303133;
    font-weight: 700;
    background: 0 0;
    padding: 0;
  }
</style>
