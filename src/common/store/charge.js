import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "charge",
  idName: "chargeId",
  module: new storeCtor({idName: "chargeId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "get",
      url: '/charge/list'
    },
    get: {
      method: "post",
      url: '/charge/get'
    },
    add: {
      method: "post",
      url: '/charge/create'
    },
    update: {
      method: "post",
      url: '/charge/update'
    },
    delete: {
      method: "post",
      url: '/charge/delete'
    },
  },
  local: {
    total:'charge/total',
    get: 'charge/data',
    set: 'charge/init',
    add: 'charge/add',
    update: 'charge/update',
    delete: 'charge/delete',
  }
}

export default new storeBuilder(option)

