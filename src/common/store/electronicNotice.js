import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "electronicNotice",
  idName: "noticeId",
  module: new storeCtor({idName: "noticeId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: 'MyCenter/MagNotice'
    },
    get: {
      method: "post",
      url: '/MyCenter/MagNotice'
    },
    add: {
      method: "post",
      url: '/MyCenter/addMagNotice'
    },
    update: {
      method: "post",
      url: '/MyCenter/updateMagNoticeByNoticeId'
    },
    delete: {
      method: "post",
      url: '/MyCenter/updateMagNoticeByNoticeId'
    },
  },
  local: {
    total:'electronicNotice/total',
    get: 'electronicNotice/data',
    set: 'electronicNotice/init',
    add: 'electronicNotice/add',
    update: 'electronicNotice/update',
    delete: 'electronicNotice/delete',
  }
}

export default new storeBuilder(option)
