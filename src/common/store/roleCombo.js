import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "roleCombo",
  idName: "roleId",
  module: new storeCtor({idName: "roleId"}),
  autoLoad: true,
  params: {},
  server: {
    load: {
      method: "get",
      url: '/role/combo'
    }
  },
  local: {
    get: 'roleCombo/data',
    set: 'roleCombo/init'
  }
}

export default new storeBuilder(option)

