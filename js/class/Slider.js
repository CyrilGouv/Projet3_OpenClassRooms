class Slider {
    constructor() {
        // All slides
        this.slides = document.querySelectorAll('.diapo-content-slide');

        // Controllers
        this.left = document.querySelector('.control-left');
        this.right = document.querySelector('.control-right');

        // Current Slide
        this.current = 0;
    }

    // Hide all slides
    reset() {
        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].style.display = 'none';
        }
    }

    // Initialize
    init() {
        this.reset();
        this.slides[0].style.display = 'block';
        this.leftClick();
        this.rightClick();
        this.keyEvent();
    }

    // Move the slider to the left
    moveLeft() {
        if (this.current === 0) {
            this.current = this.slides.length;
        }

        this.reset();
        this.slides[this.current - 1].style.display = 'block';
        this.current--;
    }

    // Move the slider to the right
    moveRight() {
        if (this.current === this.slides.length - 1) {
            this.current = -1;    
        }

        this.reset();
        this.slides[this.current + 1].style.display = 'block';
        this.current++;
    }

    // Click Left Event
    leftClick() {
        this.left.addEventListener('click', (e) => {
            e.preventDefault();
            
            this.moveLeft();
        });
    }

    // Click Right Event
    rightClick() {
        this.right.addEventListener('click', (e) => {
            e.preventDefault();
            
            this.moveRight();
        });
    }

    // Keyboard Event
    keyEvent() {
        document.addEventListener('keyup', (e) => {
            e.preventDefault();

            if (e.keyCode === 37 || e.which === 37) {
                this.moveLeft();
            } else if (e.keyCode === 39 || e.which === 39) {
                this.moveRight();
            }
        });
    }

    // AutoLoad
    autoLoad() {
        setInterval(() => {
            this.moveRight();
        }, 10000);
    }


}


const slider = new Slider;
slider.init();