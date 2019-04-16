import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "phoneplatform",
  idName: "id",
  module: new storeCtor({idName: "id"}),
  autoLoad: true,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/auditManage/getGamePhonePlatform'
    },

  },
  local: {
    total:'phoneplatform/total',
    get: 'phoneplatform/data',
    set: 'phoneplatform/init',
  }
}

export default new storeBuilder(option)

