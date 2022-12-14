"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UserModel_1 = require("../models/UserModel");
var database_1 = __importDefault(require("../database"));
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../index"));
var request = (0, supertest_1.default)(index_1.default);
var userModel = new UserModel_1.UserModel();
var token = '';
describe('test users endpoints ', function () { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = {
                            id: 1,
                            email: 'ahmed@gmail.com',
                            user_name: 'ahmed',
                            first_name: 'ahmed',
                            last_name: 'alaa',
                            password: '1234'
                        };
                        return [4, userModel.createNewUser(user)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var connection, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "DELETE FROM users;\n                    ALTER SEQUENCE users_id_seq RESTART WITH 1;\n        ";
                        return [4, connection.query(sql)];
                    case 2:
                        _a.sent();
                        connection.release();
                        return [2];
                }
            });
        }); });
        user = {
            id: 2,
            email: 'tt@gmail.com',
            user_name: 'User',
            first_name: 'User',
            last_name: 'Test',
            password: '1234'
        };
        it('test /api/users/signup endpoint', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, request.post('/api/users/signup').send(user)];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2];
                }
            });
        }); });
        it('test /api/users/login endpoint', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, userToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, request.post('/api/users/login').set('Content-type', 'application/json').send({
                            user_name: 'User',
                            password: '1234'
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        userToken = response.body.data.token;
                        token = userToken;
                        return [2];
                }
            });
        }); });
        it('test /api/users/showall endpoint', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, request.get('/api/users/showall')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2];
                }
            });
        }); });
        it('test /api/users/deleteall endpoint', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, request
                            .delete('/api/users/deleteall')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        return [2];
                }
            });
        }); });
        it('test /api/users/delete/:id endpoint', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, request
                            .delete('/api/users/delete/1')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        return [2];
                }
            });
        }); });
        it('should update user info', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, request
                            .patch('/api/users/edit/1')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))
                            .send({
                            id: 1,
                            email: 'mm@gmail.com',
                            userName: 'mm',
                            firstName: 'mm',
                            lastName: 'mm',
                            password: '123456'
                        })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        return [2];
                }
            });
        }); });
        return [2];
    });
}); });
describe('User Model', function () {
    describe('Test methods exist', function () {
        it('should have a createNewUser method to add new users', function () {
            expect(userModel.createNewUser).toBeDefined();
        });
        it('should have an login method to Authenticate the users', function () {
            expect(userModel.login).toBeDefined();
        });
        it('should have an showAll method to retrieve your users', function () {
            expect(userModel.showAll).toBeDefined();
        });
        it('should have a show method to retrieve a user by it\'s id', function () {
            expect(userModel.showByID).toBeDefined();
        });
        it('should have a delete method deleteAll to delete all users', function () {
            expect(userModel.deleteAll).toBeDefined();
        });
        it('should have a delete method delete users by id', function () {
            expect(userModel.deleteById).toBeDefined();
        });
        it('should have an edit method to edit your users', function () {
            expect(userModel.edit).toBeDefined();
        });
    });
    describe('Test Model logic', function () {
        var user = {
            email: 'tt@gmail.com',
            user_name: 'User',
            first_name: 'User',
            last_name: 'Test',
            password: '1234'
        };
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var connection, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "DELETE FROM users;\n                        ALTER SEQUENCE users_id_seq RESTART WITH 1;\n            ";
                        return [4, connection.query(sql)];
                    case 2:
                        _a.sent();
                        connection.release();
                        return [2];
                }
            });
        }); });
        it('Create method should return a User', function () { return __awaiter(void 0, void 0, void 0, function () {
            var testUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, userModel.createNewUser(user)];
                    case 1:
                        testUser = _a.sent();
                        expect(testUser).toEqual({
                            id: testUser.id,
                            email: 'tt@gmail.com',
                            user_name: 'User',
                            first_name: 'User',
                            last_name: 'Test',
                        });
                        return [2];
                }
            });
        }); });
        it('Index method should return All available users in DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, userModel.showAll()];
                    case 1:
                        users = _a.sent();
                        expect(users.length).toBe(1);
                        expect(users[0].user_name).toBe('User');
                        return [2];
                }
            });
        }); });
        it('Show method should return testUser when called with ID (1)', function () { return __awaiter(void 0, void 0, void 0, function () {
            var returnedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, userModel.showByID(1)];
                    case 1:
                        returnedUser = _a.sent();
                        expect(returnedUser.id).toBe(1);
                        expect(returnedUser.email).toBe('tt@gmail.com');
                        expect(returnedUser.user_name).toBe('User');
                        expect(returnedUser.first_name).toBe('User');
                        expect(returnedUser.last_name).toBe('Test');
                        return [2];
                }
            });
        }); });
        it('Edit method should return a user with edited attributes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updatedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, userModel.edit({
                            id: 1,
                            email: 'ahmed.com',
                            user_name: 'ahmedalaa',
                            first_name: 'aa',
                            last_name: 'al',
                            password: 'test123'
                        })];
                    case 1:
                        updatedUser = _a.sent();
                        expect(updatedUser.email).toBe('ahmed.com');
                        expect(updatedUser.user_name).toBe('ahmedalaa');
                        expect(updatedUser.first_name).toBe('aa');
                        expect(updatedUser.last_name).toBe('al');
                        return [2];
                }
            });
        }); });
        it('Authenticate method should return the authenticated user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var authenticatedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, userModel.login('ahmedalaa', 'test123')];
                    case 1:
                        authenticatedUser = _a.sent();
                        if (authenticatedUser) {
                            expect(authenticatedUser.email).toBe('ahmed.com');
                            expect(authenticatedUser.user_name).toBe('ahmedalaa');
                            expect(authenticatedUser.first_name).toBe('aa');
                            expect(authenticatedUser.last_name).toBe('al');
                        }
                        return [2];
                }
            });
        }); });
        it('Authenticate method should return null for wrong credentials', function () { return __awaiter(void 0, void 0, void 0, function () {
            var authenticatedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, userModel.login('ahmedalaa', 'fakeuser')];
                    case 1:
                        authenticatedUser = _a.sent();
                        expect(authenticatedUser).toBe(null);
                        return [2];
                }
            });
        }); });
        it('Delete method should delete user from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deletedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, userModel.deleteById(1)];
                    case 1:
                        deletedUser = _a.sent();
                        expect(deletedUser.id).toBe(1);
                        return [2];
                }
            });
        }); });
    });
});
