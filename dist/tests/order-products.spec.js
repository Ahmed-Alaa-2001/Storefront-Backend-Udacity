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
var database_1 = __importDefault(require("../database"));
var UserModel_1 = require("../models/UserModel");
var ProductModel_1 = require("../models/ProductModel");
var OrderModel_1 = require("../models/OrderModel");
var OrderProductModel_1 = require("../models/OrderProductModel");
var userModel = new UserModel_1.UserModel();
var productModel = new ProductModel_1.ProductModel();
var orderModel = new OrderModel_1.OrderModel();
var orderProductModel = new OrderProductModel_1.OrderProductModel();
describe('Order Product Model', function () {
    describe('Test methods exist', function () {
        it('delete method', function () {
            expect(orderProductModel.delete).toBeDefined();
        });
        it('showProduct method', function () {
            expect(orderProductModel.showProduct).toBeDefined();
        });
        it(' create method', function () {
            expect(orderProductModel.create).toBeDefined();
        });
        it('should have an showallProducts method', function () {
            expect(orderProductModel.showallProducts).toBeDefined();
        });
    });
    describe('Test Order Products Model logic', function () {
        var user = {
            email: 'test@test.com',
            user_name: 'testUser',
            first_name: 'Test',
            last_name: 'User',
            password: 'test123'
        };
        var product = {
            name: 'product name',
            description: 'product description',
            price: 20,
            category: 'Electronics.'
        };
        var order = {
            userId: 1,
            status: 'active'
        };
        var orderProduct = {
            quantity: 1,
            order_id: 1,
            product_id: 1
        };
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var connection, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "DELETE FROM order_products;\n                ALTER SEQUENCE order_products_id_seq RESTART WITH 1;\n                DELETE FROM orders;ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n                DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\n                DELETE FROM users;\n                ALTER SEQUENCE users_id_seq RESTART WITH 1";
                        return [4, connection.query(sql)];
                    case 2:
                        _a.sent();
                        connection.release();
                        return [2];
                }
            });
        }); });
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, userModel.createNewUser(user)];
                    case 1:
                        _a.sent();
                        return [4, productModel.createNewProduct(product)];
                    case 2:
                        _a.sent();
                        return [4, orderModel.create(order)];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        }); });
        it('Create method should return an order product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdOrderProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, orderProductModel.create(orderProduct)];
                    case 1:
                        createdOrderProduct = _a.sent();
                        expect(createdOrderProduct.quantity).toBe(1);
                        return [2];
                }
            });
        }); });
        it('Show method should return the correct product in a specific order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var tOD;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, orderProductModel.showProduct(1, 1)];
                    case 1:
                        tOD = _a.sent();
                        expect(tOD.quantity).toBe(1);
                        return [2];
                }
            });
        }); });
        it('Edit method should return a order with edited properties', function () { return __awaiter(void 0, void 0, void 0, function () {
            var eOP;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, orderProductModel.edit({
                            id: 1,
                            quantity: 10,
                            order_id: 1,
                            product_id: 1
                        })];
                    case 1:
                        eOP = _a.sent();
                        expect(eOP.quantity).toEqual(10);
                        return [2];
                }
            });
        }); });
        it('Delete method should remove products from list of product in order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var dOP;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, orderProductModel.delete(1, 1)];
                    case 1:
                        dOP = _a.sent();
                        expect(dOP.id).toBe(1);
                        return [2];
                }
            });
        }); });
    });
});
