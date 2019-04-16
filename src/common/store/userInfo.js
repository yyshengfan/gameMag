import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "userInfo",
  idName: "customerId",
  module: new storeCtor({idName: "customerId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/MyCenter/getInfoSelf'
    },
  },
  local: {
    get: 'userInfo/data',
    set: 'userInfo/init',
  },
}
var userInfo =  new storeBuilder(option);
userInfo.role = {
  0: '游戏开发/发行商',
  1: '渠道商',

}
export default userInfo

