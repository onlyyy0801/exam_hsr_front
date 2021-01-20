$(function () {
    /**
     * 侧边栏部分-菜单下拉动画
     */
    let mainCon = $('.yy-con-main');
    mainCon.load('con-pages/indexCon.html');

    $('.yy-side-main>li').click(function () {
        $(this).next('ul').slideToggle();
        $('.yy-side-menu').not($(this).next('ul')).slideUp();
        $('.yy-title-one a').text($(this).children().children().text());
        $('.yy-title-two a').text('');
    });

    $('.yy-side-menu>li').click(function () {
        $('.yy-title-one a').text($(this).parent('ul.yy-side-menu').prev().children('a').innerText);
        $('.yy-title-two a').text($(this).children('a').text());
    });

    $('.yy-head-title').click(function () {
        mainCon.html('');
        mainCon.load('con-pages/indexCon.html');
    });

    $('.yy-con-showIndexCon').click(function () {
        mainCon.html('');
        mainCon.load('con-pages/indexCon.html');
    });

    $('.yy-con-showClassify').click(function () {
        mainCon.html('');
        mainCon.load('con-pages/classify.html');

    });

    $('.yy-con-showTest').click(function () {
        mainCon.html('');
        mainCon.load('con-pages/showTest.html');
    });

    $('.yy-con-showPaper').click(function () {
        mainCon.html('');
        mainCon.load("con-pages/showPaper.html");
    });
})