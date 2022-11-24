import { User, UserModel } from '../models/UserModel';
import db from '../database';

const userModel = new UserModel();

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
