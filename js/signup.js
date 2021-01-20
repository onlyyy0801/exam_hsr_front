/**
 * 注册验证
 * acc、pwd、rePwd、phone、email
 * @type {boolean}
 */

let acc = $('#account');
let pwd = $('#password');
let rePwd = $('#rePwd');
let phone = $('#phone');
let email = $('#email');
let signBtn = $('#signBtn');
let markAcc = false;
let markPwd = false;
let markRePwd = false;
let markPhone = false;
let markEmail = false;

let checkAcc = /^[a-z0-9_-]{3,16}$/;
let checkPwd = /^[a-z0-9_-]{6,18}$/;
let checkPhone = /^[\d]{5,20}$/;
let checkEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

acc.on('blur',function () {
    let data = {};
    data.k = "checkAcc";
    data.v = acc.val();
    $.ajax({
        url: pathOl = 'signup',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            if(!result.mark) {
                changeBlue(acc);
                markAcc = true;
            }
            else changeRed(acc);
        }
    });
});
pwd.on('blur',function () {
    if(checkPwd.test(pwd.val())) {
        changeBlue(pwd);
        markPwd = true;
    }
    else changeRed(pwd);
});
rePwd.on('blur',function () {
    if(checkPwd.test(rePwd.val()) && pwd.val() === rePwd.val()) {
        changeBlue(rePwd);
        markRePwd = true;
    }
    else changeRed(rePwd);
});
phone.on('blur',function () {
    if(checkPhone.test(phone.val())) {
        changeBlue(phone);
        markPhone = true;
    }
    else changeRed(phone);
});
email.on('blur',function () {
    if(checkEmail.test(email.val())) {
        changeBlue(email);
        markEmail = true;
    }
    else changeRed(email);
});

signBtn.on('click',function () {
    if(markAcc && markPwd && markRePwd && markPhone && markEmail){
        let data = {};

        data.k = "insertManager";
        data.v = {
            mAcc: $('#account').val(),
            mPwd: pwd.val(),
            mPhone: phone.val(),
            mEmail: email.val()
        };
        $.ajax({
            url: pathOl + 'signup',
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
                if(result.mark) {
                    window.location.href = pathOl +　"login.html";
                }
                else  {
                    $('#account').text();
                    pwd.text('');
                    rePwd.text('');
                    phone.text('');
                    email.text('');
                }
            }
        });
    }
});

