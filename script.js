document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. LOGIKA FLEXIBILNÍHO SLIDERU ===
    const sliderWrappers = document.querySelectorAll('.image-slider-wrapper');

    sliderWrappers.forEach(wrapper => {
        const container = wrapper.querySelector('.image-slider-container');
        const slider = container.querySelector('.image-slider');
        const slides = container.querySelectorAll('.slide-item');
        const dotsContainer = container.querySelector('.slider-dots-container');
        
        let currentIndex = 0;
        let startX = 0;
        let isDragging = false;
        
        // Zde změna: nefixujeme šířku, ale načítáme ji z elementu
        const getSlideWidth = () => container.clientWidth;

        const createDots = () => {
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
            
            // Dynamický výpočet posunu podle aktuální šířky kontejneru
            const currentWidth = getSlideWidth();
            const offset = -currentIndex * currentWidth;
            
            slider.style.transform = `translateX(${offset}px)`;

            dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        };

        // Swipe eventy
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
                goToSlide(currentIndex); // Návrat zpět
            }
        });

        // Ošetření změny velikosti okna (aby se slider nerozhodil při otočení mobilu)
        window.addEventListener('resize', () => {
            goToSlide(currentIndex);
        });

        if (slides.length > 0) {
             createDots();
             goToSlide(0); 
        }
    });


    // === 2. LOGIKA ROLOVÁNÍ TEXTU ("JEŠTĚÉÉ") ===
    const moreButtons = document.querySelectorAll('.btn-more');

    moreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const slide = e.target.closest('.project-slide');
            const shortDesc = slide.querySelector('.project-description-short');
            const fullDesc = slide.querySelector('.project-description-full');
            
            if (fullDesc && shortDesc) {
                // Toggle třídy 'visible' spustí CSS animaci
                const isExpanded = fullDesc.classList.toggle('visible');
                
                // Krátký popisek skryjeme (třída .hidden v CSS má opacity: 0)
                shortDesc.classList.toggle('hidden', isExpanded);
                
                button.textContent = isExpanded ? 'ZAVŘÍT' : 'JEŠTĚÉÉ';
            }
        });
    });

});
