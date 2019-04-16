import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "merchant",
  idName: "merchantId",
  module: new storeCtor({idName: "merchantId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "get",
      url: '/merchant/list'
    },
    get: {
      method: "post",
      url: '/merchant/get'
    },
    add: {
      method: "post",
      url: '/merchant/create'
    },
    update: {
      method: "post",
      url: '/merchant/update'
    },
    delete: {
      method: "post",
      url: '/merchant/delete'
    },
  },
  local: {
    total:'merchant/total',
    get: 'merchant/data',
    set: 'merchant/init',
    add: 'merchant/add',
    update: 'merchant/update',
    delete: 'merchant/delete',
  }
}

export default new storeBuilder(option)

