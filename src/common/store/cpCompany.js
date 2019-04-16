import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "cpCompany",
  idName: "cpCompanyId",
  module: new storeCtor({idName: "cpCompanyId"}),
  autoLoad: true,
  params: {
    type:1
  },
  server: {
    load: {
      method: "post",
      url: '/MyCenter/getChannelOrCP'
    },
    get: {
      method: "post",
      url: '/cpCompany/get'
    },
    add: {
      method: "post",
      url: '/cpCompany/create'
    },
    update: {
      method: "post",
      url: '/cpCompany/update'
    },
    delete: {
      method: "post",
      url: '/cpCompany/delete'
    },
  },
  local: {
    total:'cpCompany/total',
    get: 'cpCompany/data',
    set: 'cpCompany/init',
    add: 'cpCompany/add',
    update: 'cpCompany/update',
    delete: 'cpCompany/delete',
  }
}

export default new storeBuilder(option)
