import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "gameSpecial",
  idName: "id",
  module: new storeCtor({idName: "id"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/auditManage/getSpecialTopic'
    },
    get: {
      method: "post",
      url: '/auditManage/getSpecialTopic'
    },
    add: {
      method: "post",
      url: '/auditManage/setSpecialTopic'
    },
    update: {
      method: "post",
      url: '/auditManage/setSpecialTopic'
    },
    delete: {
      method: "post",
      url: '/auditManage/delSpecialTopic'
    },
  },
  local: {
    total:'gameSpecial/total',
    get: 'gameSpecial/data',
    set: 'gameSpecial/init',
    add: 'gameSpecial/add',
    update: 'gameSpecial/update',
    delete: 'gameSpecial/delete',
  }
}

export default new storeBuilder(option)
