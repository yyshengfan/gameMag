<template>
  <div class="MyContainer">
    <div class="contentTitle">
      <span class="first">
        <img src="../../resource/images/img/navHome-Icon.png">
      </span>
      <span class="first">
         <router-link :to="{ path: '/electronicNoticeMag' }">个人中心</router-link>
      </span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="first"><router-link :to="{ path: '/electronicNoticeMag' }">电子公告</router-link></span>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <span class="second">{{titleMsg}}</span>
    </div>
    <!--用户基本信息表单-->
    <el-card class="box-card changeMar">
      <div class="MyContainerCon" v-loading="loading">
        <div style="margin:20px 0 "></div>
        <el-row>
          <el-col :sm="20" :xs="23">
            <el-form v-loading="loading" label-width="200px" :model="model" ref="form" :rules="rules">
              <el-form-item label="标题:" prop="title">
                <el-input v-model.trim="model.title"></el-input>
              </el-form-item>
              <el-form-item label="正文编辑:" prop="msg">
                <el-input v-model.trim="model.msg" type="textarea" :rows="8"></el-input>
              </el-form-item>
              <el-form-item label="公告类型:" prop="type">
                <el-radio-group v-model="model.type">
                  <el-radio label="1">站内公告</el-radio>
                  <el-radio label="3">平台公告</el-radio>
                  <el-radio label="4">用户消息</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                label="接收角色:" prop="rold" v-if="model.type==1">
                <el-checkbox-group v-model="model.rold">
                  <el-checkbox :label="0">开发商/发行商</el-checkbox>
                  <el-checkbox :label="1">渠道商</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item
                label="指定接收公司:" prop="receiveCompanys" v-if="model.type==1">
                <el-transfer
                  style="width:100%;margin: 10px 0;"
                  filter-placeholder="请输入城市拼音"
                  v-model="model.receiveCompanys"
                  :titles="['选择', '已选中']"
                  :button-texts="['取消', '选中']"
                  :data="companys">
                </el-transfer>

              </el-form-item>

              <el-form-item label="发送时间:" prop="send" v-if="model.type!=4">
                <el-radio-group v-model="model.send">
                  <el-radio label="1">立刻发送</el-radio>
                  <el-radio label="2">指定时间发送</el-radio>
                </el-radio-group>
                <el-date-picker
                  v-show="model.send=='2'"
                  style="margin-left:30px"
                  v-model="model.s_time"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm"
                  :picker-options="pickerOptions"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <div class="formButton">

                </div>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="formButton">
          <el-button type="info" class="status" style="width: 18%" icon="el-icon-error" @click="back">取消</el-button>
          <el-button type="warning" class="status" icon="fa fa-save" style="width:18%;margin: 0 16px;" @click="send(3)">暂时保存</el-button>
          <el-button type="primary" class="status" icon="fa fa-send" style="width: 18%" @click="send(1)">发送</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import Form from '../../common/form'
  import electronicNotice from '../../common/store/electronicNotice'
  import converter from '../../common/converter'
  import cpCompany from '../../common/store/cpCompany'
  import channelCompany from '../../common/store/channelCompany'

  var model = function () {
    return {
      noticeId: '',
      send: '',
      type: '',
      title: '',
      msg: '',
      rold: [],
      s_time: '',
      status: '',
      receiveCompanys: [],
    }
  };
  var form = new Form({store: electronicNotice});

  form.data = function () {
    return {
      routeName: "electronicNoticeMag",
      titleMsg: '',
      companys: [],
      loading: false,
      model: model(),
      origModel: model(),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      modelFormat: {
        rold: converter.stringToIntArray,
        receiveCompanys: converter.stringToIntArray
      },
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'change'},
        ],
        msg: [
          {required: true, message: '请输入正文', trigger: 'change'},
        ],
        type: [
          {required: true, message: '请选择公告类型', trigger: 'change'},
        ],
        rold: [
          {type: 'array', required: true, message: '请选择接收角色', trigger: 'change'}
        ],
        receiveCompanys: [
          {type: 'array', required: true, message: '请选择接收公司', trigger: 'change'}
        ],
        send: [
          {required: true, message: '请选择发送时间', trigger: 'change'},
        ]
      }
    }
  }

  form.created = function () {
    this.model.noticeId = this.$route.params.id
    if (this.$route.params.id !== 'new') {
      this.action = 'update'
      this.titleMsg = '修改'
      this.get()

      setTimeout(() => {
        this.getCompanyByNoticeId(this.$route.params.id)
      }, 1000)

    } else {
      this.action = "add"
      this.titleMsg = '新增'
    }
  }

  form.computed = {
    cpCompany: cpCompany.data,
    channelCompany: channelCompany.data
  }

  form.watch = {
    'model.rold': function (val) {
      this.getcpCompany(val)
    }
  }

  // 公司数据拼接
  form.methods.getcpCompany = function (val) {
    var str = val.join(',')
    switch (str) {
      case '':
        this.companys = []
        break;
      case '0':
        this.companys = this.initCompany(this.cpCompany)
        break;
      case '1':
        this.companys = this.initCompany(this.channelCompany)
        break;
      case '0,1':
        this.companys = this.initCompany(this.cpCompany).concat(this.initCompany(this.channelCompany))
        break;
      case '1,0':
        var cpCompany = this.initCompany(this.cpCompany)
        var channelCompany = this.initCompany(this.channelCompany)
        this.companys = cpCompany.concat(channelCompany)
        break;
    }
  }

  // 公司数据格式化
  form.methods.initCompany = function (company) {
    var data = []
    company.forEach((company, index) => {
      data.push({
        label: company.company_name || '',
        key: company.customer_id || '',
      });
    });
    return data
  }

  // 发送
  form.methods.send = function (val) {
    this.model.status = val

    if (this.model.send == '2' && this.model.s_time.getTime() < Date.now()) {
      this.$confirm('发送时间不能小于当前时间！', '提示', {
        type: 'warning',
      })
      return
    }

    this.save()
  }

  // 获取公司组
  form.methods.getCompanyByNoticeId = function (noticeId) {
    this.$http.post('/MyCenter/getCompanyByNoticeId', {'noticeId': noticeId})
      .then((response) => {
        var array = []
        var list = response.data.data.list
        for (var item of list) {
          array.push(item.customerId)
        }
        this.model.receiveCompanys = array
      })
  }
  export default form
</script>

<style>
  .el-button--text {
    color: #fff;
    cursor: auto;
    display: hidden;
  }

  .el-button--text:hover {
    color: #fff;
    cursor: auto;
    display: hidden;
  }
</style>
