  var mysql = require("mysql");
  var inquirer = require("inquirer");

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
 	// connection.end(); 
 	displayItems();
 });

 // Running this application will first display all of the items available for sale. 
 //Include the ids, names, and prices of products for sale.

 function displayItems(){
 	connection.query("SELECT * FROM products", function(err, res){
 		for (var i = 0; i < res.length; i++){
 			console.log(res[i].title_id + "|" + res[i].product_name + "|" + res[i].department_name + "|" + res[i].price + "|" + res[i].stock_quantity);
 		}
 	})
 };

//  The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.

