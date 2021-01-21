let markPwd = false;
let checkPwd = /^[\w_-]{6,16}$/;

$('input[name=password]').on('blur',function () {
    if(checkPwd.test($(this).val())){
        changeBlue($(this));
        markPwd = true;
    }else changeRed($(this));
})

$('.hsr-changePwd-btn').click(function () {
    if(markPwd){
        let data = {
            uPwd: $('input[name=password]').val()
        }
        $.ajax({
            url: pathOl + "changeUserMsg",
            type: "post",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: function (result) {
                let index = parent.layer.getFrameIndex(window.name);
                if(result){
                    parent.layer.close(index);
                    parent.loadUserMsg();
                    parent.layer.msg("用户密码修改成功");
                }else{
                    parent.layer.close(index);
                    parent.layer.msg("用户密码修改失败");
                }
            }
        });
    }
});