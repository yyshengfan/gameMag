import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "order",
  idName: "orderId",
  module: new storeCtor({idName: "orderId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/orders'
    },
    get: {
      method: "post",
      url: '/order/get'
    }
  },
  local: {
    total:'order/total',
    get: 'order/data',
    set: 'order/init',
  }
}

export default new storeBuilder(option)

