import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "store",
  idName: "storeId",
  module: new storeCtor({idName: "storeId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "get",
      url: '/store/list'
    },
    get: {
      method: "post",
      url: '/store/get'
    },
    add: {
      method: "post",
      url: '/store/create'
    },
    update: {
      method: "post",
      url: '/store/update'
    },
    delete: {
      method: "post",
      url: '/store/delete'
    },
  },
  local: {
    total:'store/total',
    get: 'store/data',
    set: 'store/init',
    add: 'store/add',
    update: 'store/update',
    delete: 'store/delete',
  }
}

export default new storeBuilder(option)

