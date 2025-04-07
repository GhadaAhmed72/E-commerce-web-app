
import data from "./fetchData.js";
var productsData = data.products;

var urlParams = new URLSearchParams(window.location.search);
var myParam = urlParams.get('category');


function goToLoginPage (){
    if(!window.sessionStorage.getItem("current_user_email")){
        window.location.href = window.location.origin + "/sign-in.html";
    }
};
goToLoginPage();
//=============================== Shop (Products) Page =============================================
// ==================================== Navbar & Sidebar =============================
  // apply dark mode for home page
  var darkModeButton = document.querySelector(".dark-mode-button");

  darkModeButton.addEventListener("click", () => {  
        if (window.sessionStorage.getItem("theme") === "dark") {
            window.sessionStorage.setItem("theme", "light");
        } 
        else if(window.sessionStorage.getItem("theme") === "light" || !window.sessionStorage.getItem("theme")){
            window.sessionStorage.setItem("theme", "dark");
        }
        window.location.reload();
    });
    // applyTheme
    function applyTheme(){
        var container = document.querySelector(".website-container");
    
        if(!window.sessionStorage.getItem("theme")){
            return;
        }
        else if(window.sessionStorage.getItem("theme") === "dark"){
            container.classList.add("dark");
        }else{
            container.classList.remove("dark");
        }
    }
    applyTheme();

// ==================================================================================

// ===============================Start of section code====================================
    

