
<template>
  <div>
    <div class="contentTitleModel">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
        <a v-on:click="closeIt()">CP管理</a>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="first"> 游戏评级</span>
    </div>
    <div style="margin:10px 0 "></div>
    <div v-loading="loading">
      <el-row :gutter="10">
        <el-form  :model="model"  ref="form" :rules="rules" label-width="120px" >
          <el-form-item label="游戏评分" prop="score">
            <el-input v-model="model.score" placeholder="请输入游戏评分" @change="changeLever()" style="width:50%;" :maxlength="3"></el-input>
            <span style="color: #F56C6C;">评分区间：0-100分</span>
          </el-form-item>
          <el-form-item label="游戏评级" prop="grade">
            <el-input v-model="model.grade" placeholder="游戏评级" style="width:50%;" readonly></el-input>
            <!--<el-select  v-model="model.grade" placeholder="请选择渠道分成比例" style="width:50%;" clearable disabled>
              <el-option label="A" value="1"></el-option>
              <el-option label="B" value="2"></el-option>
              <el-option label="C" value="3"></el-option>
              <el-option label="D" value="4"></el-option>
              <el-option label="S" value="5"></el-option>
            </el-select>-->
            <span style="color: #F56C6C;">等级分为：S/A/B/C/D，根据评分自动生成</span>
          </el-form-item>
          <el-form-item label="游戏评测" prop="evaluate">
            <el-input v-model.trim="model.evaluate" type="textarea"
                      :rows="8" placeholder="请输入内容500字以内" :maxlength="500" class="remarkStyle">
            </el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <div style="margin:10px 0 "></div>
      <div style="text-align: center">
        <el-button type="info" icon="el-icon-error" v-on:click="closeIt();resetForm('form')">取消</el-button>
        <el-button type="primary" icon="el-icon-success" v-on:click="saveIt()">提交</el-button>
      </div>
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
      score:'',grade:'',evaluate:''
    }
  }
  form.props= ['dialogLever','gameId']
  form.data=function () {
    return {
      loading: false,
      model:model(),
      rules:{
        score: [{required: true, validator: reg.RegisterInt, trigger: 'blur' }],
        grade:[{ required: true, message: '请选游戏级别', trigger: 'change' }],
        evaluate:[{ required: true, message: '请输入游戏评测', trigger: 'blur' },
          { min: 1, max: 500, message: '长度在 500字以内', trigger: 'blur' }]
      }
    }
  };
  form.mounted=function () {
  };
  form.methods.closeIt=function () {
    this.$emit('successLever');
    this.model=model()
  }
  form.methods.resetForm=function(formName) {
    this.$refs[formName].resetFields();
  }
  //根据评分显示相应的级别
  form.methods.changeLever=function () {
    if( this.model.score<=100 && this.model.score>=90){
      this.model.grade="S"
    }else if(this.model.score<90 && this.model.score>=80){
      this.model.grade="A"
    }else if(this.model.score<80 && this.model.score>=70){
      this.model.grade="B"
    }else if(this.model.score<70 && this.model.score>=60){
      this.model.grade="C"
    }else if(this.model.score<60){
      this.model.grade="D"
    }
  }
  form.methods.saveIt=function () {
    this.model.gameId=this.gameId
    this.$refs['form'].validate((valid) => {
      if (valid) {
        this.loading = true
        this.$http['post']('/auditManage/gameInfoAudit', this.model)
          .then((response) => {
            this.loading = false
            this.$alert('评级成功！', '温馨提示', {
              confirmButtonText: '确定',
              type: 'success'
            }).then(() => {
              this.closeIt()
              this.resetForm('form')
            });

          })
          .catch((response) => {
            this.$alert('评级失败！', '温馨提示', {
              confirmButtonText: '确定',
              type: 'error'
            });
            this.loading = false
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
  export default form
</script>

<style scoped>
  .bread {
    color: #303133;
    font-weight: 700;
    background: 0 0;
    padding: 0;
  }
</style>
