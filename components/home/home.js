document.addEventListener('DOMContentLoaded', function() {
    const userUUID = localStorage.getItem("userUUID");
    const navLinks = document.getElementById("nav-links");
    
    if (userUUID) {
        // Replace Sign In and Sign Up with Accounts and Sign Out
        navLinks.innerHTML = `
            <a href="home.html" class="home">Home</a>
            <a href="../accounts/accounts.html" class="nav-menu">Accounts</a>
            <a href="../profile/profile.html" class="nav-menu">Profile</a>
            <a href="../alerts/alerts.html" class="nav-menu">Alerts</a>
            <a href="../settings/settings.html" class="nav-menu">Settings</a>
            <a href="#" class="nav-menu" onclick="signOut()">Sign Out</a>
        `;
    }
});

function signOut() {
    localStorage.removeItem("userUUID");
    localStorage.removeItem("account");
    window.location = "home.html";
}
