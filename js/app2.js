let allproducts = document.querySelector(".products");
let cartProductDiv = document.querySelector(".display-products .d-flex");
let products = [
    {
        id: 1,
        title: "hair-bow",
        price: "8$",
        Image: "images/app1.png",
        NameCatogry: "accessories",
    },
    {
        id: 2,
        title: "brush",
        price: "9$",
        Image: "images/app8.png",
        NameCatogry: "make-up",
    },
    {
        id: 3,
        title: "gold-watch",
        price: "20$",
        Image: "images/app3.png",
        NameCatogry: "accessories",
    },
    {
        id: 4,
        title: "silver-watch",
        price: "25$",
        Image: "images/app4.png",
        NameCatogry: "accessories",
    },
    {
        id: 5,
        title: "lipstick",
        price: "15$",
        Image: "images/app9.png",
        NameCatogry: "make-up",
    },
    {
        id: 6,
        title: "dress",
        price: "50$",
        Image: "images/app6.png",
        NameCatogry: "clothes",
    },
];

function drawItems(items) {
    let favouriteProducts = JSON.parse(localStorage.getItem("favouriteProducts")) || [];
    
    let y = items.map((item) => {
        let isFavourite = favouriteProducts.some(fav => fav.id === item.id);
        let heartClass = isFavourite ? 'bi-heart-fill filled-heart' : 'bi-heart';

        return `
        <div class="card">
            <div class="image_container">
                <img src="${item.Image}" alt="">
            </div>
            <div class="action">
                <div class="price">
                    <span>Name: </span>
                    <span>${item.title}</span>
                </div>
                <div class="price ms-auto">
                    <span><i class="bi ${heartClass}" onclick="addToFavourites(${item.id})"></i></span>
                </div>
            </div>
            <div class="action">
                <div class="price">
                    <span>Price: </span>
                    <span>${item.price}</span>
                </div>
            </div>
            <div class="action">
                <div class="price">
                    <span>Category: </span>
                    <span>${item.NameCatogry}</span>
                </div>
            </div>
            <div class="action">
                <div class="quantity-control d-none">
                    <button class="btn btn-secondary" onclick="decreaseQuantity(${item.id})">-</button>
                    <span id="quantity-${item.id}">1</span>
                    <button class="btn btn-secondary" onclick="increaseQuantity(${item.id})">+</button>
                </div>
            </div>
            <button class="cart-button btn btn-primary" id="cart-button-${item.id}" onclick="toggleCartButton(${item.id})">
                <svg class="cart-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" stroke-linejoin="round" stroke-linecap="round"></path>
                </svg>
                <span>Add to cart</span>
            </button>
        </div>
        `;
    }).join("");
    allproducts.innerHTML = y;
    updateCartButtonsState();
}

function addToFavourites(id) {
    let item = products.find(product => product.id === id);
    if (item) {
        let favouriteProducts = JSON.parse(localStorage.getItem("favouriteProducts")) || [];
        let heartIcon = document.querySelector(`.bi-heart[onclick="addToFavourites(${id})"], .bi-heart-fill[onclick="addToFavourites(${id})"]`);

        if (!favouriteProducts.some(fav => fav.id === item.id)) {
            favouriteProducts.push(item);
            localStorage.setItem("favouriteProducts", JSON.stringify(favouriteProducts));
            heartIcon.classList.remove('bi-heart');
            heartIcon.classList.add('bi-heart-fill', 'filled-heart');
        } else {
            favouriteProducts = favouriteProducts.filter(fav => fav.id !== item.id);
            localStorage.setItem("favouriteProducts", JSON.stringify(favouriteProducts));
            heartIcon.classList.remove('bi-heart-fill', 'filled-heart');
            heartIcon.classList.add('bi-heart');
        }
    }
}

function updateCartButtonsState() {
    let cartItems = JSON.parse(localStorage.getItem("productsincard")) || [];
    products.forEach(product => {
        let button = document.getElementById(`cart-button-${product.id}`);
        if (button) {
            let inCart = cartItems.some(item => item.id === product.id);
            if (inCart) {
                button.innerHTML = `<svg class="cart-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" stroke-linejoin="round" stroke-linecap="round"></path>
                                    </svg> <span>Remove from cart</span>`;
                button.classList.remove('btn-primary');
                button.classList.add('btn-danger');
            } else {
                button.innerHTML = `<svg class="cart-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" stroke-linejoin="round" stroke-linecap="round"></path>
                                    </svg> <span>Add to cart</span>`;
                button.classList.remove('btn-danger');
                button.classList.add('btn-primary');
            }
        }
    });
}

function filterProducts() {
    let input = document.getElementById('myInput').value.toLowerCase();
    let filterBy = document.querySelector('input[name="radio"]:checked').id;
    let filteredProducts = products.filter(product => {
        if (filterBy === "filterByName") {
            return product.title.toLowerCase().includes(input);
        } else if (filterBy === "filterByCategory") {
            return product.NameCatogry && product.NameCatogry.toLowerCase().includes(input);
        } else if (filterBy === "filterByPrice") {
            return product.price.toLowerCase().includes(input);
        }
    });
    drawItems(filteredProducts);
}

document.querySelectorAll('input[name="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
        document.getElementById('myInput').value = '';
        drawItems(products);
    });
});

document.getElementById('myInput').addEventListener('keyup', filterProducts);

drawItems(products);

