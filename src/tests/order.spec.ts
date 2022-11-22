import db from '../database';
import { User, UserModel } from '../models/UserModel';
import { Product, ProductModel } from '../models/ProductModel';
import { Order, OrderModel } from '../models/OrderModel';

const userModel = new UserModel();
const productModel = new ProductModel();
const orderModel = new OrderModel();

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
            email: 'test@test.com',
            user_name: 'testUser',
            first_name: 'Test',
            last_name: 'User',
            password: 'test123'
        } as User;
        const order = {
            userId: 1,
            status: 'active'
        } as Order;
        afterAll(async () => {
            const connection = await db.connect();
            const sql =`deleteById FROM users;
                        ALTER SEQUENCE users_id_seq RESTART WITH 1;
                        deleteById FROM products;
                        ALTER SEQUENCE products_id_seq RESTART WITH 1;\ndeleteById FROM orders;
                        ALTER SEQUENCE orders_id_seq RESTART WITH 1;`;
            await connection.query(sql);
            connection.release();
        });
        beforeAll(async () => {
            await userModel.createNewUser(user);
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
