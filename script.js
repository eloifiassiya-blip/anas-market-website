let cart = [];

// Display products
function displayProducts(productsList){
    const container = document.getElementById("products");
    container.innerHTML = "";

    productsList.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        const imageSrc = `images/${product.category}/placeholder.svg`;

        card.innerHTML = `
            <img src="${imageSrc}" alt="${product.name.en}">
            <h3>${product.name.en}</h3>
            <p>${product.price} DH</p>
            <button onclick="addToCart(${product.id})">Add to cart</button>
        `;

        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (typeof products === 'undefined') {
        console.error('products is not defined. Check that product.js is loaded and contains the products array.');
        return;
    }
    displayProducts(products);
    if (typeof updateCart === 'function') updateCart();
});

function addToCart(id){
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if(existing){
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity:1
        });
    }
    updateCart();
}

function updateCart(){
    const cartCount = document.getElementById("cart-count");
    const floatingCount = document.getElementById("floating-cart-count");
    const floatingTotal = document.getElementById("floating-cart-total");
    const floating = document.getElementById("floating-cart");
    const count = cart.reduce((total,item)=> total + item.quantity, 0);
    cartCount.textContent = count;
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach(item=>{
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <p>${item.name.en} x${item.quantity} = ${item.price * item.quantity} DH</p>
        `;
    });
    document.getElementById("total").textContent = total;
    if(floating){
        if(cart.length === 0){
            floating.style.display = "none";
        } else {
            floating.style.display = "flex";
            if(floatingCount) floatingCount.textContent = count;
            if(floatingTotal) floatingTotal.textContent = total + " DH";
        }
    }
}

function openCart(){
    document.getElementById("cart").style.display="block";
}

function closeCart(){
    document.getElementById("cart").style.display="none";
}

function searchProducts(){
    const value = document.getElementById("search").value.toLowerCase();
    const filtered = products.filter(product => product.name.en.toLowerCase().includes(value));
    displayProducts(filtered);
}

function showCategory(category){
    const filtered = products.filter(product => product.category === category);
    displayProducts(filtered);
}

function sendWhatsApp(){
    if(cart.length === 0){
        alert("Your cart is empty");
        return;
    }
    let message = "Hello, I want to order:%0A%0A";
    let total = 0;
    cart.forEach(item=>{
        message += `${item.name.en} x${item.quantity} = ${item.price * item.quantity} DH%0A`;
        total += item.price * item.quantity;
    });
    message += `%0ATotal: ${total} DH`;
    const phone = "212624226942";
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}

function changeLanguage(language){
    console.log("Language:", language);
}
