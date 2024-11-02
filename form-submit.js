const scriptURL = 'https://script.google.com/macros/s/AKfycby5x6yHNguyjurtiVZKlhIhdILjsxExm930j8qOdoJ3xeQ7CP18wRJT6UqyDDkH_epP/exec'; // Вставьте сюда URL скрипта

async function submitForm(event) {
    event.preventDefault();
    const form = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');

    try {
        const formData = new FormData(form);

        // Получаем и форматируем номер телефона
        let phoneNumber = formData.get('phone');
        phoneNumber = formatPhoneNumber(phoneNumber);
        formData.set('phone', phoneNumber); // Устанавливаем отформатированный номер обратно в formData

        const response = await fetch(scriptURL, { method: 'POST', body: formData });
        if (response.ok) {
            responseMessage.textContent = 'Our operators will contact you as soon as possible.';
            form.reset();
            setTimeout(() => {
                responseMessage.textContent = ''; // Скрываем сообщение через 4 секунды
            }, 4000);
        } else {
            responseMessage.textContent = 'Error submitting form. Please try again.';
        }
    } catch (error) {
        responseMessage.textContent = 'Error submitting form. Please try again.';
        console.error('Error:', error);
    }
}

function formatPhoneNumber(inputNumber) {
    // Удаляем все символы, кроме цифр
    let cleanedNumber = inputNumber.replace(/[^\d]/g, '');

    // Если номер начинается не с 8, добавляем 8 в начале
    if (cleanedNumber.length === 10) {
        cleanedNumber = '8' + cleanedNumber;
    }

    return cleanedNumber; // Возвращаем номер в нужном формате
}
