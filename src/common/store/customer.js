import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "customer",
  idName: "customerId",
  module: new storeCtor({idName: "customerId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "get",
      url: '/customer/list'
    },
    get: {
      method: "post",
      url: '/customer/get'
    },
    add: {
      method: "post",
      url: '/customer/create'
    },
    update: {
      method: "post",
      url: '/customer/update'
    },
    delete: {
      method: "post",
      url: '/customer/delete'
    },
  },
  local: {
    total:'customer/total',
    get: 'customer/data',
    set: 'customer/init',
    add: 'customer/add',
    update: 'customer/update',
    delete: 'customer/delete',
  }
}

export default new storeBuilder(option)

