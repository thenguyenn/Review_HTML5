let events = [];
        let cart = [];
        let currentUser = null;

        // Load data
        function loadData() {
            const savedEvents = localStorage.getItem('events');
            if (savedEvents) {
                events = JSON.parse(savedEvents);
            }

            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                cart = JSON.parse(savedCart);
            }

            const loggedInUser = localStorage.getItem('loggedInUser');
            if (loggedInUser) {
                currentUser = JSON.parse(loggedInUser);
                document.getElementById('user-name').textContent = `Xin chào, ${currentUser.name}`;
            } else {
                window.location.href = '../auth/Login.html';
            }

            updateCartCount();
        }

        // Render events
        function renderEvents(eventsToRender = events) {
            const container = document.getElementById('events-container');
            const categoryFilter = document.getElementById('category-filter');

            // Get unique categories
            const categories = [...new Set(events.map(e => e.category))];
            categoryFilter.innerHTML = '<option value="">Tất cả danh mục</option>';
            categories.forEach(cat => {
                categoryFilter.innerHTML += `<option value="${cat}">${cat}</option>`;
            });

            if (eventsToRender.length === 0) {
                container.innerHTML = '<div class="empty-message">Không có sự kiện nào</div>';
                return;
            }

            container.innerHTML = '';
            eventsToRender.forEach(event => {
                const card = document.createElement('div');
                card.className = 'event-card';
                card.innerHTML = `
                    <img src="${event.thumbnail}" alt="${event.name}" class="event-image" onerror="this.src='https://via.placeholder.com/300x200?text=Event'">
                    <div class="event-content">
                        <span class="event-category">${event.category}</span>
                        <div class="event-title">${event.name}</div>
                        <div class="event-info">📅 ${formatDate(event.date)}</div>
                        <div class="event-info">📍 ${event.location}</div>
                        <div class="event-info">🪑 ${event.seats} chỗ ngồi</div>
                        <div class="event-price">${parseInt(event.price).toLocaleString('vi-VN')}đ</div>
                        <div class="btn-group">
                            <button class="btn btn-detail" onclick="showDetail(${event.id})">Chi Tiết</button>
                            <button class="btn btn-add" onclick="addToCart(${event.id})">Thêm Vào Giỏ</button>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN');
        }

        function filterEvents() {
            const searchTerm = document.getElementById('search-input').value.toLowerCase();
            const category = document.getElementById('category-filter').value;

            let filtered = events.filter(event => {
                const matchSearch = event.name.toLowerCase().includes(searchTerm) ||
                    event.location.toLowerCase().includes(searchTerm);
                const matchCategory = !category || event.category === category;
                return matchSearch && matchCategory;
            });

            renderEvents(filtered);
        }

        function showDetail(eventId) {
            const event = events.find(e => e.id == eventId);
            const modal = document.getElementById('detail-modal');
            const content = document.getElementById('detail-content');

            content.innerHTML = `
                <img src="${event.thumbnail}" alt="${event.name}" class="detail-image" onerror="this.src='https://via.placeholder.com/600x300?text=Event'">
                <h2>${event.name}</h2>
                <div class="detail-section">
                    <h3>Thông Tin Sự Kiện</h3>
                    <p><strong>Danh mục:</strong> ${event.category}</p>
                    <p><strong>Ngày diễn ra:</strong> ${formatDate(event.date)}</p>
                    <p><strong>Địa điểm:</strong> ${event.location}</p>
                    <p><strong>Số chỗ ngồi:</strong> ${event.seats}</p>
                </div>
                <div class="detail-section">
                    <h3>Giá Vé</h3>
                    <div class="event-price">${parseInt(event.price).toLocaleString('vi-VN')}đ</div>
                </div>
                <button class="btn btn-add" style="width: 100%; margin-top: 20px;" onclick="addToCart(${event.id}); closeDetail();">Thêm Vào Giỏ Hàng</button>
            `;

            modal.style.display = 'block';
        }

        function closeDetail() {
            document.getElementById('detail-modal').style.display = 'none';
        }

        function addToCart(eventId) {
            const event = events.find(e => e.id == eventId);
            const existingItem = cart.find(item => item.id == eventId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id: event.id,
                    name: event.name,
                    price: event.price,
                    thumbnail: event.thumbnail,
                    quantity: 1
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            alert('Đã thêm vào giỏ hàng!');
        }

        function updateCartCount() {
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('cart-count').textContent = count;
        }

        function openCart() {
            const modal = document.getElementById('cart-modal');
            const cartItems = document.getElementById('cart-items');

            if (cart.length === 0) {
                cartItems.innerHTML = '<div class="empty-message">Giỏ hàng trống</div>';
                document.getElementById('cart-total').textContent = '0đ';
            } else {
                cartItems.innerHTML = '';
                cart.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'cart-item';
                    div.innerHTML = `
                        <img src="${item.thumbnail}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 5px;" onerror="this.src='https://via.placeholder.com/80'">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${item.name}</div>
                            <div style="color: #667eea; font-weight: bold;">${parseInt(item.price).toLocaleString('vi-VN')}đ</div>
                            <div class="quantity-control">
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                                <span style="font-weight: bold;">${item.quantity}</span>
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                            </div>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">Xóa</button>
                    `;
                    cartItems.appendChild(div);
                });

                const total = cart.reduce((sum, item) => sum + (parseInt(item.price) * item.quantity), 0);
                document.getElementById('cart-total').textContent = total.toLocaleString('vi-VN') + 'đ';
            }

            modal.style.display = 'block';
        }

        function closeCart() {
            document.getElementById('cart-modal').style.display = 'none';
        }

        function updateQuantity(itemId, change) {
            const item = cart.find(i => i.id == itemId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(itemId);
                } else {
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartCount();
                    openCart();
                }
            }
        }

        function removeFromCart(itemId) {
            cart = cart.filter(item => item.id != itemId);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            openCart();
        }

        function proceedToCheckout() {
            if (cart.length === 0) {
                alert('Giỏ hàng trống!');
                return;
            }

            closeCart();
            const modal = document.getElementById('checkout-modal');

            if (currentUser) {
                document.getElementById('checkout-name').value = currentUser.name || '';
                document.getElementById('checkout-email').value = currentUser.email || '';
            }

            const total = cart.reduce((sum, item) => sum + (parseInt(item.price) * item.quantity), 0);
            document.getElementById('checkout-total').textContent = total.toLocaleString('vi-VN') + 'đ';

            modal.style.display = 'block';
        }

        function closeCheckout() {
            document.getElementById('checkout-modal').style.display = 'none';
        }

        function completeCheckout() {
            const name = document.getElementById('checkout-name').value.trim();
            const email = document.getElementById('checkout-email').value.trim();
            const phone = document.getElementById('checkout-phone').value.trim();
            const paymentMethod = document.getElementById('payment-method').value;

            if (!name || !email || !phone) {
                alert('Vui lòng điền đầy đủ thông tin!');
                return;
            }

            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            const order = {
                id: Date.now(),
                date: new Date().toISOString(),
                customer: { name, email, phone },
                items: cart,
                total: cart.reduce((sum, item) => sum + (parseInt(item.price) * item.quantity), 0),
                paymentMethod: paymentMethod,
                status: 'Đã thanh toán'
            };
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));

            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();

            closeCheckout();
            alert('Thanh toán thành công! Cảm ơn bạn đã đặt vé.');
        }

        function logout() {
            if (confirm('Bạn có chắc muốn đăng xuất?')) {
                localStorage.removeItem('loggedInUser');
                window.location.href = '../auth/Login.html';
            }
        }

        window.onclick = function (event) {
            const detailModal = document.getElementById('detail-modal');
            const cartModal = document.getElementById('cart-modal');
            const checkoutModal = document.getElementById('checkout-modal');

            if (event.target == detailModal) {
                closeDetail();
            }
            if (event.target == cartModal) {
                closeCart();
            }
            if (event.target == checkoutModal) {
                closeCheckout();
            }
        }

        window.addEventListener('DOMContentLoaded', function () {
            loadData();
            renderEvents();
        });