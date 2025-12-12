document.addEventListener('DOMContentLoaded', () => {
    // === 1. LOGIKA SLIDERU (Horizontální swipe) ===
    
    const sliderContainers = document.querySelectorAll('.image-slider-container');

    sliderContainers.forEach(container => {
        const slider = container.querySelector('.image-slider');
        const slides = container.querySelectorAll('.slide-item');
        const dotsContainer = container.querySelector('.slider-dots-container');
        let currentIndex = 0;
        let startX = 0;
        let isDragging = false;
        const threshold = 50; 

        // Funkce pro vytvoření navigačních teček
        const createDots = () => {
            dotsContainer.innerHTML = ''; 
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

        // Funkce pro posun na daný slide
        const goToSlide = (index) => {
            if (index < 0 || index >= slides.length) return;

            currentIndex = index;
            const offset = -currentIndex * 100; 
            slider.style.transform = `translateX(${offset}vw)`;

            // Aktualizace teček
            dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        };

        // Touch/Swipe logika
        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });

        container.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX; 

            if (diffX > threshold) {
                goToSlide(currentIndex + 1);
            } else if (diffX < -threshold) {
                goToSlide(currentIndex - 1);
            } else {
                goToSlide(currentIndex); 
            }
        });

        // Inicializace slideru
        if (slides.length > 0) {
             createDots();
             goToSlide(0); 
        }
    });

    // === 2. LOGIKA ROZBALENÍ TEXTU ("JEŠTĚÉÉ") ===

    const moreButtons = document.querySelectorAll('.btn-more');

    moreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Najdeme nejbližší rodičovskou sekci (.project-slide)
            const slide = e.target.closest('.project-slide');
            
            // Najdeme krátký a dlouhý popis v této sekci
            const shortDesc = slide.querySelector('.project-description-short');
            const fullDesc = slide.querySelector('.project-description-full');

            if (fullDesc && shortDesc) {
                // Přepínáme třídu 'visible' na dlouhém popisu
                const isVisible = fullDesc.classList.toggle('visible');

                // Přepínáme viditelnost krátkého popisu
                shortDesc.classList.toggle('hidden', isVisible);
                
                // Změna textu tlačítka
                button.textContent = isVisible ? 'ZAVŘÍT' : 'JEŠTĚÉÉ';
            }
        });
    });

});
