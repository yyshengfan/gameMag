import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "gameManage",
  idName: "gameId",
  module: new storeCtor({idName: "gameId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/auditManage/getGameInfo'
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
    total:'gameManage/total',
    get: 'gameManage/data',
    set: 'gameManage/init',
  },
}
var gameManage =  new storeBuilder(option);
gameManage.status = {
  0: '待审核,await,el-icon-edit-outline',
  1: '审核不通过,no-pass,fa fa-times',
  2: '待测试,await,fa fa-code-fork',
  3: '测试未通过,no-pass,fa fa-forward',
  4: '待商用,await,fa fa-comments-o',
  5: '商用,finish-pass,fa fa-check',
  6: '下线待审核,no-pass,el-icon-edit-outline',
  7: '已下线,no-pass,fa fa-times',
}
gameManage.grade = {
  'A':'A',
  'B': 'B',
  'C': 'C',
  'D': 'D',
  'S': 'S',
  0:'未评级'
}
gameManage.infostatus = {
  1:'新增',
  2: '修改信息',
}

export default gameManage

