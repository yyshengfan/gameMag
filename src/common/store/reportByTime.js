import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "reportByTime",
  idName: "reportByTimeId",
  module: new storeCtor({idName: "reportByTimeId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "get",
      url: '/report/ByTime'
    }
  },
  local: {
    total:'reportByTime/total',
    get: 'reportByTime/data',
    set: 'reportByTime/init',
  }
}

export default new storeBuilder(option)

