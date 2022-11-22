import db from '../database';
export type Product = {
    id?: number | undefined;
    name: string;
    description: string;
    price: string;
    category: string;
};
export type OrderProduct = {
    id?: number | undefined;
    quantity: number;
    order_id: number;
    product_id: number;
    products?: Product[];
};

export class OrderProductModel{
    async showallProducts(id: number): Promise<OrderProduct[]> {
        try {
            const connect = await db.connect();
            const sql = `SELECT o.id AS id, op.order_id, op.product_id, 
            JSON_AGG(JSONB_BUILD_OBJECT('productId', p.id, 'name', p.name, 'description', p.description,
            'category', p.category, 'price', p.price, 'quantity', op.quantity))
            AS products FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id
            LEFT JOIN products AS p ON op.product_id = p.id WHERE o.id = $1 GROUP BY o.id, op.order_id, op.product_id`;
            const res = await connect.query(sql, [id]);
            connect.release();
            return res.rows;
        } catch (err) {
            throw new Error(`Error at retrieving products in order: ${id} ${err.message}`);
        }
    }
    async showProduct(oId: number, pId: number): Promise<OrderProduct> {
        try {
            const connect = await db.connect();
            const sql =
                `SELECT op.order_id::INTEGER AS id, op.order_id::INTEGER AS "orderId", op.product_id::INTEGER 
                AS "productId", op.quantity, p.name, p.description, p.category, p.price::INTEGER FROM order_products AS op
                JOIN products AS p ON p.id=op.product_id WHERE order_id=$1 AND product_id=$2`;
            const res = await connect.query(sql, [oId, pId]);
            connect.release();
            return res.rows[0];
        } catch (err) {
            throw new Error(`Error at retrieving product:${pId} in order: ${oId} ${err.message}`);
        }
    }
    async create(orderproduct: OrderProduct): Promise<OrderProduct> {
        try {
            const connect = await db.connect();
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) values ($1, $2, $3) RETURNING *';
            const res = await connect.query(sql, [orderproduct.quantity, orderproduct.order_id, orderproduct.product_id]);
            connect.release();
            return res.rows[0];
        } catch (err) {
            throw new Error(`Can't add this product to order: ${orderproduct.order_id}: ${err.message}`);
        }
    }
    async delete(orderId: number, productId: number): Promise<OrderProduct> {
        try {
            const connect = await db.connect();
            const sql = 'DELETE FROM order_products WHERE order_id=($1) and product_id=($2) RETURNING *';
            const res = await connect.query(sql, [orderId, productId]);
            connect.release();
            return res.rows[0];
        } catch (err) {
            throw new Error(`Can't delete product: ${productId}: ${err}`);
        }
    }
    async edit(orderproduct: OrderProduct): Promise<OrderProduct> {
        try {
            const connect = await db.connect();
            const sql = `UPDATE order_products SET quantity=$1, order_id=$2,  product_id=$3 WHERE id=$4 RETURNING *`;
            const res = await connect.query(sql, [orderproduct.quantity, orderproduct.order_id, orderproduct.product_id, orderproduct.id]);
            connect.release();
            return res.rows[0];
        } catch (err) {
            throw new Error(`Can't update product: ${orderproduct.product_id}. Error: ${err}`);
        }
    }
}