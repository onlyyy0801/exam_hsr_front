
let UserMsgJson = localStorage.getItem("UserMsg");
let UserMsg = JSON.parse(UserMsgJson);
let UserTable = $('#hsr-user-table');
$(function () {
    loadUserList();
});
function loadUserList() {
    UserTable.bootstrapTable({
        url: pathOl + "showUserList",
        method:"POST",
        dataType:"JSON",        //服务器返回数据类型
        striped:true,       //设置表格隔行换色效果
        pageNumber:1,       //初始化加载第一页
        pagination:true,    //是否分页
        sidePagination:'server',  //服务器端client不分页 server分页
        pageSize:6,         //单页记录数  告知前端使用者  每页显示多少个
        queryParams:function(params){
            var temp={
                isRoot: UserMsg.isRoot,
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
                title: '用户名',
                align:'center',//水平居中
                // halign:'center',//垂直居中
                field: 'uName'
            },
            {
                title: '手机号',
                align:'center',//水平居中
                // halign:'center',//垂直居中
                field: 'uAcc'
            },
            {
                title: '操作',
                align:'center',//水平居中
                // halign:'center',//垂直居中
                // field: 'cId',
                formatter:function (value,row,index) {
                    let btnCon = row.isDisabled ===1 ? "启用" : "禁用";
                    let disabledUser = '<button onclick="disabledUser(\''+row.uId+'\')">'+ btnCon +'</button>';
                    let resetPwd = '<button onclick="resetPwd(\''+row.uId+'\')">'+ "重置密码" +'</button>';
                    return disabledUser + resetPwd;
                }
            }
        ]
    });
}

function reloadUserList() {
    UserTable.bootstrapTable("refresh");
}
function disabledUser(uId) {
    let data = {
        uId: uId
    }
    $.ajax({
        url: pathOl + "changeStatus",
        type: "post",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            reloadUserList();
        }
    });
}

function resetPwd(uId) {
    let data = {
        uId: uId
    }
    $.ajax({
        url: pathOl + "resetPwd",
        type: "post",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            reloadUserList();
        }
    });
}