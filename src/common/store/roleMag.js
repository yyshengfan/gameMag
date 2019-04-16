import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "roleMag",
  idName: "noticeId",
  module: new storeCtor({idName: "noticeId"}),
  autoLoad: true,
  params: {},
  server: {
    load: {
      method: "post",
      url: 'privilege/main'
    },
    get: {
      method: "post",
      url: '/MyCenter/MagNotice'
    },
    add: {
      method: "post",
      url: '/privilege/setrole'
    },
    update: {
      method: "post",
      url: '/privilege/setrole'
    },
    delete: {
      method: "post",
      url: '/MyCenter/updateMagNoticeByNoticeId'
    },
  },
  local: {
    total:'roleMag/total',
    get: 'roleMag/data',
    set: 'roleMag/init',
    add: 'roleMag/add',
    update: 'roleMag/update',
    delete: 'roleMag/delete',
  }
}

export default new storeBuilder(option)
