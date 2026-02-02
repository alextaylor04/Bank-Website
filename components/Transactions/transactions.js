/*

Backend:
- loadInTransactions()

*/



/*
Future Improvements:

- add ability to search for a certain transaction
*/





var currency = "$";
var transactioncounter = 0;
var transactionBorderRadius;
var accountType;
var transactions = [];
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
const monthsShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];


// ---------- Transaction Classes ----------

class Transaction {
    constructor(dateObj, logoURL, description, category, type) {
        // Handle JS Date or backend date string
        const d = new Date(dateObj);
        this.customdate = new CustomDate(d.getDate(), d.getMonth(), d.getFullYear(), d.getHours(), d.getMinutes());
        this.logoURL = logoURL || "../Images/default_logo.png";
        this.description = description;
        this.category = category;
        this.type = type;
        this.state = "off";
        this.bottomstate = "none";
        this.topstate = "none";
    }
}

class SavingsTransaction extends Transaction {
    constructor(date, logoURL, description, category, balance, amount) {
        super(date, logoURL, description, category, "Savings")
        this.balance = balance;
        this.amount = amount;
    }
}

class CreditCardTransaction extends Transaction {
    constructor(date, logoURL, description, category, card, amount, balance) {
        super(date, logoURL, description, category, "Credit")
        this.card = card;
        this.amount = amount;
        this.balance = balance;
    }
}

class CheckingTransaction extends Transaction {
    constructor(date, logoURL, description, category, balance, amount) {
        super(date, logoURL, description, category, "Checking")
        this.balance = balance;
        this.amount = amount;
    }
}


Transaction.prototype.getState = function () {
    return this.state;
}
Transaction.prototype.updateState = function (state) {
    this.state = state;
}
function CustomDate(day, month, year, hour, second) {
    this.year = year;
    this.day = day;
    this.month = month;
    this.hour = hour;
    this.second = second;
}

CustomDate.prototype.getYear = function () {
    return this.year;
}
CustomDate.prototype.getMonth = function () {
    return this.month;
}
CustomDate.prototype.getDay = function () {
    return this.day;
}
CustomDate.prototype.getHour = function () {
    return this.hour;
}
CustomDate.prototype.getSecond = function () {
    return this.second;
}

Transaction.prototype.getYear = function () {
    return this.customdate.getYear();
}
Transaction.prototype.getMonth = function () {
    return this.customdate.getMonth();
}
Transaction.prototype.getDay = function () {
    return this.customdate.getDay();
}
Transaction.prototype.getHour = function () {
    return this.customdate.getHour();
}
Transaction.prototype.getSecond = function () {
    return this.customdate.getSecond();
}

Transaction.prototype.createDateHolder = function () {
    const div3 = document.createElement("div");

    div3.setAttribute("class", "dateholder");

    const p1 = document.createElement("p");

    const node1 = document.createTextNode(getShortMonthString(this.getMonth()));

    p1.appendChild(node1);

    p1.setAttribute("class", "month");

    const p2 = document.createElement("p");

    const node2 = document.createTextNode(formatDayString(this.getDay()));

    p2.appendChild(node2);

    p2.setAttribute("class", "day");

    div3.appendChild(p1);

    div3.appendChild(p2);

    return div3;
}

Transaction.prototype.createLogoHolder = function () {

    const div4 = document.createElement("div");

    div4.setAttribute("class", "iconholder");

    const img1 = document.createElement("img");

    img1.src = this.logoURL;

    img1.setAttribute("class", "icon");
    
    // Add error handling for missing logos
    img1.onerror = function() {
        this.src = "https://i.imgur.com/oyD6it3.png"; // Placeholder
    };

    div4.appendChild(img1);

    return div4;
}

Transaction.prototype.createDescHolder = function () {

    const div5 = document.createElement("div");

    div5.setAttribute("class", "descholder");

    const p3 = document.createElement("p");

    const node3 = document.createTextNode(this.description);

    p3.appendChild(node3);

    p3.setAttribute("class", "desc");

    div5.appendChild(p3);

    return div5;
}
Transaction.prototype.createCategoryHolder = function () {

    const div6 = document.createElement("div");

    div6.setAttribute("class", "categoryholder");

    const p4 = document.createElement("p");

    const node4 = document.createTextNode(this.category);

    p4.appendChild(node4);

    p4.setAttribute("class", "category");

    div6.appendChild(p4);

    return div6;
}

