
//保存数据  ajax
function modifyData(){
    let url='http://localhost:8080/SpringMVCBase_goods_jx/goodsAdd2';

    $.ajax({
        type:'POST',
        url:url,
        //serialiaze  将表单转换成表单对象   非JSON格式   formdata格式
        //后台 返回数据  @ResponseBody
        dataType:"json",//服务器返回数据JSON
        //contentType:前端向后台发送的数据格式
        /*
        *JSON-->contentType:'application/json;charset=utf-8'
        *     后台接受数据 参数  @RequestBody
        *formdata--> contentType:'application/x-www-form-urlencoded;charset=utf-8'
        * */
        contentType:'application/x-www-form-urlencoded;charset=utf-8',
        data:$('#myForm').serialize(),
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