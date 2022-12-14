"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var OrdersProductsController_1 = require("../../controllers/OrdersProductsController");
var OrdersProductsController_2 = require("../../controllers/OrdersProductsController");
var OrdersProductsController_3 = require("../../controllers/OrdersProductsController");
var OrdersProductsController_4 = require("../../controllers/OrdersProductsController");
var OrdersProductsController_5 = require("../../controllers/OrdersProductsController");
var router = (0, express_1.Router)();
router.post('/add/:id', OrdersProductsController_1.CreateController);
router.get('/showall/:id/products', OrdersProductsController_2.ShowAllController);
router.get('/show/:id/products/:id', OrdersProductsController_3.ShowOneController);
router.delete('/delete/:id/products/:id', OrdersProductsController_4.DeleteOneController);
router.patch('/edit/:id/products/:id', OrdersProductsController_5.EditController);
exports.default = router;
