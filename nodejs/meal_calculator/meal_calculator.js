
var taxRate = .2;
var tipRate = .3;
var menu = {
	'chicken': 5,
	'cheese': 2,
	'fish': 10,
	'beef': 23,
	'water': 0,
	'imported artisinal beer': 50,
	'duck': 12,
	'reindeer': 35
}

var options = Object.keys(menu);

var diner = function(name) { 
	var total = 0;
	var tab = [];
	var items = {};
	
	items.addItem = function(item){
		total += menu[item];
		tab.push([item + ":$" + menu[item]]);
	}
	items.getItems = function(){
		return tab;
	}
	items.getCheckTotal = function(){
		return total;
	}
	items.getCheckTotalWithTax = function(){
		return total*(1+taxRate);
	}
	items.whoami = function(){return name;};


	
	return items;

}

// Set up the diners
var diners = {0:diner("jim"), 1:diner("joe"), 2:diner("jake"), 3:diner("jack")};
var mealTotal = 0;
var taxTotal = 0;
var tipTotal = 0;
var paidTotal = 0;
var paidTotalArr = [];

// Get the orders of the diners, serve them, and get to total bill
for (var i in diners){
	
	diners[i].addItem(options[Math.floor(Math.random()*options.length)]);
	diners[i].addItem(options[Math.floor(Math.random()*options.length)]);
		
	console.log(diners[i].whoami() + " ordered " + diners[i].getItems());
	mealTotal += diners[i].getCheckTotal();
	paidTotalArr.push(diners[i].getCheckTotalWithTax());
	
}

// Calculate tip and tax overall
taxTotal = Math.round((mealTotal*taxRate + 0.00001)*100)/100;
tipTotal = Math.round((mealTotal*tipRate + 0.00001)*100)/100;

console.log("\nTotal without tax and tip: "+mealTotal);
console.log("Tip total: "+tipTotal);
console.log("Tax total: "+taxTotal);
console.log("Total Bill is: $" + (mealTotal+taxTotal+tipTotal) + "\n" );

// Output what each person has to pay 
for(var i=0;i<paidTotalArr.length;i++){
	paidTotal += Math.round((paidTotalArr[i] + (tipTotal/paidTotalArr.length) + 0.00001)*100)/100;
	console.log(diners[i].whoami() + " owes $" + (Math.round((paidTotalArr[i] + (tipTotal/paidTotalArr.length) + 0.00001)*100)/100));
}

console.log("Diners paid $"+paidTotal+" in total! Good job!");

