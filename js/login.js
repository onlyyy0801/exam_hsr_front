/**
 * 登陆界面，账号、密码框失去焦点时进行判空，不进行任何格式判断
 * @type {jQuery|HTMLElement}
 */
let acc = $('#account');
let password = $('#password');
let loginBtn = $('#loginBtn');
let markAcc = false;
let markPwd = false;


acc.on('blur',function () {
    if(acc.val() !== "") {
        changeBlue(acc);
        markAcc = true;
    }
    else changeRed(acc);
});
password.on('blur',function () {
    if(password.val() !== "") {
        changeBlue(password);
        markPwd = true;
    }
    else changeRed(password);
});


/**
 * 登陆界面，登陆按钮点击触发验证
 */
loginBtn.on('click',function () {
    if(markAcc && markPwd){
        let data = {
            uAcc: acc.val(),
            uPwd: password.val()
        };

        $.ajax({
            url: pathOl +　'login',
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
                console.log(result);
                if(result.uId == null || result.uAcc == null || result.uName == null || result.uPwd == null ||
                    result.uPhoto == null ){
                    acc.val('');
                    password.val('');
                }else if(result.isDisabled === 1){
                    alert("该用户被禁用！！！");
                    acc.val('');
                    password.val('');
                }else{
                    localStorage.setItem("UserMsg", JSON.stringify(result));
                    // window.location.href = "http://localhost:8080/web01/index.html";
                    window.location.href = "index.html";
                }
            }
        });
    }
});


