import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "gameOpration",
  idName: "gameId",
  module: new storeCtor({idName: "gameId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/MyCenter/getGameOpration'
    },
  },
  local: {
    total:'gameOpration/total',
    get: 'gameOpration/data',
    set: 'gameOpration/init',
  },
}
var gameOpration =  new storeBuilder(option);
gameOpration.deal_result = {
  '1': '提交资料',
  '2': '提交资料',
  '3': '游戏创建',
  '4': '游戏更新',
  '5': '渠道创建',
  '6': '渠道更新',
  '7': '选择渠道',
  '8': '删除游戏',
  '9': '删除渠道',
  '10': '游戏测试与更新提交',
  '11': '游戏下线',
  '12': '管理员审核',
  '13': '管理员审核',
  '14': '管理员审核',
}
export default gameOpration

