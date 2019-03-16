var inquirer = require("inquirer");
var mysql = require("mysql");


console.log("bamazonCustomer.js is running");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql!LKJ33',
    database: 'bamazon'
});


function getProductList() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM products', function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
            // let productArray = [];
            // console.log(results);
            // results.forEach(function (product) {
            //     console.log(product);
            //     productArray.push(product);
            // });
            // resolve(productArray);
        });
    });
};

function printProductList(products) {
    console.log(`Item_id Product_Name Department_Name Price Stock_Quantity`);
    products.forEach(p => {
        console.log(`${p.item_id} ${p.product_name} ${p.department_name} ${p.price} ${p.stock_quantity}`);
    });
}

var start = function () {
    connection.connect();

    // Print initial list of products.
    getProductList()
        .then(products => {
            // Print Product List.
            conso
            printProductList(products);
        });
};


start();
// Use async await.

// Create Prompt 
// var productChoiceQuestion = {
//     message: "Which product would you like to buy?",
//     type: "list",
//     name: "productChoice",
//     choices: products
// };

// inquirer.prompt([productChoiceQuestion, products])
//     .then(answers => {
//         console.log("You chose", answers);
//     });

// promptProduct(products);
// })
// .catch(err => {
//     console.error(err);
// }

// }
// )

// }

// Print List of Products
// let products = await connection.query('SELECT * FROM products', function (error, results, fields) {
//     if (error) throw error;
//     return results;
// console.log(
//     `
//         Product Id | Product Name | Department | Price | Quantity
//         ___________________________________________
//         `);
// results.forEach(function (product) {
//     console.log(`${product.item_id} ${product.product_name} ${product.department_name}   ${product.price}    ${product.stock_quantity}`);
// });
// });
// console.log(products);
// return;



// };