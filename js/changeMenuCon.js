$('.hsr-changeMenuCon-btn').click(function () {
    let data = {
        mId: $('input[name=mId]').val(),
        mCon: $('input[name=mCon]').val()
    }
    $.ajax({
        url: pathOl + "changeMenuCon",
        data: JSON.stringify(data),
        type: "post",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            let index = parent.layer.getFrameIndex(window.name);
            if(result){
                parent.layer.close(index);
                parent.layer.msg("菜单内容修改成功");
            }else{
                parent.layer.close(index);
                parent.layer.msg("菜单内容修改失败");
            }
            parent.reloadMenuList();
        }
    });
});