Transaction.prototype.createCardHolder = function () {

    const div7 = document.createElement("div");

    div7.setAttribute("class", "cardholder");

    const p5 = document.createElement("p");

    const node5 = document.createTextNode(this.card || "N/A");

    p5.appendChild(node5);

    p5.setAttribute("class", "card");

    div7.appendChild(p5);

    return div7;

}

Transaction.prototype.createAmountHolder = function () {

    const div8 = document.createElement("div");

    div8.setAttribute("class", "amountholder");

    const p6 = document.createElement("p");

    var symbol = "";

    if (this.type != "Credit") {
        if (this.amount > 0) {
            symbol = "+";

            p6.style.color = "green";
        } else {
            symbol = "-"
        }
    } else {
        if (this.amount < 0) {
            symbol = "-"
            p6.style.color = "green";
        }
    }

    const node6 = document.createTextNode(symbol + formatToUSD(Math.abs(this.amount)));

    p6.appendChild(node6);

    p6.setAttribute("class", "amount");

    div8.appendChild(p6);

    return div8;

}

Transaction.prototype.createBalanceHolder = function () {

    const div8 = document.createElement("div");

    div8.setAttribute("class", "balanceholder");

    const p6 = document.createElement("p");

    const node6 = document.createTextNode(formatToUSD(this.balance || 0));

    p6.appendChild(node6);

    p6.setAttribute("class", "balance");

    div8.appendChild(p6);

    return div8;

}

Transaction.prototype.printOnScreen = function () {
    const div10 = document.createElement("div");

    div10.id = "hiddeninfo" + transactioncounter;

    div10.setAttribute("class", "hiddeninfo");

    const div9 = document.createElement("div");

    div9.id = "transaction" + transactioncounter;

    var transactionType;
    if (this.type === "Savings" || this.type === "SAVINGS") {
        transactionType = "savingsTransaction";
    } else if (this.type === "Credit" || this.type === "CREDIT") {
        transactionType = "creditTransaction";
    } else if (this.type === "Checking" || this.type === "CHECKINGS") {
        transactionType = "checkingTransaction";
    }

    div9.classList.add("transaction", transactionType);

    if (this.bottomstate === "no rounding") {
        div9.style.borderBottomRightRadius = "0px";
        div9.style.borderBottomLeftRadius = "0px";
    }
    if (this.topstate === "no rounding") {
        div9.style.borderTopRightRadius = "0px";
        div9.style.borderTopLeftRadius = "0px";
    }

    const p7 = document.createElement("p");

    const node7 = document.createTextNode("Transaction date: " + getMonthString(this.getMonth()) + " " + this.getDay() + getDaySuffix(this.getDay()) + ", " + this.getYear() + " " + this.getHour() + ":" + this.getSecond());

    p7.appendChild(node7);

    p7.setAttribute("class", "hiddendate");

    const div2 = document.createElement("div");

    div2.setAttribute("class", "arrowholder");

    const div1 = document.createElement("div");

    div1.innerHTML = ' <i class="fa-solid fa-chevron-down" id="arrow'+ transactioncounter + '"></i> ';

    var tempnum = transactioncounter;
    div1.onclick = function() { openTransaction(tempnum) };

    div1.setAttribute("class", "arrowwiden");

    div2.appendChild(div1);

    div9.appendChild(div2);

    div9.appendChild(this.createDateHolder());

    div9.appendChild(this.createLogoHolder());

    div9.appendChild(this.createDescHolder());

    div9.appendChild(this.createCategoryHolder());

    if (this.type === "Credit" || this.type === "CREDIT") {

        div9.appendChild(this.createCardHolder());

        div9.appendChild(this.createAmountHolder());

    } else {

        div9.appendChild(this.createAmountHolder());

        div9.appendChild(this.createBalanceHolder());

    }

    div10.appendChild(p7);

    var element = document.getElementById("transactionholder");

    element.appendChild(div9);

    element.appendChild(div10);

    transactioncounter++;
}

// ---------- End of Transaction Classes ----------


var printYearGap = function (year) {
    const h1 = document.createElement("h1");
    const node1 = document.createTextNode(year + " Transactions");
    h1.appendChild(node1);
    h1.setAttribute("class", "yearGap");
    var element = document.getElementById("transactionholder");
    element.appendChild(h1);
}

function getMonthString(month) {
    return months[month];
}
function getShortMonthString (month) {
    return monthsShort[month];
}
function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return 'th'; 
    }
  
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
}
function formatDayString(day) {
    if (day < 10) {
      return `0${day}`;
    } else {
      return `${day}`;
    }
}
function formatToUSD(amount) {
    return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
}

// ----------- Creating Title Functions ----------- 

