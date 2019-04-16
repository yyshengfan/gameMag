import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "entertain",
  idName: "id",
  module: new storeCtor({idName: "id"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/entertain/getEntertain'
    },
    get: {
      method: "post",
      url: '/entertain/getEntertain'
    },
    add: {
      method: "post",
      url: '/entertain/setEntertain'
    },
    update: {
      method: "post",
      url: '/entertain/setEntertain'
    },
    delete: {
      method: "post",
      url: '/entertain/delEntertain'
    },
  },
  local: {
    total:'entertain/total',
    get: 'entertain/data',
    set: 'entertain/init',
    add: 'entertain/add',
    update: 'entertain/update',
    delete: 'entertain/delete',
  }
}
var entertain =  new storeBuilder(option);
entertain.type = {
  1: '今日游戏',
  2: '游戏排序',
  3: '资讯排序',
  4: '即将开测',
  5: '小弹窗',
  6: 'H5游戏',

}
export default entertain
