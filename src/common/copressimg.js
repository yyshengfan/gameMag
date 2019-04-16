export default function compress(file, quality, scale,callback) {
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

    canvas.width = this.naturalWidth*scale;
    canvas.height = this.naturalHeight*scale;
    ctx = canvas.getContext('2d');
    ctx.drawImage(this, 0, 0,canvas.width,canvas.height);
    dataURI = canvas.toDataURL(mimeType, quality);
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
    console.log(type);
    return new Blob([ia], {type: type});
  }

  function errorHandler(message) {
    return function () {
      var error = new Error('Compression Error:', message);
      callback(message, null);
    };
  }
}

