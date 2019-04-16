
let Base64 = require("js-base64").Base64
let CryptoJS =require('crypto-js');
import store from '../store'

var encrypt = function(params, key){
    //1.转JSON字符串
    let jsonStr;
    if(params instanceof FormData){
        return params
    }else{
        jsonStr = JSON.stringify(params)
    }
    
    key =  store.state.sessionId ? store.state.sessionId : '5aSc6Zuo5aOw54Om';


    // console.log(params.formData)
    //2.3DES加密
    let keyHex = CryptoJS.enc.Utf8.parse(key);
    let encrypted = CryptoJS.DES.encrypt(jsonStr, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
        });
    
    let basePre = encrypted.toString();

    //3.base64加密
    let obj = {
        protectMsg : Base64.encode(basePre)
    }

    return obj;
}

var parseEncrypt = function(ciphertext, key){
    //1.base64解密
    ciphertext = Base64.decode(ciphertext);
    //2.3DES解密
    key = this && this.$store.state.keyId ? this.$store.state.keyId + '' : '5aSc6Zuo5aOw54Om';
    let keyHex = CryptoJS.enc.Utf8.parse(key);
    // direct decrypt message
    let decrypted = CryptoJS.DES.decrypt({
            ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
        }, keyHex, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
    });


    //3.转字符串
    let str =  decrypted.toString(CryptoJS.enc.Utf8);

    //4.转object
    let params = JSON.parse(str)

    return params
}

export {encrypt,parseEncrypt}