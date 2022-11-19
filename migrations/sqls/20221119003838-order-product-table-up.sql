/* Replace with your SQL commands */
CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    quantity INT,
    product_id INT REFERENCES products(id) NOT NULL,
    order_id INT REFERENCES orders(id) NOT NULL
);