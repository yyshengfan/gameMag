import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "gameStayData",
  idName: "gameStayDataId",
  module: new storeCtor({idName: "gameStayDataId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/gamestatistics/getUserStayData'
    },
   
  },
  local: {
    total:'gameStayData/total',
    get: 'gameStayData/data',
    set: 'gameStayData/init'
  }
}

export default new storeBuilder(option)

