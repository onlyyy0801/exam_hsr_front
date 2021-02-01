let UserMsgJson = localStorage.getItem("UserMsg")
let UserMsg = JSON.parse(UserMsgJson);

var thumbnailWidth = 1;   //缩略图高度和宽度 （单位是像素），当宽高度是0~1的时候，是按照百分比计算，具体可以看api文档
var thumbnailHeight = 1;



//直接引用 上传对象   WebUploader
var uploader = WebUploader.create({

    // 选完文件后，是否自动上传。
    // auto: true,

    // swf文件路径
    // swf: 'http://www.colayy.top:8082/exam_hsr_front/js/tools/Uploader.swf',
    swf: 'http://localhost:63342/exam_hsr_front/js/tools/Uploader.swf',

    // 文件接收服务端。
    server: pathOl + 'upUserPhoto',

    // 选择文件的按钮。可选。
    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    pick: '#filePicker',

    // 只允许选择图片文件。
    accept: {
        title: 'Images',
        extensions: 'gif,jpg,jpeg,bmp,png',
        mimeTypes: 'image/*'
    }
});
//
// // 当有文件添加进来的时候  文件队列
uploader.on( 'fileQueued', function( file ) {
    $list=$("#thelist");
    var $li = $(
        '<div id="' + file.id + '" class="file-item thumbnail">' +
        '<img>' +
        '<div class="info">' + file.name + '</div>' +
        '</div>'
        ),
        $img = $li.find('img');


    // $list为容器jQuery实例
    $list.append( $li );

    // 创建缩略图
    // 如果为非图片文件，可以不用调用此方法。
    // thumbnailWidth x thumbnailHeight 为 100 x 100
    uploader.makeThumb( file, function( error, src ) {
        if ( error ) {
            $img.replaceWith('<span>不能预览</span>');
            return;
        }

        $img.attr( 'src', src );
    }, thumbnailWidth, thumbnailHeight );
});



//File  每一次上环的内容对象
//result 后端返回的数据   JSON格式
uploader.on( 'uploadSuccess', function( file ,result) {
    $( '#'+file.id ).addClass('upload-state-done');
    console.log(result.uPhoto);
    let data = {
        uId: UserMsg.uId,
        uPhoto: result.uPhoto
    }
    $.ajax({
        url: pathOl + "changeUserPhoto",
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
            parent.loadUserMsg(UserMsg.uId);
        }
    });
});


uploader.on( 'uploadError', function( file ) {
    $( '#'+file.id ).find('p.state').text('上传出错');
});

uploader.on( 'uploadComplete', function( file ) {
    $( '#'+file.id ).find('.progress').fadeOut();
});

$('.btn').click(function () {
    upFile();
});

function upFile(){
    uploader.upload();//实现上传
}