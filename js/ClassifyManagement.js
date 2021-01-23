
let mainClassify = $('.hsr-con-main');
var jsonStr=localStorage.getItem("UserMsg")
var jsonObj=JSON.parse(jsonStr);

$(function () {
    wgzClassifyTable();
})

// 刷新表格
function reLoadClassify() {
    $("#hsr-classify-table").bootstrapTable("refresh");
}

function wgzClassifyTable() {
    let url = pathOl+"showClassify";
    $("#hsr-classify-table").bootstrapTable({
        url:url,
        method:"POST",
        dataType:"JSON",        //服务器返回数据类型
        striped:true,       //设置表格隔行换色效果
        pageNumber:1,       //初始化加载第一页
        pagination:true,    //是否分页
        sidePagination:'server',  //服务器端client不分页 server分页
        pageSize:10,         //单页记录数  告知前端使用者  每页显示多少个
        queryParams:function(params){
            var temp={
                uId:jsonObj.uId,
                offset:params.offset,   //SQL语句启示索引
                pageNumber: params.limit    //每页显示数量
            }
            return JSON.stringify(temp);
        },
        columns:[
            {
                title:'序号',
                align:'center',//水平居中
                // halign:'center',//垂直居中
                formatter:function (value,row,index) {
                    return index+1;
                }
            },
            {
                title: '分类名',
                align:'center',//水平居中
                // halign:'center',//垂直居中
                field: 'cName'
            },
            {
                title: '操作',
                align:'center',//水平居中
                // halign:'center',//垂直居中
                // field: 'cId',
                formatter:function (value,row,index) {
                    let changeClassify = '<button onclick="changeClassify(\''+row.cId+'\',\''+row.cName+'\',\''+row.uId+'\')">修改</button>';
                    let deleteClassify = '<button onclick="removeClassify(\''+row.cId+'\',\''+row.uId+'\')">删除</button>';
                    return changeClassify+deleteClassify;
                }
            }
        ],
        onDblClickRow:function (row,$element) {
            alert(JSON.stringify(row));
            console.log($element)
        }
    })
}

//删除试题
function removeClassify(cId,uId) {
    let jsonData = {
        cId: cId,
        uId: uId
    };
    $.ajax({
        url:pathOl+'delClassify',
        type:"post",
        data: JSON.stringify(jsonData),
        contentType: 'application/json',
        dataType: 'json',
        success:function (mark) {
            if (mark){
                alert("删除成功！！！");
                reLoadClassify();
            }else {
                alert("删除失败！！！");
            }
        }
    });
}

//修改试题
function changeClassify(cId,cName,uId) {
    var jsontext={
        cId:cId,
        cName:cName,
        uId:uId
    }
    localStorage.setItem("changeClassify",JSON.stringify(jsontext));
    //打开 弹出层
    layer.open({
        type:2,//可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
        title:'修改分类名',
        maxmin:false,
        shadeClose:false,
        area:["320px","200px"],//弹出层的宽高
        content:'con-pages/changeClassifyName.html',//设置弹出层打开的页面
        //弹出层页面成功打开后，的设置       加载子页面 渲染子页面 load后端数据 弹出 success 展示成功
        success:function(layero,index){
            //当前是表格页面     修改是表格的子页面   父页面JS代码中将数据传递给子页面中
            //获取子页面HTML对象  固定方法
            //js  dom对象
            let childBody= layer.getChildFrame('body',index);
            //在childBody子页面body区域中find（查找）input标签name属性是xxx的那个input对象，给其设置值为xxx
            $(childBody).find('input[name=className]').val(cName);
            //获取子页面JS对象
        }
    });
}

//添加试题分类
$('#hsr-classify-addBtn').click(function () {
    let jsonData = {
        uId: jsonObj.uId,
        cName: $(this).prev().val()
    };
    $.ajax({
        url: pathOl + 'addClassify',
        type: 'post',
        data: JSON.stringify(jsonData),
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            if(result) {
                alert("添加成功！！！");
                reLoadClassify();
            }else {
                alert("添加失败！！！");
            }
        }
    });

})


