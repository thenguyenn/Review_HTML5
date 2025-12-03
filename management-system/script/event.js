let events = [];
let eventIdCounter = 1;

function saveEvent() {
    const name = document.getElementById('event-name').value.trim();
    const category = document.getElementById('event-category').value.trim();
    const date = document.getElementById('event-date').value;
    const location = document.getElementById('event-location').value.trim();
    const price = document.getElementById('event-price').value.trim();
    const seats = document.getElementById('event-seats').value.trim();
    const thumbnail = document.getElementById('event-thumbnail').value.trim();

    document.querySelectorAll('.error').forEach(e => e.textContent = '');

    let isValid = true;

    if (!name) {
        document.getElementById('error-name').textContent = 'Tên sự kiện không được để trống';
        document.getElementById('error-name').style.color = "red";
        isValid = false;
    }
    if (!category) {
        document.getElementById('error-category').textContent = 'Danh mục không được để trống';
        document.getElementById('error-category').style.color = "red";
        isValid = false;
    }
    if (!date) {
        document.getElementById('error-date').textContent = 'Ngày diễn ra không được để trống';
        document.getElementById('error-date').style.color = "red";
        isValid = false;
    }
    if (!location) {
        document.getElementById('error-location').textContent = 'Địa điểm không được để trống';
        document.getElementById('error-location').style.color = "red";
        isValid = false;
    }
    if (!price) {
        document.getElementById('error-price').textContent = 'Giá vé không được để trống';
        document.getElementById('error-price').style.color = "red";
        isValid = false;
    }
    if (!seats) {
        document.getElementById('error-seats').textContent = 'Tổng số ghế không được để trống';
        document.getElementById('error-seats').style.color = "red";
        isValid = false;
    }
    if (!thumbnail) {
        document.getElementById('error-thumbnail').textContent = 'Thumbnail không được để trống';
        document.getElementById('error-thumbnail').style.color = "red";
        isValid = false;
    }

    if (!isValid) return;

    const id = document.getElementById('event-id').value;
    const event = {
        id: id || eventIdCounter++,
        name,
        category,
        date,
        location,
        price,
        seats,
        thumbnail
    };

    if (id) {
        const index = events.findIndex(e => e.id == id);
        events[index] = event;
    } else {
        events.push(event);
    }

    // Save to localStorage
    localStorage.setItem('events', JSON.stringify(events));

    renderEvents();
    resetEventForm();
    updateWidgets();
    alert('Lưu sự kiện thành công!');
}

function editEvent(id) {
    const event = events.find(e => e.id == id);
    document.getElementById('event-id').value = event.id;
    document.getElementById('event-name').value = event.name;
    document.getElementById('event-category').value = event.category;
    document.getElementById('event-date').value = event.date;
    document.getElementById('event-location').value = event.location;
    document.getElementById('event-price').value = event.price;
    document.getElementById('event-seats').value = event.seats;
    document.getElementById('event-thumbnail').value = event.thumbnail;
    document.getElementById('event-form-title').textContent = 'Chỉnh sửa sự kiện';
}

function deleteEvent(id) {
    if (confirm('Bạn có chắc muốn xóa sự kiện này?')) {
        events = events.filter(e => e.id != id);
        
        // Save to localStorage
        localStorage.setItem('events', JSON.stringify(events));
        
        renderEvents();
        updateWidgets();
    }
}

function resetEventForm() {
    document.getElementById('event-form').reset();
    document.getElementById('event-id').value = '';
    document.getElementById('event-form-title').textContent = 'Thêm sự kiện mới';
}

function renderEvents() {
    const tbody = document.getElementById('events-table-body');
    tbody.innerHTML = '';
    events.forEach(event => {
        tbody.innerHTML += `
            <tr>
                <td>${event.id}</td>
                <td>${event.name}</td>
                <td>${event.category}</td>
                <td>${event.date}</td>
                <td>${event.location}</td>
                <td>${parseInt(event.price).toLocaleString('vi-VN')}đ</td>
                <td>${event.seats}</td>
                <td><img src="${event.thumbnail}" alt="Thumbnail" style="width: 100px; height: auto;"></td>
                <td>
                    <button class="btn btn-edit" onclick="editEvent(${event.id})">Sửa</button>
                    <button class="btn btn-danger" onclick="deleteEvent(${event.id})">Xóa</button>
                </td>
            </tr>
        `;
    });
}