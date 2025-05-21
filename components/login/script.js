
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Hardcoded credentials
    const validUsername = "user";
    const validPassword = "123pass";
    resetErrors();
    console.log(username === validUsername && password === validPassword);
    if (username === validUsername && password === validPassword) {
       window.location = "../accounts/accounts.html";
    } else if (username != validUsername) { // username does not exist
        const usernameHolder = document.getElementById("usernameholder");
        usernameHolder.classList.remove("normalBox");
        usernameHolder.classList.add("errorBottom");
        const passwordHolder = document.getElementById("passwordholder");
        passwordHolder.classList.remove("normalBox");
        passwordHolder.classList.add("errorTop");
        const error = document.getElementById("usernameError");
        error.style.display = "block";
    } else if (password != validPassword) { // password incorrect
        const passwordHolder = document.getElementById("passwordholder");
        passwordHolder.classList.remove("normalBox");
        passwordHolder.classList.add("errorBottom");
        const error = document.getElementById("passwordError");
        error.style.display = "block";
    }
});

var resetErrors = function () {
    const userError = document.getElementById("usernameError");
    userError.style.display = "none";
    const passError = document.getElementById("passwordError");
    passError.style.display = "none";
    const usernameHolder = document.getElementById("usernameholder");
    const passwordHolder = document.getElementById("passwordholder");
    if (usernameHolder.classList.contains("normalBox") == false) {
        usernameHolder.classList.add("normalBox");
    }
    if (usernameHolder.classList.contains("errorBottom")) {
        usernameHolder.classList.remove("errorBottom");
    }
    if (passwordHolder.classList.contains("errorTop")) {
        passwordHolder.classList.remove("errorTop");
    }
    if (passwordHolder.classList.contains("errorBottom")) {
        passwordHolder.classList.remove("errorBottom");
    }
    if (passwordHolder.classList.contains("normalBox") == false) {
        passwordHolder.classList.add("normalBox");
    }
}

var formelemPressed = function (type) {
    const element = document.getElementById(type);
    element.placeholder = "";
}


window.onclick = function(event){
    var formlist = [document.getElementById('usernameholder'), document.getElementById('passwordholder')];
    var formvar = [[document.getElementById('username'), "Username"], [document.getElementById('password'), "Password"]];
    for (var i = 0; i < formlist.length; i++) {
        if (formlist[i].contains(event.target) === false && formlist[i].contains(document.activeElement) === false){
            formvar[i][0].placeholder = formvar[i][1];
        }
    }
}