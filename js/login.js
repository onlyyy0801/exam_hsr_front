/**
 * 登录验证
 * acc、pwd
 */
let acc = $('#account');
let pwd = $('#password');
let loginBtn = $('#loginBtn');
let markAcc = false;
let markPwd = false;

let checkAcc = /^[a-z0-9_-]{3,16}$/;
let checkPwd = /^[a-z0-9_-]{6,18}$/;

acc.on('blur',function () {
    if(checkAcc.test(acc.val())) {
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




loginBtn.on('click',function () {
    if(markAcc && markPwd){
        let data = {};
        data.mAcc = acc.val();
        data.mPwd = pwd.val();

        $.ajax({
            url: pathOl +　'login',
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
                if(result.mark)
                    // window.location.href = "http://localhost:8080/web01/index.html";
                    window.location.href = "index.html";
                else  {
                    acc.text('');
                    pwd.text('');
                }
            }
        });
    }

});


