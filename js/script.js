// Fetch Data From JSON using Fetch and JS Module type
import data from "./fetchData.js";
var productsData = data.products;

// ================== Go To Log In Page ======================

// Force User To Log In if there is no user

function goToLoginPage (){
    if(!window.sessionStorage.getItem("current_user_email")){
        window.location.href = window.location.origin + "/sign-in.html";
    }
};
goToLoginPage();
//===============================Home Page ============================================

// -------------Ghada-----------
// Deal of the weak Countdown Timer
function startCountDown(targetDate) {
    function updateTime() {
      var now = new Date().getTime();
      var remainingTime = targetDate - now;
  
      if (remainingTime < 0) {
        clearInterval(interval);
        document.querySelector(".countdown").innerHTML = `
              <h2 class="expired">Time Expired !</h2>`;
        return;
      }
  
      var days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  
      document.getElementById("days").innerText = days;
      document.getElementById("hours").innerText = hours;
      document.getElementById("minutes").innerText = minutes;
      document.getElementById("seconds").innerText = seconds;
    }
  
    updateTime();
    var interval = setInterval(updateTime, 1000);
  }
  
  const countdownDate = new Date("2025-04-12T00:00:00").getTime();
  startCountDown(countdownDate);
  
  
  // apply dark mode for home page ---------Ghada------------------
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
// ================================ Products Section =================================

// ===============================Start of section code====================================

// ========================== Abdelmonem Marei ===============================

function renderProducts(products) {
    
    var productsContainer = document.querySelector(".products-container");
    productsContainer.innerHTML = "";
    products.forEach(product => {
        var productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
                            <div class="product-item product-${product.id} ">
                                <a href="product.html?id=${product.id}">
                                    <div class="product discount product-filter">
                                        <div class="product-image">
                                            <img src="${product.image}" alt="product${product.id}">
                                        </div>
                                        <div class="favorite"></div>
                                        ${product.hasBadge ? `<div class="product-badge" style="background-color: ${product.badgeColor};"><span>${product.badgeContent}</span></div>` : ''}
                                        <div class="product-info">
                                            <h6 class="product-name">${product.name}</h6>
                                            <div class="product-price">$ ${product.price}${product.hasBadge ? `<span>$ ${product.oldPrice}</span>` : ''}</div>
                                        </div>
                                    </div>
                                    <button class="add-to-cart-button" data-id="${product.id}">add to cart</button>
                                </a>
                            </div>`;
        productsContainer.appendChild(productCard);
    });
}
renderProducts(productsData); // Initial render

function filterProducts(category) {
    var filteredProducts = category === "all" ? productsData : productsData.filter(product => product.category === category);
    console.log(filteredProducts);
    renderProducts(filteredProducts);
}

var filterButtons = document.querySelectorAll(".products-filter-button");
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(button => {
            button.classList.remove("active");
        });
        button.classList.add("active");
        var category = button.getAttribute("data-filter");
        filterProducts(category);
    });
});


/////////////////////////////////////////////////////////
// var addToCartButtons = document.querySelectorAll(".add-to-cart-button");
// addToCartButtons.forEach(button => {
//     button.addEventListener("click", function() {
        // event.preventDefault();
        // event.stopPropagation();
//         if(!window.localStorage.getItem("users")){
//             return;
//         }
//         if(!window.sessionStorage.getItem("current_user_email")){
//             return;
//         }

//         var users = JSON.parse(window.localStorage.getItem("users"));
//         var current_user_email = window.sessionStorage.getItem("current_user_email");
//         var user = users.filter(user => user.email === current_user_email);
//         var notUser = users.filter(user => user.email !== current_user_email);
//         var currentProduct = productsData.filter(product => product.id === button.getAttribute("data-id"));

//         user[0].cart.push(currentProduct[0]);
//         notUser.push(user[0]);
//         window.localStorage.setItem("users", JSON.stringify(notUser))
//     });
// });
var addToCartButtons = document.querySelectorAll(".add-to-cart-button");
addToCartButtons.forEach(button => {
    button.addEventListener("click", function () {
        event.preventDefault();
        event.stopPropagation();
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

// =====================================================================================

// log out
var logoutButton = document.querySelector(".logout");

  logoutButton.addEventListener("click", function () {

    window.location.href = "../sign-in.html"; 
})

//=============================================================
// welcome user

const userNameSpan = document.querySelector(".user-name");

  const currentUserEmail = window.sessionStorage.getItem("current_user_email");

  if (currentUserEmail) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const currentUser = users.find(user => user.email === currentUserEmail);

    if (currentUser) {
      userNameSpan.textContent = currentUser.name; 
    }
  }

//   =============================================
// notification ------Ghada---------
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

// =====================================================================================
//click to go cart
var cart=document.querySelector(".fa-shopping-cart");
cart.addEventListener("click",function(){
    location.assign("cart.html")
})
