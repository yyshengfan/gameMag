import storeCtor from '@/common/storeCtor'
import storeBuilder from '@/common/storeBuilder'

var module = new storeCtor({idName: "id"});

var option = {
  name: "dictionaryCombo",
  idName: "id",
  module: module,
  autoLoad: true,
  params: {},
  server: {
    load: {
      method: "get",
      url: '/dictionary/combo'
    }
  },
  local: {
    get: 'dictionaryCombo/data',
    set: 'dictionaryCombo/init',
  }
};

var dictionary =  new storeBuilder(option);

dictionary.type = [
  {key:1,value:"用户类别"},
  {key:2,value:"部门"},
  {key:3,value:"职务级别"}
]
dictionary.typeKV = {
  1:"用户类别",
  2:"部门",
  3:"职务级别"
}

dictionary.getByType = function(type) {
  return this.data({type:type})
};
dictionary.getKVByType = function(type) {
  var data = this.data({type:type});
  var obj = {};
  for(var i=0;i<data.length;i++){
      obj[data[i].key] = data[i].value
  }
  return obj;
};

dictionary.customerType = function() {
  return dictionary.getByType(1)
};
dictionary.customerTypeKV = function() {
  return dictionary.getKVByType(1)
};

dictionary.department = function() {
  return dictionary.getByType(2)
};
dictionary.departmentKV = function() {
  return dictionary.getKVByType(2)
};

dictionary.jobLevel = function() {
  return dictionary.getByType(3)
};
dictionary.jobLevelKV = function() {
  return dictionary.getKVByType(3)
};

export default dictionary;


