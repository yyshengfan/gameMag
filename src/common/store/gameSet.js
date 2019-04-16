import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "gameSet",
  idName: "id",
  module: new storeCtor({idName: "id"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/auditManage/getGameOption'
    },
    get: {
      method: "post",
      url: '/auditManage/getGameOptionbyId'
    },
    add: {
      method: "post",
      url: '/auditManage/addGameOption'
    },
    update: {
      method: "post",
      url: '/auditManage/updateGameOption'
    },
  },
  local: {
    total:'gameSet/total',
    get: 'gameSet/data',
    set: 'gameSet/init',
    add: 'gameSet/add',
    update: 'gameSet/update',
  }
}

export default new storeBuilder(option)
