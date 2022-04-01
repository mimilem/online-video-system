$(document).ready(function () {
    /* Content appear */
    if ($('body').hasClass('content-appear')) {
        $('body').addClass('content-appearing')
        setTimeout(function () {
            $('body').removeClass('content-appear content-appearing');
        }, 800);
    }

    // $('.settings-tab').scrollbar({
    //     autoBottom: false
    // });
    var footer_h = document.querySelector('.footer').clientHeight;
    $(".scw-form").css("bottom", footer_h);
    var sitebar_height = $(".site-sidebar").innerHeight() - $("#first_sidebar").innerHeight() - $("#third_sidebar").innerHeight();

    /********Chat UI Bot height calculation *************/
    var container = document.querySelector('.site-header').clientHeight + document.querySelector('.footer').clientHeight + $(".scw-header").innerHeight() + $(".scw-form").innerHeight();
    var inner_height = document.body.clientHeight - container;


    $(window).resize(function () {
        container = document.querySelector('.site-header').clientHeight + document.querySelector('.footer').clientHeight + $(".scw-header").innerHeight() + $(".scw-form").innerHeight();
        inner_height = document.body.clientHeight - container;
        //$(".chat").css("height",inner_height);
        $(".request-container").css("height", inner_height + $(".scw-form").innerHeight());
        $(".settings-tab").css("height", document.body.clientHeight - (document.querySelector('.site-header').clientHeight + document.querySelector('.footer').clientHeight + $(".scw-header").innerHeight()) - 25);
        $(".template-options").css("height", document.body.clientHeight - (document.querySelector('.site-header').clientHeight + document.querySelector('.footer').clientHeight));

    });
    //$(".chat").css("height",inner_height);
    $(".request-container").css("height", inner_height + $(".scw-form").innerHeight());
    $(".settings-tab").css("height", document.body.clientHeight - (document.querySelector('.site-header').clientHeight + document.querySelector('.footer').clientHeight + $(".scw-header").innerHeight()) - 25);
    $(".template-options").css("height", document.body.clientHeight - (document.querySelector('.site-header').clientHeight + document.querySelector('.footer').clientHeight));

    $(".site-sidebar-third").css("height", document.body.clientHeight - (document.querySelector('.site-header').clientHeight + document.querySelector('.footer').clientHeight));
    $(".site-sidebar-fourth").css("height", document.body.clientHeight - (document.querySelector('.site-header').clientHeight + document.querySelector('.footer').clientHeight));

    /********Layout manager height calculation *************/

    var conf_container_height = document.querySelector('.site-header').clientHeight + document.querySelector('.footer').clientHeight;
    var conf_container_inner_height = document.body.clientHeight - conf_container_height;
    //console.info(document.querySelector('.site-header').clientHeight ,  document.querySelector('.footer').clientHeight, conf_container_inner_height);
    $(".confo-container").css("height", conf_container_inner_height);
    $(".watermark").css("height", conf_container_inner_height);


    $(window).resize(function () {
        conf_container_height = document.querySelector('.site-header').clientHeight + document.querySelector('.footer').clientHeight;
        conf_container_inner_height = document.body.clientHeight - conf_container_height;
        $(".confo-container").css("height", conf_container_inner_height);
        $(".watermark").css("height", conf_container_inner_height);
        $(".site-sidebar-third").css("height", document.body.clientHeight - (document.querySelector('.site-header').clientHeight + document.querySelector('.footer').clientHeight));
        $(".site-sidebar-fourth").css("height", document.body.clientHeight - (document.querySelector('.site-header').clientHeight + document.querySelector('.footer').clientHeight));
    });
   
    /* Switch sidebar to compact */
    if (matchMedia) {
        var mq = window.matchMedia("(min-width: 768px) and (max-width: 991px)");
        mq.addListener(WidthChange);
        WidthChange(mq);
    }

    /* Switch sidebar to compact */
    if (matchMedia) {
        var mq = window.matchMedia("(min-width: 768px) and (max-width: 991px)");
        mq.addListener(WidthChange);
        WidthChange(mq);
    }
    //
    function WidthChange(mq) {
        if (mq.matches) {
            $('body').addClass('compact-sidebar');
            $('.site-sidebar li.with-sub').find('>ul').slideUp();
        } else {
            $('body').removeClass('compact-sidebar');
            sidebarIfActive();
        }
    }


    /* Fullscreen */
    $('.toggle-fullscreen').click(function () {
        $(document).toggleFullScreen();
    });

    /* Sidebar - on click */
    $('.site-sidebar li.with-sub > a').click(function () {
        if (!$('body').hasClass('compact-sidebar')) {
            if ($(this).parent().hasClass('active')) {
                $(this).parent().removeClass('active');
                $(this).parent().find('>ul').slideUp();
            } else {
                if (!$(this).parent().parent().closest('.with-sub').length) {
                    $('.site-sidebar li.with-sub').removeClass('active').find('>ul').slideUp();
                }
                $(this).parent().addClass('active');
                $(this).parent().find('>ul').slideDown();
            }
        }
    });

    /* Sidebar - if active */
    function sidebarIfActive() {
        $('.site-sidebar ul > li:not(.with-sub)').removeClass('active');
        var url = window.location;
        var element = $('.site-sidebar ul > li > a').filter(function () {
            return this.href == url || url.href.indexOf(this.href) == 0;
        });
        element.parent().addClass('active');

        $('.site-sidebar li.with-sub').removeClass('active').find('>ul').hide();
        var url = window.location;
        var element = $('.site-sidebar ul li ul li a').filter(function () {
            return this.href == url || url.href.indexOf(this.href) == 0;
        });
        element.parent().addClass('active');
        element.parent().parent().parent().addClass('active');

        if (!$('body').hasClass('compact-sidebar')) {
            element.parent().parent().slideDown();
        }
    }

    sidebarIfActive();

    /* Sidebar - show and hide */
    $('.site-header .sidebar-toggle-first').click(function () {
        if ($('body').hasClass('site-sidebar-opened')) {
            $('body').removeClass('site-sidebar-opened');
            if (jQuery.browser.mobile == false) {
                $('html').css('overflow', 'auto');
            }
        } else {
            $('body').addClass('site-sidebar-opened');
            if (jQuery.browser.mobile == false) {
                $('html').css('overflow', 'hidden');
            }
        }
    });

    $('.site-header .sidebar-toggle-second').click(function () {
        var compact = 'compact-sidebar';

        if ($('body').hasClass(compact)) {
            $('body').removeClass(compact);
            sidebarIfActive();
            $("#chat_notify").html(0)
        } else {
            $('body').addClass(compact);
            $('.site-sidebar li.with-sub').find('>ul').slideUp();
            $("#chat_notify").html(0)
        }
    });
    $('.toggle-button-second').click(function () {

        var compact = 'compact-sidebar';
        if ($('.template-options').hasClass('opened')) {
            $('.template-options').removeClass('opened');
        }
        if ($('.site-sidebar-third').hasClass('opened')) {
            $('.site-sidebar-third').removeClass('opened');
        }
        if ($('.site-sidebar-fourth').hasClass('opened')) {
            $('.site-sidebar-fourth').removeClass('opened');
        }

        // $(this).toggleClass('active');
        $("#chat-tag").html(0);
        chatCount = 0;
        $('.site-sidebar-second').toggleClass('opened');
        if ($('body').hasClass(compact)) {
            $('body').removeClass(compact);
        }
    });

    $('.toggle-button-third').click(function () {

        var compact = 'compact-sidebar';
        $("#notify-number").html(0);
        if ($('.template-options').hasClass('opened')) {
            $('.template-options').removeClass('opened');
        }
        if ($('.site-sidebar-second').hasClass('opened')) {
            $('.site-sidebar-second').removeClass('opened');
        }
        if ($('.site-sidebar-fourth').hasClass('opened')) {
            $('.site-sidebar-fourth').removeClass('opened');
        }
        $('.site-sidebar-third').toggleClass('opened');
        if ($('body').hasClass(compact)) {
            $('body').removeClass(compact);
        }
    });
    $('.toggle-button-fourth').click(function () {
        var compact = 'compact-sidebar';
        if ($('.template-options').hasClass('opened')) {
            $('.template-options').removeClass('opened');
        }
        if ($('.site-sidebar-second').hasClass('opened')) {
            $('.site-sidebar-second').removeClass('opened');
        }
        if ($('.site-sidebar-third').hasClass('opened')) {
            $('.site-sidebar-third').removeClass('opened');
        }
        $('.site-sidebar-fourth').toggleClass('opened');
        if ($('body').hasClass(compact)) {
            $('body').removeClass(compact);
        }
    });
    /* Sidebar - overlay */
    $('.site-overlay').click(function () {
        $('.site-header .sidebar-toggle-first').removeClass('active');
        $('body').removeClass('site-sidebar-opened');
        if (jQuery.browser.mobile == false) {
            $('html').css('overflow', 'auto');
        }
    });

    /* Sidebar second - toggle */

    /* Template options - toggle */

    $('.to-toggle-settings').click(function () {
        getDevice(function () {
        });
        if ($('.site-sidebar-fourth').hasClass('opened')) {
            $('.site-sidebar-fourth').removeClass('opened');
        }
        if ($('.site-sidebar-second').hasClass('opened')) {
            $('.site-sidebar-second').removeClass('opened');
        }
        if ($('.site-sidebar-third').hasClass('opened')) {
            $('.site-sidebar-third').removeClass('opened');
        }
        $('.template-options').toggleClass('opened');
    });


    /* Chat */
    $('.sidebar-chat a, .sidebar-chat-window a').click(function () {
        $('.sidebar-chat').toggle();
        $('.sidebar-chat-window').toggle();
    });

    /* Template options */
    /* Hide on outside click */
    $(".container-fluid").mouseup(function (e) {
        var container = $('.template-options, .site-sidebar-second, .site-sidebar-third, .site-sidebar-fourth');

        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.removeClass('opened');
        }
        // document.querySelector('#preview-camera').style.display = "none";
    });

    /*  Tooltip */
    $('[data-toggle="tooltip"]').tooltip();

    /*  Popover */
    $('[data-toggle="popover"]').popover();

});
function updateLeftPanel() {
    var sitebar_height = $(".site-sidebar").innerHeight() - $("#first_sidebar").innerHeight() - $("#third_sidebar").innerHeight();
    if (document.getElementById("second_sidebar") !== null) {
        $('#second_sidebar').scrollbar({
            autoBottom: false
        });
        $("#second_sidebar").css("height", sitebar_height - 60);
        $(window).resize(function () {
            sitebar_height = $(".site-sidebar").innerHeight() - $("#first_sidebar").innerHeight() - $("#third_sidebar").innerHeight();
            $("#second_sidebar").css("height", sitebar_height - 60);

        });
    }

}