import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "merchantCombo",
  idName: "merchantId",
  module: new storeCtor({idName: "merchantId"}),
  autoLoad: true,
  params: {},
  server: {
    load: {
      method: "get",
      url: '/merchant/combo'
    }
  },
  local: {
    get: 'merchantCombo/data',
    set: 'merchantCombo/init'
  }
}

export default new storeBuilder(option)

