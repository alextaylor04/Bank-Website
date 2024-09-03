var currency = "$";

function transaction (date, logourl, description, category, card, amount) {
    this.date = date;
    this.logourl = logourl;
    this.description = description;
    this.category = category;
    this.card = card;
    this.amount = amount;
    this.state = "off";
}
transactioncounter = 0;
transaction.prototype.printOnScreen = function (surrond_state) {
    const div10 = document.createElement("div");

    div10.id = "hiddeninfo" + transactioncounter;

    div10.setAttribute("class", "hiddeninfo");

    const div9 = document.createElement("div");

    div9.setAttribute("class", "transaction");

    const p7 = document.createElement("p");

    const node7 = document.createTextNode("Purchase date: August 12th, 2024 17:24");

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

    const node6 = document.createTextNode("$14.53");

    p6.appendChild(node6);

    p6.setAttribute("class", "amount");

    const p5 = document.createElement("p");

    const node5 = document.createTextNode("12345");

    p5.appendChild(node5);

    p5.setAttribute("class", "card");

    const p4 = document.createElement("p");

    const node4 = document.createTextNode("Dining");

    p4.appendChild(node4);

    p4.setAttribute("class", "category");

    const p3 = document.createElement("p");

    const node3 = document.createTextNode("Casey's General Store");

    p3.appendChild(node3);

    p3.setAttribute("class", "desc");

    const img1 = document.createElement("img");

    img1.src = "https://i.imgur.com/oyD6it3.png";

    img1.setAttribute("class", "icon");

    const p2 = document.createElement("p");

    const node2 = document.createTextNode("08");

    p2.appendChild(node2);

    p2.setAttribute("class", "day");

    const p1 = document.createElement("p");

    const node1 = document.createTextNode("Aug");

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
transaction.prototype.getYear = function () {
    // return this.date.getYear();
}
transaction.prototype.getState = function () {
    return this.state;
}
transaction.prototype.updateState = function (state) {
    this.state = state;
}
function date(day, month, year, hour, second) {
    this.year = year
    this.day = day;
    this.month = month;
    this.hour = hour;
    this.second = second;
}
date.prototype.getYear = function () {
    return this.year;
}
var transactions = [new transaction(new date(2024, 12, "August", 17, 14), "https://i.imgur.com/oyD6it3.png", "Casey's", "Gas", "12345", 10.59), new transaction(new date(2024, 12, "August", 17, 14), "https://i.imgur.com/oyD6it3.png", "Casey's", "Gas", "12345", 10.59), new transaction(new date(2024, 12, "August", 17, 14), "https://i.imgur.com/oyD6it3.png", "Casey's", "Gas", "12345", 10.59)];
for (var i = 0; i < transactions.length; i++) {
    var surround_state;
    if (i + 1 < transactions.length) {
        // make get year work
    }
    transactions[i].printOnScreen();
}


var openTransaction = function (num) {
    var state = transactions[num].getState();
    var hiddeninfo = document.getElementById("hiddeninfo" + num);
    var arrow = document.getElementById("arrow" + num);
    if (state === "off") {
        hiddeninfo.style.display = "flex";
        transactions[num].updateState("clicked")
        arrow.classList.remove("fa-chevron-down");
        arrow.classList.add("fa-chevron-right");
    } else if (state === "clicked") {
        hiddeninfo.style.display = "none";
        transactions[num].updateState("off")
        arrow.classList.remove("fa-chevron-right");
        arrow.classList.add("fa-chevron-down");
    }
    
}

// when adding to transactions need to make border-radius only apply to correct corners.
// Also need to make year thing work



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

var temp = JSON.parse(localStorage.getItem("account"));
if (temp != undefined) {
    var type = temp["type"]
    var headerName = document.getElementById("headerName");
    headerName.innerHTML = type;
    if (type != "Credit Card" || type != "Rewards") {
        var balance = document.getElementById("balance");
        var numBalance = temp["balance"]
        balance.innerHTML = '<span class="currency">' + currency + '</span>' + addCommasToNumber(Math.floor(numBalance)) + '<span class="cents">' + getCents(numBalance) + '</span>';
        ;
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
// localStorage.removeItem("imagenum1");





/*
- Date
- Company Name
    - Ex: Casey's General Store
    - Ex: Checking Account (like if you were to pay off your credit card from your checking)
    - Ex: PNC Bank
- category (Ex: dining, gas, payment, etc.)
- card number
- amount (negative # if it's sent out)
- variable to be used for image icon
    - Ex: Mcdonald's is 1, Casey's is 2, etc.
*/