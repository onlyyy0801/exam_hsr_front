function loadUserMsg(uId) {
    let data = {
        uId: uId
    };
    $.ajax({
        url: pathOl + "showUserById",
        type: "post",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            localStorage.setItem("UserMsg", JSON.stringify(result));
        }
    });
    let JsonUserMsg = localStorage.getItem("UserMsg");
    let UserMsg = JSON.parse(JsonUserMsg);

    $('.hsr-head-photo').attr("src",UserMsg.uPhoto);
    $('.hsr-head-userName').text(UserMsg.uName);

}

function loadMenu() {
    let JsonUserMsg = localStorage.getItem("UserMsg");
    let UserMsg = JSON.parse(JsonUserMsg);
    let data = {
        isRoot: UserMsg.isRoot
    }
    $.ajax({
        url: pathOl + "showMenu",
        data: JSON.stringify(data),
        type: "post",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            let len = result.length;
            let sideMain = $('.hsr-side-main');
            sideMain.html('');
            for(let i = 0; i < len; i++){
                if(result[i].isDelete === 1) continue;
                let a = $('<a>'+ result[i].mCon +'</a>');
                let li = $('<li>');
                a.attr("class","hsr-side-menu");
                a.attr("page-name",result[i].mPage);
                a.attr("style","text-decoration:none");
                li.append(a);
                sideMain.append(li);
            }
            /**
             * 侧边栏部分
             */
            let mainCon = $('.hsr-con-main');
            let sideMenu = $('.hsr-side-menu');

            $('.hsr-con-title a').text(sideMenu.eq(0).text());
            mainCon.html('');
            mainCon.load('con-pages/' + sideMenu.eq(0).attr('page-name') + '.html');

            sideMenu.on('click',function () {
                $('.hsr-con-title a').text($(this).text());
                mainCon.html('');
                mainCon.load('con-pages/' + $(this).attr('page-name') + '.html');
            });
        }
    });
}

$(function () {
    let JsonUserMsg = localStorage.getItem("UserMsg");
    if(JsonUserMsg == null){
        window.location.href = "login.html";
    }
    let UserMsg = JSON.parse(JsonUserMsg);
    // 顶部用户信息展示
    loadUserMsg(UserMsg.uId);
    // 加载菜单
    loadMenu();

    /**
     * 顶部用户信息修改、密码修改、退出
     */
    $('.hsr-head-msg').click(function () {
        layer.open({
            type: 2,
            title: "个人信息修改",
            area: ["320px","200px"],
            maxmin: false,
            closeBtn: 1,
            shadeClose: false,
            content: "con-pages/changeUserMsg.html",
            success: function (layero, index) {
                let JsonUserMsg = localStorage.getItem("UserMsg");
                let UserMsg = JSON.parse(JsonUserMsg);
                let body = layer.getChildFrame('body', index);
                body.find("input[name=account]").val(UserMsg.uAcc);
                body.find("input[name=password]").val(UserMsg.uPwd);
                body.find("input[name=name]").val(UserMsg.uName);
            }
        });
    });
    $('.hsr-head-pwd').click(function () {
        layer.open({
            type: 2,
            title: "用户密码修改",
            area: ["320px","180px"],
            maxmin: false,
            closeBtn: 1,
            shadeClose: false,
            content: "con-pages/changeUserPwd.html",
            success: function (layero, index) {
                let JsonUserMsg = localStorage.getItem("UserMsg");
                let UserMsg = JSON.parse(JsonUserMsg);
                let body = layer.getChildFrame('body', index);
                body.find("input[name=password]").val(UserMsg.uPwd);
            }
        });
    });
    $('.hsr-head-exit').click(function () {
        localStorage.removeItem("UserMsg");
        window.location.href = "login.html";
    });

    $('.hsr-head-photo').click(function () {
        layer.open({
            type: 2,
            title: "用户头像修改",
            area: ["320px","180px"],
            maxmin: false,
            closeBtn: 1,
            shadeClose: false,
            content: "con-pages/changeUserPhoto.html",
            success: function (layero, index) {
                let JsonUserMsg = localStorage.getItem("UserMsg");
                let UserMsg = JSON.parse(JsonUserMsg);
                let body = layer.getChildFrame('body', index);
                body.find("input[name=password]").val(UserMsg.uPwd);
            }
        });
    });
});



