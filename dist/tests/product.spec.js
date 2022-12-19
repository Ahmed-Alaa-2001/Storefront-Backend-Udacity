"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var ProductModel_1 = require("../models/ProductModel");
var UserModel_1 = require("../models/UserModel");
var database_1 = __importDefault(require("../database"));
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../index"));
var productModel = new ProductModel_1.ProductModel();
var request = (0, supertest_1.default)(index_1.default);
var userModel = new UserModel_1.UserModel();
var token = '';
describe('test some product endpoints', function () {
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
                    sql = "DELETE FROM users;\n                    ALTER SEQUENCE users_id_seq RESTART WITH 1;\n                    DELETE FROM products;\n                    ALTER SEQUENCE products_id_seq RESTART WITH 1;\n";
                    return [4, connection.query(sql)];
                case 2:
                    _a.sent();
                    connection.release();
                    return [2];
            }
        });
    }); });
    describe('Test Login method', function () {
        it('get token', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, userToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, request
                            .post('/api/users/login')
                            .set('Content-type', 'application/json')
                            .send({
                            user_name: 'ahmed',
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
    });
    describe('test products endpoints', function () {
        it('should create new product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, request
                            .post('/api/products/add')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))
                            .send({
                            name: 'product name',
                            description: 'product description',
                            price: 20,
                            category: 'Electronics.'
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2];
                }
            });
        }); });
        it('show product with id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, request
                            .get('/api/products/show/1')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2];
                }
            });
        }); });
        it('show all products', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, request
                            .get('/api/products/showall')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2];
                }
            });
        }); });
        it('should delete product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, request
                            .delete('/api/products/delete/1')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2];
                }
            });
        }); });
        it('Edit product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, request
                            .patch('/api/products/edit/1')
                            .set('Content-type', 'application/json')
                            .set('Authorization', "Bearer ".concat(token))
                            .send({
                            id: 1,
                            name: 'product name',
                            description: 'product description',
                            price: 20,
                            category: 'Electronics.'
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2];
                }
            });
        }); });
    });
});
describe('Product Model', function () {
    describe('Test methods exist', function () {
        it('createNewProduct method', function () {
            expect(productModel.createNewProduct).toBeDefined();
        });
        it('n index method', function () {
            expect(productModel.showAll).toBeDefined();
        });
        it('a show method', function () {
            expect(productModel.showByID).toBeDefined();
        });
        it('deleteById method', function () {
            expect(productModel.deleteById).toBeDefined();
        });
        it('deleteById method', function () {
            expect(productModel.deleteAll).toBeDefined();
        });
        it('edit method', function () {
            expect(productModel.deleteAll).toBeDefined();
        });
    });
    describe('Test Model logic', function () {
        var product = {
            name: 'product name',
            description: 'product description',
            price: 20,
            category: 'Electronics.'
        };
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var connection, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "DELETE FROM products;\n            ALTER SEQUENCE products_id_seq RESTART WITH 1;\n";
                        return [4, connection.query(sql)];
                    case 2:
                        _a.sent();
                        connection.release();
                        return [2];
                }
            });
        }); });
        it('Create method should add a product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, productModel.createNewProduct(product)];
                    case 1:
                        createdProduct = _a.sent();
                        expect(createdProduct).toEqual(__assign(__assign({}, product), { id: createdProduct.id, price: createdProduct.price }));
                        return [2];
                }
            });
        }); });
        it('Index method should return a list of products', function () { return __awaiter(void 0, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, productModel.showAll()];
                    case 1:
                        products = _a.sent();
                        expect(products.length).toBe(1);
                        expect(products[0].name).toBe('product name');
                        return [2];
                }
            });
        }); });
        it('Show method should return the correct product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var returnedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, productModel.showByID(1)];
                    case 1:
                        returnedProduct = _a.sent();
                        expect(returnedProduct).toEqual(__assign(__assign({}, product), { id: 1, price: returnedProduct.price }));
                        return [2];
                }
            });
        }); });
        it('Edit method should return a product with edited attributes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var returnedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, productModel.edit({
                            id: 1,
                            name: 'product name edited',
                            description: 'product description edited',
                            price: 10,
                            category: 'Electronics.'
                        })];
                    case 1:
                        returnedProduct = _a.sent();
                        expect(returnedProduct.name).toBe('product name edited');
                        expect(returnedProduct.description).toBe('product description edited');
                        return [2];
                }
            });
        }); });
        it('Delete method should remove the product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deletedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, productModel.deleteById(1)];
                    case 1:
                        deletedProduct = _a.sent();
                        expect(deletedProduct.id).toBe(1);
                        return [2];
                }
            });
        }); });
    });
});
