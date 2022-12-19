import { User, UserModel } from '../models/UserModel';
import db from '../database';
import supertest from 'supertest'
import app from '../index'

const request = supertest(app)
const userModel = new UserModel();
let token: string = '';
describe('test users endpoints ', async () => {
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
        const connection = await db.connect();
        const sql = `DELETE FROM users;
                    ALTER SEQUENCE users_id_seq RESTART WITH 1;
        `;
        await connection.query(sql);
        connection.release();
    });
    const user = {
        id:2,
        email: 'tt@gmail.com',
        user_name: 'User',
        first_name: 'User',
        last_name: 'Test',
        password: '1234'
    } as User;
    // const res = await request.post('/api/users/login').send(user);
    // expect(res.status).toBe(200);
    // const token = res.body;
    it('test /api/users/signup endpoint', async () => {
        const response = await request.post('/api/users/signup').send(user);
        expect(response.status).toBe(200)
    })
    it('test /api/users/login endpoint', async () => {
        const response = await request.post('/api/users/login').set('Content-type', 'application/json').send({
            user_name: 'User',
            password: '1234'
        });
        expect(response.status).toBe(200);
        // console.log(response.body.data);        
        const { token: userToken } = response.body.data;
        token = userToken;
    })
    it('test /api/users/showall endpoint', async () => {
        const response = await request.get('/api/users/showall')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
    })
});


describe('User Model', () => {
    describe('Test methods exist', () => {
        it('should have a createNewUser method to add new users', () => {
            expect(userModel.createNewUser).toBeDefined();
        });
        it('should have an login method to Authenticate the users', () => {
            expect(userModel.login).toBeDefined();
        });
        it('should have an showAll method to retrieve your users', () => {
            expect(userModel.showAll).toBeDefined();
        });
        it('should have a show method to retrieve a user by it\'s id', () => {
            expect(userModel.showByID).toBeDefined();
        });
        it('should have a delete method deleteAll to delete all users', () => {
            expect(userModel.deleteAll).toBeDefined();
        });
        it('should have a delete method delete users by id', () => {
            expect(userModel.deleteById).toBeDefined();
        });
        it('should have an edit method to edit your users', () => {
            expect(userModel.edit).toBeDefined();
        });
    });

    describe('Test Model logic', () => {
        const user = {
            email: 'tt@gmail.com',
            user_name: 'User',
            first_name: 'User',
            last_name: 'Test',
            password: '1234'
        } as User;


        beforeAll(async () => {
            const connection = await db.connect();
            const sql = `DELETE FROM users;
                        ALTER SEQUENCE users_id_seq RESTART WITH 1;
            `;
            await connection.query(sql);
            // const sql = `DELETE FROM users where user_name=$1
            // `;
            // await connection.query(sql,['User']);
            connection.release();
        });
        it('Create method should return a User', async () => {
            const testUser = await userModel.createNewUser(user);
            expect(testUser).toEqual({
                id: testUser.id,
                email: 'tt@gmail.com',
                user_name: 'User',
                first_name: 'User',
                last_name: 'Test',
            } as User);
        });
        it('Index method should return All available users in DB', async () => {
        const users = await userModel.showAll();
            expect(users.length).toBe(1);
            expect(users[0].user_name).toBe('User');
        });
        
        it('Show method should return testUser when called with ID (1)', async () => {
        const returnedUser = await userModel.showByID(1);
            expect(returnedUser.id).toBe(1);
            expect(returnedUser.email).toBe('tt@gmail.com');
            expect(returnedUser.user_name).toBe('User');
            expect(returnedUser.first_name).toBe('User');
            expect(returnedUser.last_name).toBe('Test');
        });
        
        it('Edit method should return a user with edited attributes', async () => {
        const updatedUser = await userModel.edit({
            id: 1,
            email: 'ahmed.com',
            user_name: 'ahmedalaa',
            first_name: 'aa',
            last_name: 'al',
            password: 'test123'
        });
            expect(updatedUser.email).toBe('ahmed.com');
            expect(updatedUser.user_name).toBe('ahmedalaa');
            expect(updatedUser.first_name).toBe('aa');
            expect(updatedUser.last_name).toBe('al');
        });
        
        it('Authenticate method should return the authenticated user', async () => {
        const authenticatedUser = await userModel.login('ahmedalaa', 'test123');
        if (authenticatedUser) {
                expect(authenticatedUser.email).toBe('ahmed.com');
                expect(authenticatedUser.user_name).toBe('ahmedalaa');
                expect(authenticatedUser.first_name).toBe('aa');
                expect(authenticatedUser.last_name).toBe('al');
        }
        });
        
        it('Authenticate method should return null for wrong credentials', async () => {
        const authenticatedUser = await userModel.login('ahmedalaa', 'fakeuser');
            expect(authenticatedUser).toBe(null);
        });
        
        it('Delete method should delete user from DB', async () => {
        const deletedUser = await userModel.deleteById(1);
            expect(deletedUser.id).toBe(1);
        });

    });
});
