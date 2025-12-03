// Load data from localStorage
function loadData() {
    const savedEvents = localStorage.getItem('events');
    const savedUsers = localStorage.getItem('users');
    const savedTickets = localStorage.getItem('tickets');
    
    if (savedEvents) events = JSON.parse(savedEvents);
    if (savedUsers) users = JSON.parse(savedUsers);
    if (savedTickets) tickets = JSON.parse(savedTickets);
    
    // Update counters
    if (savedEvents) {
        const parsedEvents = JSON.parse(savedEvents);
        eventIdCounter = Math.max(...parsedEvents.map(e => e.id), 0) + 1;
    }
    if (savedUsers) {
        const parsedUsers = JSON.parse(savedUsers);
        userIdCounter = Math.max(...parsedUsers.map(u => u.id), 0) + 1;
    }
    if (savedTickets) {
        const parsedTickets = JSON.parse(savedTickets);
        ticketIdCounter = Math.max(...parsedTickets.map(t => t.id), 0) + 1;
    }
}

var totalEvents = document.getElementById('total-events');
var totalUsers = document.getElementById('total-users');
var totalTickets = document.getElementById('total-tickets');

function showSection(section) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(s => s.classList.remove('active'));

    const navItems = document.querySelectorAll('.sidebar nav a');
    navItems.forEach(n => n.classList.remove('active'));

    document.getElementById('section-' + section).classList.add('active');
    document.getElementById('nav-' + section).classList.add('active');
}

function updateWidgets() {
    totalEvents.textContent = events.length;
    totalUsers.textContent = users.length;
    totalTickets.textContent = tickets.reduce((sum, ticket) => sum + parseInt(ticket.sold), 0);
}
function logout() {
            if (confirm('Bạn có chắc muốn đăng xuất?')) {
                localStorage.removeItem('loggedInUser');
                window.location.href = '../auth/Login.html';
            }
        }
        
// Load data when page loads
window.addEventListener('DOMContentLoaded', function() {
    loadData();
    renderEvents();
    renderUsers();
    renderTickets();
    updateWidgets();
    showSection('events');
});