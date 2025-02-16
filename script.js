//'script.js'
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const cartSection = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const viewCartBtn = document.getElementById('view-cart-btn');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const checkoutBtn = document.getElementById('checkout-btn');

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });

    productList.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            addToCart(parseInt(event.target.dataset.id));
        }
    });

    viewCartBtn.addEventListener('click', () => {
        cartSection.classList.toggle('hidden');
        updateCartDisplay();
    });

    clearCartBtn.addEventListener('click', () => {
        clearCart();
    });

    checkoutBtn.addEventListener('click', () => {
        alert(`Checkout Total: $${calculateTotal().toFixed(2)}`);
    });
});

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');
    cartItemsDiv.innerHTML = '';
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <span>${item.name}</span>
            <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input">
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    cartTotalDiv.textContent = `Total: $${calculateTotal().toFixed(2)}`;

    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (event) => {
            updateQuantity(parseInt(event.target.dataset.id), parseInt(event.target.value));
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (event) => {
            removeItem(parseInt(event.target.dataset.id));
        });
    });
}