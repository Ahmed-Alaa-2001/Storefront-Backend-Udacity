import db from '../database';
import { User, UserModel } from '../models/UserModel';
import { Product, ProductModel } from '../models/ProductModel';
import { Order, OrderModel } from '../models/OrderModel';
import { OrderProduct, OrderProductModel } from '../models/OrderProductModel';

const userModel = new UserModel();
const productModel = new ProductModel();
const orderModel = new OrderModel();
const orderProductModel = new OrderProductModel();

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
