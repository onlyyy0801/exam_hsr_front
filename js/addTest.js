//返回点击事件
$('.yy-addTest-backBtn').on("click",function () {
    let index=parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
});
let topBtn = $('.yy-addTest-top>p>button');
let jsonStr=localStorage.getItem("UserMsg")
let jsonObj=JSON.parse(jsonStr);

//单选按钮和简答题按钮切换
topBtn.click(function () {
    $('.yy-addTest-top>p>button').removeAttr('id');
    $(this).attr('id','yy-addTest-topBtn-act');
    if($(this).text() === "单选题") $('.yy-addTest-mid').show();
    else if($(this).text() === "简答题") $('.yy-addTest-mid').hide();
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
            $('#yy-addTest-tClassify').html('');
            let len = result.length;
            for(let i = 0; i < len; i++){
                let option = $('<option value="'+result[i].cId+'">'+result[i].cName+'</option>')
                $('#yy-addTest-tClassify').append(option);
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

        let tTypeBtns = $('.yy-addTest-top>p>button');
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

                    let activeBtn = $('.yy-addTest-top>p button:nth-child(1)');
                    activeBtn.attr('id','yy-addTest-topBtn-act');
                    activeBtn.attr('mark','change');

                    $('.yy-addTest-mid').show();

                    $('#yy-addTest-tTopic').val(result.tTopic);
                    $('#yy-addTest-choiceA').val(result.oA);
                    $('#yy-addTest-choiceB').val(result.oB);
                    $('#yy-addTest-choiceC').val(result.oC);
                    $('#yy-addTest-choiceD').val(result.oD);
                    $('#yy-addTest-answer').val(result.tAnswer);
                    $('#yy-addTest-tScore').val(result.tScore);
                    $('#yy-addTest-tClassify').val(result.cId);

                    localStorage.setItem('mark',"needSubmitSingle");

                    if (localStorage.getItem('showMark')==='show'){
                        localStorage.removeItem('showMark');
                        //设置内容为只可读
                        $('#yy-addTest-tTopic').attr("disabled","disabled");
                        $('#yy-addTest-choiceA').attr("disabled","disabled");
                        $('#yy-addTest-choiceB').attr("disabled","disabled");
                        $('#yy-addTest-choiceC').attr("disabled","disabled");
                        $('#yy-addTest-choiceD').attr("disabled","disabled");
                        $('#yy-addTest-answer').attr("disabled","disabled");
                        $('#yy-addTest-tScore').attr("readonly","readonly");
                        $('#yy-addTest-tClassify').attr("disabled","disabled");
                        $("#yy-addTest-submit").hide();
                    }

                }else if(result.tType === 1){


                    let activeBtn = $('.yy-addTest-top>p button:nth-child(2)');
                    activeBtn.attr('id','yy-addTest-topBtn-act');
                    activeBtn.attr('mark','change');

                    $('.yy-addTest-mid').hide();

                    $('#yy-addTest-tTopic').val(result.tTopic);
                    $('#yy-addTest-answer').val(result.tAnswer);
                    $('#yy-addTest-tScore').val(result.tScore);
                    $('#yy-addTest-tClassify').val(result.cId);

                    localStorage.setItem('mark',"needSubmitQuest");

                    if (localStorage.getItem('showMark')==='show'){
                        localStorage.removeItem('showMark');
                        $('#yy-addTest-tTopic').attr("disabled","disabled");
                        $('#yy-addTest-answer').attr("disabled","disabled");
                        $('#yy-addTest-tScore').attr("readonly","readonly");
                        $('#yy-addTest-tClassify').attr("disabled","disabled");
                        $("#yy-addTest-submit").hide();
                    }
                }
            }
        });
    }

});

//提交的点击事件
$('#yy-addTest-submit').click(function () {
    if(localStorage.getItem('mark') === "needSubmit"){      //添加试题的提交
        localStorage.setItem('mark',"");
        let jsonData = {
            tType: $('#yy-addTest-topBtn-act').val(),
            tTopic: $('#yy-addTest-tTopic').val(),
            cId: $('#yy-addTest-tClassify').val(),
            uId:jsonObj.uId,
            oA: $('#yy-addTest-choiceA').val(),
            oB: $('#yy-addTest-choiceB').val(),
            oC: $('#yy-addTest-choiceC').val(),
            oD: $('#yy-addTest-choiceD').val(),
            tAnswer: $('#yy-addTest-answer').val(),
            tScore: $('#yy-addTest-tScore').val()
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
                    $('#yy-addTest-tTopic').val('');
                    $('#yy-addTest-choiceA').val('');
                    $('#yy-addTest-choiceB').val('');
                    $('#yy-addTest-choiceC').val('');
                    $('#yy-addTest-choiceD').val('');
                    $('#yy-addTest-answer').val('');
                    $('#yy-addTest-tScore').val('');
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
            tTopic: $('#yy-addTest-tTopic').val(),
            tType: $('#yy-addTest-topBtn-act').val(),
            oA: $('#yy-addTest-choiceA').val(),
            oB: $('#yy-addTest-choiceB').val(),
            oC: $('#yy-addTest-choiceC').val(),
            oD: $('#yy-addTest-choiceD').val(),
            tAnswer: $('#yy-addTest-answer').val(),
            tScore: $('#yy-addTest-tScore').val(),
            cId: $('#yy-addTest-tClassify').val()
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
                    $('#yy-addTest-tTopic').val('');
                    $('#yy-addTest-choiceA').val('');
                    $('#yy-addTest-choiceB').val('');
                    $('#yy-addTest-choiceC').val('');
                    $('#yy-addTest-choiceD').val('');
                    $('#yy-addTest-answer').val('');
                    $('#yy-addTest-tScore').val('');
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