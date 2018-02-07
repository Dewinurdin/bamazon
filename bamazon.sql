DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
title_id INT NOT NULL auto_increment,
product_name VARCHAR (50) NULL,
department_name VARCHAR (50) NULL,
price DECIMAL (65,2) NULL,
stock_quantity INT NULL,
PRIMARY KEY (title_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Iphone", "Electronic", 899.99, 25), ("XBOX 360", "Electronic", 499.99, 30), ("Silver Ring", "Jewelry", 400, 10), ("Gold Chain", "Jewelry", 565.99, 12), ("Lysol", "Household", 3.99, 100), ("Windex", "Household", 3.99, 99), ("Colgate", "Health & Beauty", 2.59, 200), ("Pantene", "Health & Beauty", 3.59, 99), ("Logo T-Shirt", "Apparel", 9.99, 157), ("Yoga Pants", "Apparel", 12.99, 54);products
