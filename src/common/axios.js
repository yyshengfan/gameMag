import {Notification} from 'element-ui'
import axios from 'axios'
import swal from 'sweetalert2'
import store from '../store'
// 加密文件引入
import {encrypt,parseEncrypt} from '../common/encrypt.js'

axios.interceptors.request.use(function (config) {
  // config = encrypt(config);
  config.headers.token = localStorage.getItem("token");
  // config.data = config.data
  // config.data = encrypt(config.data)
  return config
}, function (error) {
  // this.$confirm('网络不可用,请检查', '提示', {
  //   type: 'warning',
  // })
  // Notification.error({
  //   title: '提示',
  //   message: '网络不可用,请检查',
  // })
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {

  if (typeof response.data === 'object') {
    // console.log(11)
    // if (response.config.headers.showAlert && response.data.respMsg) {
    //   // Notification.success({
    //   //   title: '提示',
    //   //   message: response.data.respMsg,
    //   // })
    //   //swal('提示',response.data.respMsg,response.data.respCode == '00'?"success":"error");
    // }

    // if (response.data.respCode !== '00') {
    //   if(response.data.respCode == "99"){
    //     store.state.auth = '';
    //     localStorage.setItem("token","")
    //   }
    //   console.log(33)
    //   return Promise.re(response.data)
    // }
    // console.log(22);
    
    return response.data
  } else {
    return Promise.resolve(response.data)
  }
}, function (error) {
  // Notification.error({
  //   title: '提示',
  //   message: '网络不可用,请稍后再试',
  // })
  return Promise.reject(error)
})

export default axios
