import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "gameType",
  idName: "id",
  module: new storeCtor({idName: "id"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/myGame/getGameType '
    },
  },
  local: {
    total:'gameType/total',
    get: 'gameType/data',
    set: 'gameType/init',
  }
}

export default new storeBuilder(option)

