function formatPhoneNumber(inputNumber) {
    // Удаляем все символы, кроме цифр
    let cleanedNumber = inputNumber.replace(/[^\d]/g, '');

    // Если номер начинается не с 8, добавляем 8 в начале
    if (cleanedNumber.length === 10) {
        cleanedNumber = '8' + cleanedNumber;
    }

    return cleanedNumber; // Возвращаем номер в нужном формате
}

// Пример использования
let inputNumber = "+7 (777) 161-00-30"; // Пример входящего номера
let outputNumber = formatPhoneNumber(inputNumber); // Форматируем номер
console.log(outputNumber); // Выводит: 87771610030
