"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CreateController_1 = __importDefault(require("../../controllers/OrderControllers/CreateController"));
var ShowAllController_1 = __importDefault(require("../../controllers/OrderControllers/ShowAllController"));
var ShowOneController_1 = __importDefault(require("../../controllers/OrderControllers/ShowOneController"));
var DeleteOneController_1 = __importDefault(require("../../controllers/OrderControllers/DeleteOneController"));
var EditController_1 = __importDefault(require("../../controllers/OrderControllers/EditController"));
var router = (0, express_1.Router)();
router.post('/add', CreateController_1.default);
router.get('/showall', ShowAllController_1.default);
router.get('/show/:id', ShowOneController_1.default);
router.delete('/delete/:id', DeleteOneController_1.default);
router.patch('/edit/:id', EditController_1.default);
exports.default = router;
