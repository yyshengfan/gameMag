import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "balanceSelector",
  idName: "customerId",
  module: new storeCtor({idName: "customerId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/balance/list'
    }
  },
  local: {
    total:'balanceSelector/total',
    get: 'balanceSelector/data',
    set: 'balanceSelector/init',
  }
}

export default new storeBuilder(option)

