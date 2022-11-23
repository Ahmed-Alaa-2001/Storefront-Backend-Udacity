**_Table of Contents_**

- [API and Database Requirements](#api-and-database-requirements)
  - [API Endpoints](#api-endpoints)
    - [Users](#users)
    - [Products](#products)
    - [Orders](#orders)
    - [orders-products](#order-products)
  - [Data Schema](#data-schema)
    - [Products Schema](#products-schema)
    - [Users Schema](#users-schema)
    - [Orders Schema](#orders-schema)
    - [orders-products](#products-for-each-order-schema)
  - [Data Shapes](#data-shapes)
    - [User](#user)
    - [Product](#product)
    - [Order](#order)
    - [orders-products](#order-product)

# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- showAll-->'GET'
- showByID-->'GET'
- createNewProduct [token required]-->'POST'
- edit [token required]-->'PATCH'
- deleteById [token required]'DELETE'
- deleteAll [token required]'DELETE'

#### Users

- Endpoint:- `/api/users/`

- showAll [token required] -->'GET'
- showByID [token required]-->'GET'
- createNewUser-->'POST'
- login-->'POST'
- edit [token required]-->'PATCH'
- deleteById [token required]-->'DELETE'
- deleteAll [token required]-->'DELETE'

#### Orders

- (OrderByUserId)Current Order by user (args: user id)[token required]
- create [token required]-->'POST'
- deleteById [token required]-->'DELETE'
- edit [token required]-->'PATCH'
- showById [token required]-->'GET'
- showProductById in order [token required]-->'GET'

#### orders-products

- showallProducts [token required]-->'GET'
- showProduct [token required]-->'GET'
- create [token required]-->'POST'
- delete [token required]-->'DELETE'
- edit [token required]-->'PATCH'

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- email
- userName
- firstName
- lastName
- password

#### Orders

- id
- user_id
- status (active/pendding or complete)

#### order_products

- id
- order id
- id of each product in the order
- quantity of each product in the order

#### Database shcemas

- users shema

Table "public.users"
Column | Type | Collation | Nullable | Default
------------+------------------------+-----------+----------+-----------------------------------
id | integer | | not null | nextval('users_id_seq'::regclass)
email | character varying(250) | | |
user_name | character varying(250) | | |
first_name | character varying(250) | | not null |
last_name | character varying(250) | | not null |
password | character varying(250) | | not null |
Indexes:
"users_pkey" PRIMARY KEY, btree (id)
"users_email_key" UNIQUE CONSTRAINT, btree (email)
"users_user_name_key" UNIQUE CONSTRAINT, btree (user_name)
Referenced by:
TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

- products schema

Table "public.products"
Column | Type | Collation | Nullable | Default
-------------+------------------------+-----------+----------+--------------------------------------
id | integer | | not null | nextval('products_id_seq'::regclass)
name | character varying(50) | | not null |
description | character varying(255) | | |
price | integer | | not null |
category | character varying(50) | | not null |
Indexes:
"products_pkey" PRIMARY KEY, btree (id)
Referenced by:
TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

- orders schema

Table "public.orders"
Column | Type | Collation | Nullable | Default
---------+-----------------------+-----------+----------+------------------------------------
id | integer | | not null | nextval('orders_id_seq'::regclass)
status | character varying(50) | | |
user_id | integer | | not null |
Indexes:
"orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
"orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)

- orders_product schema

Table "public.order_products"
Column | Type | Collation | Nullable | Default
------------+---------+-----------+----------+--------------------------------------------
id | integer | | not null | nextval('order_products_id_seq'::regclass)
quantity | integer | | |
product_id | integer | | not null |
order_id | integer | | not null |
Indexes:
"order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
"order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
"order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
