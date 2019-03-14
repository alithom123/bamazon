 CREATE DATABASE bamazon;
 USE bamazon;
 
 CREATE TABLE products (
 	 item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
     product_name VARCHAR(200) NULL,
     department_name VARCHAR(200) NULL,
     price DECIMAL(10,2) NULL, 
     stock_quantity INT NULL
 );
 
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES 
   ("Portable Massager", "Health", 39.99, 24),
   ("Cat Food", "Pets", 12.99, 50),
   ("Comb", "Beauty", 4.99, 25),
   ("MacBook Pro", "Electronics", 999.99, 8),
   ("Captain Crunch Cereal", "Food", 4.00, 52),
   ("Turkey Lunchable", "Food", 2.00, 60),
   ("Soy Milk", "Food", 2.99, 20),
   ("Lavender Hand Soap", "Beauty", 1.49, 12),
   ("Yoga Matt", "Athletics", 19.99, 4),
   ("Adidas Soccer Ball", "Athletics", 19.99, 1);
   
   SELECT * FROM products;