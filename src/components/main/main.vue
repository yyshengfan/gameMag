<template>
  <div class="removeCard">
    <el-card class="box-card" v-loading="loading">
      <div class="Titlestatic1">
        个人中心
        <!-- <div class="companyStatus">
          <img src="../../resource/images/img/head-sy.png">消息通知
        </div> -->
      </div>
      <div style="margin-top: 64px;">
        <el-row :gutter="26" style="margin-top: 20px;">
          <el-col :xs="24" :sm="6" style="margin-bottom: 0;">
            <div class="sp-card mySpCard">
              <div class="mySpCard-Top">
                <img src="../../resource/images/img/admin-srIcon01.png">
                <p style="color: #1fb4aa;">{{card.yesterdayCount}}</p>
              </div>
              <div class="sp-cardName sp-cardName01">昨日收入(元)</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="6" style="margin-bottom: 0;">
            <div class="sp-card mySpCard">
              <div class="mySpCard-Top">
                <img src="../../resource/images/img/admin-srIcon02.png">
                <p style="color: #508dd2;">{{card.yesterdayCount30}}</p>
              </div>
              <div class="sp-cardName sp-cardName02">近30天收入(元)</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="6" style="margin-bottom: 0;">
            <div class="sp-card mySpCard">
              <div class="mySpCard-Top">
                <img src="../../resource/images/img/admin-srIcon03.png">
                <p style="color: #c35061;">{{card.dayall}}</p>
              </div>
              <div class="sp-cardName sp-cardName03">所有收入(元)</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="6" style="margin-bottom: 0;">
            <div class="sp-card mySpCard">
              <div class="mySpCard-Top">
                <img src="../../resource/images/img/admin-srIcon03.png">
                <p style="color: #d49e62;">{{card.gameall}}</p>
              </div>
              <div class="sp-cardName sp-cardName04">商用游戏</div>
            </div>
          </el-col>
        </el-row>
        <div class="space"></div>
      </div>
    </el-card>
  </div>

</template>

<script>

  // import electronicNotice from '@/components/user/electronicNotice'
  // import msgNotice from '@/components/user/msgNotice'

  export default {
    // components:{
    //   'electronicNotice':electronicNotice,
    //   'msgNotice':msgNotice
    // },
    mounted: function () {
      this.$log("main mounted");
      this.getData();
      this.getMoneyYesterday()
      this.getMoneyYesterday30()
      this.getMoneyDayall()
      this.getMoneyGameall()
    },
    data: function () {
      return {
        loading: false,
        card: {
          yesterdayCount: 0,
          yesterdayCount30: 0,
          dayall: 0,
          gameall: 0,
        },
        merchantId: ""
      }
    },
    watch: {
      merchantId: function () {
        this.getData();
      }
    },
    // computed:{
    //   merchantCombo : function(){
    //     return merchantCombo.data()
    //   },
    //   chartStyle:function(){
    //     if(this.$store.state.isMobile){
    //       return {overflowX: "auto"}
    //     }
    //     return {}
    //   },
    //   chartWidth:function(){
    //     var width = null
    //     if(this.$store.state.isMobile){
    //       width = 600;
    //     }
    //     return width
    //   }
    // },
    methods: {
      getData: function () {
        this.loading = true;
        this.$http.post('/getNum/aptitudeMag',{type:1})
          .then((response) => {
            this.loading = false;
            // this.card = response.data.data.card;
            // this.chart1(response.data.data.chart1)
            // this.chart2(response.data.data.chart2)
          })
          .catch((response) => {
            this.loading = false;
          })
      },
      getMoneyYesterday: function () {
        this.loading = true;
        this.$http.post('/balance/yesterday')
          .then((response) => {
            this.card.yesterdayCount=response.data.data.list[0].money?response.data.data.list[0].money:'0'
            this.loading = false;
          })
          .catch((response) => {
            this.loading = false;
          })
      },
      getMoneyYesterday30: function () {
        this.loading = true;
        this.$http.post('/balance/yesterday30')
          .then((response) => {
            this.card.yesterdayCount30=response.data.data.list[0].money
            this.loading = false;
          })
          .catch((response) => {
            this.loading = false;
          })
      },
      getMoneyDayall: function () {
        this.loading = true;
        this.$http.post('/balance/dayall')
          .then((response) => {
            this.card.dayall=response.data.data.list[0].money
            this.loading = false;
          })
          .catch((response) => {
            this.loading = false;
          })
      },
      getMoneyGameall: function () {
        this.loading = true;
        this.$http.post('/balance/gameall')
          .then((response) => {
            this.card.gameall=response.data.data.list[0].num
            this.loading = false;
          })
          .catch((response) => {
            this.loading = false;
          })
      },
    }
  };
</script>

<style>
  .mySpCard {
    width: 100%;
    background: #f0efef;
    border: none;
    height: 100px;
    color: #ffffff;
  }

  .mySpCard .mySpCard-Top {
    width: 90%;
    height: 66px;
    margin: 0 auto;
    display: -webkit-flex;
    display: flex;
    align-items: center;
  }

  .mySpCard .mySpCard-Top img {
    width: auto;
    height: 34px !important;
  }

  .mySpCard .mySpCard-Top p {
    font-size: 1.8rem;
    width: 60%;
    text-align: right;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mySpCard .sp-cardName01 {
    background: #1fb4aa;
  }

  .mySpCard .sp-cardName02 {
    background: #508dd2;
  }

  .mySpCard .sp-cardName03 {
    background: #c35061;
  }

  .mySpCard .sp-cardName04 {
    background: #d49e62;
  }

  .mySpCard .sp-cardName {
    height: 34px;
    line-height: 34px;
    color: #ffffff;
    padding-left: 5%;
  }

  .special-elCard {
    border: none;
  }

  .special-elCard .el-table th {
    background: #edf2f5;
  }

  .companyStatus {
    font-size: 12px;
    color: #fff;
    display: inline-block;
    background-color: #c35061;
    padding: 0 8px;
    height: 26px;
    line-height: 24px;
    margin-left: 10px;
    border-radius: 5px;
    opacity: 0.8;
  }

  .companyStatus img {
    height: 80%;
    width: auto;
    margin-top: -2px;
    margin-right: 6px;
  }
</style>
