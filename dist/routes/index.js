"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ordersRoutes_1 = __importDefault(require("./api/ordersRoutes"));
var usersRoutes_1 = __importDefault(require("./api/usersRoutes"));
var productsRoutes_1 = __importDefault(require("./api/productsRoutes"));
var router = (0, express_1.Router)();
router.use('users', usersRoutes_1.default);
router.use('products', productsRoutes_1.default);
router.use('orders', ordersRoutes_1.default);
exports.default = router;
