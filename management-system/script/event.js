function saveEvent() {
            const name = document.getElementById('event-name').value.trim();
            const date = document.getElementById('event-date').value;
            const location = document.getElementById('event-location').value.trim();
            const description = document.getElementById('event-description').value.trim();

            if (!name) {
                alert('Vui lòng nhập tên sự kiện!');
            }
            if (name.length < 3) {
                alert('Tên sự kiện phải có ít nhất 3 ký tự!');
                return;
            }
            if (!date) {
                alert('Vui lòng chọn ngày diễn ra!');
                return;
            }
            if (!location) {
                alert('Vui lòng nhập địa điểm!');
                return;
            }

            const id = document.getElementById('event-id').value;
            const event = {
                id: id || eventIdCounter++,
                name: name,
                date: date,
                location: location,
                description: description
            };

            if (id) {
                const index = events.findIndex(e => e.id == id);
                events[index] = event;
            } else {
                events.push(event);
            }

            renderEvents();
            resetEventForm();
            updateWidgets();
            alert('Lưu sự kiện thành công!');
        }

        function editEvent(id) {
            const event = events.find(e => e.id == id);
            document.getElementById('event-id').value = event.id;
            document.getElementById('event-name').value = event.name;
            document.getElementById('event-date').value = event.date;
            document.getElementById('event-location').value = event.location;
            document.getElementById('event-description').value = event.description;
            document.getElementById('event-form-title').textContent = 'Chỉnh sửa sự kiện';
        }

        function deleteEvent(id) {
            if (confirm('Bạn có chắc muốn xóa sự kiện này?')) {
                events = events.filter(e => e.id != id);
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
                        <td>${event.date}</td>
                        <td>${event.location}</td>
                        <td>
                            <button class="btn btn-edit" onclick="editEvent(${event.id})">Sửa</button>
                            <button class="btn btn-danger" onclick="deleteEvent(${event.id})">Xóa</button>
                        </td>
                    </tr>
                `;
            });
        }