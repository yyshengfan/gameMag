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
      <span class="second">显示</span>
    </div>
    <!--用户基本信息表单-->
    <el-card class="box-card changeMar">
      <div class="MyContainerCon">
        <div style="margin:20px 0 "></div>
        <el-row>
          <el-col :sm="24" :xs="24">
            <div class="electronicNoticeTitle">
              <h4>{{model.title}}</h4>
              <!--<p style="margin-top: 20px;">发布时间：{{model.status=='3'? '暂未发布':formatOtherDate(model.s_time)}}</p>-->
            </div>
            <div>
              <p class="electronicNoticeMsg">{{model.msg}}</p>
              <p style="margin: 20px 0 0 24px;">发布时间：
                <span style="color: #5fa8fd;">{{model.status=='3'? '暂未发布':formatOtherDate(model.s_time)}}</span>
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import Form from '../../common/form'
import electronicNotice from '../../common/store/electronicNotice'

var form = new Form({store: electronicNotice});
  form.data = function() {
    return {
      editer: true,
      model:{
        title:'',
        msg:'',
        rold:[],
        s_time:'',
        status:'',
      },
      origModel:{},
    }
  }
  form.mounted = function(){
    this.get()
  }
  export default form
</script>

<style>
  .electronicNoticeTitle{
    text-align: center;
    margin-bottom: 20px
  }
  .electronicNoticeTitle h4{
    color: #5fa8fd;
    font-size: 20px;
  }

  .electronicNoticeMsg{
    color: #333;
    margin-top: 20px;
    line-height: 24px;
    font-size: 14px;
    text-indent: 2em;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }

</style>