function renderProducts(products) {
    
    var productsContainer = document.querySelector(".products-container");
    productsContainer.innerHTML = "";
    if(products.length > 0 ){
        productsContainer.style.display = "grid"
        products.forEach(product => {
            var productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                                <div class="product-item product-${product.id} ">
                                    <div class="product discount product-filter">
                                        <div class="product-image">
                                            <img src="${product.image}" alt="product${product.id}">
                                        </div>
                                        <div class="favorite"></div>
                                        ${product.hasBadge ? `<div class="product-badge" style="background-color: ${product.badgeColor};"><span>${product.badgeContent}</span></div>` : ''}
                                        <div class="product-info">
                                            <h6 class="product-name"><a href="product.html?id=${product.id}">${product.name}</a></h6>
                                            <div class="product-price">$ ${product.price}${product.hasBadge ? `<span>$ ${product.oldPrice}</span>` : ''}</div>
                                        </div>
                                    </div>
                                    <button class="add-to-cart-button" data-id="${product.id}">add to cart</button>
                                </div>`;
            productsContainer.appendChild(productCard);
        })
    }
    else{
        productsContainer.style.display ="block"
        productsContainer.style.width = "98vw"
        productsContainer.style.textAlign = "center"
        productsContainer.innerHTML = "No Products Match To display"
    }
}
renderProducts(productsData); // Initial render

function updateProductsByOptionAndCategory(option="latest",category="all") {
    var filteredProducts = (category === "all") ? productsData : productsData.filter(product => product.category === category);
    var sortedProducts = [];
    switch (option) {
        case "latest":
            sortedProducts = filteredProducts.sort((a, b) => a.id - b.id);
            break;
        case "popularity":
            sortedProducts = filteredProducts.sort((a, b) => b.popularity - a.popularity);
            break;
        case "product-name":
            sortedProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "rating":  
            sortedProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case "price-asc":
            sortedProducts = filteredProducts.sort((a, b) => a.price - b.price);
            break; 
        case "price-desc":
            sortedProducts = filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case "discount":
            sortedProducts = filteredProducts.filter((product)=>product.hasDiscount);
            break;
        default:
            sortedProducts = filteredProducts.sort((a, b) => a.id - b.id);
            break;
    }
    renderProducts(sortedProducts);
}

if(myParam){
    var categoryOptions = document.querySelectorAll("#category option");
    categoryOptions.forEach(option => {
        if (option.value === myParam) {
            option.selected = true;
        }else{
            option.selected = false;
        }
    });
    updateProductsByOptionAndCategory("latest", myParam);
}

var categorySelect = document.getElementById("category");
var sortSelect = document.getElementById("sortby");

categorySelect.addEventListener("change", function() {
    var selectedCategory = categorySelect.value;
    var selectedOption = sortSelect.value;
    // urlParams.set('category', selectedCategory);
    // urlParams = urlParams.toString();
    updateProductsByOptionAndCategory( selectedOption, selectedCategory );
});

sortSelect.addEventListener("change", function() {
    var selectedOption = sortSelect.value;
    var selectedCategory = categorySelect.value;
    updateProductsByOptionAndCategory( selectedOption, selectedCategory );
})

var searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", function() {
    var searchInput = document.getElementById("search-input");
    var searchTerm = searchInput.value;
    var selectedCategory = categorySelect.value;
    sortSelect.value = "latest";
    var filteredProductsbyCategory = selectedCategory === "all" ? productsData : productsData.filter(product => product.category === selectedCategory);
    var filteredProductsbySearch = filteredProductsbyCategory.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    renderProducts(filteredProductsbySearch);
});



var addToCartButtons = document.querySelectorAll(".add-to-cart-button");
addToCartButtons.forEach(button => {
    button.addEventListener("click", function () {
        if (!window.localStorage.getItem("users")) return;
        if (!window.sessionStorage.getItem("current_user_email")) return;

        var users = JSON.parse(window.localStorage.getItem("users"));
        var current_user_email = window.sessionStorage.getItem("current_user_email");

        var user = users.find(user => user.email === current_user_email);
        var notUser = users.filter(user => user.email !== current_user_email);

        var productId = button.getAttribute("data-id");
        var currentProduct = productsData.find(product => product.id === productId);

        if (!user.cart) user.cart = [];

        // check if product already in cart
        var existingItem = user.cart.find(item => item.id === currentProduct.id);

        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            currentProduct.quantity = 1;
            user.cart.push(currentProduct);
        }

        notUser.push(user);
        alert("The product has been added to the cart sucessfully!")
        window.localStorage.setItem("users", JSON.stringify(notUser));
        
    });
});


//=============================================
// logout button
var logoutButton = document.querySelector(".logout");

  logoutButton.addEventListener("click", function () {

    window.location.href = "../sign-in.html"; 
})

//============================================
// user name
const userNameSpan = document.querySelector(".user-name");

  const currentUserEmail = window.sessionStorage.getItem("current_user_email");

  if (currentUserEmail) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const currentUser = users.find(user => user.email === currentUserEmail);

    if (currentUser) {
      userNameSpan.textContent = currentUser.name; 
    }
  }

//   ==================================
////////////notification
var addToCartButtons = document.querySelectorAll(".add-to-cart-button");
var notification = document.querySelector(".notification");

function updateCartNotification() {
    console.log("Updating cart notification...");
    
    if (!notification) {
        console.error("Notification element not found in DOM");
        return;
    }

    if (!window.localStorage.getItem("users") || !window.sessionStorage.getItem("current_user_email")) {
        notification.style.display = "none";
        console.log("No users in localStorage or no signed-in user in sessionStorage");
        return;
    }

    var users = JSON.parse(window.localStorage.getItem("users"));
    var current_user_email = window.sessionStorage.getItem("current_user_email");
    console.log("Current user email:", current_user_email);
    console.log("Users from localStorage:", users);

    var user = users.find(user => user.email === current_user_email);

    if (!user || !user.cart) {
        notification.style.display = "none";
        console.log("User not found or no cart exists");
        return;
    }

    console.log("User cart:", user.cart);
    if (user.cart.length > 0) {
        notification.style.display = "flex";
        notification.textContent = user.cart.length;
        console.log("Showing notification with", user.cart.length, "items");
    } else {
        notification.style.display = "none";
        console.log("Cart empty, hiding notification");
    }
}
updateCartNotification();

addToCartButtons.forEach(button => {
    button.addEventListener("click", function() {
        if (!window.localStorage.getItem("users") || !window.sessionStorage.getItem("current_user_email")) {
            console.log("Add to cart blocked: No signed-in user");
            return;
        }

        var users = JSON.parse(window.localStorage.getItem("users"));
        var current_user_email = window.sessionStorage.getItem("current_user_email");
        var userIndex = users.findIndex(user => user.email === current_user_email);

        if (userIndex === -1) {
            console.log("User not found in localStorage");
            return;
        }

        var currentProductId = button.getAttribute("data-id");
        var currentProduct = productsData.find(product => product.id === currentProductId);

        if (!currentProduct) {
            console.log("Product not found:", currentProductId);
            return;
        }

        var user = users[userIndex];

        if (!user.cart) {
            user.cart = [];
        }
        var isProductInCart = user.cart.some(product => product.id === currentProductId);

        if (!isProductInCart) {
            user.cart.push(currentProduct);
            users[userIndex] = user;
            window.localStorage.setItem("users", JSON.stringify(users));
            console.log("Product added:", currentProduct);
        }

        updateCartNotification();
    });
});

/////////////////////////////////////
///addd cart
//click to go cart
var cart = document.querySelector(".fa-shopping-cart");
cart.addEventListener("click",function(){
    location.assign("cart.html")
})
//////////////////////////////////////////////////////
