function saveSettings() {
    const transactionAlerts = document.getElementById("transactionAlerts").checked;
    const billAlerts = document.getElementById("billAlerts").checked;
    const userUUID = localStorage.getItem("userUUID");

    fetch('http://localhost:8080/settings/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userUUID,
            transactionAlerts: transactionAlerts,
            billAlerts: billAlerts
        })
    })
    .then(response => {
        if (response.ok) {
            alert("Settings saved successfully!");
        } else {
            alert("Failed to save settings.");
        }
    });
}

function togglePasswordForm() {
    const form = document.getElementById("passwordForm");
    const btn = document.getElementById("togglePassBtn");
    if (form.style.display === "none") {
        form.style.display = "block";
        btn.style.display = "none";
    } else {
        form.style.display = "none";
        btn.style.display = "block";
    }
}

function submitPasswordChange() {
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const userUUID = localStorage.getItem("userUUID");

    if (!oldPassword || !newPassword) {
        alert("Please fill in both password fields.");
        return;
    }

    fetch('http://localhost:8080/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userUUID,
            oldPassword: oldPassword,
            newPassword: newPassword
        })
    })
    .then(response => {
        if (response.ok) {
            alert("Password changed successfully!");
            togglePasswordForm();
            document.getElementById("oldPassword").value = "";
            document.getElementById("newPassword").value = "";
        } else {
            return response.text().then(text => { alert(text); });
        }
    });
}

function signOut() {
    localStorage.removeItem("userUUID");
    localStorage.removeItem("account");
    window.location = "../home/home.html";
}

// Load initial state
document.addEventListener('DOMContentLoaded', () => {
    const userUUID = localStorage.getItem("userUUID");
    if (!userUUID) {
        window.location = "../login/login.html";
        return;
    }

    // Fetch user to get current settings
    fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userUUID)
    })
    .then(response => response.json())
    .then(user => {
        document.getElementById("transactionAlerts").checked = user.transactionAlertsEnabled;
        document.getElementById("billAlerts").checked = user.billAlertsEnabled;
    });
});