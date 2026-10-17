// Login page demo: only front-end checking. Nothing is sent anywhere.

var form = document.getElementById("login-form");
var email = document.getElementById("email");
var password = document.getElementById("password");
var emailError = document.getElementById("email-error");
var passwordError = document.getElementById("password-error");
var result = document.getElementById("result");
var toggle = document.getElementById("toggle-pw");
var forgot = document.getElementById("forgot");

// simple email check: something@something.something
function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function setState(input, errorBox, message) {
    var field = input.parentElement.classList.contains("pw-wrap") ? input.parentElement.parentElement : input.parentElement;
    errorBox.textContent = message;
    field.classList.toggle("invalid", message !== "");
    field.classList.toggle("valid", message === "" && input.value !== "");
    input.setAttribute("aria-invalid", message !== "" ? "true" : "false");
}

function checkEmail() {
    var value = email.value.trim();
    if (value === "") {
        setState(email, emailError, "Please enter your email address.");
        return false;
    }
    if (!isValidEmail(value)) {
        setState(email, emailError, "Please enter a valid email, like you@example.com.");
        return false;
    }
    setState(email, emailError, "");
    return true;
}

function checkPassword() {
    var value = password.value;
    if (value === "") {
        setState(password, passwordError, "Please enter your password.");
        return false;
    }
    if (value.length < 8) {
        setState(password, passwordError, "Password must be at least 8 characters.");
        return false;
    }
    setState(password, passwordError, "");
    return true;
}

// check when the user leaves a field, and fix errors while typing
email.addEventListener("blur", checkEmail);
password.addEventListener("blur", checkPassword);
email.addEventListener("input", function () {
    if (emailError.textContent !== "") { checkEmail(); }
});
password.addEventListener("input", function () {
    if (passwordError.textContent !== "") { checkPassword(); }
});

// show / hide password
toggle.addEventListener("click", function () {
    var hidden = password.type === "password";
    password.type = hidden ? "text" : "password";
    toggle.textContent = hidden ? "Hide" : "Show";
    toggle.setAttribute("aria-label", hidden ? "Hide password" : "Show password");
    toggle.setAttribute("aria-pressed", hidden ? "true" : "false");
});

// submit
form.addEventListener("submit", function (event) {
    event.preventDefault();
    result.textContent = "";
    result.className = "result";

    var okEmail = checkEmail();
    var okPassword = checkPassword();

    if (!okEmail) {
        email.focus();
        return;
    }
    if (!okPassword) {
        password.focus();
        return;
    }

    result.textContent = "Login successful! (Demo only, nothing was sent.)";
    result.className = "result ok";
});

// the forgot link is only for the demo
forgot.addEventListener("click", function (event) {
    event.preventDefault();
    result.textContent = "This is a demo, so there is no password reset.";
    result.className = "result";
});
