/*
TODO:
- add ability to search for a certain transaction
*/


var currency = "$";
var transactioncounter = 0;
var transactionBorderRadius;
var accountType;
var transactions = [];
function getTransBorder() {
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    transactionBorderRadius = rs.getPropertyValue('--blue');
}


class Transaction {
    constructor(date, logoURL, description, category, type) {
        this.customdate = new CustomDate(date[0], date[1], date[2], date[3], date[4]);
        this.logoURL = logoURL;
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
    constructor(date, logoURL, description, category, card, amount) {
        super(date, logoURL, description, category, "Credit")
        this.card = card;
        this.amount = amount;
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

/*
Savings
Date (Image) Description Category Amount Balance

Credit Card
Date (Image) Description Category Card Amount

Checking
Date (Image) Description Category Amount Balance



Checking
- Date transaction happened
- Image
- Description of where money goes to/comes from
    - Company
    - Location (if useful)
    - Last 4 digits of Account # (if coming from a bank)
- Category:
    - Check, Deposit, Debit Card, Transfer
- Amount of transaction
- new Balance
- Check info (if check was used for transaction)


Savings
- Date transaction happened
- Image
- Description of where money goes to/comes from
    - Company
    - Interest (if it's the interest from that account)
    - Last 4 digits of Account # (if coming from a bank)
- Category:
    - Interest, Withdraw, Deposit, Transfer
- Amount of transaction
- new Balance


Credit Card
- Date transaction happened
- Image
- Description of where money goes to/comes from
    - Company
    - Location (if useful)
    - Last 4 digits of Account # (if coming from a bank)
- Category:
    - Examples: Gas, Restaurant, Payment, etc.
- Card number
- Amount of transaction

*/
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

    const node5 = document.createTextNode(this.card);

    p5.appendChild(node5);

    p5.setAttribute("class", "card");

    div7.appendChild(p5);

    return div7;

}

Transaction.prototype.createAmountHolder = function () {

    const div8 = document.createElement("div");

    div8.setAttribute("class", "amountholder");

    const p6 = document.createElement("p");

    var symbol = "-";



    if (this.amount > 0) {
        symbol = "+";

        p6.style.color = "green";
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

    const node6 = document.createTextNode(formatToUSD(this.balance));

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
    if (this.type == "Savings") {
        transactionType = "savingsTransaction";
    } else if (this.type == "Credit") {
        transactionType = "creditTransaction";
    } else if (this.type == "Checking") {
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

    if (this.type == "Credit") {

        div9.appendChild(this.createCardHolder());

        div9.appendChild(this.createAmountHolder());

    } else if (this.type == "Savings") {

        div9.appendChild(this.createAmountHolder());

        div9.appendChild(this.createBalanceHolder());

    } else if (this.type == "Checkings") {

        div9.appendChild(this.createAmountHolder());

        div9.appendChild(this.createBalanceHolder());

    }

    div10.appendChild(p7);

    var element = document.getElementById("transactionholder");

    element.appendChild(div9);

    element.appendChild(div10);

    transactioncounter++;
}


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
    if (accountType == "Savings") {
        transactionType = "savingsTitle";
    } else if (accountType == "Credit Card") {
        transactionType = "creditTitle";
    } else if (accountType == "Checking") {
        transactionType = "checkingTitle";
    }

    div1.classList.add("transactioninfo", transactionType);

    div1.appendChild(createDateTitle());

    div1.appendChild(createDescriptionTitle());

    div1.appendChild(createCategoryTitle());

    if (accountType == "Savings") {

        div1.appendChild(createAmountTitle());

        div1.appendChild(createBalanceTitle());

    } else if (accountType == "Credit Card") {

        div1.appendChild(createCardTitle());

        div1.appendChild(createAmountTitle());

    } else if (accountType == "Checking") {

        div1.appendChild(createAmountTitle());

        div1.appendChild(createBalanceTitle());

    }

    var element = document.getElementById("transactionholder");

    element.appendChild(div1);
}




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


/*
Testing function 
*/
var tempAdderToTransactions = function () { 
    if (accountType == "Credit Card") {
        addCreditCardTransaction(15, 4, 2025, 11, 33, "https://i.imgur.com/oyD6it3.png", "Casey's", "Gas", 12345, 12.45);
        addCreditCardTransaction(7, 8, 2024, 12, 43, "https://i.imgur.com/oyD6it3.png", "Mcdonald's", "Restaurant", 12345, -9.34);
        addCreditCardTransaction(4, 2, 2024, 4, 12, "https://i.imgur.com/oyD6it3.png", "Casey's", "Gas", 12345, 23.08);
    } else if (accountType == "Savings") {
        addSavingsTransaction(15, 4, 2025, 11, 33, "https://i.imgur.com/oyD6it3.png", "Casey's", "Gas", 1047.04, 10.00)
        addSavingsTransaction(7, 8, 2024, 12, 43, "https://i.imgur.com/oyD6it3.png", "Mcdonald's", "Restaurant", 1035.04, 12.00)
        addSavingsTransaction(7, 8, 2024, 12, 43, "https://i.imgur.com/oyD6it3.png", "Cash Deposit at Bank", "Deposit", 1050.04, 15)
    } else if (accountType == "Checking") {
        addCheckingTransaction(15, 4, 2025, 11, 33, "https://i.imgur.com/oyD6it3.png", "Casey's", "Gas", 500.07, 12.00)
        addCheckingTransaction(7, 8, 2024, 12, 43, "https://i.imgur.com/oyD6it3.png", "Mcdonald's", "Restaurant", 488.07, 12.00)
        addCheckingTransaction(4, 2, 2024, 4, 12, "https://i.imgur.com/oyD6it3.png", "Cash Deposit at Bank", "Deposit", 538.07, 50.00)
    }
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

/*
Testing function to get account balance
*/
var getAccountBalance = function (temp) {
    var balance = document.getElementById("balance");
    var numBalance;
    if (accountType == "Savings" || accountType == "Checking") {
        numBalance = temp["balance"]
    } else if (accountType == "Credit Card") {
        numBalance = temp["current-balance"]
    }
    balance.innerHTML = '<span class="currency">' + currency + '</span>' + addCommasToNumber(Math.floor(numBalance)) + '<span class="cents">' + getCents(numBalance) + '</span>';
}

/*
loadInAccountInfo function
- Loads in the account info sent to the transaction page
*/
var loadInAccountInfo = function () {
    getAccountBackground();
    var temp = JSON.parse(localStorage.getItem("account"));
    if (temp != undefined) {
        accountType = temp["type"]
        // accountID = temp["ID"]
        tempAdderToTransactions(accountType)
        var headerName = document.getElementById("headerName");
        headerName.innerHTML = accountType;
        getAccountBalance(temp);
    }
}

var addCreditCardTransaction = function (day, month, year, hour, second, logourl, desc, category, card, amount) {
    transactions.push(new CreditCardTransaction([day, month, year, hour, second], logourl, desc, category, card, amount));
}

var addSavingsTransaction = function (day, month, year, hour, second, logourl, desc, category, balance, amount) {
    transactions.push(new SavingsTransaction([day, month, year, hour, second], logourl, desc, category, balance, amount));
}

var addCheckingTransaction = function (day, month, year, hour, second, logourl, desc, category, balance, amount) {
    transactions.push(new SavingsTransaction([day, month, year, hour, second], logourl, desc, category, balance, amount));
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


var setUp = function () {
    getTransBorder();
    loadInAccountInfo();
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

setUp();














