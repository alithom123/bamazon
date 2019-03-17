var mysql = require("mysql");
var inquirer = require("inquirer");

console.log("bamazonCustomer.js is running");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql!LKJ33',
    database: 'bamazon'
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// the function for the app
var start = function () {
    // variables we'll need
    var productArray;
    var productChoiceQuestion;
    var selectedProduct;
    var selectedProductIndex;
    var buyQuantity;

    // Print initial list of products.
    getProductList()
        .then(products => {
            // Save products in local variable.
            productArray = products;

            // Print Product List.
            printProductList(products);

            // Create array of only product names for prompting user.
            var productNames = [];
            products.forEach(function (eachProduct) {
                productNames.push(eachProduct.product_name);
            });

            // Create inquirer prompt for product.
            productChoiceQuestion = {
                name: "productChoice",
                type: "rawlist",
                message: "Which product would you like to buy?",
                choices: productNames
            };

            inquirer.prompt([productChoiceQuestion])
                .then(answer => {
                    // console.log("You chose", answer);

                    // Reset selected product 
                    selectedProductIndex = null;
                    selectedProduct = null;

                    // Find which product they chose.
                    for (let i = 0; i < products.length; i++) {
                        // console.log("looping");
                        if (answer.productChoice === products[i].product_name) {
                            selectedProduct = products[i];
                            selectedProductIndex = i;
                            // console.log("selectedProduct:", selectedProduct);
                        }
                    }

                    // Create inquirer prompt for quantity to sell.
                    buyQuantityQuestion = {
                        name: "buyQuantity",
                        type: "input",
                        message: "How many would you like to buy?"
                    };

                    inquirer.prompt(buyQuantityQuestion)
                        .then(quantityAnswer => {
                            buyQuantity = parseInt(quantityAnswer.buyQuantity, 10);
                            // console.log("You want to buy quantity", buyQuantity);
                            if (isNaN(buyQuantity)) {
                                console.log("You need to enter a valid number");
                            } else {
                                // console.log("selectedProduct:", selectedProduct);
                                let newQuantity = selectedProduct.stock_quantity - buyQuantity;
                                sellProduct(selectedProduct, newQuantity)
                                    .then(boolresult => {
                                        console.log("The total cost of your purchase was " + buyQuantity * selectedProduct.price);
                                        start();
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    });
                            }
                        });


                })

                .catch(err => {
                    console.log(err);
                });

        });

    /* Start bidding loop for customer. */
};

function sellProduct(product, newQuantity) {
    // console.log("product:", product);
    // console.log("newQuantity:", newQuantity);
    return new Promise((resolve, reject) => {
        connection.query('UPDATE products SET stock_quantity =' + newQuantity + ' WHERE item_id =' + product.item_id, function (error, results, fields) {
            if (error)
                reject(error);
            else
                resolve(true);
        });
    });
}

function getProductList() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM products', function (error, results, fields) {
            if (error) reject(error);

            let productArray = [];
            results.forEach(function (eachProduct) {
                let p = {
                    item_id: eachProduct.item_id,
                    product_name: eachProduct.product_name,
                    department_name: eachProduct.department_name,
                    price: eachProduct.price,
                    stock_quantity: eachProduct.stock_quantity
                }
                // console.log(results);
                productArray.push(p);
            });
            resolve(productArray);
        });
    });
};

function printProductList(products) {
    console.log(
        `
    =========================================================
    Item_id Product_Name Department_Name Price Stock_Quantity
    =========================================================
    `);
    products.forEach(p => {
        console.log(`${p.item_id} ${p.product_name} ${p.department_name} ${p.price} ${p.stock_quantity}`);
    });
    console.log(
        `
    =========================================================
    `);
}