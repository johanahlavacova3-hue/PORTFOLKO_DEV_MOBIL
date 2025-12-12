document.addEventListener('DOMContentLoaded', () => {
    // === 1. LOGIKA SLIDERU (Horizontální swipe) ===
    
    // Nyní hledáme vnější wrapper, abychom mohli detekovat swipe
    const sliderWrappers = document.querySelectorAll('.image-slider-wrapper');

    sliderWrappers.forEach(wrapper => {
        const container = wrapper.querySelector('.image-slider-container');
        const slider = container.querySelector('.image-slider');
        const slides = container.querySelectorAll('.slide-item');
        const dotsContainer = container.querySelector('.slider-dots-container');
        let currentIndex = 0;
        let startX = 0;
        let isDragging = false;
        const threshold = 50; 
        const slideWidth = 320; // Pevná šířka slidu v pixelech

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

        // Funkce pro posun na daný slide (posouváme o pevnou šířku 320px)
        const goToSlide = (index) => {
            if (index < 0 || index >= slides.length) return;

            currentIndex = index;
            // Posuneme o NÁSOBEK pevné šířky
            const offset = -currentIndex * slideWidth; 
            slider.style.transform = `translateX(${offset}px)`;

            // Aktualizace teček
            dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        };

        // Touch/Swipe logika - detekujeme na celém wrapperu
        wrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });

        wrapper.addEventListener('touchend', (e) => {
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
            const slide = e.target.closest('.project-slide');
            const shortDesc = slide.querySelector('.project-description-short');
            const fullDesc = slide.querySelector('.project-description-full');
            const btnPlay = slide.querySelector('.btn-play'); // Tlačítko HRAJ!

            if (fullDesc && shortDesc) {
                const isVisible = fullDesc.classList.toggle('visible');

                shortDesc.classList.toggle('hidden', isVisible);
                
                button.textContent = isVisible ? 'ZAVŘÍT' : 'JEŠTĚÉÉ';

                // Skryjeme tlačítko HRAJ! (nebo ho necháme)
                // Pokud chceme HRAJ! skrýt, když je rozbaleno JEŠTĚÉÉ:
                // if (btnPlay) {
                //     btnPlay.style.display = isVisible ? 'none' : 'block';
                // }
            }
        });
    });

});
