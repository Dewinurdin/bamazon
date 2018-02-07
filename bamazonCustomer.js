  var mysql = require("mysql");
  var inquirer = require("inquirer");
 var consoleTable = require('console-table');

 var connection = mysql.createConnection({
 	host: "localhost",
 	port: 3306,
 	user: "root",
 	password: "root",
 	database: "bamazon"
 });

 connection.connect(function(err){
 	if (err) throw err;
 		// console.log("Connection ID: " + connection.threadId);
 });

 function endConnection(){
 	connection.end();
 };

 // Running this application will first display all of the items available for sale. 
 //Include the ids, names, and prices of products for sale.

//  The app should then prompt users with two messages.
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
var prompt = inquirer.createPromptModule();
 
prompt([{
		name: "purchase",
		type: "input",
		message: "Select product ID that you would like to buy: " + "\r\n",
		pageSize: displayItems(),		
	}, {
		name: "quantity",
		type: "input",
		message: "How many unit would you like to purchase?",
	}
	]).then(function(answer){
		connection.query("SELECT * FROM products WHERE ?", {
			purchase: answer.purchase,
			quantity: answer.quantity
		}, function(err, res){
				if (err) {
					console.log(err);
				} else {
					
				}
		})
	});

function displayItems(){
 			connection.query("SELECT * FROM products", function(err, res){
 			for (var i = 0; i < res.length; i++){
	 				consoleTable([
					  [res[i].title_id, " | ", res[i].product_name, " | ", res[i].department_name, " | ", res[i].price, " | ", res[i].stock_quantity],
					 ]); 		
		 			}
			 	})
			 };
