//======== Mobile Menu
$('.nav-icon,.overlay').click(function () {
    $('.nav-icon').toggleClass('open');
    $('body').toggleClass('open-menu');
});

//======== Auto Year update
$('#yearUpdate').html(new Date().getFullYear());

//======== Scroll Top
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
});
