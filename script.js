document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');

    const animateCards = () => {
        serviceCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    //window.addEventListener('scroll', animateCards);
});

document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            init: function () {
                console.log('Swiper initialized');
            },
            progress: function () {
                const slides = this.slides;
                const progress = this.progress;

                slides.forEach((slide) => {
                    const slideProgress = slide.progress;

                    // Плавное изменение масштаба и прозрачности
                    let scale = 1 - Math.abs(slideProgress) * 0.2; // Уменьшаем масштаб боковых слайдов
                    let opacity = 1 - Math.abs(slideProgress) * 0.3; // Уменьшаем прозрачность боковых слайдов

                    // Ограничиваем минимальные значения
                    scale = Math.max(scale, 0.8); // Минимальный масштаб для боковых слайдов
                    opacity = Math.max(opacity, 0.7); // Минимальная прозрачность для боковых слайдов

                    slide.style.opacity = opacity;
                    slide.style.transform = `scale(${scale})`;
                });
            },
            setTransition: function (transition) {
                const slides = this.slides;
                slides.forEach((slide) => {
                    slide.style.transition = `${transition}ms`;
                });
            },
        },
    });
});