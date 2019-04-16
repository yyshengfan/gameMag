import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "userList",
  idName: "user_id",
  module: new storeCtor({idName: "user_id"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: 'privilege/userinfo'
    },
    get: {
      method: "post",
      url: '/privilege/getuserinfo'
    },
    add: {
      method: "post",
      url: '/privilege/setup'
    },
    update: {
      method: "post",
      url: '/privilege/upuserinfo'
    },
    delete: {
      method: "post",
      url: '/MyCenter/updateMagNoticeByNoticeId'
    },
  },
  local: {
    total:'userList/total',
    get: 'userList/data',
    set: 'userList/init',
    add: 'userList/add',
    update: 'userList/update',
    delete: 'userList/delete',
  }
}

export default new storeBuilder(option)
