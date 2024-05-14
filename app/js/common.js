$(function() {


    // ADAPTIVE MENU

    $('.hamburger').click(function() {
        $(this).toggleClass('is-active');
        $('.main-nav').toggleClass('open');
        $('body').toggleClass('hidden');
    });

    $('.main-list a, .footer-list a').click(function() {
        $('.hamburger').removeClass('is-active');
        $('.main-nav').removeClass('open');
        $('body').removeClass('hidden');
    });


    // SLICK SLIDER INIT

    if($('.cases-slider').length) {
        $('.cases-slider').slick({
            rows: false,
            arrows: false, 
            dots: true,
            responsive: [{
                breakpoint: 767,
                settings: {

                }
            }, ]
        }) 
    }

    if($('.format-slider').length) {
        $('.format-slider').slick({
            rows: false,
            arrows: false, 
            dots: true,
            responsive: [{
                breakpoint: 767,
                settings: {

                }
            }, ]
        }) 
    }

    // IOS HEIGHT FIX

    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');

    window.addEventListener('resize', function() {
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    });

    // AOS

    // AOS.init({
    //   offset: 200,
    //   duration: 600,
    //   easing: 'ease-in-sine',
    //   delay: 100,
    //   // disable: function () {
    //   //   var maxWidth = 1024;
    //   //   return window.innerWidth < maxWidth;
    //   // }
    // });

});