document.addEventListener('DOMContentLoaded', function() {
    const userUUID = localStorage.getItem("userUUID");
    if (!userUUID) {
        window.location = "../login/login.html";
        return;
    }

    fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userUUID)
    })
    .then(response => response.json())
    .then(user => {
        const info = user.personalInfo || {};
        const profileDiv = document.getElementById("profile-info");
        
        profileDiv.innerHTML = `
            <div class="info-group">
                <p class="info-label">Full Name</p>
                <p class="info-value">${info.firstName} ${info.lastName}</p>
            </div>
            <div class="info-group">
                <p class="info-label">Username</p>
                <p class="info-value">${user.username}</p>
            </div>
            <div class="info-group">
                <p class="info-label">Email Address</p>
                <p class="info-value">${info.email || 'N/A'}</p>
            </div>
            <div class="info-group">
                <p class="info-label">Address</p>
                <p class="info-value">${info.address || 'N/A'}, ${info.country || ''}</p>
            </div>
            <div class="info-group">
                <p class="info-label">Phone</p>
                <p class="info-value">${info.phoneNumber || 'N/A'}</p>
            </div>
        `;
    })
    .catch(err => {
        console.error("Error loading profile:", err);
        document.getElementById("profile-info").innerText = "Error loading profile data.";
    });
});

function signOut() {
    localStorage.removeItem("userUUID");
    localStorage.removeItem("account");
    window.location = "../home/home.html";
}
