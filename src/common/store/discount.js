import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "discount",
  idName: "discountId",
  module: new storeCtor({idName: "discountId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "get",
      url: '/discount/list'
    },
    get: {
      method: "post",
      url: '/discount/get'
    },
    add: {
      method: "post",
      url: '/discount/create'
    },
    update: {
      method: "post",
      url: '/discount/update'
    },
    delete: {
      method: "post",
      url: '/discount/delete'
    },
  },
  local: {
    total:'discount/total',
    get: 'discount/data',
    set: 'discount/init',
    add: 'discount/add',
    update: 'discount/update',
    delete: 'discount/delete',
  }
}

export default new storeBuilder(option)

