let JsonUserMsg = localStorage.getItem("UserMsg");
let UserMsg = JSON.parse(JsonUserMsg);
let editPaperTable = $('#hsr-editPaper-table');
// 入口函数
$(function (){
// 加载试卷参数 -- 包括 题目、时长
    loadPaperParam();
// 加载试卷试题内容
    loadTestCon();
});
function reloadTestCon() {
    editPaperTable.bootstrapTable("refresh");
}
// 加载分类参数
function loadClassifyParam() {
    let data = {
        uId: UserMsg.uId
    }
    $.ajax({
        url: pathOl + "showClassify",
        type: "post",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            let len = result.length;
            for(let i = 0; i < len; i++){
                let option = $('<option>'+ result[i].cName +'</option>');
                option.attr("value",result[i].cId);
                $('#hsr-editPaper-filterTClassify').append(option);
            }
        }
    });
}
// 加载试卷参数 -- 包括 题目、时长
function loadPaperParam() {
    let data = {
        pId: $('input[name = pId]').val()
    }
    $.ajax({
        url: pathOl + "showPaperById",
        type: "post",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#hsr-editPaper-value').val(result.pName);
            $('#hsr-editPaper-time').val(result.pTime);
        }
    });
}
// 加载试卷试题内容
function loadTestCon() {
    editPaperTable.html('');
    editPaperTable.bootstrapTable({
        url: pathOl + "showPaperTest",
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
                pId: $('input[name = pId]').val(),
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
                title: '题目',
                align:'center',//水平居中
                // halign:'center',//垂直居中
                field: 'tName'
            },
            {
                title: '操作',
                align:'center',//水平居中
                // halign:'center',//垂直居中
                // field: 'xxx',
                formatter:function (value,row,index) {
                    return '<button onclick="delPaperTest(\'' + row.tId + '\',\'' + row.tType + '\')">删除</button>';
                }
            }
        ]
    });
}
// 方法：添加试题到试卷中
function addTestToPaper(tId,tType){
    let data = {
        pId: $('input[name=pId]').val(),
        tId: tId,
        tType: tType
    }
    $.ajax({
        url: pathOl + "addPaperTest",
        type: "post",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            loadPaperParam();
        }
    });
}
// 方法：添加试题到试卷中
function delPaperTest(tId,tType){
    let data = {
        pId: $('input[name=pId]').val(),
        tId: tId,
        tType: tType
    }
    $.ajax({
        url: pathOl + "delPaperTest",
        type: "post",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            reloadTestCon();
        }
    });
}
// 方法：加载可以添加的试题
function loadAddibleTest() {
    editPaperTable.html('');
    editPaperTable.bootstrapTable({
        url: pathOl + "showAddibleTest",
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
                pId: $('input[name = pId]').val(),
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
                title: '题目',
                align:'center',//水平居中
                // halign:'center',//垂直居中
                field: 'tName'
            },
            {
                title: '操作',
                align:'center',//水平居中
                // halign:'center',//垂直居中
                // field: 'xxx',
                formatter:function (value,row,index) {
                    return '<button onclick="addTestToPaper(\'' + row.tId + '\',\'' + row.tType + '\')">添加</button>';
                }
            }
        ]
    });
}
// 点击事件：修改试卷 标题及时长
$('#hsr-editPaper-edit').click(function () {
    let data = {
        pId: $('input[name = pId]').val(),
        pName: $('#hsr-editPaper-value').val(),
        pTime: $('#hsr-editPaper-time').val()
    }
    $.ajax({
        url: pathOl + "changePaper",
        type: "post",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            loadPaperParam();
        }
    });
});
// 点击事件：显示所有可以添加的试题
$('#hsr-editPaper-addTestBtn').click(function () {
    $('#hsr-editPaper-addTestBtn').hide();
    $('#hsr-editPaper-showTestBtn').show();
    // 加载筛选模块
    loadClassifyParam();
    $('#hsr-editPaper-filter').show();
    // 加载可添加的试题
    loadAddibleTest();
});
// 点击事件：显示试卷中已添加的试题
$('#hsr-editPaper-showTestBtn').click(function () {
    $('#hsr-editPaper-addTestBtn').show();
    $('#hsr-editPaper-showTestBtn').hide();
    $('#hsr-editPaper-filter').hide();
    loadTestCon();
});