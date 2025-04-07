
function goToLoginPage (){
    if(!window.sessionStorage.getItem("current_user_email")){
        window.location.href = window.location.origin + "/sign-in.html";
    }
};
goToLoginPage();

 // apply dark mode for cart page
var darkModeButton = document.querySelector(".dark-mode-button");
console.log(darkModeButton)
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
//================================================
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

/////////////////////adddto cart
var cartTable = document.getElementById("cart-items");
    var fPrice = document.querySelector("#finalPrice");
    var users = JSON.parse(localStorage.getItem("users"));
    var user = users.find(user => user.email === currentUserEmail);
document.addEventListener("DOMContentLoaded", function () {
    if (!user || !user.cart || user.cart.length === 0) {
        cartTable.innerHTML = "<tr><td colspan='5'>No items yet</td></tr>";
        fPrice.textContent = "0$";
        return;
    }

    cartTable.innerHTML = ''; // clear table
    var totalPrice = 0;
    user.cart.forEach((item, index) => {
        var row = document.createElement("tr");
        var itemQuantity = item.quantity || 1; 

        row.innerHTML = `
            <td class="product-details">
                <img src="${item.image}" alt="product img">
                <div class="para">
                    <p class="product-name" style=" color: var(--main-color);"><a href="#">${item.name}</a></p>
                    <p class="product-price">price: ${item.price}</p>
                </div>
            </td>
            <td>
                <div class="nth-table-td">
                    <i class="fa-solid fa-plus"></i>
                    <input type="number" min="1" readOnly value="${itemQuantity}" data-index="${index}" class="product-quantity">
                    <i class="fa-solid fa-minus"></i>
                </div>
            </td>
            <td class="total-price">
                <span class="totalSpan">Total price: </span>${item.price * itemQuantity}$
            </td>
            <td><i class="fa-solid fa-trash-can delete-icon" data-index="${index}"></i></td>
        `;

        cartTable.appendChild(row);
        totalPrice += item.price * itemQuantity;
    });

    fPrice.textContent = totalPrice.toFixed(2) + '$'; 

    document.querySelectorAll(".fa-plus").forEach((button, index) => {
        button.addEventListener("click", function () {
            var quantityInput = button.nextElementSibling; 
            var quantity = parseInt(quantityInput.value) + 1; 
            quantityInput.value = quantity;
            var item = user.cart[index];
            item.quantity = quantity;
            updateTotalPrice();
            updateUserCart(user);
        });
    });

    document.querySelectorAll(".fa-minus").forEach((button, index) => {
        button.addEventListener("click", function () {
            var quantityInput = button.previousElementSibling; 
            var quantity = parseInt(quantityInput.value) > 1 ? parseInt(quantityInput.value) - 1 : 1;
            quantityInput.value = quantity;

            var item = user.cart[index];
            item.quantity = quantity;
            updateTotalPrice();
            updateUserCart(user);
        });
    });
    document.querySelectorAll(".product-quantity").forEach(input => {
        input.addEventListener("change", function () {
            var index = this.getAttribute("data-index");
            var quantity = parseInt(this.value) || 1;
            user.cart[index].quantity = quantity;
            updateTotalPrice();
            updateUserCart(user);
        });
    });

    // Delete item from cart
    document.querySelectorAll(".delete-icon").forEach(button => {
        button.addEventListener("click", function () {
            var index = this.getAttribute("data-index");
            user.cart.splice(index, 1); 
            updateTotalPrice();
            updateUserCart(user);
        });
    });

    // Update the total price after quantity changes
    function updateTotalPrice() {
        let totalPrice = 0;
        user.cart.forEach(item => {
            totalPrice += item.price * (item.quantity || 1);
        });
        fPrice.textContent = totalPrice.toFixed(2) + '$'; 
    }
});

// Update cart in localStorage
function updateUserCart(user) {
    var users = JSON.parse(localStorage.getItem("users"));
    var updatedUsers = [];

    for (var i = 0; i < users.length; i++) {
        if (users[i].email === user.email) {
            updatedUsers.push(user);
        } else {
            updatedUsers.push(users[i]);
        }
    }

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    location.reload(); 
}
var backtoShop=document.getElementById("back-to-shop");
backtoShop.addEventListener("click",function(){
    location.assign("shop.html");
})
var backtohome=document.getElementById("back-to-home")
backtohome.addEventListener("click",function(){
    if(user.cart.length>0){
        user.cart=[];
        updateUserCart(user);
        alert("Your Booking has been confirmed thanks you for chossing us")
    }
    location.assign("index.html");
})

//////////////////////////////////////////////////////////////////////////
  
////////////////////////////////////////////////////////////////////////
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

// console.log(users)}
///////////////////////
//log out
var logoutButton = document.querySelector(".logout");

  logoutButton.addEventListener("click", function () {

    window.location.href = "../sign-in.html"; 
})




