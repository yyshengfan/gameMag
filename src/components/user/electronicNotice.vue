<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeRoute:"electronicNoticeMag",
      };
    },
    mounted: function () {
      console.log(1,this.$route.matched[1]);
      if(this.$route.matched[1])
        this.activeRoute = this.$route.matched[1].name
      this.$router.push({name: this.activeRoute})
    },
    watch:{
      $route(){
        if(!this.$route.matched[1])
        this.$router.push({name: this.activeRoute})
      }
    }
  };
</script>
