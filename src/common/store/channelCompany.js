import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "channelCompany",
  idName: "channelCompanyId",
  module: new storeCtor({idName: "channelCompanyId"}),
  autoLoad: true,
  params: {
    type:2
  },
  server: {
    load: {
      method: "post",
      url: '/MyCenter/getChannelOrCP'
    },
    get: {
      method: "post",
      url: '/channelCompany/get'
    },
    add: {
      method: "post",
      url: '/channelCompany/create'
    },
    update: {
      method: "post",
      url: '/channelCompany/update'
    },
    delete: {
      method: "post",
      url: '/channelCompany/delete'
    },
  },
  local: {
    total:'channelCompany/total',
    get: 'channelCompany/data',
    set: 'channelCompany/init',
    add: 'channelCompany/add',
    update: 'channelCompany/update',
    delete: 'channelCompany/delete',
  }
}

export default new storeBuilder(option)
