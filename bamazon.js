var mysql = require("mysql");
var inquirer = require("inquirer");

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

            let productArray = [];
            results.forEach(function (eachProduct) {
                let p = {
                    item_id: eachProduct.item_id,
                    product_name: eachProduct.product_name,
                    deparment_name: eachProduct.deparment_name,
                    price: eachProduct.price,
                    stock_quantity: eachProduct.stock_quantity
                }
                // console.log("each:", p);
                productArray.push(p);
            });


            // console.log("array: ", productArray);
            resolve(productArray);
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


    var productArray;
    var productChoiceQuestion;
    var selectedProduct;

    // Print initial list of products.
    getProductList()
        .then(products => {
            // console.log("resolved: ", products);
            // Store products.
            productArray = products;

            // Print Product List.
            printProductList(products);

            // Create array of only product names.
            var productNames = [];
            products.forEach(function (eachProduct) {
                productNames.push(eachProduct.product_name);
            });

            // Create inquirer prompt for product.
            productChoiceQuestion = {
                message: "Which product would you like to buy?",
                type: "list",
                name: "productChoice",
                choices: productNames
            };

            inquirer.prompt([productChoiceQuestion])
                .then(answers => {
                    console.log("You chose", answers);

                    // Find which product they chose.

                    for (let i = 0; i < products.length; i++) {
                        if (answers === products[i].product_name) {
                            selectedProduct = products[i];
                            console.log("selectedProduct:", selectedProduct);
                        }
                    }

                })
                .catch(err => {
                    console.log(err);
                });

        });

    /* Start bidding loop for customer. */




    // Great Bay as base. 
};


start();
// Use async await.



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