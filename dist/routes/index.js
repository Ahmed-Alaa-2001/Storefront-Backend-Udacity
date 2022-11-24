"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ordersRoutes_1 = __importDefault(require("./api/ordersRoutes"));
var usersRoutes_1 = __importDefault(require("./api/usersRoutes"));
var productsRoutes_1 = __importDefault(require("./api/productsRoutes"));
var ordersProductsRoutes_1 = __importDefault(require("./api/ordersProductsRoutes"));
var tst_1 = __importDefault(require("../controllers/tst"));
var auth_1 = __importDefault(require("../tests/middleware/auth"));
var router = (0, express_1.Router)();
router.get('/', tst_1.default);
router.use('/users', usersRoutes_1.default);
router.use('/products', productsRoutes_1.default);
router.use('/orders', auth_1.default, ordersRoutes_1.default);
router.use('/orders-products', auth_1.default, ordersProductsRoutes_1.default);
exports.default = router;
