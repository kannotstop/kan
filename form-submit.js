const scriptURL = 'https://script.google.com/macros/s/AKfycby2feIoZbpgOdnHVScBDI02UijYy9aDvyudjYFteunS4Me8tX6ULzjAatZ1XiO_3ypI/exec'; // Вставьте URL скрипта сюда
const form = document.forms['contact-form'];

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => alert("Form submitted successfully!"))
        .catch(error => alert("Error submitting form. Please try again."));
});
