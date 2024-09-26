document.addEventListener('DOMContentLoaded', () => {
    let productsInCart = localStorage.getItem("productsincard");
    let favouriteProducts = JSON.parse(localStorage.getItem("favouriteProducts")) || [];

    if (productsInCart) {
        let items = JSON.parse(productsInCart);
        drawCartProducts(items);
        updateTotalPrice(items);
    }

    drawFavouriteProducts(favouriteProducts);
});

function drawCartProducts(items) {
    let allProducts = document.querySelector(".products");

    let productHTML = items.map((item) => `
    <div class="card" id="product-${item.id}">
        <div class="image_container">
            <img src="${item.Image}" alt="">
        </div> 
        <div class="action">
            <div class="price">
                <span>Name: </span>
                <span>${item.title}</span>
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
            <div class="quantity-control">
                <button class="btn btn-dark" onclick="decreaseCartQuantity(${item.id})">-</button>
                <span id="cart-quantity-${item.id}">${item.quantity}</span>
                <button class="btn btn-dark" onclick="increaseCartQuantity(${item.id})">+</button>
            </div>
        </div>
        <button class="cart-button btn btn-danger" onclick="removeFromCart(${item.id})">
            <svg class="cart-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" stroke-linejoin="round" stroke-linecap="round"></path>
            </svg>
            <span>Remove from cart</span>
        </button>
    </div>
    `).join("");

    allProducts.innerHTML = productHTML;

    // Create a container div for the total price
    let totalContainer = document.createElement('div');
    totalContainer.style.width = '100%';
    totalContainer.style.display = 'flex';
    totalContainer.style.justifyContent = 'center';
    totalContainer.style.marginTop = '20px';

    let totalDiv = document.createElement('div');
    totalDiv.id = 'total-price';
    totalDiv.className = 'total-price';
    totalContainer.appendChild(totalDiv);

    allProducts.appendChild(totalContainer);
    updateTotalPrice(items);
}


function drawFavouriteProducts(items) {
    let favouriteSection = document.querySelector(".swiper-wrapper");

    let productHTML = items.map((item) => `
    <div class="swiper-slide card" id="favourite-${item.id}">
        <div class="image_container">
            <img src="${item.Image}" alt="">
        </div> 
        <div class="action">
            <div class="price">
                <span>Name: </span>
                <span>${item.title}</span>
            </div>
            <div class="price ms-auto">
                <span><i class="bi bi-heart-fill" style="color:red;"></i></span>
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
    </div>
    `).join("");

    favouriteSection.innerHTML = productHTML;

    // Initialize Swiper after adding favourite products
    new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        }
    });
}

function updateTotalPrice(items) {
    let totalPrice = items.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
    document.getElementById('total-price').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
}

function removeFromCart(id) {
    let productsInCart = localStorage.getItem("productsincard");
    let items = JSON.parse(productsInCart) || [];

    let index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
        items.splice(index, 1);
        localStorage.setItem("productsincard", JSON.stringify(items));
        document.getElementById(`product-${id}`).remove();
        updateTotalPrice(items);
    }
}

function increaseCartQuantity(id) {
    let quantityElement = document.getElementById(`cart-quantity-${id}`);
    let currentQuantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = currentQuantity + 1;
    updateCartQuantity(id, currentQuantity + 1);
}

function decreaseCartQuantity(id) {
    let quantityElement = document.getElementById(`cart-quantity-${id}`);
    let currentQuantity = parseInt(quantityElement.textContent);
    if (currentQuantity > 1) {
        quantityElement.textContent = currentQuantity - 1;
        updateCartQuantity(id, currentQuantity - 1);
    }
}

function updateCartQuantity(id, newQuantity) {
    let cartItems = JSON.parse(localStorage.getItem("productsincard")) || [];
    let item = cartItems.find(cartItem => cartItem.id === id);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem("productsincard", JSON.stringify(cartItems));
        updateTotalPrice(cartItems);
    }
}
