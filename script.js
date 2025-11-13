/**
 * АНИМАЦИИ ДЛЯ САЙТА Triogen Electrika
 * Каждая секция — отдельный модуль с комментариями.
 */

// =============================================
// 1. Анимация шапки (магнитные частицы)
// =============================================
function initHeaderParticles() {
    const canvas = document.getElementById('magneticCanvas');
    const header = document.querySelector('header');
    const ctx = canvas.getContext('2d');
    
    // Состояние анимации
    let particles = [];
    let animationFrameId = null;
    const mouse = { x: Infinity, y: Infinity };
    const colors = ['#4DFFE8', '#5D5BFF', '#00FFE0'];
    const numParticles = 80;

    // Класс частицы
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speed = Math.random() * 0.5 + 0.1;
            this.angle = Math.random() * Math.PI * 2;
        }
        
        update() {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                this.angle = Math.atan2(dy, dx);
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
            } else {
                this.angle += (Math.random() - 0.5) * 0.1;
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
            }

            // Если частица вышла за границы - пересоздаем ее
            if (this.x < 0 || this.x > canvas.width || 
                this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // Инициализация частиц
    const initParticles = () => {
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    };

    // Обработчики событий мыши
    const handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };

    const handleMouseOut = () => {
        mouse.x = Infinity;
        mouse.y = Infinity;
    };

    // Основной цикл анимации
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Обновление и отрисовка частиц
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Отрисовка соединений
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(93, 91, 255, ${0.3 - distance/300})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        animationFrameId = requestAnimationFrame(animate);
    };

    // Функция для корректного ресайза
    const handleResize = () => {
        const width = header.clientWidth;
        const height = header.clientHeight;
        
        // Устанавливаем размеры canvas
        canvas.width = width;
        canvas.height = height;
        
        // Пересоздаем частицы
        initParticles();
        
        // Перезапускаем анимацию
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        animate();
    };

    // Инициализация
    const setup = () => {
        handleResize();
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseout', handleMouseOut);
        window.addEventListener('resize', handleResize);
    };

    // Очистка
    const cleanup = () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseout', handleMouseOut);
        window.removeEventListener('resize', handleResize);
    };

    setup();
    return cleanup;
}

// =============================================
// 2. Анимация карточек услуг
// =============================================
function animateServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    if (!cards.length) return;

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });

    const checkVisibility = () => {
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                setTimeout(()=>{
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                },index*200)
            }
        });
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Проверить при загрузке
}

function animatePortfolioItems() {
    const items = document.querySelectorAll('.portfolio-item');
    if (!items.length) return;

    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
    });

    const checkVisibility = () => {
        items.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                setTimeout(()=>{
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index*200)
            }
        });
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
}

function animateBenefits() {
    const items = document.querySelectorAll('.benefit-card');
    if (!items.length) return;

    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
    });

    const checkVisibility = () => {
        items.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                setTimeout(()=>{
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index*200)
            }
        });
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
}

function animateStatBoxes() {
    const items = document.querySelectorAll('.stat-box');
    if (!items.length) return;

    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
    });

    const checkVisibility = () => {
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
}



