import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "cpManage",
  idName: "gameId",
  module: new storeCtor({idName: "gameId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/auditManage/getInfo'
    },
    get: {
      method: "post",
      url: '/myGame/GetGameById'
    },
   add:{
     method: "post",
     url: '/myGame/create'
   }
  },
  local: {
    total:'cpManage/total',
    get: 'cpManage/data',
    set: 'cpManage/init',
  },
}
var cpManage =  new storeBuilder(option);
cpManage.t_status = {
  0: '待审核,await,el-icon-edit-outline',
  8: '审核通过,finish-pass,fa fa-check',
  1: '审核未通过,no-pass,fa fa-times',
  2: '审核未通过,no-pass,fa fa-times',
  3: '审核未通过,no-pass,fa fa-times',
  4: '审核未通过,no-pass,fa fa-times',
  5: '审核未通过,no-pass,fa fa-times',
  6: '审核未通过,no-pass,fa fa-times',
  7: '审核未通过,no-pass,fa fa-times',
}
cpManage.type = {
  1: '新增,add-pass,fa fa-plus',
  2: '修改资料,pass,fa fa-edit',
  3: '已下线,no-pass,fa fa-times'
}
export default cpManage

