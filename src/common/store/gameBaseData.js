import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "userData",
  idName: "gameId",
  module: new storeCtor({idName: "gameId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/gamestatistics/getUserDefaultData'
    },
    get: {
      method: "post",
      url: '/gamestatistics/getUserDefaultData'
    },
  },
  local: {
    total:'userData/total',
    get: 'userData/data',
    set: 'userData/init',
  }
}

export default new storeBuilder(option)

