//打开goodsTable页面的同时发送ajax去请求页面，将拿来的数据，渲染到表格content
//纯JS -->window.onload  代表打开的页面中HTML元素都加载完毕后 去自动执行xxx

//如下代码格式就是jQuery的  window.onload
$(function(){

    fetchGoodsData();


})

//获取商品信息
function fetchGoodsData(){
    let url="http://localhost:8080/SpringMVCBase_goods/goodsSelect"
    $.ajax({
        url:url,
        contentType:'application/json;charset=UTF-8',
        type:'POST',
        success:function(result){
            console.log(result)
            //将返回的result数据，渲染到页面上
            flushTableData(result)
        },
        error:function(result){
        }
    })
}

//刷新表格数据
function flushTableData(result){
    if(result){

        //先获取表格对象
        $("#dataContent").text("");
        // $("#content").text("标题行加进去")
        for(let i in result){
            //理解过程 console.log(result[i])
            //1、证明@ResponseBody 返回的数据就是JSON对象的数据，因为后台是集合嵌套GOODS对象
            //2、经过ResponseBody转换，将后台数据转成了JSON格式
            //3、集合-->数组
            //4、集合中的GOODS对象-->{}JSON对象
            //5、前端拿到JSON对象，就可以，JSON对象打点调用属性值

            //追加
            //先将表格里面的内容赋值空在追加
            $("#dataContent").append(makeTableTr(result[i],i));
        }
    }
}

//组装每一行的数据
function makeTableTr(paramJSON,i){
    let num=Number(i)+1;
    let resultTr='<tr><td>'+num+'</td><td>'
        +paramJSON.name+'</td><td>'+paramJSON.category+'</td><td>'
        +paramJSON.stock+'</td><td>'+paramJSON.money+'</td><td>'
        +paramJSON.createTime+'</td><td><a href="javascript:void(0)" onclick="fetchDetail(\''+paramJSON.detail+'\')">详情</a>|<a href="javascript:void(0)" onclick="removeData(\''+paramJSON.id+'\')">删除</a></td></tr>'
    return resultTr;
}

//获取详情信息
function fetchDetail(detail){
    /*
    * <a href=""></a>
    * href  设置网址、URL
    * */
    if(detail){

        var iLeft = (window.screen.availWidth-10-400)/2;
        var iTop = (window.screen.availHeight-30-200)/2;
        let myWindow=window.open("","",'height=200,innerHeight=200,width=400,innerWidth=400,top='+iTop+',left='+iLeft+',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no');
        myWindow.document.write(detail)
        myWindow.document.title='详情';

        myWindow.focus();
    }else{
        alert("详情数据有问题！！无法显示")
    }
}


function removeData(id){
    //思路
    /**
     * 1、删除数据库的数据
     * 发送ajax 将id 传入后台  后台实现删除操作，紧接着做查询表格所有数据操作，并按照ajax路径返回
     *
     *
     *2、删除页面上的数据
     * 重新渲染表格  调用flushTableData
     */
    if(id){
        let url="http://localhost:8080/SpringMVCBase_goods/goodsRemove/"+id
        $.ajax({
            url:url,
            contentType:'application/json;charset=UTF-8',//接受返回数据格式
            type:'POST',
            success:function(result){
                console.log(result)
                //将返回的result数据，渲染到页面上
                flushTableData(result)
            },
            error:function(result){
            }
        })

    }else{
        alert("数据有问题！无法删除");
    }


}