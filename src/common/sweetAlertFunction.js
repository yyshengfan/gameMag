import Swal from 'sweetalert2';

export class swal{

 static swalConfirm(option){
   return new Promise(function(resolve,reject){
     Swal({
       title: '确定操作?',
       text: '确定要执行相应操作吗？',
       type: 'question',
       showCancelButton: true,
       confirmButtonText: '确定',
       cancelButtonText: '取消'
     }).then((result) => {
       if (result.value) {
         // Swal(
         //   '操作成功!',
         //   '已经操作成功！',
         //   'success'
         // );
         resolve(true);

       } else {
         resolve(false);
       }
     }).catch((err)=>{
       reject("出错误了！"+err);
     })
   });

  };

 static reminder(option){
   if(!option){
     Swal(
       "提示" ,
       "你还没有进行操作！",
       "info"
     )
   }else{
     Swal(
       option.title,
       option.text,
       option.type
     )
   }

 }
}


