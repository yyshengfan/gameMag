import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "gameProps",
  idName: "gameId",
  module: new storeCtor({idName: "gameId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/myGame/GetBilling'
    },
  },
  local: {
    total:'gameProps/total',
    get: 'gameProps/data',
    set: 'gameProps/init',
  },
}
var gameProps =  new storeBuilder(option);
gameProps.type = {
  '1': '软计费点',
  '2': '硬计费点',
}
export default gameProps

