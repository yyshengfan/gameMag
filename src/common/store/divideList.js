import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "divideList",
  idName: "uuid",
  module: new storeCtor({idName: "uuid"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/auditManage/getRate'
    },
    get: {
      method: "post",
      url: '/auditManage/getRate'
    },
    add: {
      method: "post",
      url: '/auditManage/addRate'
    },
    update: {
      method: "post",
      url: '/auditManage/upRate'
    },
    delete: {
      method: "post",
      url: '/divideList/delete'
    },
  },
  local: {
    total:'divideList/total',
    get: 'divideList/data',
    set: 'divideList/init',
    add: 'divideList/add',
    update: 'divideList/update',
    delete: 'divideList/delete',
  }
}
var divide = new storeBuilder(option)

divide.status = {
   0:'已下线',
   1:'正常',
}

export default divide
