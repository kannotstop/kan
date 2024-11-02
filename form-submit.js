const scriptURL = 'https://script.google.com/macros/s/AKfycby5x6yHNguyjurtiVZKlhIhdILjsxExm930j8qOdoJ3xeQ7CP18wRJT6UqyDDkH_epP/exec'; // Insert your script URL here

async function submitForm(event) {
    event.preventDefault();
    const form = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');

    // Normalize the phone number
    let phone = form.phone.value;
    phone = phone.replace(/[^\d+]/g, ''); // Remove all non-digit characters except '+'
    
    // Format the phone number
    if (phone.startsWith('7')) {
        phone = '+7 ' + phone.slice(1);
    } else if (phone.startsWith('8')) {
        phone = '+7 ' + phone.slice(1);
    } else if (phone.startsWith('9')) {
        phone = '+7 ' + phone; // Assuming this is a local number without country code
    }

    // Formatting to the desired format
    phone = phone.replace(/(\+\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');

    // Create FormData object and append the formatted phone number
    const formData = new FormData(form);
    formData.set('phone', phone); // Update the phone number in the formData

    try {
        const response = await fetch(scriptURL, { method: 'POST', body: formData });
        if (response.ok) {
            responseMessage.textContent = 'Our operators will contact you as soon as possible!';
            form.reset();
            setTimeout(() => {
                responseMessage.textContent = ''; // Clear the message after 4 seconds
            }, 4000);
        } else {
            responseMessage.textContent = 'Error submitting form. Please try again.';
        }
    } catch (error) {
        responseMessage.textContent = 'Error submitting form. Please try again.';
        console.error('Error:', error);
    }
}
