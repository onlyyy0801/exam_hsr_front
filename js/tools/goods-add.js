
//保存数据  ajax 带上传
// function saveData(){
//     let url='http://localhost:8080/SpringMVCBase_goods_jx/goodsAddAndUpload';
//     //如果是上传，需要设置数据对象  FormData
//     var formData = new FormData(document.getElementById("myForm"));
//     $.ajax({
//         type:'POST',
//         url:url,
//         contentType:false,
//         processData: false,
//         data:formData,
//         // data:form,
//         success:function(result){
//             let index=parent.layer.getFrameIndex(window.name);
//             if(result&&result.code=='1'){
//                 //添加成功  关闭当前弹出的添加页面
//                 //子页面本身根据所在父页面及自身所在层次，获取自身弹出层的索引  固定写法如下  子页面
//                 parent.layer.close(index);
//                 parent.reLoad();
//                 //msg 消息框
//                 parent.layer.msg("商品添加成功！")
//             }else{
//                 parent.layer.close(index);
//                 parent.layer.msg("商品添加失败！！！")
//             }
//         },
//         error:function(result){
//
//         }
//     });
// }

function saveData(){
    let url='http://localhost:8080/SSMDemo/goodsAdd';


    /**
     * ajax 提交数据，数据2种方式
     * formdata：默认表单格式
     *      前端:
     *               contentType:'application/x-www-form-urlencoded;charset=utf-8',
                     data:$("#myForm").serialize(),//把form数据转成formdata格式
            后端：
                    handler方法的参数
                        (Goods goods)
     *
     * JSON：JSON格式数据-->JSON格式的字符串
            {key:value,key:value}
            将form表单是的数据，转成JSON对象
                var myData={}
                    myData.id=$('#id').val();
                    myData.name=$('#name').val();
                {id:xxx,name:xxx}
            JSON对象转JSON格式的字符串：
                JSON.stringify(myData)-->{"id":"xxx","name","xxx"}

       前端：
    *            contentType:'application/json;charset=utf-8',
     *           data:JSON.stringify(myData);
       后端：
            handler方法参数：
                (@RequestBody  Goods goods)
     */


//如下采用formdata 传递数据
    $.ajax({
        type:'POST',
        url:url,
        contentType:'application/x-www-form-urlencoded;charset=utf-8',
        data:$("#myForm").serialize(),
        dataType:'JSON',
        success:function(result){
            let index=parent.layer.getFrameIndex(window.name);
            if(result&&result.code=='1'){
                //添加成功  关闭当前弹出的添加页面
                //子页面本身根据所在父页面及自身所在层次，获取自身弹出层的索引  固定写法如下  子页面
                parent.layer.close(index);
                parent.reLoad();
                //msg 消息框
                parent.layer.msg("商品添加成功！")
            }else{
                parent.layer.close(index);
                parent.layer.msg("商品添加失败！！！")
            }
        },
        error:function(result){

        }
    });
}