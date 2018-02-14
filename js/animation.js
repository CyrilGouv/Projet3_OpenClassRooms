$(function() {
    
    /* Animation Intro Section */
    $('.intro-bike').addClass('markersBike');

    setTimeout(() => {
        $('.intro-content').addClass('zoomInStart');
        $('.intro-content').removeClass('zoomIn');

    }, 500);


    /* Scroll Intro CTA to Diapo */
    $('.welcome-cta').click(function(e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $(this.hash).offset().top
        }, 500);
    })
    

    $('.control-bottom').click(function(e) {
        e.preventDefault();

        if ($(window).width() <= 768) {
            const target = document.querySelector('#rent');
            const targetTop = document.body.scrollHeight - target.scrollHeight;

            $('html, body').animate({
                scrollTop: targetTop
            }, 500);
        } else {
            $('html, body').animate({
                scrollTop: document.body.scrollHeight
            }, 500);
        }

        
    });

});