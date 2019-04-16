import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "sdkChannel",
  idName: "gameId",
  module: new storeCtor({idName: "gameId"}),
  autoLoad: true,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/gamestatistics/getSDKChannel'
    },
    get: {
      method: "post",
      url: '/gamestatistics/getSDKChannel'
    },
  },
  local: {
    total:'sdkChannel/total',
    get: 'sdkChannel/data',
    set: 'sdkChannel/init',
  }
}

export default new storeBuilder(option)