// =============================================
// 3. Анимация статистики (круговые диаграммы)
// =============================================
function animateStats() {
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const startValue = 0;
            const duration = calculateDuration(target); // Динамический расчет длительности
            
            let startTime = null;
            
            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Плавное замедление в конце (ease-out)
                const easedProgress = easeOutQuad(progress);
                const value = Math.floor(startValue + (target - startValue) * easedProgress);
                
                counter.textContent = value;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    counter.textContent = target; // Гарантируем точное конечное значение
                }
            };
            
            requestAnimationFrame(animate);
        });
    }
    
    // Функция для плавного замедления (ease-out)
    function easeOutQuad(t) {
        return t * (2 - t);
    }
    
    // Динамический расчет длительности в зависимости от целевого значения
    function calculateDuration(target) {
        const baseDuration = 2000; // Базовая длительность для маленьких чисел
        const additionalPerUnit = 1; // Дополнительное время на каждую единицу
        
        // Минимальная и максимальная длительность
        return Math.min(
            Math.max(
                baseDuration + target * additionalPerUnit,
                3000 // Минимальная длительность
            ),
            5000 // Максимальная длительность
        );
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const statsSection = document.querySelector('.section-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// =============================================
// Инициализация всех анимаций
// =============================================

function animateReviews() {
    const container = document.querySelector('.reviews-swiper');
    if (!container) return;

    new Swiper('.reviews-swiper', {
        // По умолчанию для десктопа - вертикальная карусель
        direction: 'vertical',
        slidesPerView: 3,
        centeredSlides: true,
        loop: true,
        spaceBetween: 30,
        speed: 700,
        grabCursor: true,
        autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        },
        // navigation: {
        // nextEl: '.swiper-button-next',
        // prevEl: '.swiper-button-prev',
        // },
        breakpoints: {
        // Мобилки (0-767px) - горизонтальный слайдер
        0: { 
            direction: 'horizontal',
            slidesPerView: 1.2,
            spaceBetween: 20,
            centeredSlides: true
        },
        // Планшеты (768-1023px) - горизонтальный слайдер
        768: { 
            direction: 'horizontal',
            slidesPerView: 2,
            spaceBetween: 25,
            centeredSlides: false
        },
        // Десктоп (1024px+) - вертикальная карусель
        1024: { 
            direction: 'vertical',
            slidesPerView: 3,
            spaceBetween: 30,
            centeredSlides: true
        }
        },
    });
}

// // Устанавливает размытый фон карточки равный img.src
// function applyBlurredBgToReviewCards() {
//   const cards = document.querySelectorAll('.reviews-swiper .review-card');
//   cards.forEach(card => {
//     const img = card.querySelector('img');
//     if (!img) return;

//     // Если изображение уже загружено — применим
//     const setBg = (src) => {
//       // ставим в ::before через style переменную (используем inline backgroundImage на элементе)
//       card.style.setProperty('--review-bg-src', `url("${src}")`);
//       // чтобы ::before использовал это, можно поставить background-image через атрибут style,
//       // но псевдоэлемент не может читать inline style background-image напрямую.
//       // поэтому устанавливаем background на сам элемент и используем filter + z-index trick:
//       // но проще — установим style.backgroundImage для самого элемента (на z-index 0 псевдоэлемента).
//       card.style.backgroundImage = `url("${src}")`;
//       card.style.backgroundSize = 'cover';
//       card.style.backgroundPosition = 'center';
//       // и чтобы ::before мог обращаться — мы используем его background: inherit; (см. ниже)
//     };

//     if (img.complete && img.naturalWidth !== 0) {
//       setBg(img.src);
//     } else {
//       img.addEventListener('load', () => setBg(img.src));
//     }
//   });
// }

// Дополнительно: немножко CSS-правки, чтобы ::before использовал background от элемента
// Этот кусок добавляет правило в runtime (альтернатива — можно добавить в CSS вручную)
(function appendReviewPseudoStyle() {
  const css = `
    .reviews-swiper .review-card::before { background-image: inherit; }
  `;
  const s = document.createElement('style');
  s.textContent = css;
  document.head.appendChild(s);
})();

// вызови эту функцию после создания Swiper и/или после DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  applyBlurredBgToReviewCards();
});

// если слайды могут меняться динамически (lazy load) — вызвать applyBlurredBgToReviewCards() после обновлений


function initReviewModal() {
    const reviewImages = document.querySelectorAll('.review-image');
    if (reviewImages.length === 0) return;

    const modal = document.querySelector('.modal-review');
    const modalImg = document.getElementById('modal-review-image');
    const closeBtn = document.querySelector('.close-modal');

    reviewImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImg.src = img.src;
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    initHeaderParticles();    // Частицы в шапке
    animateServiceCards();    // Карточки услуг
    animateServiceCards();
    animatePortfolioItems();
    animateBenefits();
    //animateStatBoxes();
    animateStats();           // Круговые диаграммы
    animateReviews();
    initReviewModal();
});
