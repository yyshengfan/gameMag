import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "resourseType",
  idName: "resourseTypeId",
  module: new storeCtor({idName: "resourseTypeId"}),
  autoLoad: true,
  params: {},
  server: {
    load: {
      method: "post",
      url: 'auditManage/getBannerType'
    },
    get: {
      method: "post",
      url: 'auditManage/getBannerType'
    }
  },
  local: {
    total:'resourseType/total',
    get: 'resourseType/data',
    set: 'resourseType/init',
  }
}

export default new storeBuilder(option)
