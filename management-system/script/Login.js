const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('login-btn');
const errorMsg = document.getElementById('error');

const users = [
    {
        email: 'admin@example.com',
        password: '123456',
        name: 'Admin User',
        role: 'Admin'
    },
    {
        email: 'user@example.com',
        password: 'user123',
        name: 'Regular User',
        role: 'User'
    },
    {
        email: 'test@gmail.com',
        password: 'test123',
        name: 'Test User',
        role: 'Tester'
    }
];

loginBtn.addEventListener('click', function(e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        errorMsg.textContent = '';

        localStorage.setItem('loggedInUser', JSON.stringify(user));

        console.log(`Đăng nhập thành công! Chào mừng ${user.name} (${user.role})`);

        window.location.href = '../page/Dashboard.html';
    } else {
        errorMsg.textContent = 'Email hoặc mật khẩu không đúng.';
        errorMsg.style.color = 'red';
        emailInput.value = '';
        passwordInput.value = '';
        emailInput.focus();
    }
});