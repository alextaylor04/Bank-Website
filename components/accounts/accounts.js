
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

    if (type === "credit") {

      button1.onclick = function () { openModal();};

    }

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



var modal = document.getElementById("myModal");

var close = document.getElementsByClassName("close")[0];

close.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
  if (event.target != document.getElementsByClassName("custom-amount")[0]) {
    const element = document.getElementsByClassName("custom-amount")[0];
    element.placeholder = "0.00";
    if (mode === "modal") {
      updateCustomAmount();
    }
    if (element.value.length === 0 && payOptions["status"] === "custom") {
      updateContinue("remove");
      payOptions["status"] = "";
      payOptions["payBalance"] = 0;
    }
  }
}
var mode = "none";
var updateCustomAmount = function () {
  var element = document.getElementsByClassName("custom-amount")[0]
  if (element.value.length > 0 && element.value.includes(".") === false) {
    element.value = element.value + ".00";
  }
  if (element.value.length > 0) {
    var customValue = Number(element.value);
    if (customValue > 0) {
      payOptions["payBalance"] = Math.floor(customValue * 100) / 100; 
      updateContinue("add");
      payOptions["status"] = "custom";
      resetBox(0);
      resetBox(1);
      element.blur();
    }
  }
}
document.addEventListener('keyup', event => {
  if (event.code == "Enter" && mode === "modal") {
    updateCustomAmount();
  }
})

var openModal = function () {
  modal.style.display = "block";
  mode = "modal";
  resetBox(0);
  resetBox(1);
  updateContinue("remove");
  var statement = document.getElementById("statement");
  var current = document.getElementById("current");
  var custom_amount = document.getElementsByClassName("custom-amount")[0];
  custom_amount.value = "";
  statement.innerText = "$" + account["statement-balance"];
  current.innerText = "$" + account["current-balance"];
}
var closeModal = function () {
  modal.style.display = "none";
  mode = "none";
}

var customAmount = function () {
  const element = document.getElementsByClassName("custom-amount")[0];
  element.placeholder = "";
}


var account = {"type":"Credit Card", "current-balance": 150.00, "statement-balance": 100.00};
var payOptions = {"status": "", "payBalance": -1};
var resetBox = function (num) {
  var otherbox = document.getElementsByClassName("moneybox")[num];
  otherbox.classList.remove("selected");
}
var updateContinue = function (conString) {
  var continueBox = document.getElementsByClassName("continue")[0];
  if (conString === "add") {
    continueBox.classList.add("green_continue");
  } else {
    continueBox.classList.remove("green_continue");
  }
}
var moneybox = function (num) {
  if (payOptions["status"] != "custom") {
    var box = document.getElementsByClassName("moneybox")[num];
    box.classList.add("selected");
    updateContinue("add");
    if (num === 0) {
      payOptions["payBalance"] = account["statement-balance"];
      resetBox(1)
      payOptions["status"] = "statement";
    } else {
      payOptions["payBalance"] = account["current-balance"];
      resetBox(0)
      payOptions["status"] = "current";
    }
  }
}
var payCredit = function () {
  if (payOptions["payBalance"] > 0 && payOptions["payBalance"] <= account["current-balance"]) {
    closeModal();
      if (payOptions["payBalance"] >= account["statement-balance"]) {
        account["statement-balance"] = 0;
      } else {
        account["statement-balance"] -= payOptions["payBalance"];
      }
      account["current-balance"] -= payOptions["payBalance"];
    } else {
      // send error message
    }
}


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

    