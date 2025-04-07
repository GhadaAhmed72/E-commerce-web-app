import data from "./fetchData.js";
var productsData = data.products;

function goToLoginPage() {
  if (!window.sessionStorage.getItem("current_user_email")) {
    window.location.href = window.location.origin + "/sign-in.html";
  }
}
goToLoginPage();

var darkModeButton = document.querySelector(".dark-mode-button");
darkModeButton.addEventListener("click", () => {
  if (window.sessionStorage.getItem("theme") === "dark") {
    window.sessionStorage.setItem("theme", "light");
  } else if (
    window.sessionStorage.getItem("theme") === "light" ||
    !window.sessionStorage.getItem("theme")
  ) {
    window.sessionStorage.setItem("theme", "dark");
  }
  window.location.reload();
});
// applyTheme
function applyTheme() {
  var container = document.querySelector(".website-container");

  if (!window.sessionStorage.getItem("theme")) {
    return;
  } else if (window.sessionStorage.getItem("theme") === "dark") {
    container.classList.add("dark");
  } else {
    container.classList.remove("dark");
  }
}
applyTheme();
// ================================================
// welcome user

const userNameSpan = document.querySelector(".user-name");

const currentUserEmail = window.sessionStorage.getItem("current_user_email");

if (currentUserEmail) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const currentUser = users.find((user) => user.email === currentUserEmail);

  if (currentUser) {
    userNameSpan.textContent = currentUser.name;
  }
}

/////////////////////////////////////
///get items from local
var urlParams = new URLSearchParams(window.location.search);
var myParam = urlParams.get("id");
var product = productsData.filter((product) => product.id === myParam)[0];
console.log(product);

var productContainer = document.querySelector(".productItemContainer");

productContainer.innerHTML = `
        <div class="img-product">
            <img src="${product.image}" id="product-image" alt="">
        </div>
        <div class="product-content-details">
            <h2 class="product-name" id="product-name">${product.name}</h2>
            <p class="product-details-content" id="product-info">${product.description}</p>
            <p class="product-icon-car"><i class="fa-solid fa-truck-moving" style="color: white; font-size: 20px;"></i></p>
            <div class="product-detils-rate">
                <p class="product-price" id="product-price">$ ${product.price}</p>
                <div class="star_rating">
                    <p>rating</p>
                    <p>${product.rating}</p>
                    <i class="fa fa-star" aria-hidden="true"></i>
                </div>
            </div>
            <div class="quantity">
                <i class="fa-solid fa-minus" style="color: red; margin-right:10px"></i>
                <input type="text" min="1" value="1" id="inputIncrease" style="padding:5px ; width:70px ; text-align:center" readonly min="0" max="100">
                <i class="fa-solid fa-plus" style="color: green; margin-left:10px"></i>

                <button class="add-to-cart-button ">Add to cart</button>
            </div>
        </div>
      `;
document
  .querySelector(".add-to-cart-button")
  .addEventListener("click", function () {
    var users = JSON.parse(window.localStorage.getItem("users"));
    var current_user_email =
      window.sessionStorage.getItem("current_user_email");
    var user = users.find((user) => user.email === current_user_email);
    var notUser = users.filter((user) => user.email !== current_user_email);
    if (!user.cart) user.cart = [];

    var quantityInput = document.getElementById("inputIncrease");
    var quantity = parseInt(quantityInput.value) || 1;
    var existingItem = user.cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + quantity;
    } else {
      var newProduct = { ...product, quantity: quantity };
      user.cart.push(newProduct);
    }
    notUser.push(user);
    window.localStorage.setItem("users", JSON.stringify(notUser));

    alert("Product added to cart with quantity: " + quantity);
  });

/////////////////////////

// notification
var addToCartButton = document.querySelector(".add-to-cart-button");
var notification = document.querySelector(".notification");

function updateCartNotification() {
  console.log("Updating cart notification...");

  if (!notification) {
    console.error("Notification element not found in DOM");
    return;
  }

  if (
    !window.localStorage.getItem("users") ||
    !window.sessionStorage.getItem("current_user_email")
  ) {
    notification.style.display = "none";
    console.log(
      "No users in localStorage or no signed-in user in sessionStorage"
    );
    return;
  }
  //////////////////////////////
  var users = JSON.parse(window.localStorage.getItem("users"));
  var current_user_email = window.sessionStorage.getItem("current_user_email");
  console.log("Current user email:", current_user_email);
  console.log("Users from localStorage:", users);

  var user = users.find((user) => user.email === current_user_email);

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

addToCartButton.addEventListener("click", function () {
  if (
    !window.localStorage.getItem("users") ||
    !window.sessionStorage.getItem("current_user_email")
  ) {
    console.log("Add to cart blocked: No signed-in user");
    return;
  }

  var users = JSON.parse(window.localStorage.getItem("users"));
  var current_user_email = window.sessionStorage.getItem("current_user_email");
  var userIndex = users.findIndex((user) => user.email === current_user_email);

  if (userIndex === -1) {
    console.log("User not found in localStorage");
    return;
  }

  var currentProductId = myParam;
  var currentProduct = productsData.find(
    (product) => product.id === currentProductId
  );

  if (!currentProduct) {
    console.log("Product not found:", currentProductId);
    return;
  }

  var user = users[userIndex];

  if (!user.cart) {
    user.cart = [];
  }
  var isProductInCart = user.cart.some(
    (product) => product.id === currentProductId
  );

  if (!isProductInCart) {
    user.cart.push(currentProduct);
    users[userIndex] = user;
    window.localStorage.setItem("users", JSON.stringify(users));
    console.log("Product added:", currentProduct);
  }

  updateCartNotification();
  location.assign("cart.html");
});
//////////////////////////////////////////////////////////////////////////////
var faPlus = document.querySelector(".fa-plus");
var faMinuse = document.querySelector(".fa-minus");
var count = 1;
var inputIncrease = document.querySelector("#inputIncrease");
faPlus.addEventListener("click", function () {
  inputIncrease.value = count;
  count++;
});
faMinuse.addEventListener("click", function () {
  if (count > 0) {
    --count;
    inputIncrease.value = count;
  }
});
///////////////////////////////////////
console.log(faMinuse);
console.log(faPlus);
////////////////////////////////

////////////////////////////////
///go to cart
var cart = document.querySelector(".fa-shopping-cart");
cart.addEventListener("click", function () {
  location.assign("cart.html");
});
