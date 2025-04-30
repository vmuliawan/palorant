document.addEventListener('DOMContentLoaded', function() {
    const maps = ['bind', 'haven', 'split', 'ascent', 'icebox'];
    const sliders = {};
    
    maps.forEach(map => {
        const container = document.getElementById(`${map}-slider`);
        const slider = container.querySelector('.slider');
        const slides = container.querySelectorAll('.slide');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');
        const dotsContainer = container.querySelector('.slider-dots');
        
        let currentIndex = 0;
        const slideCount = slides.length;
        let dots = [];
        
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
            dots.push(dot);
        }
        
        function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slideCount;
            updateSlider();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateSlider();
        }
        
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        let slideInterval = setInterval(nextSlide, 5000);
        
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                nextSlide();
            }
            if (touchEndX > touchStartX + 50) {
                prevSlide();
            }
        }
        
        sliders[map] = {
            container,
            currentIndex,
            slideCount,
            updateSlider,
            goToSlide,
            nextSlide,
            prevSlide,
            slideInterval
        };
    });
    
    const mapButtons = document.querySelectorAll('.map-btn');
    
    mapButtons.forEach(button => {
        button.addEventListener('click', function() {
            const map = this.getAttribute('data-map');
            
            mapButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.slider-container').forEach(container => {
                container.classList.remove('active');
            });
            
            document.getElementById(`${map}-slider`).classList.add('active');
        });
    });
    
    document.addEventListener('keydown', (e) => {
        const activeSlider = document.querySelector('.slider-container.active');
        if (!activeSlider) return;
        
        const map = activeSlider.id.replace('-slider', '');
        const slider = sliders[map];
        
        if (e.key === 'ArrowRight') {
            slider.nextSlide();
        } else if (e.key === 'ArrowLeft') {
            slider.prevSlide();
        }
    });
});