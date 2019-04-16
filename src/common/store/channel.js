import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "channel",
  idName: "gameId",
  module: new storeCtor({idName: "gameId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/myGame/GetTrench'
    },
    get: {
      method: "post",
      url: '/myGame/GetTrench'
    },
    add: {
      method: "post",
      url: '/channel/create'
    },
    update: {
      method: "post",
      url: '/channel/update'
    },
    delete: {
      method: "post",
      url: '/channel/delete'
    },
  },
  local: {
    total:'channel/total',
    get: 'channel/data',
    set: 'channel/init',
    add: 'channel/add',
    update: 'channel/update',
    delete: 'channel/delete',
  }
}

export default new storeBuilder(option)

