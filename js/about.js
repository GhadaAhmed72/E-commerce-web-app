// -------------Ghada-----------

function goToLoginPage (){
    if(!window.sessionStorage.getItem("current_user_email")){
        window.location.href = window.location.origin + "/sign-in.html";
    }
};
goToLoginPage();

/*Dark mode*/ 
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
/*========================================= */
/*Logout */
var logoutButton = document.querySelector(".logout");

logoutButton.addEventListener("click", function () {

  window.location.href = "../sign-in.html"; 
})


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

const countdownDate = new Date("2025-04-07T00:00:00").getTime();
startCountDown(countdownDate);

// ==========================
// notification
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

updateCartNotification();
// =========================================
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



//click to go cart
var cart = document.querySelector(".fa-shopping-cart");
cart.addEventListener("click",function(){
    location.assign("cart.html")
})