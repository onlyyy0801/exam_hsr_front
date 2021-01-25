let JsonUserMsg = localStorage.getItem("UserMsg");
let UserMsg = JSON.parse(JsonUserMsg);
let markValue = false;
$('#hsr-paper-value').on('blur',function () {
    if($(this).val() !== "") markValue = true;
});
$('#hsr-paper-addBtn').click(function () {
    if(!markValue){
        alert("请填写试卷名称");
    }else {

        let data = {
            pName: $('#hsr-paper-value').val(),
            uId: UserMsg.uId,
            pTime: $('#hsr-paper-time').val()
        }
        console.log(data);
        $.ajax({
            url: pathOl + "addPaper",
            data: JSON.stringify(data),
            type: "post",
            contentType: "application/json",
            dataType: "json",
            success: function (result) {
                if (result) alert("success");
            }
        });
    }
});

$(function () {
    loadPaper();
});
// 刷新表格
function reLoadPaper() {
    $("#hsr-paper-table").bootstrapTable("refresh");
}

function loadPaper() {
    $('#hsr-paper-table').bootstrapTable({
       url: pathOl + "showPaper",
       method: "post",
        dataType: "json",
        striped:true,       //设置表格隔行换色效果
        pageNumber:1,       //初始化加载第一页
        pagination:true,    //是否分页
        sidePagination:'server',  //服务器端client不分页 server分页
        pageSize:6,         //单页记录数  告知前端使用者  每页显示多少个
        queryParams:function(params){
            let data={
                uId:UserMsg.uId,
                offset:params.offset,   //SQL语句启示索引
                pageNumber: params.limit    //每页显示数量
            }
            return JSON.stringify(data);
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
                title: '试卷名称',
                align:'center',//水平居中
                // halign:'center',//垂直居中
                field: 'pName'
            },
            {
                title: '时长',
                align:'center',//水平居中
                // halign:'center',//垂直居中
                field: 'pTime'
            },
            {
                title: '状态',
                align:'center',//水平居中
                // halign:'center',//垂直居中
                // field: 'pStatus',
                formatter:function (value,row,index) {
                    let con = null;
                    if(row.pStatus === 0) con = "未开启";
                    else if(row.pStatus === 1) con = "已开启";
                    return con;
                }
            },
            {
                title: '修改时间',
                align:'center',//水平居中
                // halign:'center',//垂直居中
                field: 'createTime'
            },
            {
                title: '操作',
                align:'center',//水平居中
                // halign:'center',//垂直居中
                // field: 'xxx',
                formatter:function (value,row,index) {
                    let status = null;
                    if(row.pStatus === 0) status = "开始考试";
                    else if(row.pStatus === 1) status = "关闭考试";

                    let changeStatus = '<a onclick="changeStatus(\'' + row.pId + '\',\'' + row.pStatus+'\')">'+status+'</a>';
                    let showCode =     '<a onclick="showCode(\'' + row.pCode + '\')">考试码</a>';
                    let editPaper =    '<a onclick="editPaper(\''+row.pId+'\')">编辑</a>';
                    let deletePaper =  '<a onclick="deletePaper(\''+row.pId+'\',\''+UserMsg.uId+'\')">删除</a>';

                    return changeStatus + showCode + editPaper + deletePaper;
                }
            }
        ]
    });
}
function changeStatus(pId,status) {
    let conMsg = "";
    if(status) {
        status = 0;
        conMsg = "关闭考试";
    }
    else {
        status = 1;
        conMsg = "开启考试";
    }
    let data = {
        pId: pId,
        pStatus: status
    }
    $.ajax({
        url: pathOl + "changePaperStatus",
        type: "post",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            if(result.mark) alert(conMsg + "成功");
            else alert(conMsg + "失败");
        }
    });
}
function showCode(code) {
    layer.open({
        type:2,//可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
        title:'考试链接',
        maxmin:false,
        shadeClose:false,
        area:["70%","70%"],//弹出层的宽高
        content:'con-pages/showCode.html',//设置弹出层打开的页面
        success:function(layero,index){
            //当前是表格页面     修改是表格的子页面   父页面JS代码中将数据传递给子页面中
            //获取子页面HTML对象  固定方法
            //js  dom对象
            let childBody= layer.getChildFrame('body',index);
            //在childBody子页面body区域中find（查找）input标签name属性是xxx的那个input对象，给其设置值为xxx
            $(childBody).find('input[name=code]').val(code);
        }
    });
}
function editPaper(pId) {
    layer.open({
        type:2,//可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
        title:'编辑试卷',
        maxmin:false,
        shadeClose:false,
        area:["70%","70%"],//弹出层的宽高
        content:'con-pages/editPaper.html',//设置弹出层打开的页面
        success:function(layero,index){
            //当前是表格页面     修改是表格的子页面   父页面JS代码中将数据传递给子页面中
            //获取子页面HTML对象  固定方法
            //js  dom对象
            let childBody= layer.getChildFrame('body',index);
            //在childBody子页面body区域中find（查找）input标签name属性是xxx的那个input对象，给其设置值为xxx
            $(childBody).find('input[name=pId]').val(UserMsg.pId);
        }
    });
}
function deletePaper(pId, uId) {
    let data = {
        pId: pId,
        uId: uId
    }
    $.ajax({
        url: pathOl + "delPaper",
        type: "post",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            if(result.mark) {
                alert("删除成功");
                reLoadPaper();
            }
            else alert("删除失败");
        }
    });
}