var currency = "$";

function Transaction (date, logourl, description, category, card, amount) {
    this.customdate = new CustomDate(date[0], date[1], date[2], date[3], date[4]);
    this.logourl = logourl;
    this.description = description;
    this.category = category;
    this.card = card;
    this.amount = amount;
    this.state = "off";
    this.bottomstate = "none";
    this.topstate = "none";
}
var transactioncounter = 0;
var transactionBorderRadius;
function getTransBorder() {
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    transactionBorderRadius = rs.getPropertyValue('--blue');
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
- Description of where money goes to/comes from
    - Company
    - Location (if useful)
    - Last 4 digits of Account # (if coming from a bank)
- Amount of transaction
- Category:
    - Check, Deposit, Debit Card, Transfer
- Image
- new Balance
- Check info (if check was used for transaction)


Savings
- Date transaction happened
- Description of where money goes to/comes from
    - Company
    - Interest (if it's the interest from that account)
    - Last 4 digits of Account # (if coming from a bank)
- Amount of transaction
- Category:
    - Interest, Withdraw, Deposit, Transfer
- Image
- new Balance


Credit Card
- Date transaction happened
- Description of where money goes to/comes from
    - Company
    - Location (if useful)
    - Last 4 digits of Account # (if coming from a bank)
- Amount of transaction
- Category:
    - Examples: Gas, Restaurant, Payment, etc.
- Card number
- Image

*/
getTransBorder();
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
var getMonthString = function (month) {
    return months[month];
}
var getShortMonthString = function (month) {
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
    return `$${amount.toFixed(2)}`;
}

Transaction.prototype.printOnScreen = function () {
    const div10 = document.createElement("div");

    div10.id = "hiddeninfo" + transactioncounter;

    div10.setAttribute("class", "hiddeninfo");

    const div9 = document.createElement("div");

    div9.id = "transaction" + transactioncounter;

    div9.setAttribute("class", "transaction");

    if (this.bottomstate === "no rounding") {
        div9.style.borderBottomRightRadius = "0px";
        div9.style.borderBottomLeftRadius = "0px";
    }
    if (this.topstate === "no rounding") {
        div9.style.borderTopRightRadius = "0px";
        div9.style.borderTopLeftRadius = "0px";
    }

    const p7 = document.createElement("p");

    const node7 = document.createTextNode("Purchase date: " + getMonthString(this.getMonth()) + " " + this.getDay() + getDaySuffix(this.getDay()) + ", " + this.getYear() + " " + this.getHour() + ":" + this.getSecond());

    p7.appendChild(node7);

    p7.setAttribute("class", "hiddendate");

    const div8 = document.createElement("div");

    div8.setAttribute("class", "amountholder");

    const div7 = document.createElement("div");

    div7.setAttribute("class", "cardholder");

    const div6 = document.createElement("div");

    div6.setAttribute("class", "categoryholder");

    const div5 = document.createElement("div");

    div5.setAttribute("class", "descholder");

    const div4 = document.createElement("div");

    div4.setAttribute("class", "iconholder");

    const div3 = document.createElement("div");

    div3.setAttribute("class", "dateholder");

    const div2 = document.createElement("div");

    div2.setAttribute("class", "arrowholder");

    const p6 = document.createElement("p");

    const node6 = document.createTextNode(formatToUSD(this.amount));

    p6.appendChild(node6);

    p6.setAttribute("class", "amount");

    const p5 = document.createElement("p");

    const node5 = document.createTextNode(this.card);

    p5.appendChild(node5);

    p5.setAttribute("class", "card");

    const p4 = document.createElement("p");

    const node4 = document.createTextNode(this.category);

    p4.appendChild(node4);

    p4.setAttribute("class", "category");

    const p3 = document.createElement("p");

    const node3 = document.createTextNode(this.description);

    p3.appendChild(node3);

    p3.setAttribute("class", "desc");

    const img1 = document.createElement("img");

    img1.src = "https://i.imgur.com/oyD6it3.png";

    img1.setAttribute("class", "icon");

    const p2 = document.createElement("p");

    const node2 = document.createTextNode(formatDayString(this.getDay()));

    p2.appendChild(node2);

    p2.setAttribute("class", "day");

    const p1 = document.createElement("p");

    const node1 = document.createTextNode(getShortMonthString(this.getMonth()));

    p1.appendChild(node1);

    p1.setAttribute("class", "month");

    const div1 = document.createElement("div");

    div1.innerHTML = ' <i class="fa-solid fa-chevron-down" id="arrow'+ transactioncounter + '"></i> ';

    var tempnum = transactioncounter;
    div1.onclick = function() { openTransaction(tempnum) };

    div1.setAttribute("class", "arrowwiden");

    div2.appendChild(div1);

    div3.appendChild(p1);

    div3.appendChild(p2);

    div4.appendChild(img1);

    div5.appendChild(p3);

    div6.appendChild(p4);

    div7.appendChild(p5);

    div8.appendChild(p6);

    div9.appendChild(div2);

    div9.appendChild(div3);

    div9.appendChild(div4);

    div9.appendChild(div5);

    div9.appendChild(div6);

    div9.appendChild(div7);

    div9.appendChild(div8);

    div10.appendChild(p7);

    var element = document.getElementById("transactionholder");

    element.appendChild(div9);

    element.appendChild(div10);

    transactioncounter++;
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

var transactions = [ // day month year hour second
    new Transaction([12, 8, 2024, 17, 14], "https://i.imgur.com/oyD6it3.png", "Casey's", "Gas", "12345", 10.59),
    new Transaction([7, 3, 2023, 9, 54], "https://i.imgur.com/oyD6it3.png", "Mcdonald's", "Restaurant", "12345", 12.11),
    new Transaction([24, 6, 2023, 3, 34], "https://i.imgur.com/oyD6it3.png", "Love's", "Gas", "12345", 13.00)
];

var printYearGap = function (year) {
    const h1 = document.createElement("h1");
    const node1 = document.createTextNode(year + " Transactions");
    h1.appendChild(node1);
    h1.setAttribute("class", "yearGap");
    var element = document.getElementById("transactionholder");
    element.appendChild(h1);
}

/*
createTitles function
- creates the blue titles for all the transactions
*/
var createTitles = function () {
    const div1 = document.createElement("div");

    div1.setAttribute("class", "transactioninfo");

    const p5 = document.createElement("p");

    const node5 = document.createTextNode("AMOUNT");

    p5.appendChild(node5);

    p5.setAttribute("class", "amountinfo");

    const p4 = document.createElement("p");

    const node4 = document.createTextNode("CARD");

    p4.appendChild(node4);

    p4.setAttribute("class", "cardinfo");

    const p3 = document.createElement("p");

    const node3 = document.createTextNode("CATEGORY");

    p3.appendChild(node3);

    p3.setAttribute("class", "categoryinfo");

    const p2 = document.createElement("p");

    const node2 = document.createTextNode("DESCRIPTION");

    p2.appendChild(node2);

    p2.setAttribute("class", "descinfo");

    const p1 = document.createElement("p");

    const node1 = document.createTextNode("DATE");

    p1.appendChild(node1);

    p1.setAttribute("class", "dateinfo");

    div1.appendChild(p1);

    div1.appendChild(p2);

    div1.appendChild(p3);

    div1.appendChild(p4);

    div1.appendChild(p5);

    var element = document.getElementById("transactionholder");

    element.appendChild(div1);
}

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





var accountBackgroundColors = ["rgb(38,66,97)", "rgb(22, 96, 133)", "rgb(37, 41, 43)", "linear-gradient( rgba(0,0,0,.5), rgba(0,0,0,.6) ),url(../Images/stars_1.jpeg)", "linear-gradient(rgba(58, 136, 70, 0.9), rgba(58, 136, 70, 0.7)),url(../Images/grass.jpg)"]; 

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
loadInAccountInfo function
- Loads in the account info sent to the transaction page
*/
var loadInAccountInfo = function () {
    var temp = JSON.parse(localStorage.getItem("account"));
    if (temp != undefined) {
        var type = temp["type"]
        var headerName = document.getElementById("headerName");
        headerName.innerHTML = type;
        console.log(type == "Credit Card");
        var balance = document.getElementById("balance");
        if (type == "Savings" || type == "Checking") {
            var numBalance = temp["balance"]
            balance.innerHTML = '<span class="currency">' + currency + '</span>' + addCommasToNumber(Math.floor(numBalance)) + '<span class="cents">' + getCents(numBalance) + '</span>';
        } else if (type == "Credit Card") {
            var numBalance = temp["current-balance"]
            balance.innerHTML = '<span class="currency">' + currency + '</span>' + addCommasToNumber(Math.floor(numBalance)) + '<span class="cents">' + getCents(numBalance) + '</span>';
        }
    }
    var heading = document.getElementById("heading")
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
loadInAccountInfo();














