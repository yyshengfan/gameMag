import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "gameSort",
  idName: "id",
  module: new storeCtor({idName: "id"}),
  autoLoad: true,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/myGame/getGameType '
    },
  },
  local: {
    total:'gameSort/total',
    get: 'gameSort/data',
    set: 'gameSort/init',
  }
}

export default new storeBuilder(option)

