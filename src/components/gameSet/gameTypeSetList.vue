<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/gameTypeSetList' }">游戏设置</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">游戏类型设置</span>
    </div>
    <el-card class="box-card" style="padding-bottom: 2rem;">
      <div class="MyContainerCon">
        <div style="margin-top: 2rem">
          <!--筛选器-->
            <div>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-button type="primary" icon="el-icon-plus" @click="dialogVisible=true"
                             style="height: 38px;" v-show="buttonList.add">新增游戏类型
                  </el-button>
                </el-col>
                <el-col :span="12">
                  <el-button type="primary" icon="el-icon-plus" @click="dialogVisible2=true"
                             style="height: 38px;" v-show="buttonList.add" :disabled="!modelTag.gameTypeId">新增游戏标签
                  </el-button>
                </el-col>
              </el-row>
          </div>
        </div>
        <!--表格-->
        <div style="margin:10px 0 "></div>
        <div>
          <el-row :gutter="20">
            <el-col :span="12">
            <span>游戏类型列表</span>
              <el-table v-loading="loading"
                        :size="$store.state.size"
                        :data="data" border
                        class="tableBorder thCenter"
                        style="width: 100%"
                        ref="singleTable"
                        highlight-current-row
                        @current-change="handleCurrentChange"
                        @row-click="getTypeTag">
              <el-table-column prop="id" label="ID" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="label" label="游戏类型" show-overflow-tooltip>
              </el-table-column>
              <!--<el-table-column show-overflow-tooltip width="100" label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" class="status" size="mini"
                             @click.stop="delGameType(scope.$index,data,scope.row)" v-show="buttonList.delete">
                    <i class="fa fa-eye"></i>删除
                  </el-button>
                </template>
              </el-table-column>-->
            </el-table>
            </el-col>
            <el-col :span="12">
              <span>游戏标签列表</span>
              <el-table v-loading="loading3"
                        :size="$store.state.size"
                        :data="typetagDatas" border
                        class="tableBorder thCenter"
                        style="width: 100%">
                <el-table-column label="序号" type="index" width="70">
                </el-table-column>
                <el-table-column prop="id" label="ID" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="tag" label="游戏标签" show-overflow-tooltip>
                </el-table-column>
                <!--<el-table-column show-overflow-tooltip width="100" label="操作">
                  <template slot-scope="scope">
                    <el-button type="danger" class="status" size="mini"
                               @click="delGameTag(scope.$index,typetagDatas,scope.row)" v-show="buttonList.delete">
                      <i class="fa fa-eye"></i>删除
                    </el-button>
                  </template>
                </el-table-column>-->
              </el-table>
            </el-col>
          </el-row>

        </div>
      </div>
    </el-card>
    <div class="dialogMyBg" v-if="dialogVisible">
      <div class="dialogMyCon">
        <p>添加游戏类型</p>
        <el-form :model="modelType" ref="form" :rules="rules" label-width="120px" class="otherForm">
          <el-form-item label="游戏类型名称" prop="gameType">
            <el-input placeholder="请输入游戏类型名称" v-model.trim="modelType.gameType" clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer2" style="text-align: center">
          <el-button type="info" icon="el-icon-error" @click="dialogVisible=false;modelType.gameType=''">取消</el-button>
          <el-button :disabled="!modelType.gameType" type="primary" style="margin-left: 20px;" icon="el-icon-success" @click="savaType()" v-loading="loading2">确定</el-button>
        </div>
      </div>
    </div>
    <div class="dialogMyBg" v-if="dialogVisible2">
      <div class="dialogMyCon">
        <p>添加游戏标签</p>
        <el-form :model="modelTag" ref="form" :rules="rules" label-width="120px" class="otherForm">
          <el-form-item label="所属游戏类型" prop="gameType">
            <el-input  v-model.trim="modelTag.gameType" readonly></el-input>
          </el-form-item>
          <el-form-item label="游戏标签名称" prop="gameTag">
            <el-input placeholder="请输入游戏标签名称" v-model.trim="modelTag.gameTag" clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer2">
          <el-button type="info" icon="el-icon-error" @click="dialogVisible2=false;modelTag.gameTag=''">取消</el-button>
          <el-button :disabled="!modelTag.gameTag" type="primary" style="margin-left: 20px;"
                     icon="el-icon-success" @click="savaTag()" v-loading="loading2">确定</el-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import List from '../../common/list'
  import gameType from '../../common/store/gameType'

  var list = new List({store: gameType});

  list.data = function() {
    return {
      loading: false,
      loading2:false,
      loading3:false,
      changeColor: 0,
      typetagDatas:[],
      dialogVisible:false,
      dialogVisible2:false,
      modelType:{gameType:''},
      modelTag:{gameType:'',gameTypeId:'',gameTag:''},
      rules:{
        gameType : [{ required: true, message: '请输入游戏类型名称', trigger: 'blur' }],
        gameTag : [{ required: true, message: '请输入游戏标签名称', trigger: 'blur' }],
      },
      buttonList:{
        delete:false,
        add:false,
      },
      filters:{
        gameId:'',
        gamephonetype:'',
        gName:'',
        phoneplatform:'',
        status:'',btime:'',etime:'',
      },
      pagination: {
        size: 10,
        page: 1
      },
    }
  }

  list.mounted = function() {
    this.$log("gameTypeSet mounted", this)
    this.initButton(92,111)
    this.getList()

  }
  list.methods.getTypeTag=function (row) {
    var id=''
    if(row){
      id=row.id
    }else{
      id=this.modelTag.gameTypeId
    }
    this.loading3=true
    this.$http['post']('/myGame/getGameTag',{gameType:id})
      .then((response) => {
        this.loading3=false
        this.typetagDatas=response.data.data
      })
      .catch((response) => {
        this.loading3=false

      })
  }
  list.methods.handleCurrentChange=function(val) {
    if(val){
      this.modelTag.gameType=val.label
      this.modelTag.gameTypeId=val.id
    }
  }
  list.methods.savaType=function () {
    this.loading2=true
    this.$http['post']('/myGame/addGameType',this.modelType)
      .then((response) => {
        this.$alert('游戏类型添加成功！', '温馨提示', {
          confirmButtonText: '确定',
          type: 'success'
        }).then(() => {
          this.loading2=false
          this.dialogVisible=false
          this.modelType=''
          this.getList()
        });
      })
      .catch((response) => {
        this.$alert('游戏类型添加失败！', '温馨提示', {
          confirmButtonText: '确定',
          type: 'error'
        }).then(() => {
          this.loading2=false
          this.dialogVisible=false
        });
      })
  },
    list.methods.savaTag=function () {
      this.loading2=true
      this.$http['post']('/myGame/addGameTag',this.modelTag)
        .then((response) => {
          this.$alert('游戏标签添加成功！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'success'
          }).then(() => {
            this.loading2=false
            this.dialogVisible2=false
            this.modelTag.gameTag=''
            this.getTypeTag()
          });
        })
        .catch((response) => {
          this.$alert('游戏标签添加失败！', '温馨提示', {
            confirmButtonText: '确定',
            type: 'error'
          }).then(() => {
            this.loading2=false
            this.dialogVisible2=false
          });
        })
    },
    list.methods.delGameType=function (index,rows,row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading=true
        this.$http['post']('/myGame/delGameType', {id:row.id})
          .then((response) => {
            this.loading=false
            this.$alert('删除成功！', '温馨提示', {
              confirmButtonText: '确定',
              type: 'success'
            }).then(() => {
              rows.splice(index, 1);
              this.typetagDatas=[]
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
  list.methods.delGameTag=function (index,rows,row) {
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.loading3=true
      this.$http['post']('/myGame/delGameTag', {id:row.id})
        .then((response) => {
          this.loading3=false
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
          this.loading3=false
        })
    }).catch(() => {
    });
  };
 /* list.methods.getGameName= function () {
    var data=this.gameDatas
    for(var i=0;i<data.length;i++){
      if(this.filters.gameId==data[i].gameId){
        this.filters.gName=data[i].gName
      }
    }
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
  list.computed.phoneplatform = function(){
    return phoneplatform.data()
  }
  list.computed.gamephoneType = function(){
    return gamephoneType.data()
  }
  list.methods.updateAll = function () {
    if(this.filters.gameId){
      var params={
        id:'updateAll',
      }
      for(var key in this.filters){
        params[key]=this.filters[key]
      }
      this.$router.push({name:'gameSetForm',params:params})
    }else{
      this.$alert('请选择要修改的游戏！', '温馨提示', {
        confirmButtonText: '确定',
        center: true,
        type: 'warning '
      });
    }

  }*/
  export default list

</script>

<style>
  .el-table .warning-row {
    color: #409DFB;
    font-weight: 600
  }
  .details{
    background-color: #F0F8FF;
    border-radius: 10px;
  }
  .dialog-footer2{
    margin-top: 50px;
    text-align: center;
  }
</style>
