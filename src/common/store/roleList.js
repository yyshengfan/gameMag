import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "roleList",
  idName: "roleId",
  module: new storeCtor({idName: "roleId"}),
  autoLoad: true,
  params: {},
  server: {
    load: {
      method: "post",
      url: 'privilege/getUserMsg'
    },
    get: {
      method: "post",
      url: '/roleTh/getRole'
    },
    add: {
      method: "post",
      url: '/privilege/setrole'
    },
    update: {
      method: "post",
      url: '/roleTh/setRole'
    },
    delete: {
      method: "post",
      url: '/roleTh/delRole'
    },
  },
  local: {
    total:'roleList/total',
    get: 'roleList/data',
    set: 'roleList/init',
    add: 'roleList/add',
    update: 'roleList/update',
    delete: 'roleList/delete',
  }
}

export default new storeBuilder(option)
