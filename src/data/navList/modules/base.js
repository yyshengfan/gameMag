var navList = [
  {
    selected: false, active: false, text: '首页', icon: 'fa-star-o', name: 'main',
    children: []
  },
  {
    selected: false, active: false, text: '个人中心', icon: '../../resource/images/icon/user.png', name: '',
    children: [
      {active: false, text: '电子公告', icon:'../../resource/images/icon/children.png',name: 'electronicNotice'},
      {active: false, text: '修改密码', icon:'../../resource/images/icon/children.png',name: 'pwdModify'},
    ]
  },
  // {
  //   selected: false, active: false, text: 'test1', icon: 'fa-star-o', name: 'test1'
  // },

  {
    selected: false, active: false, text: 'CP管理', icon: '../../resource/images/icon/order.png', name: '',
    children: [
      {active: false, text: '资质管理',icon:'../../resource/images/icon/children.png',name: 'infoManage'},
      {active: false, text: '游戏管理',icon:'../../resource/images/icon/children.png',name: 'gameManage'},
      {active: false, text: '合同管理',icon:'../../resource/images/icon/children.png',name: 'cpContract'},
    ]
  },
  {
    selected: false, active: false, text: '渠道管理', icon: '../../resource/images/icon/order.png', name: '',
    children: [
      {active: false, text: '资质管理',icon:'../../resource/images/icon/children.png',name: 'channelInfoManage'},
      {active: false, text: '渠道管理',icon:'../../resource/images/icon/children.png',name: 'channelManage'},
      {active: false, text: '合同管理',icon:'../../resource/images/icon/children.png',name: 'channelContract'},
    ]
  },
  {
    selected: false, active: false, text: '系统设置', icon: '../../resource/images/icon/order.png', name: '',
    children: [
      {active: false, text: '角色管理',icon:'../../resource/images/icon/children.png',name: 'role'},
      {active: false, text: '用户管理',icon:'../../resource/ies/icon/children.png',name: 'user'},
      {active: false, text: '用户状态',icon:'../../resource/ies/icon/children.png',name: 'userStatus'},
    ]
  },
  {
    selected: false, active: false, text: '分成管理', icon: '../../resource/images/icon/order.png', name: '',
    children: [
      {active: false, text: '分成列表',icon:'../../resource/images/icon/children.png',name: 'divide'},
      {active: false, text: '分成详单',icon:'../../resource/ies/icon/children.png',name: 'divideDe'},
    ]
  },
  {
    selected: false, active: false, text: '订单管理', icon: '../../resource/images/icon/order.png', name: '',
    children: [
      {active: false, text: '订单列表',icon:'../../resource/images/icon/children.png',name: 'customerOrderList'},
    ]
  },
  {
    selected: false, active: false, text: '结算报表', icon: '../../resource/images/icon/order.png', name: '',
    children: [
      {active: false, text: '结算数据',icon:'../../resource/images/icon/children.png',name: 'settlement'},
    ]
  },
  {
    selected: false, active: false, text: '资源配置', icon: '../../resource/images/icon/order.png', name: '',
    children: [
      {active: false, text: '资源配置',icon:'../../resource/images/icon/children.png',name: 'sourse'},
      {active: false, text: '活动配置',icon:'../../resource/images/icon/children.png',name: 'activities'},
      {active: false, text: '游戏配置',icon:'../../resource/images/icon/children.png',name: 'gameSet'},
      {active: false, text: '游戏类型设置',icon:'../../resource/images/icon/children.png',name: 'gameTypeSet'},
      {active: false, text: '特惠游戏',icon:'../../resource/images/icon/children.png',name: 'specialGame'},
      {active: false, text: '游戏专题',icon:'../../resource/images/icon/children.png',name: 'gameSpecial'},
    ]
  },
  {
    selected: false, active: false, text: '云闪付', icon: '../../resource/images/icon/order.png', name: '',
    children: [
      {active: false, text: '数娱专区',icon:'../../resource/images/icon/children.png',name: 'entertain'},
    ]
  },
];

export default navList
