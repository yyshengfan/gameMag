import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "channelInfoManage",
  idName: "channelId",
  module: new storeCtor({idName: "channelId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/auditManage/getchannelInfo'
    },
  },
  local: {
    total:'channelInfoManage/total',
    get: 'channelInfoManage/data',
    set: 'channelInfoManage/init',
  },
}
var channelInfoManage =  new storeBuilder(option);
channelInfoManage.t_status = {
  0: '待审核,await,el-icon-edit-outline',
  8: '审核通过,finish-pass,fa fa-check',
  1: '审核未通过,no-pass,fa fa-times',
  2: '审核未通过,no-pass,fa fa-times',
  3: '审核未通过,no-pass,fa fa-times',
  4: '审核未通过,no-pass,fa fa-times',
  5: '审核未通过,no-pass,fa fa-times',
  6: '审核未通过,no-pass,fa fa-times',
  7: '审核未通过,no-pass,fa fa-times',
}
channelInfoManage.type = {
  1: '新增,add-pass,fa fa-plus',
  2: '修改资料,pass,fa fa-edit',
  3: '已下线,no-pass,fa fa-times'
}
export default channelInfoManage

