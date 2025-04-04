//=============================== Sign up Page ==========================================


function signup() {
    event.preventDefault();
    // Clear any previous error messages
    document.querySelectorAll('.error-message').forEach(function (element) {
    element.textContent = '';
    });

    // Get the form fields
    var name = document.getElementById("reg-name");
    var email = document.getElementById("reg-email");
    var password = document.getElementById("reg-pass");
    var confirmPassword = document.getElementById("reg-pass-conf");

    // Validate the name (only letters and spaces)
    var nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name.value)) {
    document.getElementById("name-error").textContent = "Name must contain only letters and spaces.";
    name.focus();
    return false;
    }

    // Validate the email (basic email format)
    var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(email.value)) {
    document.getElementById("email-error").textContent = "Please enter a valid email address.";
    email.focus();
    return false;
    }

    // Check if the email already exists in localStorage
    var users = JSON.parse(localStorage.getItem("users")) || [];
    var emailExists = users.some(function (user) {
    return user.email === email.value;
    });

    if (emailExists) {
    document.getElementById("email-error").textContent = "This email is already registered. Please use a different one.";
    email.focus();
    return false;
    }

    // Validate the password (at least 6 characters, with at least 1 letter and 1 number)
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    if (!passwordRegex.test(password.value)) {
    document.getElementById("password-error").textContent = "Password must be at least 4 characters long, and contain at least one letter and one number.";
    password.focus();
    return false;
    }

    // Validate that the confirm password matches the password
    if (password.value !== confirmPassword.value) {
    document.getElementById("confirm-password-error").textContent = "Password and Confirm Password must match.";
    confirmPassword.focus();
    return false;
    }

    // Generate a random user ID
    var randomId = Math.floor(Math.random() * 1000000); // Generate a random number for the ID

    // Create a user object
    var user = {
    id: randomId,
    email: email.value,
    password: password.value,
    name: name.value,
    cart: []  // Initially, the cart is an empty array
    };

    // Add the new user to the users array and save to localStorage
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    // Success message
    window.location.href = window.location.origin + "/sign-in.html";

    return true;  // Form submission can proceed here if needed
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