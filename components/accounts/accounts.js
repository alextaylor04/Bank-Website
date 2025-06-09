
/*
TODO:
- add accountID feature


Backend:
- load in accounts from the backend using loadInAccounts function
  - utilize the the loadIn___Account functions to load them into the frontend
- create accounts in the back-end using the createAccount functions
*/

var currency = "$";
var shortNamesForAccounts = {"Credit Card": "credit", "Savings": "savings", "Rewards": "rewards", "Checking": "checking"}
var typesInfo = {"savings": {"under_info": "AVAILABLE BALANCE", "button_info": "View Account"}, "rewards": {"under_info": "REWARDS CASH", "button_info": "View Rewards"}, "credit": {"under_info": "CURRENT BALANCE", "button_info": "Pay bill"}, "checking": {"under_info": "AVAILABLE BALANCE", "button_info": "View Account"}};
var accountBackgroundColors = ["rgb(38,66,97)", "rgb(22, 96, 133)", "rgb(37, 41, 43)", "linear-gradient( rgba(0,0,0,.5), rgba(0,0,0,.6) ),url(../Images/stars_1.jpeg)", "linear-gradient(rgba(58, 136, 70, 0.9), rgba(58, 136, 70, 0.7)),url(../Images/grass.jpg)"]; 

var accountList = [];
var accountnum = -1;
var accountcounter = 0;
var filechecker = 0;
var payOptions = {"status": "", "payBalance": -1};
var mode = "none";


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


var createAccountonScreen = function (name, balance, type, backgroundOption, hiddenState) {
    const div3 = document.createElement("div");

    var tempnum = accountcounter;

    if (hiddenState === "hide") {
      div3.setAttribute("class", "account1 hidden");
    } else {
      div3.setAttribute("class", "account1");
    }
    if (type != "rewards") {
      div3.onclick = function () {setTimeout(function () {openAccountFile(tempnum);}, 50);}
    } else {
      div3.onclick = function () {}
    }

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

    } else if (type != "rewards") {
      button1.onclick = function () {openAccountFile(tempnum); };
    } else {
      button1.onclick = function () {}
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



/*
openAccountFile function
- runs when an account is clicked on by the user.
*/
var openAccountFile = function (num) {
  if (filechecker === 0) {
    localStorage.setItem("account", JSON.stringify(accountList[num]));
    localStorage.setItem("backColor", accountList[num]["backColor"])
    localStorage.setItem("accountID", 5)
    window.location = "../Transactions/transactions.html";
  }
  filechecker = 0;
}


var createAccountDisplay = function () {
  var type = accountList[accountcounter]["type"]
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
  createAccountonScreen(type, balance, shortNamesForAccounts[type], backgroundNum, "show");
  accountcounter++;
}

/*
updateCreditCardAccount function
- updates the display for a credit card account
*/
var updateCreditCardAccount = function (num) {
  var balance = accountList[num]["current-balance"];
  var curraccount = document.getElementById("account" + num);
  curraccount.innerHTML = '<span class="currency">' + currency + '</span>' + addCommasToNumber(Math.floor(balance)) + '<span class="cents">' + getCents(balance) + '</span>';
}



var AccountListContainsRewards = function () {
  for (var i = 0; i < accountList.length; i++) {
    if (accountList[i]["type"] === "Rewards") {
      return true;
    }
  }
  return false;
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
      updatePayButton("remove");
      payOptions["status"] = "";
      payOptions["payBalance"] = 0;
    }
  }
}

