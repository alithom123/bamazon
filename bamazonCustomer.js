var inquirer = require("inquirer");
var mysql = require("mysql");


console.log("bamazonCustomer.js is running");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql!LKJ33',
    database: 'bamazon'
});


async function getProductList() {
    var choices = [];
    choices = await connection.query('SELECT * FROM products', function (error, results, fields) {
        if (error) throw error;
        var arr = [];
        results.forEach(function (product) {
            arr.push(`${product.product_name} - ${product.price}`);
            // console.log(choices);
        });
        return choices;
    });
    console.log(choices);
    // console.log("Choices I found ", choices);
    return choices;
};




var start = async function () {
    connection.connect();
    // getProductList();
    // return;
    var productChoiceQuestion = {
        message: "Which product would you like to buy?",
        type: "list",
        name: "productChoice",
        choices: getProductList()
    };

    inquirer.prompt([productChoiceQuestion, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]])
        .then(answers => {
            console.log("You chose", answers);
        });
    getProductList();

    // Print List of Products
    let products = await connection.query('SELECT * FROM products', function (error, results, fields) {
        if (error) throw error;
        return results;
        // console.log(
        //     `
        //         Product Id | Product Name | Department | Price | Quantity
        //         ___________________________________________
        //         `);
        // results.forEach(function (product) {
        //     console.log(`${product.item_id} ${product.product_name} ${product.department_name}   ${product.price}    ${product.stock_quantity}`);
        // });
    });
    // console.log(products);
    return;

    // var productChoiceQuestion = {
    //     message: "Which product would you like to buy?",
    //     type: "list",
    //     name: "productChoice",
    //     choices: getProductList()
    // };

    // inquirer.prompt([productChoiceQuestion, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]])
    //     .then(answers => {
    //         console.log("You chose", answers);
    //     });

};

start();

// Use async await.