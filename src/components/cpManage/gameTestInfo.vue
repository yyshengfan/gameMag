
<template>
  <div>
    <div class="MyContainer" v-show="showIt">
      <div>
        <div class="contentTitle" >
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
          <span class="first">
        <router-link :to="{ path: '/infoManage' }">CP管理</router-link>
      </span>
          <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
          <span class="first">游戏测试</span>
          <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
          <span class="second">当前游戏：{{$route.params.gName || model.gName}}</span>
        </div>

        <!--用户基本信息表单-->
        <el-card class="box-card changeMar">
          <div class="MyContainerCon" v-loading="loading">
            <el-collapse v-model="activeNames" style="border-top: none">
              <el-form ref="form" :model="model"  label-width="150px" disabled class="myCheck">
                <!-- 测试包 -->
                <el-collapse-item name="1">
                  <template slot="title">
                    <span><i class="fa fa-briefcase"></i>测试包</span>
                  </template>
                  <el-row :gutter="10">
                    <el-col :xs="23" :sm="{span: 20, offset: 2}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="合作模式" prop="cooperation">
                        <el-select v-model="model.cooperation" placeholder="请选择" style="width: 80%"  clearable>
                          <el-option label="代理" value="1"></el-option>
                          <el-option label="其他" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                      <div v-if="model.cooperation==1">
                        <el-form-item label="测试包下载地址" prop="" class="gameApk">
                          <a :href="model.gameapk">点击下载</a>
                        </el-form-item>
                        <el-form-item label="是否强更" prop="fousupdate">
                          <el-radio v-model="model.fousupdate" label="1">是</el-radio>
                          <el-radio v-model="model.fousupdate" label="0">否</el-radio>
                        </el-form-item>
                      </div>
                      <div v-else>
                        <el-form-item label="测试包下载地址" prop="gameApk">
                          <a :href="model.gameapk" v-if="changeIt">点击下载</a>
                          <!-- <el-input placeholder="请输入测试包下载地址" v-model="model.gameApk" clearable v-if="!changeIt"
                                     @clear="model.gameApk=''" style="width: 80%">
                           </el-input>-->
                          <!--<el-button type="primary" @click="changeIt=false;model.size=''" v-if="changeIt" style="margin-left: 15px">更改链接地址</el-button>-->
                        </el-form-item>
                        <!--<el-form-item v-if="!changeIt" class='marBot'>
                          {{model.gameapk}}（原地址）
                        </el-form-item>
                        <el-form-item  prop="size">
                          <el-row :gutter="10">
                            <el-col :xs="20" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                              <el-input placeholder="请输入商用包大小（单位MB）" v-model="model.size" clearable v-if="!changeIt"
                                        @clear="model.size=''"></el-input>
                            </el-col>
                            <el-col :xs="20" :sm="{span: 10, offset: 0}" type="flex" class="row-bg" justify="center">
                              <el-button type="primary" v-if="!changeIt"
                                         @click="changeDress()" :disabled="!model.gameApk" icon="el-icon-news">保存</el-button>
                              <el-button type="info" icon="el-icon-error" v-if="!changeIt && !model.gameApk"
                                         @click="changeIt=true">取消</el-button>
                            </el-col>
                          </el-row>
                        </el-form-item>
                        <el-form-item v-if="!changeIt">
                          <span class="spanStyle">*商用包大小（单位MB）</span>
                        </el-form-item>-->
                      </div>
                      <div v-show="model.Type==2">
                        <el-form-item label="H5游戏链接地址" prop="h5adress">
                          <el-input placeholder="H5游戏链接地址" v-model="model.h5adress" clearable></el-input>
                        </el-form-item>
                      </div>
                      <el-form-item label="上线时间" prop="onlinecheck">
                        <el-radio v-model="model.onlinecheck" label="0">测试完成即可上线</el-radio>
                        <el-radio v-model="model.onlinecheck" label="1">指定时间上线</el-radio>
                        <el-form-item  v-if="model.onlinecheck=='1'" prop="online_time" style="display: inline-block;margin-left: 50px">
                          <div class="block">
                            <el-date-picker
                              v-model="model.online_time"
                              type="datetime"
                              placeholder="选择日期时间"
                              format="yyyy-MM-dd HH:mm:ss"
                              value-format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
                          </div>
                        </el-form-item>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <!-- 游戏适配信息 -->
                <el-collapse-item name="2">
                  <template slot="title">
                    <span><i class="fa fa-info-circle"></i>游戏适配信息</span>
                  </template>
                  <el-row :gutter="10">
                    <el-col :xs="23" :sm="{span: 20, offset: 2}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="手机分辨率" prop="resolution" class="px">
                        <el-checkbox-group v-model="model.resolution">
                          <el-checkbox label="1">1080*1920</el-checkbox>
                          <el-checkbox label="2">720*1280</el-checkbox>
                          <el-checkbox label="3">540*960</el-checkbox>
                          <el-checkbox label="4">480*854</el-checkbox>
                          <el-checkbox label="5">480*800</el-checkbox>
                          <el-checkbox label="0">其他分辨率</el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                      <el-form-item label="手机系统版本" prop="px" class="px">
                        <el-checkbox-group v-model="model.system">
                          <el-checkbox label="1">Android 8.0</el-checkbox>
                          <el-checkbox label="2">Android 7.0</el-checkbox>
                          <el-checkbox label="3">Android 6.0</el-checkbox>
                          <el-checkbox label="4">Android 5.0</el-checkbox>
                          <el-checkbox label="5">Android 4.0</el-checkbox>
                          <el-checkbox label="0">之前版本</el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                      <el-form-item label="手机运行内存" prop="px" class="px">
                        <el-checkbox-group v-model="model.memory">
                          <el-checkbox label="1">8GB</el-checkbox>
                          <el-checkbox label="2">6GB</el-checkbox>
                          <el-checkbox label="3">4GB</el-checkbox>
                          <el-checkbox label="4">3GB</el-checkbox>
                          <el-checkbox label="5">2GB</el-checkbox>
                          <el-checkbox label="0">2GB以下</el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <!-- 备注信息 -->
                <el-collapse-item name="3">
                  <template slot="title">
                    <span><i class="fa fa-book"></i>备注信息</span>
                  </template>
                  <el-row :gutter="10">
                    <el-col :xs="23" :sm="{span: 20, offset: 2}" type="flex" class="row-bg" justify="center">
                      <el-form-item label="备注信息" prop="remark">
                        <el-input v-model.trim="model.remark" type="textarea"
                                  :rows="8"  :maxlength="500" readonly>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-collapse-item>
              </el-form>
            </el-collapse>
            <div class="formButton">
              <el-button type="info" style="width: 18%" icon="el-icon-error" v-on:click="backIt();">返回</el-button>
              <el-button type="primary" style="width: 18%;margin-left:16px;" icon="el-icon-success" v-on:click="saveIt()" >生成测试报告</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div v-show="!showIt">
      <el-form ref="form" :model="model"  label-width="150px" disabled class="myCheck">
        <hr>
        <!-- 测试包 -->
        <span class="spanSty"><i class="fa fa-briefcase"></i>测试包</span>
        <el-row :gutter="10">
          <el-col :xs="23" :sm="{span: 20, offset: 2}" type="flex" class="row-bg" justify="center">
            <el-form-item label="合作模式" prop="cooperation">
              <el-select v-model="model.cooperation" placeholder="请选择" style="width: 80%"  clearable>
                <el-option label="代理" value="1"></el-option>
                <el-option label="其他" value="2"></el-option>
              </el-select>
            </el-form-item>
            <div v-if="model.cooperation==1">
              <el-form-item label="测试包下载地址" prop="" class="gameApk">
                <a :href="model.gameapk">点击下载</a>
              </el-form-item>
              <el-form-item label="是否强更" prop="fousupdate">
                <el-radio v-model="model.fousupdate" label="1">是</el-radio>
                <el-radio v-model="model.fousupdate" label="0">否</el-radio>
              </el-form-item>
            </div>
            <div v-else>
              <el-form-item label="测试包下载地址" prop="gameApk">
                <a :href="model.gameapk" v-if="changeIt">点击下载</a>
                <el-input placeholder="请输入测试包下载地址" v-model="model.gameApk" clearable v-if="!changeIt"
                          @clear="model.gameApk=''" style="width: 80%">
                </el-input>
                <el-button type="primary" @click="changeIt=false;model.size=''" v-if="changeIt" style="margin-left: 15px">更改链接地址</el-button>
              </el-form-item>
              <el-form-item v-if="!changeIt" class='marBot'>
                {{model.gameapk}}（原地址）
              </el-form-item>
              <el-form-item  prop="size">
                <el-row :gutter="10">
                  <el-col :xs="20" :sm="{span:12, offset: 0}" type="flex" class="row-bg" justify="center">
                    <el-input placeholder="请输入商用包大小（单位MB）" v-model="model.size" clearable v-if="!changeIt"
                              @clear="model.size=''"></el-input>
                  </el-col>
                  <el-col :xs="20" :sm="{span: 10, offset: 0}" type="flex" class="row-bg" justify="center">
                    <el-button type="primary" v-if="!changeIt"
                               @click="changeDress();" :disabled="!model.gameApk" icon="el-icon-news">保存</el-button>
                    <el-button type="info" icon="el-icon-error" v-if="!changeIt && !model.gameApk"
                               @click="changeIt=true">取消</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item v-if="!changeIt">
                <span class="spanStyle">*商用包大小（单位MB）</span>
              </el-form-item>
            </div>
            <div v-show="model.Type==2">
              <el-form-item label="H5游戏链接地址" prop="h5adress">
                <el-input placeholder="H5游戏链接地址" v-model="model.h5adress" clearable></el-input>
              </el-form-item>
            </div>
            <el-form-item label="上线时间" prop="onlinecheck">
              <el-radio v-model="model.onlinecheck" label="0">测试完成即可上线</el-radio>
              <el-radio v-model="model.onlinecheck" label="1">指定时间上线</el-radio>
              <el-form-item  v-if="model.onlinecheck=='1'" prop="online_time" style="display: inline-block;margin-left: 50px">
                <div class="block">
                  <el-date-picker
                    v-model="model.online_time"
                    type="datetime"
                    placeholder="选择日期时间"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 游戏适配信息 -->
        <hr>
        <span class="spanSty"><i class="fa fa-info-circle"></i>游戏适配信息</span>
        <el-row :gutter="10">
          <el-row :gutter="10">
            <el-col :xs="23" :sm="{span: 20, offset: 2}" type="flex" class="row-bg" justify="center">
              <el-form-item label="手机分辨率" prop="resolution" class="px">
                <el-checkbox-group v-model="model.resolution">
                  <el-checkbox label="1">1080*1920</el-checkbox>
                  <el-checkbox label="2">720*1280</el-checkbox>
                  <el-checkbox label="3">540*960</el-checkbox>
                  <el-checkbox label="4">480*854</el-checkbox>
                  <el-checkbox label="5">480*800</el-checkbox>
                  <el-checkbox label="0">其他分辨率</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="手机系统版本" prop="px" class="px">
                <el-checkbox-group v-model="model.system">
                  <el-checkbox label="1">Android 8.0</el-checkbox>
                  <el-checkbox label="2">Android 7.0</el-checkbox>
                  <el-checkbox label="3">Android 6.0</el-checkbox>
                  <el-checkbox label="4">Android 5.0</el-checkbox>
                  <el-checkbox label="5">Android 4.0</el-checkbox>
                  <el-checkbox label="0">之前版本</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="手机运行内存" prop="px" class="px">
                <el-checkbox-group v-model="model.memory">
                  <el-checkbox label="1">8GB</el-checkbox>
                  <el-checkbox label="2">6GB</el-checkbox>
                  <el-checkbox label="3">4GB</el-checkbox>
                  <el-checkbox label="4">3GB</el-checkbox>
                  <el-checkbox label="5">2GB</el-checkbox>
                  <el-checkbox label="0">2GB以下</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <!-- 备注信息 -->
        <hr>
        <span class="spanSty"><i class="fa fa-book"></i>备注信息</span>
        <el-row :gutter="10">
          <el-col :xs="23" :sm="{span: 20, offset: 2}" type="flex" class="row-bg" justify="center">
            <el-form-item label="备注信息" prop="remark">
              <el-input v-model.trim="model.remark" type="textarea"
                        :rows="8"  :maxlength="500" readonly>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Form from '../../common/form'
  var reg =require('../../common/commonMethods.js')
  import myThirdParty from '../../common/store/myThirdParty'
  var form = new Form({store: myThirdParty});
  var model = function(){
    return {
    }
  }
  form.data=function () {
    return {
      loading: false,
      activeNames:['1','2','3','4'],
      model:model(),
      origModel: model(),
      gameId:'',
      gName:'',
      changeIt:true,
      showIt:true,
    }
  };
  form.mounted=function () {
    this.$parent.infoManage = false
    this.gameId=this.$route.params.id
    this.gName=this.$route.params.gName
    this.getCheckGame()
    this.setShow()
  };
  form.methods.setShow=function () {
    if(this.$route.name=='gameTestInfo'){
      this.showIt=true
    }else  if(this.$route.name=='gameInfoForm'){
      this.showIt=false
    }
  }
  form.methods.getCheckGame=function () {
    this.loading=true;
    var gameId=this.$route.params.id
    this.$http['post']('/myGame/getCheckGame',{gameId:gameId})
      .then((response) => {
      /*if(!response.data.data.length){
        this.$alert('用户尚未提交测试信息，请稍后再试！', '温馨提示', {
          confirmButtonText: '确定',
          type: 'error'
        }).then(() => {
          this.backIt()
        });

      }*/
        for(var key in response.data.data[0]){
            if(key=='resolution' || key=='system' || key=='memory'){
              this.model[key]=response.data.data[0][key].split(',')
              this.origModel=response.data.data[0][key].split(',')
            }else{
              this.model[key]=response.data.data[0][key]
              this.origModel[key]=response.data.data[0][key]
            }
          }
        this.loading=false
      })
      .catch((response) => {
        this.loading=false

      })
  }
  form.methods.saveIt=function () {
    this.$parent.infoManage = false
    this.$router.push({name:'gameTestReport',params: {id: this.gameId,gName:this.gName}})
  }
  form.methods.backIt=function () {
    this.$router.push({name:'gameManage',params:{status:3}});
  }
  form.methods.changeDress=function () {
    this.$confirm('此操作将更换原有下载链接地址, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.model.gameId=this.$route.params.id
      var params={
        gameId:this.model.gameId,
        size:this.model.size,
        gameApk:this.model.gameApk,
      }
      this.loading = true
      this.$http['post']('/myGame/checkGame',params)
        .then((response) => {
          this.loading = false
          this.$alert('修改成功！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'success'
          }).then(() => {
            this.changeIt=true;
          });
        })
        .catch((response) => {
          this.loading=false
          this.$alert('修改失败！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'error'
          });
        })
    })
  }
  export default form
</script>

<style scoped>

  .bread {
    color: #303133;
    font-weight: 700;
    background: 0 0;
    padding: 0;
  }
  .spanSty{
    margin-left: 30px;
    color: #409EFF;
    font-size: 16px;
  }
</style>
