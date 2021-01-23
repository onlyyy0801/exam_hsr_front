//返回点击事件
$('.hsr-addTest-backBtn').on("click",function () {
    let index=parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
});
let topBtn = $('.hsr-addTest-top>p>button');
let jsonStr=localStorage.getItem("UserMsg")
let jsonObj=JSON.parse(jsonStr);

//单选按钮和简答题按钮切换
topBtn.click(function () {
    $('.hsr-addTest-top>p>button').removeAttr('id');
    $(this).attr('id','hsr-addTest-topBtn-act');
    if($(this).text() === "单选题") $('.hsr-addTest-mid').show();
    else if($(this).text() === "简答题") $('.hsr-addTest-mid').hide();
});

$(function () {
    //添加试题分类中的内容
    let jsonData = {
        uId: jsonObj.uId
    };
    $.ajax({
        url: pathOl + 'showClassifyList',
        type: 'post',
        data: JSON.stringify(jsonData),
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            $('#hsr-addTest-tClassify').html('');
            let len = result.length;
            for(let i = 0; i < len; i++){
                let option = $('<option value="'+result[i].cId+'">'+result[i].cName+'</option>')
                $('#hsr-addTest-tClassify').append(option);
            }
        }
    });

    //进入该界面为修改时
    if(localStorage.getItem("mark")==="edit"){
        let tId = localStorage.getItem("tId");
        // let tTopic = localStorage.getItem("tTopic");

        localStorage.setItem('mark',"");
        // localStorage.setItem('tTopic',"");
        localStorage.setItem('tType',"");

        let tTypeBtns = $('.hsr-addTest-top>p>button');
        tTypeBtns.attr('disabled',true);
        tTypeBtns.removeAttr('id');
        let jsonData = {
            tId:tId,
            uId: jsonObj.uId
        };
        $.ajax({
            url: pathOl + 'showTestById',
            type: 'post',
            data: JSON.stringify(jsonData),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
                if(result.tType === 0){

                    let activeBtn = $('.hsr-addTest-top>p button:nth-child(1)');
                    activeBtn.attr('id','hsr-addTest-topBtn-act');
                    activeBtn.attr('mark','change');

                    $('.hsr-addTest-mid').show();

                    $('#hsr-addTest-tTopic').val(result.tTopic);
                    $('#hsr-addTest-choiceA').val(result.oA);
                    $('#hsr-addTest-choiceB').val(result.oB);
                    $('#hsr-addTest-choiceC').val(result.oC);
                    $('#hsr-addTest-choiceD').val(result.oD);
                    $('#hsr-addTest-answer').val(result.tAnswer);
                    $('#hsr-addTest-tScore').val(result.tScore);
                    $('#hsr-addTest-tClassify').val(result.cId);

                    localStorage.setItem('mark',"needSubmitSingle");

                    if (localStorage.getItem('showMark')==='show'){
                        localStorage.removeItem('showMark');
                        //设置内容为只可读
                        $('#hsr-addTest-tTopic').attr("disabled","disabled");
                        $('#hsr-addTest-choiceA').attr("disabled","disabled");
                        $('#hsr-addTest-choiceB').attr("disabled","disabled");
                        $('#hsr-addTest-choiceC').attr("disabled","disabled");
                        $('#hsr-addTest-choiceD').attr("disabled","disabled");
                        $('#hsr-addTest-answer').attr("disabled","disabled");
                        $('#hsr-addTest-tScore').attr("readonly","readonly");
                        $('#hsr-addTest-tClassify').attr("disabled","disabled");
                        $("#hsr-addTest-submit").hide();
                    }

                }else if(result.tType === 1){


                    let activeBtn = $('.hsr-addTest-top>p button:nth-child(2)');
                    activeBtn.attr('id','hsr-addTest-topBtn-act');
                    activeBtn.attr('mark','change');

                    $('.hsr-addTest-mid').hide();

                    $('#hsr-addTest-tTopic').val(result.tTopic);
                    $('#hsr-addTest-answer').val(result.tAnswer);
                    $('#hsr-addTest-tScore').val(result.tScore);
                    $('#hsr-addTest-tClassify').val(result.cId);

                    localStorage.setItem('mark',"needSubmitQuest");

                    if (localStorage.getItem('showMark')==='show'){
                        localStorage.removeItem('showMark');
                        $('#hsr-addTest-tTopic').attr("disabled","disabled");
                        $('#hsr-addTest-answer').attr("disabled","disabled");
                        $('#hsr-addTest-tScore').attr("readonly","readonly");
                        $('#hsr-addTest-tClassify').attr("disabled","disabled");
                        $("#hsr-addTest-submit").hide();
                    }
                }
            }
        });
    }

});

