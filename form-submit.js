const scriptURL = 'https://script.google.com/macros/s/AKfycby5x6yHNguyjurtiVZKlhIhdILjsxExm930j8qOdoJ3xeQ7CP18wRJT6UqyDDkH_epP/exec'; // Вставьте сюда URL скрипта

async function submitForm(event) {
    event.preventDefault();
    const form = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');

    // Нормализация номера телефона
    let phone = form.phone.value;
    
    // Удаление всех символов, кроме цифр
    phone = phone.replace(/\D/g, ''); // Удалить все нецифровые символы

    // Проверка на наличие номера, который начинается на 7 или 8
    if (phone.length === 11) {
        // Если номер начинается с 7, заменяем на 8
        if (phone.startsWith('7')) {
            phone = phone.replace(/^7/, '8'); // Заменить 7 на 8
        }
    } else if (phone.length < 11) {
        // Если номер короче 11 символов, добавляем 8 в начале
        phone = '8' + phone; // Добавить 8 в начале
    } else {
        responseMessage.textContent = 'Invalid phone number format. Please check your input.';
        return;
    }

    // Убедимся, что номер содержит 11 цифр
    if (phone.length === 11) {
        // Создаем FormData объект и добавляем номер телефона
        const formData = new FormData(form);
        formData.set('phone', phone); // Обновить номер телефона в formData

        try {
            const response = await fetch(scriptURL, { method: 'POST', body: formData });
            if (response.ok) {
                responseMessage.textContent = 'Our operators will contact you as soon as possible!';
                form.reset();
                setTimeout(() => {
                    responseMessage.textContent = ''; // Очистить сообщение через 4 секунды
                }, 4000);
            } else {
                responseMessage.textContent = 'Error submitting form. Please try again.';
            }
        } catch (error) {
            responseMessage.textContent = 'Error submitting form. Please try again.';
            console.error('Error:', error);
        }
    } else {
        responseMessage.textContent = 'Invalid phone number format. Please check your input.';
    }
}
