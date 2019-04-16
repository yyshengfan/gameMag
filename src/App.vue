<template>
  <div>
    <div v-if="isLogin">
      <router-view></router-view>
    </div>
    <div v-else>
      <app-layout v-if="logged"></app-layout>
    </div>
  </div>
</template>

<script>
  import Layout from '@/components/public/Layout'
  import storeManage from '@/common/storeManage';

  export default {
    name: 'app',
    components: {
      'app-layout':Layout
    },
    data:function () {
      return {
      }
    },
    computed: {
      logged(){
        // return true
        return this.$store.state.auth !='';
      },
      isLogin(){
        return this.formatRouteName(this.$route.name)
      },
    },
    watch: {
      logged(){
        storeManage.forEach(function(store){
          if(store.option.autoLoad){
            this.$log("store autoLoad", store.name)
            store.load()
          }
        },this)
      }
    },
    mounted () {
      this.$store.state.activeDate = new Date()
      this.$log("App mounted", this)
      this.loginCheck()
      this.activeDate = new Date()
    },
    methods: {
      loginCheck(){
        let timeClick;
        this.$http.get('/login/check')
        .then((response) => {
          this.$store.state.auth = true
          this.$store.state.username = response.data.data.loginName
          this.$store.state.sessionId = response.data.data.sessionId
          timeClick = setTimeout(this.loginCheck,30000)
        })
        .catch((response) => {
          this.$router.push({name:'login'})
        })
      },
      formatRouteName(val){
        switch(val){
          case 'login':
            return true
          case 'regist':
            return true
          case 'registInfo':
            return true
          case 'forgetPwd':
            return true
          case 'index':
            return true
          default:
            return false
        }
      }
    }
  }
</script>
<style>
  .el-table th {
    background-color: #f5f7fa;
  }
</style>