var createAmountTitle = function () {
    const p5 = document.createElement("p");

    const node5 = document.createTextNode("AMOUNT");

    p5.appendChild(node5);

    p5.setAttribute("class", "amountinfo");

    return p5;
}

var createCardTitle = function () {
    const p4 = document.createElement("p");

    const node4 = document.createTextNode("CARD");

    p4.appendChild(node4);

    p4.setAttribute("class", "cardinfo");

    return p4;
}

var createCategoryTitle = function () {
    const p3 = document.createElement("p");

    const node3 = document.createTextNode("CATEGORY");

    p3.appendChild(node3);

    p3.setAttribute("class", "categoryinfo");

    return p3;
}

var createDescriptionTitle = function () {
    const p2 = document.createElement("p");

    const node2 = document.createTextNode("DESCRIPTION");

    p2.appendChild(node2);

    p2.setAttribute("class", "descinfo");
    
    return p2;
}

var createDateTitle = function () {
    const p1 = document.createElement("p");

    const node1 = document.createTextNode("DATE");

    p1.appendChild(node1);

    p1.setAttribute("class", "dateinfo");

    return p1;
}

var createBalanceTitle = function () {
    const p1 = document.createElement("p");

    const node1 = document.createTextNode("BALANCE");

    p1.appendChild(node1);

    p1.setAttribute("class", "balanceinfo");

    return p1;
}

/*
createTitles function
- creates the blue titles for all the transactions
*/
var createTitles = function () {
    const div1 = document.createElement("div");

    var transactionType;
    if (accountType === "Savings" || accountType === "SAVINGS") {
        transactionType = "savingsTitle";
    } else if (accountType === "Credit Card" || accountType === "CREDIT") {
        transactionType = "creditTitle";
    } else if (accountType === "Checking" || accountType === "CHECKINGS") {
        transactionType = "checkingTitle";
    }

    div1.classList.add("transactioninfo", transactionType);

    div1.appendChild(createDateTitle());

    div1.appendChild(createDescriptionTitle());

    div1.appendChild(createCategoryTitle());

    if (accountType === "Credit Card" || accountType === "CREDIT") {

        div1.appendChild(createCardTitle());

        div1.appendChild(createAmountTitle());

    } else {

        div1.appendChild(createAmountTitle());

        div1.appendChild(createBalanceTitle());

    }

    var element = document.getElementById("transactionholder");

    element.appendChild(div1);
}

// ----------- End of Creating Title Functions ----------- 


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

function getTransBorder() {
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    transactionBorderRadius = rs.getPropertyValue('--blue');
}

/*
Testing function to get account balance
*/
var getAccountBalance = function (temp, accountType) {
    var balanceElement = document.getElementById("balance");
    var numBalance;
    if (accountType === "Savings" || accountType === "Checking" || accountType === "SAVINGS" || accountType === "CHECKINGS") {
        numBalance = temp["balance"] || temp["accountInfo"]["balance"]
    } else if (accountType === "Credit Card" || accountType === "CREDIT") {
        numBalance = temp["current-balance"] || temp["accountInfo"]["balance"]
    }
    balanceElement.innerHTML = '<span class="currency">' + currency + '</span>' + addCommasToNumber(Math.floor(numBalance)) + '<span class="cents">' + getCents(numBalance) + '</span>';
}

/*
getAccountBackground function
- Gets the background image or color for the account
*/
var getAccountBackground = function () {
    var heading = document.getElementById("heading")
    var accountBackgroundColors = ["rgb(38,66,97)", "rgb(22, 96, 133)", "rgb(37, 41, 43)", "linear-gradient( rgba(0,0,0,.5), rgba(0,0,0,.6) ),url(../Images/stars_1.jpeg)", "linear-gradient(rgba(58, 136, 70, 0.9), rgba(58, 136, 70, 0.7)),url(../Images/grass.jpg)"]; 
    var backNum = localStorage.getItem("backColor")
    if (backNum != undefined) {
        var backColor = accountBackgroundColors[backNum];
        if (backColor.includes(".jpeg") || backColor.includes(".jpg")) {
        heading.style.backgroundImage = backColor;
        if (backNum === 4) {
            heading.style.backgroundSize = "cover";
        }
        
        } else {
        
        heading.style.backgroundColor = backColor;
        
        }
    }
}


var addCreditCardTransaction = function (day, month, year, hour, second, logourl, desc, category, card, amount) {
    transactions.push(new CreditCardTransaction(new Date(year, month, day, hour, second), logourl, desc, category, card, amount));
}

