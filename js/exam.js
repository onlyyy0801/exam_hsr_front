let testNumber = 0;
let jsonStr=localStorage.getItem("ExamPaperTest");
let jsonObj=JSON.parse(jsonStr);

// let intDiff = parseInt(localStorage.getItem("PaperTime"));//倒计时总秒数量
let intDiff = parseInt(1800);//倒计时总秒数量

$(function(){
    showThisTest();
    timer(intDiff);
});

//显示单选内容
function showRadio(test) {
    $("#hsr-examTest-shortAnswer").hide();
    $(".hsr-examTest-mid").show();
    $("#hsr-examTest-radioAnswer").show();
    $("#hsr-examTest-title").text(test.tTopic);
    $("#hsr-examTest-optionA").text(test.oA);
    $("#hsr-examTest-optionB").text(test.oB);
    $("#hsr-examTest-optionC").text(test.oC);
    $("#hsr-examTest-optionD").text(test.oD);
    for (i=0;i<4;i++){
        if ($("input[name='radi']").eq(i).val()===jsonObj[testNumber].tAnswer){
            $("input[name='radi']").eq(i).get(0).checked=true;
        }
    }
}

//显示简答内容
function showShort(test) {
    $("#hsr-examTest-shortAnswer").show();
    $(".hsr-examTest-mid").hide();
    $("#hsr-examTest-radioAnswer").hide();
    $("#hsr-examTest-title").text(test.tTopic);
    $("#hsr-examTest-shortAnswer").val(jsonObj[testNumber].tAnswer);
}

//记录答案
function getAnswer(){
    if (jsonObj[testNumber].tType===0){
        for (i=0;i<4;i++){
            if ($("input[name='radi']").eq(i).get(0).checked===true){
                jsonObj[testNumber].tAnswer=$("input[name='radi']").eq(i).val();
            }
        }
    }else if (jsonObj[testNumber].tType===1){
        jsonObj[testNumber].tAnswer=$("#hsr-examTest-shortAnswer").val();
    }
}

//上一题按钮
$("#upTest").on('click',function () {
    if (testNumber>0){
        getAnswer();
        testNumber--;
        showThisTest();
    }if (testNumber===(jsonObj.length()-1)){
        getAnswer();
        testNumber--;
        $("#tijiao").text("下一题")
        $("#tijiao").attr("id","downTest");
        showThisTest();
    }else alert("已经到头了")
})

//下一题按钮
$("#downTest").on('click',function () {
    if (testNumber<(jsonObj.length()-1)){
        getAnswer();
        testNumber++;
        showThisTest();
    }if (testNumber===(jsonObj.length()-1)){
        alert("已经是最后一体，确认无误即可提交")
        $("#downTest").text("提交")
        $("#downTest").attr("id","tijiao");
    }
})

//渲染试题
function showThisTest() {
    let jsonData = {
        tId: jsonObj[testNumber].tId
    };
    $.ajax({
        url: pathOl + 'showTestById',
        type: 'post',
        data: JSON.stringify(jsonData),
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            if (result.tType===0){
                showRadio(result);
            }if (result.tType===1){
                showShort(result);
            }
        }
    });
}

//提交试卷
$("#tijiao").on("click",function () {
    let jsonData = jsonObj;
    $.ajax({
        url: pathOl + 'showTestById',
        type: 'post',
        data: JSON.stringify(jsonData),
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
           alert("成绩"+result);
            window.location.href="candidate.html";
        }
    });
})


function timer(intDiff){
    window.setInterval(function(){
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        $('#day_show').html(day+"天");
        $('#hour_show').html('<s id="h"></s>'+hour+'时');
        $('#minute_show').html('<s></s>'+minute+'分');
        $('#second_show').html('<s></s>'+second+'秒');
        intDiff--;

        if(intDiff==-1){                 //这里为什么是-1，而不是0。是因为alert（）弹框需要一秒时间，如果==0的话，倒计时到01时就弹框，==-1时倒计时为00时弹框
            alert("时间到了");
            window.location.href="candidate.html";
        }
    }, 1000);

}