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
    order_id: string;
    product_id: string;
    products: Product[];
};
export type Order = {
    id?: number | undefined;
    userId: number;
    status: string;
    userName?: string;
    products?: OrderProduct[];
};

export class OrderModel{

    private formatOrder(order: {
        id?: number | undefined;
        status: string;
        user_id: string;
        user_name?: string;
        products: OrderProduct[];
      }): Order {
        return {
          id: order.id,
          status: order.status,
          userId: +order.user_id,
          userName: order.user_name,
          products:
            Array.isArray(order.products) && order.products.length > 0 && order.products[0]?.quantity
              ? order.products
              : []
        };
      }

    async showAll(): Promise<Order[]> {
        try {
            const connect = await db.connect();
            const sql = `SELECT o.id AS id, u.user_name, o.user_id, 
                        JSON_AGG(JSONB_BUILD_OBJECT('productId', p.id, 'name', p.name, 'description',
                        p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity))
                        AS products, o.status AS status FROM orders
                        AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users
                        AS u ON u.id = o.user_id GROUP BY o.id, u.user_name, o.status`;
            const res = await connect.query(sql);
            connect.release();
            return res.rows;
        } catch (err) {
            throw new Error(`Error at retrieving products ${err.message}`);
        }
    }
    async showById(id: number): Promise<Order> {
        try {
            const sql = `SELECT o.id AS id, u.user_name, o.user_id, 
                        JSON_AGG(JSONB_BUILD_OBJECT('productId', p.id, 'name', p.name, 'description',
                        p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity))
                        AS products, o.status AS status FROM orders
                        AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users
                        AS u ON u.id = o.user_id WHERE o.id = $1 GROUP BY o.id, u.user_name, o.status, o.user_id`;
            const connect = await db.connect();
            const res = await connect.query(sql, [id]);
            connect.release();
            // console.log(res.rows[0].products);
            return this.formatOrder(res.rows[0]);
        } catch (err) {
            throw new Error(`Could not find product ${id}, ${err.message}`);
        }
    }
    async create(order: Order): Promise<Order> {
        try {
            const connect = await db.connect();
            const sql = 'INSERT INTO orders (user_id, status) values ($1, $2) RETURNING *';
            const res = await connect.query(sql, [order.userId, order.status]);
            const ret = res.rows[0];
            connect.release();
            return {
                id: ret.id,
                status: ret.status,
                userId: ret.user_id
            };
            } catch (err) {
                throw new Error(`Could not create order ${err.message}`);
            }
    }
    async deleteById(id: number): Promise<Order> {
        try {
            const connect = await db.connect();
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
            const res = await connect.query(sql, [id]);
            const order = res.rows[0];
            connect.release();
            return {
                id: order.id,
                userId: order.user_id,
                status: order.status
            };
        } catch (err) {
            throw new Error(`Could not delete order ${id}. ${err.message}`);
        }
    }
    async edit(order: Order): Promise<Order> {
        try {
            const connect = await db.connect();
            const sql = 'UPDATE orders SET user_id=$1, status=$2 WHERE id=$3 RETURNING *';
            const res = await connect.query(sql, [order.userId, order.status, order.id]);
            const ret = res.rows[0];
            connect.release();
            return {
                id: ret.id,
                userId: ret.user_id,
                status: ret.status
            };
        } catch (err) {
            throw new Error(`Could not update product ${order.id}. ${err.message}`);
        }
    }
    async OrderByUserId(userId: number): Promise<Order> {
        try {
            const sql = `SELECT o.id AS id, u.user_name, o.user_id, 
                        JSON_AGG(JSONB_BUILD_OBJECT('productId', p.id, 'name', p.name, 'description', p.description,
                        'category', p.category, 'price', p.price, 'quantity', op.quantity))
                        AS products, o.status AS status FROM orders AS o
                        LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users
                        AS u ON u.id = o.user_id WHERE o.user_id = $1 AND o.status = 'active' GROUP BY o.id, u.user_name, o.status, o.user_id`;
            const connect = await db.connect();
            const res = await connect.query(sql, [userId]);
            connect.release();
            return res.rows[0];
        } catch (err) {
            throw new Error(`Could not find order with userId ${userId}. ${err.message}`);
        }
    }
}