$('.yy-addTest-backBtn').click(function () {
    let mainBackBtn = $(this).parent().parent();
    mainBackBtn.html('');
    mainBackBtn.load("con-pages/showTest.html");
});

let topBtn = $('.yy-addTest-top>p>button');

topBtn.click(function () {
    $('.yy-addTest-top>p>button').removeAttr('id');
    $(this).attr('id','yy-addTest-topBtn-act');
    if($(this).text() === "单选题") $('.yy-addTest-mid').show();
    else if($(this).text() === "简答题") $('.yy-addTest-mid').hide();
});

$(function () {
    let jsonData = {
        mark: 'showAllClassify',
        data: ''
    };
    $.ajax({
        url: pathOl + 'classify',
        type: 'post',
        data: JSON.stringify(jsonData),
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            $('#yy-addTest-tClassify').html('');
            let len = result.result.length;
            for(let i = 0; i < len; i++){
                let option = $('<option value="'+result.result[i]+'">'+result.result[i]+'</option>')
                $('#yy-addTest-tClassify').append(option);
            }
        }
    });

    if(localStorage.getItem("mark")==="edit"){
        let tType = localStorage.getItem("tType");
        let tTopic = localStorage.getItem("tTopic");

        localStorage.setItem('mark',"");
        localStorage.setItem('tTopic',"");
        localStorage.setItem('tType',"");

        let tTypeBtns = $('.yy-addTest-top>p>button');
        tTypeBtns.attr('disabled',true);
        tTypeBtns.removeAttr('id');
        let jsonData = {
            mark: 'changeTest',
            data: {
                judge: tType,
                tTopic: tTopic
            }
        };
        $.ajax({
            url: pathOl + 'test',
            type: 'post',
            data: JSON.stringify(jsonData),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
                if(result.testAllCon.tType === 0){

                    let activeBtn = $('.yy-addTest-top>p button:nth-child(1)');
                    activeBtn.attr('id','yy-addTest-topBtn-act');
                    activeBtn.attr('mark','change');

                    $('.yy-addTest-mid').show();

                    $('#yy-addTest-tTopic').val(result.testAllCon.tTopic);
                    $('#yy-addTest-choiceA').val(result.optionAllCon.oA);
                    $('#yy-addTest-choiceB').val(result.optionAllCon.oB);
                    $('#yy-addTest-choiceC').val(result.optionAllCon.oC);
                    $('#yy-addTest-choiceD').val(result.optionAllCon.oD);
                    $('#yy-addTest-answer').val(result.testAllCon.tAnswer);
                    $('#yy-addTest-tScore').val(result.testAllCon.tScore);
                    $('#yy-addTest-tClassify').val(result.testAllCon.tClassify);

                    localStorage.setItem('mark',"needSubmitSingle");

                }else if(result.testAllCon.tType === 1){

                    let activeBtn = $('.yy-addTest-top>p button:nth-child(2)');
                    activeBtn.attr('id','yy-addTest-topBtn-act');
                    activeBtn.attr('mark','change');

                    $('.yy-addTest-mid').hide();

                    $('#yy-addTest-tTopic').val(result.testAllCon.tTopic);
                    $('#yy-addTest-answer').val(result.testAllCon.tAnswer);
                    $('#yy-addTest-tScore').val(result.testAllCon.tScore);
                    $('#yy-addTest-tClassify').val(result.testAllCon.tClassify);

                    localStorage.setItem('mark',"needSubmitQuest");
                }
            }
        });
    }

});

