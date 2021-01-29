let cName = $('#candidateName');
let phone = $('#account');
let pCode = $('#paperCode');
let examStart = $('#examStart');
let markPhone = false;
let markCname = false;
let markPcode = false;

let checkPhone = /^1[3-9]\d{9}$/;

phone.on('blur',function () {
    if(checkPhone.test(phone.val())){
        changeBlue(phone);
        markPhone = true;
    } else changeRed(phone);
});
cName.on('blur',function () {
    console.log(cName.val().length);
    if(cName.val().length ===2 || cName.val().length ===3) {
        changeBlue(cName);
        markCname = true;
    } else changeRed(cName);
});
pCode.on('blur',function () {
    if(pCode.val().length === 6) {
        changeBlue(pCode);
        markPcode = true;
    } else changeRed(pCode);
});

examStart.on('click',function () {

    if(markPhone && markCname && markPcode){
        let data = {
            rPhone: phone.val(),
            rName: cName.val(),
            pCode: pCode.val()
        };
        $.ajax({
            url: pathOl + 'addRecord',
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
                if(result.rId == null || result.rName == null || result.rPhone == null || result.pCode == null ) {
                    alert("失败");
                    phone.val('');
                    cName.val('');
                    pCode.val('');
                }
                else  {
                    localStorage.setItem("CandidateMsg", JSON.stringify(result));
                    //打开 弹出层
                    layer.open({
                        type:2,//可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
                        title:'添加试题',
                        maxmin:false,
                        shadeClose:false,
                        area:['30%','45%'],//弹出层的宽高
                        content:'beforeExam.html',//设置弹出层打开的页面
                        closeBtn: 0,          //没有关闭按钮X
                        end: function () {
                            window.location.href = "exam.html";
                        }
                        //弹出层页面成功打开后，的设置       加载子页面 渲染子页面 load后端数据 弹出 success 展示成功
                        // success:function(layero,index){
                        //     //当前是表格页面     修改是表格的子页面   父页面JS代码中将数据传递给子页面中
                        //     //获取子页面HTML对象  固定方法
                        //     //js  dom对象
                        //     let childBody= layer.getChildFrame('body',index);
                        //     //获取子页面JS对象
                        // }
                    });
                }
            }
        });
    }
});
