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
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 30,
        direction: 'vertical',
        speed: 1500,
        autoplay: {
            delay: 3000, // Автопрокрутка каждые 3 секунды
            disableOnInteraction: false,
        }
    });
});