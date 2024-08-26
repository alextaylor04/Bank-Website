
var currency = "$";
var types = {"savings": {"under_info": "AVAILABLE BALANCE", "button_info": "View Account"}, "rewards": {"under_info": "REWARDS CASH", "button_info": "View Rewards"}, "credit": {"under_info": "CURRENT BALANCE", "button_info": "Pay bill"}};

function addCommasToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
var accountBackgroundColors = ["rgb(38,66,97)", "rgb(22, 96, 133)", "rgb(37, 41, 43)", "linear-gradient( rgba(0,0,0,.5), rgba(0,0,0,.6) ),url(../Images/stars_1.jpeg)"]; // linear-gradient( rgba(0,0,0,.5), rgba(0,0,0,.5) ),url(./stars_1.jpeg)
var createAccount = function (name, balance, type, backgroundOption) {
    const div3 = document.createElement("div");

    div3.setAttribute("class", "account1");

    if (accountBackgroundColors[backgroundOption].includes(".jpeg")) {
        console.log(accountBackgroundColors[backgroundOption]);
        div3.style.backgroundImage = accountBackgroundColors[backgroundOption];
    } else {
        div3.style.backgroundColor = accountBackgroundColors[backgroundOption];
    }

    const div2 = document.createElement("div");

    div2.setAttribute("class", "accountbutton");

    const div1 = document.createElement("div");

    div1.setAttribute("class", "accountinfo");

    const button1 = document.createElement("button");

    const p4 = document.createElement("p");

    const node3 = document.createTextNode(types[type]["under_info"]);

    p4.appendChild(node3);

    p4.setAttribute("class", "balance-info");

    const p3 = document.createElement("p");

    var writtenBalance = addCommasToNumber(Math.floor(balance));

    var cents = Math.round((balance - Math.floor(balance)) * 100);

    p3.innerHTML = '<span class="currency">' + currency + '</span>' + writtenBalance + '<span class="cents">' + cents + '</span>';

    p3.setAttribute("class", "balance");

    const p2 = document.createElement("p");

    const node2 = document.createTextNode(name);

    p2.appendChild(node2);

    p2.setAttribute("class", "heading");

    const p1 = document.createElement("p");

    const node1 = document.createTextNode(types[type]["button_info"]);

    p1.appendChild(node1);

    button1.appendChild(p1);

    div1.appendChild(p2);

    div1.appendChild(p3);

    div1.appendChild(p4);

    div2.appendChild(button1);

    div3.appendChild(div1);

    div3.appendChild(div2);

    var element = document.getElementById("accountholder");

    element.appendChild(div3);
}
var createBlankAccount = function () {

    var div1 = document.createElement("div");

    div1.setAttribute("class", "account1");

    div1.style.visibility = "hidden";

    var element = document.getElementById("accountholder");

    element.appendChild(div1);
}
createAccount("Savings", 12000.28, "savings", 0);
createAccount("Credit Card", 80.78, "credit", 1);
createAccount("Rewards", 80.78, "rewards", 3);
createBlankAccount();



/*
<div class="account1">
    <div class="accountinfo">
        <p class="heading">Savings</p>
        <p class="balance"><span class="currency">$</span>12,000<span class="cents">00</span></p>
        <p class="balance-info">AVAILABLE BALANCE</p>
    </div>
    <div class="accountbutton">
        <button><p>View Rewards</p></button>
    </div>
</div>
*/

    