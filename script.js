// Динамическое создание плавающих сердечек
document.addEventListener('DOMContentLoaded', function() {
    const heartsContainer = document.querySelector('.hearts-background');
    
    // Создаём больше ярких сердечек (25 вместо 15)
    for (let i = 0; i < 25; i++) {
        createHeart(heartsContainer, i);
    }
    
    // Добавляем дополнительные фоновые эффекты
    addBackgroundEffects();
    
    // Функция создания одного сердечка
    function createHeart(container, index) {
        const heart = document.createElement('span');
        const heartTypes = ['❤', '💖', '💕', '💗', '💓', '💞', '💝'];
        const randomHeart = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        heart.innerHTML = randomHeart;
        
        // Случайные свойства
        const size = Math.random() * 25 + 15; // от 15px до 40px
        const left = Math.random() * 100; // от 0% до 100%
        const delay = Math.random() * 20; // задержка анимации
        const duration = Math.random() * 15 + 20; // длительность от 20 до 35 сек
        const colors = [
            'rgba(123, 104, 238, 0.6)', // фиолетовый
            'rgba(224, 64, 251, 0.6)', // пурпурный
            'rgba(157, 101, 255, 0.6)', // сиреневый
            'rgba(255, 107, 157, 0.6)', // розовый
            'rgba(255, 64, 129, 0.6)' // малиновый
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Применяем свойства
        heart.style.cssText = `
            position: absolute;
            left: ${left}%;
            font-size: ${size}px;
            color: ${color};
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            text-shadow: 0 0 15px ${color.replace('0.6', '0.8')};
            filter: drop-shadow(0 0 10px ${color.replace('0.6', '0.4')});
            z-index: 0;
            opacity: 0;
            animation: float ${duration}s infinite linear;
            animation-delay: ${delay}s;
        `;
        
        container.appendChild(heart);
        
        // Удаляем сердечко после завершения анимации и создаём новое
        setTimeout(() => {
            heart.remove();
            createHeart(container, index);
        }, (duration + delay) * 1000);
    }
    
    // Функция для дополнительных фоновых эффектов
    function addBackgroundEffects() {
        const colors = ['#7B68EE', '#E040FB', '#9D65FF', '#FF6B9D', '#FF4081'];
        
        // Создаём пузырьки на фоне
        for (let i = 0; i < 10; i++) {
            const bubble = document.createElement('div');
            const size = Math.random() * 100 + 50;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const opacity = Math.random() * 0.1 + 0.05;
            
            bubble.style.cssText = `
                position: fixed;
                left: ${left}%;
                top: ${top}%;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                opacity: ${opacity};
                filter: blur(40px);
                z-index: -1;
                pointer-events: none;
                animation: bubbleFloat ${Math.random() * 20 + 20}s infinite ease-in-out alternate;
            `;
            
            document.body.appendChild(bubble);
            
            // Анимация пузырьков
            const style = document.createElement('style');
            style.textContent = `
                @keyframes bubbleFloat {
                    0% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2); }
                    100% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.8); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Плавное появление страницы с эффектом
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease, transform 1s ease';
    document.body.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'scale(1)';
    }, 100);
    
    // Добавляем эффект нажатия на кнопки
    const buttons = document.querySelectorAll('a');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Только для внутренних переходов
            if (this.href && this.href.includes('.html') && !this.href.includes('#')) {
                e.preventDefault();
                
                // Эффект исчезновения
                document.body.style.opacity = '0';
                document.body.style.transform = 'scale(0.95)';
                document.body.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    window.location.href = this.href;
                }, 500);
            }
        });
    });
    
    // Добавляем эффект при наведении на кнопки
    const allButtons = document.querySelectorAll('a, button');
    allButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform || 'scale(1)';
        });
        
        btn.addEventListener('mouseleave', function() {
            if (!this.classList.contains('magic-button')) {
                this.style.transform = 'scale(1)';
            }
        });
    });
    
    // Добавляем случайное мерцание элементам
    const sparkleElements = document.querySelectorAll('.detail-item, .polaroid, .gallery-item');
    sparkleElements.forEach(el => {
        setInterval(() => {
            if (Math.random() > 0.7) {
                el.style.boxShadow = `
                    0 0 30px ${Math.random() > 0.5 ? 'rgba(123, 104, 238, 0.6)' : 'rgba(224, 64, 251, 0.6)'},
                    ${el.style.boxShadow.split('0 0 30px')[0]}
                `;
                
                setTimeout(() => {
                    el.style.boxShadow = el.style.boxShadow.replace(/0 0 30px rgba\([^)]+\),?\s?/g, '');
                }, 500);
            }
        }, 3000);
    });
    
    // Консольное сообщение для Полины (если она откроет инструменты разработчика)
    console.log('%c💝 ДЛЯ САМОЙ ЯРКОЙ И ПРЕКРАСНОЙ ПОЛИНЫ 💝', 'font-size: 18px; background: linear-gradient(90deg, #7B68EE, #E040FB); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold;');
    console.log('%c"Ты — самый яркий цветок в моём саду счастья. С тобой даже обычные дни сияют, как праздник."', 'color: #E040FB; font-style: italic; font-size: 14px;');
    console.log('%cС любовью, твой... ❤️', 'color: #7B68EE; font-weight: bold;');
    
    // Добавляем эффект "падающих сердечек" при клике
    document.addEventListener('click', function(e) {
        if (Math.random() > 0.7) { // 30% шанс на эффект
            createClickHearts(e.clientX, e.clientY);
        }
    });
    
    function createClickHearts(x, y) {
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                font-size: 20px;
                pointer-events: none;
                z-index: 9999;
                opacity: 0.9;
                transform: scale(0);
                animation: clickHeart 1s ease-out forwards;
            `;
            
            document.body.appendChild(heart);
            
            // Удаляем сердечко после анимации
            setTimeout(() => heart.remove(), 1000);
        }
        
        // Добавляем анимацию для кликовых сердечек
        if (!document.getElementById('click-heart-animation')) {
            const style = document.createElement('style');
            style.id = 'click-heart-animation';
            style.textContent = `
                @keyframes clickHeart {
                    0% {
                        transform: scale(0) translate(0, 0);
                        opacity: 0.9;
                    }
                    50% {
                        opacity: 0.9;
                    }
                    100% {
                        transform: scale(1) translate(${Math.random() * 100 - 50}px, -100px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
});