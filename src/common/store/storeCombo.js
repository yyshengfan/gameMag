import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "storeCombo",
  idName: "storeId",
  module: new storeCtor({idName: "storeId"}),
  autoLoad: true,
  params: {},
  server: {
    load: {
      method: "get",
      url: '/store/combo'
    }
  },
  local: {
    get: 'storeCombo/data',
    set: 'storeCombo/init'
  }
}

export default new storeBuilder(option)

