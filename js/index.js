$(function () {
    // 假数据存储
    // let falseData = {
    //     uId: "fd1ff6bf-dc3e-4c4c-9ee4-76e97ceb4f51",
    //     uAcc: "admin",
    //     uName: "admin",
    //     uPwd: "admin123",
    //     uPhoto: "img/TL.png",
    //     isDisabled: 0,
    //     isRoot: 1
    // };
    // localStorage.setItem("UserMsg",JSON.stringify(falseData));


    /**
     * 顶部用户信息展示
     */
    let JsonUserMsg = localStorage.getItem("UserMsg");
    let UserMsg = JSON.parse(JsonUserMsg);
    loadUserMsg();

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
                let body = layer.getChildFrame('body', index);
                body.find("input[name=password]").val(UserMsg.uPwd);
            }
        });
    });
    $('.yy-head-exit').click(function () {
        localStorage.removeItem("UserMsg");
    });



    /**
     * 侧边栏部分-菜单下拉动画
     */
    let mainCon = $('.yy-con-main');
    mainCon.load('con-pages/indexCon.html');

    $('.yy-side-main>li').click(function () {
        $(this).next('ul').slideToggle();
        $('.yy-side-menu').not($(this).next('ul')).slideUp();
        $('.yy-title-one a').text($(this).children().children().text());
        $('.yy-title-two a').text('');
    });

    $('.yy-side-menu>li').click(function () {
        $('.yy-title-one a').text($(this).parent('ul.yy-side-menu').prev().children('a').innerText);
        $('.yy-title-two a').text($(this).children('a').text());
    });

    $('.yy-head-title').click(function () {
        mainCon.html('');
        mainCon.load('con-pages/indexCon.html');
    });

    $('.yy-con-showIndexCon').click(function () {
        mainCon.html('');
        mainCon.load('con-pages/indexCon.html');
    });

    $('.yy-con-showClassify').click(function () {
        mainCon.html('');
        mainCon.load('con-pages/classify.html');

    });

    $('.yy-con-showTest').click(function () {
        mainCon.html('');
        mainCon.load('con-pages/showTest.html');
    });

    $('.yy-con-showPaper').click(function () {
        mainCon.html('');
        mainCon.load("con-pages/showPaper.html");
    });
});


function loadUserMsg() {
    let JsonUserMsgOld = localStorage.getItem("UserMsg");
    let UserMsgOld = JSON.parse(JsonUserMsgOld);
    let uId = UserMsgOld.uId;
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