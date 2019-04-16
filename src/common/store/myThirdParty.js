import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "myThirdParty",
  idName: "channel_id",
  module: new storeCtor({idName: "channel_id"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/trench/manage'
    },
    get: {
      method: "post",
      url: '/trench/get'
    },
   add:{
     method: "post",
     url: '/trench/add'
   },
    update:{
      method: "post",
      url: '/trench/up'
    },
    delete:{
      method: "post",
      url: '/trench/del'
    }
  },
  local: {
    total:'myThirdParty/total',
    get: 'myThirdParty/data',
    set: 'myThirdParty/init',
    add: 'myThirdParty/add',
    update: 'myThirdParty/update',
    delete: 'myThirdParty/delete',
  },
}
//table格式化
var myThirdParty =  new storeBuilder(option);
  myThirdParty.type = {
    0: '应用商店',
    1: '门户网站',
    2: '广告联盟',
  }
  myThirdParty.status = {
    0: '未审核',
    1: '审核通过',
    2: '审核失败',
  }
myThirdParty.cooperation_type = {
  0: '3:4:3',
  1: '3:3:4',
}
export default myThirdParty

