import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "divideDetails",
  idName: "allId",
  module: new storeCtor({idName: "allId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/auditManage/getRateAll'
    },
    get: {
      method: "post",
      url: '/auditManage/getRateAllById'
    },
    add: {
      method: "post",
      url: '/auditManage/setRateAll'
    },
    update: {
      method: "post",
      url: '/auditManage/setRateAll'
    },
    delete: {
      method: "post",
      url: '/auditManage/changeRateAllStatus'
    },
  },
  local: {
    total:'divideDetails/total',
    get: 'divideDetails/data',
    set: 'divideDetails/init',
    add: 'divideDetails/add',
    update: 'divideDetails/update',
    delete: 'divideDetails/delete',
  }
}
var divide = new storeBuilder(option)

divide.status = {
   0:false,
   1:true,
}

export default divide
