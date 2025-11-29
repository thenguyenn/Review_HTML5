        function showSection(section) {
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(s => s.classList.remove('active'));

            const navItems = document.querySelectorAll('.sidebar nav a');
            navItems.forEach(n => n.classList.remove('active'));

            document.getElementById('section-' + section).classList.add('active');
            document.getElementById('nav-' + section).classList.add('active');
        }

        function updateWidgets() {
            document.getElementById('total-events').textContent = events.length;
            document.getElementById('total-users').textContent = users.length;
            document.getElementById('total-tickets').textContent =
                tickets.reduce((sum, ticket) => sum + parseInt(ticket.sold), 0);
        }