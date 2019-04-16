import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "gameBanner",
  idName: "id",
  module: new storeCtor({idName: "id"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/auditManage/getTopicGame '
    },
  },
  local: {
    total:'gameBanner/total',
    get: 'gameBanner/data',
    set: 'gameBanner/init',
  }
}

export default new storeBuilder(option)

