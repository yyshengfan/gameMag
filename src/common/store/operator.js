import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "operator",
  idName: "operatorId",
  module: new storeCtor({idName: "operatorId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "get",
      url: '/operator/list'
    },
    get: {
      method: "post",
      url: '/operator/get'
    },
    add: {
      method: "post",
      url: '/operator/create'
    },
    update: {
      method: "post",
      url: '/operator/update'
    },
    delete: {
      method: "post",
      url: '/operator/delete'
    },
  },
  local: {
    total:'operator/total',
    get: 'operator/data',
    set: 'operator/init',
    add: 'operator/add',
    update: 'operator/update',
    delete: 'operator/delete',
  }
}

export default new storeBuilder(option)

