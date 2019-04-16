import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "sdkGame",
  idName: "gameId",
  module: new storeCtor({idName: "gameId"}),
  autoLoad: true,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/gamestatistics/getSDKGame'
    },
    get: {
      method: "post",
      url: '/gamestatistics/getSDKGame'
    }
  },
  local: {
    total:'sdkGame/total',
    get: 'sdkGame/data',
    set: 'sdkGame/init',
  }
}

export default new storeBuilder(option)

