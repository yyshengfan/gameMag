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
        activeRoute:"activitiesList",
      };
    },
    mounted: function () {
      this.$log("resourse mounted",this)
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
