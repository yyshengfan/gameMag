import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "myGame",
  idName: "gameId",
  module: new storeCtor({idName: "gameId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/myGame/GetGame'
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
    total:'myGame/total',
    get: 'myGame/data',
    set: 'myGame/init',
  },
}
var myGame =  new storeBuilder(option);
myGame.status = {
  0: '待审核',
  1: '审核通过',
  2: '待审核',
  3: '测试未通过',
  4: '待商用',
  5: '商用',
}
export default myGame

