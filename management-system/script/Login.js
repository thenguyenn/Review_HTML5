const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('login-btn');
const errorMsg = document.getElementById('error');

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || password.length < 6) {
        errorMsg.textContent = 'Vui lòng kiểm tra lại thông tin đăng nhập.';
        return;
    }

    alert('Đăng nhập thành công!');
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = "../pages/Dashboard.html";
});

if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = "../pages/Dashboard.html";
}