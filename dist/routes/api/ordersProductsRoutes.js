"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CreateController_1 = __importDefault(require("../../controllers/OrdersProductsController/CreateController"));
var ShowAllController_1 = __importDefault(require("../../controllers/OrdersProductsController/ShowAllController"));
var ShowOneController_1 = __importDefault(require("../../controllers/OrdersProductsController/ShowOneController"));
var DeleteOneController_1 = __importDefault(require("../../controllers/OrdersProductsController/DeleteOneController"));
var EditController_1 = __importDefault(require("../../controllers/OrdersProductsController/EditController"));
var router = (0, express_1.Router)();
router.post('/add/:id', CreateController_1.default);
router.get('/showall/:id/products', ShowAllController_1.default);
router.get('/show/:id/products/:id', ShowOneController_1.default);
router.delete('/delete/:id/products/:id', DeleteOneController_1.default);
router.patch('/edit/:id/products/:id', EditController_1.default);
exports.default = router;
