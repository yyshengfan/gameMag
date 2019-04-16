import XLSX from 'xlsx'
function stringToIntArray(val){
  if(val){
    if(Array.isArray(val)){
      return val;
    }

    var arr = val.split(',');
    for(var i=0;i<arr.length;i++){
      arr[i]=parseInt(arr[i])
    }
    return arr
  }
  return []
}

function arrayToString(val){
  alert(val)
  if(Array.isArray(val)){
    return val.join(",")
  }
  else{
    return "";
  }
}

// 图片压缩
function compress(file, quality, callback) {
  console.log(file,quality)
  if (!file){
    return errorHandler('还没选择图片')();
  }
  if (!window.FileReader || !window.Blob) {
    return errorHandler('您的浏览器不支持图片压缩')();
  }

  var reader = new FileReader();
  var mimeType = file.type || 'image/png';

  reader.onload = createImage;
  reader.onerror = errorHandler('图片读取失败！');
  reader.readAsDataURL(file);

  function createImage() {
    var dataURL = this.result;
    var image = new Image();
    image.onload = compressImage;
    image.onerror = errorHandler('图片加载失败,请上传正确格式图片！');
    image.src = dataURL;
  }

  function compressImage() {
    var canvas = document.createElement('canvas');
    var ctx;
    var dataURI;
    var result;

    canvas.width = this.naturalWidth;
    canvas.height = this.naturalHeight;

    console.log(123,canvas.width,canvas.height)

    ctx = canvas.getContext('2d');
    ctx.drawImage(this, 0, 0,canvas.width,canvas.height,0,0,'800','300');
    dataURI = canvas.toDataURL(mimeType, 1);
    result = dataURIToBlob(dataURI);

    callback(null, result);
  }

  function dataURIToBlob(dataURI) {
    var type = dataURI.match(/data:([^;]+)/)[1];
    var base64 = dataURI.replace(/^[^,]+,/, '');
    var byteString = atob(base64);

    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: type});
  }

  function errorHandler(message) {
    return function () {
      var error = new Error('Compression Error:', message);
      callback(message, null);
    };
  }
}

export default {
  stringToIntArray:stringToIntArray,
  arrayToString:arrayToString,
  compress:compress
}
