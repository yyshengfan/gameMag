import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "settlement",
  idName: "id",
  module: new storeCtor({idName: "id"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/balance/balanceall'
    },
  },
  local: {
    total:'settlement/total',
    get: 'settlement/data',
    set: 'settlement/init',
  }
}

export default new storeBuilder(option)

