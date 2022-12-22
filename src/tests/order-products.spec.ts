import db from '../database';
import { User, UserModel } from '../models/UserModel';
import { Product, ProductModel } from '../models/ProductModel';
import { Order, OrderModel } from '../models/OrderModel';
import { OrderProduct, OrderProductModel } from '../models/OrderProductModel';
import supertest from 'supertest'
import app from '../index'

let token: string = '';

const request = supertest(app);

const userModel = new UserModel();
const productModel = new ProductModel();
const orderModel = new OrderModel();
const orderProductModel = new OrderProductModel();
describe('test Order Product endpoints', () => {
    const user = {
        email: 'ahmed1@gmail.com',
        user_name: 'ahmed1',
        first_name: 'ahmed',
        last_name: 'alaa',
        password: '1234'
    } as User;
    const product = {
        name: 'product name',
        description: 'product description',
        price: 20,
        category: 'Electronics.'
    } as Product;
    const order = {
        userId: 1,
        status: 'active'
    } as Order;
    const orderProduct = {
        quantity: 1,
        order_id: 1,
        product_id: 1
    } as OrderProduct;
    beforeAll(async () => {
        await userModel.createNewUser(user);
        await productModel.createNewProduct(product);
        await orderModel.create(order);
    });
    afterAll(async () => {
        const connection = await db.connect();
        const sql = `DELETE FROM order_products;
                    ALTER SEQUENCE order_products_id_seq RESTART WITH 1;
                    DELETE FROM orders;
                    ALTER SEQUENCE orders_id_seq RESTART WITH 1;
                    DELETE FROM products;
                    ALTER SEQUENCE products_id_seq RESTART WITH 1;
                    DELETE FROM users;
                    ALTER SEQUENCE users_id_seq RESTART WITH 1`;
        await connection.query(sql);
        connection.release();
    });

    describe('Test Login method', () => {
        it('get token', async () => {
            const response = await request
                .post('/api/users/login')
                .set('Content-type', 'application/json')
                .send({
                    user_name: 'ahmed1',
                    password: '1234'
                });
            // console.log(response.body.data);
            
            const { token: userToken } = response.body.data;
            token = userToken;
        });
    });

    describe('Test Order Product CRUD Endpoints', () => {
        it('create new order product', async () => {
            const res = await request
            .post('/api/orders-products/add/1')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(orderProduct);
            expect(res.status).toBe(200);
        });
    
        it('show specific order', async () => {
            const res = await request
            .get('/api/orders-products/show/1/products/1')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
        });
        it('show all orders', async () => {
            const res = await request
            .get('/api/orders-products/showall/1/products')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
        });
    
        it('update order product info', async () => {
            const res = await request
            .patch('/api/orders-products/edit/1/products/1')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: 1,
                product_id: 1,
                order_id: 1,
                quantity: 4
            });    
            expect(res.status).toBe(200);
        });
    
        it('delete order', async () => {
            const res = await request
            .delete('/api/orders-products/delete/1/products/1')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                productId: 1,
                orderId: 1
            });
            expect(res.status).toBe(200);
        });
    });
});

describe('Order Product Model', () => {
    describe('Test methods exist', () => {
        
        it('delete method', () => {
            expect(orderProductModel.delete).toBeDefined();
        });
        it('showProduct method', () => {
            expect(orderProductModel.showProduct).toBeDefined();
        });

        it(' create method', () => {
            expect(orderProductModel.create).toBeDefined();
        });
        it('should have an showallProducts method', () => {
            expect(orderProductModel.showallProducts).toBeDefined();
        });

    });

    describe('Test Order Products Model logic', () => {
        const user = {
            email: 'test@test.com',
            user_name: 'testUser',
            first_name: 'Test',
            last_name: 'User',
            password: 'test123'
        } as User;
        const product = {
            name: 'product name',
            description: 'product description',
            price: 20,
            category: 'Electronics.'
        } as Product;
        const order = {
            userId: 1,
            status: 'active'
        } as Order;
        const orderProduct = {
            quantity: 1,
            order_id: 1,
            product_id: 1
        } as OrderProduct;

        
        afterAll(async () => {
            const connection = await db.connect();
            const sql =
                `DELETE FROM order_products;
                ALTER SEQUENCE order_products_id_seq RESTART WITH 1;
                DELETE FROM orders;ALTER SEQUENCE orders_id_seq RESTART WITH 1;
                DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;
                DELETE FROM users;
                ALTER SEQUENCE users_id_seq RESTART WITH 1`;
            await connection.query(sql);
            connection.release();
        });
        beforeAll(async () => {
            await userModel.createNewUser(user);
            await productModel.createNewProduct(product);
            await orderModel.create(order);
        });

        it('Create method should return an order product', async () => {
        const createdOrderProduct = await orderProductModel.create(orderProduct);
        expect(createdOrderProduct.quantity).toBe(1);
        });

        it('Show method should return the correct product in a specific order', async () => {
            const tOD = await orderProductModel.showProduct(1, 1);
            expect(tOD.quantity).toBe(1);
        });
        
        it('Edit method should return a order with edited properties', async () => {
            const eOP = await orderProductModel.edit({
                id: 1,
                quantity: 10,
                order_id: 1,
                product_id: 1
            });

            expect(eOP.quantity).toEqual(10);
        });

        it('Delete method should remove products from list of product in order', async () => {
            const dOP = await orderProductModel.delete(1, 1);
            expect(dOP.id).toBe(1);
        });
    });
});
