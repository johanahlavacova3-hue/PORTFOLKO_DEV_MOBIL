document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. LOGIKA FLEXIBILNÍHO SLIDERU ===
    const sliderWrappers = document.querySelectorAll('.image-slider-wrapper');

    sliderWrappers.forEach(wrapper => {
        const container = wrapper.querySelector('.image-slider-container');
        // Přidáváme kontrolu, jestli existuje slider a dotsContainer, 
        // protože HERO slide je nemá a kód by mohl selhat.
        if (!container) return; 

        const slider = container.querySelector('.image-slider');
        const slides = container.querySelectorAll('.slide-item');
        const dotsContainer = container.querySelector('.slider-dots-container');

        // Pokud v daném kontejneru nejsou slidy (např. v kontaktní sekci), přeskočíme
        if (!slides || slides.length === 0) return;
        
        let currentIndex = 0;
        let startX = 0;
        let isDragging = false;
        
        const getSlideWidth = () => container.clientWidth;

        const createDots = () => {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = ''; 
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                
                dot.addEventListener('click', () => {
                    goToSlide(index);
                });
                dotsContainer.appendChild(dot);
            });
        };

        const goToSlide = (index) => {
            if (index < 0 || index >= slides.length) return;
            currentIndex = index;
            
            const currentWidth = getSlideWidth();
            const offset = -currentIndex * currentWidth;
            
            slider.style.transform = `translateX(${offset}px)`;

            if (dotsContainer) {
                dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            }
        };

        // ... (Swipe eventy zůstávají beze změny) ...

        wrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });

        wrapper.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            const threshold = 50; 

            if (diffX > threshold) {
                goToSlide(currentIndex + 1);
            } else if (diffX < -threshold) {
                goToSlide(currentIndex - 1);
            } else {
                goToSlide(currentIndex);
            }
        });

        window.addEventListener('resize', () => {
            goToSlide(currentIndex);
        });

        createDots();
        goToSlide(0);
    });


    // === 2. LOGIKA ROLOVÁNÍ TEXTU ("JEŠTĚÉÉ") - OPRAVENO ===
    const moreButtons = document.querySelectorAll('.btn-more');

    moreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const slide = e.target.closest('.project-slide');
            const shortDesc = slide.querySelector('.project-description-short');
            const fullDesc = slide.querySelector('.project-description-full');
            
            if (fullDesc && shortDesc) {
                const isExpanded = fullDesc.classList.toggle('visible');
                
                // Toggle třídy 'hidden' na krátkém popisku
                // Tato třída je nyní správně definována v CSS tak, aby element skryla
                shortDesc.classList.toggle('hidden', isExpanded);
                
                button.textContent = isExpanded ? 'ZAVŘÍT' : 'JEŠTĚÉÉ';
            }
        });
    });

});
