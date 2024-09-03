
var currency = "$";
var shortNamesForAccounts = {"Credit Card": "credit", "Savings": "savings", "Rewards": "rewards", "Checking": "checking"}
var typesInfo = {"savings": {"under_info": "AVAILABLE BALANCE", "button_info": "View Account"}, "rewards": {"under_info": "REWARDS CASH", "button_info": "View Rewards"}, "credit": {"under_info": "CURRENT BALANCE", "button_info": "Pay bill"}, "checking": {"under_info": "AVAILABLE BALANCE", "button_info": "View Account"}};
var accountBackgroundColors = ["rgb(38,66,97)", "rgb(22, 96, 133)", "rgb(37, 41, 43)", "linear-gradient( rgba(0,0,0,.5), rgba(0,0,0,.6) ),url(../Images/stars_1.jpeg)", "linear-gradient(rgba(58, 136, 70, 0.9), rgba(58, 136, 70, 0.7)),url(../Images/grass.jpg)"]; 

var accountnum = -1;
var accountcounter = 0;
var filechecker = 0;

function addCommasToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function getCents (number) {
  var cents = Math.round((number - Math.floor(number)) * 100);
  if ((cents).toString.length === 1) {
    cents = cents + "0";
  }
  return cents;
}


var createAccountonScreen = function (name, balance, type, backgroundOption) {
    const div3 = document.createElement("div");

    var tempnum = accountcounter;

    div3.setAttribute("class", "account1");

    div3.onclick = function () {setTimeout(function () {openNewFile(tempnum);}, 50);}

    if (accountBackgroundColors[backgroundOption].includes(".jpeg") || accountBackgroundColors[backgroundOption].includes(".jpg")) {
      div3.style.backgroundImage = accountBackgroundColors[backgroundOption];
      if (backgroundOption === 4) {
        div3.style.backgroundSize = "cover";
      }
      
    } else {
      
      div3.style.backgroundColor = accountBackgroundColors[backgroundOption];
      
    }

    const div2 = document.createElement("div");

    div2.setAttribute("class", "accountbutton");

    const div1 = document.createElement("div");

    div1.setAttribute("class", "accountinfo");

    const button1 = document.createElement("button");
    
    if (type === "credit") {

      button1.onclick = function () { filechecker = 1; accountnum = tempnum; openModal(1); };

    } else {
      button1.onclick = function () {openNewFile(tempnum); };
    }

    const p4 = document.createElement("p");

    const node3 = document.createTextNode(typesInfo[type]["under_info"]);

    p4.appendChild(node3);

    p4.setAttribute("class", "balance-info");

    const p3 = document.createElement("p");

    p3.innerHTML = '<span class="currency">' + currency + '</span>' + addCommasToNumber(Math.floor(balance)) + '<span class="cents">' + getCents(balance) + '</span>';

    p3.setAttribute("class", "balance");

    p3.id = "account" + accountcounter;

    const p2 = document.createElement("p");

    const node2 = document.createTextNode(name);

    p2.appendChild(node2);

    p2.setAttribute("class", "heading");

    const p1 = document.createElement("p");

    const node1 = document.createTextNode(typesInfo[type]["button_info"]);

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




var openNewFile = function (num) {
  if (filechecker === 0) {
    localStorage.setItem("account", JSON.stringify(accountList[num]));
    localStorage.setItem("backColor", accountList[num]["backColor"])
    window.location = "../Transactions/transactions.html";
  }
  filechecker = 0;
}


var createAccount = function (type) {
  var balance;
  if (type != "Credit Card") {
    balance = accountList[accountcounter]["balance"];
  } else {
    balance = accountList[accountcounter]["current-balance"];
  }
  var backgroundNum;
  switch (type) {
    case "Savings":
      backgroundNum = 0;
      break;
    case "Credit Card":
      backgroundNum = 1;
      break;
    case "Rewards":
      backgroundNum = 3;
      break;
    case "Checking":
      backgroundNum = 4;
      break;
  }
  accountList[accountcounter]["backColor"] = backgroundNum;
  createAccountonScreen(type, balance, shortNamesForAccounts[type], backgroundNum);
  accountcounter++;
}
var updateAccount = function (num) {
  var balance;
  if (accountList[num]["type"] != "Credit Card") {
    balance = accountList[num]["balance"];
  } else {
    balance = accountList[num]["current-balance"];
  }
  var curraccount = document.getElementById("account" + num);
  curraccount.innerHTML = '<span class="currency">' + currency + '</span>' + addCommasToNumber(Math.floor(balance)) + '<span class="cents">' + getCents(balance) + '</span>';
}

var accountList = [];
accountList.push({"type": "Savings", "balance": 1000.00})
accountList.push({"type": "Checking", "balance": 200.00})

for (var i = 0; i < accountList.length; i++) {
  createAccount(accountList[i]["type"]);
}
// createBlankAccount();



// make savings and checkings default, then add a credit card (which adds savings) for video

var AccountListContainsRewards = function () {
  for (var i = 0; i < accountList.length; i++) {
    if (accountList[i]["type"] === "Rewards") {
      return true;
    }
  }
  return false;
}

var makeBlankAccount = function (type) {
  if (type != "Credit Card") {
    accountList.push({"type": type, "balance": 100.00})
  } else {
    accountList.push({"type": type, "current-balance": 100.00, "statement-balance": 50.00})
  }
  createAccount(type);
}
var addBlankAccount = function (type) {
  closeModal(2);
  makeBlankAccount(type);
  if (AccountListContainsRewards() === false && type === "Credit Card") {
    makeBlankAccount("Rewards");
  }
}

var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");

var close = document.getElementsByClassName("close")[0];
var close2 = document.getElementsByClassName("close")[1];

close.onclick = function() {
  modal.style.display = "none";
}
close2.onclick = function() {
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal(1);
  } else if (event.target == modal2) {
    closeModal(2);
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

var openModal = function (openvar) {
  if (openvar === 1) {
    modal.style.display = "block";
    mode = "modal";
    resetBox(0);
    resetBox(1);
    updateContinue("remove");
    var statement = document.getElementById("statement");
    var current = document.getElementById("current");
    var custom_amount = document.getElementsByClassName("custom-amount")[0];
    custom_amount.value = "";
    statement.innerText = "$" + accountList[accountnum]["statement-balance"];
    current.innerText = "$" + accountList[accountnum]["current-balance"];
  } else if (openvar === 2) {
    modal2.style.display = "block";
  }
}
var closeModal = function (closevar) {
  if (closevar === 1) {
    modal.style.display = "none";
    mode = "none";
  } else if (closevar === 2) {
    modal2.style.display = "none";
  }
}

var customAmount = function () {
  const element = document.getElementsByClassName("custom-amount")[0];
  element.placeholder = "";
}



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
      payOptions["payBalance"] = accountList[accountnum]["statement-balance"];
      resetBox(1)
      payOptions["status"] = "statement";
    } else {
      payOptions["payBalance"] = accountList[accountnum]["current-balance"];
      resetBox(0)
      payOptions["status"] = "current";
    }
  }
  console.log(payOptions);
}
var payCredit = function () {
  if (payOptions["payBalance"] > 0 && payOptions["payBalance"] <= accountList[accountnum]["current-balance"]) {
    closeModal(1);
      if (payOptions["payBalance"] >= accountList[accountnum]["statement-balance"]) {
        accountList[accountnum]["statement-balance"] = 0;
      } else {
        accountList[accountnum]["statement-balance"] -= payOptions["payBalance"];
      }
      accountList[accountnum]["current-balance"] -= payOptions["payBalance"];
      updateAccount(accountnum);
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

    