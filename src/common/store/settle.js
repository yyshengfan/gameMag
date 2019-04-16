import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "settle",
  idName: "settleId",
  module: new storeCtor({idName: "settleId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "get",
      url: '/settle/list'
    },
    get: {
      method: "post",
      url: '/settle/get'
    }
  },
  local: {
    total:'settle/total',
    get: 'settle/data',
    set: 'settle/init',
  }
}

export default new storeBuilder(option)

