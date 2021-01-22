let markAcc = false;
let markName = false;
let checkAcc = /^1[3-9]\d{9}$/;

$('input[name=account]').on('blur',function () {
    if(checkAcc.test($(this).val())){
        changeBlue($(this));
        markAcc = true;
    }else changeRed($(this));
})
$('input[name=name]').on('blur',function () {
    if($(this).val() !== ""){
        changeBlue($(this));
        markName = true;
    }else changeRed($(this));
});

$('.hsr-changeMsg-btn').click(function () {
    let JsonUserMsg = localStorage.getItem("UserMsg");
    let UserMsg = JSON.parse(JsonUserMsg);
    if(markAcc && markName){
        let data = {
            uId: UserMsg.uId,
            uAcc: $('input[name=account]').val(),
            uName: $('input[name=name]').val()
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
                    parent.layer.msg("用户信息修改成功");
                    parent.loadUserMsg(UserMsg.uId);
                }else{
                    parent.layer.close(index);
                    parent.layer.msg("用户信息修改失败");
                }
            }
        });
    }
});