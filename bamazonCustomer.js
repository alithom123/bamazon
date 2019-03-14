var inquirer = require("inquirer");
var mysql = require("mysql");


console.log("bamazonCustomer.js is running");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql!LKJ33',
    database: 'bamazon'
});

connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    // console.log('The solution is: ', results[0].solution);
    // console.log('The products: ', results);
    console.log(
        `
Product Id | Product Name | Department | Price | Quantity
___________________________________________
`);
    results.forEach(function (product) {
        console.log(`${product.item_id} ${product.product_name} ${product.department_name}   ${product.price}    ${product.stock_quantity}`);
    })
    // console.log('The products: ', results);
});

connection.end();