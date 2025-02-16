// cart.js
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartCount();
        updateCartDisplay();
    }
}

function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity > 0) {
            item.quantity = quantity;
            updateCartDisplay();
        } else {
            removeItem(productId);
        }
    }
}

function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
}

function clearCart() {
    cart = [];
    updateCartCount();
    updateCartDisplay();
}

function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.reduce((total, item) => total + item.quantity, 0);
}