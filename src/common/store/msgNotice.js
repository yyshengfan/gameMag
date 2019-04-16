import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "msgNotice",
  idName: "msgNoticeId",
  module: new storeCtor({idName: "msgNoticeId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: 'MyCenter/Notice'
    },
    get: {
      method: "post",
      url: '/msgNotice/get'
    },
    add: {
      method: "post",
      url: '/msgNotice/create'
    },
    update: {
      method: "post",
      url: '/msgNotice/update'
    },
    delete: {
      method: "post",
      url: '/msgNotice/delete'
    },
  },
  local: {
    total:'msgNotice/total',
    get: 'msgNotice/data',
    set: 'msgNotice/init',
    add: 'msgNotice/add',
    update: 'msgNotice/update',
    delete: 'msgNotice/delete',
  }
}

export default new storeBuilder(option)

