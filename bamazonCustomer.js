var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('easy-table');

var connection = mysql.createConnection({
 	host: "localhost",
 	port: 3306,
 	user: "root",
 	password: "root",
 	database: "bamazon"
 });

 connection.connect(function(err){
 	if (err) throw err;
 		console.log("Connection ID: " + connection.threadId);
 });

 function endConnection(){
 	connection.end();
 };

 var t = new Table;

connection.query("SELECT * FROM products", function(err, res){
	if (err) throw err;
	
	for (var i =0; i < res.length; i++){
		t.cell('Product Id', res[i].title_id)
		t.cell('Description', res[i].product_name)
		t.cell('Department', res[i].department_name)
		t.cell("Price", res[i].price)
		t.cell("Quantity", res[i].stock_quantity)
		t.newRow()		 
	}
	console.log(t.toString())

	start();
});

//  The app should then prompt users with two messages.
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
var prompt = inquirer.createPromptModule();
var start = function(){
	prompt([
		{
		name: "id",
		type: "input",
		message: "Select product ID that you would like to buy: " + "\r\n",
	}, {
		name: "quantity",
		type: "input",
		message: "How many unit would you like to purchase?" + "\r\n",
	

	}]).then(function(answer){
		// answer.id
		// answer.quantity
		connection.query("SELECT * FROM products WHERE title_id = ?", [answer.id], function(err, res){
			if(err) throw err;

		var total = parseFloat(res[0].price).toFixed(2) * parseInt(answer.quantity);
			console.log("Your grand total is: $",total);

			updateQuantity(res, answer);
		})			
	})		
};
 
// parameters

var updateQuantity = function(res, answer) {
			// answer.quantity
			// res[0].stock_quantity

			// Substract the user order quantity from Inventory 
			var remaining = parseInt(res[0].stock_quantity) - parseInt(answer.quantity);

			connection.query("UPDATE products SET stock_quantity = ? WHERE title_id = ?", [remaining, answer.id], function(err, quantity){
				if(err) throw err;

				console.log("Database has been updated!");
				console.log("Current inventory for that product is ", remaining);
			});			
};