var updateCustomAmount = function () {
  var element = document.getElementsByClassName("custom-amount")[0]
  if (element.value.length > 0 && element.value.includes(".") === false) {
    element.value = element.value + ".00";
  }
  if (element.value.length > 0) {
    var customValue = Number(element.value);
    if (customValue > 0) {
      if ((Math.floor(customValue * 100) / 100) <= accountList[accountnum]["current-balance"]) {
        payOptions["payBalance"] = Math.floor(customValue * 100) / 100; 
        updatePayButton("add");
        payOptions["status"] = "custom";
      }
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

/*
openModal function
- function that controls all modals for the accounts file.

Inputs:
- 1 = Pay Modal
- 2 = create new account modal
*/
var openModal = function (openvar) {
  if (openvar === 1) {
    modal.style.display = "block";
    mode = "modal";
    resetBox(0);
    resetBox(1);
    updatePayButton("remove");
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

/*
closeModal function
- function that closes any modal within the accounts file.

Inputs:
- 1 = Pay Modal
- 2 = create new account modal
*/
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


var resetBox = function (num) {
  var otherbox = document.getElementsByClassName("moneybox")[num];
  otherbox.classList.remove("selected");
}

/*
updatePayButton
- updates Pay Button in Pay Modal
*/
var updatePayButton = function (conString) {
  var payButton = document.getElementsByClassName("payButton")[0];
  if (conString === "add") {
    payButton.classList.add("green_payButton");
  } else {
    payButton.classList.remove("green_payButton");
  }
}

var moneybox = function (num) {
  if (payOptions["status"] != "custom") {
    var box = document.getElementsByClassName("moneybox")[num];
    box.classList.add("selected");
    updatePayButton("add");
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
}

/*
payCredit function
- controls the logic when you press the "Pay" button inside the Pay Modal
*/
var payCredit = function () {
  if (payOptions["payBalance"] > 0 && payOptions["payBalance"] <= accountList[accountnum]["current-balance"]) {
    closeModal(1);
      if (payOptions["payBalance"] >= accountList[accountnum]["statement-balance"]) {
        accountList[accountnum]["statement-balance"] = 0;
      } else {
        accountList[accountnum]["statement-balance"] -= payOptions["payBalance"];
      }
      accountList[accountnum]["current-balance"] -= payOptions["payBalance"];
      updateCreditCardAccount(accountnum);
    } else {
      if (payOptions["status"] != "") {
      alert("Can't pay amount.")
      }
    }
}

/*
createHiddenAccount function
- creates an account box that takes up space but can't be interacted with.
*/
var createHiddenAccount = function () {
  createAccountonScreen("Savings", 0, shortNamesForAccounts["Savings"], 0, "hide");
}

var deleteHiddenAccount = function () {
  var hiddenAccount = document.getElementsByClassName("hidden")[0]
  if (hiddenAccount != undefined) {
    hiddenAccount.remove()
  }
}



/*
loadInCreditCardAccount function
- Adds a credit card account with a certain current_balance and statement_balance to the front-end accountList
and displays it.
*/
var loadInCreditCardAccount = function (current_balance, statement_balance) {
  accountList.push({"type": "Credit Card", "current-balance": current_balance, "statement-balance": statement_balance})
  createAccountDisplay();
}

/*
loadInSavingsAccount function
- Adds a savings account with a certain balance to the front-end accountList
and displays it.
*/
var loadInSavingsAccount = function (balance) {
  accountList.push({"type": "Savings", "balance": balance})
  createAccountDisplay();
}

/*
loadInCheckingAccount function
- Adds a checking account with a certain balance to the front-end accountList
and displays it.
*/
var loadInCheckingAccount = function (balance) {
  accountList.push({"type": "Checking", "balance": balance})
  createAccountDisplay();
}

/*
loadInCheckingAccount function
- Adds a rewards account to the front-end accountList
and displays it.
*/
var loadInRewardsAccount = function () {
  accountList.push({"type": "Rewards", "balance": 100.00})
  createAccountDisplay();
}



/*
createCreditCardAccount function
- creates a credit card account and then has it loaded in the frontend
*/
var createCreditCardAccount = function (current_balance, statement_balance) {
  // add to backend
  loadInCreditCardAccount(current_balance, statement_balance)
}

/*
createSavingsAccount function
- creates a savings account and then has it loaded in the frontend
*/
var createSavingsAccount = function (balance) {
  // add to backend
  loadInSavingsAccount(balance)
}

/*
createCheckingAccount function
- creates a checking account and then has it loaded in the frontend
*/
var createCheckingAccount = function (balance) {
  // add to backend
  loadInCheckingAccount(balance)
}

/*
createRewardsAccount function
- creates a rewards account and then has it loaded in the frontend
*/
var createRewardsAccount = function () {
  // add to backend
  loadInRewardsAccount()
}



/*
addAccount function
- function that is run when the user wants to add a new account. Makes a rewards account if the user is adding a 
credit card account and does not already have a rewards account.
*/
var addAccount = function (type) {
  deleteHiddenAccount()
  closeModal(2);
  if (type == "Savings") {
    createSavingsAccount(200.00)
  } else if (type == "Checking") {
    createCheckingAccount(150.00)
  } else if (type == "Credit Card") {
    createCreditCardAccount(100.00, 50.00)
  }
  if (AccountListContainsRewards() === false && type === "Credit Card") {
    createRewardsAccount()
  }
  if (accountList.length % 2 != 0) {
    createHiddenAccount()
  }
}

/*
makeTestingAccounts function
- testing function for displaying accounts
*/
var makeTestingAccounts = function () {
  createSavingsAccount(100.00)
  createCheckingAccount(200.00)
}

/*
loadInAccounts
- function that is called when the program starts up or refreshes. Loads in all 
*/
var loadInAccounts = function () {
  // get accounts from back-end 
  // - use loadInAccount functions
  makeTestingAccounts() // just for testing front-end
  if (accountList.length % 2 != 0) {
    createHiddenAccount()
  }
}
loadInAccounts()




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

    