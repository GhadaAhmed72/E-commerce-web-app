// ---------Steps To Refresh requirements (just for indication )----------
// 1) user validation
// 2) after validation store into session storge (current_user_email: email)
// -------- window.sessionStorage.setItem("current_user_email",email)

//=============================== Sign In Page ==========================================


function login() {
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(function (element) {
      element.textContent = '';
    });
  
    // Get the email and password input fields
    var email = document.getElementById("login-email");
    var password = document.getElementById("login-password");
  
    // Get users from localStorage
    var users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Check if the email exists and the password matches
    var user = users.find(function (user) {
      return user.email === email.value && user.password === password.value;
    });
  
    // If user exists and the password matches, log the user in
    if (user) {
      event.preventDefault();
      // Redirect to the index page (or any other page)
      window.location.href = `${window.location.origin}/`; // Change this to your index page URL
      window.sessionStorage.setItem("current_user_email", email.value);
      return true;
    } else {
      // Show error message if email/password doesn't match
      if (!user) {
        document.getElementById("login-email-error").textContent = "Incorrect email or password.";
        email.focus();
      }
      return false;
    }
  }
  
// ====================================================================================
    // Darkode applyTheme 
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