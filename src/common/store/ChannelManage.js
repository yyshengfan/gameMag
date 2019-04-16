import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "channelManage",
  idName: "channelId",
  module: new storeCtor({idName: "channelId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/auditManage/getCnManageInfo'
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
    total:'channelManage/total',
    get: 'channelManage/data',
    set: 'channelManage/init',
  },
}
var channelManage =  new storeBuilder(option);

channelManage.type = {
  0: '应用商店',
  1: '应用商店',
  2: '广告联盟'
}
channelManage.status1 = {
  0: '待审核,await,el-icon-edit-outline',
  1: '审核不通过,no-pass,fa fa-times',
  2: '审核通过,finish-pass,fa fa-check',
  3: '下线待审核,no-pass,el-icon-edit-outline',
  4: '已下线,no-pass,fa fa-times',
}
channelManage.status = {
  1: '新增,add-pass,fa fa-plus',
  2: '修改,await,el-icon-edit-outline',
  3: '下线,no-pass,fa fa-times'
}
export default channelManage