function removeFromCart(id) {
    let cartItems = JSON.parse(localStorage.getItem("productsincard")) || [];
    cartItems = cartItems.filter(item => item.id !== id);

    localStorage.setItem("productsincard", JSON.stringify(cartItems));
    drawCartItems(cartItems);
    updateCartButtonsState();
}

document.addEventListener('DOMContentLoaded', () => {
    let userEmail = localStorage.getItem("email");
    console.log("User Email on page load:", userEmail);

    drawItems(products);
    updateCartButtonsState();
});

function increaseQuantity(id) {
    let quantityElement = document.getElementById(`quantity-${id}`);
    let currentQuantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = currentQuantity + 1;
    updateCartQuantity(id, currentQuantity + 1);
}

function decreaseQuantity(id) {
    let quantityElement = document.getElementById(`quantity-${id}`);
    let currentQuantity = parseInt(quantityElement.textContent);
    if (currentQuantity > 1) {
        quantityElement.textContent = currentQuantity - 1;
        updateCartQuantity(id, currentQuantity - 1);
    }
}

function toggleCartButton(id) {
    let userEmail = localStorage.getItem("email");

    if (!userEmail) {
        console.log("No email found, redirecting to login.");
        window.location.href = "app2login.html";
        return;
    }

    let button = document.getElementById(`cart-button-${id}`);
    let quantityElement = document.getElementById(`quantity-${id}`);
    let quantity = parseInt(quantityElement.textContent);

    if (button.textContent.includes("Add to cart")) {
        addToCart(id, quantity);
        button.innerHTML = `<svg class="cart-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" stroke-linejoin="round" stroke-linecap="round"></path>
        </svg> <span>Remove from cart</span>`;
        button.classList.remove('btn-primary');
        button.classList.add('btn-danger');
    } else {
        removeFromCart(id);
        button.innerHTML = `<svg class="cart-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" stroke-linejoin="round" stroke-linecap="round"></path>
        </svg> <span>Add to cart</span>`;
        button.classList.remove('btn-danger');
        button.classList.add('btn-primary');
    }
}

function updateCartQuantity(id, newQuantity) {
    let cartItems = JSON.parse(localStorage.getItem("productsincard")) || [];
    let item = cartItems.find(cartItem => cartItem.id === id);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem("productsincard", JSON.stringify(cartItems));
    }
}

function drawCartItems(cartItems) {
    cartProductDiv.innerHTML = '';
    cartItems.forEach(item => {
        cartProductDiv.innerHTML += `
            <div class="cart-item row align-items-center">
                <div class="col-6">
                    <span>${item.title}</span>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <div class="quantity-control d-flex align-items-center">
                        <button class="btn btn-secondary" onclick="decreaseCartItemQuantity(${item.id})">-</button>
                        <span id="cart-quantity-${item.id}" class="mx-2">${item.quantity}</span>
                        <button class="btn btn-secondary" onclick="increaseCartItemQuantity(${item.id})">+</button>
                    </div>
                </div>
            </div>
        `;
    });

    let badge = document.querySelector(".badge");
    if (cartItems.length > 0) {
        badge.style.display = "block";
        badge.innerHTML = cartItems.length;
    } else {
        badge.style.display = "none";
    }
}

function increaseCartItemQuantity(id) {
    let cartItems = JSON.parse(localStorage.getItem("productsincard")) || [];
    let item = cartItems.find(cartItem => cartItem.id === id);
    if (item) {
        item.quantity += 1;
        localStorage.setItem("productsincard", JSON.stringify(cartItems));
        document.getElementById(`cart-quantity-${id}`).textContent = item.quantity;
    }
}

function decreaseCartItemQuantity(id) {
    let cartItems = JSON.parse(localStorage.getItem("productsincard")) || [];
    let item = cartItems.find(cartItem => cartItem.id === id);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("productsincard", JSON.stringify(cartItems));
        document.getElementById(`cart-quantity-${id}`).textContent = item.quantity;
    } else if (item && item.quantity === 1) {
        removeFromCart(id);
    }
}

let badge = document.querySelector(".badge");
let additem = localStorage.getItem("productsincard") ? JSON.parse(localStorage.getItem("productsincard")) : [];

if (additem) {
    additem.map(item => {
        cartProductDiv.innerHTML += `<span>${item.title}</span>`;
    });
    badge.style.display = "block";
    badge.innerHTML = additem.length;
}

let shoppingCartIcon = document.getElementById("shoppingCartButton");
let cartproducts = document.querySelector(".display-products");
shoppingCartIcon.addEventListener("click", toggleDisplayProducts);

function toggleDisplayProducts() {
    const displayProductsDiv = document.getElementById('display-products');
    displayProductsDiv.style.display = displayProductsDiv.style.display === 'none' ? 'block' : 'none';
}

const displayProductsDiv = document.getElementById('display-products');
displayProductsDiv.style.display = 'none';

function handleScroll() {
    if (window.scrollY > 10) {
        displayProductsDiv.classList.add('fixed-top');
    } else {
        displayProductsDiv.classList.remove('fixed-top');
    }
}

window.addEventListener('scroll', handleScroll);

function addToCart(id, quantity) {
    let cartItems = JSON.parse(localStorage.getItem("productsincard")) || [];
    let item = products.find(product => product.id === id);
    if (item) {
        let cartItem = cartItems.find(cartItem => cartItem.id === id);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cartItems.push({ ...item, quantity: quantity });
        }
        localStorage.setItem("productsincard", JSON.stringify(cartItems));
        drawCartItems(cartItems);
        updateCartButtonsState();
    }
}
