import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "balance",
  idName: "customerId",
  module: new storeCtor({idName: "customerId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/balance/list'
    },
    get: {
      method: "post",
      url: '/balance/get'
    }
  },
  local: {
    total:'balance/total',
    get: 'balance/data',
    set: 'balance/init',
  }
}

export default new storeBuilder(option)

