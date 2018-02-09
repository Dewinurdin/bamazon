var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('easy-table');
var t = new Table;

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
 		promptManager();
 });

 function endConnection(){
 	connection.end();
 };

 var prompt = inquirer.createPromptModule();

// View Low Inventory
// Add to Inventory
// Add New Product
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

function promptManager(){
	inquirer.prompt({
 		name: "menu",
 		type: "rawlist",
 		message: "View [PRODUCTS] for sale, View [LOW] Inventory, [ADD] products to Inventory or Add [NEW] products",
 		choices: ["PRODUCTS", "LOW", "ADD", "NEW"]
 	}).then(function(answer){
 		switch (answer.menu){
 			case "PRODUCTS":
 			viewProducts();
 			break;

 			case "LOW":
 			lowInventory();
 			break;

 			case "ADD":
 			addInventory();
 			break;

 			case "NEW":
 			addNewInventory();
 			break;
 		}
 	})
 };

 function viewProducts(){
 	console.log("View products for sale: \r\n");

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
		console.log(t.toString());
	});
 };

function lowInventory(){
	console.log("Lists of Products low in inventory < 30: ");
	// con.query("SELECT * FROM customers WHERE address = 'Park Lane 38'", function (err, result) {
  //   if (err) throw err;
  //   console.log(result);
  // });
	connection.query("SELECT * FROM products WHERE stock_quantity < 30", function(err, res){
		if (err) throw err;

		for (var i = 0; i < res.length; i++){
			t.cell('Product Id', res[i].title_id)
			t.cell('Description', res[i].product_name)
			t.cell('Department', res[i].department_name)
			t.cell("Price", res[i].price)
			t.cell("Quantity", res[i].stock_quantity)
			t.newRow()	
		}
		console.log(t.toString());
	})
};