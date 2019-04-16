import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "userStatus",
  idName: "id",
  module: new storeCtor({idName: "id"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/deblocking/getLockUserMsg'
    },
    delete: {
      method: "post",
      url: 'deblocking/deblockingUser'
    },
  },
  local: {
    total:'userStatus/total',
    set: 'userStatus/init',
    get: 'userStatus/data',
    delete: 'userStatus/delete',
  }
}
export default new storeBuilder(option)
