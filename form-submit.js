const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'; // Замените на ваш URL скрипта

async function submitForm(event) {
    event.preventDefault();
    const form = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');
    let phone = document.getElementById('phone').value;

    // Удаляем все символы, кроме цифр
    phone = phone.replace(/[^\d+]/g, '');

    // Преобразуем +7 в 8
    if (phone.startsWith('+7')) {
        phone = '8' + phone.slice(2);
    } else if (phone.startsWith('7')) {
        phone = '8' + phone.slice(1);
    }

    const formData = new FormData(form);
    formData.set('phone', phone); // Обновляем номер телефона в правильном формате

    try {
        const response = await fetch(scriptURL, { method: 'POST', body: formData });
        if (response.ok) {
            responseMessage.textContent = 'Our operators will contact you as soon as possible.';
            form.reset();

            // Скрываем сообщение через 4 секунды
            setTimeout(() => {
                responseMessage.textContent = '';
            }, 4000);
        } else {
            responseMessage.textContent = 'Error submitting form. Please try again.';
        }
    } catch (error) {
        responseMessage.textContent = 'Error submitting form. Please try again.';
        console.error('Error:', error);
    }
}
