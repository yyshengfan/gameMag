exports.dateIsOk= function (sdate,edate) {
  var date1
  var date2
  if(sdate){
    date1 = new Date(sdate)
  }else{
    date1=''
  }
  if(edate){
    date2 = new Date(edate)
  }else{
    date2=this.$currentDate
  }
  if (date1>date2) {
    return 0
  } else {
    return 1
  }
}

//限制用户上传的图片格式和大小
exports.limitIMG= function (file,fileList) {
  var imgType=file.raw.type
  var imgSize=Math.floor(file.raw.size / 1024);
  console.log(imgType)
  console.log(imgSize)
  if(imgType!=='image/jpeg'){
    this.$alert('上传图片只能是 JPG 格式!！', '温馨提示', {
      confirmButtonText: '确定',
      center: true,
      type: 'warning'
    });
    fileList.shift()
  }else if(imgSize>1){
    this.$alert('上传图片大小不能超过5M!', '温馨提示', {
      confirmButtonText: '确定',
      center: true,
      type: 'warning'
    });
    fileList.shift()
  }else{
    return fileList
  }
}
//金额验证
exports.RegisterMoney = (rules, value, callback) => {
  if (!value) {
    callback(new Error('金额不能为空'));
  }
  var reg=new RegExp("^[0-9]+(.[0-9]{2})?$");
  if (!reg.test(value)) {
    callback(new Error('请输入正确金额'));
  }else{
    callback()
  }
};
//0-100整数验证
exports.RegisterInt = (rules, value, callback) => {
  var reg1=new RegExp("^[0-9]{1}?$");
  if(value=='0'){
    callback()
  }else if (value!=0 && !value) {
    callback(new Error('评分不能为空'));
  }
  var reg=new RegExp("^[0-9]{2}?$");
  if(value=='100'){
    callback()
  }else if (value!='100' && !reg.test(value) && !reg1.test(value)) {
    callback(new Error('请输入正确评分'));
  }else{
    callback()
  }
};
//身份证
exports.RegisterNum = (rules, value, callback) => {
  if (!value) {
    callback(new Error('身份证号不能为空'));
  }
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  var reg=/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
  if (!reg.test(value)) {
    callback(new Error('请输入正确的身份证号码'));
  }else{
    callback()
  }
};
//12位数字
exports.RegisterNums = (rules, value, callback) => {
  if (!value) {
    callback(new Error('联行行号不能为空'));
  }
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  var reg=/^[0-9]{12}?$/;
  if (!reg.test(value)) {
    callback(new Error('联行行号为12位数字'));
  }else{
    callback()
  }
};
//邮箱验证
exports.RegisterEmail = (rules, value, callback) => {
  if (!value) {
    callback(new Error('邮箱不能为空'));
  }
  var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
  /* var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;*/
  if (!reg.test(value)) {
    callback(new Error('请输入正确邮箱号'));
  }else{
    callback()
  }
};
//电话验证
exports.RegisterPhone = (rules, value, callback) => {
  //value = value.replace(/^(13[0-9]{1}|17[0-9]{1}|15[0-9]{1}|18[0-9]{1}|147)\d{8}$/,'')
  if (!value) {
    callback(new Error('手机号不能为空'));
  }
  var reg=/^(13[0-9]{1}|14[0-9]{1}|15[0-9]{1}|16[0-9]{1}|17[0-9]{1}|18[0-9]{1}|19[0-9]{1})\d{8}$/;
  if (!reg.test(value)) {
    callback(
      new Error('请输入正确的电话号'))
  }else{
    callback()
  }
};
//姓名验证
exports.RegisterName = (rules, value, callback) => {
  if (!value) {
    callback(new Error('姓名不能为空'));
  }
  var reg=/^([\u4e00-\u9fa5]){2,6}$/;
  if (!reg.test(value)) {
    callback(new Error('姓名为2到6位的中文'));
  }else{
    callback()
  }
};
// 银行账号
exports.RegisterBank = (rules, value, callback) => {
  if (!value) {
    callback(new Error('银行账号不能为空'));
  }
  var reg=/^[0-9]*$/;
  if (!reg.test(value)) {
    callback(new Error('请输入正确的账号'));
  }else{
    callback()
  }
};
// 排除特殊字符
exports.RegisterSign  = (rules, value, callback) => {
  if (!value) {
    callback(new Error('内容不能为空'));
  }
  var reg=/[!@#$^&*()=|{}':;']/;
  if (reg.test(value)) {
    callback(new Error('请输入正确的编号或名称'));
  }else{
    callback()
  }
};

//验证登录名必须为数组字母组合
exports.loginName = (rules, value, callback)=>{
  if (!value) {
    return callback(new Error('内容不能为空'));
  }
  var reg=/^[a-zA-Z0-9_-]{6,16}$/
  if (!reg.test(value)) {
    callback(new Error('用户名不能有特殊字符或汉字,并且在6到16位之间'));
  }else{
    callback()
  }
}

//验证为数字
exports.isNumber = (rules, value, callback)=>{
  if (!value) {
    return callback(new Error('内容不能为空'));
  }
  var reg=/^[0-9]*$/
  if (!reg.test(value)) {
    callback(new Error('内容必须为数字'));
  }else{
    callback()
  }
}
//验证字符串不含中文逗号
exports.isChinese = (rules, value, callback)=>{
  if (!value) {
    return callback(new Error('内容不能为空'));
  }
  if (value.indexOf("，") > 0 ) {
    callback(new Error('逗号不能为中文逗号'));
  }else if(value.indexOf(" ") > 0){
    callback(new Error('请勿输入空格'));
  }else{
    callback()
  }
}

//限制结束时间
exports.checkEtime = (stime,etime,callback)=>{
  console.log(new Date(etime).getTime() , new Date(stime).getTime())
  if (new Date(etime).getTime()-new Date(stime).getTime()<0) {
    return callback(new Error('结束时间必须大于开始时间'));
  }else{
    callback()
  }
}

//密码限制
exports.password  = (rules, value, callback) => {
  if (!value) {
     callback(new Error('密码不能为空'));
  }else{
    callback();
  }
  // var reg=/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{8,20}/;
  // if (!reg.test(value)) {
  //   callback(new Error('密码必须包含数字及大、小写字母,长度8-20位'));
  // }else{
  //   callback()
  // }
};