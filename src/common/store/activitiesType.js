import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "activitiesType",
  idName: "id",
  module: new storeCtor({idName: "id"}),
  autoLoad: true,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/auditManage/getGiftType'
    },
  },
  local: {
    total:'activitiesType/total',
    get: 'activitiesType/data',
    set: 'activitiesType/init',
  }
}

export default new storeBuilder(option)
