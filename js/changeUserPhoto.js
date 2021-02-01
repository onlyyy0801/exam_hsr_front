var thumbnailWidth = 1;   //缩略图高度和宽度 （单位是像素），当宽高度是0~1的时候，是按照百分比计算，具体可以看api文档
var thumbnailHeight = 1;



//直接引用 上传对象   WebUploader
var uploader = WebUploader.create({

    // 选完文件后，是否自动上传。
    // auto: true,

    // swf文件路径
    swf: pathOl + '/webupload/Uploader.swf',

    // 文件接收服务端。
    server: 'http://localhost:8080/Blog_SpringMVC_Mybatis/myWebUploadServlet',

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
    console.log("hahahah")
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
// uploader.on( 'uploadProgress', function( file, percentage ) {
//     var $li = $( '#'+file.id ),
//         $percent = $li.find('.progress span');
//
//     // 避免重复创建
//     if ( !$percent.length ) {
//         $percent = $('<p class="progress"><span></span></p>')
//             .appendTo( $li )
//             .find('span');
//     }
//
//     $percent.css( 'width', percentage * 100 + '%' );
// });
//



//File  每一次上环的内容对象
//result 后端返回的数据   JSON格式
uploader.on( 'uploadSuccess', function( file ,result) {
    $( '#'+file.id ).addClass('upload-state-done');
    console.log(result);
});

function upFile(){
    uploader.upload();//实现上传
}