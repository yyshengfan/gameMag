<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <router-link :to="{ path: '/roleMag' }">系统设置</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="first">
        <router-link :to="{ path: '/roleMag' }">角色管理</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">{{rolestatus}}</span>
    </div>
    <el-card class="box-card changeMar MyContainerCon"  v-loading="!allMeun.length || loading">
      <div style="margin-top: 2rem">
        <el-row>
          <el-col :sm="20" :xs="23">
            <el-form label-width="200px" :model="model" ref="form" :rules="rules">
              <el-form-item label="角色名称:" prop="roleName">
                <el-input v-model.trim="model.roleName"></el-input>
              </el-form-item>
              <el-form-item label="角色说明:" prop="explain">
                <el-input v-model.trim="model.explain" type="textarea" :rows="5"></el-input>
              </el-form-item>
            </el-form>
            <el-form class="myCheck02">
              <el-form-item label-width="0" prop="msg">
                <div v-for="meun in allMeun" :key="meun.id">
                  <div style="width:200px;font-size:14px;text-align:right;padding-right:12px;">
                    <el-switch v-model="meun.active" @change="showSwitch(meun.id,1)" active-color="#5fa8fd;">
                    </el-switch>
                    <span style="display: inline-block;width: 60px;">{{meun.text}}:</span>
                  </div>
                  <div style="margin: 0px 10px 0 200px"  v-for="child in meun.children" :key="child.id">
                    <div>
                      <el-checkbox :disabled="!meun.active" style="width: 100%"
                                   v-model="child.active" @change="showSwitch(child.id,0)">
                        <span style="font-size:17px;color:#333333;">{{child.text}}</span>
                      </el-checkbox>
                    </div>
                    <div>
                      <el-checkbox style="color:#5fa8fd;" v-for="button in child.children" :disabled="!child.active"
                                   v-model="button.active" @change="insertChild" :key="button.id">
                        {{button.text}}
                      </el-checkbox>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div class="formButton">
        <el-button type="info" style="width: 18%" icon="el-icon-error" @click="back">取消</el-button>
        <el-button type="primary" style="width: 18%;margin-left:16px;" icon="el-icon-success" @click="create">保存</el-button>
      </div>
    </el-card>
  </div>

</template>

<script>
  import Form from '../../common/form'
  import roleList from '../../common/store/roleList'

  var form = new Form({store: roleList});

  form.data = function () {
    return {
      rolestatus: '新增角色',
      loading:false,
      allMeun: [],
      allSwitch: [],
      model: {
        roleId: '',
        roleName: '',
        explain: '',
        arryId: [],
        permissionId: '',
      },
      origModel: {},
      rules: {
        roleName: [
          {required: true, message: '请输入角色名称', trigger: 'blur'},
        ],
        explain: [
          {required: true, message: '请输入角色说明', trigger: 'blur'},
        ]
      }
    }
  }

  form.mounted = function () {
    
    if(this.$route.params.id != 'new'){
      this.model.roleId = this.$route.params.id
      this.action = 'update';
      this.rolestatus = '编辑角色';
      this.get();
    }else{
      this.action = 'add';
      this.getExist();
    }
  }

  form.computed = {}

  form.watch = {
    'model.permissionId':function(){
      this.getExist();
    }
  }

  // 获取菜单目录
  form.methods.getExist = function () {
    this.$http.post('/privilege/main').then((response) => {
      this.allMeun = _.clone(this.toTree(response.data.data.list));
    }).catch((response) => {})
  }

  // 创建
  form.methods.create = function () {
    this.model.arryId = []
    this.model.arryId = this.getArryId(this.allMeun)
    if (this.model.arryId.length < 1) {
      this.$confirm('请至少选择一个权限', '提示', {
        type: 'warning',
      })
    } else {
      this.save()
    }
  }

  // swich选项开启与关闭
  form.methods.showSwitch = function (val,type) {
    let _this = this
    let loop = function(val,list){
      for (var item of list) {
        if (val == item.id) {
          item = _this.forChild(item,item.active);
        }
      }
    }
    if(type){
      loop(val,_this.allMeun)
    }else{
      for(let item of _this.allMeun){
        loop(val,item.children||[])
      }
    }
  }

  // for对子对象active属性与父级保持一致
  form.methods.forChild = function(obj,istrue){
    if(obj.children){
      obj.active = istrue
      for (var item of obj.children) {
        item.active = istrue
        this.forChild(item,istrue)
      }
    }
    return obj
  }

  // 统一获取已选菜单
  form.methods.getArryId = function (data) {
    var list = this.model.arryId
    for (var item of data) {
      if (item.active) {
        list.push(item.id)
      }
      item.children && this.getArryId(item.children)
    }
    return list
  }

  // 插入清除子节点
  form.methods.insertChild = function (val) {
    var list = this.model.arryId
    if (list.indexOf(val) == -1) {
      list.push(val)
    } else {
      list.splice(list.indexOf(val), 1)
    }
    this.model.arrId = list
  }

  // 数据初始化（树结构转化）
  form.methods.toTree = function (data, parentId) {
    let permissinList = this.model.permissionId.split(',');
    parentId = parentId || 0;
    var tree = [];
    var temp;
    var length = data.length || 0;
    for (var i = 0; i < length; i++) {
      if (data[i].parentId == parentId) {
        var obj = data[i];
        obj.active = permissinList.indexOf(obj.id+'') < 0? false:true;
        temp = this.toTree(data, data[i].id);
        if (temp.length > 0) {
          // obj.active = true;
          obj.children = temp;
        }
        tree.push(obj);
      }
    }
    return tree;
  }
  export default form
</script>

<style scoped>
</style>
