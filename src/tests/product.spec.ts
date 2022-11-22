import { Product, ProductModel } from '../models/ProductModel';
import db from '../database';

const productModel = new ProductModel();

describe('Product Model', () => {
    describe('Test methods exist', () => {
        it('should have an createNewProduct method', () => {
        expect(productModel.createNewProduct).toBeDefined();
        });

        it('should have a showByID method', () => {
        expect(productModel.showByID).toBeDefined();
        });
        it('should have a showAll method', () => {
        expect(productModel.showAll).toBeDefined();
        });
        
        it('should have a edit method', () => {
        expect(productModel.edit).toBeDefined();
        });

        it('should have a deleteAll method', () => {
        expect(productModel.deleteAll).toBeDefined();
        });
        it('should have a deleteById method', () => {
        expect(productModel.deleteById).toBeDefined();
        });
    });

    describe('Test Model logic', () => {
        const product = {
            name: 'product name',
            description: 'product description',
            price: 200,
            category: 'Electronics.'
        } as Product;

        afterAll(async () => {
        const connection = await db.connect();
        const sql = 'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n';
        await connection.query(sql);
        connection.release();
        });

        it('add  product', async () => {
        const p = await productModel.createNewProduct(product);
        expect(p).toEqual({
            ...product,
            id: p.id,
            price: p.price
        });
        });
        it('return the correct product', async () => {
        const rp = await productModel.showByID(1);
        expect(rp).toEqual({
            ...product,
            id: 1,
            price: rp.price
        });
        });

        it('return a list of products', async () => {
        const p = await productModel.showAll();
        expect(p.length).toBe(1);
        expect(p[0].name).toBe('product name');
        });


        it('Edit method should return a product with edited attributes', async () => {
        const rp = await productModel.edit({
            id: 1,
            name: 'product name edited',
            description: 'product description edited',
            price: 10,
            category: 'Electronics.'
        });
        expect(rp.name).toBe('product name edited');
        expect(rp.description).toBe('product description edited');
        });

        it('Delete method should remove the product', async () => {
        const deletedProduct = await productModel.deleteById(1);
        expect(deletedProduct.id).toBe(1);
        });
    });
});
