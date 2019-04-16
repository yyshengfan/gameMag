import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "activities",
  idName: "id",
  module: new storeCtor({idName: "id"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/auditManage/getGift'
    },
    get: {
      method: "post",
      url: '/auditManage/getGift'
    },
    add: {
      method: "post",
      url: '/auditManage/addGift'
    },
    update: {
      method: "post",
      url: '/auditManage/updateGift'
    },
    delete: {
      method: "post",
      url: '/MyCenter/updateMagNoticeByNoticeId'
    },
  },
  local: {
    total:'activities/total',
    get: 'activities/data',
    set: 'activities/init',
    add: 'activities/add',
    update: 'activities/update',
    delete: 'activities/delete',
  }
}

export default new storeBuilder(option)
