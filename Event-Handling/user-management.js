const userInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const addUserButton = document.getElementById('btn-add');
const userList = document.getElementById('user-list');

addUserButton.addEventListener('click', () => {
    const username = userInput.value.trim();
    const email = emailInput.value.trim();
    if (username && email) {
        const rowCount = userList.getElementsByTagName('tr').length;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rowCount + 1}</td>
            <td>${username}</td>
            <td>${email}</td>
            <td><button class="btn-delete">Delete</button></td>
        `;
        userList.appendChild(row);
        userInput.value = '';
        emailInput.value = '';
        userInput.focus();
    }   
});
userList.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-delete')) {
        const row = event.target.closest('tr');
        userList.removeChild(row);
    }
});
