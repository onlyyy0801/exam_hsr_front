
$('#yy-test-addBtn').click(function () {
    let mainAddTestCon = $(this).parent().parent().parent();
    mainAddTestCon.html('');
    mainAddTestCon.load("con-pages/addTest.html");
    localStorage.setItem('mark',"needSubmit");
});

$(function () {
    let jsonData = {
        mark: 'showAllTest',
        data: ''
    }
   $.ajax({
       url: pathOl + 'test',
       type: 'post',
       data: JSON.stringify(jsonData),
       contentType: 'application/json',
       dataType: 'json',
       success: function (result) {
            let len = result.result.length;
            for(let i = 0; i < len; i++){
                let tType = result.result[i].tType;
                let tTypeName;
                if(tType === 0) tTypeName = "单选题";
                else if(tType === 1) tTypeName = "简答题";
                let tClassify = result.result[i].tClassify;
                let tTopic = result.result[i].tTopic;
                let createTime = result.result[i].createTime;

                let tr = $('<tr>');
                let tdCheckbox = $('<td><input type="checkbox"></td>');
                let tdNum = (i+1 < 10) ? "0" + (i+1) : i;
                let tdCID = $('<td>'+tdNum+'</td>');
                let tdTType = $('<td yy-type="'+tType+'">'+tTypeName+'</td>');
                let tdTClassify = $('<td>'+tClassify+'</td>');
                let tdTTopic = $('<td><a>'+tTopic+'</a></td>');
                let tdCreateTime = $('<td>'+createTime+'</td>');

                let tdBtn = $('<td><button class="yy-test-delBtn">删除</button><button class="yy-test-changeBtn">编辑</button></td>');

                tr.append(tdCheckbox);
                tr.append(tdCID);
                tr.append(tdTType);
                tr.append(tdTClassify);
                tr.append(tdTTopic);
                tr.append(tdCreateTime);
                tr.append(tdBtn);

                $('#yy-test-table').append(tr);
            }
           $('.yy-test-delBtn').click(function () {

           });

           $('.yy-test-changeBtn').click(function () {
               let tTopic = $(this).parent().prev().prev().children('a').text();
               let tType =$(this).parent().prev().prev().prev().prev().text();
               console.log(tType);
               localStorage.setItem('mark',"edit");
               localStorage.setItem('tTopic',tTopic);
               localStorage.setItem('tType',tType);

               let mainShowTest = $(this).parent().parent().parent().parent().parent().parent().parent();
               mainShowTest.html('');
               mainShowTest.load('con-pages/addTest.html');
               // fillCon(tTopic,tType);
           });
       }

   });
});