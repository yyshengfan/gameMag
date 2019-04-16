import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var module = new storeCtor({idName: "id"});

var option = {
  name: "dictionary",
  idName: "id",
  module: module,
  autoLoad: false,
  params: {},
  server: {
    load: {
      method: "get",
      url: '/dictionary/list'
    },
    get: {
      method: "post",
      url: '/dictionary/get'
    },
    add: {
      method: "post",
      url: '/dictionary/create'
    },
    update: {
      method: "post",
      url: '/dictionary/update'
    },
    delete: {
      method: "post",
      url: '/dictionary/delete'
    },
  },
  local: {
    total:'dictionary/total',
    get: 'dictionary/data',
    set: 'dictionary/init',
    add: 'dictionary/add',
    update: 'dictionary/update',
    delete: 'dictionary/delete',
  }
};

var dictionary =  new storeBuilder(option);

export default dictionary;


