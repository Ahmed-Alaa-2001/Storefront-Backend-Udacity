import bcrypt from 'bcrypt';
import db,{salt,pepper} from '../database';

export type User = {
    id?: number | undefined;
    email: string;
    user_name?: string;
    first_name: string;
    last_name: string;
    password: string;
};
export class UserModel {
    async createNewUser(user: User): Promise<User>{
        try {
            const connect = await db.connect();
            const sql = 'INSERT INTO users (email,user_name,first_name,last_name,password) VALUES ($1,$2,$3,$4,$5) returning id, email, user_name, first_name, last_name;';
            const hashPassword = bcrypt.hashSync(user.password + pepper, parseInt(salt as string));
            const result = await connect.query(sql, [
                user.email,
                user.user_name,
                user.first_name,
                user.last_name,
                hashPassword,
            ])
            connect.release();
            console.log(result.rows[0]);
            return result.rows[0];
        } catch (err) {
            throw new Error(`can't create (${user.user_name}): ${err.message}`);
        }
    }
    
    async login(userName: string, password: string): Promise<User | null>  {
        try{
            const connect = await db.connect();
            const sql = 'SELECT * FROM users WHERE user_name=$1';
            const result = await connect.query(sql, [userName]);
            connect.release();
            if (result.rows.length) {
                const user: User = result.rows[0];
                const isValid = bcrypt.compareSync(password + pepper, user.password);
                if (isValid) {
                    return user;
                }
            }
            return null;
        } catch (err) {
            throw new Error(`can't to login: ${err.message}`)
        }
    }
    async edit(user: User): Promise<User> {
        try {
            const connection = await db.connect();
            const sql = `UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 WHERE id=$6
                        RETURNING id, email, user_name, first_name,last_name`;
            const hashPassword = bcrypt.hashSync(user.password + pepper, parseInt(salt as string));
            const result = await connection.query(sql, [
                user.email,
                user.user_name,
                user.first_name,
                user.last_name,
                hashPassword,
                user.id
            ])
            console.log(result.rows[0]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update user: ${user.user_name}, ${err.message}`);
        }
    }
    
    
    async showAll(): Promise<User[]>{
        try {
            const connection = await db.connect();
            const sql = 'SELECT * FROM users';
            const result = await connection.query(sql);
            connection.release();
            // console.log(result.rows);
            return result.rows;
        } catch (err) {
            throw new Error(`couldn't retrieving users ${err.message}`);
        }
    }

    async showByID(id: number): Promise<User> {
        try {
            const connect = await db.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await connect.query(sql, [id]);
            connect.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find user ${id}, ${err.message}`);
        }
    }
    
    async deleteAll(): Promise<User[]>{
        try {
            const connection = await db.connect();
            const sql = 'DELETE FROM users RETURNING *';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`couldn't retrieving users ${err.message}`);
        }
    }
    async deleteById(id: number): Promise<User> {
        try {
            const connection = await db.connect();
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete user ${id}, ${err.message}`);
        }
    }
}