$('#yy-addTest-submit').click(function () {
    if(localStorage.getItem('mark') === "needSubmit"){
        localStorage.setItem('mark',"");
        let tType = $('#yy-addTest-topBtn-act').val();
        if(tType === "0") {
            let jsonData = {
                mark: 'insertSingle',
                data: {
                    tType: tType,
                    tTopic: $('#yy-addTest-tTopic').val(),
                    choiceA: $('#yy-addTest-choiceA').val(),
                    choiceB: $('#yy-addTest-choiceB').val(),
                    choiceC: $('#yy-addTest-choiceC').val(),
                    choiceD: $('#yy-addTest-choiceD').val(),
                    tAnswer: $('#yy-addTest-answer').val(),
                    tScore: $('#yy-addTest-tScore').val(),
                    tClassify: $('#yy-addTest-tClassify').val()
                }
            }
            $.ajax({
                url: pathOl + 'test',
                type: 'post',
                data: JSON.stringify(jsonData),
                contentType: 'application/json',
                dataType: 'json',
                success: function (result){
                    if(result.result) {
                        $('#yy-addTest-tTopic').val('');
                        $('#yy-addTest-choiceA').val('');
                        $('#yy-addTest-choiceB').val('');
                        $('#yy-addTest-choiceC').val('');
                        $('#yy-addTest-choiceD').val('');
                        $('#yy-addTest-answer').val('');
                        $('#yy-addTest-tScore').val('');
                        alert("添加成功！");
                    }
                }
            });
        }else if(tType === "1"){
            let jsonData = {
                mark: 'insertQuest',
                data: {
                    tType: tType,
                    tTopic: $('#yy-addTest-tTopic').val(),
                    tAnswer: $('#yy-addTest-answer').val(),
                    tScore: $('#yy-addTest-tScore').val(),
                    tClassify: $('#yy-addTest-tClassify').val()
                }
            }
            $.ajax({
                url: pathOl + 'test',
                type: 'post',
                data: JSON.stringify(jsonData),
                contentType: 'application/json',
                dataType: 'json',
                success: function (result){
                    if(result.result) {
                        $('#yy-addTest-tTopic').val('');
                        $('#yy-addTest-answer').val('');
                        $('#yy-addTest-tScore').val('');
                        alert("添加成功！");
                    }
                }
            });
        }
    }else if(localStorage.getItem('mark') === "needSubmitSingle"){
        localStorage.setItem('mark',"");
        let jsonData = {
            mark: 'updateSingle',
            data: {
                tTopic: $('#yy-addTest-tTopic').val(),
                choiceA: $('#yy-addTest-choiceA').val(),
                choiceB: $('#yy-addTest-choiceB').val(),
                choiceC: $('#yy-addTest-choiceC').val(),
                choiceD: $('#yy-addTest-choiceD').val(),
                tAnswer: $('#yy-addTest-answer').val(),
                tScore: $('#yy-addTest-tScore').val(),
                tClassify: $('#yy-addTest-tClassify').val()
            }
        };
        $.ajax({
            url: pathOl + 'test',
            type: 'post',
            data: JSON.stringify(jsonData),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result){
                if(result.result) {
                    $('#yy-addTest-tTopic').val('');
                    $('#yy-addTest-choiceA').val('');
                    $('#yy-addTest-choiceB').val('');
                    $('#yy-addTest-choiceC').val('');
                    $('#yy-addTest-choiceD').val('');
                    $('#yy-addTest-answer').val('');
                    $('#yy-addTest-tScore').val('');
                    alert("修改成功！");
                }
            }
        });


    }else if(localStorage.getItem('mark') === "needSubmitQuest"){
        localStorage.setItem('mark',"");
        let jsonData = {
            mark: 'updateQuest',
            data: {
                tTopic: $('#yy-addTest-tTopic').val(),
                tAnswer: $('#yy-addTest-answer').val(),
                tScore: $('#yy-addTest-tScore').val(),
                tClassify: $('#yy-addTest-tClassify').val()
            }
        };
        $.ajax({
            url: pathOl + 'test',
            type: 'post',
            data: JSON.stringify(jsonData),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result){
                if(result.result) {
                    $('#yy-addTest-tTopic').val('');
                    $('#yy-addTest-choiceA').val('');
                    $('#yy-addTest-choiceB').val('');
                    $('#yy-addTest-choiceC').val('');
                    $('#yy-addTest-choiceD').val('');
                    $('#yy-addTest-answer').val('');
                    $('#yy-addTest-tScore').val('');
                    alert("修改成功！");
                }
            }
        });

    }



});