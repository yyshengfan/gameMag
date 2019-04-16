import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "gamephoneType",
  idName: "id",
  module: new storeCtor({idName: "id"}),
  autoLoad: true,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/auditManage/getGamePhoneType'
    },
  },
  local: {
    total:'gamephoneType/total',
    get: 'gamephoneType/data',
    set: 'gamephoneType/init',
  }
}

export default new storeBuilder(option)
