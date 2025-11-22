const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitButton = document.getElementById('submit-btn');
const backButton = document.getElementById('back-btn');

function goBack() {
    window.history.back();
}

document.addEventListener('DOMContentLoaded', () => {
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        console.log("Tên: " + name, "Email: " + email,"Message: " + message);

        if (name === '' || email === '' || message === '') {
            alert('Please fill in all fields.');
            return;
        }
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        alert('Form submitted successfully!');
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
    }
    );
});
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
function addNewArticle() {
    const main = document.querySelector('main');
    const newArticle = document.createElement('article');
    newArticle.classList.add('article');
    newArticle.innerHTML = `
        <h1>New Article Title</h1>
        <p>This is a new article added dynamically.</p>
        <p>Contact us at:</p>
    `;
    main.appendChild(newArticle);
}   
        