import { Product, ProductModel } from '../models/ProductModel';
import { User, UserModel } from '../models/UserModel';
import db from '../database';
import supertest from 'supertest'
import app from '../index'

const productModel = new ProductModel();
const request = supertest(app)
const userModel = new UserModel();
let token: string = '';

describe('test some product endpoints', () => {
    beforeAll(async () => {
        const user = {
            id:1,
            email: 'ahmed@gmail.com',
            user_name: 'ahmed',
            first_name: 'ahmed',
            last_name: 'alaa',
            password: '1234'
        } as User;
    
        await userModel.createNewUser(user);
    });
    afterAll(async () => {
      // clean db
        const connection = await db.connect();
        const sql = `DELETE FROM users;
                    ALTER SEQUENCE users_id_seq RESTART WITH 1;
                    DELETE FROM products;
                    ALTER SEQUENCE products_id_seq RESTART WITH 1;\n`;
        await connection.query(sql);
        connection.release();
    });

    describe('Test Login method', () => {
        it('get token', async () => {
            const response = await request
                .post('/api/users/login')
                .set('Content-type', 'application/json')
                .send({
                    user_name: 'ahmed',
                    password: '1234'
                });
            expect(response.status).toBe(200);
            const { token: userToken } = response.body.data;
            token = userToken;
        });
    });
    
    describe('test products endpoints', () => {
        it('should create new product', async () => {
            const response = await request
            .post('/api/products/add')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'product name',
                description: 'product description',
                price: 20,
                category: 'Electronics.'
            });
            expect(response.status).toBe(200);
        });

        it('show product with id', async () => {
            const response = await request
                .get('/api/products/show/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        });

        it('show all products', async () => {
            const response = await request
            .get('/api/products/showall')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        });
    
        it('should delete product', async () => {
            const response = await request
                .delete('/api/products/delete/1')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        });

        it('Edit product', async () => {
            const response = await request
            .patch('/api/products/edit/1')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: 1,
                name: 'product name',
                description: 'product description',
                price: 20,
                category: 'Electronics.'
            });
            expect(response.status).toBe(200);
    });

    });
});



describe('Product Model', () => {
    describe('Test methods exist', () => {
        it('createNewProduct method', () => {
            expect(productModel.createNewProduct).toBeDefined();
        });
        it('n index method', () => {
            expect(productModel.showAll).toBeDefined();
        });

        it('a show method', () => {
            expect(productModel.showByID).toBeDefined();
        });


        it('deleteById method', () => {
            expect(productModel.deleteById).toBeDefined();
        });

        it('deleteById method', () => {
            expect(productModel.deleteAll).toBeDefined();
        });
        it('edit method', () => {
            expect(productModel.deleteAll).toBeDefined();
        });
    });

    describe('Test Model logic', () => {
        const product = {
            name: 'product name',
            description: 'product description',
            price: 20,
            category: 'Electronics.'
        } as Product;

        afterAll(async () => {
            const connection = await db.connect();
            const sql = `DELETE FROM products;
            ALTER SEQUENCE products_id_seq RESTART WITH 1;\n`;
            await connection.query(sql);
            connection.release();
        });

        it('Create method should add a product', async () => {
        const createdProduct = await productModel.createNewProduct(product);
        expect(createdProduct).toEqual({
            ...product,
            id: createdProduct.id,
            price: createdProduct.price
        });
        });

        it('Index method should return a list of products', async () => {
        const products = await productModel.showAll();
        expect(products.length).toBe(1);
        expect(products[0].name).toBe('product name');
        });

        it('Show method should return the correct product', async () => {
        const returnedProduct = await productModel.showByID(1);
        expect(returnedProduct).toEqual({
            ...product,
            id: 1,
            price: returnedProduct.price
        });
        });

        it('Edit method should return a product with edited attributes', async () => {
        const returnedProduct = await productModel.edit({
            id: 1,
            name: 'product name edited',
            description: 'product description edited',
            price: 10,
            category: 'Electronics.'
        });
        expect(returnedProduct.name).toBe('product name edited');
        expect(returnedProduct.description).toBe('product description edited');
        });

        it('Delete method should remove the product', async () => {
        const deletedProduct = await productModel.deleteById(1);
        expect(deletedProduct.id).toBe(1);
        });
    });
});
