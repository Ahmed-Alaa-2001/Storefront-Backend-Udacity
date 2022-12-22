import db from '../database';

export type Product = {
    id?: number | undefined;
    name: string;
    description: string;
    price: number;
    category: string;
};
export class ProductModel {
    async createNewProduct(product: Product): Promise<Product>{
        try {
            const connect = await db.connect();
            const sql = 'INSERT INTO products (name,description,price,category) VALUES ($1,$2,$3,$4) returning *';
            const result = await connect.query(sql, [
                product.name,
                product.description,
                product.price,
                product.category,
            ])
            connect.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`can't create (${product.name}): ${err.message}`);
        }
    }
    async edit(product: Product): Promise<Product> {
        try {
            const connection = await db.connect();
            const sql = `UPDATE products SET name=$1, description=$2, price=$3, category=$4 WHERE id=$5 RETURNING *`;
            const result = await connection.query(sql, [
                product.name,
                product.description,
                product.price,
                product.category,
                product.id
            ])
            // console.log(result.rows[0]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update product: ${product.name}, ${err.message}`);
        }
    }
    
    
    async showAll(): Promise<Product[]>{
        try {
            const connection = await db.connect();
            const sql = 'SELECT * FROM products';
            const result = await connection.query(sql);
            connection.release();
            // console.log(result.rows);
            return result.rows;
        } catch (err) {
            throw new Error(`couldn't retrieving products ${err.message}`);
        }
    }

    async showByID(id: number): Promise<Product> {
        try {
            const connect = await db.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await connect.query(sql, [id]);
            connect.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find product ${id}, ${err.message}`);
        }
    }
    
    async deleteAll(): Promise<Product[]>{
        try {
            const connection = await db.connect();
            const sql = 'DELETE FROM products RETURNING *';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`couldn't retrieving products ${err.message}`);
        }
    }
    async deleteById(id: number): Promise<Product> {
        try {
            const connection = await db.connect();
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete product ${id}, ${err.message}`);
        }
    }
}
