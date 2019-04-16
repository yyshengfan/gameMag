import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "trenchAll",
  idName: "noticeId",
  module: new storeCtor({idName: "noticeId"}),
  autoLoad: true,
  params: {},
  server: {
    load: {
      method: "post",
      url: 'auditManage/getChannelAll'
    },
  },
  local: {
    total:'trenchAll/total',
    get: 'trenchAll/data',
    set: 'trenchAll/init',
  }
}

export default new storeBuilder(option)
