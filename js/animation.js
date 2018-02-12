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
    
});