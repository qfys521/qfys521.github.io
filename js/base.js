$(document).ready(function(){

    //头部语言鼠标悬停显示多语言选项
    lang();
    function lang(){
        if($(window).innerWidth()>1200){
            var lang=$(".lang");
            lang.hover(function () {
                $(this).find(".lang_son").stop(true,false).slideDown();
            },function () {
                $(this).find(".lang_son").stop(true,false).slideUp();
            });
        }
    }

    //手机端导航的js
    //导航按钮点击三横变一×
    click_nav_menu();
    function click_nav_menu() {
        $(".nav_menu").click(function () {
            //导航按钮三横变一×
            $(this).stop(true,true).toggleClass("click_nav_menu");
            //手机导航的显示隐藏
            $(".nav_xiala").stop(true,false).slideToggle();
            //手机端二级导航打开的时候，导航滚动条滚动到底后，会带动后面的身体部分的滚动条滚动，目前安卓端有bug不知怎么解决
            // $("body").toggleClass("hide_body_scrolly");
            if ($(window).scrollTop() <50) {
                var head = $(".head");
                if(head.hasClass("head_down")){
                    head.removeClass("head_down");
                    head.find(".logo img").attr("src","img/logo.png");
                }else{
                    head.addClass("head_down");
                    head.find(".logo img").attr("src","img/logo_down.png");
                }

            }
        });
    }

    //ios端让头部nav的滚动条一直显示
    nav_scroll();
    function nav_scroll() {
        var nav_box=$(".nav_box");
        var nav=$(".nav");
        if($(window).innerWidth()<1200){
            if(nav_box.innerHeight()<nav.children().length*nav.find("li").innerHeight()){
                $(".nav_scroll").css({'display':'block'})
            }
        }
        // console.log($(window).innerWidth());
        // console.log(nav_box.height());
        // console.log(nav.children().length*nav.find("li").innerHeight());
    }

    //搜索
    search();
    function search() {
        var search_btn1=$(".search_btn_1");
        var search_close=$(".search_close");
        var search_son=$(".search_son");
        //搜索放大镜点击
        search_btn1.click(function () {
            $(this).stop(true,false).toggle();
            search_close.stop(true,false).toggle();
            search_son.stop(true,false).slideToggle();
        });
        //搜索关闭按钮点击
        search_close.click(function () {
            $(this).stop(true,false).toggle();
            search_btn1.stop(true,false).toggle();
            search_son.stop(true,false).slideToggle();
        });
    }


    //头部样式变换
    scroll_head();
    function scroll_head(){
        // console.log($(window).width());
        var head = $(".head");
            $(window).scroll(function () {
                if ($(window).scrollTop() >= 50) {
                    head.addClass("head_down");
                    head.find(".logo img").attr("src","img/logo_down.png");
                } else {
                    head.removeClass("head_down");
                    head.find(".logo img").attr("src","img/logo.png")
                }
            });
    }


    
//页面base_banner下的title宽度设置
    base_banner_title();
    function base_banner_title() {
        var tab_width=$("#list_tab").width();
        $(".list_title").css('width',tab_width);
    }


// about视频点击按钮
    about_play_video();
    function about_play_video() {
        var video=$("#about_video");
        $(".about_button span").click(function () {
            video.attr("src",video.attr("data-src",));
            video.addClass("about_play");
            video.trigger('play');
        });
    }


    //列表页下面的单图图片高度设置
    list_article_img_height();
    function list_article_img_height(){
        var img=$(".info_img");
        // console.log(img.height());
        if($(window).innerWidth()>768) {
            if (img.length) {
                img.each(function () {
                    $(this).find(".info_img_box").css({'height': $(this).height()})
                })
            }
        }
    }

//    人员页面的右边高度设置
    renyuan_height();
    function renyuan_height() {
        var renyuan=$(".renyuan");
        if($(window).innerWidth()>768) {
            if (renyuan.length) {
                if(renyuan.find(".renyuan_left img").load()) {
                    // console.log(renyuan.find(".renyuan_left img").innerHeight());
                    // console.log(renyuan.find(".renyuan_right").innerHeight());
                    // renyuan.find(".renyuan_left img").innerHeight();
                    if(renyuan.find(".renyuan_left img").innerHeight()>renyuan.find(".renyuan_right").innerHeight()){
                        // var top=(renyuan.find(".renyuan_left img").innerHeight()-renyuan.find(".renyuan_right").innerHeight())/2;
                        // renyuan.find(".renyuan_right").css({'margin-top':top})
                    }else{
                        renyuan.find(".renyuan_right").css({'height':renyuan.find(".renyuan_left img").innerHeight()-renyuan.find(".renyuan_title").innerHeight()-renyuan.find(".renyuan_contact").innerHeight()})
                    }
                }
            }
        }
    }


    //图片懒加载代码
    lazy();
    function lazy(){
         start();
         $(window).on('scroll', function(){
             start()
         });
    }
    
    function start() {
        var $lazy = $('.lazy');
            //.not('[data-isLoaded]')选中已加载的图片不需要重新加载
            $lazy.not('[data-isLoaded]').each(function(){
                var $node = $(this);
                if( isShow($node) ){
                    loadImg($node);
                    $node.load(function(){
                        $node.parent().css('background','none');
                    });
                }
            })
    }

    //判断一个元素是不是出现在窗口(视野)
    function isShow($node){
        if(parseInt($node.offset().top) <= parseInt(window.innerHeight + $(window).scrollTop())){
            console.log('当前元素位置'+$node.offset().top);
            console.log('当前窗口位置'+(window.innerHeight + $(window).scrollTop()));
            console.log('当前元素在显示区域内');
            return true;
        }else{
            // console.log('当前元素位置'+$node.offset().top);
            // console.log('当前窗口位置'+(window.innerHeight + $(window).scrollTop()));
            //console.log('当前元素不在显示区域内');
            return false;
        }
    }
    //加载图片
    function loadImg($node){
        //.attr(值)
        //.attr(属性名称,值)
        $node.css({'background':'url('+$node.attr("data-src")+')'})
        $node.find(".loading").css({'display':'none'});//把data-src的值 赋值给src
        $node.attr('data-isLoaded', 1)
    }

    
//    job页面的点击
    job_click();
    function job_click() {
        var button= $(".job_button");
        button.click(function () {
            $(this).parent().find(".job_content").slideToggle();
            $(this).parent().siblings().find(".job_content").slideUp();
        })

        //
        // button.each(function () {
        //     $(this).click(function () {
        //         $(this).parents().siblings().find(".job_content").slideUp();
        //         $(this).parents().find(".job_content").slideDown();
        //     })
        // })


    }

});

