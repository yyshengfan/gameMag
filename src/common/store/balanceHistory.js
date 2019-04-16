import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "balanceHistory",
  idName: "balanceHistoryId",
  module: new storeCtor({idName: "balanceHistoryId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "get",
      url: '/balanceHistory/list'
    }
  },
  local: {
    total:'balanceHistory/total',
    get: 'balanceHistory/data',
    set: 'balanceHistory/init'
  }
}

export default new storeBuilder(option)

