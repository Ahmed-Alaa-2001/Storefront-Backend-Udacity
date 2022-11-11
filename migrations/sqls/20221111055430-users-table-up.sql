/* Replace with your SQL commands */
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(250) UNIQUE,
    user_name VARCHAR(250) UNIQUE,
    first_name VARCHAR(250) NOT NULL,
    last_name VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL
);