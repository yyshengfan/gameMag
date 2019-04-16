import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "allChannel",
  idName: "gameId",
  module: new storeCtor({idName: "gameId"}),
  autoLoad: true,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/auditManage/getGamePhonePlatform'
    },
    get: {
      method: "post",
      url: '/auditManage/getGamePhonePlatform'
    },
  },
  local: {
    total:'allChannel/total',
    get: 'allChannel/data',
    set: 'allChannel/init',
  }
}

export default new storeBuilder(option)

