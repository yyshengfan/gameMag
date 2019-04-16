import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "role",
  idName: "roleId",
  module: new storeCtor({idName: "roleId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "get",
      url: '/role/list'
    },
    get: {
      method: "post",
      url: '/role/get'
    },
    add: {
      method: "post",
      url: '/role/create'
    },
    update: {
      method: "post",
      url: '/role/update'
    },
    delete: {
      method: "post",
      url: '/role/delete'
    },
  },
  local: {
    total:'role/total',
    get: 'role/data',
    set: 'role/init',
    add: 'role/add',
    update: 'role/update',
    delete: 'role/delete',
  }
}

export default new storeBuilder(option)

