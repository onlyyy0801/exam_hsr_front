/**
 * 注册界面，
 * acc、pwd、rePwd、phone、email
 * @type {boolean}
 */

let acc = $('#account');
let pwd = $('#password');
let rePwd = $('#rePwd');
let nickname = $('#nickname');
let signBtn = $('#signBtn');
let markAcc = false;
let markPwd = false;
let markRePwd = false;
let markNickname = false;

let checkAcc = /^1[3-9]\d{9}$/;
let checkPwd = /^[\w_-]{6,16}$/;

acc.on('blur',function () {
    if(checkAcc.test(acc.val())){
        changeBlue(acc);
        markAcc = true;
    }
    else changeRed(acc);
});
pwd.on('blur',function () {
    if(checkPwd.test(pwd.val())) {
        changeBlue(pwd);
        markPwd = true;
    }
    else changeRed(pwd);
});
rePwd.on('blur',function () {
    if(pwd.val() === rePwd.val()) {
        changeBlue(rePwd);
        markRePwd = true;
    }
    else changeRed(rePwd);
});
nickname.on('blur',function () {
    if(nickname.val() !== "") {
        changeBlue(nickname);
        markNickname = true;
    }
    else changeRed(nickname);
});

signBtn.on('click',function () {

    if(markAcc && markPwd && markRePwd && markNickname){
        let data = {
            uAcc: acc.val(),
            uPwd: pwd.val(),
            uName: nickname.val()
        };
        $.ajax({
            url: pathOl + 'sigin',
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
                if(result) {
                    window.location.href = "login.html";
                }
                else  {
                    alert("失败");
                    acc.val('');
                    pwd.val('');
                    rePwd.val('');
                    nickname.val('');
                }
            }
        });
    }
});

