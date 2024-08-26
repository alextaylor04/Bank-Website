document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Hardcoded credentials
    const validUsername = "user";
    const validPassword = "123pass";
    console.log(username === validUsername && password === validPassword);
    if (username === validUsername && password === validPassword) {
       window.location = "../accounts/accounts.html";
    } else {
        // password error
    }
});



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