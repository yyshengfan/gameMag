<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <p class="headMsg">CP管理-合同管理</p>
      </div>
      <div>
        <el-row>
          <el-col :sm="20" :xs="23">
            <el-form label-width="200px" :model="model" ref="form">
              <el-form-item label="标题:">
                <el-input v-model="model.title"></el-input>
              </el-form-item>
              <el-form-item label="正文编辑:">
                <el-input v-model="model.msg" type="textarea" :rows="8"></el-input>
              </el-form-item>
              <el-form-item label="接收角色:" props="rold">
                <el-checkbox-group v-model="model.rold">
                  <el-checkbox :label="1">开发商/发行商</el-checkbox>
                  <el-checkbox :label="2">渠道商</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="指定接收公司:">
                <el-transfer
                  style="width:500px"
                  filterable
                  :filter-method="filterMethod"
                  filter-placeholder="请输入城市拼音"
                  v-model="model.value2"
                  :data="data2">
                </el-transfer>
              </el-form-item>
              <el-form-item label="发送时间:">
                <el-radio-group v-model="model.send">
                  <el-radio :label="1">立刻发送</el-radio>
                  <el-radio :label="2">指定时间发送</el-radio>
                </el-radio-group>
                <el-date-picker
                  style="margin-left:30px"
                  v-model="model.s_time"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <div style="margin-top:30px"></div>
                <el-button v-show="editer" type="primary" style="margin-left:50px" icon="el-icon-error">取消</el-button>
                <el-button v-show="editer" type="primary" style="margin-left:30px" icon="el-icon-success">暂时保存</el-button>
                <el-button v-show="editer" type="primary" style="margin-left:30px">发送</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>

</template>

<script>
import Form from '../../common/form'
import electronicNotice from '../../common/store/electronicNotice'
import converter from '../../common/converter'

var form = new Form({store: electronicNotice});

  const generateData2 = _ => {
  const data = [];
  const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
  const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
    cities.forEach((city, index) => {
      data.push({
        label: city,
        key: index,
        pinyin: pinyin[index]
        });
      });
      return data;
  }

  form.data = function() {
    return {
      data2: generateData2(),
      value2: [],
      editer: true,
      model:{
        title:'',
        msg:'',
        rold:[],
        s_time:'',
        status:'',
      },
      origModel:{},
      modelFormat:{
        rold:converter.stringToIntArray
      },
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      }
    }
  }

  form.mounted = function(){
    this.get()
  }
  export default form
</script>

<style>

</style>
