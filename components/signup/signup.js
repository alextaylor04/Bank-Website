document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    document.getElementById('usernameError').style.display = "none";

    fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw err; });
        }
        return response.json();
    })
    .then(data => {
        if (data.authorized) {
            localStorage.setItem("userUUID", data.responseUUID);
            window.location = "../accounts/accounts.html";
        }
    })
    .catch(error => {
        if (error.message === "Username already exists.") {
            document.getElementById('usernameError').style.display = "block";
        } else {
            console.error('Error during signup:', error);
            alert('Could not connect to the bank server.');
        }
    });
});
