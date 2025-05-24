function changeLanguage(lang) {
    // Сохраняем выбранный язык в localStorage
    localStorage.setItem('selectedLanguage', lang);
    
    // Обновляем все элементы с атрибутами data-ky, data-ru, data-en
    const elements = document.querySelectorAll('[data-' + lang + ']');
    
    elements.forEach(element => {
        element.textContent = element.getAttribute('data-' + lang);
    });

    // Обновляем язык документа
    document.documentElement.lang = lang;
}

// При загрузке страницы проверяем сохраненный язык
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        changeLanguage(savedLanguage);
    }
});

// Инициализация EmailJS
(function() {
    emailjs.init("tog7bvyNsFjUdad0R");
})();

// Обработка отправки формы
document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.querySelector('.feedback-form');
    
    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const submitButton = feedbackForm.querySelector('.submit-btn');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        
        // Получаем текущий язык
        const currentLang = localStorage.getItem('selectedLanguage') || 'ky';
        
        // Тексты для разных языков
        const loadingText = {
            'ky': 'Жөнөтүлүүдө...',
            'ru': 'Отправка...',
            'en': 'Sending...'
        };
        
        const successText = {
            'ky': 'Жөнөтүлдү!',
            'ru': 'Отправлено!',
            'en': 'Sent!'
        };
        
        const errorText = {
            'ky': 'Ката кетти',
            'ru': 'Ошибка',
            'en': 'Error'
        };
        
        submitButton.textContent = loadingText[currentLang];

        // Собираем данные формы
        const templateParams = {
            to_email: 'ramis120705@gmail.com',
            to_name: 'Admin',
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            subject: 'Новое сообщение с сайта Кыргыз Улуттук Оюндары'
        };

        console.log('Отправка данных:', templateParams);

        // Отправка через EmailJS
        emailjs.send('service_b91lbn6', 'template_b37f2zo', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                submitButton.textContent = successText[currentLang];
                feedbackForm.reset();
                
                // Показываем уведомление об успешной отправке
                alert('Сообщение успешно отправлено!');
                
                setTimeout(() => {
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                }, 3000);
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                submitButton.textContent = errorText[currentLang];
                
                // Показываем подробную ошибку
                let errorMessage = 'Ошибка при отправке:\n';
                if (error.text) {
                    errorMessage += error.text;
                } else {
                    errorMessage += JSON.stringify(error);
                }
                alert(errorMessage);
                
                setTimeout(() => {
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                }, 3000);
            });
    });
});

// Функции для работы с видео
function openVideo(videoId) {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('youtubeVideo');
    
    // Устанавливаем источник видео
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    
    // Показываем модальное окно
    modal.style.display = 'block';
    
    // Добавляем обработчик для закрытия по клику вне видео
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeVideo();
        }
    };
    
    // Добавляем обработчик для закрытия по Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeVideo();
        }
    });
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('youtubeVideo');
    
    // Останавливаем видео
    iframe.src = '';
    
    // Скрываем модальное окно
    modal.style.display = 'none';
}