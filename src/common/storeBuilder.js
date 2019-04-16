import store from '../store';
import axios from '../common/axios';
import storeManage from '@/common/storeManage';

function storeBuilder(option) {
  this.option = option || {};
  this.option.server.load.method = this.option.server.load.method || "get";
  this.name = option.name;
  this.idName = option.idName;

  this.init = () => {

    store.registerModule(this.option.name, this.option.module);
    storeManage.push(this);
    //  && store.state.auth !=''
    if (option.autoLoad){

      console.log("autoLoad",this.name)
      this.load();
    }
  }

  this.serverHandle = (action, params, successFn, failureFn) => {

    var config,data;
    if (this.option.server[action].method == "get") {
      data = {
        params: params,
      }
    }
    else {
      data = params;
    }

    if(action!="get"){
      config = {
        headers: {
          showAlert:1
        }
      }
    }

    axios[this.option.server[action].method](this.option.server[action].url, data,config )
      .then((response) => {
        if (typeof successFn == "function") successFn(response.data.data)
      })
      .catch((response) => {
        if (typeof failureFn == "function") failureFn(response)
      })
  }

  this.load = (params, successFn, failureFn) => {

    params = params || this.option.params || {};

    this.serverHandle("load", params, (data) => {
      console.log(data.list)
      store.dispatch(this.option.local.set, data.list);
      if(this.option.local.total)
        store.dispatch(this.option.local.total, data.total);
      if (typeof successFn == "function") successFn(data)
    }, failureFn);
  };

  this.get = (params, successFn, failureFn) => {
    this.serverHandle('get', params, successFn, failureFn)
  };

  this.add = (params, successFn, failureFn) => {
    this.serverHandle("add", params, (data) => {
      params[this.idName] = data[this.idName];
      if(data.createAt){params.createAt = data.createAt}
      if(data.createBy){params.createBy = data.createBy}
      if(data.admin){params.admin = data.admin}
      if(data.s_time){params.s_time = data.s_time}
      if(data.ctime){params.ctime = data.ctime}
      if(data.uuid){params.uuid = data.uuid}
      if(data.rold){params.rold = data.rold}
      if(data.company_name){params.company_name = data.company_name}
      store.dispatch(this.option.local.add, params)
      if (typeof successFn == "function") successFn(data)
    }, failureFn)
  };

  this.update = (params, successFn, failureFn) => {
    this.serverHandle("update", params, (data) => {
      if(data.status){params.status = data.status}
      if(data.company_name){params.company_name = data.company_name}
      if(data.ctime){params.ctime = data.ctime}
      if(data.admin){params.admin = data.admin}
      store.dispatch(this.option.local.update, params)
    //console.log(params)
      if (typeof successFn == "function") successFn(data)
    }, failureFn)
  };

  this.delete = (params, successFn, failureFn) => {
    this.serverHandle('delete', params, (data) => {
      store.dispatch(this.option.local.delete, params[this.idName])
      if (typeof successFn == "function") successFn(data)
    }, failureFn)
  };

  this.data = (filter) => {
    return store.getters[this.option.local.get](filter)
  };
  this.total = () => {
    return store.getters[this.option.local.total]
  };
  this.init();
};

export default storeBuilder
