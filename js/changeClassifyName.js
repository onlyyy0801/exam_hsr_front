let markName = false;

$('input[name=className]').on('blur',function () {
    if($(this).val() !== ""){
        changeBlue($(this));
        markName = true;
    }else changeRed($(this));
});

$('.hsr-changeClassify').click(function () {
    var jsonStr=localStorage.getItem("changeClassify")
    var jsonObj=JSON.parse(jsonStr);
    if (markName){
        let jsonData = {
            cId: jsonObj.cId,
            cName: $('input[name=className]').val(),
            uId: jsonObj.uId
        };
        $.ajax({
            url:pathOl+'changeClassify',
            type:"post",
            data: JSON.stringify(jsonData),
            contentType: 'application/json',
            dataType: 'json',
            success:function (mark) {
                let index = parent.layer.getFrameIndex(window.name);
                if (mark){
                    parent.layer.close(index);
                    parent.reLoadClassify();
                    parent.layer.msg("修改成功！！！");
                }else {
                    parent.layer.close(index);
                    parent.layer.msg("修改失败！！！");
                }
                localStorage.removeItem("changeClassify");
            }
        });
    }
})