//提交的点击事件
$('#hsr-addTest-submit').click(function () {
    if(localStorage.getItem('mark') === "needSubmit"){      //添加试题的提交
        localStorage.setItem('mark',"");
        let jsonData = {
            tType: $('#hsr-addTest-topBtn-act').val(),
            tTopic: $('#hsr-addTest-tTopic').val(),
            cId: $('#hsr-addTest-tClassify').val(),
            uId:jsonObj.uId,
            oA: $('#hsr-addTest-choiceA').val(),
            oB: $('#hsr-addTest-choiceB').val(),
            oC: $('#hsr-addTest-choiceC').val(),
            oD: $('#hsr-addTest-choiceD').val(),
            tAnswer: $('#hsr-addTest-answer').val(),
            tScore: $('#hsr-addTest-tScore').val()
        }
        $.ajax({
            url: pathOl + 'addTest',
            type: 'post',
            data: JSON.stringify(jsonData),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result){
                let index=parent.layer.getFrameIndex(window.name);
                if(result) {
                    $('#hsr-addTest-tTopic').val('');
                    $('#hsr-addTest-choiceA').val('');
                    $('#hsr-addTest-choiceB').val('');
                    $('#hsr-addTest-choiceC').val('');
                    $('#hsr-addTest-choiceD').val('');
                    $('#hsr-addTest-answer').val('');
                    $('#hsr-addTest-tScore').val('');
                    parent.layer.close(index);
                    parent.reLoadTest();
                    //msg 消息框
                    parent.layer.msg("添加成功！")
                }else{
                    parent.layer.close(index);
                    parent.layer.msg("添加失败！！！")
                }
            }
        });
    }else {      //修改的提交
        localStorage.setItem('mark',"");
        let jsonData = {
            tId:localStorage.getItem("tId"),
            tTopic: $('#hsr-addTest-tTopic').val(),
            tType: $('#hsr-addTest-topBtn-act').val(),
            oA: $('#hsr-addTest-choiceA').val(),
            oB: $('#hsr-addTest-choiceB').val(),
            oC: $('#hsr-addTest-choiceC').val(),
            oD: $('#hsr-addTest-choiceD').val(),
            tAnswer: $('#hsr-addTest-answer').val(),
            tScore: $('#hsr-addTest-tScore').val(),
            cId: $('#hsr-addTest-tClassify').val()
        };
        $.ajax({
            url: pathOl + 'changeTest',
            type: 'post',
            data: JSON.stringify(jsonData),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result){
                let index=parent.layer.getFrameIndex(window.name);
                if(result) {
                    $('#hsr-addTest-tTopic').val('');
                    $('#hsr-addTest-choiceA').val('');
                    $('#hsr-addTest-choiceB').val('');
                    $('#hsr-addTest-choiceC').val('');
                    $('#hsr-addTest-choiceD').val('');
                    $('#hsr-addTest-answer').val('');
                    $('#hsr-addTest-tScore').val('');
                    parent.layer.close(index);
                    parent.reLoadTest();
                    //msg 消息框
                    parent.layer.msg("修改成功！");
                }else {
                    parent.layer.close(index);
                    //msg 消息框
                    parent.layer.msg("修改失败！");
                }
            }
        });


    }



});