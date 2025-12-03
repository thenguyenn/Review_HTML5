let users = [];
let userIdCounter = 1;

function saveUser() {
    const name = document.getElementById('user-name').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const phone = document.getElementById('user-phone').value.trim();
    const role = document.getElementById('user-role').value;

    if (!name) {
        alert('Vui lòng nhập tên người dùng!');
        return;
    }
    if (name.length < 2) {
        alert('Tên người dùng phải có ít nhất 2 ký tự!');
        return;
    }
    if (!email) {
        alert('Vui lòng nhập email!');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Email không hợp lệ!');
        return;
    }

    const id = document.getElementById('user-id').value;
    const duplicateEmail = users.find(u => u.email === email && u.id != id);
    if (duplicateEmail) {
        alert('Email này đã tồn tại!');
        return;
    }

    if (!phone) {
        alert('Vui lòng nhập số điện thoại!');
        return;
    }

    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    if (!phoneRegex.test(phone)) {
        alert('Số điện thoại không hợp lệ! (VD: 0123456789)');
        return;
    }

    const user = {
        id: id || userIdCounter++,
        name: name,
        email: email,
        phone: phone,
        role: role
    };

    if (id) {
        const index = users.findIndex(u => u.id == id);
        users[index] = user;
    } else {
        users.push(user);
    }

    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    renderUsers();
    resetUserForm();
    updateWidgets();
    alert('Lưu người dùng thành công!');
}

function editUser(id) {
    const user = users.find(u => u.id == id);
    document.getElementById('user-id').value = user.id;
    document.getElementById('user-name').value = user.name;
    document.getElementById('user-email').value = user.email;
    document.getElementById('user-phone').value = user.phone;
    document.getElementById('user-role').value = user.role;
    document.getElementById('user-form-title').textContent = 'Chỉnh sửa người dùng';
}

function deleteUser(id) {
    if (confirm('Bạn có chắc muốn xóa người dùng này?')) {
        users = users.filter(u => u.id != id);
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        renderUsers();
        updateWidgets();
    }
}

function resetUserForm() {
    document.getElementById('user-form').reset();
    document.getElementById('user-id').value = '';
    document.getElementById('user-form-title').textContent = 'Thêm người dùng mới';
}

function renderUsers() {
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '';
    users.forEach(user => {
        tbody.innerHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.role}</td>
                <td>
                    <button class="btn btn-edit" onclick="editUser(${user.id})">Sửa</button>
                    <button class="btn btn-danger" onclick="deleteUser(${user.id})">Xóa</button>
                </td>
            </tr>
        `;
    });
}