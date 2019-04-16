import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "user",
  idName: "userId",
  module: new storeCtor({idName: "userId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "get",
      url: '/user/list'
    },
    get: {
      method: "post",
      url: '/user/get'
    },
    add: {
      method: "post",
      url: '/user/create'
    },
    update: {
      method: "post",
      url: '/user/update'
    },
    delete: {
      method: "post",
      url: '/user/delete'
    },
  },
  local: {
    total:'user/total',
    get: 'user/data',
    set: 'user/init',
    add: 'user/add',
    update: 'user/update',
    delete: 'user/delete',
  }
}

export default new storeBuilder(option)

