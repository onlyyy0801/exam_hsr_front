
let mainClassify = $('.yy-con-main');

$('#yy-classify-addBtn').click(function () {
    let jsonData = {
        mark: "insertClassify",
        data: $(this).prev().val()
    };
    $.ajax({
        url: pathOl + 'classify',
        type: 'post',
        data: JSON.stringify(jsonData),
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            if(result.result) {
                mainClassify.html('');
                mainClassify.load('con-pages/classifyManagement.html');
            }
        }
    });

})


$(function () {
    let jsonData = {
        mark: "showAllClassify",
        data: ""
    };
    $.ajax({
        url: pathOl + 'classify',
        type: 'post',
        data: JSON.stringify(jsonData),
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            let len = result.result.length;
            for(let i = 0; i < len; i++){
                let tr = $('<tr>');
                let tdCheckbox = $('<td><input type="checkbox"></td>');
                let tdCID = $('<td>'+(i+1)+'</td>');
                let tdCName = $('<td><span>'+result.result[i]+'</span><input value='+result.result[i]+'></td>');
                let tdBtn = $('<td class="yy-classify-tdBtn"><button class="yy-classify-delBtn">删除</button><button class="yy-classify-changeBtn">编辑</button></td>');
                tdCName.children('input').hide();
                tr.append(tdCheckbox);
                tr.append(tdCID);
                tr.append(tdCName);
                tr.append(tdBtn);

                $('#yy-classify-table').append(tr);
            }
            $('.yy-classify-delBtn').click(function () {
                let cName = $(this).parent().prev().children('span').text();
                let jsonData = {
                    mark: "deleteClassify",
                    data: cName
                };
                $.ajax({
                    url: pathOl + 'classify',
                    type: 'post',
                    data: JSON.stringify(jsonData),
                    contentType: 'application/json',
                    dataType: 'json',
                    success: function (result) {
                        if(result.result) {
                            mainClassify.html('');
                            mainClassify.load('con-pages/classifyManagement.html');
                        }
                    }
                });

            });
            $('.yy-classify-changeBtn').click(function () {
                switch ($(this).text()){
                    case "编辑":
                        $(this).parent().prev().children('span').hide();
                        $(this).parent().prev().children('input').show();
                        $(this).text('确认');
                        break;
                    case "确认":
                        let cNameOld = $(this).parent().prev().children('span').text();
                        let cNameNew = $(this).parent().prev().children('input').val();
                        $(this).parent().prev().children('span').show();
                        $(this).parent().prev().children('input').hide();
                        $(this).text('编辑');

                        let jsonData = {
                            mark: "changeClassify",
                            data: {
                                cNameOld: cNameOld,
                                cNameNew: cNameNew
                            }
                        };
                        $.ajax({
                            url: pathOl + 'classify',
                            type: 'post',
                            data: JSON.stringify(jsonData),
                            contentType: 'application/json',
                            dataType: 'json',
                            success: function (result) {
                                if(result.result) {
                                    mainClassify.html('');
                                    mainClassify.load('con-pages/classifyManagement.html');
                                }
                            }
                        });
                        break;
                }
            });
        }
    });
})


