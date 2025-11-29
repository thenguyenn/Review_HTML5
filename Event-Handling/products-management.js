const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const addButton = document.getElementById('btn-add');
const productList = document.getElementById('product-list');

addButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    if (name && !isNaN(price)) {
        const rowCount = productList.getElementsByTagName('tr').length;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rowCount + 1}</td>
            <td>${name}</td>
            <td>${price}</td>
            <td><button class="btn-delete">Delete</button></td>
        `;
        productList.appendChild(row);
        nameInput.value = '';
        priceInput.value = '';
        nameInput.focus();
    }
});

productList.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-delete')) {
        const row = event.target.closest('tr');
        productList.removeChild(row);
    }
});


