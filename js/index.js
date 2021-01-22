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

    $('.yy-head-photo').attr("src",UserMsg.uPhoto);
    $('.yy-head-userName').text(UserMsg.uName);

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
            console.log(result);
            let len = result.length;
            console.log(len)
            let sideMain = $('.yy-side-main');
            sideMain.html('');
            for(let i = 0; i < len; i++){
                if(result[i].isDelete === 1) continue;
                console.log(result[i].mCon);
                console.log(result[i].mPage);
                let a = $('<a>'+ result[i].mCon +'</a>');
                let li = $('<li>');
                a.attr("class","yy-side-menu");
                a.attr("page-name",result[i].mPage);
                li.append(a);
                sideMain.append(li);
            }
            /**
             * 侧边栏部分
             */
            let mainCon = $('.yy-con-main');
            let sideMenu = $('.yy-side-menu');

            mainCon.load('con-pages/' + sideMenu.eq(0).attr('page-name') + '.html');
            sideMenu.on('click',function () {
                console.log($(this).attr('page-name'));
                $('.yy-con-title a').text($(this).text());
                mainCon.html('');
                mainCon.load('con-pages/' + $(this).attr('page-name') + '.html');
            });
        }
    });
}

$(function () {
    // 假数据存储
    // let falseData = {
    //     uId: "fd1ff6bf-dc3e-4c4c-9ee4-76e97ceb4f51",
    //     uAcc: "admin",
    //     uName: "admin2222",
    //     uPwd: "admin123",
    //     uPhoto: "img/TL.png",
    //     isDisabled: 0,
    //     isRoot: 1
    // };
    // localStorage.setItem("UserMsg",JSON.stringify(falseData));

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
    $('.yy-head-msg').click(function () {
        layer.open({
            type: 2,
            title: "个人信息修改",
            area: ["320px","200px"],
            maxmin: false,
            // closeBtn: 1,
            shadeClose: true,
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
    $('.yy-head-pwd').click(function () {
        layer.open({
            type: 2,
            title: "用户密码修改",
            area: ["320px","180px"],
            maxmin: false,
            // closeBtn: 1,
            shadeClose: true,
            content: "con-pages/changeUserPwd.html",
            success: function (layero, index) {
                let JsonUserMsg = localStorage.getItem("UserMsg");
                let UserMsg = JSON.parse(JsonUserMsg);
                let body = layer.getChildFrame('body', index);
                body.find("input[name=password]").val(UserMsg.uPwd);
            }
        });
    });
    $('.yy-head-exit').click(function () {
        localStorage.removeItem("UserMsg");
        window.location.href = "login.html";
    });








    // sideMenu.click(function () {
    //     $('.yy-con-title a').text($(this).text());
    //     mainCon.html('');
    //     mainCon.load('con-pages/' + $(this).attr('page-name') + '.html');
    // });
});


