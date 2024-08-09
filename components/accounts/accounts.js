const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function gridElement(name="Account Name", balance=50.0) {
    const accountGridDiv = document.createElement("div");
    accountGridDiv.setAttribute("class", "account-grid");

    const accountBoxDiv = document.createElement("div");
    accountBoxDiv.setAttribute("class", "account-box");

    const viewAccountButton = document.createElement("button");
    viewAccountButton.innerHTML = ' <a href="home.html">View Account</a> ';
    viewAccountButton.setAttribute("class", "view-account-button");

    const accountInfoDiv = document.createElement("div");
    accountInfoDiv.setAttribute("class", "account-info");

    const accountBalanceText = document.createElement("p");
    const balanceTextNode = document.createTextNode(formatter.format(balance));
    accountBalanceText.appendChild(balanceTextNode);

    const accountNameText = document.createElement("p");
    const nameTextNode = document.createTextNode(name);
    accountNameText.appendChild(nameTextNode);

    accountInfoDiv.appendChild(accountNameText);
    accountInfoDiv.appendChild(accountBalanceText);
    accountBoxDiv.appendChild(accountInfoDiv);

    accountBoxDiv.appendChild(viewAccountButton);

    accountGridDiv.appendChild(accountBoxDiv);

    var wrapper = document.getElementById("grid-wrapper")
    wrapper.appendChild(accountGridDiv);
}      

gridElement("Savings", 20000.0)
gridElement("Checkings", 20000.0)
gridElement("Business", 20000.0)

/* Grid code
<div class="account-grid">
                <div class="account-box">
                    <div class="account-info">
                        <p>Account Name</p>
                        <p>$50.00</p>
                    </div>
                    <button class="view-account-button">
                        <a href="home.html">View Account</a>
                    </button>
                </div>
            </div>
*/


// add