/*Dark mode*/ 

function goToLoginPage (){
    if(!window.sessionStorage.getItem("current_user_email")){
        window.location.href = window.location.origin + "/sign-in.html";
    }
};

goToLoginPage();

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
// ===========================================================
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

// ============================================================
// logout 
var logoutButton = document.querySelector(".logout");

  logoutButton.addEventListener("click", function () {

    window.location.href = "../sign-in.html"; 
})

// ========================================================
  // Notification 
  const notification = document.querySelector(".notification");


  function updateCartNotification() {
      console.log("Updating cart notification...");

      if (!notification) {
          console.error("Notification element not found in DOM");
          return;
      }

      const currentUserEmail = sessionStorage.getItem("current_user_email");
      if (!currentUserEmail || !localStorage.getItem("users")) {
          notification.textContent = "0"; 
          notification.style.display = "none"; 
          console.log("No signed-in user or no users in localStorage");
          return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(user => user.email === currentUserEmail);

      if (!user || !user.cart || user.cart.length === 0) {
          notification.textContent = "0";
          notification.style.display = "none";
          console.log("User has no cart or cart is empty");
          return;
      }

      notification.textContent = user.cart.length;
      notification.style.display = "flex";
      console.log("Notification updated to:", user.cart.length);
  }

  updateCartNotification();



  //click to go cart
var cart = document.querySelector(".fa-shopping-cart");
cart.addEventListener("click",function(){
    location.assign("cart.html")
})