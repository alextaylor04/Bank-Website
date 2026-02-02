document.addEventListener('DOMContentLoaded', function() {
    const userUUID = localStorage.getItem("userUUID");
    if (!userUUID) {
        window.location = "../login/login.html";
        return;
    }

    loadAlerts(userUUID);
});

function loadAlerts(userId) {
    fetch('http://localhost:8080/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userId)
    })
    .then(response => response.json())
    .then(alerts => {
        const list = document.getElementById("alerts-list");
        if (alerts.length === 0) {
            list.innerHTML = "<p>No alerts at this time.</p>";
            return;
        }

        list.innerHTML = "";
        alerts.forEach(alert => {
            const div = document.createElement("div");
            div.className = `alert-item ${alert.read ? 'read' : ''}`;
            
            const date = new Date(alert.date).toLocaleString();
            
            div.innerHTML = `
                <div class="alert-content">
                    <p class="alert-message">${alert.message}</p>
                    <p class="alert-date">${date}</p>
                </div>
                ${!alert.read ? `<button class="read-btn" onclick="markAsRead('${alert.id}')">Mark as Read</button>` : ''}
            `;
            list.appendChild(div);
        });
    })
    .catch(err => {
        console.error("Error loading alerts:", err);
        document.getElementById("alerts-list").innerText = "Error loading alerts.";
    });
}

function markAsRead(alertId) {
    fetch('http://localhost:8080/api/alerts/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alertId)
    })
    .then(() => {
        const userUUID = localStorage.getItem("userUUID");
        loadAlerts(userUUID);
    });
}

function signOut() {
    localStorage.removeItem("userUUID");
    localStorage.removeItem("account");
    window.location = "../home/home.html";
}