var addSavingsTransaction = function (day, month, year, hour, second, logourl, desc, category, balance, amount) {
    transactions.push(new SavingsTransaction(new Date(year, month, day, hour, second), logourl, desc, category, balance, amount));
}

var addCheckingTransaction = function (day, month, year, hour, second, logourl, desc, category, balance, amount) {
    transactions.push(new CheckingTransaction(new Date(year, month, day, hour, second), logourl, desc, category, balance, amount));
}

/*
openTransaction function
- Happens when you click on an arrow to view more info for that transaction
*/
var openTransaction = function (num) {
    var state = transactions[num].getState();
    var transactionvar = document.getElementById("transaction" + num);
    var hiddeninfo = document.getElementById("hiddeninfo" + num);
    var arrow = document.getElementById("arrow" + num);
    if (state === "off") {
        transactionvar.style.borderBottomRightRadius = "0px";
        transactionvar.style.borderBottomLeftRadius = "0px";
        hiddeninfo.style.display = "flex";
        transactions[num].updateState("clicked")
        arrow.classList.remove("fa-chevron-down");
        arrow.classList.add("fa-chevron-right");
    } else if (state === "clicked") {
        if (transactions[num].bottomstate === "rounding" || transactions[num].bottomstate === "none") {
            transactionvar.style.borderBottomRightRadius = transactionBorderRadius;
            transactionvar.style.borderBottomLeftRadius = transactionBorderRadius;
        }
        hiddeninfo.style.display = "none";
        transactions[num].updateState("off")
        arrow.classList.remove("fa-chevron-right");
        arrow.classList.add("fa-chevron-down");
    }
    
}

/*
setUp function
- sets up visuals for page
*/
var setUp = function () {
    if (transactions.length === 0) {
        const holder = document.getElementById("transactionholder");
        const msg = document.createElement("p");
        msg.innerText = "No transactions found for this account.";
        msg.style.textAlign = "center";
        msg.style.marginTop = "50px";
        msg.style.color = "#666";
        msg.style.fontSize = "1.2rem";
        holder.appendChild(msg);
        return;
    }
    
    getTransBorder();
    var currentYear = transactions[0].getYear();
    printYearGap(currentYear);
    createTitles();
    for (var i = 0; i < transactions.length; i++) {
        if (i + 1 < transactions.length) {
            if (transactions[i + 1].getYear() === transactions[i].getYear()) {
                transactions[i].bottomstate = "no rounding";
            } else {
                transactions[i].bottomstate = "rounding";
            }
        }
        if (i - 1 >= 0) {
            if (transactions[i - 1].getYear() === transactions[i].getYear()) {
                transactions[i].topstate = "no rounding";
            } else {
                transactions[i].topstate = "rounding";
            }
        }
        if (transactions[i].getYear() != currentYear) {
            currentYear = transactions[i].getYear();
            printYearGap(currentYear);
            createTitles();
        }
        transactions[i].printOnScreen();
    }
}

var loadInTransactions = function (accountID) {
    fetch('http://localhost:8080/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(accountID)
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(t => {
            if (accountType === "SAVINGS" || accountType === "Savings") {
                transactions.push(new SavingsTransaction(t.date, t.logoUrl, t.transactionDescription, t.category, t.balanceAfter, t.amount));
            } else if (accountType === "CHECKINGS" || accountType === "Checking") {
                transactions.push(new CheckingTransaction(t.date, t.logoUrl, t.transactionDescription, t.category, t.balanceAfter, t.amount));
            } else if (accountType === "CREDIT" || accountType === "Credit Card") {
                transactions.push(new CreditCardTransaction(t.date, t.logoUrl, t.transactionDescription, t.category, "Card", t.amount, t.balanceAfter));
            }
        });
        setUp();
    })
    .catch(err => console.error("Error loading transactions:", err));
}

/*
loadInAccountInfo function
- Loads in the account info sent to the transaction page
*/
var loadInAccountInfo = function () {
    getAccountBackground();
    var headerName = document.getElementById("headerName");
    var temp = JSON.parse(localStorage.getItem("account"));
    if (temp != undefined) {
        accountType = temp["type"] || temp["accountType"];
        getAccountBalance(temp, accountType);
        headerName.innerHTML = accountType;
        
        var accountID = localStorage.getItem("accountID");
        if (accountID) {
            loadInTransactions(accountID)
        }
    }
}

loadInAccountInfo();

function signOut() {
    localStorage.removeItem("userUUID");
    localStorage.removeItem("account");
    window.location = "../home/home.html";
}