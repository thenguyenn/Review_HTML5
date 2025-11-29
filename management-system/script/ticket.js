function saveTicket() {
            const event = document.getElementById('ticket-event').value.trim();
            const type = document.getElementById('ticket-type').value;
            const price = document.getElementById('ticket-price').value;
            const sold = document.getElementById('ticket-sold').value;

            if (!event) {
                alert('Vui lòng nhập tên sự kiện!');
                return;
            }
            if (!price) {
                alert('Vui lòng nhập giá vé!');
                return;
            }
            if (price <= 0) {
                alert('Giá vé phải lớn hơn 0!');
                return;
            }
            if (price > 100000000) {
                alert('Giá vé không hợp lệ!');
                return;
            }
            if (!sold) {
                alert('Vui lòng nhập số lượng đã bán!');
                return;
            }
            if (sold < 0) {
                alert('Số lượng đã bán không được âm!');
                return;
            }

            const id = document.getElementById('ticket-id').value;
            const ticket = {
                id: id || ticketIdCounter++,
                event: event,
                type: type,
                price: price,
                sold: sold
            };

            if (id) {
                const index = tickets.findIndex(t => t.id == id);
                tickets[index] = ticket;
            } else {
                tickets.push(ticket);
            }

            renderTickets();
            resetTicketForm();
            updateWidgets();
            alert('Lưu vé thành công!');
        }

        function editTicket(id) {
            const ticket = tickets.find(t => t.id == id);
            document.getElementById('ticket-id').value = ticket.id;
            document.getElementById('ticket-event').value = ticket.event;
            document.getElementById('ticket-type').value = ticket.type;
            document.getElementById('ticket-price').value = ticket.price;
            document.getElementById('ticket-sold').value = ticket.sold;
            document.getElementById('ticket-form-title').textContent = 'Chỉnh sửa vé';
        }

        function deleteTicket(id) {
            if (confirm('Bạn có chắc muốn xóa vé này?')) {
                tickets = tickets.filter(t => t.id != id);
                renderTickets();
                updateWidgets();
            }
        }

        function resetTicketForm() {
            document.getElementById('ticket-form').reset();
            document.getElementById('ticket-id').value = '';
            document.getElementById('ticket-form-title').textContent = 'Thêm vé mới';
        }

        function renderTickets() {
            const tbody = document.getElementById('tickets-table-body');
            tbody.innerHTML = '';
            tickets.forEach(ticket => {
                tbody.innerHTML += `
                    <tr>
                        <td>${ticket.id}</td>
                        <td>${ticket.event}</td>
                        <td>${ticket.type}</td>
                        <td>${parseInt(ticket.price).toLocaleString('vi-VN')}đ</td>
                        <td>${ticket.sold}</td>
                        <td>
                            <button class="btn btn-edit" onclick="editTicket(${ticket.id})">Sửa</button>
                            <button class="btn btn-danger" onclick="deleteTicket(${ticket.id})">Xóa</button>
                        </td>
                    </tr>
                `;
            });
        }