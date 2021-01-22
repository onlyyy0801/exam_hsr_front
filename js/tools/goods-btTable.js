$(function(){

    //页面加载完毕，调用bt加载表格数据
    load();



})


//刷新表格
function reLoad(){
    //bt表格会自动搞定刷新数据
    $('#myTable').bootstrapTable('refresh');
}

//加载数据
function load(){
    //bt加载数据的代码

    let url="http://localhost:8080/SpringMVC_1/goodsSelect"
    //获取页面表格标签，并生成bt表格对象`
    //bt表格对象设置表格参数，以JSON格式来设置  ｛key：value｝
    $('#myTable').bootstrapTable({

            formatLoadingMessage:function()
            {
                return "数据加载中...";
            },
            formatNoMatches:function(){
                return "无匹配数据";
            },
            method:'POST',
            url:url,
            striped:true,//设置表格各行换色效果
            dataType:'json',//服务器返回数据的类型
            singleSelect:true,//设置为true代表禁止多选
            sidePagination:'client',//设置分页模式,client客户端模式   server 服务端模式（client 不分页）
            //设置表格的列
            columns:[
                    {
                        title:'序号',//列名称
                        align:'center',//列名称、列数据居中 水平居中
                        halign:'center', //垂直居中
                        width:'50px',//设置列宽
                        //formatter  代表设置数据   如果数据库里面有合适的数据，就不用设置formatter
                        formatter:function(value,row,index){
                            //value 就是或的当前行的当前列 数据
                            //row  当前行的数据
                            //index 当前行的索引
                            return index+1
                        }

                    },
                    {
                            title:'商品名称',
                            field:'name',
                            align:'center',//列名称、列数据居中 水平居中
                            halign:'center', //垂直居中
                            width:'50px',//设置列宽
                    },
                    {
                        title:'商品分类',
                        field:'category',
                        align:'center',//列名称、列数据居中 水平居中
                        halign:'center', //垂直居中
                        width:'50px',//设置列宽
                    },
                    {
                        title:'库存',
                        field:'stock',
                        align:'center',//列名称、列数据居中 水平居中
                        halign:'center', //垂直居中
                        width:'50px',//设置列宽
                    },
                    {
                        title: '金额',
                        field: 'money',
                        align: 'center',//列名称、列数据居中 水平居中
                        halign: 'center', //垂直居中
                        width: '50px',//设置列宽
                    },
                    {
                        title:'添加时间',
                        field:'createTime',
                        align:'center',//列名称、列数据居中 水平居中
                        halign:'center', //垂直居中
                        width:'50px',//设置列宽
                    },
                    {
                        title:'操作',
                        // field:'createTime', //和后台pojo属性进行对应
                        align:'center',//列名称、列数据居中 水平居中
                        halign:'center', //垂直居中
                        width:'50px',//设置列宽
                        formatter:function(value,row,index){
                                //如果将来 涉及到字符串数据传入参数  需要设置单引号
                            let d='<a href="javascript:void(0);" onclick="removeData(\''+row.id+'\')">删除</a>'
                            let m='<a href="javascript:void(0);" onclick="modifyGoods(\''+row.id+'\',\''
                                +row.detail+'\',\''+row.name+'\',\''+row.category+'\',\''+row.stock+'\',\''+row.money+'\')">修改</a>'
                            let detail='<a href="javascript:void(0);" onclick="fetchDetail(\''+row.id+'\')">详情</a>'
                            return d+" "+m+" "+detail
                        }
                    }
            ]
    })
}


function fetchDetail(id){
    if(id){
        let url="http://localhost:8080/SSMDemo/goodsDetailDO/"+id
        $.ajax({
            url:url,
            dataType:'json',
            type:'POST',
            success:function(result){
                console.log(result)

            },
            error:function(result){
            }
        })

    }
}

function removeData(id){
    if(id){
        let url="http://localhost:8080/SSMDemo/goodsRemove2/"+id
        $.ajax({
            url:url,
            dataType:'json',
            type:'POST',
            success:function(result){
                console.log(result)
                //将返回的result数据，渲染到页面上
               if(result.code=="1"){
                    //删除成功-->重新渲染表格的数据
                   reLoad()
               }else{
                   alert("删除失败");
               }
            },
            error:function(result){
            }
        })

    }else{
        alert("数据有问题！无法删除");
    }
}


//弹出层  添加页面
function addGoods(){
    //打开 弹出层
    layer.open({
        type:2,//可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
        title:'商品添加',
        maxmin:false,
        shadeClose:false,
        area:['80%','80%'],//弹出层的宽高
        content:'../frameHtml/goods-add.html'//设置弹出层打开的页面
    });
}


//修改商品
function modifyGoods(id,detail,name,category,stock,money){
    //打开 弹出层
    layer.open({
        type:2,//可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
        title:'商品修改',
        maxmin:false,
        shadeClose:false,
        area:['80%','80%'],//弹出层的宽高
        content:'../frameHtml/goods-edit.html',//设置弹出层打开的页面
        //弹出层页面成功打开后，的设置
        success:function(layero,index){
            //当前是表格页面     修改是表格的子页面   父页面JS代码中将数据传递给子页面中
            //获取子页面HTML对象
           let childBody= layer.getChildFrame('body',index);

           //在childBody子页面body区域中find（查找）input标签name属性是xxx的那个input对象，给其设置值为xxx
           $(childBody).find('input[name=name]').val(name);
           $(childBody).find('input[name=stock]').val(stock);
           $(childBody).find('input[name=detail]').val(detail);
           $(childBody).find('input[name=money]').val(money);
           $(childBody).find('select[name=category]').val(category);
            //获取子页面JS对象
        }
    });
}