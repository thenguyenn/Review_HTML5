
function goBack() {
    window.location.href = 'index.html';
}


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    
    field.classList.add('error');
    field.classList.remove('success');
    errorElement.textContent = message;
}

function showSuccess(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    
    field.classList.remove('error');
    field.classList.add('success');
    errorElement.textContent = '';
}

function clearValidation() {
    const fields = ['name', 'email', 'message'];
    fields.forEach(function(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + '-error');
        
        field.classList.remove('error', 'success');
        errorElement.textContent = '';
    });
}

function validateForm() {
    let isValid = true;
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (name === '') {
        showError('name', 'Please enter your name.');
        isValid = false;
    } else {
        showSuccess('name');
    }
    
    if (email === '') {
        showError('email', 'Please enter your email address.');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email format (e.g., john@example.com).');
        isValid = false;
    } else {
        showSuccess('email');
    }
    
    if (message === '') {
        showError('message', 'Please enter your message.');
        isValid = false;
    } else {
        showSuccess('message');
    }
    
    return isValid;
}


document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const successMsg = document.getElementById('success-msg');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (validateForm()) {
                const formData = {
                    name: document.getElementById('name').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    message: document.getElementById('message').value.trim()
                };
                
                console.log('Form submitted successfully:', formData);
                
                contactForm.style.display = 'none';
                successMsg.classList.add('show');
                
                setTimeout(function() {
                    contactForm.reset();
                    clearValidation();
                    successMsg.classList.remove('show');
                    contactForm.style.display = 'block';
                }, 5000);
            } else {
                console.log('Form validation failed - please check the fields.');
            }
        });
        
        const fields = ['name', 'email', 'message'];
        fields.forEach(function(fieldId) {
            const field = document.getElementById(fieldId);
            
            field.addEventListener('blur', function() {
                const value = field.value.trim();
                
                if (fieldId === 'name') {
                    if (value === '') {
                        showError('name', 'Please enter your name.');
                    } else {
                        showSuccess('name');
                    }
                } else if (fieldId === 'email') {
                    if (value === '') {
                        showError('email', 'Please enter your email address.');
                    } else if (!isValidEmail(value)) {
                        showError('email', 'Please enter a valid email format.');
                    } else {
                        showSuccess('email');
                    }
                } else if (fieldId === 'message') {
                    if (value === '') {
                        showError('message', 'Please enter your message.');
                    } else {
                        showSuccess('message');
                    }
                }
            });
            
            field.addEventListener('focus', function() {
                document.getElementById(fieldId + '-error').textContent = '';
            });
        });
    }
});