import db from '../database';
import { User, UserModel } from '../models/UserModel';
import { Product, ProductModel } from '../models/ProductModel';
import { Order, OrderModel } from '../models/OrderModel';
import supertest from 'supertest'
import app from '../index'
let token: string = '';

const request = supertest(app);

const userModel = new UserModel();
const productModel = new ProductModel();
const orderModel = new OrderModel();

describe('test Order endpoints', () => {
    beforeAll(async () => {
        const user = {
            email: 'ahmed1@gmail.com',
            user_name: 'ahmed1',
            first_name: 'ahmed',
            last_name: 'alaa',
            password: '1234'
        } as User;

    await userModel.createNewUser(user);
});

    afterAll(async () => {
        const connection = await db.connect();
        const sql =`delete FROM orders;
                    ALTER SEQUENCE orders_id_seq RESTART WITH 1;
                    delete FROM users;
                    ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
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

    describe('Test Order CRUD Endpoints', () => {
        it('create new order', async () => {
            const response = await request
                .post('/api/orders/add/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    id: 1,
                    user_id: 1,
                    status: 'active'
                });            
            expect(response.status).toBe(200);
    });

        it('swow all orders', async () => {
            const response = await request
                .get('/api/orders/showall/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        });

        it('show specific order by id', async () => {
            const response = await request
                .get('/api/orders/show/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        });

        it('delete specific order by id', async () => {
            const response = await request
                .delete('/api/orders/delete/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        });
    });
});


describe('Order Model', () => {
    describe('Test methods exist', () => {
        it('should have an showAll method', () => {
            expect(orderModel.showAll).toBeDefined();
        });

        it('should have a showById method', () => {
            expect(orderModel.showById).toBeDefined();
        });

        it('should have a create method', () => {
            expect(orderModel.create).toBeDefined();
        });

        it('should have a deleteById method', () => {
            expect(orderModel.deleteById).toBeDefined();
        });
    });

    describe('Test Model logic', () => {
        const product = {
            name: 'product name',
            description: 'product description',
            price: 20,
            category: 'Electronics.'
        } as Product;
        const user = {
            id:1,
            email: 'ahmed@gmail.com',
            user_name: 'ahmed',
            first_name: 'ahmed',
            last_name: 'alaa',
            password: '1234'
        } as User;
        const order = {
            userId: 1,
            status: 'active'
        } as Order;
        afterAll(async () => {
            const connection = await db.connect();
            const sql =`delete FROM users;
                        ALTER SEQUENCE users_id_seq RESTART WITH 1;
                        delete FROM products;
                        ALTER SEQUENCE products_id_seq RESTART WITH 1;
                        delete FROM orders;
                        ALTER SEQUENCE orders_id_seq RESTART WITH 1;`;
                        await connection.query(sql);
                        connection.release();
                    });
        beforeAll(async () => {
            await userModel.createNewUser(user);
            console.log(user.id);
            // console.log(33333333333333333333333333);
            await productModel.createNewProduct(product);
        });
        it('should add an order', async () => {
            const createdOrder = await orderModel.create(order);
            expect(createdOrder.id).toEqual(1);
        });
        it('Edit method should return an order with edited attributes', async () => {
            const returnedOrder = await orderModel.edit({
                id: 1,
                userId: 1,
                status: 'completed'
            });
            expect(returnedOrder.status).toBe('completed');
        });
        it('return the correct order', async () => {
            const returnedOrder = await orderModel.showById(1);
            expect(returnedOrder.id).toEqual(1);
        });


        it('deleteById method should remove the order', async () => {
            const deleteByIddOrder = await orderModel.deleteById(1);
            expect(deleteByIddOrder.id).toBe(1);
        });
    });
});
