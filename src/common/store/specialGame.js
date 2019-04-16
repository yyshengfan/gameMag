import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "specialGame",
  idName: "id",
  module: new storeCtor({idName: "id"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/auditManage/getSpecialGame'
    },
    get: {
      method: "post",
      url: '/auditManage/getSpecialGame'
    },
    add: {
      method: "post",
      url: '/auditManage/setSpecialGame'
    },
    update: {
      method: "post",
      url: '/auditManage/setSpecialGame'
    },
    delete: {
      method: "post",
      url: '/auditManage/delSpecialGame'
    },
  },
  local: {
    total:'specialGame/total',
    get: 'specialGame/data',
    set: 'specialGame/init',
    add: 'specialGame/add',
    update: 'specialGame/update',
    delete: 'specialGame/delete',
  }
}

export default new storeBuilder(option)
