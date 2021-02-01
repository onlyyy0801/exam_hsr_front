
let UserMsgJson = localStorage.getItem("UserMsg");
let UserMsg = JSON.parse(UserMsgJson);
let MenuTable = $('#hsr-menu-table');
$(function () {
    loadMenuList();
});
function loadMenuList() {
    MenuTable.bootstrapTable({
        url: pathOl + "showMenuList",
        method:"POST",
        dataType:"JSON",        //服务器返回数据类型
        striped:true,       //设置表格隔行换色效果
        pageNumber:1,       //初始化加载第一页
        pagination:true,    //是否分页
        sidePagination:'server',  //服务器端client不分页 server分页
        pageSize:6,         //单页记录数  告知前端使用者  每页显示多少个
        queryParams:function(params){
            var temp={
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
                field: 'mCon'
            },
            {
                title: '操作',
                align:'center',//水平居中
                // halign:'center',//垂直居中
                // field: 'cId',
                formatter:function (value,row,index) {
                    let btnCon = row.isDelete ===1 ? "启用" : "禁用";
                    let disabledMenu = '<button onclick="disabledMenu(\''+row.mId+'\')">'+ btnCon +'</button>';
                    let changeMenu = '<button onclick="changeMenuCon(\''+row.mId+'\',\''+row.mCon+'\')">'+ "编辑" +'</button>';
                    return disabledMenu + changeMenu;
                }
            }
        ]
    });
}

function reloadMenuList() {
    MenuTable.bootstrapTable("refresh");
}
function disabledMenu(mId) {
    let data = {
        mId: mId
    }
    $.ajax({
        url: pathOl + "changeMenuStatus",
        type: "post",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            reloadMenuList();
        }
    });
}

function changeMenuCon(mId,mCon) {
    layer.open({
        type: 2,
        title: "菜单名称修改",
        area: ["320px","180px"],
        maxmin: false,
        closeBtn: 1,
        shadeClose: false,
        content: "con-pages/changeMenuCon.html",
        success: function (layero, index) {
            let body = layer.getChildFrame('body', index);
            body.find("input[name=mId]").val(mId);
            body.find("input[name=mCon]").val(mCon);
        }
    });
}
