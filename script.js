document.addEventListener('DOMContentLoaded', () => {
    // Najdeme všechny kontejnery obrázků
    const sliderContainers = document.querySelectorAll('.image-slider-container');

    sliderContainers.forEach(container => {
        const slider = container.querySelector('.image-slider');
        const slides = container.querySelectorAll('.slide-item');
        const dotsContainer = container.querySelector('.slider-dots-container');
        let currentIndex = 0;
        let startX = 0;
        let isDragging = false;
        const threshold = 50; // Minimální vzdálenost pro swipe (v pixelech)

        // 1. Vytvoření navigačních teček
        const createDots = () => {
            dotsContainer.innerHTML = ''; // Vyčistíme
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) {
                    dot.classList.add('active');
                }
                dot.addEventListener('click', () => {
                    goToSlide(index);
                });
                dotsContainer.appendChild(dot);
            });
        };

        // 2. Posun na daný slide
        const goToSlide = (index) => {
            if (index < 0 || index >= slides.length) return;

            currentIndex = index;
            // Vypočítáme, jak moc posunout slider doleva
            const offset = -currentIndex * 100; 
            slider.style.transform = `translateX(${offset}vw)`;

            // Aktualizujeme tečky
            dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        };

        // 3. Touch/Swipe logika

        // Start dotyku
        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            // Zabráníme vertikálnímu posunu rodiče (projektu)
            // e.stopPropagation(); 
        }, { passive: true });

        // Pohyb dotyku
        container.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            // Povolíme standardní chování, ale zaznamenáme pohyb
            // e.preventDefault(); // POZOR: Toto by zablokovalo vertikální scroll!
        }, { passive: true });


        // Konec dotyku
        container.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX; // Pozitivní pro swipe doleva

            if (diffX > threshold) {
                // Swipe doleva (na další obrázek)
                goToSlide(currentIndex + 1);
            } else if (diffX < -threshold) {
                // Swipe doprava (na předchozí obrázek)
                goToSlide(currentIndex - 1);
            } else {
                // Vrátíme se na aktuální obrázek (pokud nebyl dostatečný swipe)
                goToSlide(currentIndex); 
            }
        });

        // Inicializace
        createDots();
        goToSlide(0); // Ujistíme se, že začínáme na prvním obrázku
    });
});
