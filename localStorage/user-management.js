const userInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const addUserButton = document.getElementById('btn-add');
const userList = document.getElementById('user-list');

let users = [];

async function loadUsers() {
    try {
        const stored = localStorage.getItem('users');
        if (stored) {
            users = JSON.parse(stored);
        }
        renderUsers();
    } catch (error) {
        console.error("Lỗi khi đọc localStorage:", error);
        users = [];
    }
}

async function saveUsers() {
    try {
        localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
        console.error("Lỗi khi lưu localStorage:", error);
    }
}

function renderUsers() {
    userList.innerHTML = '';
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td><button class="btn-delete" data-index="${index}">Delete</button></td>
        `;
        userList.appendChild(row);
    });
}

addUserButton.addEventListener('click', async () => {
    try {
        const username = userInput.value.trim();
        const email = emailInput.value.trim();
        if (username && email) {
            users.push({ username, email });
            await saveUsers();  
            renderUsers();
            userInput.value = '';
            emailInput.value = '';
            userInput.focus();
        }
    } catch (error) {
        console.error("Lỗi khi thêm user:", error);
    }
});

userList.addEventListener('click', async (event) => {
    try {
        if (event.target.classList.contains('btn-delete')) {
            const index = event.target.getAttribute('data-index');
            users.splice(index, 1);
            await saveUsers();   
            renderUsers();
        }
    } catch (error) {
        console.error("Lỗi khi xóa user:", error);
    }
});

loadUsers();