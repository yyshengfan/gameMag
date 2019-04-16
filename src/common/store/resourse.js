import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "resourse",
  idName: "id",
  module: new storeCtor({idName: "id"}),
  autoLoad: true,
  params: {},
  server: {
    load: {
      method: "post",
      url: 'auditManage/getBanner'
    },
    get: {
      method: "post",
      url: '/auditManage/getBanner'
    },
    add: {
      method: "post",
      url: '/auditManage/addBanner'
    },
    update: {
      method: "post",
      url: '/auditManage/addBanner'
    },
    delete: {
      method: "post",
      url: '/MyCenter/updateMagNoticeByNoticeId'
    },
  },
  local: {
    total:'resourse/total',
    get: 'resourse/data',
    set: 'resourse/init',
    add: 'resourse/add',
    update: 'resourse/update',
    delete: 'resourse/delete',
  }
}

export default new storeBuilder(option)
