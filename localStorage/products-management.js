const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const addButton = document.getElementById('btn-add');
const productList = document.getElementById('product-list');

let products = [];

async function loadProducts() {
    try {
        const stored = localStorage.getItem('products');
        if (stored) {
            products = JSON.parse(stored);
        }
        renderProducts();
    } catch (error) {
        console.error("Lỗi khi đọc localStorage:", error);
        products = [];
    }
}

async function saveProducts() {
    try {
        localStorage.setItem('products', JSON.stringify(products));
    } catch (error) {
        console.error("Lỗi khi lưu localStorage:", error);
    }
}
function renderProducts() {
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><button class="btn-delete" data-index="${index}">Delete</button></td>
        `;
        productList.appendChild(row);
    });
}

addButton.addEventListener('click', async () => {
    try {
        const name = nameInput.value.trim();
        const price = parseFloat(priceInput.value);
        if (name && !isNaN(price)) {
            products.push({ name, price });
            await saveProducts(); 
            renderProducts();
            nameInput.value = '';
            priceInput.value = '';
            nameInput.focus();
        }
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
    }
});

productList.addEventListener('click', async (event) => {
    try {
        if (event.target.classList.contains('btn-delete')) {
            const index = event.target.getAttribute('data-index');
            products.splice(index, 1);
            await saveProducts();
            renderProducts();
        }
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
    }
});

loadProducts();