import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var option = {
  name: "myContract",
  idName: "contractId",
  module: new storeCtor({idName: "contractId"}),
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "post",
      url: '/auditManage/getContract'
    },
    get: {
      method: "post",
      url: '/myContract/get'
    },
    add: {
      method: "post",
      url: '/myContract/create'
    },
    update: {
      method: "post",
      url: '/myContract/signContract'
    },
    delete: {
      method: "post",
      url: '/myContract/delete'
    },
  },
  local: {
    total: 'myContract/total',
    get: 'myContract/data',
    set: 'myContract/init',
    add: 'myContract/add',
    update: 'myContract/update',
    delete: 'myContract/delete',
  }
}
var contract = new storeBuilder(option)

contract.type = {
  1: "游戏业务合同",
  2: "渠道业务合同",
  3: "授权书模板",
  4: "银联游戏开放平台《服务条款",
  5: "银联游戏计费点说明文档",
}

contract.status = {
  0: "未提交,no-pass,fa fa-upload",
  1: "待签约,await,el-icon-edit",
  2: "驳回,pass,fa fa-forward",
  3: "签约成功,finish-pass,fa fa-check",
  4: "删除,removeBtn",
}

export default contract
