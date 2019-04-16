import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "pos",
  idName: "posId",
  module: new storeCtor({idName: "posId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "get",
      url: '/pos/list'
    },
    get: {
      method: "post",
      url: '/pos/get'
    },
    add: {
      method: "post",
      url: '/pos/create'
    },
    update: {
      method: "post",
      url: '/pos/update'
    },
    delete: {
      method: "post",
      url: '/pos/delete'
    },
  },
  local: {
    total:'pos/total',
    get: 'pos/data',
    set: 'pos/init',
    add: 'pos/add',
    update: 'pos/update',
    delete: 'pos/delete',
  }
}

export default new storeBuilder(option)

